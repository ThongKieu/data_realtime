import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    Avatar,
    Card,
} from "@material-tailwind/react";
import { TrashIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = [
    "Yêu Cầu Công Việc",
    "Ngày Làm",
    "Địa Chỉ",
    "Quận",
    "Số Điện Thoại",
    "Thợ",
    "Hình Ảnh",
    "Chức Năng",
];
const tableData = [
    ["Alice", 25, "New York"],
    ["Bob", 30, "Los Angeles"],
    ["Charlie", 28, "Chicago"],
];
function TableOrder(
    workContent,
    dateBook,
    street,
    phoneNumber,
    district,
    imageWorkPath,
) {
    const [screenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    const heightScreenTV = screenSize.height;


    const handleDeleteRow = (idCV) => {
        // Xử lý xóa hàng dựa trên idCV
        const updatedWorkData = workData.filter((item) => item.idCV !== idCV);
        setWorkData(updatedWorkData);
    };

    const handleSubmitAddWork = (idCV) => {
        // Xử lý khi nhấn nút thêm công việc dựa trên idCV
        // Thực hiện các thao tác cần thiết, sau đó cập nhật workData nếu cần
        // Ví dụ: Làm một POST request để thêm công việc mới thông qua API
        // Sau khi request thành công, cập nhật workData
    };

    const handleOpenDialog = (index) => {
        // Mở dialog để hiển thị hình ảnh lớn khi nhấn vào ảnh
        setOpenDialogIndex(index);
    };

    const handleCloseDialog = () => {
        // Đóng dialog hiển thị hình ảnh lớn
        setOpenDialogIndex(null);
    };
    const classes =
        "border text-black p-1 rounded border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 ring-4 ring-transparent placeholder:text-blue-gray-200 focus:!border-blue-500 focus:!border-t-blue-500 focus:ring-blue-500/20 outline-none ";
    const urlImg = imageWorkPath?.split(",");
    return (
        <Card className="grid w-full grid-flow-col mt-1 overflow-scroll auto-cols-max">
            {/* Bảng bên trái */}
            <table
                className={`h-[${heightScreenTV}px] w-full text-left border-r-4 border-red-500 table-auto min-w-max`}
                style={{ height: `300px` }}
            >
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th
                                key={index}
                                id={index}
                                className="p-1 text-sm font-normal leading-none border-b opacity-70 border-blue-gray-100 bg-blue-gray-50 w-fit"
                            >
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b border-blue-gray-50 w-fit">
                            <input
                                name="yccv"
                                value={workContent}
                                type="text"
                                placeholder="Yêu Cầu Công Việc"
                                className={classes}
                            />
                        </td>
                        <td className="border-b border-blue-gray-50 w-fit bg-blue-gray-50/50">
                            <input
                                name="date_book"
                                type="text"
                                placeholder="Ngày Làm"
                                className={classes}
                                value={dateBook}
                            />
                        </td>
                        <td className="border-b border-blue-gray-50 w-fit bg-blue-gray-50/50">
                            <input
                                name="diaChi"
                                type="text"
                                placeholder="Địa Chỉ"
                                className={classes}
                                value={street}
                            />
                        </td>
                        <td className="border-b border-blue-gray-50 w-fit">
                            <input
                                name="quan"
                                type="text"
                                placeholder="Quận"
                                className={`${classes} text-center w-12`}
                                value={district}
                            />
                        </td>
                        <td className="border-b border-blue-gray-50 w-fit">
                            <input
                                name="sdt"
                                type="text"
                                placeholder="Số Điện Thoại"
                                className={`${classes} w-28 text-center`}
                                value={phoneNumber}
                            />
                        </td>
                        <td className="border-b border-blue-gray-50 w-fit">
                            {urlImg?.map((item, index) => (
                                <div key={index} id={index}>
                                    <Avatar
                                        className="mr-1 overflow-hidden transition-opacity cursor-pointer h-9 w-9 hover:opacity-90"
                                        alt="avatar"
                                        src={item}
                                        variant="rounded"
                                        onClick={() => onOpenDialog(index)}
                                    />
                                    <Dialog
                                        key={index}
                                        size="xl"
                                        open={isOpenDialog === index}
                                        handler={onCloseDialog}
                                        className="w-1/2"
                                    >
                                        <DialogBody
                                            divider={true}
                                            className="p-2 text-center "
                                            id={index}
                                        >
                                            <img
                                                id={index}
                                                key={index}
                                                src={item}
                                                alt="avatar"
                                                className="inline-block w-1/2"
                                            />
                                        </DialogBody>
                                    </Dialog>
                                </div>
                            ))}
                        </td>
                        <td className="w-32 border-b border-blue-gray-50">
                            <Button
                                variant="outlined"
                                className="p-1 mr-1 text-red-500 border-red-500 border-none"
                                onClick={handleDeleteRow}
                            >
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outlined"
                                className="p-1 text-blue-500 border-blue-500 border-none "
                                onClick={handleSubmitAddWork}
                            >
                                <PaperAirplaneIcon className="w-4 h-4" />
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
}

export default TableOrder;
