import FileInput from '@/Components/FileInputImage'
import { host } from '@/Utils/UrlApi';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function test() {
  // const [fileList, setFileList] = useState([]);
  // const handleFileChange = (e) => {
  //   setFileList(e.target.files);
  // };
  // const handleUploadClick = async () => {
  //   if (!fileList) {
  //     return;
  //   }

  //   // 👇 Create new FormData object and append files
  //   const data = new FormData();
  //   for (let i = 0; i < fileList.length; i++) {
  //     data.append(`file-${i}`, fileList[i], fileList[i].name);
  //   }

  //   // 👇 Uploading the files using the fetch API to the server
  //   try {
  //     const response = await fetch("api/web/ig", {
  //       method: "POST",
  //       body: data, // Gửi dữ liệu dưới dạng JSON
  //       headers: {
  //         "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
  //       },
  //     });
  //     console.log(data);

  //     // console.log("XIN CHAO DATA ACTIVE:",response.ok);
  //     if (response.ok) {
  //       // const responseData = await response.json(); // Convert response to JSON
  //       // setDataReturn(responseData);
  //       window.history.back();
  //     } else {
  //       console.error("Error:", response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.log("hihi", error);
  //   }
  // };

  // // 👇 files is not an array, but it's iterable, spread to get an array of files
  // const files = fileList ? [...fileList] : [];
  // // const [selectedFile, setSelectedFile] = useState(null);
  // const [optimizedImage, setOptimizedImage] = useState(null);

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleOptimize = async () => {
  //   if (!selectedFile) {
  //     return;
  //   }

  //   // Convert the selected image file to Base64 format
  //   // const reader = new FileReader();
  //   // reader.onload = (event) => {
  //   //   const imageData = event.target.result;

  //     // Send the image data to the Laravel API for optimization
  //     axios.post('/api/web/ig', {
  //       image: imageData,
  //     })
  //       .then((response) => {
  //         if (response.data.success) {
  //           setOptimizedImage(response.data.image);
  //         } else {
  //           console.error('Optimization failed:', response.data.error);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error optimizing image:', error);
  //       });
  //   };
  //   reader.readAsDataURL(selectedFile);
  // };

  // return (
  //   <div>
  //     <input type="file" onChange={handleFileChange} multiple/>
  //     <button onClick={handleUploadClick}>Optimize</button>
  //     {/* {optimizedImage && <img src={optimizedImage} alt="Optimized Image" />} */}
  //   </div>
  // )
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (e) => {
    setFileList(e.target.files);
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
        window.history.back();
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUploadClick}>Optimize</button>
    </div>
  );
}

export default test
