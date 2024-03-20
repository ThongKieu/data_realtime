import { React, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import Box from "@mui/material/Box";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";

import useWindowSize from "@/Core/Resize";
import { Divider } from "@mui/material";
const TABS = [
    {
        label: "Điện Nước",
        value: "DN",
    },
    {
        label: "Điện Lạnh",
        value: "monitored",
    },
    {
        label: "Đồ Gỗ",
        value: "DG",
    },
    {
        label: "NLMT",
        value: "NLMT",
    },
    {
        label: "Xây Dựng",
        value: "XD",
    },
    {
        label: "Tài Xế",
        value: "TD",
    },
    {
        label: "Cơ Khí",
        value: "CK",
    },
];

function WorkerAccount() {
    const [accountData, setAccountData] = useState([]);
    const { width, height } = useWindowSize(65);
    const calculateColumnWidth = (data, field) => {
        // Tìm chiều dài lớn nhất của dữ liệu trong cột
        const maxLength = Math.max(
            ...data.map((row) => row[field].toString().length)
        );
        // Tính toán độ rộng dựa trên số ký tự tối đa và một số hằng số điều chỉnh
        return maxLength * 8 + 30; // Điều chỉnh 8 và 30 tùy thuộc vào font-size và padding của cột
    };
    useEffect(() => {
        fetch(host + "api/web/workers/account")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error Status Network");
                }
                return response.json();
            })
            .then((data) => {
                setAccountData(data);
            })
            .catch((error) => {
                console.error("Error API:", error);
            });
    }, []);
    const updateStatus = async (id, status, uri, context) => {
        if (id != undefined || status != undefined || uri != undefined) {
            const data = {
                id: id,
                ac: status,
            };
            console.log(data);
            try {
                const res = await fetch(uri, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (res.ok) {
                    const resData = await res.json();
                    if(data.ac==2){
                        console.log('sasdas',resData);
                    }else{
                        window.location.reload();
                    }
                } else {
                    console.error("Lỗi khi gửi dữ liệu:", res.statusText);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    const StatusDialog = ({
        open,
        handleOpen,
        children,
        handleEvent,
        contextHeader,
    }) => {
        return (
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader>{contextHeader}</DialogHeader>
                <Divider />
                <DialogBody>
                    <main>{children}</main>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleEvent}
                    >
                        <span>Cập Nhật</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        );
    };
    const columns = [
        {
            field: "id_worker",
            headerName: "ID",
            width: calculateColumnWidth(accountData, "id_worker"),
            align: "center",
            disableColumnMenu: true,
        },
        {
            field: "worker_full_name",
            headerName: "Tên Thợ",
            sortable: false,
            width: calculateColumnWidth(accountData, "worker_full_name"),
            editable: false,
        },
        {
            field: "acc_worker",
            headerName: "Tài Khoản",
            width: calculateColumnWidth(accountData, "acc_worker"),
            editable: false,
        },
        {
            field: "last_active",
            headerName: "Đăng Nhập Lần Cuối",
            width: 200,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <p>
                        {params.row.last_active != null
                            ? params.row.last_active
                            : "Chưa đăng nhập"}
                    </p>
                );
            },
        },
        {
            field: "device_key",
            headerName: "ID Điện Thoại",
            align: "center",
            width: 200,
            editable: false,
            renderCell: (params) => {
                return (
                    <p>
                        {params.row.device_key != null
                            ? params.row.device_key
                            : "Chưa đăng nhập"}
                    </p>
                );
            },
        },
        {
            field: "time_log",
            headerName: "Đăng Nhập Sai",
            align: "center",
            width: 180,
            editable: false,
        },
        {
            field: "active",
            headerName: "Trạng Thái",
            align: "center",
            width: 180,
            editable: false,
            renderCell: (params) => {
                console.log(params);
                const [open, setOpen] = useState(false);
                const handleOpen = () => setOpen(!open);
                const [select, setSelect] = useState(params.row.active);
                const handleUpdateActive = async () => {
                    const id = params.row.id;
                    const status = select;
                    const uri = "/api/web/workers/updateActive";
                    const context = "Đã thay đổi thông tin tình trạng";
                    console.log(id, status, uri, context);
                    updateStatus(id, status, uri, context);
                };
                return (
                    <div className="p-2 outline-none">
                        <Button
                            onClick={handleOpen}
                            variant="outlined"
                            color={
                                params.row.active == 0
                                    ? "blue"
                                    : params.row.active == 1
                                    ? "green"
                                    : "red"
                            }
                        >
                            {params.row.active == 0
                                ? "Tạm Khóa"
                                : params.row.active == 1
                                ? "Mở"
                                : "Khóa Vĩnh Viễn"}
                        </Button>
                        <StatusDialog open={open} handleOpen={handleOpen} handleEvent={handleUpdateActive} contextHeader='Chỉnh Sửa Trạng Thái'>
                            <select
                                value={select}
                                className="w-full p-2 rounded-md text-bold"
                                onChange={(e) => setSelect(e.target.value)}
                            >
                                <option value={0}>Tạm Khóa</option>
                                <option value={1}>Mở</option>
                                <option value={2}>Khóa Vĩnh Viễn</option>
                            </select>
                        </StatusDialog>
{/*
                        <Dialog open={open} handler={handleOpen} size="xs">
                            <DialogHeader>Chỉnh Sửa Trạng Thái </DialogHeader>
                            <Divider />
                            <DialogBody>
                                <select
                                    value={select}
                                    className="w-full p-2 rounded-md text-bold"
                                    onChange={(e) => setSelect(e.target.value)}
                                >
                                    <option value={0}>Tạm Khóa</option>
                                    <option value={1}>Mở</option>
                                    <option value={2}>Khóa Vĩnh Viễn</option>
                                </select>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Hủy</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleUpdateActive}
                                >
                                    <span>Cập Nhật</span>
                                </Button>
                            </DialogFooter>
                        </Dialog> */}
                    </div>
                );
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Chức Năng",
            width: 400,
            editable: false,
            renderCell: (params) => {
                const [openUpdatePass, setOpenUpdatePass] = useState(false);
                const handleOpenUpdate = () =>
                    setOpenUpdatePass(!openUpdatePass);
                const handleUpdatePass = async () => {
                    const id = params.row.id;
                    const status = 2;
                    const uri = "/api/web/workers/changePass";
                    const context = "Đã thay đổi mật khẩu";
                    console.log(id, status, uri, context);
                    updateStatus(id, status, uri, context);
                };
                return (
                    <>
                        <div className="p-2 outline-none">
                            <Button
                                className="mx-2"
                                variant="outlined"
                                color="orange"
                                onClick={handleOpenUpdate}
                            >
                                Đổi Mật Khẩu
                            </Button>
                            <Button variant="outlined" color="red">
                                Reset Mật Khẩu
                            </Button>
                        </div>
                        <StatusDialog open={openUpdatePass} handleOpen={handleOpenUpdate} handleEvent={handleUpdatePass} contextHeader='Chỉnh Sửa Trạng Thái'>
                            <span>Xác nhận thay đổi mật khẩu tài khoản: {params.row.worker_full_name} </span>
                        </StatusDialog>
                        <Dialog
                            open={openUpdatePass}
                            handler={handleOpenUpdate}
                            size="xs"
                        >
                            <DialogHeader>Đổi Mật Khẩu</DialogHeader>
                            <Divider />
                            <DialogBody>test</DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpenUpdate}
                                    className="mr-1"
                                >
                                    <span>Hủy</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleOpenUpdate}
                                >
                                    <span>Cập Nhật</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                );
            },
        },
    ];
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInfoFix((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Tài khoản thợ" />
            <div className="p-1">
                <Card className="m-1 mt-0">
                    <div className="flex flex-row justify-between m-2">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        className="w-fit"
                                    >
                                        <span className="px-2">{label}</span>
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                }
                            />
                        </div>
                    </div>
                </Card>
                <Card className={`w-[${width}px] m-1 mt-1`}>
                    <Box sx={{ height: height, width: 1 }}>
                        <DataGrid
                            rows={accountData}
                            columns={columns}
                            getRowId={(accountData) => accountData.id_worker}
                            className="text-center"
                        />
                    </Box>
                </Card>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

export default WorkerAccount;
