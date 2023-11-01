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
    ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
function AdminSidebar({ children }) {
    const [open, setOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const Menus = [
        {
            title: "Thợ",
            icon: <UserGroupIcon className="w-6" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Kiểm Tra Liên Hệ",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/worker-check-call"),
                },
                {
                    title: " Danh Sách Thợ",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/worker-list"),
                },
                {
                    title: " Tài Khoản App",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/worker-account"),
                },
            ],
        },
        {
            title: "Thêm Dữ Liệu",
            icon: <CircleStackIcon className="w-6" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: " Thêm Dữ Liệu Khách",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/data-import-customer"),
                },
                {
                    title: "Xuất Dữ Liệu Khách",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
                {
                    title: "Thêm Dữ Liệu Thợ",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/data-import-worker"),
                },
                {
                    title: "Thêm Bảng Giá",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/data-import-price"),
                },
            ],
        },
        {
            title: "Ứng Dụng ",
            icon: <DevicePhoneMobileIcon className="w-6" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Popup Chương Trình Khuyến Mãi",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/application-popup"),
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
            icon: <ChatBubbleLeftRightIcon className="w-6" />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Gửi ZNS Cảm Ơn",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/zalo-zns-thanks"),
                },
                {
                    title: "Gửi ZNS Báo Giá",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/zalo-zns-quotes"),
                },
                {
                    title: "Gửi ZNS Báo Giá Sau 15 Ngày",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                },
            ],
        },
        {
            title: "Công Cụ",
            icon: <WrenchIcon className="w-6" />,
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
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className={`flex w-full text-black `}>
            <div
                className={`${
                    open ? "w-72" : "w-16"
                } bg-gray-200 h-screen p-2 pt-1 relative duration-300 rounded-lg`}
            >
                <ChevronLeftIcon
                    className={`absolute cursor-pointer right-5 top-9 w-7 border-black border-2 rounded-full ${
                        !open && "rotate-180"
                    }`}
                    onClick={() => setOpen(!open)}
                />
                <ul className="pt-6">
                    <h1
                        className={`text-black origin-left font-medium text-xl duration-200 ${
                            !open && "scale-0"
                        }`}
                    >
                        THỢ VIỆT
                    </h1>
                    <Link href={route("admin")}>
                        <li
                            className={`flex rounded-md p-2 ${
                                open ? "mt-5" : "mt-0"
                            } cursor-pointer hover:bg-blue-gray-500 hover:text-white text-sm items-center text-black`}
                        >
                            <HomeIcon className="w-6" />
                            <span
                                className={`${
                                    !open && "hidden"
                                } origin-left duration-200p pl-2`}
                            >
                                Admin
                            </span>
                        </li>
                    </Link>
                    {Menus.map((Menu, index) => (
                        <div key={index}>
                            <li
                                className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-gray-500 text-sm items-center gap-x-4 hover:text-white text-black justify-between ${
                                    Menu.gap ? "mt-7" : "mt-2"
                                }${activeIndex === index ? "bg-red-500" : ""}`}
                                onClick={() => {
                                    if (openSubmenu === index) {
                                        setOpenSubmenu(false);
                                    } else if (!open) {
                                        setOpenSubmenu(index);
                                        setOpen(!open);
                                        setActiveIndex(index);
                                    } else {
                                        Menu.submenu && setOpenSubmenu(index);
                                        setActiveIndex(index);
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
                                            openSubmenu === index
                                                ? "rotate-180"
                                                : ""
                                        } ${!open && "hidden"}`}
                                        onClick={() => {
                                            setOpenSubmenu(!openSubmenu);
                                        }}
                                    />
                                )}
                            </li>
                            {Menu.submenu && openSubmenu === index && (
                                <ul
                                    className={`bg-gray-500 rounded mx-2 rounded-tr-none rounded-tl-none ${
                                        !open ? "hidden" : ""
                                    }`}
                                >
                                    {Menu.submenuItem.map(
                                        (submenuItem, index) => (
                                            <Link href={submenuItem.href}>
                                                <li
                                                    key={index}
                                                    className={`flex rounded-md p-1 cursor-pointer hover:bg-gray-500 text-sm items-center gap-x-4 text-black ${
                                                        index === 0 &&
                                                        "bg-light-white"
                                                    }`}
                                                >
                                                    <span className="flex p-[4px] rounded-[4px] w-full item-center hover:bg-blue-gray-50">
                                                        {submenuItem.icon}
                                                        <span
                                                            className={`${
                                                                !open &&
                                                                "hidden"
                                                            } origin-left duration-200 pl-2`}
                                                        >
                                                            {submenuItem.title}
                                                        </span>
                                                    </span>
                                                </li>
                                            </Link>
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
