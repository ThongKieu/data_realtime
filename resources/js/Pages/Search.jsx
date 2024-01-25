import React from "react";
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
];
function Search({ auth }) {
    const [email, setEmail] = React.useState("");
    const onChange = ({ target }) => setEmail(target.value);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="chat" />
            <Card className="w-full overflow-scroll">
                <Box sx={{ width: 1 }}>
                    <div className="pt-3 focus:outline-none">
                        <Input
                            type="text"
                            label="Tìm Kiếm"
                            value={email}
                            onChange={onChange}
                            className="pr-20 shadow-none focus:outline-none"
                        />
                    </div>
                    <table className="w-full text-left table-auto min-w-max">
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
                                    const isLast =
                                        index === TABLE_ROWS.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";
                                    if (BH !== " ") {
                                        <Button
                                            className="p-2 "
                                            color="orange"
                                            variant="outlined"
                                        >
                                            Bảo Hành
                                        </Button>;
                                    }

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
            </Card>
        </AuthenticatedLayout>
    );
}

export default Search;
