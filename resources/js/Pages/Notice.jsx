import React, { createElement, useState } from "react";


import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect } from "react";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
const data = [
    {
        label: "Lịch Từ App Khách",
        value: "New_order",
    },
    {
        label: "Thông Tin Thợ Báo Lịch",
        value: "profile_worker",

    },
    {
        label: "Thợ Xin Lịch",
        value: "Empty",
    },
    {
        label: "Khách Phàn Nàn",
        value: "Feedback",
    },
];

function Notice({ auth }) {

    const [dataNoti, getNoti] = useState('');
    const fetchNotiUser = async () => {
        try {
            let data = { code: auth.user.code };
            const response = fetch("api/web/noti", {
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
                method: 'POST',
                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
            });
            if (response.status == 200) {
                // socketD.emit("ButtonDisable_To_Server", data);
                getNoti(response);
                console.log(response);
            }
        } catch (error) {
            console.log("push on Loi", error);
        }
    }
    console.log('-------', auth.user.code);

    useEffect(() => {
        fetchNotiUser()
    }, []);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Có Lịch Mới" />

            <Card >
                <CardBody className="grid grid-cols-4 gap-1"
                >

                    {data.map((item) => (
                        <Card className="border border-deep-orange-300">
                            <Typography className='bg-blue-gray-300 rounded-lg'>
                                {item.label}
                            </Typography>
                        </Card>
                    ))}
                </CardBody>
            </Card>
        </AuthenticatedLayout>
    );
}
export default Notice;
