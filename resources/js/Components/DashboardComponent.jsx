
import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    Tooltip,
} from "@material-tailwind/react";
import {
    TrashIcon,
    EyeIcon,
    ArrowPathIcon,
    ArrowUpTrayIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import AdminCheckDialog from "@/Components/AdminCheckDialog";
import { ThuHoiDialog } from "@/Components/LichChuaPhanDialog";
import SpendingDialog from "@/Components/SpendingDialog";
const ButtonBar1 = ({
    check_admin,
    isButtonDisabled,
    auth,
    handleOpenSpending_total,
    handleOpenThuHoi,
    handleOpenHuy,
    handleOpenAdminCheck,
    openAdminCheck,
    params,
    addDot,
    handleFileChangeVt,
    imageVt1,
    host,
    handleImageVtDelete,
    handleImagePtDelete,
    imagePt1,
    handleChange,
    cardExpires,
    openThuHoi,
    handleThuHoi,
    openHuy,
    handleSentDeleteDone,
    openSpending_total,
    handleOpenSpending_total,
    isAllowed,
    handleRadioChangeAllow,
    vatCard,
    handleFileChangePt,
    previewImgPt,
    previewImgVt,
    dataBtnChi,
    handleDataFromChild
}) => {
    return (
        <div className="flex">
            {check_admin ? (
                <Tooltip content="Admin Check">
                    <Button
                        className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer "
                        onClick={handleOpenAdminCheck}
                        disabled={isButtonDisabled(auth.user.permission, 1)}
                        variant="outlined"
                    >
                        <EyeIcon />
                    </Button>
                </Tooltip>
            ) : (
                <div className="flex w-full">
                    {spending || income ? (
                        <>
                            <Tooltip content="Nhập Thu Chi">
                                <ArrowUpTrayIcon
                                    className="w-8 h-8 p-1 mr-2 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                    onClick={handleOpenSpending_total}
                                />
                            </Tooltip>{" "}
                            <Tooltip content="Admin Check">
                                <Button
                                    className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer "
                                    onClick={handleOpenAdminCheck}
                                    disabled={isButtonDisabled(auth.user.permission, 1)}
                                    variant="outlined"
                                >
                                    <EyeIcon />
                                </Button>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip content="Nhập Thu Chi">
                                <ArrowUpTrayIcon
                                    className="w-8 h-8 p-1 mr-2 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                    onClick={handleOpenSpending_total}
                                />
                            </Tooltip>

                            <Tooltip content="Thu Hồi Lịch">
                                <ArrowPathIcon
                                    className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                                    onClick={handleOpenThuHoi}
                                />
                            </Tooltip>
                            <Tooltip content="Báo hủy">
                                <TrashIcon
                                    className="w-8 h-8 p-1 mr-2 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                                    onClick={handleOpenHuy}
                                />
                            </Tooltip>
                            <Tooltip content="Admin Check">
                                <Button
                                    className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer "
                                    onClick={handleOpenAdminCheck}
                                    disabled={isButtonDisabled(auth.user.permission, 1)}
                                    variant="outlined"
                                >
                                    <EyeIcon />
                                </Button>
                            </Tooltip>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
const AdminCheckDialogWrapper = ({
    openAdminCheck,
    handleOpenAdminCheck,
    params,
    addDot,
    handleFileChangeVt,
    imageVt1,
    host,
    handleImageVtDelete,
    handleImagePtDelete,
    imagePt1,
    handleChange,
    cardExpires,
    auth
}) => {
    return (
        <Dialog
            open={openAdminCheck}
            handler={handleOpenAdminCheck}
            className="w-full max-w-full min-w-full 2xl:min-w-[60%]"
        >
            <div className="flex items-center justify-between">
                <DialogHeader>XÁC NHẬN THÔNG TIN THỢ BÁO</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenAdminCheck}
                />
            </div>
            <AdminCheckDialog
                params={params}
                addDot={addDot}
                handleFileChangeVt={handleFileChangeVt}
                imageVt1={imageVt1}
                host={host}
                handleImageVtDelete={handleImageVtDelete}
                handleImagePtDelete={handleImagePtDelete}
                imagePt1={imagePt1}
                handleChange={handleChange}
                cardExpires={cardExpires}
                auth={auth}
            />
        </Dialog>
    );
};
const ThuHoiDialogWrapper = ({ openThuHoi, handleOpenThuHoi, setWorkNote, handleThuHoi }) => {
    return (
        <Dialog open={openThuHoi} handler={handleOpenThuHoi}>
            <div className="flex items-center justify-between">
                <DialogHeader>Lý Do Thu Hồi</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenThuHoi}
                />
            </div>
            <ThuHoiDialog setWorkNote={setWorkNote} handleThuHoi={handleThuHoi} />
        </Dialog>
    );
};
const SpendingDialogWrapper = ({
    openSpending_total,
    handleOpenSpending_total,
    isAllowed,
    handleRadioChangeAllow,
    cardExpires,
    handleChange,
    vatCard,
    handleFileChangeVt,
    previewImgVt,
    handleFileChangePt,
    previewImgPt,
    cardExpires,
    dataBtnChi,
    params,
    handleDataFromChild
}) => {
    return (
        <Dialog
            open={openSpending_total}
            handler={handleOpenSpending_total}
            className="w-full max-w-full min-w-full 2xl:min-w-[70%]"
        >
            <div className="flex items-center justify-between">
                <DialogHeader>Nhập Thu Chi</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenSpending_total}
                />
            </div>
            <SpendingDialog
                isAllowed={isAllowed}
                handleRadioChangeAllow={handleRadioChangeAllow}
                cardExpires={cardExpires}
                handleChange={handleChange}
                vatCard={vatCard}
                handleFileChangeVt={handleFileChangeVt}
                previewImgVt={previewImgVt}
                handleFileChangePt={handleFileChangePt}
                previewImgPt={previewImgPt}
                dataBtnChi={dataBtnChi}
                params={params}
                handleDataFromChild={handleDataFromChild}
            />
        </Dialog>
    );
};
export default{ButtonBar1,AdminCheckDialogWrapper,ThuHoiDialogWrapper,SpendingDialogWrapper};
