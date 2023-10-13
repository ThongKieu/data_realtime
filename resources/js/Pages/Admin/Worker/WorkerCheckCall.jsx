import { React, useState } from "react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { Input, Button, Spinner } from "@material-tailwind/react";
import AlertIcon from '@/Pages/Admin/DataImport/Components/AlertIcon';
import * as XLSX from 'xlsx';
import { host } from "@/Utils/UrlApi";
import { toast } from 'react-toastify';




function WorkerCheckCall() {

    const [isLoading, setIsLoading] = useState(false);
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

        };
        reader.readAsArrayBuffer(file);
    };
    const uploadFile = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(host + 'api/web/import/data-check-call-worker', {
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

    return (
        <AuthenticatedLayoutAdmin >
            <Head title="Kiểm tra thợ gọi" />
            {isLoading ? <div className='flex items-center justify-center h-full'>
                <Spinner className="w-12 h-12 " color="green" />
            </div> :
                <div>
                    <div className=" flex justify-center">
                        <div className="col-2 m-auto">
                            <p className="font-normal text-gray-900 text-lg">Thêm Dữ Liệu Cuộc Gọi Thợ:</p>
                        </div>
                        <div className="col-6 m-auto">
                            <Input labelProps={{ className: "hidden" }} type="file" accept=".xlsx, .xls" className="pl-0 border-none" onChange={handleFileUpload} />
                        </div>
                        <div className="col-4 m-auto">
                            <Button className="m-4 w-40 h-8 flex items-center justify-center " fullWidth color="green" onClick={() => {
                                if (file != null) {
                                    uploadFile();
                                } else {
                                    setShowAlertFailed(true);
                                }
                            }} >Lưu Dữ Liệu </Button>
                        </div>
                    </div>
                    <div className="flex items-center m-auto w-1/3">
                        {showAlertFailed && (
                            <AlertIcon setShowAlertFailed={setShowAlertFailed} contentAlert={'Vui lòng chọn file cần thêm dữ liệu !!'} />
                        )}
                    </div>
                </div>
            }
        </AuthenticatedLayoutAdmin>
    );
}

export default WorkerCheckCall;