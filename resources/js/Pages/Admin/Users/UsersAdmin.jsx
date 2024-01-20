import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Card,
    Typography,
    Input,
    Button,
    Textarea,
    Spinner, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Box, Divider } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter, GridToolbar } from "@mui/x-data-grid";
import { host } from "@/Utils/UrlApi";
import {
    TrashIcon,
    EyeIcon,
    ArrowPathIcon,
    UserPlusIcon,
    DocumentDuplicateIcon,
    MagnifyingGlassIcon,
    ClipboardDocumentListIcon,
    ArrowUpTrayIcon,
    XMarkIcon,
    EllipsisVerticalIcon,
    TicketIcon,
    CheckCircleIcon,
    BookmarkSquareIcon,
} from "@heroicons/react/24/outline";

function UsersAdmin(auth) {
    const [isLoading, setIsLoading] = useState(true);
    const column = [
        {
            field: "id", headerName: "STT", type: "text", width: 30, editable: false, align: "left", headerAlign: "left",
        },
        {
            field: "name",
            headerName: "Họ Tên",
            type: "text",
            editable: false,
            align: "left",
            width: 350,
            headerAlign: "left",
        },
        {
            field: "email",
            headerName: "Email",
            type: "text",
            width: 320,
            editable: false,
        },
        {
            field: "phone_cty",
            headerName: "Số Công Ty",
            type: "text",
            width: 220,
            editable: false,
        },
        {
            field: 'permission',
            headerName: "Quyền",
            type: "text",
            width: 250,
            editable: false,
            renderCell: (params) => {
                return (
                    <div className='m-auto'>
                        {params.row.permission != 1 ? (
                            <p className="text-green-500 text-center">
                                Người dùng
                            </p>
                        ) : (
                            <p className='text-center text-red-500'>Admin</p>
                        )}
                    </div>

                );
            },
        },
        {
            field: 'is_online',
            headerName: "Trạng Thái",
            type: "text",
            width: 250,
            editable: false,
            renderCell: (params) => {
                return (
                    <div className='m-auto'>
                        {params.row.is_online != 1 ? (
                            <p className="text-red-500 text-center">
                                Offline
                            </p>
                        ) : (
                            <p className='text-center'>{params.row.is_online}</p>
                        )}
                    </div>

                );
            },
        },
        {
            field: "avatar",
            headerName: "hình",
            type: "text",
            width: 80,
            editable: false,
            renderCell: (params) => {

                return (
                    <img src={host+params.row.avatar} className='w-10'/>
                );
            },
        },
        {
            field: "password",
            headerName: "Tạo Lại Mật Khẩu",
            type: "text",
            width: 100,
            editable: false,
            renderCell: (params) => {

                return (
                   <div className='m-auto'>
                    <Button 
                        className='bg-white  text-center'                    >
                        <ArrowPathIcon className='w-5 text-black '></ArrowPathIcon>
                    </Button>
                   </div>
                );
            },
        },
    ];

    const fetchData = async () => {
        try {
            const response = await fetch(host + "api/web/users");
            const jsonData = await response.json();
            if (response.ok) {
                usersData(jsonData.users);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleAddUser = async () => {
        if (formData.name == null || formData.email == null || formData.sdt == null || formData.name == '' || formData.email == '' || formData.sdt == '') {
            alert(' Thiếu Thông Tin!!!!!!!!!!!!!!');
        }
        else {
            try {
                // let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                const response = await fetch(host + "api/web/users", {
                    method: "POST",
                    body: JSON.stringify(formData), // Gửi dữ liệu dưới dạng JSON
                    headers: {
                        "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                        // "x-csrf-token": csrfToken,
                    },
                });
                if (response.ok) {
                    handleOpen();
                    window.location.reload();
                }
            } catch (error) {
                console.log("Lỗi:", error);
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const [getData, usersData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        sdt: "",
        email: "",
        password: "Thoviet58568!@#",
        permission: 0,
    });
    const [screenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };





    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Danh Sách Nhân Viên" />
            <div className="flex justify-center h-screen p-2">
                <Card className="flex flex-row w-full h-full m-auto bg-white">
                    <Card className=" rounded w-[100%]">
                        <div className='bg-green-400 grid grid-cols-5 gap-2'>
                            <Typography className="m-2 font-extrabold text-white col-start-3">
                                Danh Sách Người Dùng WEBSITE
                            </Typography>
                            <Button onClick={handleOpen} variant="gradient" className='col-start-5 m-2'>
                                Thêm người dùng
                            </Button>
                            <Dialog open={open} handler={handleOpen}>
                                <div className="flex items-center justify-center">
                                    <DialogHeader>Nhập Thông Tin</DialogHeader></div>

                                <Divider></Divider>
                                <DialogBody className='grid grid-cols-2 gap-3'>

                                    <Input
                                        className='shadow-none'
                                        label='Tên'
                                        value={formData.ten}
                                        name='name'
                                        required
                                        onChange={handleChange} />
                                    <Input
                                        className='shadow-none'
                                        label='Số Liên Hệ'
                                        value={formData.sdt}
                                        name='sdt'
                                        required
                                        onChange={handleChange} />
                                    <Input
                                        className='shadow-none'
                                        label='Email'
                                        value={formData.email}
                                        name='email'
                                        required
                                        onChange={handleChange} />
                                    <select name='permission' onChange={handleChange}>
                                        <option value="0"> Người dùng thường </option>
                                        <option value="1"> Quyền vào Admin </option>
                                        <option value="2"> Quản lý cấp cao </option>
                                    </select>
                                </DialogBody>
                                <Divider></Divider>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleOpen}
                                        className="mr-1"
                                    >
                                        <span>Hủy</span>
                                    </Button>
                                    <Button variant="gradient" color="green" onClick={handleAddUser}>
                                        <span>Lưu</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </div>



                        <Divider className="w-full" />
                        {isLoading ? (
                            <div className="flex justify-center p-2 align-middle ">
                                <Spinner className="w-6 h-6" color="amber" />
                                <p className="pl-2 text-center text-black">
                                    Loading...
                                </p>
                            </div>
                        ) : (

                            <Box className={`h-x]`}>
                                <DataGrid

                                    {...getData}
                                    rows={getData}
                                    disableColumnFilter
                                    disableColumnSelector
                                    disableDensitySelector
                                    columns={column}
                                    slots={{ toolbar: GridToolbar }}
                                    slotProps={{
                                        toolbar: {
                                            showQuickFilter: true,
                                        },
                                    }}
                                />
                            </Box>)}
                    </Card>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}

export default UsersAdmin