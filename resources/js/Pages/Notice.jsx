import React, { createElement, useState } from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    Typography,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    FaceFrownIcon,
} from "@heroicons/react/24/solid";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TableDataTV from "@/Core/TableDataTV";

import {
    TABLE_HEAD_NOTICE_NEW_ORDER,
    TABLE_HEAD_NOTICE_THO_BAO_LICH,
    TABLE_HEAD_NOTICE_FEEDBACK,
    TABLE_HEAD_NOTICE_INFO_WORKER,
} from "@/Data/Table/DesignTable";
const data = [
    {
        label: "Lịch Từ App Khách",
        value: "New_order",
        icon: Square3Stack3DIcon,
        desc: (
            <TableDataTV
                tableHead={TABLE_HEAD_NOTICE_NEW_ORDER}
                tableRows={TABLE_HEAD_NOTICE_NEW_ORDER}
            />
        ),
    },
    {
        label: "Thông Tin Thợ Báo Lịch",
        value: "profile_worker",
        icon: UserCircleIcon,
        desc: (
            <TableDataTV
                tableHead={TABLE_HEAD_NOTICE_THO_BAO_LICH}
                tableRows={TABLE_HEAD_NOTICE_THO_BAO_LICH}
            />
        ),
    },
    {
        label: "Thợ Xin Lịch",
        value: "Empty",
        icon: Cog6ToothIcon,
        desc: (
            <TableDataTV
                tableHead={TABLE_HEAD_NOTICE_INFO_WORKER}
                tableRows={TABLE_HEAD_NOTICE_INFO_WORKER}
            />
        ),
    },
    {
        label: "Khách Phàn Nàn",
        value: "Feedback",
        icon: FaceFrownIcon,
        desc: (
            <TableDataTV
                tableHead={TABLE_HEAD_NOTICE_FEEDBACK}
                tableRows={TABLE_HEAD_NOTICE_FEEDBACK}
            />
        ),
    },
];

function Notice({ auth }) {
    const [activeTab, setActiveTab] = useState(data);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Có Lịch Mới" />
            <Tabs value="dashboard">
                <TabsHeader>
                    {data.map(({ label, value, icon }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => handleTabClick(value)}
                            className={`px-4 py-2 rounded mr-2 ${
                                activeTab === value
                                    ? " text-blue-500 outline border-1"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                {createElement(icon, {
                                    className: "w-5 h-5",
                                })}
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </AuthenticatedLayout>
    );
}
export default Notice;
