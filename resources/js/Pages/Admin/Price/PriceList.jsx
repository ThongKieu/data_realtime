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
    Textarea,
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
import { Divider } from "@mui/material";
import FileInput from "@/Components/FileInputImage";

function PriceList({ auth }) {
    const { width, height } = useWindowSize(65);
    const rows = [
        {
            id: 1,
            ID_price_list: "BN",
            name_price_list: "Vệ sinh bồn inox, nhựa, composite 1",
            info_price: "Vệ sinh bồn nước dưới 500 lít",
            price: "250.000đ - 350.000đ",
            image_price: "assets/prices/Vệ-sinh-bồn-nước-quận-3-2.jpg",
            note_price: "Điều kiện thi công dễ, ít nguy hiểm",
        },
        {
            id: 2,
            ID_price_list: "BN",
            name_price_list: "Vệ sinh bồn inox, nhựa, composite 2",
            info_price: "Vệ sinh bồn nước dưới 500 lít",
            price: "250.000đ - 350.000đ",
            image_price: "assets/prices/Vệ-sinh-bồn-nước-quận-3-2.jpg",
            note_price: "Điều kiện thi công dễ, ít nguy hiểm",
        },
        {
            id: 3,
            ID_price_list: "BN",
            name_price_list: "Vệ sinh bồn inox, nhựa, composite3",
            info_price: "Vệ sinh bồn nước dưới 500 lít",
            price: "250.000đ - 350.000đ",
            image_price: "assets/prices/Vệ-sinh-bồn-nước-quận-3-2.jpg",
            note_price: "Điều kiện thi công dễ, ít nguy hiểm",
        },
    ];
    const columns = [
        {
            field: "ID_price_list",
            headerName: "Mã Bảng Giá",
            width: 190,
            align: "center",
            sortable: false,
        },
        {
            field: "name_price_list",
            headerName: "Tên Bảng Giá",
            width: 350,
            editable: false,
            align: "center",
            sortable: false,
        },
        {
            field: "info_price",
            headerName: "Nội Dung Bảng Giá",
            width: 300,
            editable: true,
            align: "center",
            sortable: false,
        },

        {
            field: "price",
            headerName: "Giá",
            type: "number",
            width: 150,
            editable: true,
            align: "center",
            sortable: false,
        },
        {
            field: "image_price",
            headerName: "Hình Ảnh",
            description: "This column has a value getter and is not sortable.",
            width: 300,
            sortable: false,
            align: "center",
        },
        {
            field: "note_price",
            headerName: "Ghi Chú",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 260,
            align: "center",
        },
        {
            field: "actions",
            headerName: "Xử Lý",
            description: "This column has a value getter and is not sortable.",
            align: "center",
            sortable: false,
            width: 260,
            renderCell: (params) => {
                const [editPrice, setEditPrice] = useState([]);
                const [previewImagesVT, setPreviewImagesVT] = useState([]);
                const [openEditPrice, setOpenEditPrice] = useState(false);
                const handleOpenEditPrice = () =>
                    setOpenEditPrice(!openEditPrice);
                const handleChangPrice = (e) => {
                    const { name, value } = e.target;
                    setEditPrice({ [name]: value });
                };
                const handleSubmitPrice = () => {
                    console.log("xin chao");
                };
                return (
                    <>
                        <Button
                            variant="outlined"
                            onClick={handleOpenEditPrice}
                        >
                            Sửa Bảng Giá
                        </Button>
                        <Dialog
                            open={openEditPrice}
                            handler={handleOpenEditPrice}
                        >
                            <DialogHeader>Chỉnh Sửa Bảng Giá</DialogHeader>
                            <Divider />
                            <form onSubmit={handleSubmitPrice}>
                                <DialogBody divider>
                                    <>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="grid grid-cols-4 ">
                                                <span className="pb-2 italic underline">
                                                    Mã Bảng Giá:
                                                </span>
                                                <div className="col-span-3 ">
                                                    <Input
                                                        type="text"
                                                        className="w-full shadow-none"
                                                        id="id"
                                                        name="id"
                                                        value="ID_price_list"
                                                        label="Mã Bảng Giá"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                type="text"
                                                className="shadow-none"
                                                id="worker_full_name"
                                                name="worker_full_name"
                                                value="worker_full_name"
                                                onChange={handleChangPrice}
                                                label="Tên Bảng Giá"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 my-3">
                                            <Input
                                                type="text"
                                                className="shadow-none"
                                                id="price"
                                                name="price"
                                                value="price"
                                                onChange={handleChangPrice}
                                                label="Giá"
                                                required
                                            />
                                            <Input
                                                type="text"
                                                className="shadow-none"
                                                id="id"
                                                name="priceContent"
                                                value="priceContent"
                                                label="Thông Tin Bảng Giá"
                                                onChange={handleChangPrice}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="pb-2 italic underline">
                                                    Thêm hình ảnh:
                                                </p>
                                                <FileInput
                                                    handleFileChange={
                                                        handleChangPrice
                                                    }
                                                    previewImages={
                                                        previewImagesVT
                                                    }
                                                />
                                            </div>
                                            <Textarea
                                                type=" textarea"
                                                className="shadow-none"
                                                id="worker_phone_personal"
                                                name="worker_phone_personal"
                                                value="worker_phone_personal"
                                                onChange={handleChangPrice}
                                                label="Ghi Chú"
                                                required
                                            />
                                        </div>
                                    </>
                                </DialogBody>
                                <Divider />
                                <DialogFooter className="text-center ">
                                    <Button
                                        onClick={handleOpenEditPrice}
                                        className="mr-2"
                                        color="red"
                                        variant="outlined"
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        onClick={handleOpenEditPrice}
                                        color="green"
                                        variant="outlined"
                                    >
                                        Xác Nhận
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Dialog>
                    </>
                );
            },
        },
    ];
    const [openAddPrice, setOpenAddPrice] = useState(false);
    const [addPrice, setAddPrice] = useState([]);
    const [previewImagesPrice, setPreviewImagesPrice] = useState([]);
    const handleOpenAddPrice = () => setOpenAddPrice(!openAddPrice);
    const handleChangAddPrice = (e) => {
        const { name, value } = e.target;
        setAddPrice({ [name]: value });
    };
    const handleAddPrice = () => {
        console.log("handleOpenAddPrice");
    };
    return (
        <AuthenticatedLayoutAdmin children={auth.user} user={auth.user}>
            <Head title="Bảng Giá" />
            <div className={`p-1 h-[${height}]px`}>
                <Card className="flex flex-row items-center text-center bg-green-400 rounded shadow-md">
                    <h2 className="w-full p-2 text-2xl font-bold text-white ">
                        Bảng Giá
                    </h2>
                    <button
                        variant="outlined"
                        color="white"
                        className="p-0 text-white rounded-xl"
                        onClick={handleOpenAddPrice}
                    >
                        <PlusCircleIcon className="w-10" />
                    </button>
                </Card>

                <Card className={`p-1 h-[${height}]px rounded-none`}>
                    <Box sx={{ height: { height }, width: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: false,
                                },
                            }}
                            className="text-center "
                        />
                    </Box>
                </Card>
            </div>
            <Dialog open={openAddPrice} handler={handleOpenAddPrice}>
                <DialogHeader>Thêm Bảng Giá</DialogHeader>
                <Divider />
                <form onSubmit={handleAddPrice}>
                    <DialogBody divider>
                        <>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid grid-cols-4 ">
                                    <span className="pb-2 italic underline">
                                        Mã Bảng Giá:
                                    </span>
                                    <div className="col-span-3 ">
                                        <select
                                            className="w-full p-[6px] border rounded-lg border-lg "
                                            value="ID_price_list"
                                            onChange={handleChangAddPrice}
                                        >
                                            <option
                                                value="1"
                                                className="w-full"
                                            >
                                                Chưa Chọn
                                            </option>
                                            <option
                                                value="2"
                                                className="w-full"
                                            >
                                                nam.name
                                            </option>
                                        </select>

                                    </div>
                                </div>
                                <Input
                                    type="text"
                                    className="shadow-none"
                                    id="worker_full_name"
                                    name="worker_full_name"
                                    value="worker_full_name"
                                    onChange={handleChangAddPrice}
                                    label="Tên Bảng Giá"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 my-3">
                                <Input
                                    type="text"
                                    className="shadow-none"
                                    id="price"
                                    name="price"
                                    value="price"
                                    onChange={handleChangAddPrice}
                                    label="Giá"
                                    required
                                />
                                <Input
                                    type="text"
                                    className="shadow-none"
                                    id="id"
                                    name="priceContent"
                                    value="priceContent"
                                    label="Thông Tin Bảng Giá"
                                    onChange={handleChangAddPrice}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="pb-2 italic underline">
                                        Thêm hình ảnh:
                                    </p>
                                    <FileInput
                                        handleFileChange={handleChangAddPrice}
                                        previewImages={previewImagesPrice}
                                    />
                                </div>
                                <Textarea
                                    type=" textarea"
                                    className="shadow-none"
                                    id="worker_phone_personal"
                                    name="worker_phone_personal"
                                    value="worker_phone_personal"
                                    onChange={handleChangAddPrice}
                                    label="Ghi Chú"
                                    required
                                />
                            </div>
                        </>
                    </DialogBody>
                    <Divider />
                    <DialogFooter className="text-center ">
                        <Button
                            onClick={handleOpenAddPrice}
                            className="mr-2"
                            color="red"
                            variant="outlined"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleOpenAddPrice}
                            color="green"
                            variant="outlined"
                        >
                            Xác Nhận
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </AuthenticatedLayoutAdmin>
    );
}

export default PriceList;
