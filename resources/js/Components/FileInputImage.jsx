import React, { useState } from "react";

const FileInput = ({ handleFileChange, previewImages }) => {
    return (
        <>
            <span className="sr-only">Chọn hình ảnh thực tế</span>
            <input
                id="hinh"
                type="file"
                onChange={handleFileChange}
                multiple
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
            />
            {previewImages !== 'undefined' ? (previewImages.map((preview, index) => (
                <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    style={{ width: "50px", height: "auto", margin: "5px" }}
                />
            ))):''}
        </>
    );
};

export default FileInput;
