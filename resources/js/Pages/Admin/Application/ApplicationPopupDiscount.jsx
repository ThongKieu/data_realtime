import { React, useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
} from "@material-tailwind/react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
import { Divider } from "@mui/material";

import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import useWindowSize from "@/Core/Resize";
const TABLE_HEAD = [
    "STT",
    "Tên",
    "Nội Dung",
    "% Khuyến Mãi",
    "Hình Ảnh",
    "Bắt Đầu",
    "Kết Thúc",
    "Sửa",
];

function ApplicationPopupDiscount() {
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
    const { width, height } = useWindowSize(200);
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
                handleOpen();
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

                console.log(data);
            })
            .catch((error) => {
                console.error("Error API:", error);
            });
    }, []);
    const columns = [
        {
            field: "id",
            headerName: "STT",
            width: 50,
            align: "center",
            renderCell: (params) => {
                console.log(params);
                return <p>{params.id}</p>;
            },
        },
        {
            field: "popup_title",
            headerName: "Tên",
            width: 100,
            align: "center",
        },
        {
            field: "popup_description",
            headerName: "Nội Dung",
            width: 200,
            align: "center",
        },
        {
            field: "popup_discount",
            headerName: "% Khuyến Mãi",
            width: 400,
            align: "center",
        },
        {
            field: "popup_image",
            headerName: "Hình Ảnh",
            width: 200,
            align: "center",
            renderCell: (params) => {
                const [openViewImg, setOpenViewImg] = useState(false);
                const handleOpenViewImg = () => setOpenViewImg(!openViewImg);
                return (
                    <div className="flex flex-row justify-center">
                        <Button className="p-0" onClick={handleOpenViewImg}>
                            <Card className="w-12 h-12 ">
                                <img
                                    src={host + params.row.popup_image}
                                    alt={params.row.popup_title}
                                />
                            </Card>
                        </Button>
                        <Dialog
                            open={openViewImg}
                            handler={handleOpenViewImg}
                            size="sm"
                        >
                            <DialogBody divider>
                                <Card className="w-full">
                                    <img
                                        src={host + params.row.popup_image}
                                        alt={params.row.popup_title}
                                    />
                                </Card>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="outlined"
                                    color="red"
                                    className="p-3"
                                    onClick={handleOpenViewImg}
                                >
                                    Đóng
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </div>
                );
            },
        },
        {
            field: "popup_date_begin",
            headerName: "Bắt Đầu",
            width: 200,
            align: "center",
        },
        {
            field: "popup_date_end",
            headerName: "KẾt Thúc",
            width: 200,
            align: "center",
        },
        {
            field: "actions",
            headerName: "Sửa",
            width: 300,
            align: "center",
            renderCell: (params) => {
                const [openEditPromotion, setOpenEditPromotion] =
                    useState(false);
                const [editInput, setEditInput] = useState(params.row);
                const [selectedFilesMotion, setSelectedFilesPromotion] =
                    useState([]);
                const handleImagePromotionSelect = (event) => {
                    const file = event.target.files[0];
                    setSelectedFilesPromotion(file);
                };
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setEditInput((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                };
                const handleOpenEditPromotion = () =>
                    setOpenEditPromotion(!openEditPromotion);
                const handleSubmitPromotion = () => {
                    console.log(editInput);
                    handleOpenEditPromotion();
                };
                return (
                    <>
                        <Button
                            variant="outlined"
                            color="red"
                            className="p-3"
                            onClick={handleOpenEditPromotion}
                        >
                            Sửa Popup
                        </Button>
                        <Dialog
                            open={openEditPromotion}
                            handler={handleOpenEditPromotion}
                            size="lg"
                        >
                            <DialogHeader>
                                Sửa Thông Tin Chương Trình Khuyến Mãi
                            </DialogHeader>
                            <DialogBody
                                className="grid grid-cols-2 gap-2"
                                divider
                            >
                                <Input
                                    className="shadow-none"
                                    label="Tên Chương trình"
                                    value={editInput.popup_title}
                                    name="popup_title"
                                    required
                                    onChange={handleChange}
                                />
                                <Input
                                    className="shadow-none"
                                    label="Khuyến mãi"
                                    value={editInput.popup_discount}
                                    name="popup_discount"
                                    required
                                    onChange={handleChange}
                                />
                                <div className="col-span-2">
                                    <Input
                                        className="shadow-none"
                                        label="Mô tả"
                                        value={editInput.popup_description}
                                        name="popup_description"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <Input
                                    type="date"
                                    className="shadow-none"
                                    label="Ngày bắt đầu"
                                    value={editInput.popup_date_begin}
                                    name="popup_date_begin"
                                    required
                                    onChange={handleChange}
                                />
                                <Input
                                    type="date"
                                    className="shadow-none"
                                    label="Ngày kết thúc"
                                    value={editInput.popup_date_end}
                                    name="popup_date_end"
                                    required
                                    onChange={handleChange}
                                />
                                <div className="flex col-span-2 ">
                                    <div className="pr-2 w-30 h-30">
                                        <img
                                            src={host + editInput.popup_image}
                                        />
                                    </div>
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
                                        onChange={handleImagePromotionSelect}
                                    />
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="outlined"
                                    color="green"
                                    className="p-3"
                                    onClick={handleSubmitPromotion}
                                >
                                    Lưu
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                );
            },
        },
    ];
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Thông tin Chương Trình Khuyến mãi" />
            <div className={`h-screen gap-2 p-1`}>
                <Card className="w-full h-full">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="rounded-none"
                    >
                        <div className="grid grid-cols-5 gap-1">
                            <Typography className="flex items-center justify-center col-span-4 m-2 text-lg font-extraboldtext-center">
                                Danh Sách Popup Chương Trình Khuyến Mãi
                            </Typography>
                            <Button
                                onClick={handleOpen}
                                variant="gradient"
                                className="col-start-5 m-2"
                            >
                                Chương trình khuyến mãi mới
                            </Button>
                            <Dialog open={open} handler={handleOpen}>
                                <div className="flex items-center justify-center">
                                    <DialogHeader>
                                        Chương trình khuyến mãi mới
                                    </DialogHeader>
                                </div>
                                <DialogBody
                                    className="grid grid-cols-2 gap-2"
                                    divider
                                >
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
                                        onClick={handleSubmit}
                                    >
                                        <span>Lưu</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0 overflow-scroll">
                        <Box
                            sx={{
                                height: { height },
                                width: 1,
                            }}
                        >
                            <DataGrid
                                rows={popupData}
                                columns={columns}
                                slots={{ toolbar: GridToolbar }}
                                slotProps={{
                                    toolbar: {
                                        showQuickFilter: true,
                                    },
                                }}
                                autoHeight
                            />
                        </Box>
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

export default ApplicationPopupDiscount;
