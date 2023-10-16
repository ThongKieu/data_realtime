import React from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Textarea,
    DialogFooter
} from "@material-tailwind/react";
import {
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Select from "react-select";
const ThoDialog = ({ open, handleOpenTho, selectPhanTho, infoWorkerDashboard, handleSelectChange, handleSentPhanTho }) => {
    return (
        <Dialog open={open} handler={handleOpenTho} className="lg:min-w-52">
            <div className="flex items-center justify-between">
                <DialogHeader>Lựa Chọn Thợ</DialogHeader>
                <XMarkIcon className="w-5 h-5 mr-3 cursor-pointer" onClick={handleOpenTho} />
            </div>
            <DialogBody divider>
                <Select
                    value={selectPhanTho}
                    options={infoWorkerDashboard}
                    onChange={(selectedValue) => handleSelectChange(selectedValue)}
                    isMulti
                    className="border-none shadow-none"
                />
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="gradient" color="green" onClick={handleSentPhanTho}>
                    Phân Thợ
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

const ReasonDialog = ({ open, handleOpen, params, setWorkNote, handleSentDelete }) => {
    return (
        <Dialog open={open} handler={handleOpen}>
            <div className="flex items-center justify-between">
                <DialogHeader>Lý do hủy</DialogHeader>
                <XMarkIcon className="w-5 h-5 mr-3 cursor-pointer" onClick={handleOpen} />
            </div>
            <DialogBody divider>
                <div className="grid gap-6">
                    {/* <input type="text" value={params.id} /> */}
                    <Textarea label="Lý do hủy" className="shadow-none" onChange={(e) => setWorkNote(e.target.value)} />
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="gradient" color="red" onClick={handleSentDelete}>
                    Xác nhận
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
const ThuHoiDialog = ({ openThuHoi, handleOpenThuHoi, setWorkNote, handleThuHoi }) => {
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
const HuyDialog = ({ openHuy, handleOpenHuy, setWorkNote, handleSentDeleteDone }) => {
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
                <Button variant="gradient" color="red" onClick={handleSentDeleteDone}>
                    Xác nhận
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export { ThoDialog, ReasonDialog,ThuHoiDialog,HuyDialog };
