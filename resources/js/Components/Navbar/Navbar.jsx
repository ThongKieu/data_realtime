import React, { useEffect, useState, memo } from "react";
import {
    Navbar,
    Collapse,
    Button,
    Menu,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
    MenuHandler,
    Typography,
    Card,
    CardBody,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {
    HomeIcon,
    UserCircleIcon,
    ChevronDownIcon,
    PowerIcon,
    Bars2Icon,
    IdentificationIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";
import CardMain from "./Card";
import NavLink from "@/Components/NavLink";
import ApplicationLogo from "../ApplicationLogo";
import OnlineList from "./OnlineList";
import { host } from "@/Utils/UrlApi";
import newSocket from "@/Utils/Socket";
// import NavGuest from "./navGuest";

// profile menu component
const profileMenuItems = [
    {
        label: "Thông Tin Tài Khoản",
        icon: UserCircleIcon,
        href: "chat",
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        href: "login",
    },
];
function ProfileMenu({ propauthprofile }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const [number, setNumberOnline] = useState("");
    const numberOnline = async () => {
        try {
            const response = await fetch(host + "api/web/list-online", {
                method: "get",
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
            });
            if (!response.ok) {
                throw new Error("Fetch không thành công");
            }
            const jsonData = await response.json();
            // Xử lý dữ liệu lấy được từ API
            // console.log('1111111111111111111',jsonData);
            setNumberOnline(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    numberOnline();
    // console.log("xin chào", propAuthProfile);
    return (
        <div className="flex">
            <NavLink
                href={route("admin")}
                className="py-1 ml-2 font-medium cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                </svg>
            </NavLink>
            <NavLink
                href={route("chat")}
                className="ml-2 cursor-pointer py-1.5 font-medium "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                </svg>
            </NavLink>
            <NavLink
                href={route("notice")}
                className="ml-2 cursor-pointer py-1.5 font-medium "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-yellow-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                    />
                </svg>
            </NavLink>

            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom-end"
                onClick={numberOnline}
                allowHover
            >
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    >
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt="tania andrew"
                            className="border border-gray-900 p-0.5"
                            src={host + propauthprofile.avatar}
                        />
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${
                                isMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="p-1">
                    <OnlineList
                        avatarimage={host + propauthprofile.avatar}
                        numberonline={number}
                        name={propauthprofile.name}
                    />
                    <NavLink
                        href={route("profile.edit")}
                        className="w-full font-normal"
                    >
                        <MenuItem
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded `}
                        >
                            <UserCircleIcon className="`h-4 w-4" />
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                // color={isLastItem ? "red" : "inherit"}
                            >
                                Thông Tin Tài Khoản
                            </Typography>
                        </MenuItem>
                    </NavLink>
                    <NavLink
                        href={route("logout")}
                        method="POST"
                        as="button"
                        className="w-full font-normal"
                    >
                        <MenuItem
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded  hover:bg-red-500/10 focus:bg-red-500/10 bg-red-500/10`}
                        >
                            <PowerIcon className="`h-4 w-4" />
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                // color={isLastItem ? "red" : "inherit"}
                            >
                                Sign Out
                            </Typography>
                        </MenuItem>
                    </NavLink>
                </MenuList>
            </Menu>
        </div>
    );
}

// nav list component
const navListItems = [
    {
        id: 1,
        label: "Trang Chủ",
        icon: HomeIcon,
        href: "dashboard",
    },
    {
        id: 2,
        label: "Tìm Kiếm",
        icon: UserCircleIcon,
        href: "search",
    },
];

function NavList({ active = false }) {
    const renderItems = navListItems.map(({ label, icon, href }, index) => (
        <NavLink key={index} href={route(`${href}`)} className="font-normal">
            <MenuItem className="flex items-center gap-2 text-black lg:rounded-full">
                {React.createElement(icon, {
                    className: "h-[18px] w-[18px]",
                })}
                {label}
            </MenuItem>
        </NavLink>
    ));
    return (
        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {renderItems}
            <IdentificationIcon className="h-[18px] w-[18px] " />
            <Menu allowHover>
                <MenuHandler>
                    <Typography
                        as="span"
                        className="text-sm font-normal cursor-pointer"
                    >
                        Thông Tin Thợ
                    </Typography>
                </MenuHandler>
                <MenuList className="block">
                    <NavLink
                        href={route("locationWorker")}
                        className="font-normal"
                    >
                        <MenuItem className="gap-2 text-black lg:rounded-full">
                            Vị trí Thợ
                        </MenuItem>
                    </NavLink>
                    <NavLink href={route("WorkerMain")} className="font-normal">
                        <MenuItem className="gap-2 text-black lg:rounded-full">
                            Thông Tin Thợ
                        </MenuItem>
                    </NavLink>
                </MenuList>
            </Menu>
            <ListBulletIcon className="h-[18px] w-[18px] " />
            <Menu allowHover>
                <MenuHandler>
                    <Typography
                        as="span"
                        className="text-sm font-normal cursor-pointer"
                    >
                        Khác
                    </Typography>
                </MenuHandler>
                <MenuList className="block">
                    <NavLink href={route("quoteflow")} className="font-normal">
                        <MenuItem className="gap-2 text-black lg:rounded-full">
                            Thông tin Báo giá
                        </MenuItem>
                    </NavLink>
                    <NavLink href={route("products")} className="font-normal">
                        <MenuItem className="gap-2 text-black lg:rounded-full">
                            Thông Tin Sản Phẩm
                        </MenuItem>
                    </NavLink>
                </MenuList>
            </Menu>
        </ul>
    );
}

function NavbarDefault({ propauth, check }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    console.log(check, "xin chao");
    const [socketDelete, setSocketDelete] = useState();
    useEffect(() => {
        setSocketDelete(newSocket, { secure: true });
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
        fetchInfoWorker();
        fetchDelete();
        newSocket.on("sendAddWorkTo_Client", (data) => {
            if (data != "") {
                fetchDelete(data, check);
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [check]);
    const [countDelete, setCountDelete] = useState(0);

    const fetchDelete = async () => {
        try {
            const response = await fetch(
                `api/web/cancle/works?dateCheck=${check}`
            );
            const jsonData = await response.json();
            setCountDelete(jsonData.num_can);
            if (socketDelete) {
                socketDelete.emit("addWorkTo_Server", jsonData.num_can);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [infoWorker, setInfoWorker] = useState([]);
    const fetchInfoWorker = async () => {
        try {
            const response = await fetch(host + "api/web/workers");
            const jsonData = await response.json();
            const formatJson = jsonData.map((item) => ({
                value: item.id,
                label: item.worker_code + " " + item.worker_full_name,
                workerCode: item.worker_code,
                workerStatus: item.worker_status,
            }));
            setInfoWorker(formatJson);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // In kết quả ra console
    const jobCategories = [
        { code: "A", name: "Điện Nước" },
        { code: "B", name: "Điện Lạnh" },
        { code: "C", name: "Đồ Gỗ" },
        { code: "D", name: "NLMT" },
        { code: "G", name: "Vận Chuyển" },
        { code: "H", name: "Cơ Khí" },
        { code: "F", name: "Xây Dựng" },
    ];
console.log(infoWorker);
    const renderWorkerGroup = (prefix, status) => (
        <div className="w-full p-1" key={`${prefix}-${status}`}>
            <p className="border-b-[3px] border-b-blue-500 text-center w-full">
                {
                    jobCategories.find((category) => category.code === prefix)
                        ?.name
                }
            </p>

            {infoWorker.map(
                (item, index) =>
                    item.workerCode.startsWith(prefix) &&
                    item.workerStatus === status && (
                        <div className="w-full pb-1" key={index}>
                            <p className="p-1 text-sm border border-green-500">
                                {item.label}
                            </p>
                        </div>
                    )
            )}
        </div>
    );
    const [openWorker, setOpenWorker] = React.useState(false);
    const handleOpenWorker = () => setOpenWorker(!openWorker);
    const [screenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const heightScreenTV = screenSize.height - 200;
    return (
        <Navbar className="w-full max-w-full p-2 mx-auto text-black-400 lg:pl-6 bg-blue-gray-200 ">
            <div className="relative flex items-center justify-between h-8 mx-auto text-blue-gray-900 ">
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden lg-max:text-left"
                >
                    <Bars2Icon className="w-6 h-6" />
                </IconButton>
                <div className="hidden p-0 m-0 lg:flex">
                    <NavLink
                        href={route("dashboard")}
                        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium "
                    >
                        <ApplicationLogo />
                    </NavLink>
                    <NavList />
                </div>
                <div className="flex flex-row items-center">
                    <CardMain />
                    <NavLink
                        href={route("CancelBooking")}
                        className="font-normal"
                    >
                        <Tooltip
                            content={countDelete}
                            className="text-black bg-white w-fit"
                        >
                            <Card className="m-1 border border-red-600 border-solid rounded w-28 justify-left shadow-red-400">
                                <CardBody className="flex items-center justify-between p-1 ">
                                    <Typography
                                        className="text-sm text-center text-red-600"
                                        variant="paragraph"
                                        color="blue-gray"
                                    >
                                        Hủy
                                    </Typography>
                                    <Typography
                                        className="text-sm text-center text-red-600"
                                        variant="paragraph"
                                        color="blue-gray"
                                    >
                                        {countDelete}
                                    </Typography>
                                </CardBody>
                            </Card>
                        </Tooltip>
                    </NavLink>
                    <Card
                        className="flex flex-row items-center justify-between p-1 border border-green-600 border-solid rounded cursor-pointer w-28 justify-left shadow-green-400"
                        onClick={handleOpenWorker}
                    >
                        <Typography
                            className="text-sm text-center text-green-600"
                            variant="paragraph"
                            color="blue-gray"
                        >
                            Thợ
                        </Typography>
                        <Typography
                            className="text-sm text-center text-green-600 "
                            variant="paragraph"
                            color="blue-gray"
                        >
                            {infoWorker.length}
                        </Typography>
                    </Card>
                    <Dialog
                        className={`w-full  2xl:min-w-[65%] lg:min-w-[65%] h-[${heightScreenTV}px]`}
                        open={openWorker}
                        handler={handleOpenWorker}
                    >
                        <DialogBody
                            className={`w-full h-[${heightScreenTV}px]`}
                            style={{ height: `${heightScreenTV}px` }}
                        >
                            <div className={`overflow-y-scroll w-full h-full`}>
                                <div className="w-full">
                                    <Typography className="w-full p-1 font-bold text-center text-white bg-blue-500">
                                        Thợ đi làm
                                    </Typography>
                                    <div className="grid grid-cols-7">
                                        {jobCategories.map(({ code }) =>
                                            renderWorkerGroup(code, 0)
                                        )}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Typography className="w-full p-1 font-bold text-center text-white bg-blue-500">
                                        Thợ nghỉ phép
                                    </Typography>
                                    <div className="grid grid-cols-7">
                                        {jobCategories.map(({ code }) =>
                                            renderWorkerGroup(code, 1)
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="outlined"
                                color="red"
                                onClick={handleOpenWorker}
                                className="p-1 mr-1 rounded-sm"
                            >
                                <span>Đóng</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </div>
                <div>
                    <ProfileMenu propauthprofile={propauth} />
                </div>
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll ">
                <NavList />
            </Collapse>
        </Navbar>
    );
}
export default memo(NavbarDefault);
