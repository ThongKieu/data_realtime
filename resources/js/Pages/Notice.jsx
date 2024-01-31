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
                // socketD.emit("ButtonDisable_To_Server", data);
                setNoti(jsonData);
                console.log(response);
            }
        } catch (error) {
            console.log("push on Loi", error);
        }
    };
    const fetchNoti = async () => {
        try {
            let code = auth.user.code;
            const response = await fetch(
                `api/web/noti/soket_noti?code=${code}`
            );
            const jsonData = await response.json();
            // Xử lý dữ liệu lấy được từ API
            setInfoNotification(jsonData);
            // newSocket.emit("notication_Server");
            // if (response.ok) {
            //     // newSocket.emit("notication_Server");
            // }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log("-------", notificationData, dataNoti);

    useEffect(() => {
        fetchNotiUser();
        fetchNoti();
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
    const classTable = "w-full text-left border border-orange-500 table-auto ";
    const classHeadTable = "p-2 border-b border-orange-500 bg-blue-gray-50";
    const classContentNoti =
        "block font-sans text-md antialiased text-blue-gray-900 opacity-70";
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Có Lịch Mới" />
            <div
                className={` w-full overflow-scroll mt-1 gap-[2px] pl-2 `}
                style={{ height: `${heightScreenTV}px` }}
            >
                <Card className="grid w-full grid-cols-4 gap-1 p-2 rounded-sm ">
                    {data.map((item, index) => (
                        <>
                            <Typography
                                key={index}
                                className="flex flex-row items-center justify-between w-full p-2 text-black border border-orange-500"
                            >
                                <span>{item.label}</span>
                                <button onClick={()=>{console.log('index');}}>
                                    <CheckCircleIcon className="w-6 h-6" />
                                </button>
                            </Typography>
                        </>
                    ))}
                    <table className={`${classTable}`}>
                        <thead>
                            <tr>
                                <th className={`${classHeadTable} border-r`}>
                                    <p className={`${classContentNoti}`}>
                                        Nội dung
                                    </p>
                                </th>
                                <th className={`${classHeadTable}`}>
                                    <p className={`${classContentNoti}`}>
                                        Người Xử lý
                                    </p>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataNoti.new_work_from_app.map((item, index) => {
                                return (
                                    <tr>
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
                            })}
                        </tbody>
                    </table>
                    <table className={`${classTable}`}>
                        <thead>
                            <tr>
                                <th className={`${classHeadTable} border-r`}>
                                    <p className={`${classContentNoti}`}>
                                        Nội dung
                                    </p>
                                </th>
                                <th className={`${classHeadTable}`}>
                                    <p className={`${classContentNoti}`}>
                                        Người Xử lý
                                    </p>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataNoti.new_work_from_worker.map(
                                (item, index) => {
                                    return (
                                        <tr>
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
                    <table className={`${classTable}`}>
                        <thead>
                            <tr>
                                <th className={`${classHeadTable} border-r`}>
                                    <p className={`${classContentNoti}`}>
                                        Nội dung
                                    </p>
                                </th>
                                <th className={`${classHeadTable}`}>
                                    <p className={`${classContentNoti}`}>
                                        Người Xử lý
                                    </p>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataNoti.new_return_work_from_worker.map(
                                (item, index) => {
                                    return (
                                        <tr>
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
                    <table className={`${classTable}`}>
                        <thead>
                            <tr>
                                <th className={`${classHeadTable} border-r`}>
                                    <p className={`${classContentNoti}`}>
                                        Nội dung
                                    </p>
                                </th>
                                <th className={`${classHeadTable}`}>
                                    <p className={`${classContentNoti}`}>
                                        Người Xử lý
                                    </p>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataNoti.new_feeback.map((item, index) => {
                                return (
                                    <tr>
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
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
export default Notice;
