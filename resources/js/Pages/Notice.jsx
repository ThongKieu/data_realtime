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
const data = [
    {
        id: 1,
        label: "Lịch Từ App Khách",
        value: "New_order",
    },
    { id: 2, label: "Thông Tin Thợ Báo Lịch", value: "profile_worker" },
    { id: 3, label: "Thợ Xin Lịch", value: "Empty" },
    { id: 4, label: "Khách Phàn Nàn", value: "Feedback" },
];

function Notice({ auth }) {
    const [dataNoti, setNoti] = useState("");
    const [notificationData, setInfoNotification] = useState("");
    const fetchNotiUser = async () => {
        try {
            const response = fetch("api/web/noti");
            const jsonData = await response.json();
            setNoti(jsonData);
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
    console.log("-------", notificationData,'+',dataNoti );

    useEffect(() => {
        fetchNotiUser();
        fetchNoti();
    }, []);
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    var heightScreenTV = screenSize.height;
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Có Lịch Mới" />
            <div
                className={`flex flex-row w-full overflow-scroll mt-1 gap-[2px] pl-2  `}
                style={{ height: `${heightScreenTV}px` }}
            >
                <Card className="w-full border border-green-500">
                    <CardBody className="grid grid-cols-4 gap-1 p-2">
                        {data.map((item, index) => (
                            <Card key={index}>
                                <Typography className="px-2 text-black border border-orange-500 rounded-sm">
                                    {item.label}
                                </Typography>
                                <Typography className="px-2 mt-2 text-black border border-orange-500 rounded-sm">
                                    {item.value}
                                </Typography>
                            </Card>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
export default Notice;
