import Authenticated from '@/Layouts/Admin/AuthenticatedLayoutAdmin'
import { Head } from '@inertiajs/react'
import { Button, Card, CardHeader, Input, Spinner, Typography } from '@material-tailwind/react'
import {React,useState,useEffect} from 'react'
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import AlertIcon from "@/Pages/Admin/DataImport/Components/AlertIcon";
import { host } from '@/Utils/UrlApi';
import { Box, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useWindowSize from "@/Core/Resize";


function ApplicationWorkList() {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const { width, height } = useWindowSize(65);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Lấy dữ liệu từ file Excel
            const firstSheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(
                workbook.Sheets[firstSheetName]
            );

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
            formData.append("file", file);
            const response = await fetch(
                host + "api/web/import/data-work-list",
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (response.ok) {
                console.log("Tải lên thành công");
                toast.success("Thông báo thành công", {
                    position: "top-center", // Đặt vị trí ở giữa
                    autoClose: 2000, // Đặt thời gian tồn tại là 2 giây (2000 mili giây)
                    closeOnClick: true, // Click tắt Toast thông báo
                    // hideProgressBar: true, // Ẩn progressbar chạy dưới
                });
            } else {
                console.error("Lỗi khi tải lên");
                toast.error("Lỗi thêm dữ liệu", {
                    position: "top-center", // Đặt vị trí ở giữa
                    autoClose: 2000, // Đặt thời gian tồn tại là 2 giây (2000 mili giây)
                    closeOnClick: true, // Click tắt Toast thông báo
                    // hideProgressBar: true, // Ẩn progressbar chạy dưới
                    pauseOnHover: false,
                });
            }
        } catch (error) {
            console.error("Lỗi khi tải lên: ", error);
        } finally {
            setIsLoading(false);
            setFile(null);
        }
    };
    const [getData, usersData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch(host + "api/web/work-list");
            const jsonData = await response.json();
            if (response.ok) {
                usersData(jsonData);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const column = [
        {
            field: "id",
            headerName: "STT",
            type: "text",
            width: 30,
            editable: false,
            align: "left",
            headerAlign: "left",
        }, 
        {
            field: "work_content",
            headerName: "Nội dung",
            type: "text",
            editable: false,
            align: "left",
            width: 350,
            headerAlign: "left",
        },
        {
            field: "work_distric",
            headerName: "Địa Chỉ",
            type: "text",
            width: 220,
            editable: false,
        }, {
            field: "work_name_cus",
            headerName: "Tên Khách",
            type: "text",
            width: 220,
            editable: false,
        }, {
            field: "work_phone",
            headerName: "Số liên hệ",
            type: "text",
            width: 220,
            editable: false,
        },
    ];
    
    return (
        <Authenticated >
            <Head title="Tạo QR Code" />
            <div className={`h-screen gap-2 p-1`}>
                <Card className="w-full h-full">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="bg-cyan-400 border border-deep-orange-300 rounded-lg p-2 text-center grid grid-cols-5">
                        <Typography
                            className="text-lg font-extrabold text-white col-span-4"
                        >
                            Danh sách khách hàng hiển thị web
                        </Typography>
                        {showAlertFailed && (
                            <AlertIcon
                                setShowAlertFailed={setShowAlertFailed}
                                contentAlert={
                                    "Vui lòng chọn file cần thêm dữ liệu !!"
                                }
                            />
                        )}
                        <form className='border border-white p-1 rounded-md' >
                            <Input
                                labelProps={{ className: "hidden" }}
                                type="file"
                                accept=".xlsx, .xls"
                                className="pl-0 border-none" // Sử dụng lớp CSS 'border-none' của Material Tailwind
                                onChange={handleFileUpload}
                            />
                            <Button
                                fullWidth
                                color="green"
                                onClick={() => {
                                    if (file != null) {
                                        uploadFile();
                                    } else {
                                        setShowAlertFailed(true);
                                    }
                                }}
                            >
                                Thêm Dữ Liệu
                            </Button>
                        </form>
                        
                    </CardHeader>
                    <Divider className="w-full"  />
                        {isLoading ? (
                            <div className="flex justify-center p-2 align-middle ">
                                <Spinner className="w-6 h-6" color="amber" />
                                <p className="pl-2 text-center text-black">
                                    Loading...
                                </p>
                            </div>
                        ) : (
                            <Box sx={{ height: height, width: 1 }}>
                                <DataGrid
                                    {...getData}
                                    rows={getData}
                                    columns={column}
                                    
                                />
                            </Box>
                        )}
                </Card>

            </div>
        </Authenticated>
    )
}

export default ApplicationWorkList