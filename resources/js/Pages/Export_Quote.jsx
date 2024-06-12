import React, { useEffect, useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useWindowSize } from "@/Core/Resize";
import { formatCurrencyVND } from "@/Components/ColumnRightDialog";
const Export_Quote = ({ cardExpiresWeb, auth }) => {
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
        <div className="flex items-center justify-between h-8 p-0 text-white bg-blue-gray-500">
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
                                <span className="pr-1 ">Tên Khách hàng:</span>
                                {isEditing && editingField === "name_cus" ? (
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
                                        onClick={() => handleEdit("name_cus")}
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
                                {isEditing && editingField === "district" ? (
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
                                        onClick={() => handleEdit("district")}
                                    >
                                        {changeQuote.district}
                                    </span>
                                )}
                            </div>
                            <div>
                                <span className="pr-1 ">Số Điện Thoại:</span>
                                {isEditing &&
                                editingField === "phone_number" ? (
                                    <input
                                        ref={inputRef}
                                        id="phone_number"
                                        name="phone_number"
                                        value={changeQuote.phone_number || ""}
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
                                {isEditing && editingField === "email_cus" ? (
                                    <input
                                        ref={inputRef}
                                        id="email_cus"
                                        name="email_cus"
                                        value={changeQuote.email_cus || "sdsf"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="text-center bg-white border-none rounded-none outline-none w-[100px]"
                                    />
                                ) : (
                                    <span
                                        className="font-bold text-black"
                                        onClick={() => handleEdit("email_cus")}
                                    >
                                        {changeQuote.email_cus}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="p-2 border border-black rounded-md">
                            <div>
                                <span className="pr-1 ">Tên Nhân Viên:</span>
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
                                <span className="pr-1 ">Số Điện Thoại:</span>
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
                                                    handleInputChange(index, e)
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
                                                    handleInputChange(index, e)
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
                                                    handleInputChange(index, e)
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
                                                    handleInputChange(index, e)
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
                                                    handleInputChange(index, e)
                                                }
                                                className="w-fit"
                                                style={{ width: "100%" }}
                                                disabled={!isVatChecked}
                                            >
                                                <option value={0}>
                                                    chưa VAT
                                                </option>
                                                <option value={8}>8%</option>
                                                <option value={10}>10%</option>
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
                                                totalVat8 == 0 ? "hidden" : ""
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
                                                {formatCurrencyVND(totalVat8)}
                                            </td>
                                            <td className="border border-gray-300 "></td>
                                        </tr>
                                        <tr
                                            className={`font-bold text-center text-black ${
                                                totalVat10 == 0 ? "hidden" : ""
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
                                                {formatCurrencyVND(totalVat10)}
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

            <Button variant="gradient" color="red" onClick={handleSubmit}>
                Xác nhận
            </Button>
        </div>
    );
};

export default Export_Quote;
