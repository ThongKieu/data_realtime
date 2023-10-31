import React, { useState } from "react";
import {
    UserGroupIcon,
    CircleStackIcon,
    DevicePhoneMobileIcon,
    ChatBubbleLeftRightIcon,
    WrenchIcon,
    HomeIcon,
    ChevronDoubleRightIcon,
    ChevronDownIcon,
    XMarkIcon,
    Bars3Icon,
    ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import zIndex from "@mui/material/styles/zIndex";
function AdminSidebar({ children }) {
    const [open, setOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const Menus = [
        {
            title: "Thợ",
            icon: <UserGroupIcon className="w-7" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Kiểm Tra Liên Hệ",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/worker-check-call",
                },
                {
                    title: " Danh Sách Thợ",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/worker-list",
                },
                {
                    title: " Tài Khoản App",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/worker-account",
                },
            ],
        },
        {
            title: "Thêm Dữ Liệu",
            icon: <CircleStackIcon className="w-7" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: " Thêm Dữ Liệu Khách",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/data-import-customer",
                },
                {
                    title: "Xuất Dữ Liệu Khách",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
                {
                    title: "Thêm Dữ Liệu Thợ",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/data-import-worker",
                },
                {
                    title: "Thêm Bảng Giá",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/data-import-price",
                },
            ],
        },
        {
            title: "Ứng Dụng ",
            icon: <DevicePhoneMobileIcon className="w-7" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Popup Chương Trình Khuyến Mãi",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/application-popup",
                },
                {
                    title: "QR Code",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
                {
                    title: "Banner",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
                {
                    title: "Bảng Giá",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
                {
                    title: "Bài Viết",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
                {
                    title: "Danh Sách Công Việc",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
            ],
        },
        {
            title: "Zalo",
            icon: <ChatBubbleLeftRightIcon className="w-7" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Gửi ZNS Cảm Ơn",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/zalo-zns-thanks",
                },
                {
                    title: "Gửi ZNS Báo Giá",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: "admin/zalo-zns-quotes",
                },
                {
                    title: "Gửi ZNS Báo Giá Sau 15 Ngày",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
            ],
        },
        {
            title: "Công Cụ",
            icon: <WrenchIcon className="w-7" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Chặn Số",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
                {
                    title: "Kiểm Kê",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
            ],
        },
    ];
    console.log(Menus);
    return (
        <div className="flex text-black ">
            <div
                className={`${
                    open ? "w-72" : "w-20"
                } bg-white h-screen p-5 pt-1 relative duration-300 rounded-lg`}
            >
                <ChevronLeftIcon
                    className={`absolute cursor-pointer right-7 top-9 w-7 border-black border-2 rounded-full ${
                        !open && "rotate-180"
                    }`}
                    onClick={() => setOpen(!open)}
                />

                <ul className="pt-6">
                    <div className="flex items-center gap-x-4">
                        <h1
                            className={`text-black origin-left font-medium text-xl duration-200 ${
                                !open && "scale-0"
                            }`}
                        >
                            THỢ VIỆT
                        </h1>
                    </div>
                    <Link to={route("admin")}>
                        <li
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-4 text-black`}
                        >
                            <HomeIcon className="w-7" />
                            <span
                                className={`${
                                    !open && "hidden"
                                } origin-left duration-200`}
                            >
                                Admin
                            </span>
                        </li>
                    </Link>
                    {Menus.map((Menu, index) => (
                        <div key={index}>
                            <li
                                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 text-black justify-between ${
                                    Menu.gap ? "mt-9" : "mt-2"
                                } ${index === 0 && "bg-light-white"}`}
                                onClick={() => {
                                    if (openSubmenu === index) {
                                        setOpenSubmenu(false);

                                    } else{
                                        Menu.submenu && setOpenSubmenu(index);
                                    }
                                }}
                            >
                                <span className="flex items-center">
                                    {Menu.icon}
                                    <span
                                        className={`${
                                            !open && "hidden"
                                        } origin-left duration-200 pl-2`}
                                    >
                                        {Menu.title}
                                    </span>
                                </span>
                                {Menu.submenu && (
                                    <ChevronDownIcon
                                        className={`w-3 ${
                                            openSubmenu === index ? "rotate-180" : ""
                                        } ${!open && "hidden"}`}
                                        onClick={() =>{
                                            setOpenSubmenu(!openSubmenu);
                                        }

                                        }
                                    />
                                )}
                            </li>
                            {Menu.submenu && openSubmenu === index && (
                                <ul className={`bg-gray-500 rounded ${!open ? 'hidden':''}`}>
                                    {Menu.submenuItem.map(
                                        (submenuItem, index) => (
                                            <li
                                                key={index}
                                                className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-500 text-sm items-center gap-x-4 text-black ${
                                                    index === 0 &&
                                                    "bg-light-white"
                                                }`}
                                            >
                                                {submenuItem.icon}
                                                <span
                                                    className={`${
                                                        !open && "hidden"
                                                    } origin-left duration-200`}
                                                >
                                                    {submenuItem.title}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    ))}
                </ul>
            </div>
            {children}
        </div>
    );
}

export default AdminSidebar;
