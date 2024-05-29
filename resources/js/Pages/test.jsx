import FileInput from '@/Components/FileInputImage'
import { host } from '@/Utils/UrlApi';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function test() {
  

  // // 👇 files is not an array, but it's iterable, spread to get an array of files  base64 encode

  // const [fileList, setFileList] = useState([]);
  // const [optimizedImages, setOptimizedImages] = useState([]);

  // const handleFileChange = (event) => {
  //   setFileList(Array.from(event.target.files));
  // };

  // const handleOptimize = async () => {
  //   if (fileList.length === 0) {
  //     return;
  //   }

  //   const optimizedImagesList = [];
  //   for (const file of fileList) {
  //     const reader = new FileReader();
  //     reader.onload = async (event) => {
  //       const imageData = event.target.result;

  //       try {
  //         const response = await axios.post("/api/web/ig", {
  //           image: imageData,
  //         });
  //         if (response.data.success) {
  //           optimizedImagesList.push({
  //             name: file.name,
  //             data: response.data.image,
  //           });
  //         } else {
  //           console.error("Optimization failed:", response.data.error);
  //         }
  //         if (optimizedImagesList.length === fileList.length) {
  //           setOptimizedImages(optimizedImagesList);
  //         }
  //       } catch (error) {
  //         console.error("Error optimizing image:", error);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // return (
  //   <div>
  //     <input type="file" onChange={handleFileChange} multiple />
  //     <button onClick={handleOptimize}>Optimize</button>
  //     <div>
  //       {optimizedImages.map((file, index) => (
  //         <div key={index}>
  //           <h4>{file.name}</h4>
  //           <img src={file.data} alt={`Optimized ${file.name}`} style={{ width: '200px' }} />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  // Upload hình bình thường
  const [fileList, setFileList] = useState([]);
  const [previewList, setPreviewList] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList(files);

    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewList((prevList) => [
          ...prevList,
          { name: file.name, data: event.target.result },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadClick = async () => {
    if (!fileList.length) {
      return;
    }

    // Create new FormData object and append files
    const data = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      data.append(`file-${i}`, fileList[i], fileList[i].name);
    }

    try {
      const response = await fetch("api/web/ig", {
        method: "POST",
        body: data, // Gửi dữ liệu dưới dạng FormData
      });

      if (response.ok) {
        // window.history.back();
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload</button>
      <div>
        {previewList.map((file, index) => (
          <div key={index}>
            <h4>{file.name}</h4>
            {file.data && <img src={file.data} alt={file.name} style={{ width: '200px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default test
