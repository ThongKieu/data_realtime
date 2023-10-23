import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Typography,
    DialogBody,
    Dialog,
    IconButton,
    Input,
    DialogHeader,
} from "@material-tailwind/react";
import {
    XMarkIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import EditableInput from "./EditInput";
import FileInput from "./FileInputImage";
function AdminCheckDialog({
    params,
    handleFileChangeVt,handleFileChangePt,
    imageVt1,
    host,
    handleImageVtDelete,
    handleImagePtDelete,
    imagePt1,
    handleChange,
    cardExpires,
    vatCard,
    isAllowed,
    auth,
    handleEdit,
    openAdminCheck,
    handleOpenAdminCheck,
    previewImagesVT,previewImagesPT
}) {
    const [activePt, setActivePt] = useState({
        inputSPT: false,
        inputBH: false,
        inputYCCV: false,
        inputSDT: false,
        inputDiaChi: false,
        inputQuan: false,
        inputTenKH: false,
        inputNgayLam: false,
        inputGhiChu: false,
        inputThuChi: false,
        // Thêm các trạng thái khác tại đây nếu bạn có nhiều input hơn
    });
    const handleSetActive = (field) => {
        setActivePt({
            ...activePt,
            [field]: !activePt[field],
        });
    };
    const containerProps = {
        className: "min-w-[72px]",
    };

    // const handleSetActive = () => setActivePt(!activePt);
    const [dataBH, setDataBH] = useState([]);

    const fetchDataBH = async () => {
        try {
            const response = await fetch(
                `api/web/work-assignment/warranties?id=${params.row.id}`
            );
            const jsonData = await response.json();
            const data = jsonData.data;
            if (response.ok && data !== "undefined") {
                const formatJson = data?.map((item) => ({
                    id: item.id,
                    warranty_info: item.warranty_info,
                    warranty_time: item.warranty_time,
                    unit: item.unit
                }));
                setDataBH(formatJson);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchDataBH();
    }, []);
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
                        <EditableInput
                            type="text"
                            value={params.row.seri_number}
                            label="Số Phiếu Thu"
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputSPT}
                            active={activePt.inputSPT}
                            handleSetActive={() => handleSetActive("inputSPT")}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between w-full mb-5 text-sm">
                    <div className="flex-1 p-2 border border-green-500">
                        <i>
                            <u>Nội Dung Bảo Hành:</u>
                        </i>
                        {dataBH?.map((element, index) => (
                            <div className="flex gap-4" key={index}>
                                <div className="flex p-1">
                                    <EditableInput
                                        label="Bảo Hành"
                                        type="text"
                                        value={`${element.warranty_time} ${element.unit} ${element.warranty_info}`}
                                        onChange={handleChange}
                                        containerProps={containerProps}
                                        disabled={!activePt.inputBH}
                                        active={activePt.inputBH}
                                        handleSetActive={() =>
                                            handleSetActive("inputBH")
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 p-2 border border-green-500 border-x-0">
                        <i>
                            <u> Hình Vật Tư:</u>
                        </i>
                        <div className="text-center">
                            <FileInput handleFileChange={handleFileChangeVt} previewImages={previewImagesVT}/>

                            {imageVt1 == "" || imageVt1 == null ? (
                                <i>(Không Có Hình)</i>
                            ) : (
                                <div className="grid w-full grid-cols-3 gap-4">
                                    {imageVt1.map((item, index) => (
                                        <Card
                                            key={index}
                                            className="relative border border-green-500 rounded-none"
                                        >
                                            <XCircleIcon
                                                className="absolute top-[-10px] right-[-23px] w-5 h-5 mr-3 cursor-pointer font-bold"
                                                onClick={() =>
                                                    handleImageVtDelete(index)
                                                }
                                            />
                                            <img
                                                src={`${host}${item}`}
                                                alt="nature image"
                                                className="p-2"
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
                        <FileInput handleFileChange={handleFileChangePt} previewImages={previewImagesPT}/>
                            {imagePt1 == "" || imagePt1 == null ? (
                                <i>(Không Có Hình)</i>
                            ) : (
                                <div className="grid w-full grid-cols-3 gap-4 mt-1">
                                    {imagePt1.map((item, index) => (
                                        <Card
                                            key={index}
                                            className="relative border border-green-500 rounded-none"
                                        >
                                            <XCircleIcon
                                                className="absolute top-[-10px] right-[-23px] w-5 h-5 mr-3 cursor-pointer font-bold"
                                                onClick={() =>
                                                    handleImagePtDelete(index)
                                                }
                                            />
                                            <img
                                                src={`${host}${item}`}
                                                alt="nature image"
                                                className="p-2"
                                            />
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <form className="flex flex-col gap-4 mt-2">
                    {/* Các trường input */}
                    <div className="flex items-center gap-4 ">
                        <EditableInput
                            label="Yêu Cầu Công Việc"
                            id="work_content"
                            name="work_content"
                            value={cardExpires.work_content}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputYCCV}
                            active={activePt.inputYCCV}
                            handleSetActive={() => handleSetActive("inputYCCV")}
                            handleEdit={handleEdit}
                        />
                        <EditableInput
                            label="Số Điện Thoại"
                            id="phone_number"
                            name="phone_number"
                            value={cardExpires.phone_number}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputSDT}
                            active={activePt.inputSDT}
                            handleSetActive={() => handleSetActive("inputSDT")}
                            handleEdit={handleEdit}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <EditableInput
                            label="Địa Chỉ"
                            id="street"
                            name="street"
                            value={cardExpires.street}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputDiaChi}
                            active={activePt.inputDiaChi}
                            handleSetActive={() =>
                                handleSetActive("inputDiaChi")
                            }
                            handleEdit={handleEdit}
                        />
                        <EditableInput
                            label="Quận"
                            id="district"
                            name="district"
                            value={cardExpires.district}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputQuan}
                            active={activePt.inputQuan}
                            handleSetActive={() => handleSetActive("inputQuan")}
                            handleEdit={handleEdit}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <EditableInput
                            label="Tên Khách Hàng"
                            id="name_cus"
                            name="name_cus"
                            value={cardExpires.name_cus}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputTenKH}
                            active={activePt.inputTenKH}
                            handleSetActive={() =>
                                handleSetActive("inputTenKH")
                            }
                            handleEdit={handleEdit}
                        />
                        <EditableInput
                            label="Ngày Làm"
                            id="date_book"
                            name="date_book"
                            value={cardExpires.date_book}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputNgayLam}
                            active={activePt.inputNgayLam}
                            handleSetActive={() =>
                                handleSetActive("inputNgayLam")
                            }
                        />
                    </div>
                    <div className="flex items-center gap-4 ">
                        <div className="flex w-full">
                            <EditableInput
                                label="Ghi Chú"
                                id="real_note"
                                name="real_note"
                                value={cardExpires.real_note}
                                onChange={handleChange}
                                containerProps={containerProps}
                                disabled={!activePt.inputGhiChu}
                                active={activePt.inputGhiChu}
                                handleSetActive={() =>
                                    handleSetActive("inputGhiChu")
                                }
                                handleEdit={handleEdit}
                            />
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-4 ">
                        <EditableInput
                            label="Tiền Chi"
                            id="spending_total"
                            name="spending_total"
                            value={cardExpires.spending_total}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputThuChi}
                            active={activePt.inputThuChi}
                            handleSetActive={() =>
                                handleSetActive("inputThuChi")
                            }
                            handleEdit={handleEdit}
                        />

                        <EditableInput
                            label="Tiền Thu"
                            id="income_total"
                            name="income_total"
                            value={cardExpires.income_total}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputThuChi}
                            active={activePt.inputThuChi}
                            handleSetActive={() =>
                                handleSetActive("inputThuChi")
                            }
                            handleEdit={handleEdit}
                        />
                    </div>
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
                </form>
            </DialogBody>
        </Dialog>
    );
}

export default AdminCheckDialog;
