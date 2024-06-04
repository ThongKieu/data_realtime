import { React, useState, useEffect, createRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Card,
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import { PlusCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { host } from "@/Utils/UrlApi";
import newSocket from "@/Utils/Socket";
function WorkersMain({ auth }) {
    // thêm thợ
    const [open, setOpen] = useState(false);
    const [info_worker, setFormDataWorker] = useState({
        worker_full_name: "",
        worker_address: "",
        worker_phone_company: "",
        worker_phone_personal: "",
        worker_kind: "",
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleOpen = () => setOpen(!open);
    const handleSelectChange = (e) => {
        setFormDataWorker({ ...info_worker, worker_kind: e.target.value });
        // Cập nhật trạng thái khi người dùng chọn tùy chọn
    };
    const handleFileChange = (event) => {
        setSelectedFiles({ avatar_new: event.target.files[0] });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataWorker({ ...info_worker, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const URL_API = "/api/web/workers";
        const formData = new FormData();
        formData.append("avatar_new", selectedFiles.avatar_new);
        formData.append("worker_full_name", info_worker.worker_full_name);
        formData.append("worker_address", info_worker.worker_address);
        formData.append(
            "worker_phone_company",
            info_worker.worker_phone_company
        );
        formData.append(
            "worker_phone_personal",
            info_worker.worker_phone_personal
        );
        formData.append("worker_kind", info_worker.worker_kind);

        try {
            const response = await fetch(URL_API + "/addNew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: formData,
            });
            console.log("formData", formData);
            if (response.ok) {
                const responseData = await response.json();
                console.log(
                    "Dữ liệu đã được gửi và phản hồi từ máy chủ:",
                    responseData
                );
                console.log(responseData);
                window.location.reload();
            } else {
                console.error("Lỗi khi gửi dữ liệu:", response.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    };
    const [rowModesModel, setRowModesModel] = useState({});
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const [rows, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const infoFetchData = async (data) => {
        try {
            await fetch("api/web/workers")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data); // Lưu dữ liệu vào trạng thái React
                    setLoading(true); // Đã lấy xong dữ liệu
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu từ API:", error);
                });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log(rows);
    // useEffect chỉ chạy một lần sau khi render đầu tiên
    const fetchData = async (data1) => {
        try {
            const res = await fetch("api/web/update/worker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data1),
            });

            if (res.ok) {
                console.log("status_change_worker");
                newSocket.emit("addWorkTo_Server", "status_change_worker");
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // ------------------------------fetch data image----------------------------
    const fetchDataImage = async (data) => {
        try {
            const response = await fetch("api/web/update/worker", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: data,
            });
            if (response.status === 200) {
                console.log("Gửi Hình Đi Thành Công");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        infoFetchData();
    }, []);
    // Hiển thị dữ liệu bảng
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 30,
            renderCell: (params) => {
                return <span className="text-center">{params.id}</span>;
            },
        },
        {
            field: "worker_full_name",
            headerName: "Họ Tên",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 180,
            editable: false,
            valueGetter: (params) => `${params.row.worker_full_name} `,
        },
        {
            field: "worker_code",
            headerName: "Mã",
            width: 120,
            editable: false,
        },
        {
            field: "worker_address",
            headerName: "Địa Chỉ",
            width: 200,
            editable: false,
        },
        {
            field: "null",
            headerName: "Vị trí",
            width: 180,
            editable: false,
            renderCell: (params) => {
                return (
                    <div className="flex flex-row justify-center w-full">
                        <a
                            href={`${host}workers/vi-tri-tho?id_worker=${params.row.id}`}
                            className="font-normal"
                        >
                            <MapPinIcon className="w-5 h-5 text-red-500" />
                        </a>
                    </div>
                );
            },
        },
        {
            field: "last_active",
            headerName: "Last Active",
            width: 200,
            editable: false,
            renderCell: (params) => {
                const lastActive = params.row.last_active;
                const a1 = lastActive.h;
                if (lastActive.d >= 1 && lastActive.m === 0) {
                    var a = `${lastActive.d} ngày`;
                } else if (lastActive.d === 0 && lastActive.m >= 1) {
                    var a = `${lastActive.m} tháng`;
                } else if (lastActive.d >= 1 && lastActive.m >= 1) {
                    var a = `${lastActive.m} tháng ${lastActive.d} ngày`;
                } else {
                    var a = `${lastActive.h} giờ `;
                }
                return <div>online {a} trước</div>;
            },
        },
        {
            field: "worker_phone_company",
            headerName: "Số Công ty",
            width: 140,
            editable: false,
            renderCell: (params) => {
                const inputRef = createRef();
                const updatePhone = (e) => {
                    const set123 = e.target.value;
                    const dataPhone = {
                        action: "phone_change_worker",
                        id: params.id,
                        phone_ct: set123,
                    };

                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        fetchData(dataPhone);
                        inputRef.current.blur();
                    }
                };
                return (
                    <Input
                        ref={inputRef}
                        defaultValue={params.value}
                        onKeyDown={updatePhone}
                        className="text-center bg-white border-none rounded-none outline-none w-fit"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                );
            },
        },
        {
            field: "worker_phone_personal",
            headerName: "Số cá nhân",
            width: 140,
            editable: false,
        },
        {
            field: "worker_status",
            headerName: "Tinh trạng",
            width: 200,
            editable: false,
            renderCell: (params) => {
                const [selectedValue, setSelectedValue] = useState();
                const handleSelectChange = (event) => {
                    const newValue = event.target.value;
                    if (
                        newValue !== undefined &&
                        newValue !== null &&
                        newValue !== ""
                    ) {
                        setSelectedValue(newValue);
                        const data_set = {
                            action: "status_change_worker",
                            id: params.id,
                            status: newValue,
                        };
                        fetchData(data_set);
                    }
                };
                return (
                    <select
                        defaultValue={params.row.worker_status}
                        value={selectedValue}
                        onChange={handleSelectChange}
                        style={{ minWidth: "120px" }}
                    >
                        <option value="0">Làm Bình Thường</option>
                        <option value="1">Nghỉ Phép</option>
                        <option value="2">Đã Nghỉ</option>
                    </select>
                );
            },
        },
        {
            field: "worker_avatar",
            headerName: "Ảnh",
            width: 100,
            renderCell: (params) => {
                return (
                    <div >
                        <img
                            src={
                                params.row.worker_avatar !== null
                                    ? host + params.row.worker_avatar
                                    : `https://thoviet.com.vn/wp-content/uploads/2022/10/pngtree-top-quality-golden-shield-icon-flat-style-png-image_1807309-1.jpg`
                            }
                            alt="Avatar"
                            className="w-14 h-14"
                        />
                    </div>
                );
            },
        },
        {
            field: "worker_check_acc",
            headerName: "Tài Khoản",
            width: 250,
            editable: false,
            renderCell: (params) => {
                if (params.field === "worker_check_acc") {
                    switch (params.value) {
                        case 0:
                            return "Chưa có, vui lòng liên hệ Admin.";
                        case 1:
                            return "Đã có chưa kích hoạt";
                        case 2:
                            return "Đã kích hoạt";
                        case 3:
                            return "Vô hiệu hóa";
                    }
                }
                return <p className="break-words">{params.value}</p>;
            },
        },
    ];
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang quản lý thông tin thợ" />

            <Card className="mt-2">
                <div className="grid m-2 justify-items-stretch ">
                    <div className="justify-self-end">
                        <Tooltip content="Thêm Thợ Mới">
                            <PlusCircleIcon
                                className="w-10 h-10 pointer-events-auto"
                                color="#0056ffeb"
                                onClick={handleOpen}
                            />
                        </Tooltip>
                    </div>
                </div>
            </Card>
            <Dialog open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <div className="m-auto">Nhập thông tin thợ mới</div>
                    </DialogHeader>
                    <DialogBody divider>
                        <div className="grid grid-cols-2 gap-2 m-1 ">
                            <Input
                                type="text"
                                className="shadow-none"
                                id="name"
                                name="worker_full_name"
                                value={info_worker.worker_full_name}
                                onChange={handleChange}
                                label="Họ"
                            />

                            <Input
                                type="text"
                                className="shadow-none"
                                id="name"
                                name="worker_address"
                                value={info_worker.worker_address}
                                onChange={handleChange}
                                label="Địa Chỉ"
                            />

                            <Input
                                type="text"
                                className="shadow-none"
                                id="name"
                                name="worker_phone_company"
                                value={info_worker.worker_phone_company}
                                onChange={handleChange}
                                label="Số Công Ty"
                            />
                            <Input
                                type="text"
                                className="shadow-none"
                                id="name"
                                name="worker_phone_personal"
                                value={info_worker.worker_phone_personal}
                                onChange={handleChange}
                                label="Số Cá Nhân"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 m-1 "></div>
                        <div className="m-1">
                            <select
                                id="worker_kind"
                                name="worker_kind"
                                value={info_worker.worker_kind}
                                onChange={handleSelectChange}
                                className="w-full border rounded-lg"
                            >
                                <option value="">Vui lòng chọn loại thợ</option>
                                <option value={0}>Điện Nước</option>
                                <option value={1}>Điện Lạnh</option>
                                <option value={2}>Đồ Gỗ</option>
                                <option value={3}>Năng lượng mặt trời</option>
                                <option value={4}>Xây Dựng</option>
                                <option value={5}>Tài Xế</option>
                                <option value={6}>Cơ Khí</option>
                            </select>
                            <input
                                id="avatar_new"
                                type="file"
                                onChange={handleFileChange}
                                className="w-full mt-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                            />
                        </div>
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
                        <Button variant="gradient" color="green" type="submit">
                            <span>Lưu</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
            {/* -Đổ dữ liệu thợ- */}
            <Card className="w-[98%] m-auto mt-1">
                <Box sx={{ width: 1 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        // slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                        className="text-center"
                        autoHeight
                    />
                </Box>
            </Card>
        </AuthenticatedLayout>
    );
}

export default WorkersMain;
