import React, { useState, useEffect, useRef } from "react";
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
import {
    XMarkIcon,
    ClockIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Select from "react-select";
import FileInput from "./FileInputImage";
import { ARRAY_ACTION } from "@/Data/Table/Data";
import { useWindowSize } from "@/Core/Resize";
import HistoryDialog from "./HistoryDialog";
import { handleBaoGiaClick } from "./HandleEvent/Handles";
import { TemplateAC1, TemplateAC2 } from "./Template/TemplateViewQuote";
const formatNumberToVNDk = (number) => {
    const k = 1000;
    const vndSuffix = "k";

    // Kiểm tra nếu ba chữ số cuối cùng của số là "000"
    if (number % k === 0) {
        return number / k + vndSuffix;
    }

    // Định dạng theo kiểu tiền tệ Việt Nam nếu không phải
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0, // Không hiển thị chữ số thập phân
    }).format(number);
};
const formatCurrencyVND = (number) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0, // Không hiển thị chữ số thập phân
    });

    return formatter.format(number);
};
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
                        required
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
const KhaoSatDialogWeb = ({
    openKSWeb,
    handleOpenKSWeb,
    handleSentKSWeb,
    cardExpiresWeb,
    auth,
}) => {
    const data_unit = [
        { id_unit: "Bộ", unit_quote: "Bộ" },
        { id_unit: "Cái", unit_quote: "Cái" },
        { id_unit: "Cặp", unit_quote: "Cặp" },
        { id_unit: "M2", unit_quote: "M2" },
        { id_unit: "M", unit_quote: "Mét" },
        { id_unit: "Kg", unit_quote: "Kg" },
        { id_unit: "Gói", unit_quote: "Gói" },
        { id_unit: "Lượt", unit_quote: "Lượt" },
        { id_unit: "Điểm", unit_quote: "Điểm" },
        { id_unit: "Mối", unit_quote: "Mối" },
    ];

    const inputRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [changeQuote, setChangeQuote] = useState({
        ...cardExpiresWeb,
        email_cus: "abnbbb",
    });
    const [authQuote, setAuthQuote] = useState(auth);
    const { width, height } = useWindowSize(380);
    const [counter, setCounter] = useState(1);
    const [rows, setRows] = useState([createEmptyRow(1)]);
    const [noteContent, setNoteContent] = useState([]);
    const [newNoteValue, setNewNoteValue] = useState("");
    const [autoIncrementId, setAutoIncrementId] = useState(1);
    const [isVatChecked, setIsVatChecked] = useState(false);
    function createEmptyRow(counter) {
        return {
            stt: counter,
            content: "",
            unit: "",
            quantity: 0,
            unitPrice: 0,
            total: 0,
            vat: 0,
        };
    }

    const handleEdit = (field) => {
        setIsEditing(true);
        setEditingField(field);
    };

    const handleBlur = () => {
        setIsEditing(false);
        setEditingField(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChangeQuote((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleVatCheck = () => {
        setIsVatChecked(!isVatChecked);
        if (!isVatChecked) {
            const updatedRows = rows.map((row) => ({ ...row, vat: 0 }));
            const { totalWithoutVAT, totalVat8, totalVat10, totalWithVAT } =
                calculateTotals(updatedRows);
            setRows(updatedRows);
        }
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;

        if (["quantity", "unitPrice", "vat"].includes(name)) {
            const quantity = parseFloat(updatedRows[index].quantity) || 0;
            const unitPrice = parseFloat(updatedRows[index].unitPrice) || 0;
            const vat = isVatChecked
                ? parseFloat(updatedRows[index].vat) || 0
                : 0;
            const total = quantity * unitPrice * (1 + vat / 100);
            updatedRows[index].total = total;
        }

        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows((prevRows) => [...prevRows, createEmptyRow(counter + 1)]);
        setCounter((prevCounter) => prevCounter + 1);
    };

    const handleAddNote = () => {
        if (newNoteValue.trim() !== "") {
            setNoteContent([
                ...noteContent,
                { id: autoIncrementId, note_content: newNoteValue },
            ]);
            setAutoIncrementId(autoIncrementId + 1);
            setNewNoteValue("");
        }
    };

    const calculateTotals = (rows) => {
        let totalWithoutVAT = 0;
        let totalVat8 = 0;
        let totalVat10 = 0;
        let totalWithVAT = 0;

        rows.forEach((row) => {
            const quantity = parseFloat(row.quantity) || 0;
            const unitPrice = parseFloat(row.unitPrice) || 0;
            const vat = parseFloat(row.vat) || 0;
            const total = quantity * unitPrice;

            totalWithoutVAT += total;

            if (vat === 8) {
                totalVat8 += total * (vat / 100);
            } else if (vat === 10) {
                totalVat10 += total * (vat / 100);
            }

            totalWithVAT += row.total;
        });

        return {
            totalWithoutVAT,
            totalVat8,
            totalVat10,
            totalWithVAT,
        };
    };

    const { totalWithoutVAT, totalVat8, totalVat10, totalWithVAT } =
        calculateTotals(rows);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("auth_id", authQuote.user.id);
        formData.append("id_work_has", changeQuote.id_cus);
        formData.append(
            "quote_user_info",
            JSON.stringify([
                {
                    name: authQuote.user.name,
                    email: "lienhe@thoviet.com.vn",
                    position: authQuote.user.position,
                    phone: `1800 8122 - ${authQuote.user.phone}`,
                },
            ])
        );

        formData.append(
            "quote_cus_info",
            JSON.stringify([
                {
                    name: changeQuote.name_cus,
                    email_cus: changeQuote.email_cus,
                    address: `${changeQuote.street}, ${changeQuote.district}`,
                    phone: changeQuote.phone_number,
                },
            ])
        );

        formData.append(
            "quote_info",
            JSON.stringify(
                rows.map((row) => ({
                    content: row.content,
                    unit: row.unit,
                    quantity: row.quantity,
                    price: row.unitPrice,
                    total: row.total,
                    vat: row.vat,
                }))
            )
        );

        formData.append("vat", isVatChecked ? 1 : 0);
        formData.append("quote_total_price", totalWithVAT);
        formData.append("quote_note", JSON.stringify(noteContent));

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };

        try {
            const response = await fetch(
                "api/web/quotation/insert-admin",
                requestOptions
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.text();
            console.log(result);
            handleSentKSWeb(); // call this function to handle after successful submission
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        setChangeQuote(cardExpiresWeb);
        setAuthQuote(auth);
    }, [cardExpiresWeb, auth]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    return (
        <Dialog open={openKSWeb} handler={handleOpenKSWeb} size="xxl">
            <div className="flex items-center justify-between h-8 p-0 text-white bg-blue-gray-500">
                <DialogHeader>Lịch Khảo Sát</DialogHeader>
                <XMarkIcon
                    className="w-5 h-5 mr-3 cursor-pointer"
                    onClick={handleOpenKSWeb}
                />
            </div>
            <DialogBody divider>
                <div className="p-1">
                    <div className="p-4 mx-10 border border-black">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold ">Báo Giá</h2>
                            <i className="flex flex-row justify-center">
                                (V/v:{" "}
                                {isEditing && editingField === "vv" ? (
                                    <input
                                        ref={inputRef}
                                        id="vv"
                                        value={changeQuote.vv || ""}
                                        name="vv"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="text-center bg-white border-none rounded-none outline-none w-[100px]"
                                    />
                                ) : (
                                    <p
                                        onClick={() => handleEdit("vv")}
                                        className="text-center"
                                    >
                                        Vận chuyển
                                    </p>
                                )}
                                )
                            </i>
                        </div>
                        <div
                            id="info_customer"
                            className="flex flex-row justify-center gap-4 p-1"
                        >
                            <div className="p-2 border border-black rounded-md">
                                <div>
                                    <span className="pr-1 ">
                                        Tên Khách hàng:
                                    </span>
                                    {isEditing &&
                                    editingField === "name_cus" ? (
                                        <input
                                            ref={inputRef}
                                            id="name_cus"
                                            name="name_cus"
                                            value={changeQuote.name_cus || ""}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="text-center bg-white border-none rounded-none outline-none w-[100px]"
                                        />
                                    ) : (
                                        <span
                                            className="font-bold text-black"
                                            onClick={() =>
                                                handleEdit("name_cus")
                                            }
                                        >
                                            {changeQuote.name_cus}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-row">
                                    <span className="pr-1 ">Địa Chỉ:</span>
                                    {isEditing && editingField === "street" ? (
                                        <input
                                            ref={inputRef}
                                            id="street"
                                            name="street"
                                            value={changeQuote.street || ""}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="text-center bg-white border-none rounded-none outline-none w-[100px]"
                                        />
                                    ) : (
                                        <span
                                            className="font-bold text-black"
                                            onClick={() => handleEdit("street")}
                                        >
                                            {changeQuote.street}
                                        </span>
                                    )}
                                    <span className="pr-1 "> - </span>
                                    {isEditing &&
                                    editingField === "district" ? (
                                        <input
                                            ref={inputRef}
                                            id="district"
                                            name="district"
                                            value={changeQuote.district || ""}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="text-center bg-white border-none rounded-none outline-none w-[100px]"
                                        />
                                    ) : (
                                        <span
                                            className="font-bold text-black"
                                            onClick={() =>
                                                handleEdit("district")
                                            }
                                        >
                                            {changeQuote.district}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span className="pr-1 ">
                                        Số Điện Thoại:
                                    </span>
                                    {isEditing &&
                                    editingField === "phone_number" ? (
                                        <input
                                            ref={inputRef}
                                            id="phone_number"
                                            name="phone_number"
                                            value={
                                                changeQuote.phone_number || ""
                                            }
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="text-center bg-white border-none rounded-none outline-none w-[100px]"
                                        />
                                    ) : (
                                        <span
                                            className="font-bold text-black"
                                            onClick={() =>
                                                handleEdit("phone_number")
                                            }
                                        >
                                            {changeQuote.phone_number}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span className="pr-1 ">Email:</span>
                                    {isEditing &&
                                    editingField === "email_cus" ? (
                                        <input
                                            ref={inputRef}
                                            id="email_cus"
                                            name="email_cus"
                                            value={
                                                changeQuote.email_cus || "sdsf"
                                            }
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="text-center bg-white border-none rounded-none outline-none w-[100px]"
                                        />
                                    ) : (
                                        <span
                                            className="font-bold text-black"
                                            onClick={() =>
                                                handleEdit("email_cus")
                                            }
                                        >
                                            {changeQuote.email_cus}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-2 border border-black rounded-md">
                                <div>
                                    <span className="pr-1 ">
                                        Tên Nhân Viên:
                                    </span>
                                    <span
                                        id="name_Employ"
                                        className="font-bold text-black"
                                    >
                                        {authQuote.user.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="pr-1 ">Chức Vụ:</span>
                                    <span
                                        id="position_Employ"
                                        className="font-bold text-black"
                                    >
                                        {authQuote.user.position}
                                    </span>
                                </div>
                                <div>
                                    <span className="pr-1 ">Email:</span>
                                    <span
                                        id="email_Employ"
                                        className="font-bold text-black"
                                    >
                                        lienhe@thoviet.com.vn
                                    </span>
                                </div>
                                <div>
                                    <span className="pr-1 ">
                                        Số Điện Thoại:
                                    </span>
                                    <span
                                        id="phone_Employ"
                                        className="font-bold text-black"
                                    >
                                        1800 8122 - {authQuote.user.phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`container  p-1 mx-auto overflow-scroll`}
                            style={{ height: `${height}px` }}
                        >
                            <table className="w-full border border-collapse border-gray-400 shadow-lg table-fixed">
                                <thead>
                                    <tr>
                                        <th className="w-10 px-1 py-2 text-gray-800 border border-gray-300">
                                            STT
                                        </th>
                                        <th className="px-1 py-2 text-gray-800 border border-gray-300 w-fit">
                                            Nội dung
                                        </th>
                                        <th className="w-32 px-4 py-2 text-gray-800 border border-gray-300">
                                            Đơn vị tính
                                        </th>
                                        <th className="w-20 px-1 py-2 text-gray-800 border border-gray-300">
                                            Số lượng
                                        </th>
                                        <th className="w-32 px-4 py-2 text-gray-800 border border-gray-300">
                                            Đơn giá
                                        </th>
                                        <th className="w-32 px-1 py-2 text-gray-800 border border-gray-300">
                                            Thành tiền
                                        </th>
                                        <th className="w-24 px-1 py-2 text-gray-800 border border-gray-300">
                                            VAT (%){" "}
                                            <input
                                                type="checkbox"
                                                checked={isVatChecked}
                                                onChange={handleVatCheck}
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="p-1 text-center border border-gray-300 fit-content">
                                                {row.stt}
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <textarea
                                                    name="content"
                                                    value={row.content}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="w-fit"
                                                    style={{ width: "100%" }}
                                                />
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <select
                                                    name="unit"
                                                    value={row.unit}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="w-fit"
                                                    style={{ width: "100%" }}
                                                >
                                                    {data_unit.map(
                                                        (result, index) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        result.id_unit
                                                                    }
                                                                    key={index}
                                                                >
                                                                    {
                                                                        result.unit_quote
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <input
                                                    name="quantity"
                                                    type="number"
                                                    value={row.quantity}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="w-fit"
                                                    style={{ width: "100%" }}
                                                />
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <input
                                                    name="unitPrice"
                                                    type="number"
                                                    value={row.unitPrice}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="w-fit"
                                                    style={{ width: "100%" }}
                                                />
                                            </td>
                                            <td className="p-1 text-right border border-gray-300">
                                                {formatCurrencyVND(row.total)}
                                            </td>
                                            <td
                                                className={`p-1 border border-gray-300 `}
                                            >
                                                <select
                                                    name="vat"
                                                    value={row.vat}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="w-fit"
                                                    style={{ width: "100%" }}
                                                    disabled={!isVatChecked}
                                                >
                                                    <option value={0}>
                                                        chưa VAT
                                                    </option>
                                                    <option value={8}>
                                                        8%
                                                    </option>
                                                    <option value={10}>
                                                        10%
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="font-bold text-center text-black ">
                                        <td className="relative border border-gray-300 ">
                                            <PlusCircleIcon
                                                className="absolute w-6 h-6 cursor-pointer right-[18px] bottom-[15px] text-blue-gray-700 z-auto"
                                                onClick={handleAddRow}
                                            />
                                        </td>

                                        <td className="border border-gray-300 "></td>
                                        <td
                                            colSpan={3}
                                            className="border border-gray-300 "
                                        >
                                            Cộng
                                        </td>
                                        <td className="border border-gray-300 ">
                                            {formatCurrencyVND(totalWithoutVAT)}
                                        </td>
                                        <td className="border border-gray-300 "></td>
                                    </tr>
                                    {isVatChecked == false ? (
                                        ""
                                    ) : (
                                        <>
                                            <tr
                                                className={`font-bold text-center text-black ${
                                                    totalVat8 == 0
                                                        ? "hidden"
                                                        : ""
                                                }`}
                                            >
                                                <td className="border border-gray-300 "></td>
                                                <td className="border border-gray-300 "></td>
                                                <td
                                                    colSpan={3}
                                                    className="border border-gray-300 "
                                                >
                                                    VAT 8%
                                                </td>
                                                <td className="border border-gray-300 ">
                                                    {formatCurrencyVND(
                                                        totalVat8
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 "></td>
                                            </tr>
                                            <tr
                                                className={`font-bold text-center text-black ${
                                                    totalVat10 == 0
                                                        ? "hidden"
                                                        : ""
                                                }`}
                                            >
                                                <td className="border border-gray-300 "></td>
                                                <td className="border border-gray-300 "></td>

                                                <td
                                                    colSpan={3}
                                                    className="border border-gray-300 "
                                                >
                                                    VAT 10%
                                                </td>
                                                <td className="border border-gray-300 ">
                                                    {formatCurrencyVND(
                                                        totalVat10
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 "></td>
                                            </tr>
                                            <tr className="font-bold text-center text-black">
                                                <td className="border border-gray-300 "></td>
                                                <td className="border border-gray-300 "></td>
                                                <td
                                                    colSpan={3}
                                                    className="border border-gray-300 "
                                                >
                                                    Tổng Cộng
                                                </td>
                                                <td className="border border-gray-300 ">
                                                    {formatCurrencyVND(
                                                        totalWithVAT
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 "></td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                            <div id="note_Quote" className="mt-4">
                                <h2>*Ghi Chú</h2>
                                {noteContent.map((note, index) => (
                                    <p key={index}>
                                        <strong>{note.id}:</strong>{" "}
                                        {note.note_content}
                                    </p>
                                ))}
                                <input
                                    type="text"
                                    value={newNoteValue}
                                    onChange={(e) =>
                                        setNewNoteValue(e.target.value)
                                    }
                                    placeholder="Nhập ghi chú mới..."
                                />
                                <button onClick={handleAddNote}>
                                    Thêm Ghi Chú
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="gradient" color="red" onClick={handleSubmit}>
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

const KSDialog = ({
    openViewKS,
    handleOpenViewKS,
    params,
    handleViewKS,
    dataViewQuote,
}) => {
    const processedDataKS = processSeriImages(params.bill_imag);
    return (
        <Dialog open={openViewKS} handler={handleOpenViewKS} size="xl">
            <div className="flex items-center justify-between">
                <DialogHeader>Tình Trạng Khảo Sát</DialogHeader>
            </div>
            <DialogBody divider>
                {dataViewQuote && dataViewQuote.ac == 1 ? (
                    <TemplateAC1
                        key={1}
                        params={params}
                        processedDataKS={processedDataKS}
                        handleBaoGiaClick={handleBaoGiaClick}
                    />
                ) : dataViewQuote && dataViewQuote.ac == 2 ? (
                    <TemplateAC2
                        key={2}
                        params={params}
                        dataQuote={dataViewQuote?.data}
                        handleBaoGiaClick={handleBaoGiaClick}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </DialogBody>
            <DialogFooter className="space-x-2">
                {dataViewQuote && dataViewQuote.ac == 1 ? (
                     <Button
                     variant="outlined"
                     className="px-5 py-2"
                     color="blue"
                     onClick={() =>
                         handleBaoGiaClick(
                             { ...params, Email:''},
                             "/export-quote"
                         )
                     }
                 >
                     Chỉnh sửa báo giá 1
                 </Button>
                ) : dataViewQuote && dataViewQuote.ac == 2 ? (
                    <Button
                    variant="outlined"
                    className="px-5 py-2"
                    color="blue"
                    onClick={() =>
                        handleBaoGiaClick(
                            { ...params, dataQuote: dataViewQuote?.data },
                            "/export-quote"
                        )
                    }
                >
                    Chỉnh sửa báo giá 2
                </Button>
                ) : (
                    <p>Loading...</p>
                )}
                <Button
                    variant="outlined"
                    className="px-5 py-2"
                    color="red"
                    onClick={handleViewKS}
                >
                    Xác nhận
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

const HisDialog = ({
    openViewHis,
    handleOpenViewHis,
    params,
    handleViewHis,
    auth_user,
    workerInfo,
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [scale, setScale] = useState(1);
    const handleZoomIn = () => {
        setScale((prevScale) => prevScale + 0.1);
    };
    const handleZoomOut = () => {
        setScale((prevScale) =>
            prevScale > 0.1 ? prevScale - 0.1 : prevScale
        );
    };

    const handleWheel = (event) => {
        event.preventDefault();
        if (event.deltaY < 0) {
            setScale((prevScale) => prevScale + 0.1);
        } else {
            setScale((prevScale) =>
                prevScale > 0.1 ? prevScale - 0.1 : prevScale
            );
        }
    };

    const handleClose = () => {
        setSelectedImage(null);
        setScale(1);
    };
    const processedDataKS = processSeriImages(params.bill_imag);
    useEffect(() => {
        if (selectedImage) {
            window.addEventListener("wheel", handleWheel);
        }
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [selectedImage]);
    const jsonParse = JSON?.parse(params.his_work);
    const classTableHistory =
        "px-6 py-3 leading-4 tracking-wider text-left text-blue-500 border border-gray-500";
    const handleButtonClick = (lat, log) => {
        const newWindow = window.open("", "_blank", "width=1200,height=600");
        // Mở trang Map với các tham số
        newWindow.location.href = `https://www.google.com/maps/place/${lat},${log}`;

        // newWindow.location.href = `https://www.google.com/maps/place/10.821203,106.7116815`;
    };
    return (
        <Dialog open={openViewHis} handler={handleOpenViewHis}>
            <div className="flex items-center justify-between">
                <DialogHeader> Thông tin lịch xử</DialogHeader>
            </div>
            <DialogBody>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className={classTableHistory}>Người Xử Lý</th>
                            <th className={classTableHistory}>Action</th>
                            <th className={classTableHistory}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonParse?.map((itemJson, index) => {
                            const correspondingAuth = auth_user?.find(
                                (auth_user) => auth_user.id === itemJson.id_auth
                            );

                            const correspondingWorker = workerInfo?.find(
                                (workerInfo) =>
                                    workerInfo.value === itemJson.id_worker
                                        ? workerInfo.label
                                        : "không có"
                            );
                            const workerFullName = correspondingAuth
                                ? correspondingAuth.name
                                : `${correspondingWorker}`;

                            // console.log(correspondingAuth.name);
                            const checkAc = ARRAY_ACTION?.find((item) => {
                                return item.id === itemJson.action
                                    ? item.value
                                    : "";
                            });
                            return (
                                <tr key={index}>
                                    <td className="px-6 py-4 border border-b border-gray-500">
                                        {workerFullName}
                                    </td>
                                    <td className="px-6 py-4 border border-b border-gray-500">
                                        {checkAc ? checkAc.value : ""}
                                    </td>
                                    <td className="px-6 py-4 border border-b border-gray-500">
                                        {itemJson.time}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button
                    variant="outlined"
                    className="px-5 py-2"
                    color="red"
                    onClick={handleViewHis}
                >
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
    userAuth,
    infoWorker,
}) => {
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
            TextContent: `${
                params.warranties == "KBH" ? params.warranties : ""
            }`,
        },
    ];
    const LoiNhuan = params.income_total - params.spending_total;
    const processedDataVT = processSeriImages(params.bill_imag);
    const processedDataPT = processSeriImages(params.seri_imag);
    const TABLE_HEAD = ["STT", "Thời Gian", "Nội Dung"];

    const { width, height } = useWindowSize(300);
    return (
        <Dialog
            open={openViewTotal}
            handler={handleOpenViewTotal}
            className="bg-none"
        >
            <DialogHeader className="justify-between ">
                <h3 className="block p-3 font-sans antialiased font-bold leading-normal text-center text-black uppercase border-b r">
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
                <HistoryDialog
                    icon={<ClockIcon className="w-6 h-6" />}
                    dataFormParent={params}
                    userAuth={userAuth}
                    infoWorker={infoWorker}
                />
            </DialogHeader>
            <DialogBody
                className={`overflow-y-auto h-full`}
                style={{ height: `${height}px` }}
            >
                <div className="relative flex flex-col w-full p-8 text-black shadow-md bg-clip-border rounded-xl bg-gradient-to-tr from-black-900 to-white-800 shadow-black-900/20 ">
                    <div className="relative pb-8 m-0 mb-8 overflow-hidden text-center bg-transparent border-b rounded-none shadow-none text-black-700 bg-clip-border border-black/10">
                        <div className="flex justify-between gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-black">
                            <div className="flex flex-col text-center">
                                <span className="pr-1 mt-2 text-2xl underline">
                                    Chi
                                </span>
                                <span className="text-2xl ">
                                    {formatCurrencyVND(params.spending_total)}
                                </span>
                            </div>
                            <div className="flex flex-col text-center ">
                                <span className="pr-1 mt-2 text-2xl underline">
                                    Thu
                                </span>
                                <span className="text-2xl">
                                    {formatCurrencyVND(params.income_total)}
                                </span>
                            </div>
                            <div className="flex flex-col text-center ">
                                <span className="pr-1 mt-2 text-2xl underline">
                                    Lợi Nhuận
                                </span>
                                <span className="text-2xl">
                                    {formatCurrencyVND(LoiNhuan)}
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
                                            processedDataVT.map(
                                                (item, index) => (
                                                    <img
                                                        key={index}
                                                        src={item}
                                                        alt=""
                                                        className="w-32 h-32"
                                                    />
                                                )
                                            )}
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
                                            processedDataPT.map(
                                                (item, index) => (
                                                    <img
                                                        key={index}
                                                        src={item}
                                                        alt=""
                                                        className="w-32 h-32"
                                                    />
                                                )
                                            )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div
                            className={`${
                                params.warranty == "KBH" ? "hidden" : "block"
                            } pt-3`}
                        >
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
                                        {Array.isArray(params.warranties) &&
                                            params.warranties?.map(
                                                (item, index) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className="even:bg-blue-gray-50"
                                                        >
                                                            <>
                                                                <td className="p-4">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {params.warranties !==
                                                                        undefined
                                                                            ? index +
                                                                              1
                                                                            : "KBH"}
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
                                                                </td>
                                                            </>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    </div>
                </div>
            </DialogBody>
            <div className="p-0 mt-12">
                <Button
                    className="w-full "
                    color="green"
                    variant="outlined"
                    onClick={handleOpenViewTotal}
                >
                    Xem xong
                </Button>
            </div>
        </Dialog>
    );
};
export {
    ThoDialog,
    ReasonDialog,
    ThuHoiDialog,
    HuyDialog,
    BHDialog,
    ViewTotalDialog,
    processSeriImages,
    KSDialog,
    KhaoSatDialogWeb,
    HisDialog,
    formatNumberToVNDk,
    formatCurrencyVND,
};
