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
    CurrencyDollarIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import CardMain from "./Card";
import NavLink from "@/Components/NavLink";
import ApplicationLogo from "../ApplicationLogo";
import OnlineList from "./OnlineList";
import { host } from "@/Utils/UrlApi";
import { getFirstName } from "@/Data/UrlAPI/UrlApi";
// import NavGuest from "./navGuest";
import {useWindowSize} from "@/Core/Resize";
import { useSocket } from "@/Utils/SocketContext";
import { formatCurrencyVND } from "../ColumnRightDialog";
// profile menu component
function ProfileMenu({ propauthprofile, socket }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const [number, setNumberOnline] = useState("");
    const [listuser, setlistOnline] = useState("");

    const [noti, setNoti] = useState("");
    const numberOn = async () => {
        try {
            const res = await fetch(`${host}api/web/list-online`);
            const jsonData = await res.json();
            if (jsonData) {
                setNumberOnline(jsonData.num);
                setlistOnline(jsonData.list_user);
                console.log(jsonData);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    const fetchNoti = async () => {
        try {
            let code = propauthprofile.code;
            const response = await fetch(
                host + `api/web/noti/soket_noti?code=${code}`
            );
            const jsonData = await response.json();
            setNoti(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleMakeReadAll = async () => {
        let data = { code: propauthprofile.code };
        try {
            const response = await fetch(`${host}api/web/noti/markReadAll`, {
                method: "POST",
                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
            });
            if (response.status == 200) {
                console.log(response);
            }
        } catch (error) {
            console.error("Repair:", error);
        }
    };

    useEffect(() => {
        fetchNoti();
        if (socket) {
            socket.on("notication_Client", () => {
                fetchNoti();
            });
        }
        if (isMenuOpen == true) {
            numberOn();
        }
    }, [isMenuOpen, socket]);
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
                    className="hidden w-6 h-6 text-green-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                </svg>
            </NavLink>
            <a
                href={`${host}chat`}
                className="ml-2 cursor-pointer py-1.5 font-medium hidden"
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
            </a>
            <a
                href={`${host}thong-bao-lich-moi`}
                className="relative ml-2 font-medium cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-yellow-500"
                    onClick={handleMakeReadAll}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                    />
                </svg>
                <span
                    className={`bg-red-400 w-4 h-4 text-center rounded-full m-auto  absolute top-0 right-0  ${
                        noti == 0 ? "hidden" : ``
                    }`}
                >
                    <div className="relative">
                        <span
                            className={`text-[10px] text-white  absolute top-[-2px] ${
                                noti >= 9 ? "right-[1px]" : "right-[4px]"
                            }`}
                        >
                            {noti >= 9 ? "9+" : noti}
                        </span>
                    </div>
                </span>
            </a>

            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom-end"
                allowHover={() => numberOn()}
            >
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex bg-blue-gray-200 items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                        onClick={() => numberOn()}
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
                        listuser={listuser}
                        auth= {propauthprofile.id}
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
                        as="span"
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

function NavList() {
    return (
        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <a
                href={`${host}`}
                className="flex flex-row gap-2 p-2 pr-0 font-normal text-black lg:rounded-full hover:bg-blue-gray-50"
            >
                <span>
                    <HomeIcon className="h-[18px] w-[18px]" />
                </span>
                <span>Trang Chủ</span>
            </a>
            <a
                href={`${host}tim-kiem`}
                className="flex flex-row gap-2 p-2 font-normal text-black lg:rounded-full hover:bg-blue-gray-50"
            >
                <span>
                <UserCircleIcon className="h-[18px] w-[18px]" />
                </span>
                <span>Tìm Kiếm</span>
            </a>
            <IdentificationIcon className="h-[18px] w-[18px] " />
            <Menu allowHover>
                <MenuHandler>
                    <Typography
                        as="span"
                        className="flex flex-row gap-2 text-sm font-normal text-black cursor-pointer lg:rounded-full"
                    >
                        Thông Tin Thợ
                    </Typography>
                </MenuHandler>
                <MenuList>
                    <a
                        href={`${host}workers/vi-tri-tho`}
                        className="font-normal"
                    >
                        <MenuItem className="gap-2 text-black lg:rounded-full">
                            Vị trí Thợ
                        </MenuItem>
                    </a>
                    <a href={`${host}workers`} className="font-normal">
                        <MenuItem className="gap-2 text-black lg:rounded-full">
                            Thông Tin Thợ
                        </MenuItem>
                    </a>
                </MenuList>
            </Menu>
            <ListBulletIcon className="h-[18px] w-[18px] " />
            <Menu allowHover>
                <MenuHandler>
                    <Typography
                        as="span"
                        className="flex flex-row gap-2 font-normal text-black cursor-pointer lg:rounded-full"
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
    const { width, height } = useWindowSize(200);
    const [socketCard, setSocketCard] = useState();
    const [countDelete, setCountDelete] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [openWorker, setOpenWorker] = useState(false);
    const handleOpenWorker = () => setOpenWorker(!openWorker);
    const [openSpending, setOpenSpending] = useState(
        Array(jobs.length).fill(false)
    );
    const socket = useSocket();
    useEffect(() => {
        fetchDelete(check);
        getDataWorkerSales(check);
    }, [check]);
    useEffect(() => {
        setSocketCard(socket);
    }, [check, socket]);

    useEffect(() => {
        if (socket) {
            socket.on("sendAddWorkTo_Client", (data) => {
                if (data != "") {
                    fetchDelete(check);
                    getDataWorkerSales(data, check);
                }
            });
            socket.on("UpdateDateTable_To_Client", (data) => {
                if (data) {
                    fetchDelete(check);
                    getDataWorkerSales(data, check);
                }
            });
        }
    }, [check,socket]);

    const fetchDelete = async (dateCheckDel) => {
        try {
            const response = await fetch(
                `${host}api/web/cancle/works?dateCheck=${dateCheckDel}`
            );
            const jsonData = await response.json();
            setCountDelete(jsonData.num_can);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // In kết quả ra console
    const jobCategories = [
        { code: 1, name: "Điện Nước" },
        { code: 2, name: "Điện Lạnh" },
        { code: 3, name: "Đồ Gỗ" },
        { code: 4, name: "NLMT" },
        { code: 5, name: " Xây Dựng" },
        { code: 6, name: " Vận Chuyển" },
        { code: 7, name: "Cơ Khí" },
    ];

    const getDataWorkerSales = async () => {
        const uri = `${host}api/report-worker-web?dateCheck=${check}`;
        try {
            const res = await fetch(uri);
            const jsonData = await res.json();
            console.log(jsonData);
            if (jsonData || jsonData != "undefined") {
                setJobs(jsonData);
            } else {
                setJobs(0);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleOpenSpending = (index) => {
        setOpenSpending((prevOpenSpending) => {
            const updatedOpenSpending = [...prevOpenSpending];
            updatedOpenSpending[index] = !updatedOpenSpending[index];
            return updatedOpenSpending;
        });
    };
    const renderWorkerGroup = (prefix, status) => {
        return (
            <div className="w-full p-1" key={`${prefix}-${status}`}>
                <p className="border-b-[3px] border-b-blue-500 text-center w-full">
                    {
                        jobCategories.find(
                            (category) => category.code === prefix
                        )?.name
                    }
                </p>
                {jobs.map((item, index) => {
                    if (
                        item.worker_kind === prefix &&
                        item.worker_status === status
                    ) {
                        const hasFlagZeroFlag = item.fuel_ot.some(
                            (element) => element.fuel_o_t_workers_flag !== 0
                        );
                        const hasFlagZeroAdmin = item.fuel_ot.some(
                            (element) => element.fuel_o_t_id_admin_check !== 0
                        );
                        return (
                            <div className="w-full pb-1" key={index}>
                                <p
                                    className="flex flex-row items-center justify-between p-[2px] text-sm border border-green-500 cursor-pointer"
                                    onClick={() => handleOpenSpending(index)}
                                >
                                    <span>
                                        ({item.worker_code}){" "}
                                        {getFirstName(item.worker_full_name)}
                                    </span>
                                    <span>
                                        {hasFlagZeroFlag ? (
                                            <CurrencyDollarIcon
                                                className="w-5 h-5"
                                                color="green"
                                            />
                                        ) : null}
                                        {hasFlagZeroAdmin ? (
                                            <ShieldCheckIcon
                                                className="w-5 h-5"
                                                color="green"
                                            />
                                        ) : null}
                                    </span>
                                </p>
                                {openSpending[index] != undefined && (
                                    <Dialog
                                        key={index}
                                        open={openSpending[index]}
                                        onClose={() =>
                                            handleOpenSpending(index)
                                        }
                                    >
                                        <DialogBody>
                                            <div className="relative w-full p-2 pt-3 text-white shadow-md bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 shadow-gray-900/20">
                                                <div className="relative pb-2 m-0 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border border-white/10">
                                                    <h2 className="block pb-4 font-sans antialiased font-normal leading-normal text-center text-white uppercase">
                                                        Tổng Thu Chi Cuối Ngày -
                                                        ({item.worker_code})
                                                        {" - "}
                                                        {getFirstName(
                                                            item.worker_full_name
                                                        )}
                                                    </h2>
                                                    {item.report !== "" && (
                                                        <JobTable
                                                            key={index}
                                                            data={item}
                                                            handleClose={() =>
                                                                handleOpenSpending(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </DialogBody>
                                    </Dialog>
                                )}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    };
    function JobTable({ data, handleClose }) {
        const [jobTable, setJobTable] = useState([data]);
        const handleMoneyChange = (
            jobIndex,
            fuelIndex,
            newValue,
            fuel_o_t_workers_content
        ) => {
            setJobTable((prevJobs) => {
                const updatedJobs = [...prevJobs];
                const updatedJob = { ...updatedJobs[jobIndex] };
                const updatedFuelOt = [...updatedJob.fuel_ot];
                const updatedFuel = { ...updatedFuelOt[fuelIndex] };
                updatedFuel.fuel_o_t_workers_spend_money = newValue;
                updatedFuel.fuel_o_t_workers_content = fuel_o_t_workers_content; // Lưu fuel_o_t_workers_content
                updatedFuelOt[fuelIndex] = updatedFuel;
                updatedJob.fuel_ot = updatedFuelOt;
                updatedJobs[jobIndex] = updatedJob;
                return updatedJobs;
            });
        };
        const handleAccept = async (event) => {
            event.preventDefault();
            try {
                const data = jobTable.flatMap((job) =>
                    job.report.map((reportItem) =>
                        job.fuel_ot.map((fuel) => {
                            let updatedSpendMoney =
                                fuel.fuel_o_t_workers_spend_money;
                            if (fuel.fuel_o_t_workers_content === "TC") {
                                const originalSpendMoney = parseFloat(
                                    fuel.fuel_o_t_workers_spend_money
                                );
                                updatedSpendMoney =
                                    originalSpendMoney !==
                                    fuel.fuel_o_t_workers_spend_money
                                        ? originalSpendMoney * 37000
                                        : fuel.fuel_o_t_workers_spend_money;
                            }
                            return {
                                id_worker: reportItem.id_worker,
                                fuel_o_t_id_admin_check: propauth.id,
                                fuel_o_t_workers_content:
                                    fuel.fuel_o_t_workers_content,
                                fuel_o_t_workers_spend_money: updatedSpendMoney,
                            };
                        })
                    )
                );
                const formatJson = JSON.stringify({
                    data: JSON.stringify(data[0]),
                });
                const response = await fetch("api/fuel-ot", {
                    method: "POST",
                    body: formatJson, // Chuyển mảng data thành chuỗi JSON và đặt vào phần body của request
                    headers: {
                        "Content-Type": "application/json", // Đặt header "Content-Type" là "application/json"
                    },
                });
                if (response.status === 200) {
                    socketCard.emit("addWorkTo_Server", data);
                    // setJobTable();
                    handleClose();
                }
            } catch (error) {
                console.error("Lỗi khi gửi dữ liệu lên server:", error);
                // Xử lý lỗi nếu có
            }
        };

        const calculateRevenue = (data) => {
            let totalRevenue = 0;
            if (data || data != "undefined") {
                data?.forEach((item) => {
                    const workRevenue = item.report[0]?.work_revenue; // Lấy doanh thu từ báo cáo
                    const workExpenditure = item.report[0]?.work_expenditure; // Lấy chi phí từ báo cáo
                    const fuelSpend = item.fuel_ot.reduce(
                        (acc, fuel) => acc + fuel.fuel_o_t_workers_spend_money,
                        0
                    ); // Tổng chi phí nhiên liệu từ từng loại
                    totalRevenue += workRevenue - (workExpenditure + fuelSpend); // Tính toán doanh số và cộng vào tổng
                });
            }
            return totalRevenue;
        };

        // Sử dụng hàm tính toán
        const ds = calculateRevenue(jobTable);
        return (
            <Card className="w-full h-full ">
                <table className="w-full overflow-scroll text-center table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                STT
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                Nội dung
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                Thành Tiền
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(jobTable) &&
                            jobTable.map((job, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {job.report.map((jobReport) => {
                                            console.log(
                                                jobReport.id_worker,
                                                "=",
                                                job.id
                                            );
                                            return (
                                                <>
                                                    {job.id ==
                                                    jobReport.id_worker ? (
                                                        <>
                                                            <tr className="even:bg-blue-gray-50/50">
                                                                <td className="p-4">
                                                                    {1}
                                                                </td>
                                                                <td className="p-4">
                                                                    Ngày làm
                                                                </td>
                                                                <td className="p-4">
                                                                    {
                                                                        jobReport.date_do
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr className="even:bg-blue-gray-50/50">
                                                                <td className="p-4">
                                                                    {2}
                                                                </td>
                                                                <td className="p-4">
                                                                    Thu
                                                                </td>
                                                                <td className="p-4">
                                                                    {formatCurrencyVND(
                                                                        jobReport.work_revenue
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr className="even:bg-blue-gray-50/50">
                                                                <td className="p-4">
                                                                    {3}
                                                                </td>
                                                                <td className="p-4">
                                                                    Chi
                                                                </td>
                                                                <td className="p-4">
                                                                    {formatCurrencyVND(
                                                                        jobReport.work_expenditure
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            {job.fuel_ot.map(
                                                                (fuel, i) => {
                                                                    const currentIndex =
                                                                        index +
                                                                        i +
                                                                        4;
                                                                    console.log(
                                                                        fuel
                                                                    );
                                                                    return (
                                                                        <tr
                                                                            key={`${index}-${i}`}
                                                                            className="even:bg-blue-gray-50/50"
                                                                        >
                                                                            <td className="p-4">
                                                                                {
                                                                                    currentIndex
                                                                                }
                                                                            </td>
                                                                            <td className="p-4">
                                                                                {fuel.fuel_o_t_workers_content ==
                                                                                "CX"
                                                                                    ? "Chi Xăng"
                                                                                    : fuel.fuel_o_t_workers_content ==
                                                                                      "TP"
                                                                                    ? "Chi Phụ"
                                                                                    : " Tăng Ca"}
                                                                            </td>
                                                                            <td className="p-4">
                                                                                <input
                                                                                    className="p-1 rounded-md"
                                                                                    type="text"
                                                                                    value={
                                                                                        fuel.fuel_o_t_workers_spend_money
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleMoneyChange(
                                                                                            index,
                                                                                            i,
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                            fuel.fuel_o_t_workers_content
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )}{" "}
                                                            <tr className="even:bg-blue-gray-50/50">
                                                                <td
                                                                    className="p-4 text-xl font-bold text-center"
                                                                    colSpan={2}
                                                                >
                                                                    Doanh Số
                                                                </td>
                                                                <td className="p-4">
                                                                    {formatCurrencyVND(
                                                                        ds
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ) : null}
                                                </>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                    </tbody>
                </table>
                <div className="flex flex-row justify-between gap-2 p-4 mt-1">
                    <Button
                        className="w-full"
                        color="green"
                        variant="outlined"
                        onClick={handleAccept}
                    >
                        Cập Nhật
                    </Button>
                    <Button
                        className="w-full"
                        color="red"
                        variant="outlined"
                        onClick={handleClose}
                    >
                        Đóng
                    </Button>
                </div>
            </Card>
        );
    }
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
                    <a
                        href={`${host}`}
                        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium "
                    >
                        <ApplicationLogo />
                    </a>

                    <NavList />
                </div>
                <div className="flex flex-row items-center">
                    <CardMain dateCheck={check} />
                    <a href={`${host}lich-huy`} className="font-normal">
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
                    </a>
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
                            {jobs.length}
                        </Typography>
                    </Card>

                    <Dialog
                        className={`w-full  2xl:min-w-[65%] lg:min-w-[65%] h-[${height}px]`}
                        open={openWorker}
                        handler={handleOpenWorker}
                    >
                        <DialogBody
                            className={`w-full h-[${height}px]`}
                            style={{ height: `${height}px` }}
                        >
                            <div className={`overflow-y-scroll w-full h-full`}>
                                <div className="w-full">
                                    <div className="flex flex-row items-center justify-between w-full p-1 font-bold text-white bg-blue-500">
                                        <Typography
                                            variant="h5"
                                            className="p-1"
                                        >
                                            Thợ Đi Làm
                                        </Typography>
                                        <div className="flex flex-row justify-between">
                                            {/* <span className="pr-3">
                                                :
                                                <span className="ml-1 px-4 py-[-1] bg-green-500 border">
                                                    {" "}
                                                </span>
                                            </span> */}
                                            <span>
                                                Thiếu Lịch:
                                                <span className=" ml-1 px-4 py-[-1] bg-red-500 border"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-7">
                                        {jobCategories.map(({ code }) =>
                                            renderWorkerGroup(
                                                code,
                                                0
                                                // handleOpenSpending
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Typography className="w-full p-1 font-bold text-center text-white bg-blue-500">
                                        Thợ nghỉ phép
                                    </Typography>
                                    <div className="grid grid-cols-7">
                                        {jobCategories.map(({ code }) =>
                                            renderWorkerGroup(
                                                code,
                                                1,
                                                handleOpenSpending
                                            )
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
                    <ProfileMenu
                        propauthprofile={propauth}
                        socket={socketCard}
                    />
                </div>
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll ">
                <NavList />
            </Collapse>
        </Navbar>
    );
}
export default memo(NavbarDefault);
