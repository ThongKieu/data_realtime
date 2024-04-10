import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Textarea,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import FileInput from "./FileInputImage";
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
const ViewTotalDialog = ({
    openViewTotal,
    handleOpenViewTotal,
    params,
    handleViewTotal,
}) => {
    // console.log("papapappa", params);
    return (
        <Dialog
            open={openViewTotal}
            handler={handleOpenViewTotal}
            className="bg-none"
        >
            {/* <div className="flex items-center justify-between">
                <DialogHeader>Thông Tin Nhập Thu Chi</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenViewTotal}
                />
            </div> */}
            <DialogBody>
                <div className="relative flex flex-col w-full p-8 text-white shadow-md bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 shadow-gray-900/20">
                    <div className="relative pb-8 m-0 mb-8 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none bg-clip-border border-white/10">
                        <h3 className="block font-sans antialiased font-normal leading-normal text-white uppercase">
                            Thông Tin Thu Chi
                        </h3>
                        <div className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
                            <span className="mt-2 text-4xl">$</span>29
                            <span className="self-end text-4xl">/mo</span>
                        </div>
                    </div>
                    <div className="p-0">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4">
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
                                <span>Yêu Cầu Công Việc:</span>
                                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                    {params.work_content}
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
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
                                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                    200+ components
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
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
                                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                    40+ built-in pages
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
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
                                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                    1 year free updates
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
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
                                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                    Life time technical support
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="p-0 mt-12">
                        <button
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                            type="button"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </DialogBody>
            {/* <DialogFooter className="space-x-2">
                <Button
                    variant="outlined"
                    color="green"
                    className="p-2 px-4"
                    onClick={handleViewTotal}
                >
                    Đóng
                </Button>
            </DialogFooter> */}
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
};
