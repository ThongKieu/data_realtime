import React, { useEffect, useState, useRef } from "react";
import { Tooltip } from "@material-tailwind/react";
import {
    PlusCircleIcon,
    PencilSquareIcon,
    TrashIcon,
    XCircleIcon,
    ArrowPathIcon,
    PrinterIcon,
    MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { useWindowSize } from "@/Core/Resize";
import { formatCurrencyVND } from "@/Components/ColumnRightDialog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
const Export_Quote = ({ auth }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dataLocation, setDataLocation] = useState([]);
    const [dataQuote, setDataQuote] = useState([]);
    const data_unit = [
        { id_unit: "Bộ", unit_quote: "Bộ" },
        { id_unit: "Cái", unit_quote: "Cái" },
        { id_unit: "Cặp", unit_quote: "Cặp" },
        { id_unit: "m2", unit_quote: "m2" },
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
        ...dataLocation,
        quote_work_content: "",
        name_cus: "",
        street: "",
        district: "",
        email: "",
        phone_number: "",
    });
    const [rows, setRows] = useState([]);
    const [authQuote, setAuthQuote] = useState(auth);
    const { width, height } = useWindowSize(325);
    const [counter, setCounter] = useState(1);
    const [totals, setTotals] = useState({
        totalWithoutVAT: 0,
        totalVat8: 0,
        totalVat10: 0,
        totalWithVAT: 0,
    });
    const [noteContent, setNoteContent] = useState([]);
    const [newNoteValue, setNewNoteValue] = useState("");
    const [editNoteValue, setEditNoteValue] = useState("");
    const [autoIncrementId, setAutoIncrementId] = useState(1);
    const [isVatChecked, setIsVatChecked] = useState(false);
    const getDataQuotation = async (id) => {
        const response = await fetch(
            `api/web/quotation/insert?id_work_has=${id}`
        );
        if (response.ok) {
            const result = await response.json();
            setDataQuote(result);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    };

    const createEmptyRow = (counter) => {
        return {
            stt: counter,
            content: "",
            unit: "",
            quality: 0,
            unitPrice: 0,
            total: 0,
            vat: 0,
            note: "",
        };
    };
    const calculateTotals = (rows) => {
        let totalWithoutVAT = 0;
        let totalVat8 = 0;
        let totalVat10 = 0;
        let totalWithVAT = 0;

        rows.forEach((row) => {
            const quality = parseFloat(row.quality) || 0;
            const unitPrice = parseFloat(row.unitPrice) || 0;
            const vat = parseFloat(row.vat) || 0;
            const total = quality * unitPrice; // Total without VAT

            totalWithoutVAT += total;

            if (vat === 8) {
                totalVat8 += total * (vat / 100);
            } else if (vat === 10) {
                totalVat10 += total * (vat / 100);
            }

            // Calculate total with VAT included
            const totalWithCurrentVAT = total * (1 + vat / 100);
            totalWithVAT += totalWithCurrentVAT;
        });

        return {
            totalWithoutVAT,
            totalVat8,
            totalVat10,
            totalWithVAT,
        };
    };

    const handleEdit = (field) => {
        setIsEditing(true);
        setEditingField(field);
    };

    const handleBlur = () => {
        setIsEditing(false);
        setEditingField("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChangeQuote((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setIsVatChecked(!isVatChecked);
    };
    const deleteRowById = (idToDelete) => {
        setRows((prevRows) => {
            const updatedRows = prevRows.filter(
                (row) => row.stt !== idToDelete
            );
            // Cập nhật lại stt cho các dòng còn lại
            return updatedRows.map((row, index) => ({
                ...row,
                stt: index + 1,
            }));
        });
    };
    const handleAddRow = () => {
        setRows((prevRows) => [...prevRows, createEmptyRow(counter + 1)]);
        setCounter((prevCounter) => prevCounter + 1);
    };
    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;

        if (["quality", "unitPrice", "vat"].includes(name)) {
            const quality = parseFloat(updatedRows[index].quality) || 0;
            const unitPrice = parseFloat(updatedRows[index].unitPrice) || 0;
            const vat = isVatChecked
                ? parseFloat(updatedRows[index].vat) || 0
                : 0;
            const total = quality * unitPrice * (1 + vat / 100);
            updatedRows[index].total = total;
        }
        setRows(updatedRows); // Update the rows state
        setTotals(calculateTotals(updatedRows)); // Recalculate totals
    };

    const handleDeleteRow = (idDel) => {
        deleteRowById(idDel);
    };
    const handleAddNote = () => {
        if (newNoteValue.trim() !== "") {
            setNoteContent((prevNotes) => [
                ...prevNotes,
                { id: autoIncrementId, note_content: newNoteValue },
            ]);
            setAutoIncrementId((prevId) => prevId + 1);
            setNewNoteValue("");
        }
    };
    const handleDeleteNote = (id) => {
        setNoteContent((prevNotes) =>
            prevNotes.filter((note) => note.id !== id)
        );
    };

    const handleEditNote = (id) => {
        const noteToEdit = noteContent.find((note) => note.id === id);
        setEditNoteValue(noteToEdit.note_content);
        setIsEditing(id);
    };

    const handleUpdateNote = () => {
        setNoteContent((prevNotes) =>
            prevNotes.map((note) =>
                note.id === isEditing
                    ? { ...note, note_content: editNoteValue }
                    : note
            )
        );
        setEditNoteValue("");
        setIsEditing(null);
    };

    const handleCancelEdit = () => {
        setEditNoteValue("");
        setIsEditing(null);
    };
    const handleUpdate = async (quoteID) => {
        setIsSubmitting(true);
        setTimeout(async () => {
            const formData = new FormData();
            formData.append("quote_id", quoteID);
            formData.append("auth_id", authQuote.user.id);
            formData.append(
                "vat",
                dataQuote.ac == 2
                    ? !isVatChecked
                        ? 1
                        : 0
                    : !isVatChecked
                    ? 0
                    : 1
            );
            formData.append("quote_total_price", totals.totalWithVAT);
            formData.append(
                "quote_work_content",
                changeQuote.quote_work_content
            );
            formData.append(
                "id_work_has",
                dataQuote.ac == 2
                    ? changeQuote.dataQuote[0]?.id_work_has
                    : dataLocation.id_cus
            );
            formData.append(
                "quote_user_info",
                JSON.stringify([
                    {
                        name: authQuote.user.name,
                        email: "lienhe@thoviet.com.vn",
                        position: authQuote.user.position,
                        phone: `${authQuote.user.phone}`,
                    },
                ])
            );

            formData.append(
                "quote_cus_info",
                JSON.stringify([
                    {
                        name: changeQuote.name_cus,
                        email: changeQuote.email,
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
                        quality: row.quality,
                        price: row.unitPrice,
                        total: row.total,
                        vat: row.vat,
                        note: row.note,
                    }))
                )
            );
            formData.append("quote_note", JSON.stringify(noteContent));

            const requestOptions = {
                method: "POST",
                body: formData,
                redirect: "follow",
            };

            try {
                const response = await fetch(
                    "api/web/quotation/update_quote",
                    requestOptions
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.text();
                const jsonData = JSON.parse(result);
                if (jsonData.success == true) {
                    setIsSubmitted(true);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsSubmitting(false);
            }
        }, 1500);
    };
    const handleCreate = async () => {
        setIsSubmitting(true);
        setTimeout(async () => {
            const formData = new FormData();
            formData.append("ac", 2);
            formData.append("id_work_has", changeQuote.id);
            formData.append("auth_id", authQuote.user.id);
            formData.append("quote_date", changeQuote.date_book);
            formData.append(
                "quote_info",
                JSON.stringify(
                    rows.map((row) => ({
                        content: row.content,
                        unit: row.unit,
                        quality: row.quality,
                        price: row.unitPrice,
                        total: row.total,
                        vat: row.vat,
                        note: row.note,
                    }))
                )
            );
            formData.append("quote_total_price", totals.totalWithVAT);
            formData.append(
                "vat",
                dataQuote.ac == 2
                    ? !isVatChecked
                        ? 1
                        : 0
                    : !isVatChecked
                    ? 0
                    : 1
            );
            formData.append(
                "quote_work_content",
                changeQuote.quote_work_content
            );
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
                        email: changeQuote.email,
                        address: `${changeQuote.street}, ${changeQuote.district}`,
                        phone: changeQuote.phone_number,
                    },
                ])
            );
            formData.append("quote_note", JSON.stringify(noteContent));
            const requestOptions = {
                method: "POST",
                body: formData,
                redirect: "follow",
            };

            try {
                const response = await fetch(
                    `api/web/quotation/insert`,
                    requestOptions
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.text();
                window.location.reload();
                const jsonData = JSON.parse(result);
                if (jsonData.success == true) {
                    setIsSubmitted(true);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsSubmitting(false);
            }
        }, 1500);
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const data = JSON.parse(decodeURIComponent(queryParams.get("data")));
        setDataLocation(data);
        // Sử dụng dữ liệu được truyền tới từ trang dashboard
    }, [window.location.search]);
    useEffect(() => {
        getDataQuotation(dataLocation.id);
    }, [dataLocation]);
    useEffect(() => {
        if (dataQuote.ac == 2) {
            const mappedDataQuote =
                dataQuote.data?.map((item) => ({
                    id: item.id,
                    id_auth: item.id_auth || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý  id: item.id,
                    id_work_has: item.id_work_has || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý  id: item.id,
                    quote_cus_info: item ? JSON.parse(item.quote_cus_info) : "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý  id: item.id,
                    quote_info: item ? JSON.parse(item.quote_info) : "",
                    quote_date: item.quote_date || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý  id: item.id,
                    quote_image: item.quote_image || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý  id: item.id,
                    quote_note: JSON.parse(item.quote_note) || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý  id: item.id,
                    quote_status: item.quote_status || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý  id: item.id,
                    quote_total_price: item.quote_total_price || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý
                    quote_user_info: JSON.parse(item.quote_user_info) || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý  id: item.id,
                    vat: item.vat || "", // Ví dụ: Chỉnh sửa thuộc tính tùy ý
                })) || [];
            let parsedCusInfo = null;
            if (
                dataQuote.data &&
                dataQuote.data[0] &&
                dataQuote.data[0].quote_cus_info
            ) {
                try {
                    parsedCusInfo = JSON.parse(
                        dataQuote.data[0].quote_cus_info
                    )[0];
                } catch (error) {
                    console.error("Error parsing quote_cus_info", error);
                }
            }
            console.log(dataQuote.data[0].quote_cus_info);
            setChangeQuote({
                id: dataLocation.id,
                quote_work_content:
                    dataQuote.data &&
                    dataQuote.data[0] &&
                    dataQuote.data[0].quote_work_content != null
                        ? dataQuote.data[0].quote_work_content
                        : "Bảo trì M&E",
                name_cus: parsedCusInfo
                    ? parsedCusInfo.name
                    : dataLocation?.name_cus || "",
                email: parsedCusInfo
                    ? parsedCusInfo.email
                    : dataLocation?.Email || "",
                phone_number: parsedCusInfo
                    ? parsedCusInfo.phone
                    : dataLocation?.phone_number || "",
                street: parsedCusInfo
                    ? parsedCusInfo.address.split(",")[0].trim()
                    : dataLocation?.street || "",
                district: parsedCusInfo
                    ? parsedCusInfo.address.split(",")[1].trim()
                    : dataLocation?.district || "",
                dataQuote: mappedDataQuote,
            });
        } else if (dataQuote.ac == 1) {
            setChangeQuote({
                ...dataLocation,
                quote_work_content: "Bảo trì M&E",
            });
        }
        setAuthQuote(auth);
    }, [auth, dataQuote]);
    console.log(changeQuote);
    useEffect(() => {
        // Tính toán tổng giá trị khi rows thay đổi
        setTotals(calculateTotals(rows));
    }, [rows]);
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    // Sai luồng VAT trong từng dòng báo giá
    useEffect(() => {
        const dataQuoteInfo = changeQuote.dataQuote
            ? changeQuote.dataQuote[0]
            : null;
        if (
            dataQuoteInfo &&
            dataQuoteInfo.quote_info &&
            dataQuoteInfo.quote_info.length
        ) {
            setRows(
                dataQuoteInfo.quote_info.map((item, index) => ({
                    stt: index + 1,
                    content: item.content || "",
                    unit: item.unit || "Bộ",
                    quality: item.quality || 1,
                    unitPrice: item.price || 1,
                    total: item.quality * item.price,
                    vat: item.vat || 0,
                    note: item.note || "",
                }))
            );
            setCounter(dataQuoteInfo.quote_info.length);
            if (
                dataQuoteInfo.quote_note &&
                Array.isArray(dataQuoteInfo.quote_note)
            ) {
                setNoteContent(
                    dataQuoteInfo.quote_note.map((note, index) => ({
                        id: index,
                        note_content: note.note_content,
                    }))
                );
            } else {
                setNoteContent([]);
            }
            setAutoIncrementId(dataQuoteInfo.quote_info.length);
        } else {
            setRows([createEmptyRow(1)]);
            setCounter(0);
            setNoteContent([]);
            setAutoIncrementId(0);
        }
    }, [changeQuote]);
    const [zoomScale, setZoomScale] = useState(1); // State lưu trữ tỷ lệ phóng

    const handleZoomIn = () => {
        setZoomScale((prevScale) => prevScale + 0.1); // Tăng tỷ lệ phóng lên 0.1
    };

    const handleZoomOut = () => {
        setZoomScale((prevScale) => Math.max(prevScale - 0.1, 0.1)); // Giảm tỷ lệ phóng đi 0.1, nhưng không cho phép nhỏ hơn 0.1
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Báo Giá" />
            <div className="lg:w-[60%] md:w-[90%] m-auto p-1">
                <div className="p-4 mx-10 border border-black">
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-red-400">
                            <p>(*) Bấm vào thông tin khách hàng để chỉnh sửa</p>
                            <p> (*) Lưu lại trước khi in báo giá</p>
                            <p>(*) Cập nhật thông tin KH trước khi soạn báo giá</p>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <PlusCircleIcon
                                className="text-gray-500 cursor-pointer w-7 h-7"
                                onClick={handleZoomIn}
                            />
                            <MinusCircleIcon
                                className="text-gray-500 cursor-pointer w-7 h-7"
                                onClick={handleZoomOut}
                            />
                            {isSubmitted && (
                                <Tooltip content="In">
                                    <PrinterIcon
                                        className={`${
                                            isSubmitting
                                                ? "text-red-500"
                                                : "text-green-500"
                                        } w-7 h-7 cursor-pointer`}
                                        onClick={() =>
                                            window.open(
                                                `${host}generate-pdf?id_quote=${changeQuote.dataQuote[0]?.id}`
                                            )
                                        }
                                    />
                                </Tooltip>
                            )}
                            {dataQuote.ac == 1 ? (
                                <Tooltip content="Thêm Báo Giá">
                                    <PlusCircleIcon
                                        className={`${
                                            isSubmitting
                                                ? "animate-spin text-red-500"
                                                : "text-green-500"
                                        } w-7 h-7 cursor-pointer`}
                                        onClick={() => {
                                            handleCreate();
                                        }}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip content="Sửa Báo Giá">
                                    <ArrowPathIcon
                                        className={`${
                                            isSubmitting
                                                ? "animate-spin text-red-500"
                                                : "text-green-500"
                                        } w-7 h-7 cursor-pointer`}
                                        onClick={() => {
                                            handleUpdate(
                                                changeQuote.dataQuote[0]?.id
                                            );
                                        }}
                                    />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold ">Báo Giá</h2>
                        <i className="flex flex-row justify-center">
                            (V/v:
                            {isEditing &&
                            editingField === "quote_work_content" ? (
                                <input
                                    ref={inputRef}
                                    id="quote_work_content"
                                    value={changeQuote.quote_work_content || ""}
                                    name="quote_work_content"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="p-1 text-center bg-white border border-gray-600 rounded-lg outline-none w-fit"
                                />
                            ) : (
                                <p
                                    onClick={() =>
                                        handleEdit("quote_work_content")
                                    }
                                    className="text-center"
                                >
                                    {changeQuote.quote_work_content
                                        ? changeQuote.quote_work_content
                                        : ""}
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
                                        className="p-1 text-center bg-white border border-gray-600 rounded-lg outline-none w-fit"
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
                                        className="p-1 text-center bg-white border border-gray-600 rounded-lg outline-none w-fit"
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
                                        className="p-1 text-center bg-white border border-gray-600 rounded-lg outline-none w-fit"
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
                                        className="p-1 text-center bg-white border border-gray-600 rounded-lg outline-none w-fit"
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
                                {isEditing && editingField === "email" ? (
                                    <input
                                        ref={inputRef}
                                        id="email"
                                        name="email"
                                        value={changeQuote.email || ""}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="p-1 text-center bg-white border border-gray-600 rounded-lg outline-none w-fit"
                                    />
                                ) : (
                                    <span
                                        className="font-bold text-black"
                                        onClick={() => handleEdit("email")}
                                    >
                                        {/* Email KH */}
                                        {changeQuote.email
                                            ? changeQuote.email
                                            : "Email KH"}
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
                        className={`container p-0 mx-auto overflow-scroll overflow-x-hidden`}
                        style={{ height: `${height}px` }}
                    >
                        <div
                            style={{
                                transform: `scale(${zoomScale})`,
                                transformOrigin: "top left",
                            }}
                        >
                            <table className="w-full border border-collapse border-gray-400 shadow-lg table-fixed">
                                <thead>
                                    <tr>
                                        <th className="w-10 px-1 py-2 text-gray-800 border border-gray-300">
                                            STT
                                        </th>
                                        <th className="px-1 py-2 text-gray-800 border border-gray-300 w-[230px]">
                                            Nội dung
                                        </th>
                                        <th className="px-4 py-2 text-gray-800 border border-gray-300 w-[75px]">
                                            Đơn vị tính
                                        </th>
                                        <th className="w-[70px] px-1 py-2 text-gray-800 border border-gray-300">
                                            Số lượng
                                        </th>
                                        <th className="w-[80px] px-4 py-2 text-gray-800 border border-gray-300">
                                            Đơn giá
                                        </th>
                                        <th className="w-[90px] px-1 py-2 text-gray-800 border border-gray-300">
                                            Thành tiền
                                        </th>
                                        <th className="w-[50px] px-1 py-2 text-gray-800 border border-gray-300">
                                            VAT (%){" "}
                                            <input
                                                type="checkbox"
                                                checked={
                                                    changeQuote.dataQuote &&
                                                    changeQuote.dataQuote[0] &&
                                                    changeQuote.dataQuote[0]
                                                        ?.vat == 1
                                                        ? !isVatChecked == true
                                                        : !isVatChecked == false
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange()
                                                }
                                            />
                                        </th>
                                        <th className=" w-[80px] px-1 py-2 text-gray-800 border border-gray-300">
                                            Ghi Chú
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="relative text-center hover:bg-gray-100"
                                            >
                                                <td className="p-1 text-center border border-gray-300 fit-content">
                                                    {row.stt}
                                                    <MinusCircleIcon
                                                        className={`absolute w-6 h-6 cursor-pointer left-[18px] bottom-[-10px] text-blue-gray-700 z-auto  ${
                                                            row.stt <= 1
                                                                ? "hidden"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            handleDeleteRow(
                                                                index
                                                            )
                                                        }
                                                    />
                                                    <PlusCircleIcon
                                                        className={`absolute w-6 h-6 cursor-pointer left-[0px] bottom-[-10px] text-blue-gray-700 z-auto`}
                                                        onClick={handleAddRow}
                                                    />
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
                                                        className="rounded-md"
                                                        style={{
                                                            width: "100%",
                                                        }}
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
                                                        className="w-10 p-1 rounded-md"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        {data_unit.map(
                                                            (result, index) => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            result.id_unit
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
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
                                                        name="quality"
                                                        type="text"
                                                        value={row.quality}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        className="p-1 rounded-md "
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        inputMode="numeric"
                                                    />
                                                </td>
                                                <td className="p-1 border border-gray-300">
                                                    <input
                                                        name="unitPrice"
                                                        type="text"
                                                        value={row.unitPrice}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        className="p-1 rounded-md"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        inputMode="numeric"
                                                    />
                                                </td>
                                                <td className="p-1 text-right border border-gray-300">
                                                    {formatCurrencyVND(
                                                        row.total
                                                    )}
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
                                                        className="p-1 rounded-md w-fit"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        disabled={
                                                            changeQuote.dataQuote &&
                                                            changeQuote
                                                                .dataQuote[0] &&
                                                            changeQuote
                                                                .dataQuote[0]
                                                                ?.vat == 1
                                                                ? isVatChecked
                                                                : !isVatChecked
                                                        }
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
                                                <td className="p-1 border border-gray-300">
                                                    <textarea
                                                        name="note"
                                                        value={row.note}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        className="rounded-md w-fit"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr className="font-bold text-center text-black ">
                                        <td className="border border-gray-300 "></td>

                                        <td className="border border-gray-300 "></td>
                                        <td
                                            colSpan={3}
                                            className="border border-gray-300 "
                                        >
                                            Cộng
                                        </td>
                                        <td className="border border-gray-300 ">
                                            {formatCurrencyVND(
                                                totals.totalWithoutVAT
                                            )}
                                        </td>
                                        <td className="border border-gray-300 "></td>
                                    </tr>
                                    {changeQuote.dataQuote &&
                                    changeQuote.dataQuote[0] &&
                                    changeQuote.dataQuote[0]?.vat == 1 ? (
                                        !isVatChecked && (
                                            <>
                                                <tr
                                                    className={`font-bold text-center text-black ${
                                                        totals.totalVat8 == 0
                                                            ? "hidden"
                                                            : ""
                                                    }`}
                                                >
                                                    <td className="border border-gray-300"></td>
                                                    <td className="border border-gray-300"></td>
                                                    <td
                                                        colSpan={3}
                                                        className="border border-gray-300"
                                                    >
                                                        VAT 8%
                                                    </td>
                                                    <td className="border border-gray-300">
                                                        {formatCurrencyVND(
                                                            totals.totalVat8
                                                        )}
                                                    </td>
                                                    <td className="border border-gray-300"></td>
                                                </tr>
                                                <tr
                                                    className={`font-bold text-center text-black ${
                                                        totals.totalVat10 == 0
                                                            ? "hidden"
                                                            : ""
                                                    }`}
                                                >
                                                    <td className="border border-gray-300"></td>
                                                    <td className="border border-gray-300"></td>
                                                    <td
                                                        colSpan={3}
                                                        className="border border-gray-300"
                                                    >
                                                        VAT 10%
                                                    </td>
                                                    <td className="border border-gray-300">
                                                        {formatCurrencyVND(
                                                            totals.totalVat10
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
                                                            totals.totalWithVAT
                                                        )}
                                                    </td>
                                                    <td className="border border-gray-300 "></td>
                                                </tr>
                                            </>
                                        )
                                    ) : isVatChecked == true ? (
                                        <>
                                            <tr
                                                className={`font-bold text-center text-black ${
                                                    totals.totalVat8 == 0
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
                                                        totals.totalVat8
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 "></td>
                                            </tr>
                                            <tr
                                                className={`font-bold text-center text-black ${
                                                    totals.totalVat10 == 0
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
                                                        totals.totalVat10
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
                                                        totals.totalWithVAT
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 "></td>
                                            </tr>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </tbody>
                            </table>
                            <div id="note_Quote" className="mt-4">
                                <h2>*Ghi Chú</h2>
                                {noteContent.map((note, index) => (
                                    <div key={index}>
                                        {isEditing === note.id ? (
                                            <div className="flex flex-row items-center">
                                                <input
                                                    type="text"
                                                    value={editNoteValue}
                                                    onChange={(e) =>
                                                        setEditNoteValue(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="p-1 pl-2 ml-2 mb-2 w-[80%] bg-white border border-gray-600 rounded-lg outline-none "
                                                />
                                                <div className="flex flex-row">
                                                    <ArrowPathIcon
                                                        onClick={
                                                            handleUpdateNote
                                                        }
                                                        className="w-6 h-6 text-blue-500 cursor-pointer"
                                                    />
                                                    <XCircleIcon
                                                        onClick={
                                                            handleCancelEdit
                                                        }
                                                        className="w-6 h-6 text-red-500 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-row ">
                                                <div>
                                                    <span>
                                                        <strong>
                                                            {note.id}:
                                                        </strong>
                                                    </span>
                                                    <span className="mx-2">
                                                        {note.note_content}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row">
                                                    <PencilSquareIcon
                                                        onClick={() =>
                                                            handleEditNote(
                                                                note.id
                                                            )
                                                        }
                                                        className="w-6 h-6 text-blue-500 cursor-pointer"
                                                    />
                                                    <TrashIcon
                                                        onClick={() =>
                                                            handleDeleteNote(
                                                                note.id
                                                            )
                                                        }
                                                        className="w-6 h-6 text-red-500 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="flex flex-row items-center">
                                    <input
                                        type="text"
                                        value={newNoteValue}
                                        onChange={(e) =>
                                            setNewNoteValue(e.target.value)
                                        }
                                        placeholder="Nhập ghi chú mới..."
                                        className="w-[80%] p-1 pl-2 bg-white border border-gray-600 rounded-lg outline-none"
                                    />
                                    <PlusCircleIcon
                                        onClick={handleAddNote}
                                        className="w-6 h-6 ml-2 text-green-500 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Export_Quote;
