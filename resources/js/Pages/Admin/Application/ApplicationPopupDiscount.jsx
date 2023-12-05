import { React, useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
} from "@material-tailwind/react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";

const TABLE_HEAD = [
    "STT",
    "Nội Dung",
    "% Khuyến Mãi",
    "Hình Ảnh",
    "Bắt Đầu",
    "Kết Thúc",
    "Sửa",
];

function ApplicationPopupDiscount() {
    const [popupData, setPopupData] = useState([]);

    useEffect(() => {
        fetch(`${host}api/web/popup-discount`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error Status Network");
                }
                return response.json();
            })
            .then((data) => {
                setPopupData(data);
            })
            .catch((error) => {
                console.error("Error API:", error);
            });
    }, []);

    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Tài khoản thợ" />
            <div className={`h-screen gap-2 p-2`}>
                <Card className="w-full h-full">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="rounded-none"
                    >
                        <Typography
                            variant="h4"
                            color="blue-gray"
                            className="flex justify-center"
                        >
                            Danh Sách Popup Chương Trình Khuyến Mãi
                        </Typography>
                    </CardHeader>
                    <CardBody className="px-0 overflow-scroll">
                        <table className="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                {head}{" "}
                                                {/* {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="w-4 h-4" />
                      )} */}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {popupData.map((item, index) => {
                                    const isLast =
                                        index === popupData.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={item.id}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.id}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.content_view_sale}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item.sale_percent}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <img
                                                    src={host + item.image_path}
                                                    alt="Avatar"
                                                    className="w-40 h-15"
                                                />
                                            </td>

                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.time_begin}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
                                                >
                                                    {item.time_end}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value="Sửa Popup"
                                                        color="deep-purple"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            Page 1 of 10
                        </Typography>
                        <div className="flex gap-2">
                            <Button variant="outlined" size="sm">
                                Previous
                            </Button>
                            <Button variant="outlined" size="sm">
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

export default ApplicationPopupDiscount;
