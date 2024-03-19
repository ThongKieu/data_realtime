import { React, useState, useEffect, createRef } from "react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
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
import {
    PlusCircleIcon,
    MapPinIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { host } from "@/Utils/UrlApi";
import useWindowSize from "@/Core/Resize";
function WorkerList({ auth }) {
    // thêm thợ
    const [open, setOpen] = useState(false);
    const [openAccApp, setOpenAccApp] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [rows, setData] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [info_worker, setFormDataWorker] = useState({
        worker_full_name: "",
        worker_address: "",
        worker_phone_company: "",
        worker_phone_personal: "",
        worker_kind: 0,
    });
    const [accAPP, setAccApp] = useState(null);
    const { width, height } = useWindowSize(65);
    const handleOpen = () => setOpen(!open);
    const handleOpenAccApp = () => setOpenAccApp(!openAccApp);
    const handleSelectChange = (e) => {};
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
        // get info to form
        console.log(info_worker.worker_full_name);
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
        console.log("test");
        try {
            const response = await fetch(URL_API + "/addNew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: formData,
            });
            // console.log("formData", formData);
            if (response.ok) {
                const responseData = await response.json();
                console.log(
                    "Dữ liệu đã được gửi và phản hồi từ máy chủ:",
                    responseData
                );
                setAccApp(responseData);
                handleOpenAccApp();
            } else {
                console.error("Lỗi khi gửi dữ liệu:", response.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    };
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    useEffect(() => {
        // Gọi API để lấy dữ liệu
        fetch(host + "api/web/workers")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data); // Lưu dữ liệu vào trạng thái React
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
            });
    }, []);
    // useEffect chỉ chạy một lần sau khi render đầu tiên
    const fetchData = async (data1) => {
        try {
            const res = await fetch(host + "api/web/update/worker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data1),
            });
            if (res.ok) {
                console.log("status_change_worker");
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // fetch data phone
    const fetchDataPhone = async (data) => {
        try {
            const res = await fetch(host + "api/web/update/worker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                console.log("status_change_worker");
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
            const response = await fetch(host + "api/web/update/worker", {
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
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Hiển thị dữ liệu bảng
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
            renderCell: (params) => {
                return <span className="text-center">{params.id}</span>;
            },
        },
        {
            field: "fullName",
            headerName: "Họ Tên",
            description: "This column has a value getter and is not sortable.",
            sortable: true,
            width: 160,
            editable: false,
            valueGetter: (params) => `${params.row.worker_full_name} `,
        },
        {
            field: "worker_code",
            headerName: "Mã",
            width: 70,
            editable: false,
            renderCell: (params) => {
                return (
                    <span className="text-center">
                        {params.row.worker_code}
                    </span>
                );
            },
        },
        {
            field: "last_active",
            headerName: "Last Active",
            width: 300,
            editable: false,
            renderCell: (params) => {
                const d_active = params.row.last_active.d;
                const m_active = params.row.last_active.m;
                const y_active = params.row.last_active.y;
                const h_active = params.row.last_active.h;
                const i_active = params.row.last_active.i;
                return y_active == 0 ? (
                    <span className="text-center">
                        {m_active} Tháng {d_active} Ngày {h_active} Giờ{" "}
                        {i_active} Giây trước{" "}
                    </span>
                ) : (
                    <span className="text-center">
                        {y_active} Năm {m_active} Tháng {d_active} Ngày{" "}
                        {h_active} Giờ {i_active} Giây trước{" "}
                    </span>
                );
            },
        },
        {
            field: "null",
            headerName: "Vị Trí",
            width: 80,
            editable: false,
            renderCell: (params) => {
                return (
                    <a
                        href={`${host}workers/vi-tri-tho?id_worker=${params.row.id}`}
                        className="font-normal"
                    >
                        <MapPinIcon className="w-5 h-5 text-red-500" />
                    </a>
                );
            },
        },
        {
            field: "worker_address",
            headerName: "Địa Chỉ",
            width: 180,
            editable: false,
        },
        {
            field: "worker_phone_company",
            headerName: "Số Công ty",
            width: 120,
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
                        fetchDataPhone(dataPhone);
                        inputRef.current.blur();
                    }
                };
                return (
                    <Input
                        ref={inputRef}
                        defaultValue={params.value}
                        onKeyDown={updatePhone}
                        className="text-center bg-white border-none rounded-none outline-none "
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
            width: 150,
            editable: false,
        },
        {
            field: "status_worker",
            headerName: "Tinh trạng",
            width: 300,
            editable: false,
            renderCell: (params) => {
                const handleChangeva = (event) => {
                    // Xử lý sự thay đổi của lựa chọn ở đây
                    const selectedValue = event.target.value;
                    const data_set = {
                        action: "status_change_worker",
                        id: params.id,
                        status: selectedValue,
                    };
                    fetchData(data_set);
                };
                return (
                    <select
                        defaultValue={params.row.worker_status}
                        onChange={handleChangeva}
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
            field: "avatar",
            headerName: "Ảnh",
            renderCell: (params) => {
                // console.log(params);
                const [open, setOpen] = useState(false);
                const handleOpen = () => setOpen(!open);
                const [selectedImage, setSelectedImage] = useState(null);
                const [imagePreview, setImagePreview] = useState(null);
                // Hàm xử lý khi người dùng chọn hình ảnh
                const handleImageSelect = (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const url = URL.createObjectURL(file);

                        setImagePreview(url);
                    }
                    setSelectedImage(file);
                };
                const isImage = selectedImage ? "d-none" : "d-block";
                const handleSubmitImageUpdate = async (e) => {
                    e.preventDefault();
                    const formDataImage = new FormData();
                    formDataImage.append("id", params.id);
                    formDataImage.append("worker_code", params.row.worker_code);
                    formDataImage.append("action", "avatar_change_worker");
                    formDataImage.append("avatar_new", selectedImage);
                    fetchDataImage(formDataImage);
                    handleOpen();
                };

                if (params.field === "avatar") {
                    const imagePreview1 = selectedImage ? (
                        <img
                            src={imagePreview}
                            alt="Avatar"
                            className="w-full h-full"
                        />
                    ) : (
                        <div className="text-white ">
                            <span>Chưa có hình ảnh</span>
                        </div>
                    );
                    return (
                        <>
                            <Button onClick={handleOpen} className="bg-white">
                                <img
                                    src={
                                        params.row.worker_avatar !== null
                                            ? host + params.row.worker_avatar
                                            : `https://thoviet.com.vn/wp-content/uploads/2022/10/pngtree-top-quality-golden-shield-icon-flat-style-png-image_1807309-1.jpg`
                                    }
                                    alt="Avatar"
                                    className="w-10"
                                />
                            </Button>
                            <Dialog
                                open={open}
                                handler={handleOpen}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                            >
                                <DialogHeader>Cập Nhật Avatar</DialogHeader>
                                <DialogBody divider>
                                    <div className="grid grid-cols-6 text-center align-middle">
                                        <div className="flex items-center justify-center w-full col-span-4 rounded-l-lg bg-blue-gray-400">
                                            {imagePreview1}
                                        </div>
                                        <div className="w-full col-span-2 h-28">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="!border !border-gray-300 bg-white text-gray-900 shadow-none h-28 rounded-l-none  "
                                                labelProps={{
                                                    className: "hidden",
                                                }}
                                                containerProps={{
                                                    className: "h-28",
                                                }}
                                                onChange={handleImageSelect}
                                            />
                                        </div>
                                    </div>
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleOpen}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        color="green"
                                        onClick={handleSubmitImageUpdate}
                                    >
                                        <span>Cập Nhật</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </>
                    );
                }
            },
            width: 150,
            // editable: true,
        },
        {
            field: "worker_check_acc",
            headerName: "Tài Khoản",
            align: "center",
            renderCell: (params) => {
                const handleActiveAccApp = () => {
                    const data = {
                        id: params.row.id,
                        acc:
                            params.row.worker_code +
                            params.row.worker_phone_company,
                        pass: "Thoviet58568",
                        avatar:params.row?.worker_avatar
                    };
                    console.log("test", data);
                };
                if (params.field === "worker_check_acc") {
                    switch (params.value) {
                        case 0:
                            return (
                                <Button
                                    className="p-2 text-center"
                                    variant="outlined"
                                    onClick={() => handleActiveAccApp()}
                                >
                                    <UserPlusIcon className="w-5 h-5" />
                                </Button>
                            );
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
            width: 150,
            editable: false,
        },
    ];
    return (
        <AuthenticatedLayoutAdmin children={auth.user} user={auth.user}>
            <Head title="Danh sách thợ" />
            <div className="p-1">
                <Card className="m-1 mt-0">
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
                <Card className={`w-[${width}px] m-1 mt-1`}>
                    <Box sx={{ height: height, width: 1 }}>
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
                            className="text-center "
                        />
                    </Box>
                </Card>
            </div>

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
                                id="worker_full_name"
                                name="worker_full_name"
                                value={info_worker.worker_full_name}
                                onChange={handleChange}
                                label="Họ Và Tên"
                                required
                            />

                            <Input
                                type="text"
                                className="shadow-none"
                                id="worker_address"
                                name="worker_address"
                                value={info_worker.worker_address}
                                onChange={handleChange}
                                label="Địa Chỉ"
                                required
                            />
                            <Input
                                type="text"
                                className="shadow-none"
                                id="worker_phone_company"
                                name="worker_phone_company"
                                value={info_worker.worker_phone_company}
                                onChange={handleChange}
                                label="Số Công Ty"
                                required
                            />
                            <Input
                                type="text"
                                className="shadow-none"
                                id="worker_phone_personal"
                                name="worker_phone_personal"
                                value={info_worker.worker_phone_personal}
                                onChange={handleChange}
                                label="Số Cá Nhân"
                                required
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
                                required
                            >
                                {/* <option value="">Vui lòng chọn loại thợ</option> */}
                                <option value={0}>Điện Nước</option>
                                <option value={1}>Điện Lạnh</option>
                                <option value={2}>Đồ Gỗ</option>
                                <option value={3}>Năng lượng mặt trời</option>
                                <option value={4}>Xây Dựng</option>
                                <option value={5}>Tài Xế</option>
                                <option value={6}>Cơ Khí</option>
                            </select>
                        </div>
                        <div>
                            <input
                                id="avatar_new"
                                type="file"
                                onChange={handleFileChange}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                            />
                        </div>
                        <div className="m-1">
                            <label className="shadow-none" size="lg">
                                Tên tắt vd: A01,A02..
                            </label>
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
                        <Button
                            variant="gradient"
                            color="green"
                            type="submit"
                            // onClick={handleOpenAccApp}
                        >
                            <span>Lưu</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
            <Dialog open={openAccApp} handler={handleOpenAccApp}>
                <DialogHeader>
                    <div className="m-auto">Thông Tin Tài Khoản APP</div>
                </DialogHeader>
                <DialogBody divider>
                    <div className="p-5 border border-green-500 rounded-lg">
                        <p className="pb-2 font-bold">
                            Tên Đăng Nhập:
                            <span className="pl-2 italic tracking-wide text-red-500">
                                {accAPP?.acc}
                            </span>
                        </p>
                        <p className="font-bold">
                            Mật Khẩu:
                            <span className="pl-2 italic tracking-wide text-red-500">
                                {accAPP?.pass}
                            </span>
                        </p>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="green"
                        onClick={handleOpenAccApp}
                        className="mr-1"
                    >
                        <span>Đã Xem</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </AuthenticatedLayoutAdmin>
    );
}
export default WorkerList;
