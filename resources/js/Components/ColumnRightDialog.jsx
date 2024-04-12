import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Textarea,
    DialogFooter,
    Input,
    Typography,
    Card,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import FileInput from "./FileInputImage";
import { host } from "@/Utils/UrlApi";
const ThoDialog = ({
    open,
    handleOpenTho,
    selectPhanTho,
    infoWorkerDashboard,
    handleSelectChange,
    handleSentPhanTho,
}) => {
    return (
        <Dialog open={open} handler={handleOpenTho} className="lg:min-w-52">
            <div className="flex items-center justify-between">
                <DialogHeader>Lựa Chọn Thợ</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenTho}
                />
            </div>
            <DialogBody divider>
                <Select
                    closeMenuOnSelect={true}
                    value={selectPhanTho}
                    options={infoWorkerDashboard}
                    onChange={(selectedValue) =>
                        handleSelectChange(selectedValue)
                    }
                    isMulti
                    className="border-none shadow-none"
                />
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button
                    variant="gradient"
                    color="green"
                    onClick={handleSentPhanTho}
                >
                    Phân Thợ
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

const ReasonDialog = ({
    open,
    handleOpen,
    params,
    setWorkNote,
    handleSentDelete,
}) => {
    return (
        <Dialog open={open} handler={handleOpen}>
            <div className="flex items-center justify-between">
                <DialogHeader>Lý do hủy</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpen}
                />
            </div>
            <DialogBody divider>
                <div className="grid gap-6">
                    {/* <input type="text" value={params.id} /> */}
                    <Textarea
                        label="Lý do hủy"
                        className="shadow-none"
                        onChange={(e) => setWorkNote(e.target.value)}
                    />
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button
                    variant="gradient"
                    color="red"
                    onClick={handleSentDelete}
                >
                    Xác nhận
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
const ThuHoiDialog = ({
    openThuHoi,
    handleOpenThuHoi,
    setWorkNote,
    handleThuHoi,
}) => {
    return (
        <Dialog open={openThuHoi} handler={handleOpenThuHoi}>
            <div className="flex items-center justify-between">
                <DialogHeader>Lý Do Thu Hồi</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenThuHoi}
                />
            </div>
            <DialogBody divider>
                <div className="grid gap-6">
                    <Textarea
                        label="Lý do thu hồi"
                        className="shadow-none"
                        onChange={(e) => setWorkNote(e.target.value)}
                    />
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="gradient" color="red" onClick={handleThuHoi}>
                    Xác nhận
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
const BHDialog = ({ openBH, handleOpenBH, setBH, handleBH }) => {
    return (
        <Dialog open={openBH} handler={handleOpenBH}>
            <div className="flex items-center justify-between">
                <DialogHeader>Nội Dung Bảo Hành</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenBH}
                />
            </div>
            <DialogBody divider>
                <div className="grid gap-6">
                    <Textarea
                        label="Lý do thu hồi"
                        className="shadow-none"
                        onChange={(e) => setBH(e.target.value)}
                    />
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="gradient" color="red" onClick={handleBH}>
                    Xác nhận
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
const HuyDialog = ({
    openHuy,
    handleOpenHuy,
    setWorkNote,
    handleSentDeleteDone,
}) => {
    return (
        <Dialog open={openHuy} handler={handleOpenHuy}>
            <div className="flex items-center justify-between">
                <DialogHeader>Lý do hủy</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenHuy}
                />
            </div>
            <DialogBody divider>
                <div className="grid gap-6">
                    <Textarea
                        label="Lý do hủy"
                        className="shadow-none"
                        onChange={(e) => setWorkNote(e.target.value)}
                    />
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button
                    variant="gradient"
                    color="red"
                    onClick={handleSentDeleteDone}
                >
                    Xác nhận
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
const KhaoSatDialog = ({
    openKS,
    handleOpenKS,
    setWorkNote,
    handleSentKS,
    cardExpires,
    handleChange,
    disabledAllowed,
    handleFileChange,
    previewImages,
}) => {
    return (
        <Dialog open={openKS} handler={handleOpenKS}>
            <div className="flex items-center justify-between">
                <DialogHeader>Lịch Khảo Sát</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenKS}
                />
            </div>
            <DialogBody divider>
                <form className="flex flex-col gap-4 mt-2">
                    {/* Các trường input */}
                    <div className="flex items-center gap-4 ">
                        <Input
                            label="Yêu Cầu Công Việc"
                            id="work_content"
                            name="work_content"
                            value={cardExpires.work_content}
                            onChange={handleChange}
                            containerProps={{
                                className: "min-w-[72px]",
                            }}
                            className="shadow-none"
                        />
                        <Input
                            label="Số Điện Thoại"
                            id="phone_number"
                            name="phone_number"
                            value={cardExpires.phone_number}
                            onChange={handleChange}
                            containerProps={{
                                className: "min-w-[72px]",
                            }}
                            className="shadow-none"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            label="Địa Chỉ"
                            id="street"
                            name="street"
                            value={cardExpires.street}
                            onChange={handleChange}
                            containerProps={{
                                className: "min-w-[72px]",
                            }}
                            className="shadow-none"
                        />
                        <Input
                            label="Quận"
                            id="district"
                            name="district"
                            value={cardExpires.district}
                            onChange={handleChange}
                            containerProps={{
                                className: "min-w-[72px]",
                            }}
                            className="shadow-none"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            label="Tên Khách Hàng"
                            id="name_cus"
                            name="name_cus"
                            value={cardExpires.name_cus}
                            onChange={handleChange}
                            containerProps={{
                                className: "min-w-[72px]",
                            }}
                            className="shadow-none"
                        />

                        <Input
                            label="Ngày Làm"
                            id="date_book"
                            name="date_book"
                            value={cardExpires.date_book}
                            onChange={handleChange}
                            containerProps={{
                                className: "min-w-[72px]",
                            }}
                            className="shadow-none"
                            disabled={disabledAllowed}
                        />
                    </div>
                    <div className="grid gap-6">
                        <Textarea
                            label="Tình Trạng Thực Tế"
                            className="shadow-none"
                            onChange={(e) => setWorkNote(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center ">
                        <FileInput
                            handleFileChange={handleFileChange}
                            previewImages={previewImages}
                        />
                    </div>
                </form>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="gradient" color="red" onClick={handleSentKS}>
                    Xác nhận
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
const processSeriImages = (data) => {
    const parts = data?.split(",");
    const filteredArray = parts?.filter((item) => item.trim() !== "");
    return filteredArray;
};
const ViewTotalDialog = ({
    openViewTotal,
    handleOpenViewTotal,
    params,
    handleViewTotal,
}) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const ContentData = [
        {
            id: 0,
            label: "Yêu Cầu Công Việc:",
            TextContent: params.work_content,
        },
        {
            id: 1,
            label: "Ghi Chú:",
            TextContent: params.name_cus + " - " + params.real_note,
        },
        { id: 2, label: "Ngày Làm:", TextContent: params.date_book },
        {
            id: 3,
            label: "Địa Chỉ:",
            TextContent: params.street + " - " + params.district,
        },
        { id: 4, label: "Số Điện Thoại:", TextContent: params.phone_number },
        {
            id: 5,
            label: "Thợ:",
            TextContent:
                "(" +
                params.worker_code +
                ") - " +
                params.worker_full_name +
                " - " +
                params.worker_phone_company,
        },
        { id: 6, label: "Số Phiếu Thu:", TextContent: params.seri_number },
        {
            id: 7,
            label: "Thông Tin Bảo Hành:",
            TextContent: `${params.warranty == "KBH" ? params.warranty : ""}`,
        },
    ];
    const LoiNhuan = params.income_total - params.spending_total;
    const processedDataVT = processSeriImages(params.bill_imag);
    const processedDataPT = processSeriImages(params.seri_imag);
    const TABLE_HEAD = ["STT", "Thời Gian", "Nội Dung"];
    return (
        <Dialog
            open={openViewTotal}
            handler={handleOpenViewTotal}
            className="bg-none"
        >
            <DialogBody className="p-1">
                <div className="relative flex flex-col w-full p-8 text-black shadow-md bg-clip-border rounded-xl bg-gradient-to-tr from-black-900 to-white-800 shadow-black-900/20">
                    <div className="relative pb-8 m-0 mb-8 overflow-hidden text-center bg-transparent border-b rounded-none shadow-none text-black-700 bg-clip-border border-black/10">
                        <h3 className="block pb-3 font-sans antialiased font-bold leading-normal text-black uppercase border-b r">
                            Thông Tin Thu Chi của{" "}
                            <span className="italic font-bold underline">
                                {"(" +
                                    params.worker_code +
                                    ") - " +
                                    params.worker_full_name +
                                    " - " +
                                    params.worker_phone_company}
                            </span>
                        </h3>
                        <div className="flex justify-between gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-black">
                            <div className="flex flex-col text-center">
                                <span className="pr-1 mt-2 text-2xl underline">
                                    Chi
                                </span>
                                <span className="text-2xl ">
                                    {formatter.format(params.spending_total)}
                                </span>
                            </div>
                            <div className="flex flex-col text-center ">
                                <span className="pr-1 mt-2 text-2xl underline">
                                    Thu
                                </span>
                                <span className="text-2xl">
                                    {formatter.format(params.income_total)}
                                </span>
                            </div>
                            <div className="flex flex-col text-center ">
                                <span className="pr-1 mt-2 text-2xl underline">
                                    Lợi Nhuận
                                </span>
                                <span className="text-2xl">
                                    {formatter.format(LoiNhuan)}
                                </span>
                            </div>
                        </div>
                        <p
                            className={`${
                                LoiNhuan > 0
                                    ? "text-green-500"
                                    : LoiNhuan == 0
                                    ? "text-yellow-500"
                                    : "text-red-500"
                            }`}
                        >
                            {LoiNhuan > 0
                                ? "Chưa Lỗ Được Đâu"
                                : LoiNhuan == 0
                                ? "Huề rồi"
                                : "Lỗ Banh Xát"}
                        </p>
                    </div>
                    <div className="p-0">
                        <div className="grid grid-cols-2 gap-1">
                            <ul className="flex flex-col gap-4">
                                {ContentData.map((item) => {
                                    return (
                                        <li
                                            key={item.id}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="p-1 border rounded-full border-white/20 bg-white/20">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-3 h-3"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 12.75l6 6 9-13.5"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="underline">
                                                {item.label}
                                            </span>
                                            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                                {item.TextContent}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="flex flex-col items-center justify-center">
                                <p>Hình Vật Tư:</p>
                                {params.bill_imag == null ||
                                processedDataVT == false ? (
                                    <p className="flex items-center justify-center w-32 h-32 border border-green-500">
                                        Not Image
                                    </p>
                                ) : (
                                    <>
                                        {Array.isArray(processedDataVT) &&
                                            processedDataVT.map((item,index) => (
                                                <img
                                                    key={index}
                                                    src={item}
                                                    alt=""
                                                    className="w-32 h-32"
                                                />
                                            ))}
                                    </>
                                )}

                                <p>Phiếu Thu:</p>
                                {params.seri_imag == null ||
                                processedDataPT == false ? (
                                    <p className="flex items-center justify-center w-32 h-32 border border-green-500">
                                        Not Image
                                    </p>
                                ) : (
                                    <>
                                        {Array.isArray(processedDataPT) &&
                                            processedDataPT.map((item,index) => (
                                                <img
                                                key={index}
                                                    src={item}
                                                    alt=""
                                                    className="w-32 h-32"
                                                />
                                            ))}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={`${ params.warranty == 'KBH'? 'hidden':"block"} pt-3`}>
                            <Card className="w-full h-[200px] overflow-scroll">
                                <table className="w-full text-left table-auto min-w-max">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="p-4 border-b border-blue-gray-500 bg-blue-gray-200"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(params.warranty) &&
                                            params.warranty?.map(
                                                ( item , index) => {
                                                    console.log(params.warranty);
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className="even:bg-blue-gray-50"
                                                        >

                                                               <><td className="p-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                  { params.warranty !== undefined ? item.id :"KBH" }
                                                                </Typography>
                                                            </td>
                                                            <td className="p-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {
                                                                        item.warranty_time
                                                                    }
                                                                </Typography>
                                                            </td>
                                                            <td className="p-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {
                                                                        item.warranty_info
                                                                    }
                                                                </Typography>
                                                            </td></>

                                                        </tr>
                                                    );
                                                }
                                            )}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    </div>
                    <div className="p-0 mt-12">
                        <Button
                            className="w-full"
                            color="white"
                            onClick={handleViewTotal}
                        >
                            Xem xong
                        </Button>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    );
};
export {
    ThoDialog,
    ReasonDialog,
    ThuHoiDialog,
    HuyDialog,
    KhaoSatDialog,
    BHDialog,
    ViewTotalDialog,
    processSeriImages,
};
