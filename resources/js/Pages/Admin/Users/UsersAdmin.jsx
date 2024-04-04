import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Card,
    Typography,
    Input,
    Button,
    Textarea,
    Spinner,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import { Box, Divider } from "@mui/material";
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridToolbar,
} from "@mui/x-data-grid";
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

function UsersAdmin({ auth }) {
    const [isLoading, setIsLoading] = useState(true);
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
            field: "name",
            headerName: "Họ Tên",
            type: "text",
            editable: false,
            align: "left",
            width: 250,
            headerAlign: "left",
        },
        {
            field: "email",
            headerName: "Email",
            type: "text",
            width: 220,
            editable: false,
        },
        {
            field: "phone_cty",
            headerName: "Số Công Ty",
            type: "text",
            width: 200,
            editable: false,
            renderCell: (params) => {
                return (
                    <div className="m-auto text-center">
                        <a href={`tel:${params.row.phone_cty}`}>
                            {params.row.phone_cty}
                        </a>
                    </div>
                );
            },
        },
        {
            field: "permission",
            headerName: "Quyền",
            type: "text",
            width: 250,
            editable: false,
            renderCell: (params) => {
                const [openPer, setOpenPer] = useState(false);
                const [permission, setPermission] = useState(false);
                const handleOpenPer = () => setOpenPer(!openPer);
                // console.log(params);
                const handleRessetPermission = async (id) => {
                    try {
                        console.log("xin chao", permission);

                        let data = { id: id, permission: permission };
                        const response = await fetch(
                            host + "api/web/users/resper",
                            {
                                method: "POST",
                                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                                headers: {
                                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                                },
                            }
                        );
                        if (response.ok) {
                            handleOpenPer();
                            alert("Đổi Quyền Thành Công");
                            window.location.reload();
                        }
                    } catch (error) {
                        console.log("Lỗi:", error);
                    }
                };
                return (
                    <>
                        <div
                            className={`flex flex-row items-center justify-${
                                auth.user.permission == 2 ? "between" : "center"
                            } w-full`}
                        >
                            <>
                                {params.row.permission == 0 ? (
                                    <p className="text-center text-green-500">
                                        Supper Admin
                                    </p>
                                ) : params.row.permission == 1 ? (
                                    <p className="text-center text-blue-500">
                                        Admin
                                    </p>
                                ) : (
                                    <p className="text-center text-red-500">

                                        Người dùng
                                    </p>
                                )}
                            </>
                            <>
                                {auth.user.permission == 2 ? (
                                    <Tooltip content="Doi Quyền">
                                        <Button
                                            onClick={handleOpenPer}
                                            color="blue"
                                            variant="outlined"
                                            className="p-2"
                                        >
                                            <UserPlusIcon className="w-5 h-5 p-0 text-blue-500 " />
                                        </Button>
                                    </Tooltip>
                                ) : (
                                    ""
                                )}
                            </>
                        </div>
                        <Dialog
                            open={openPer}
                            handler={handleOpenPer}
                            size="sm"
                        >
                            <div className="flex items-center justify-center">
                                <DialogHeader>Nhập Thông Tin</DialogHeader>
                            </div>
                            <Divider></Divider>

                            <DialogBody className="w-full">
                                <select
                                    className="w-full"
                                    name="permission"
                                    onChange={(e) => {
                                        setPermission(e.target.value);
                                    }}
                                    value={permission}
                                >
                                    <option value="0">
                                        {" "}
                                        Người dùng thường{" "}
                                    </option>
                                    <option value="1"> Quyền vào Admin </option>
                                    <option value="2"> Quản lý cấp cao </option>
                                </select>
                            </DialogBody>
                            <Divider></Divider>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpenPer}
                                    className="mr-1"
                                >
                                    <span>Hủy</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={() => {
                                        handleRessetPermission(params.row.id);
                                    }}
                                >
                                    <span>Lưu</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                        {/* <Button
                            className='w-6 h-6 p-0'
                            onClick={() => { handleRessetPermission(params.row.id) }}
                        >
                            <ClipboardDocumentListIcon

                            ></ClipboardDocumentListIcon>
                        </Button> */}
                    </>
                );
            },
        },
        {
            field: "is_online",
            headerName: "Trạng Thái",
            type: "text",
            width: 250,
            editable: false,
            renderCell: (params) => {
                return (
                    <div className="m-auto">
                        {params.row.is_online != 1 ? (
                            <p className="text-center text-red-500">Offline</p>
                        ) : (
                            <p className="text-center text-green-500">
                                Online
                            </p>
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
                return <img src={host + params.row.avatar} className="w-10" />;
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
                    <div className="m-auto">
                        <Button
                            onClick={() => {
                                handleResset(params.row.id);
                            }}
                            className="text-center bg-white"
                        >
                            <ArrowPathIcon className="w-5 text-black "></ArrowPathIcon>
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
        if (
            formData.name == null ||
            formData.email == null ||
            formData.sdt == null ||
            formData.name == "" ||
            formData.email == "" ||
            formData.sdt == ""
        ) {
            alert(" Thiếu Thông Tin!!!!!!!!!!!!!!");
        } else {
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [getData, usersData] = useState([]);
    const [formDataPer, usersDataPer] = useState({
        permission: "",
    });
    const [formData, setFormData] = useState({
        name: "",
        sdt: "",
        email: "",
        password: "Thoviet58568!@#",
        permission: 0,
    });
    // const [formReset, setFormReset] = useState('');
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
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        usersDataPer((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // đổi mật khâu
    const handleResset = async () => {
        try {
            // console.log(id);

            // let data = { id: id };
            const response = await fetch(host + "api/web/users/respw", {
                method: "POST",
                body: JSON.stringify(formDataPer), // Gửi dữ liệu dưới dạng JSON
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
            });
            if (response.ok) {
                // handleOpen();
                alert("Tài Khoản Đã đổi mật khẩu: ");
                window.location.reload();
            }
        } catch (error) {
            console.log("Lỗi:", error);
        }
    };
    // Đổi quyền

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Danh Sách Nhân Viên" />
            <div className="flex justify-center h-screen p-2">
                <Card className="flex flex-row w-full h-full m-auto bg-white">
                    <Card className=" rounded w-[100%]">
                        <div className="grid grid-cols-5 gap-2 bg-green-400">
                            <Typography className="col-start-3 m-2 font-extrabold text-white">
                                Danh Sách Người Dùng WEBSITE
                            </Typography>
                            <Button
                                onClick={handleOpen}
                                variant="gradient"
                                className="col-start-5 m-2"
                            >
                                Thêm người dùng
                            </Button>
                            <Dialog open={open} handler={handleOpen}>
                                <div className="flex items-center justify-center">
                                    <DialogHeader>Nhập Thông Tin</DialogHeader>
                                </div>

                                <Divider></Divider>
                                <DialogBody className="grid grid-cols-2 gap-3">

                                    <Input
                                        className="shadow-none"
                                        label="Tên"
                                        value={formData.ten}
                                        name="name"
                                        required
                                        onChange={handleChange}
                                    />
                                    <Input
                                        className="shadow-none"
                                        label="Số Liên Hệ"
                                        value={formData.sdt}
                                        name="sdt"
                                        required
                                        onChange={handleChange}
                                    />
                                    <Input
                                        className="shadow-none"
                                        label="Email"
                                        value={formData.email}
                                        name="email"
                                        required
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="permission"
                                        onChange={handleChange}
                                        value={formData.permission}
                                    >
                                        <option value="0">
                                            {" "}
                                            Người dùng thường{" "}
                                        </option>
                                        <option value="1">
                                            {" "}
                                            Quyền vào Admin{" "}
                                        </option>
                                        <option value="2">
                                            {" "}
                                            Quản lý cấp cao{" "}
                                        </option>
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
                                    <Button
                                        variant="gradient"
                                        color="green"
                                        onClick={handleAddUser}
                                    >
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
                            </Box>
                        )}
                    </Card>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

export default UsersAdmin;
