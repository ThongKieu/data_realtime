import React from "react";
import {
    Button,
    Card,
    Typography,
    DialogBody,
    Radio,
    IconButton,
    Input,
} from "@material-tailwind/react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Divider, Hidden } from "@mui/material";
import WorkForm from "./WorkForm";
import { useState } from "react";
function AdminCheckDialog({
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
    vatCard,
    isAllowed,
}) {
    const [activePt, setActivePt] = useState(true);
    const handleSetActive = () => setActivePt(!activePt);
    return (
        <DialogBody divider>
            <div className="flex flex-row justify-between w-full gap-4 mb-2 text-sm">
                <div className="w-full p-2 text-sm border border-green-500 ">
                    <div>
                        <span>Nhân Viên:</span>
                        <i className="pl-1">{params.row.sort_name}</i>
                        <i>_</i>
                        <i className="pl-1">{params.row.worker_name}</i>
                        <i>_</i>
                        <i className="pl-1">{params.row.add_worker}</i>
                    </div>
                    <div>
                        <span>Số Điện Thoại:</span>
                        <i className="pl-1">{params.row.phone_ct}</i>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full p-2 text-sm border border-green-500 ">
                    <span>Số Phiếu Thu:</span>
                    <Input
                        type="text"
                        value={params.row.seri_number}
                        disabled={activePt}
                        labelProps={{
                            className: "hidden",
                        }}
                        className="border"
                    />
                    {activePt === true ? (
                        <IconButton variant="text" onClick={handleSetActive}>
                            <PencilSquareIcon className="w-5 h-5" />
                        </IconButton>
                    ) : (
                        <IconButton variant="text" onClick={handleSetActive}>
                            <XMarkIcon className="w-5 h-5" />
                        </IconButton>
                    )}
                </div>
            </div>
            <div className="flex flex-row justify-between w-full mb-5 text-sm">
                <div className="flex-1 p-2 border border-green-500">
                    <i>
                        <u>Nội Dung Bảo Hành:</u>
                    </i>
                    <p className="text-center">Không có thông tin bảo hành !</p>
                </div>
                <div className="flex-1 p-2 border border-green-500 border-x-0">
                    <i>
                        <u> Hình Vật Tư:</u>
                    </i>
                    <div className="text-center">
                        <input
                            id="image_Vt"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChangeVt}
                            multiple
                            className="w-full text-[10px] cursor-pointer text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 focus:outline-none focus:shadow-none"
                            disabled={isAllowed}
                        />
                        {imageVt1 == "" || imageVt1 == null ? (
                            <i>(Không Có Hình)</i>
                        ) : (
                            <div className="grid w-full grid-cols-2 gap-4">
                                {imageVt1.map((item, index) => (
                                    <Card
                                        key={index}
                                        className="border border-green-500 "
                                    >
                                        <XMarkIcon
                                            className="w-5 h-5 mr-3 cursor-pointer"
                                            onClick={() =>
                                                handleImageVtDelete(index)
                                            }
                                        />
                                        <img
                                            src={`${host}${item}`}
                                            alt="nature image"
                                        />
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1 p-2 border border-green-500">
                    <i>
                        <u>Hình Phiếu Thu:</u>
                    </i>
                    <div className="text-center">
                        <input
                            id="image_Vt"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChangeVt}
                            multiple
                            className="w-full text-[10px] cursor-pointer text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 focus:outline-none focus:shadow-none"
                            disabled={isAllowed}
                        />
                        {imagePt1 == "" || imagePt1 == null ? (
                            <i>(Không Có Hình)</i>
                        ) : (
                            <div className="grid w-full grid-cols-2 gap-4">
                                {imagePt1.map((item, index) => (
                                    <Card
                                        key={index}
                                        className="border border-green-500 "
                                    >
                                        <XMarkIcon
                                            className="w-5 h-5 mr-3 cursor-pointer"
                                            onClick={() =>
                                                handleImagePtDelete(index)
                                            }
                                        />
                                        <img
                                            src={`${host}${item}`}
                                            alt="nature image"
                                        />
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <WorkForm
                cardExpires={cardExpires}
                handleChange={handleChange}
                vatCard={vatCard}
            >
                <Divider className="pt-2" />
                <div className="flex flex-row justify-center pt-2">
                    <Typography className="font-medium text-red-700">
                        (*_*)Vui Lòng Kiểm Tra Thông Tin Lại Trước Khi Xác
                        Nhận!!
                    </Typography>
                    <Button
                        size="sm"
                        className="px-3 py-2 mx-4 shadow-none"
                        variant="outlined"
                    >
                        Xác Nhận Thông Tin
                    </Button>
                </div>
            </WorkForm>
        </DialogBody>
    );
}

export default AdminCheckDialog;
