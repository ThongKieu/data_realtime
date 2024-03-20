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
    DialogHeader ,
    Input,
} from "@material-tailwind/react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
import { Divider } from "@mui/material";

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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataPopup({ ...info_popup, [name]: value });
    };
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFiles(file);
    };
    console.log(info_popup);
    
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
                            <Typography className="col-span-4 m-2 font-extraboldtext-center flex justify-center items-center text-lg">
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
                                    <DialogHeader> Chương trình khuyến mãi mới</DialogHeader>
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
                        </div>


                    </CardHeader>
                    {/* Chạy bảng */}
                    <CardBody className="px-0 overflow-scroll">
                        <table className="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                {head}{" "}
                                                {/* {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="w-4 h-4" />
                      )} */}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {popupData.map((item, index) => {
                                    const isLast =
                                        index === popupData.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={item.id}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.id}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.popup_title}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.popup_description}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item.popup_discount}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <img
                                                    src={host + item.popup_image}
                                                    alt="Avatar"
                                                    className="w-20 h-20"
                                                />
                                            </td>

                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.popup_date_begin}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.popup_date_end}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value="Sửa Popup"
                                                        color="deep-purple"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            Page 1 of 10
                        </Typography>
                        <div className="flex gap-2">
                            <Button variant="outlined" size="sm">
                                Previous
                            </Button>
                            <Button variant="outlined" size="sm">
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

export default ApplicationPopupDiscount;
