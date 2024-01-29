import React, { createElement, useState } from "react";


import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect } from "react";
const data = [
    // {
    //     label: "Lịch Từ App Khách",
    //     value: "New_order",
    //     icon: Square3Stack3DIcon,
    //     desc: (
    //         <TableDataTV
    //             tableHead={TABLE_HEAD_NOTICE_NEW_ORDER}
    //             tableRows={TABLE_HEAD_NOTICE_NEW_ORDER}
    //         />
    //     ),
    // },
    // {
    //     label: "Thông Tin Thợ Báo Lịch",
    //     value: "profile_worker",
    //     icon: UserCircleIcon,
    //     desc: (
    //         <TableDataTV
    //             tableHead={TABLE_HEAD_NOTICE_THO_BAO_LICH}
    //             tableRows={TABLE_HEAD_NOTICE_THO_BAO_LICH}
    //         />
    //     ),
    // },
    // {
    //     label: "Thợ Xin Lịch",
    //     value: "Empty",
    //     icon: Cog6ToothIcon,
    //     desc: (
    //         <TableDataTV
    //             tableHead={TABLE_HEAD_NOTICE_INFO_WORKER}
    //             tableRows={TABLE_HEAD_NOTICE_INFO_WORKER}
    //         />
    //     ),
    // },
    // {
    //     label: "Khách Phàn Nàn",
    //     value: "Feedback",
    //     icon: FaceFrownIcon,
    //     desc: (
    //         <TableDataTV
    //             tableHead={TABLE_HEAD_NOTICE_FEEDBACK}
    //             tableRows={TABLE_HEAD_NOTICE_FEEDBACK}
    //         />
    //     ),
    // },
];

function Notice({ auth }) {
   
    const [dataNoti, getNoti] = useState('');
    const fetchNotiUser = async () => {
        try {
            let data = {code:auth.user.code};
            const response = fetch("api/web/noti", {
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
                method:'POST',
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
            
        </AuthenticatedLayout>
    );
}
export default Notice;
