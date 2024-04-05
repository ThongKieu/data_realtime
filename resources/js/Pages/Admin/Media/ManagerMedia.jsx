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
    Typography,
} from "@material-tailwind/react";
import {
    PlusCircleIcon,
    MapPinIcon,
    UserPlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { host } from "@/Utils/UrlApi";
import useWindowSize from "@/Core/Resize";
function ManagerMedia({ auth }) {
    const { width, height } = useWindowSize(65);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [clipBoard, setClipBoard] = useState(false);
    const [saved, setSaved] = useState(false);
    const handleDetailImg = (item) => {
        setSelectedImage(item);
        setOpenDetail(true);
    };
    const handleChangeImgDetail = (e) => {
        const { name, value } = e.target;
        setSelectedImage((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCloseDetail = () => {
        setOpenDetail(false);
        setClipBoard(false);
        setSaved(false);
    };
    const DataImg = [
        {
            id: 0,
            title: "Ten Bai 0",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 1,
            title: "Ten Bai 1",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL: "https://thoviet.com.vn/wp-content/uploads/2024/04/8.jpg",
        },
        {
            id: 2,
            title: "Ten Bai 2",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL: "https://thoviet.com.vn/wp-content/uploads/2024/04/7.jpg",
        },
        {
            id: 3,
            title: "Ten Bai 3",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL: "https://thoviet.com.vn/wp-content/uploads/2024/04/6.jpg",
        },
        {
            id: 4,
            title: "Ten Bai 4",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL: "https://thoviet.com.vn/wp-content/uploads/2024/04/5.jpg",
        },
        {
            id: 5,
            title: "Ten Bai 5",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 6,
            title: "Ten Bai 6",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL: "https://thoviet.com.vn/wp-content/uploads/2024/04/4.jpg",
        },
        {
            id: 7,
            title: "Ten Bai",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 8,
            title: "Ten Bai",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 9,
            title: "Ten Bai",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 10,
            title: "Ten Bai",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 11,
            title: "Ten Bai",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 12,
            title: "Ten Bai",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 13,
            title: "Ten Bai",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
        {
            id: 14,
            title: "Ten Bai",
            AlternativeText: "Text Alt",
            Caption: "text",
            Description: "text",
            FileURL:
                "https://thoviet.com.vn/wp-content/uploads/2024/04/z4515056060376_9b1f03410fdda7ada4d5eacc2e792dc1duqd.jpg",
        },
    ];
    const copyTextToClipboard = (text) => {
        const input = document.createElement("input");
        input.style.position = "fixed";
        input.style.opacity = 0;
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        setClipBoard(true);
    };
    const handleSaved = () => {
        console.log(saved);
        setSaved(true);
    };

    return (
        <AuthenticatedLayoutAdmin children={auth.user} user={auth.user}>
            <Head title="Quản Lý Hình Ảnh" />
            <div className={`p-1 h-[${height}]px`}>
                <Card className="mb-2 rounded-md shadow-md bg-blue-gray-200">
                    <Typography
                        variant="h4"
                        className="w-full p-2 font-bold text-white "
                    >
                        Media Library
                    </Typography>

                </Card>
                <Box sx={{ height: { height }, width: 1 }}>
                    <Card
                        className={`p-1 h-[${height}]px rounded-md grid grid-cols-12 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 bg-blue-gray-50`}
                    >
                        {DataImg.map((item, index) => (
                            <Button
                                key={index}
                                className="flex flex-row w-32 h-32 p-1 m-1 bg-white border border-green-500"
                                onClick={() => handleDetailImg(item)}
                            >
                                <img
                                    src={item.FileURL}
                                    alt={item.AlternativeText}
                                    className="w-full"
                                />
                            </Button>
                        ))}
                    </Card>
                </Box>
                <Dialog open={openDetail} handler={handleCloseDetail} size="xl">
                    <DialogHeader className="justify-between">
                        <div>
                            <Typography variant="h5">
                                Attachment Details
                            </Typography>
                        </div>
                        <XMarkIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={handleCloseDetail}
                        />
                    </DialogHeader>
                    <DialogBody divider>
                        <>
                            {selectedImage && (
                                <div className="grid grid-cols-12 gap-2">
                                    <div className="col-span-8 p-2 border border-green-500">
                                        <img
                                            src={selectedImage.FileURL}
                                            alt={selectedImage.AlternativeText}
                                        />
                                    </div>
                                    <div className="col-span-4">
                                        <Card className="h-full p-2 bg-blue-gray-200">
                                            <div className="flex flex-row items-center justify-between mb-2 ">
                                                <span className="text-white">
                                                    Alt:
                                                </span>
                                                <input
                                                    name="AlternativeText"
                                                    value={
                                                        selectedImage.AlternativeText
                                                    }
                                                    className="w-[90%] rounded-md"
                                                    onChange={
                                                        handleChangeImgDetail
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-row items-center justify-between mb-2 ">
                                                <span className="text-white">
                                                    Title:
                                                </span>
                                                <input
                                                    name="title"
                                                    value={selectedImage.title}
                                                    className="w-[90%] rounded-md"
                                                    onChange={
                                                        handleChangeImgDetail
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-row items-center justify-between mb-2 ">
                                                <span className="text-white">
                                                    Caption:
                                                </span>
                                                <textarea
                                                    name="Caption"
                                                    value={
                                                        selectedImage.Caption
                                                    }
                                                    className="w-[90%] rounded-md"
                                                    onChange={
                                                        handleChangeImgDetail
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-row items-center justify-between mb-2 ">
                                                <span className="text-white">
                                                    Description:
                                                </span>
                                                <textarea
                                                    name="Description"
                                                    value={
                                                        selectedImage.Description
                                                    }
                                                    className="w-[90%] rounded-md"
                                                    onChange={
                                                        handleChangeImgDetail
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-row items-center justify-between mb-2 ">
                                                <span className="text-white">
                                                    File URL:
                                                </span>
                                                <input
                                                    value={
                                                        selectedImage.FileURL
                                                    }
                                                    className={`w-[80%] rounded-md ${
                                                        clipBoard == false
                                                            ? "border-none"
                                                            : "border border-blue-500"
                                                    } bg-blue-gray-50 cursor-text`}
                                                    disabled
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Button
                                                    variant="outlined"
                                                    className="bg-blue-gray-50 "
                                                    onClick={() =>
                                                        copyTextToClipboard(
                                                            selectedImage.FileURL
                                                        )
                                                    }
                                                >
                                                    {clipBoard == false
                                                        ? "Copy URL to Clipboard"
                                                        : "Copied"}
                                                </Button>
                                                <Button
                                                    color="green"
                                                    variant="outlined"
                                                    className="bg-blue-gray-50"
                                                    onClick={() =>
                                                        handleSaved()
                                                    }
                                                >
                                                    {saved == false
                                                        ? "Save"
                                                        : "Saved"}
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </>
                    </DialogBody>
                    <DialogFooter className="text-center ">
                        <Button
                            onClick={handleCloseDetail}
                            className="mr-2"
                            color="red"
                            variant="outlined"
                        >
                            Đóng
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

export default ManagerMedia;
