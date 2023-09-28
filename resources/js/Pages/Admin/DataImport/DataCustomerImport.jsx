import React, { useState } from 'react';
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
import {
    Card, Input, Button, Typography, Spinner, Alert
} from "@material-tailwind/react";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
        </svg>
    );
}
function AlertIcon({ setShowAlertFailed }) {
    return (
        <Alert className='pt-3 pb-3 mb-8' icon={<Icon />} color="red" onClose={() => {
            setShowAlertFailed(false);
        }}>Vui lòng chọn file cần thêm dữ liệu</Alert>
    );
}


function DataCustomerImport() {
    const [isLoading, setIsLoading] = useState(false);
    const [excelData, setExcelData] = useState(null);
    const [file, setFile] = useState(null);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
   


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Lấy dữ liệu từ file Excel
            const firstSheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

            // Xử lý dữ liệu ở đây (ví dụ: lưu vào state của React)
            setFile(file);
            setShowAlertFailed(false);
            setExcelData(sheetData);
        };
        reader.readAsArrayBuffer(file);
    };
    const uploadFile = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(host + 'api/web/import/data-customer', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Tải lên thành công');
            } else {
                console.error('Lỗi khi tải lên');
            }
        } catch (error) {
            console.error('Lỗi khi tải lên: ', error);
        } finally {
            setIsLoading(false);
            setFile(null);
            toast.success('Thông báo thành công', {
                position: 'top-center', // Đặt vị trí ở giữa
                autoClose: 2000, // Đặt thời gian tồn tại là 2 giây (2000 mili giây)
                closeOnClick: true, // Click tắt Toast thông báo
                // hideProgressBar: true, // Ẩn progressbar chạy dưới
            });
        }
    }
    // In giá trị file
    return (
        <AuthenticatedLayoutAdmin >
            <Head title="Thêm dữ liệu khách hàng" />
            {isLoading
                ? <div className='flex justify-center h-full items-center'>
                    <Spinner className="h-12 w-12 " color="green" />
                </div>
                : <div className="min-h-screen flex justify-center mt-5">
                    <Card color="transparent" shadow={false}>
                        {showAlertFailed && (
                            <AlertIcon setShowAlertFailed={setShowAlertFailed} />

                        )}
                        <Typography variant="h4" color="blue-gray">
                            Thêm Dữ Liệu Của Khách Hàng
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Vui lòng chọn file để import.
                        </Typography>
                        <form className="mt-8 w-80 max-w-screen-lg sm:w-96">
                            <Input
                                labelProps={{ className: "hidden" }}
                                type="file"
                                accept=".xlsx, .xls"
                                className="border-none pl-0" // Sử dụng lớp CSS 'border-none' của Material Tailwind
                                onChange={handleFileUpload}
                            />
                            <Button className="mt-12" fullWidth color="green" onClick={() => {

                                if (file != null) {
                                    uploadFile();
                                } else {
                                    setShowAlertFailed(true);
                                }
                            }}>
                                Lưu Dữ Liệu
                            </Button>
                        </form>
                    </Card>
                    <ToastContainer />
                </div>}

        </AuthenticatedLayoutAdmin>
    );
}

export default DataCustomerImport;