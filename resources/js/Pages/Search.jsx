import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { Box } from "@mui/material";
const TABLE_HEAD = [
    "Mã CV",
    "Nội dung",
    "Thời gian",
    "Bảo hành",
    "Tên khách",
    "Địa chỉ",
    "Số điện thoại",
    "Ghi chú",
    "Thợ làm",
    "Tổng chi",
    "Tổng thu",
    "Số phiếu thu",
    "BH",
];

const TABLE_ROWS = [
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG1",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: " ",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG1",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: " ",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: "3 t",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
    {
        idCV: "QTG1",
        NoiDungCV: "Thay cánh quạt 1580k",
        TG: "2023-08-21",
        BH: " ",
        TenKH: "Manager",
        DiaChi: "D20/532P, Nguyễn Văn Linh, ",
        sdt: "908723426",
        ghiChu: "chua tt",
        ThoLam: "John Michael",
        TongChi: "555.000 đ",
        TongThu: "1.580.000 đ",
        soPhieuThu: "1111",
    },
];
function Search({ auth }) {
    // const onChange = ({ target }) => setEmail(target.value);
    const [dataReturn, setDataReturn] = useState("");
    const [keySearch, setKey] = useState("");
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    const fetchSearch = async () => {
        try {
            let data = {
                keySearch: keySearch,
            };
            const response = await fetch("api/web/search", {
                method: "POST",
                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
            });
            // console.log("XIN CHAO DATA ACTIVE:",response.ok);
            if (response.ok) {
                const responseData = await response.json(); // Convert response to JSON
                setDataReturn(responseData);
                console.log("Response Data:", responseData);
            } else {
                console.error("Error:", response.status, response.statusText);
            }
        } catch (error) {
            console.log("hihi", error);
        }
    };
    console.log("Xin Chao", dataReturn);
    const handleChange = (e) => {
        setKey(e.target.value);
    };
    console.log(keySearch);
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight - 100,
            });
        };
        window.addEventListener("resize", handleResize);
        fetchSearch();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tìm Kiếm Khách Hàng" />
            <div className="p-2">
                <Input
                    type="text"
                    label="Tìm Kiếm"
                    name="search"
                    value={keySearch}
                    onChange={handleChange}
                    className="rounded-none shadow-none focus:outline-none"
                />
            </div>
            <Box
                sx={{
                    height: `${screenSize.height}px`,
                    width: "100%",
                }}
                className="p-2 pr-0 overflow-scroll "
            >
                <table
                    className={`w-full p-2 text-left border border-green-500 table-auto min-w-max`}
                    style={{ height: `${screenSize.height - 50}px` }}
                >
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
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
                        {TABLE_ROWS.map(
                            (
                                {
                                    idCV,
                                    NoiDungCV,
                                    TG,
                                    BH,
                                    TenKH,
                                    DiaChi,
                                    sdt,
                                    ghiChu,
                                    ThoLam,
                                    TongChi,
                                    TongThu,
                                    BHhanh,
                                    soPhieuThu,
                                },
                                index
                            ) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {idCV}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {NoiDungCV}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {TG}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {BH}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {TenKH}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {DiaChi}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {sdt}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {ghiChu}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {ThoLam}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {TongChi}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {TongThu}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {soPhieuThu}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Button
                                                className={`${
                                                    BH !== " "
                                                        ? "block"
                                                        : "hidden"
                                                }`}
                                                color="orange"
                                                variant="outlined"
                                            >
                                                Bảo Hành
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </Box>
        </AuthenticatedLayout>
    );
}

export default Search;
