import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Typography,
    DialogBody,
    Dialog,
    Option,
    Select,
    Input,
    DialogHeader,
    DialogFooter,
    IconButton,
    Radio,
} from "@material-tailwind/react";
import {
    XCircleIcon,
    PencilSquareIcon,
    PlusCircleIcon,
    TrashIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import EditableInput from "./EditInput";
import FileInput from "./FileInputImage";
import useWindowSize from "@/Core/Resize";
function AdminCheckDialog({
    params,
    handleFileChangeVt,
    handleFileChangePt,
    handleSendImagePT,
    handleSendImageVT,
    imageVt1,
    host,
    handleImageVtDelete,
    handleImagePtDelete,
    imagePt1,
    cardExpires,
    auth,
    openAdminCheck,
    handleOpenAdminCheck,
    previewImagesVT,
    previewImagesPT,
    classNameChild,
    handleChange,
    socketD,
    handleSearch,
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
    const [oldDataBH, setOldDataBH] = useState(params.row.warranty);
    const [dataBH, setDataBH] = useState(
        params.row.warranty == "KBH"
            ? [
                  {
                      id: 0,
                      warranty_time: 0,
                      unit: "kbh",
                      warranty_info: "Không Bảo Hành",
                      warranty_create: 0,
                  },
              ]
            : params.row.warranty
    );
    const [openBH, setOpenBH] = useState(false);
    const handleOpenBH = () => setOpenBH(!openBH);
    const [selectedValue, setSelectedValue] = useState();
    const handleSelectChange = (selectedValue, id) => {
        const updatedData = dataBH.map((item) => {
            if (item.id === id) {
                return { ...item, unit: selectedValue };
            }
            return item;
        });
        setDataBH(updatedData);
        setSelectedValue(selectedValue);
    };
    const handleChangeBH = (e, id) => {
        const { name, value } = e.target;
        const updatedData = dataBH.map((item) => {
            if (item.id === id) {
                return { ...item, [name]: value };
            }
            return item;
        });
        setDataBH(updatedData);
    };
    const optionBH = [
        { id: 0, unit: "KBH", label: "KBH" },
        { id: 1, unit: "d", label: "Ngày" },
        { id: 2, unit: "w", label: "Tuần" },
        { id: 3, unit: "m", label: "Tháng" },
        { id: 4, unit: "y", label: "Năm" },
    ];
    const handleClick = () => {
        // Tìm key lớn nhất hiện có và tăng lên 1 để tạo key mới
        const maxKey = Math.max(...dataBH.map((item) => item.id));
        const newId = maxKey + 1;
        setDataBH((prevData) => [
            ...prevData,
            {
                id: newId,
                warranty_time: 0,
                unit: "KBH",
                warranty_info: "Không Bảo Hành",
            },
        ]);
    };
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [idToDelete, setIdToDelete] = useState([]);
    const handleDelete = async (id) => {
        try {
            setDisabledButtons((prev) => [...prev, id]);
            setIdToDelete((prev) => [...prev, id]);
        } catch (error) {
            console.error("Error during delete setup:", error);
        }
    };
    const handleConfirmDelete = async () => {
        if (idToDelete !== null) {
            try {
                const deleteBH = {
                    ac: 1,
                    auth_id: auth.user.id,
                    id_del_warranty: idToDelete,
                };
                const res = await fetch(`api/web/update/check-admin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deleteBH),
                });

                if (res.ok) {
                    const updatedData = dataBH.filter(
                        (item) => item.id !== idToDelete
                    );
                    setDataBH(updatedData);
                    handleOpenBH();
                } else {
                    console.error("Lỗi khi xóa dữ liệu:", res.statusText);
                }
            } catch (error) {
                console.error("Error during delete:", error);
            }
        }
    };
    const handleValueBh = async () => {
        try {
            if (oldDataBH !== "") {
                const modifiedData = dataBH
                    .map((item) => {
                        const matchingItem =
                            Array.isArray(...oldDataBH) &&
                            oldDataBH.find((oldItem) => oldItem.id === item.id);
                        return matchingItem
                            ? !Object.entries(item).every(
                                  ([key, value]) => matchingItem[key] === value
                              )
                                ? {
                                      ...matchingItem,
                                      ...item,
                                      warranty_create: 0,
                                  } // Sửa
                                : null
                            : { ...item, warranty_create: 1 }; // Thêm mới
                    })
                    .filter(Boolean);

                const dataBh = {
                    ac: 1,
                    auth_id: auth.user.id,
                    id_work_has: params.row.id,
                    info_warranties: modifiedData,
                };
                console.log(dataBh);
                const res = await fetch("api/web/update/check-admin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataBh),
                });

                if (res.ok) {
                    console.log("Đã Gửi Thông Tin Bảo Hành", dataBh);
                    socketD?.emit("UpdateDateTable_To_Server");
                    handleOpenBH();
                } else {
                    console.error("Lỗi khi gửi dữ liệu:", res.statusText);
                }
            }
        } catch (error) {
            console.error("Error fetching data lỗi rồi:", error);
        }
    };
    const handleUpdateStatusCheckAdmin = async (e) => {
        e.preventDefault();
        const check_admin = {
            ac: 13,
            auth_id: auth.user.id,
            id: params.row.id,
            id_cus: params.row.id_cus,
            data: {
                ...cardExpires,
                id_worker: params.row.id_worker,
                work_content: cardExpires.work_content,
                phone_number: cardExpires.phone_number,
                street: cardExpires.street,
                district: cardExpires.district,
                name_cus: cardExpires.name_cus,
                real_note: cardExpires.real_note,
                income_total: cardExpires.income_total,
                spending_total: cardExpires.spending_total,
                seri_number: cardExpires.seri_number,
            },
        };
        try {
            const res = await fetch(`api/web/update/check-admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(check_admin),
            });
            if (res.ok) {
                handleSearch();
                handleOpenAdminCheck();
                socketD.emit(
                    "UpdateDateTable_To_Server",
                    "Cập Nhật trạng thái AdminCheck",
                    check_admin
                );
            } else {
                console.error(
                    "Lỗi thay đổi trạng thái AdminCheck:",
                    res.statusText
                );
            }
        } catch (error) {
            console.error("Error fetching data lỗi rồi:", error);
        }
    };
    const { width, height } = useWindowSize(300);
    const [isReadMore, setIsReadMore] = useState(false);
    const toggleReadMore = (id) => {
        setIsReadMore(!isReadMore);
    };
    return (
        <Dialog
            open={openAdminCheck}
            handler={handleOpenAdminCheck}
            className="w-full max-w-full min-w-full 2xl:min-w-[60%]"
        >
            <div className="flex items-center justify-center italic font-thin">
                <DialogHeader className="font-sans underline ">
                    ADMIN KIỂM TRA
                </DialogHeader>
            </div>
            <DialogBody
                className={`overflow-y-auto`}
                style={{ height: `${height}px` }}
                divider
            >
                {/* <div className="flex flex-row justify-center">
                    <Card className="flex flex-row justify-between w-[50%] px-10 mb-2 border">
                        <Radio
                        id="chuaTT"
                        name="status_work"
                        label="Chưa thanh toán"
                        value="0"
                        checked={`isAllowed`} // Đảo ngược trạng thái, checked là true khi isAllowed là false
                        // onChange={handleRadioChangeAllow}
                        className="w-1 h-1 p-1"
                    />
                    <Radio
                        id="VAT"
                        name="status_work"
                        label="Xuất hóa đơn"
                        value="1"
                        checked={`isAllowed`} // checked là true khi isAllowed là true
                        // onChange={handleRadioChangeAllow}
                        className="w-1 h-1 p-1"
                    />
                    </Card>
                </div> */}
                <div className="flex flex-row justify-between w-full gap-4 mb-2 text-sm">
                    <div className="w-full p-2 text-sm border border-green-500 ">
                        <div>
                            <span>Nhân Viên:</span>
                            <i className="pl-1">{params.row.worker_code}</i>
                            <i>_</i>
                            <i className="pl-1">
                                {params.row.worker_full_name}
                            </i>
                        </div>
                        <div>
                            <span>Số Điện Thoại:</span>
                            <i className="pl-1">
                                {params.row.worker_phone_company}
                            </i>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full p-2 text-sm border border-green-500 ">
                        <EditableInput
                            id="seri_number"
                            name="seri_number"
                            type="text"
                            value={cardExpires.seri_number}
                            label="Số Phiếu Thu"
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputSPT}
                            active={activePt.inputSPT}
                            handleSetActive={() => handleSetActive("inputSPT")}
                            // handleEdit={handleEdit}
                            classNameChild={classNameChild}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between w-full mb-5 text-sm">
                    <div className="flex-1 p-2 border border-green-500">
                        <i className="flex justify-between">
                            <u>Nội Dung Bảo Hành:</u>
                            <PencilSquareIcon
                                className="w-5 h-5 text-blue-500 cursor-pointer"
                                onClick={handleOpenBH}
                            />
                            <Dialog
                                open={openBH}
                                handler={handleOpenBH}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                            >
                                <DialogHeader>
                                    Chỉnh Sửa Thông Tin Bảo Hành
                                </DialogHeader>
                                <Divider />
                                <DialogBody>
                                    {Array.isArray(dataBH) &&
                                        dataBH.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between gap-1 mb-2"
                                            >
                                                <div className="flex-none">
                                                    <Input
                                                        label="Thời Gian Bảo Hành"
                                                        id="warranty_time"
                                                        name="warranty_time"
                                                        type="number"
                                                        min="1"
                                                        max="30"
                                                        value={
                                                            item.warranty_time
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeBH(
                                                                e,
                                                                item.id
                                                            )
                                                        }
                                                        className="w-[100%] shadow-none"
                                                    />
                                                </div>
                                                <div>
                                                    <Select
                                                        value={item.unit}
                                                        defaultValue={
                                                            selectedValue
                                                        }
                                                        label="Bảo Hành"
                                                        onChange={(
                                                            selectedValue
                                                        ) =>
                                                            handleSelectChange(
                                                                selectedValue,
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        {optionBH.map(
                                                            (option) => (
                                                                <Option
                                                                    key={
                                                                        option.unit
                                                                    }
                                                                    value={
                                                                        option.unit
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>
                                                </div>

                                                <div className="flex-1">
                                                    <Input
                                                        label="Nội Dung Bảo Hành"
                                                        id="warranty_info"
                                                        name="warranty_info"
                                                        value={
                                                            item.warranty_info
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeBH(
                                                                e,
                                                                item.id
                                                            )
                                                        }
                                                        className="mr-1 w-[100%] shadow-none"
                                                    />
                                                </div>
                                                <Button
                                                    variant="outlined"
                                                    color="red"
                                                    className="px-2 py-0 mx-1 "
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    disabled={disabledButtons.includes(
                                                        item.id
                                                    )}
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        ))}
                                    <Button
                                        onClick={() => handleClick()}
                                        variant="outlined"
                                        color="green"
                                        className="px-1 py-1 mb-1"
                                        disabled={
                                            disabledButtons != ""
                                                ? "disabled"
                                                : ""
                                        }
                                    >
                                        <PlusCircleIcon className="w-5 h-5" />
                                    </Button>
                                </DialogBody>
                                <Divider />
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleOpenBH}
                                        className="mr-1"
                                    >
                                        <span>Thoát</span>
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        color="green"
                                        onClick={() => {
                                            if (disabledButtons != "") {
                                                handleConfirmDelete();
                                                setDisabledButtons("");
                                            } else {
                                                handleValueBh();
                                            }
                                        }}
                                    >
                                        <span>Xác Nhận</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </i>
                        <p
                            onClick={() => {
                                toggleReadMore(params.row.warranty);
                            }}
                            className="p-1 mt-1 text-center border border-green-500 rounded-md cursor-pointer"
                        >
                            {isReadMore ? "Thu gọn" : "Xem Bảo Hành"}
                        </p>

                        <div
                            className={`${
                                isReadMore !== true ? "hidden" : ""
                            } border border-green-500 border-t-0 mb-0 mx-2`}
                        >
                            {Array.isArray(dataBH) &&
                                dataBH.map((element, index) => (
                                    <span
                                        className={`flex p-2 mt-1 border `}
                                        key={index}
                                    >
                                        {`${element.warranty_time} ${`${
                                            element.unit === "d"
                                                ? "ngày"
                                                : element.unit === "w"
                                                ? "tuần"
                                                : element.unit === "m"
                                                ? "tháng"
                                                : element.unit === "y"
                                                ? "năm"
                                                : ""
                                        }`} ${element.warranty_info}`}
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div className="flex-1 p-2 border border-green-500 border-x-0">
                        <i className="flex justify-between">
                            <u> Hình Vật Tư:</u>
                            <IconButton
                                variant="outlined"
                                className="w-3 h-3 px-3 py-2"
                                onClick={handleSendImageVT}
                            >
                                <PaperAirplaneIcon className="w-3 h-3" />
                            </IconButton>
                        </i>
                        <div className="text-center">
                            <div>
                                <div className="flex">
                                    <FileInput
                                        handleFileChange={handleFileChangeVt}
                                        previewImages={previewImagesVT}
                                    />
                                </div>
                            </div>
                            {imageVt1 == "" || imageVt1 == null ? (
                                <i className="mt-4">(Không Có Hình)</i>
                            ) : (
                                <div className="grid w-full grid-cols-3 gap-4 mt-4">
                                    {imageVt1.map((item, index) => (
                                        <Card
                                            key={index}
                                            className="relative border border-green-500 rounded-none"
                                        >
                                            <XCircleIcon
                                                className="absolute top-[-10px] right-[-23px] w-5 h-5 mr-3 cursor-pointer font-bold text-red-500"
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
                        <i className="flex justify-between">
                            <u>Hình Phiếu Thu:</u>
                            <IconButton
                                variant="outlined"
                                className="w-3 h-3 px-3 py-2"
                                onClick={handleSendImagePT}
                            >
                                <PaperAirplaneIcon className="w-3 h-3" />
                            </IconButton>
                        </i>
                        <div className="text-center">
                            <div>
                                <div className="flex">
                                    <FileInput
                                        handleFileChange={handleFileChangePt}
                                        previewImages={previewImagesPT}
                                    />
                                </div>
                            </div>

                            {imagePt1 == "" || imagePt1 == null ? (
                                <i className="mt-4">(Không Có Hình)</i>
                            ) : (
                                <div className="grid w-full grid-cols-3 gap-4 mt-4">
                                    {imagePt1.map((item, index) => (
                                        <Card
                                            key={index}
                                            className="relative border border-green-500 rounded-none"
                                        >
                                            <XCircleIcon
                                                className="absolute top-[-10px] right-[-23px] w-5 h-5 mr-3 cursor-pointer font-bold text-red-500"
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
                            classNameChild={classNameChild}
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
                            classNameChild={classNameChild}
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
                            classNameChild={classNameChild}
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
                            classNameChild={classNameChild}
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
                            classNameChild={classNameChild}
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
                            classNameChild={classNameChild}
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
                                classNameChild={classNameChild}
                            />
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-4 ">
                        <EditableInput
                            label="Tiền Chi"
                            id="spending_total"
                            name="spending_total"
                            value={cardExpires.spending_total}
                            defaultValue={params.row.spending_total}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputThuChi}
                            active={activePt.inputThuChi}
                            handleSetActive={() =>
                                handleSetActive("inputThuChi")
                            }
                            classNameChild={classNameChild}
                        />
                        <EditableInput
                            label="Tiền Thu"
                            id="income_total"
                            name="income_total"
                            value={cardExpires.income_total}
                            defaultValue={params.row.income_total}
                            onChange={handleChange}
                            containerProps={containerProps}
                            disabled={!activePt.inputThuChi}
                            active={activePt.inputThuChi}
                            handleSetActive={() =>
                                handleSetActive("inputThuChi")
                            }
                            classNameChild={classNameChild}
                        />
                    </div>
                </form>
            </DialogBody>
            {auth.user.permission == 1 || auth.user.permission == 0 ? (
                <div className="flex flex-row justify-center py-2">
                    <Typography className="font-medium text-red-700">
                        (*_*)Vui Lòng Kiểm Tra Thông Tin Lại Trước Khi Xác
                        Nhận!!
                    </Typography>
                    <Button
                        size="sm"
                        className="px-3 py-2 mx-4 shadow-none"
                        variant="outlined"
                        onClick={handleUpdateStatusCheckAdmin}
                    >
                        Xác Nhận Thông Tin
                    </Button>
                </div>
            ) : (
                <div className="flex flex-row justify-center py-2">
                    <Typography className="font-medium text-red-700">
                        (*_*)Vui Lòng Kiểm Tra Thông Tin Lại Trước Khi Xác
                        Nhận!!
                    </Typography>
                    <Button
                        size="sm"
                        className="px-3 py-2 mx-4 shadow-none"
                        variant="outlined"
                        onClick={handleUpdateStatusCheckAdmin}
                        disabled={
                            params.row.income_total !== 0 ||
                            params.row.status_work === 6
                                ? ""
                                : "disabled"
                        }
                    >
                        Xác Nhận Thông Tin
                    </Button>
                </div>
            )}
        </Dialog>
    );
}

export default AdminCheckDialog;
