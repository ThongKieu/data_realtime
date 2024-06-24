import React, { useState, useEffect } from "react";
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
    FolderIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { useWindowSize } from "@/Core/Resize";
import { useSocket } from "@/Utils/SocketContext";
function AdminSidebar({ children }) {
    const [open, setOpen] = useState(false);
    const { width, height } = useWindowSize(0);
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const Menus = [
        {
            title: "Quản Lý Hình Ảnh",
            icon: <FolderIcon className={`w-6 md:w-5 xl:w-6`} />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Libery",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/media-manager"),
                },
                {
                    title: "Upload",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/worker-check-call"),
                },
            ],
        },
        {
            title: "Thợ",
            icon: <UserGroupIcon className={`w-6 md:w-5 xl:w-6`} />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Danh Sách Người Dùng",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/users"),
                },
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
                    title: "Ds Mã Thợ",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/worker-code"),
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
            icon: <CircleStackIcon className={`w-6 md:w-5 xl:w-6`} />,
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
            icon: <DevicePhoneMobileIcon className={`w-6 md:w-5 xl:w-6`} />,
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
                    href: route("admin/application-qrcode"),
                },
                {
                    title: "Banner",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/application-banner"),
                },
                {
                    title: "Bảng Giá",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/application-price"),
                },
                {
                    title: "Bài Viết",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/post-list"),
                },
                {
                    title: "Danh Sách Công Việc",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/application-work-list"),
                },
            ],
        },
        {
            title: "Zalo",
            icon: <ChatBubbleLeftRightIcon className={`w-6 md:w-5 xl:w-6`} />,
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
            icon: <WrenchIcon className={`w-6 md:w-5 xl:w-6`} />,
            href: "admin",
            submenu: true,
            submenuItem: [
                {
                    title: "Kiểm Tra Liên Hệ",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/worker-check-call"),
                },
                {
                    title: "Chặn Số",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/tools-admin-block"),
                },
                {
                    title: "Kiểm Kê",
                    icon: <ChevronDoubleRightIcon className="w-3" />,
                    href: route("admin/worker-check-call"),
                },
            ],
        },
    ];
    const [activeIndex, setActiveIndex] = useState(null);
    const socket = useSocket();

    return (
        <div className={`flex w-full h-${height} text-black bg-[#607d8b]`}>
            {open && (
                <div
                    className="absolute top-0 left-0 z-20 w-full h-full bg-black opacity-50"
                    onClick={() => setOpen(false)}
                ></div>
            )}
            <div
                className={`${
                    open ? "left-[0] w-40 lg:w-64 " : "left-[0]"
                } transition-all w-16 duration-300 bg-white h-screen fixed top-0 z-30 p-2 pt-1 rounded-l-none rounded-[30px] overflow-y-auto shadow-lg `}
            >
                {open && (
                    <ChevronLeftIcon
                        className={`absolute cursor-pointer right-3 md:right-[8px] xl:right-4 top-5 w-7 border-black border-2 rounded-full ${
                            !open && "rotate-180"
                        } hover:border-red-500`}
                        onClick={() => setOpen(!open)}
                    />
                )}
                <ul
                    className={`pt-3 flex flex-col ${
                        open ? "" : "justify-items-center items-center"
                    } text-center h-[${height}px]`}
                >
                    {!open && (
                        <ChevronLeftIcon
                            className={`cursor-pointer w-7 border-black border-2 rounded-full ${
                                !open && "rotate-180"
                            } hover:border-red-500`}
                            onClick={() => setOpen(!open)}
                        />
                    )}
                    <h1
                        className={`text-black origin-left font-medium text-xl duration-200 ${
                            !open && "scale-0 hidden"
                        }`}
                    >
                        THỢ VIỆT
                    </h1>
                    <Link href={route("admin")}>
                        <li
                            className={`flex rounded-md p-2 ${
                                open ? " mt-5" : "md:p-1 xl:p-2 mt-2"
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
                        <div key={index} className="text-red-500">
                            <li
                                className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-gray-500 text-sm items-center gap-x-4 hover:text-white text-black justify-between ${
                                    Menu.gap ? "mt-7" : "mt-2"
                                }${activeIndex === index ? "bg-red-500" : ""} ${
                                    open ? " mt-2" : "md:p-1 xl:p-2 mt-0"
                                }`}
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
                                            <Link
                                                key={index}
                                                href={submenuItem.href}
                                            >
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
            <div
                className={`bg-[#607d8b] ml-16 w-full h-screen overflow-scroll-y transition-all duration-300`}
            >
                {children}
            </div>
        </div>
    );
}

export default AdminSidebar;
