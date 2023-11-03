import { Card, Typography, Avatar } from "@material-tailwind/react";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { host } from "@/utils/UrlApi";
import {
    UsersIcon,
    BellAlertIcon,
    FolderPlusIcon,
} from "@heroicons/react/24/outline";
import CardOrder from "./CardOrder";

const TABLE_HEAD = [
    "ID",
    "Tên nhân viên",
    "Email",
    "Thời gian online",
    "Tình trạng",
];


function Home({ auth }) {
    useEffect(() => {
        fetchData();
    }, []);
    const [getData, usersData] = useState("");
    const fetchData = async () => {
        try {
            const response = await fetch(host + "api/web/users");
            const jsonData = await response.json();
            if (response.ok) {
                usersData(jsonData.users);
                setIsLoading(false);
                console.log(jsonData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [isLoading, setIsLoading] = useState(true);
    const dataCardOrder = [
        {
            id: 0,
            titleTop: "Tổng Lịch",
            titleMid: 158,
            titleBot: 16,
            IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 1,
            titleTop: "Điện Nước",
            titleMid: 130,
            titleBot: 14,
            IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 2,
            titleTop: "Điện Lạnh",
            titleMid: 158,
            titleBot: 5,
            IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 3,
            titleTop: "Đồ Gỗ",
            titleMid: 130,
            titleBot: 3,
            IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 4,
            titleTop: "NLMT",
            titleMid: 130,
            titleBot: 2,
            IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 5,
            titleTop: "Cơ Khí",
            titleMid: 158,
            titleBot: 1,
            IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 6,
            titleTop: "Vận Chuyển",
            titleMid: 130,
            titleBot: 7,
            IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 7,
            titleTop: "Vệ Sinh Bể Nước",
            titleMid: 130,
            titleBot: 4,
            IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
    ];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Trang chủ Admin" />
            <Card className="h-full rounded-none bg-blue-gray-500">
                <Card className="flex flex-row items-center justify-between h-10 m-2 text-center rounded-xl">
                    {/* <div className="h-8 px-0 py-0 w-72 "> */}
                    <Typography className="p-2 font-bold uppercase">
                        Công ty TNHH Dịch vụ kỹ thuật thợ việt
                    </Typography>
                    {/* </div> */}
                    <div className="flex flex-row justify-between">
                        <UsersIcon className="w-6 h-6 m-2" color="black" />
                        <BellAlertIcon className="w-6 h-6 m-2" color="black" />
                        <Avatar
                            src="https://cdn.chanhtuoi.com/uploads/2020/05/icon-facebook-08-2.jpg.webp"
                            alt="avatar"
                            size="xs"
                            className="p-1 m-2 border border-orange-500"
                        />
                    </div>
                </Card>
                <div className="flex flex-row justify-between p-1 m-2 text-center">
                    {dataCardOrder.map((item) => {
                        const classBot = `${
                            item.titleBot >= 15
                                ? "green"
                                : item.titleBot <= 14 && item.titleBot >= 6
                                ? "yellow"
                                : item.titleBot <= 5 && item.titleBot >= 3
                                ? "orange"
                                : item.titleBot < 3
                                ? "red"
                                : ""
                        }`;

                        return (
                            <CardOrder
                                ClassCard={classBot}
                                titleTop={item.titleTop}
                                titleMid={item.titleMid}
                                titleBot={item.titleBot}
                                classSpanIcon={classBot}
                                classIconBot={classBot}
                                classSpanText={classBot}
                                IconChild={item.IconChild}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-row gap-3 p-2">
                    <Card className="w-[35%] rounded-sm">
                        <Typography className="p-2 font-bold text-center text-white bg-blue-gray-300">
                            <p className="font-bold ">
                                {" "}
                                Doanh Thu Qua Các Tháng
                            </p>
                        </Typography>
                        <div className="flex flex-col items-center w-full bg-white rounded-lg shadow-xl h-[30vh] p-2">
                            <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $37,500
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-8 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-6 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-16 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Jan
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $45,000
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-10 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-6 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-20 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Feb
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $47,500
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-10 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-8 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-20 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Mar
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $50,000
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-10 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-6 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-24 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Apr
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $47,500
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-10 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-8 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-20 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        May
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $55,000
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-12 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-8 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-24 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Jun
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $60,000
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-12 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-16 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-20 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Jul
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $57,500
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-12 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-10 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-24 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Aug
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $67,500
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-12 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-10 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-32 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Sep
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $65,000
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-12 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-12 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow bg-indigo-400 h-28" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Oct
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $70,000
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-8 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-8 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-40 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Nov
                                    </span>
                                </div>
                                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                                    <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                                        $75,000
                                    </span>
                                    <div className="flex items-end w-full">
                                        <div className="relative flex justify-center flex-grow h-12 bg-indigo-200" />
                                        <div className="relative flex justify-center flex-grow h-8 bg-indigo-300" />
                                        <div className="relative flex justify-center flex-grow h-40 bg-indigo-400" />
                                    </div>
                                    <span className="absolute bottom-0 text-xs font-bold">
                                        Dec
                                    </span>
                                </div>
                            </div>
                            <div className="flex w-full mt-3">
                                <div className="flex items-center ml-auto">
                                    <span className="block w-4 h-4 bg-indigo-400" />
                                    <span className="ml-1 text-xs font-medium">
                                        Existing
                                    </span>
                                </div>
                                <div className="flex items-center ml-4">
                                    <span className="block w-4 h-4 bg-indigo-300" />
                                    <span className="ml-1 text-xs font-medium">
                                        Upgrades
                                    </span>
                                </div>
                                <div className="flex items-center ml-4">
                                    <span className="block w-4 h-4 bg-indigo-200" />
                                    <span className="ml-1 text-xs font-medium">
                                        New
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-[35%] rounded-sm">
                        <Typography className="p-2 font-bold text-center text-white bg-blue-gray-300">
                            <p className="font-bold ">Doanh Số Của Thợ</p>
                        </Typography>
                        <img
                            src="https://thoviet.vn/wp-content/uploads/2023/11/chartPie.png"
                            className="w-full h-full"
                            alt=""
                            srcset=""
                        />
                    </Card>
                    <Card className="w-[30%] rounded-sm">
                        <Typography className="p-2 font-bold text-center text-white bg-blue-gray-300">
                            <p className="font-bold ">
                                Số Lượng Lịch Nhận Từ Các Nguồn Tiếp Nhận Thông
                                Tin
                            </p>
                        </Typography>
                        <div className="grid items-start justify-between grid-cols-2 p-2">
                            <Card className="flex flex-col m-2 text-center border border-green-500">
                                <Typography className="p-2 font-bold text-center text-white rounded-lg rounded-bl-none rounded-br-none bg-blue-gray-300">
                                    <p className="font-bold ">
                                        Lịch Đến Từ APP
                                    </p>
                                </Typography>
                                <p>150 Lịch</p>
                            </Card>
                            <Card className="m-2 text-center border border-green-500">
                                <Typography className="p-2 font-bold text-center text-white rounded-lg rounded-bl-none rounded-br-none bg-blue-gray-300">
                                    <p className="font-bold ">
                                        Lịch Đến Từ WebSite
                                    </p>
                                </Typography>
                                <p>70 Lịch</p>
                            </Card>
                            <Card className="m-2 text-center border border-green-500">
                                <Typography className="p-2 font-bold text-center text-white rounded-lg rounded-bl-none rounded-br-none bg-blue-gray-300">
                                    <p className="font-bold ">
                                        Lịch Đến Từ Tổng Đài
                                    </p>
                                </Typography>
                                <p>20 Lịch</p>
                            </Card>
                            <Card className="m-2 text-center border border-green-500">
                                <Typography className="p-2 font-bold text-center text-white rounded-lg rounded-bl-none rounded-br-none bg-blue-gray-300">
                                    <p className="font-bold ">
                                        Lịch Đến Thợ Gửi Về
                                    </p>
                                </Typography>
                                <p>10 Lịch</p>
                            </Card>
                        </div>
                    </Card>
                </div>
                <div className="p-2 ">
                    <Typography className="p-2 font-bold text-center text-white bg-blue-gray-300">
                        <p className="font-bold ">
                            Danh Sách Nhân Viên Vượt Doanh Số Cao Trong Tháng
                        </p>
                    </Typography>
                    <Card className="w-full">
                        <table className="w-full text-left table-auto">
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
                                {isLoading ? (
                                    <div className="flex justify-center p-2 align-middle ">
                                        {/* <Spinner className="w-6 h-6" color="amber" /> */}
                                        <p className="pl-2 text-center text-black">
                                            Loading...
                                        </p>
                                    </div>
                                ) : (
                                    getData.map(
                                        (
                                            { id, name, email, time, status },
                                            index
                                        ) => {
                                            const isLast =
                                                index === getData.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={name}>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {id}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {time}
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
                                                            {status}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}
export default Home;
