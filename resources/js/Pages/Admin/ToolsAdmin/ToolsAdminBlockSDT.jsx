import React, { useState } from "react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Card,
    Typography,
    Input,
    Button,
    Textarea,
} from "@material-tailwind/react";
import { Box, Divider } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

function ToolsAdminBlockSDT() {
    const column = [
        { field: "stt", headerName: "STT", width: 180, editable: true },
        {
            field: "sdt",
            headerName: "Số Điện Thoại",
            type: "text",
            editable: true,
            align: "left",
            width: 200,
            headerAlign: "left",
        },
        {
            field: "reason",
            headerName: "Lý Do",
            type: "text",
            width: 180,
            editable: true,
        },
        {
            field: "resolve",
            headerName: "Xử Lý",
            type: "text",
            width: 220,
            editable: true,
        },
    ];
    const row = [
        {
            id: 1,
            stt: 1,
            sdt: "0789458562",
            reason: "Số điện thoại phá",
            resolve: 11111,
        },
        {
            id: 2,
            stt: 2,
            sdt: "0947613893",
            reason: "Số điện thoại phá",
            resolve: 11111,
        },
    ];
    function QuickSearchToolbar() {
        return (
            <Box
                sx={{
                    p: 0.5,
                    pb: 0,
                }}
            >
                <GridToolbarQuickFilter
                    quickFilterParser={(searchInput) =>
                        searchInput
                            .split(",")
                            .map((value) => value.trim())
                            .filter((value) => value !== "")
                    }
                />
            </Box>
        );
    }
    const [formData, setFormData] = useState({
        block_NumberPhone: "",
        contentBlock: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBlockNumber = (e) => {
        e.preventDefault();
        if (formData.block_NumberPhone !== "" && formData.contentBlock !== "") {
            console.log("Số điện thoại cần chặn: ", formData.block_NumberPhone);
            console.log("Lý do chặn: ", formData.contentBlock);

            // fetch('url_api_của_bạn', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // })
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     return response.json();
            // })
            // .then(data => {
            //     console.log('Post thành công:', data);
            // })
            // .catch(error => {
            //     console.error('Có lỗi xảy ra khi gửi dữ liệu:', error);
            // });
        } else {
            console.log("Bị trống rồi kìa");
        }
    };
    const [screenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const heightScreenTV = screenSize.height - 100;
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Danh Sách Chặn Số Điện Thoại" />
            <div className="flex justify-center h-screen p-2">
                <Card className="flex flex-row w-full h-full m-auto bg-white">
                    <Card className=" rounded w-[60%]">
                        <Typography className="p-2 font-bold text-center text-white bg-gray-500">
                            Danh Sách Liên Hệ Chặn
                        </Typography>
                        <Divider className="w-full" />
                        <Box className={`h-[${heightScreenTV}px]`}>
                            <DataGrid
                                slots={{ toolbar: QuickSearchToolbar }}
                                rows={row}
                                columns={column}
                            />
                        </Box>
                    </Card>
                    <Card className="w-[40%] rounded">
                        <Typography className="p-2 font-bold text-center text-white bg-gray-500">
                            Thêm số mới
                        </Typography>
                        <Divider className="w-full" />
                        <Card
                            className={`w-[95%] mx-auto my-[70px] ${
                                formData.block_NumberPhone !== "" &&
                                formData.contentBlock !== ""
                                    ? "shadow-blue-500 border-blue-500"
                                    : "shadow-red-500 border-red-500"
                            }  border  rounded-[5px]`}
                        >
                            <form onSubmit={handleBlockNumber}>
                                <div className="p-2 mb-2">
                                    <Input
                                        type="text"
                                        name="block_NumberPhone"
                                        value={formData.block_NumberPhone}
                                        onChange={handleChange}
                                        label="Số điện thoại cần chặn"
                                        className="shadow-none"
                                    />
                                </div>
                                <div className="p-2">
                                    <Textarea
                                        label="Lý do chặn"
                                        name="contentBlock"
                                        value={formData.contentBlock}
                                        onChange={handleChange}
                                        className="shadow-none"
                                    />
                                </div>
                                <div className="flex flex-row-reverse p-2">
                                    <Button type="submit">Lưu</Button>
                                </div>
                            </form>
                        </Card>
                    </Card>
                </Card>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}
export default ToolsAdminBlockSDT;
