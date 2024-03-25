import Authenticated from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Button,
    Card,
    CardHeader,
    Input,
    Spinner,
    Typography,
} from "@material-tailwind/react";
import { React, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import AlertIcon from "@/Pages/Admin/DataImport/Components/AlertIcon";
import { host } from "@/Utils/UrlApi";
import { Box, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useWindowSize from "@/Core/Resize";

function ApplicationWorkList() {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const { width, height } = useWindowSize(98);

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
        },
        {
            field: "work_name_cus",
            headerName: "Tên Khách",
            type: "text",
            width: 220,
            editable: false,
        },
        {
            field: "work_phone",
            headerName: "Số liên hệ",
            type: "text",
            width: 220,
            editable: false,
        },
    ];

    return (
        <Authenticated>
            <Head title="Tạo QR Code" />

            <div className="p-1">
                <Card className="grid items-center grid-cols-5 p-2 mb-2 text-center border rounded-lg border-deep-orange-300">
                    <Typography className="col-span-4 text-lg font-extrabold text-blue-500">
                        Danh sách khách hàng hiển thị web
                    </Typography>
                    {showAlertFailed ? (
                            <div className="edit-alert">
                                <AlertIcon
                                setShowAlertFailed={setShowAlertFailed}
                                contentAlert={
                                    "Vui lòng chọn file cần thêm dữ liệu !!"
                                }

                            />
                            </div>
                    ) : (
                        <form className="flex flex-row items-center justify-between p-1 border border-green-500 rounded-md">
                            <div>
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                                    onChange={handleFileUpload}
                                />
                            </div>

                            <div>
                                <Button
                                    className="w-full"
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
                            </div>
                        </form>
                    )}
                </Card>
                <Card>
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
                                // {...getData}
                                rows={getData}
                                columns={column}
                            />
                        </Box>
                    )}
                </Card>
            </div>
        </Authenticated>
    );
}

export default ApplicationWorkList;
