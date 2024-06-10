import { React, useState, useEffect } from "react";
import {
    Card,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import {
    PlusCircleIcon,
    MapPinIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
import { Divider } from "@mui/material";
import {useWindowSize} from "@/Core/Resize";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
function ApplicationBanner() {
    const { width, height } = useWindowSize(65);
    const [popupData, setPopupData] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [info_popup, setFormDataPopup] = useState({
        popup_title: "",
        // popup_image: "",
        popup_discount: "",
        popup_description: "",
        popup_date_begin: "",
        popup_date_end: "",
        popup_status: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataPopup({ ...info_popup, [name]: value });
    };
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFiles(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL_API = "/api/web/popup-discount";
        const formData = new FormData();
        // formData.append("avatar_new", selectedFiles.avatar_new);
        formData.append("popup_title", info_popup.popup_title);
        formData.append("popup_discount", info_popup.popup_discount);
        formData.append("popup_description", info_popup.popup_description);
        formData.append("popup_date_begin", info_popup.popup_date_begin);
        formData.append("popup_date_end", info_popup.popup_date_end);
        formData.append("popup_status", info_popup.popup_status);
        formData.append("popup_image", selectedFiles);
        try {
            const response = await fetch(URL_API + "/store", {
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
            } else {
                console.error("Lỗi khi gửi dữ liệu:", response.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    };
    useEffect(() => {
        fetch(`${host}api/web/popup-discount`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error Status Network");
                }
                return response.json();
            })
            .then((data) => {
                setPopupData(data);
            })
            .catch((error) => {
                console.error("Error API:", error);
            });
    }, []);
    const columnVideo = [
        {
            field: "No",
            headerName: "No",
            width: 80,
            editable: false,
            align: "center",
        },
        {
            field: "local",
            headerName: "Vị Trí",
            type: "text",
            editable: false,
            width: 300,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Input type="text" value={"params"} disabled />
                    </>
                );
            },
        },
        {
            field: "ImgPreview",
            headerName: "Hình",
            type: "text",
            width: 80,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <img
                        className="w-10 h-10"
                        src="https://i.pinimg.com/474x/61/8a/74/618a7401f69608d55b14c46e15efbc4b.jpg"
                        alt=""
                    />
                );
            },
        },
        {
            field: "Edit",
            headerName: "Sửa",
            type: "text",
            width: 220,
            editable: false,
            align: "center",
            renderCell: (params) => {
                const [openLinkVideo, setOpenLinkVideo] = useState(false);
                const [changeLinkVideo, setChangeLinkVideo] = useState();
                const handleOpenLinkVideo = () =>
                    setOpenLinkVideo(!openLinkVideo);
                return (
                    <>
                        <Button
                            className=""
                            variant="outlined"
                            color="blue"
                            onClick={handleOpenLinkVideo}
                        >
                            Chọn
                        </Button>
                        <Dialog
                            open={openLinkVideo}
                            handler={handleOpenLinkVideo}
                        >
                            <DialogHeader>Đường Dẫn Media</DialogHeader>
                            <Divider />
                            <DialogBody>
                                <Input
                                    label="Đường Link"
                                    className="shadow-none "
                                    value={changeLinkVideo}
                                    onChange={(e) =>
                                        setChangeLinkVideo(e.target.value)
                                    }
                                />
                            </DialogBody>
                            <Divider />
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpenLinkVideo}
                                    className="mr-1"
                                >
                                    <span>Hủy</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleOpenLinkVideo}
                                >
                                    <span>Lưu</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                );
            },
        },
        {
            field: "update",
            headerName: "Cập Nhật",
            type: "text",
            width: 220,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Button className="" variant="outlined" color="green">
                            Cập Nhật Banner
                        </Button>
                    </>
                );
            },
        },
    ];
    const columnBannerTop = [
        {
            field: "No",
            headerName: "No",
            width: 80,
            editable: false,
            align: "center",
        },
        {
            field: "local",
            headerName: "Vị Trí",
            type: "text",
            editable: false,
            width: 300,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Input type="text" value={"params"} disabled />
                    </>
                );
            },
        },
        {
            field: "ImgPreview",
            headerName: "Hình",
            type: "text",
            width: 80,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <img
                        className="w-10 h-10"
                        src="https://thoviet.com.vn/wp-content/uploads/2023/01/VSML-adsZalo-2-1536x960.jpg"
                        alt=""
                    />
                );
            },
        },
        {
            field: "Edit",
            headerName: "Sửa",
            type: "text",
            width: 220,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Button className="" variant="outlined" color="blue">
                            Sửa
                        </Button>
                    </>
                );
            },
        },
        {
            field: "update",
            headerName: "Cập Nhật",
            type: "text",
            width: 220,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Button className="" variant="outlined" color="green">
                            Cập Nhật Banner
                        </Button>
                    </>
                );
            },
        },
    ];
    const columnBannerBot = [
        {
            field: "No",
            headerName: "No",
            width: 80,
            editable: false,
            align: "center",
        },
        {
            field: "local",
            headerName: "Vị Trí",
            type: "text",
            editable: false,
            width: 300,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Input type="text" value={"params"} disabled />
                    </>
                );
            },
        },
        {
            field: "ImgPreview",
            headerName: "Hình",
            type: "text",
            width: 80,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <img
                        className="w-10 h-10"
                        src="https://thoviet.com.vn/wp-content/uploads/2023/01/VSML-adsZalo-2-1536x960.jpg"
                        alt=""
                    />
                );
            },
        },
        {
            field: "Edit",
            headerName: "Sửa",
            type: "text",
            width: 220,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Button className="" variant="outlined" color="blue">
                            Sửa
                        </Button>
                    </>
                );
            },
        },
        {
            field: "update",
            headerName: "Cập Nhật",
            type: "text",
            width: 220,
            editable: false,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Button className="" variant="outlined" color="green">
                            Cập Nhật Banner
                        </Button>
                    </>
                );
            },
        },
    ];
    const rows = [
        {
            id: 1,
            No: 1,
            local: 1,
            ImgPreview: 1,
            Edit: 25,
            update: 11,
        },
        {
            id: 2,
            No: 2,
            local: 1,
            ImgPreview: 1,
            Edit: 25,
            update: 11,
        },
    ];
    const result1 = Math.floor(height / 2);
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Danh Sách Banner Hiển thị Trên App" />
            <div className={`p-1 h-[${height}]px`}>
                <Card className="text-center bg-green-400 rounded shadow-md">
                    <h2 className="w-full p-2 text-2xl font-bold text-white ">
                        Thêm Banner Ứng Dụng
                    </h2>
                </Card>
                <Box sx={{ height: { height }, width: 1 }}>
                    <Box sx={{ height: { result1 } }}>
                        <div className="p-2">
                            <Card>
                                <h2 className="w-full p-2 text-2xl font-bold">
                                    Thêm Video
                                </h2>
                            </Card>
                            <Card className={`w-[${width}px]  mt-1`}>
                                <Box sx={{ height: "w-fit", width: 1 }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columnVideo}
                                        className="text-center "
                                        autoHeight
                                    />
                                </Box>
                            </Card>
                        </div>
                    </Box>
                    <Box sx={{ height: { result1 }, width: 1 }}>
                        <div className="grid grid-cols-2 gap-2 ">
                            <div className="p-2 pt-0 pr-0">
                                <Card className="flex flex-row items-center">
                                    <h2 className="w-full p-2 text-2xl font-bold">
                                        Thêm Banner Trên
                                    </h2>
                                    <Tooltip content="Thêm Thợ Mới">
                                        <PlusCircleIcon
                                            className="w-10 h-10 pointer-events-auto"
                                            color="#0056ffeb"
                                            onClick={handleOpen}
                                        />
                                    </Tooltip>
                                </Card>

                                <Card className={`w-[${width}px]  mt-1`}>
                                    <Box sx={{ height: "w-fit", width: 1 }}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columnBannerTop}
                                            className="text-center "
                                            autoHeight
                                        />
                                    </Box>
                                </Card>
                            </div>
                            <div className="p-2 pt-0 pl-0">
                                <Card className="flex flex-row items-center">
                                    <h2 className="w-full p-2 text-2xl font-bold ">
                                        Thêm Banner Dưới
                                    </h2>
                                    <Tooltip content="Thêm Thợ Mới">
                                        <PlusCircleIcon
                                            className="w-10 h-10 pointer-events-auto"
                                            color="#0056ffeb"
                                            onClick={handleOpen}
                                        />
                                    </Tooltip>
                                </Card>

                                <Card className={`w-[${width}px]  mt-1`}>
                                    <Box sx={{ height: "w-fit", width: 1 }}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columnBannerBot}
                                            className="text-center "
                                            autoHeight
                                        />
                                    </Box>
                                </Card>
                            </div>
                        </div>
                    </Box>
                </Box>
            </div>
            <Dialog open={open} handler={handleOpen}>
                <div className="flex items-center justify-center">
                    <DialogHeader>
                        {" "}
                        Chọn Banner Mới và Vị trí Hiển thị{" "}
                    </DialogHeader>
                </div>
                <Divider></Divider>
                <DialogBody className="grid grid-cols-2 gap-2">
                    <Input
                        className="shadow-none"
                        label="Tên Chương trình"
                        value={info_popup.popup_title}
                        name="popup_title"
                        required
                        onChange={handleChange}
                    />
                    <Input
                        className="shadow-none"
                        label="Khuyến mãi"
                        value={info_popup.popup_discount}
                        name="popup_discount"
                        required
                        onChange={handleChange}
                    />
                    <div className="col-span-2">
                        <Input
                            className="shadow-none"
                            label="Mô tả"
                            value={info_popup.popup_description}
                            name="popup_description"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <Input
                        type="date"
                        className="shadow-none"
                        label="Ngày bắt đầu"
                        value={info_popup.popup_date_begin}
                        name="popup_date_begin"
                        required
                        onChange={handleChange}
                    />
                    <Input
                        type="date"
                        className="shadow-none"
                        label="Ngày kết thúc"
                        value={info_popup.popup_date_end}
                        name="popup_date_end"
                        required
                        onChange={handleChange}
                    />
                    <div className="col-span-2">
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
                </DialogBody>
                <Divider></Divider>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        // onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleSubmit}
                    >
                        <span>Lưu</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </AuthenticatedLayoutAdmin>
    );
}

export default ApplicationBanner;
