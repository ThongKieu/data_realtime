import React, { useState } from 'react';
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
import {
    Card, Input, Button, Typography, Spinner
} from "@material-tailwind/react";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import AlertIcon from '@/Pages/Admin/DataImport/Components/AlertIcon';



function DataWorkerImport() {
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
            const response = await fetch(host + 'api/web/import/data-worker', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Tải lên thành công');
                toast.success('Thông báo thành công', {
                    position: 'top-center', // Đặt vị trí ở giữa
                    autoClose: 2000, // Đặt thời gian tồn tại là 2 giây (2000 mili giây)
                    closeOnClick: true, // Click tắt Toast thông báo
                    // hideProgressBar: true, // Ẩn progressbar chạy dưới
                    pauseOnHover: false
                });
            } else {
                console.error('Lỗi khi tải lên');
                toast.error('Lỗi thêm dữ liệu', {
                    position: 'top-center', // Đặt vị trí ở giữa
                    autoClose: 2000, // Đặt thời gian tồn tại là 2 giây (2000 mili giây)
                    closeOnClick: true, // Click tắt Toast thông báo
                    // hideProgressBar: true, // Ẩn progressbar chạy dưới
                    pauseOnHover: false
                });
            }
        } catch (error) {
            console.error('Lỗi khi tải lên: ', error);
        } finally {
            setIsLoading(false);
            setFile(null);
        }
    }
    // In giá trị file
    return (
        <AuthenticatedLayoutAdmin >
            <Head title="Thêm dữ liệu khách hàng" />
            {isLoading
                ? <div className='flex items-center justify-center h-full'>
                    <Spinner className="w-12 h-12 " color="green" />
                </div>
                : <div className="flex justify-center h-full">
                    <Card className={`w-[50%] h-[50%] m-auto p-2 flex justify-center items-center border border-gray-500 shadow-xl ${showAlertFailed ? 'shadow-red-500':'shadow-green-500'} `}>
                        {showAlertFailed && (
                            <AlertIcon setShowAlertFailed={setShowAlertFailed} contentAlert={'Lỗi khi tải file'} />

                        )}
                        <Typography variant="h4" color="blue-gray">
                            Thêm Dữ Liệu Của Thợ
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Vui lòng chọn file để import.
                        </Typography>
                        <form className="max-w-screen-lg mt-8 w-80 sm:w-96">
                            <Input
                                labelProps={{ className: "hidden" }}
                                type="file"
                                accept=".xlsx, .xls"
                                className="pl-0 border-none" // Sử dụng lớp CSS 'border-none' của Material Tailwind
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

                </div>}

        </AuthenticatedLayoutAdmin>
    );
}

export default DataWorkerImport;
