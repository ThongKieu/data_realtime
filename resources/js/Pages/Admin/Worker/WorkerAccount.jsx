import { React, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
import { Divider } from "@mui/material";

const TABS = [

    {
        label: "Điện Nước",
        value: "DN",
    },
    {
        label: "Điện Lạnh",
        value: "monitored",
    },
    {
        label: "Đồ Gỗ",
        value: "DG",
    },
    {
        label: "NLMT",
        value: "NLMT",
    },
    {
        label: "Xây Dựng",
        value: "XD",
    },
    {
        label: "Tài Xế",
        value: "TD",
    },
    {
        label: "Cơ Khí",
        value: "CK",
    },



];

const TABLE_HEAD = [
    "Tên Thợ",
    "Tài Khoản",
    "Đăng Nhập Lần Cuối",
    "ID Điện Thoại",
    "Đăng Nhập Sai",
    "Trạng Thái",
    "Sửa Tài Khoản",
    "Đổi Mật Khẩu",
];

function WorkerAccount() {
    const [accountData, setAccountData] = useState([]);
    const handleClick = () => {
        console.log(accountData);
    };

    const [openDialogIndex, setOpenDialogIndex] = useState(null); // State array to manage dialog open/close for each row

    const handleClickOpenFix = (index) => { // Function to open dialog for a specific row
        setOpenDialogIndex(index);
    };

    const [openDialogIndexDel, setOpenDialogIndexDel] = useState(null); // State array to manage dialog open/close for each row

    const handleClickOpenDel = (index) => { // Function to open dialog for a specific row
        setOpenDialogIndexDel(index);
    };
    const [infoFix, setInfoFix] = useState({
        id_worker: 1,
        acc_worker:'',

    });
    const handleSentFix = () => {
        setOpenDialogIndex(null);

    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInfoFix(...accountData,{ [name]: value });
        console.log('accountData',accountData);
    }
    // console.log(infoFix);
    useEffect(() => {
        fetch(host + "api/web/workers/account")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error Status Network");
                }
                return response.json();
            })
            .then((data) => {
                setAccountData(data);
            })
            .catch((error) => {
                console.error("Error API:", error);
            });
    }, []);
    // console.log(accountData);
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Tài khoản thợ" />
            <Card className="w-full h-screen">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        className="w-fit"
                                    >
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                }
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0 overflow-scroll">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{" "}

                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {accountData.map((item, index) => {
                                const isLast = index === accountData.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={`${host + item.avatar}`}
                                                    alt={item.id_worker}
                                                    size="sm"
                                                />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item.worker_full_name}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal "
                                            >
                                                {item.acc_worker}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item.last_active != null
                                                    ? item.last_active
                                                    : "Chưa đăng nhập"}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item.device_key != null
                                                    ? item.device_key
                                                    : "Chưa đăng nhập"}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal "
                                            >
                                                {item.time_log}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div
                                                className="w-max"
                                                onClick={handleClick}
                                            >
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value="Trạng thái"
                                                    color="green"
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>

                                            <div className="w-max" onClick={() => handleClickOpenFix(index)}>
                                                <Chip variant="ghost" size="sm" value="Sửa tài khoản" color="deep-purple" />
                                            </div>
                                            <Dialog open={openDialogIndex === index} onClose={() => setOpenDialogIndex(null)}>
                                                <DialogHeader>Thông tin tài khoản của {item.worker_full_name}</DialogHeader>
                                                <Divider></Divider>
                                                <DialogBody>
                                                    <Input
                                                        label="Tên Thợ"
                                                        // value={infoFix.acc_worker}
                                                        name="acc_worker"
                                                        id="acc_worker"
                                                        defaultValue={item.acc_worker}
                                                        className="shadow-none"
                                                        onChange={handleOnChange}
                                                    />
                                                    <input
                                                        // value={infoFix.id_worker}
                                                        name="id_worker"
                                                        id="id_worker"
                                                        defaultValue={item.id_worker}
                                                        className="hidden"
                                                        onChange={handleOnChange}

                                                    />
                                                </DialogBody>
                                                <Divider></Divider>
                                                <DialogFooter>
                                                    <Button variant="text" color="red" onClick={() => setOpenDialogIndex(null)}>Cancel</Button>
                                                    <Button variant="gradient" color="green" onClick={() => handleSentFix()}>Confirm</Button>
                                                </DialogFooter>
                                            </Dialog>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max" onClick={() => handleClickOpenDel(index)}>
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value="Xoá tài khoản"
                                                    color="red"
                                                />

                                            </div>
                                            <Dialog open={openDialogIndexDel === index} onClose={() => setOpenDialogIndexDel(null)}>
                                                <DialogHeader>Xóa tài khoản của {item.worker_full_name}</DialogHeader>
                                                <DialogBody>
                                                    '1'
                                                </DialogBody>
                                                <DialogFooter>
                                                    <Button variant="text" color="red" onClick={() => setOpenDialogIndexDel(null)}>Cancel</Button>
                                                    <Button variant="gradient" color="green" onClick={() => setOpenDialogIndexDel(null)}>Confirm</Button>
                                                </DialogFooter>
                                            </Dialog>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </AuthenticatedLayoutAdmin>
    );
}

export default WorkerAccount;
