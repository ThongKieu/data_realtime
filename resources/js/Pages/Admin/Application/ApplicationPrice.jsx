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
    Select,
    Option,
    Typography,
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

function ApplicationPrice({ auth }) {
    const { width, height } = useWindowSize(65);
    const [rows, setRows] = useState([]);
    const codePriceTable = [
        {
            id: "TN",
            nameCode: "Thông Nghẹt",
        },
        {
            id: "LD",
            nameCode: "Lắp Đặt",
        },
        {
            id: "SD",
            nameCode: "Sửa Điện",
        },
        {
            id: "ML",
            nameCode: "Máy Lạnh",
        },
        {
            id: "MG",
            nameCode: "Máy Giặt",
        },
        {
            id: "MTN",
            nameCode: "Máy Tắm Nóng",
        },
        {
            id: "TL",
            nameCode: "Tủ Lạnh",
        },
        {
            id: "NLMT",
            nameCode: "Năng Lượng Mặt Trời",
        },
        {
            id: "DN",
            nameCode: "Dò Nước",
        },
        {
            id: "CT",
            nameCode: "Chống Thấm",
        },
        {
            id: "BN",
            nameCode: "Bồn Nước",
        },
    ];
    useEffect(() => {
        fetch(host + "api/web/price-list")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setRows(data.data); // Lưu dữ liệu vào trạng thái React
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
            });
    }, []);
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
            editable: false,
            align: "center",
            sortable: false,
        },
        {
            field: "price",
            headerName: "Giá",
            type: "number",
            width: 150,
            editable: false,
            align: "center",
            sortable: false,
        },
        {
            field: "image_price",
            headerName: "Hình Ảnh",
            width: 300,
            sortable: false,
            align: "center",
            editable: false,
            renderCell: (params) => {
                return (
                    <div className="flex flex-row justify-center">
                        <Card className="w-12 h-12 ">
                            <img src={host + params.row.image_price} alt="" />
                        </Card>
                    </div>
                );
            },
        },
        {
            field: "note_price",
            headerName: "Ghi Chú",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 260,
            align: "center",
            editable: false,
        },
        {
            field: "actions",
            headerName: "Xử Lý",
            description: "This column has a value getter and is not sortable.",
            align: "center",
            sortable: false,
            width: 260,
            renderCell: (params) => {
                console.log("params", params);
                const [editPrice, setEditPrice] = useState(params.row);
                const [selectImgEditPrice, setSelectImgEditPrice] = useState(
                    []
                );
                const [previewImgEditPrice, setPreviewImgEditPrice] = useState(
                    []
                );
                const [openEditPrice, setOpenEditPrice] = useState(false);
                const handleOpenEditPrice = () =>
                    setOpenEditPrice(!openEditPrice);
                const handleChangPrice = (e) => {
                    const { name, value } = e.target;
                    setEditPrice((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                };
                const handleFileChange = (e) => {
                    const files = Array.from(e.target.files);
                    setSelectImgEditPrice(files);
                    const previews = files.map((file) =>
                        URL.createObjectURL(file)
                    );
                    setPreviewImgEditPrice(previews);
                };
                const handleSubmitPrice = async (e) => {
                    e.preventDefault();
                    const formData1 = new FormData();
                    formData1.append("id", editPrice.id);
                    formData1.append("ID_price_list", editPrice.ID_price_list);
                    formData1.append(
                        "name_price_list",
                        editPrice.name_price_list
                    );
                    formData1.append("price", editPrice.price);
                    formData1.append("info_price", editPrice.info_price);
                    formData1.append("note_price", editPrice.note_price);
                    for (let i = 0; i < selectImgEditPrice.length; i++) {
                        formData1.append("image", selectImgEditPrice[i]);
                    }
                    try {
                        const response = await fetch(
                            host + `api/web/price-list/update`,
                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                mode: "no-cors",
                                body: formData1,
                            }
                        );
                        if (response.status === 200) {
                            handleOpenAddPrice();
                            window.location.reload();
                        } else if (response.status === 422) {
                            alert(
                                `Quên nhập thông tin khách hàng rồi kìa mấy má ơi! ${response.errors}`
                            );
                        }
                    } catch (error) {
                        console.log(error);
                    }
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
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <div className="flex flex-row gap-2">
                                                <Input
                                                    type="text"
                                                    className="shadow-none "
                                                    id="ID_price_list"
                                                    name="ID_price_list"
                                                    value={
                                                        editPrice.ID_price_list
                                                    }
                                                    labelProps={{
                                                        className: "hidden",
                                                    }}
                                                    containerProps={{
                                                        className:
                                                            "min-w-[50px]",
                                                    }}
                                                    disabled
                                                />

                                                <select
                                                    id="ID_price_list"
                                                    label="Mã Bảng Giá"
                                                    name="ID_price_list"
                                                    className="w-full col-span-2 border rounded-lg shadow-none border-lg "
                                                    value={
                                                        editPrice.ID_price_list
                                                    } // Sử dụng addSelectPrice để xác định giá trị hiện tại của Select
                                                    onChange={handleChangPrice}
                                                >
                                                    {codePriceTable.map(
                                                        (item, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item.id
                                                                    }
                                                                    className="w-full p-2"
                                                                >
                                                                    {
                                                                        item.nameCode
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                            <div className="my-2">
                                                <Input
                                                    type="text"
                                                    className="shadow-none "
                                                    id="worker_full_name"
                                                    name="name_price_list"
                                                    value={
                                                        editPrice.name_price_list
                                                    }
                                                    onChange={handleChangPrice}
                                                    label="Tên Bảng Giá"
                                                    required
                                                />
                                            </div>
                                            <div className="my-2">
                                                <Input
                                                    type="text"
                                                    className="shadow-none"
                                                    id="price"
                                                    name="price"
                                                    value={editPrice.price}
                                                    onChange={handleChangPrice}
                                                    label="Giá"
                                                    required
                                                />
                                            </div>
                                            <div className="my-2">
                                                <Input
                                                    type="text"
                                                    className="shadow-none"
                                                    id="id"
                                                    name="info_price"
                                                    value={editPrice.info_price}
                                                    label="Thông Tin Bảng Giá"
                                                    onChange={handleChangPrice}
                                                    required
                                                />
                                            </div>

                                            <div className="my-2">
                                                <FileInput
                                                    handleFileChange={
                                                        handleFileChange
                                                    }
                                                    previewImages={
                                                        previewImgEditPrice
                                                    }
                                                />
                                            </div>
                                            <Textarea
                                                type=" textarea"
                                                className="shadow-none"
                                                id="note_price"
                                                name="note_price"
                                                value={editPrice.note_price}
                                                onChange={handleChangPrice}
                                                label="Ghi Chú"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Typography
                                                variant="h2"
                                                className="text-center border border-green-500 rounded-md"
                                            >
                                                Preview
                                            </Typography>
                                            <Card className="grid grid-cols-4 mt-2 border border-green-300 shadow-green-300">
                                                <div className="col-span-1 rounded-xl">
                                                    <img
                                                        className="rounded-xl"
                                                        src={
                                                            previewImgEditPrice ==
                                                            ""
                                                                ? host +
                                                                  editPrice.image_price
                                                                : previewImgEditPrice
                                                        }
                                                        alt="hinhThoViet"
                                                    />
                                                </div>
                                                <div className="relative col-span-3 px-4 py-2 ">
                                                    <h3 className="font-bold">
                                                        {
                                                            editPrice.name_price_list
                                                        }
                                                    </h3>
                                                    <p className="my-1">
                                                        {editPrice.info_price}
                                                    </p>
                                                    <p className="float-right my-1 text-green-500">
                                                        {editPrice.price}
                                                    </p>
                                                    <p className="mt-2 italic">
                                                        ({editPrice.note_price})
                                                    </p>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
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
                                        type="submit"
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
    const [addPrice, setAddPrice] = useState({
        ID_price_list: "",
        name_price_list: "",
        price: "",
        picture: "",
        note_price: "",
        info_price: "",
    });
    const [selectedFilesImgPrice, setSelectedFilesImgPrice] = useState([]);
    const [previewImagesPrice, setPreviewImagesPrice] = useState([]);
    const handleOpenAddPrice = () => setOpenAddPrice(!openAddPrice);
    const handleChangAddPrice = (e) => {
        const { name, value } = e.target;
        setAddPrice((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFilesImgPrice(files);
        console.log(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImagesPrice(previews);
    };
    const handleAddPrice = async (e) => {
        e.preventDefault();
        const formData1 = new FormData();
        formData1.append("ID_price_list", addPrice.ID_price_list);
        formData1.append("name_price_list", addPrice.name_price_list);
        formData1.append("price", addPrice.price);
        formData1.append("info_price", addPrice.info_price);
        formData1.append("note_price", addPrice.note_price);
        for (let i = 0; i < selectedFilesImgPrice.length; i++) {
            formData1.append("image", selectedFilesImgPrice[i]);
        }
        console.log(formData1);
        try {
            const response = await fetch(host + `api/web/price-list`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: formData1,
            });
            if (response.status === 200) {
                handleOpenAddPrice();
                window.location.reload();
            } else if (response.status === 422) {
                alert(
                    `Quên nhập thông tin khách hàng rồi kìa mấy má ơi! ${response.errors}`
                );
            }
        } catch (error) {
            console.log(error);
        }
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
            {/* <form> */}
            <DialogBody divider>
                <>
                    <div className="grid grid-cols-2 gap-2">
                        <select
                            id="ID_price_list"
                            label="Mã Bảng Giá"
                            name="ID_price_list"
                            className="w-full p-[6px] border rounded-lg border-lg shadow-none"
                            value={addPrice.ID_price_list} // Sử dụng addSelectPrice để xác định giá trị hiện tại của Select
                            onChange={handleChangAddPrice}
                        >
                            {codePriceTable.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.id}
                                        className="w-full p-2"
                                    >
                                        {item.nameCode}
                                    </option>
                                );
                            })}
                        </select>
                        <Input
                            type="text"
                            className="shadow-none"
                            id="name_price_list"
                            name="name_price_list"
                            value={addPrice.name_price_list}
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
                            value={addPrice.price}
                            onChange={handleChangAddPrice}
                            label="Giá"
                            required
                        />
                        <Input
                            type="text"
                            className="shadow-none"
                            id="info_price"
                            name="info_price"
                            value={addPrice.info_price}
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
                                handleFileChange={handleFileChange}
                                previewImages={previewImagesPrice}
                            />
                        </div>
                        <Textarea
                            type=" textarea"
                            className="shadow-none"
                            id="note_price"
                            name="note_price"
                            value={addPrice.note_price}
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
                <Button type="submit" color="green" variant="outlined">
                    Xác Nhận
                </Button>
            </DialogFooter>
        </form>
    </Dialog>
</AuthenticatedLayoutAdmin>
  )
}

export default ApplicationPrice
