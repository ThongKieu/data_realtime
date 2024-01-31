import React, { createElement, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

import newSocket from "@/Utils/Socket";
import { host } from "@/Utils/UrlApi";
function Notice({ auth }) {
    const [dataNoti, setNoti] = useState({
        new_work_from_app: [],
        new_work_from_worker: [],
        new_feeback: [],
        new_return_work_from_worker: [],
    });
    const [notificationData, setInfoNotification] = useState("");
    const fetchNotiUser = async () => {
        try {
            const response = await fetch("api/web/noti");
            const jsonData = await response.json();
            if (jsonData) {
                setNoti(jsonData);
            }
        } catch (error) {
            console.log("push on Loi", error);
        }
    };
    // const fetchNoti = async () => {
    //     try {
    //         const response = await fetch(
    //             `api/web/noti/soket_noti?code=${auth.user.code}`
    //         );
    //         const jsonData = await response.json();
    //         setInfoNotification(jsonData);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };
    const handleMakeReadAll = async () => {
        let data = { code: auth.user.code };
        console.log(data, "ssss");
        try {
            const response = await fetch(`api/web/noti/markReadAll`, {
                method: "POST",
                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
            });
            if (response.status == 200) {
                newSocket.emit("notication_Server", data);
                console.log(response);
            }
        } catch (error) {
            console.error("Repair:", error);
        }
    };

    useEffect(() => {
        fetchNotiUser();
        // newSocket.on("notication_Client", () => {
        //     // fetchNoti();
        //     fetchNotiUser();
        // });
    }, []);
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    var heightScreenTV = screenSize.height;
    const data = [
        { id: 1, label: "Lịch Từ App Khách" },
        { id: 2, label: "Thông Tin Thợ Báo Lịch" },
        { id: 3, label: "Thợ Xin Lịch" },
        { id: 4, label: "Khách Phàn Nàn" },
    ];
    const classTable = "w-full text-left table-auto rounded-md  ";
    const classHeadTable = "p-1 border-b border-orange-500 bg-blue-gray-50   ";
    const classContentNoti =
        "block font-sans text-md antialiased text-blue-gray-900 opacity-70";
    const classCardNoti = "p-1 rounded-md shadow-green-300";
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Có Lịch Mới" />
            <div
                className={` w-full overflow-scroll mt-1 gap-[2px] pl-2`}
                style={{ height: `${heightScreenTV}px` }}
            >
                <div className="grid w-full grid-cols-4 gap-2 p-2 rounded-sm ">
                    {data.map((item, index) => (
                        <Typography
                            key={index}
                            className="flex flex-row items-center justify-between w-full p-2 text-black border border-orange-500"
                        >
                            <span>{item.label}</span>
                            <button
                                onClick={() => {
                                    handleMakeReadAll();
                                }}
                            >
                                <CheckCircleIcon className="w-6 h-6 text-green-500" />
                            </button>
                        </Typography>
                    ))}
                </div>
                <div className="grid grid-cols-4 gap-3 p-2 ">
                    <Card className={`${classCardNoti}`}>
                        <table className={`${classTable}`}>
                            <thead>
                                <tr>
                                    <th
                                        className={`${classHeadTable} border-r rounded-tl-md`}
                                    >
                                        <p className={`${classContentNoti}`}>
                                            Nội dung
                                        </p>
                                    </th>
                                    <th
                                        className={`${classHeadTable} rounded-tr-md`}
                                    >
                                        <p
                                            className={`${classContentNoti} text-center`}
                                        >
                                            Người Xử lý
                                        </p>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataNoti.new_work_from_app.map(
                                    (item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="p-1 border-b border-r  border-orange-500 w-[150px]">
                                                    <p
                                                        className={`${classContentNoti}`}
                                                    >
                                                        {item.info_notication}
                                                    </p>
                                                </td>
                                                <td className="p-1 border-b border-orange-500 w-[50px]">
                                                    <p
                                                        className={`${classContentNoti}`}
                                                    >
                                                        {item.user_read}
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Card>
                    <Card className={`${classCardNoti}`}>
                        <table className={`${classTable}`}>
                            <thead>
                                <tr>
                                    <th
                                        className={`${classHeadTable} border-r rounded-tl-md`}
                                    >
                                        <p className={`${classContentNoti} `}>
                                            Nội dung
                                        </p>
                                    </th>
                                    <th
                                        className={`${classHeadTable} rounded-tr-md`}
                                    >
                                        <p
                                            className={`${classContentNoti}  text-center`}
                                        >
                                            Người Xử lý
                                        </p>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataNoti.new_work_from_worker.map(
                                    (item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="p-1 border-b border-r  border-orange-500 w-[150px]">
                                                    <p
                                                        className={`${classContentNoti}`}
                                                    >
                                                        {item.info_notication}
                                                    </p>
                                                </td>
                                                <td className="p-1 border-b border-orange-500 w-[50px]">
                                                    <p
                                                        className={`${classContentNoti}`}
                                                    >
                                                        {item.user_read}
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Card>
                    <Card className={`${classCardNoti}`}>
                        <table className={`${classTable}`}>
                            <thead>
                                <tr>
                                    <th
                                        className={`${classHeadTable} border-r rounded-tl-md`}
                                    >
                                        <p className={`${classContentNoti} `}>
                                            Nội dung
                                        </p>
                                    </th>
                                    <th
                                        className={`${classHeadTable} rounded-tr-md`}
                                    >
                                        <p
                                            className={`${classContentNoti}  text-center`}
                                        >
                                            Người Xử lý
                                        </p>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataNoti.new_return_work_from_worker.map(
                                    (item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="p-1 border-b border-r  border-orange-500 w-[150px]">
                                                    <p
                                                        key={index}
                                                        className={`${classContentNoti}`}
                                                    >
                                                        {item.info_notication}
                                                    </p>
                                                </td>
                                                <td className="p-1 border-b border-orange-500 w-[50px]">
                                                    <p
                                                        className={`${classContentNoti}`}
                                                    >
                                                        {item.user_read}
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Card>
                    <Card className={`${classCardNoti}`}>
                        <table className={`${classTable}`}>
                            <thead>
                                <tr>
                                    <th
                                        className={`${classHeadTable} border-r rounded-tl-md`}
                                    >
                                        <p className={`${classContentNoti} `}>
                                            Nội dung
                                        </p>
                                    </th>
                                    <th
                                        className={`${classHeadTable} rounded-tr-md`}
                                    >
                                        <p
                                            className={`${classContentNoti}  text-center`}
                                        >
                                            Người Xử lý
                                        </p>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataNoti.new_feeback.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-1 border-b border-r  border-orange-500 w-[150px]">
                                                <p
                                                    key={index}
                                                    className={`${classContentNoti}`}
                                                >
                                                    {item.info_notication}
                                                </p>
                                            </td>
                                            <td className="p-1 border-b border-orange-500 w-[50px]">
                                                <p
                                                    key={index}
                                                    className={`${classContentNoti}`}
                                                >
                                                    {item.user_read}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
export default Notice;
