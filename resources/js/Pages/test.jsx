import FileInput from '@/Components/FileInputImage'
import { host } from '@/Utils/UrlApi';
import React from 'react'
import { useState } from 'react';

function test() {
  const [fileList, setFileList] = useState();
  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };
const handleUploadClick = async () => {
  if (!fileList) {
    return;
  }

  // 👇 Create new FormData object and append files
  const data = new FormData();
  files.forEach((file, i) => {
    data.append(`file-${i}`, file, file.name);
  });

  // 👇 Uploading the files using the fetch API to the server
  try {
    const response = await fetch("api/quoteWork", {
        method: "POST",
        body: data, // Gửi dữ liệu dưới dạng JSON
        headers: {
            "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
        },
    });
    // console.log("XIN CHAO DATA ACTIVE:",response.ok);
    if (response.ok) {
        // const responseData = await response.json(); // Convert response to JSON
        // setDataReturn(responseData);
        window.history.back();
    } else {
        console.error("Error:", response.status, response.statusText);
    }
} catch (error) {
    console.log("hihi", error);
}
};

// 👇 files is not an array, but it's iterable, spread to get an array of files
const files = fileList ? [...fileList] : [];

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  )
}

export default test
