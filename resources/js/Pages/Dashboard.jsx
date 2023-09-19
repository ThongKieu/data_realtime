import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState, memo, useRef } from "react";
import Select from "react-select";
import {
    Button,
    Card,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    Textarea,
    DialogFooter,
    Input,
    Tooltip,Spinner
} from "@material-tailwind/react";
// -------
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
// -----
import {
    TrashIcon,
    PlusCircleIcon,
    PencilSquareIcon,
    XCircleIcon,
    EyeIcon,
    ArrowPathIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import newSocket from "@/Utils/socket";
import { host } from "@/Utils/UrlApi";

var dataNew = [
    {
        id: 1,
        yccv: "1",
        diaChi: "1",
        quan: "1",
        sdt: "1",
        KTV: "1",
        status_cus: "0",
    },
];
var data_done = [
    {
        id: 19,
        id_cus: 25,
        id_worker: 1,
        id_phu: 0,
        real_note: null,
        spending_total: 0,
        income_total: 0,
        bill_imag: null,
        status_work: 0,
        check_in: 0,
        seri_number: null,
        work_content: "Sửa máy  lạnh",
        date_book: "2023-09-19",
        street: "sư vạn hạnh",
        district: "q1",
        phone_number: 947613923,
        image_work_path: null,
        kind_work: 0,
        worker_firstname: "Test",
        worker_name: "Manh DN",
        sort_name: "A01",
        add_worker: null,
    },
];
// ----------------test options -----

function Dashboard({ auth }) {
    const [socketD, setSocketD] = useState(null);
    const [message, setMessage] = useState(auth.user.id);
    // table left
    const [workDataDN, setWorkDataDN] = useState(dataNew);
    const [workDataDL, setWorkDataDL] = useState(dataNew);
    const [workDataDG, setWorkDataDG] = useState(dataNew);
    const [workDataNLMT, setWorkDataNLMT] = useState(dataNew);
    const [workDataXD, setWorkDataXD] = useState(dataNew);
    const [workDataVC, setWorkDataVC] = useState(dataNew);
    const [workDataHX, setWorkDataHX] = useState(dataNew);
    // table right
    const [workDataDN_done, setWorkDataDN_done] = useState(data_done);
    const [workDataDL_done, setWorkDataDL_done] = useState(data_done);
    const [workDataDG_done, setWorkDataDG_done] = useState(data_done);
    const [workDataNLMT_done, setWorkDataNLMT_done] = useState(data_done);
    const [workDataXD_done, setWorkDataXD_done] = useState(data_done);
    const [workDataVC_done, setWorkDataVC_done] = useState(data_done);
    const [workDataHX_done, setWorkDataHX_done] = useState(data_done);
    // end ---------------
    // thong tin tho inforworker

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setSocketD(newSocket, { secure: true });
        fetchData();
        fetchDataDaPhan();
        fetchInfoWorker();
        // lắng nghe server
        newSocket.on("sendAddWorkTo_Client", (data) => {
            if (data != "" ) {
                fetchData(data);
                fetchDataDaPhan(data);
                fetchDataDashboard(data);
                setIsLoading(false);
            }

        });
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socketD) {
            socketD.emit("pushOnline", message);
            pushOn();
            console.log("User is online",message);
        }
    }, [socketD]);
    const pushOn = async (data) => {
        try {
            let data = {
                ac: 1,
                id: auth.user.id,
            };
            const response = await fetch("api/web/push-online", {
                method: "POST",
                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
            });
            if ((response.status = 200)) {
                console.log("push on thanh cong");
            }
        } catch (error) {}
    };
    // ----------------
    const fetchData = async () => {
        try {
            const response = await fetch("api/web/works");
            const jsonData = await response.json();
            setWorkDataDN(jsonData.dien_nuoc);
            setWorkDataDL(jsonData.dien_lanh);
            setWorkDataDG(jsonData.do_go);
            setWorkDataNLMT(jsonData.nlmt);
            setWorkDataXD(jsonData.xay_dung);
            setWorkDataVC(jsonData.tai_xe);
            setWorkDataHX(jsonData.co_khi);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchDataDaPhan = async () => {
        try {
            const response = await fetch("/api/web/work-assignment/all");
            const jsonData = await response.json();

            setWorkDataDN_done(jsonData.dien_nuoc_done);
            setWorkDataDL_done(jsonData.dien_lanh_done);
            setWorkDataDG_done(jsonData.do_go_done);
            setWorkDataNLMT_done(jsonData.nlmt_done);
            setWorkDataXD_done(jsonData.xay_dung_done);
            setWorkDataVC_done(jsonData.tai_xe_done);
            setWorkDataHX_done(jsonData.co_khi_done);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // get thong tin tho
    const [infoWorkerDashboard, setInfoWorkerDashboard] = useState("");
    const fetchInfoWorker = async (e) => {
        try {
            const response = await fetch(host + "api/web/workers");
            const jsonData = await response.json();
            const formatJson = jsonData.map((item) => ({
                value: item.id,
                label: item.worker_name,
            }));
            setInfoWorkerDashboard(formatJson);
            console.log(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // fetchInfoWorker();
    // ------------------option select thong tin tho  ---------------
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    var heightScreenTV = screenSize.height;

    // -----------------------------handle---------------------------
    const [rowModesModel, setRowModesModel] = useState({});
    // --------------------------------column -------------------------
    const fetchDataDashboard = async (data) => {
        try {
            const res = await fetch("api/web/update/work", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                console.log("Sửa thong tin lịch chưa phân");
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const columns = [
        {
            field: "work_content",
            headerName: "yêu Cầu Công Việc",
            width: 140,
            editable: true,
            renderCell: (params) => {
                const [workInputChange, setWorkInputChange] = useState(
                    params.value
                );
                const inputRef = useRef(null);
                const data = {
                    ac: "1",
                    id: params.id,
                    work_content: workInputChange,
                };
                const handleInputChange = (e) => {
                    setWorkInputChange(e.target.value);
                };
                const updateWorkContent = (e) => {
                    if (e.keyCode === 13 && !e.shiftKey) {
                        e.preventDefault();
                        fetchDataDashboard(data);
                        socketD.emit("addWorkTo_Server", JSON.stringify(data));
                        inputRef.current.blur();
                    }
                };
                return (
                    <Tooltip content={params.value}>
                        <Input
                            type="text"
                            ref={inputRef}
                            value={workInputChange}
                            className="min-w-full bg-white border-none rounded-none outline-none pointer-events-auto "
                            onChange={handleInputChange}
                            onKeyDown={updateWorkContent}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </Tooltip>
                );
            },
        },
        {
            field: "work_note",
            headerName: "Ghi Chú",
            width: 140,
            editable: true,
        },
        {
            field: "street",
            headerName: "Địa Chỉ",
            type: "text",
            width: 150,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "district",
            headerName: "Quận",
            type: "text",
            width: 50,
            editable: true,
        },
        {
            field: "phone_number",
            headerName: "Số Điện thoại",
            width: 110,
            editable: true,
            type: "text",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Chức Năng",
            width: 100,
            editable: false,
            cellClassName: "actions",
            renderCell: (params) => {
                const [open, setOpen] = useState(false);
                const handleOpen = () => setOpen(!open);
                const [openTho, setOpenTho] = useState(false);
                const handleOpenTho = () => setOpenTho(!openTho);
                const [work_note, setWorkNote] = useState();
                const [selectPhanTho, setSelectPhanTho] = useState("");
                const handleSelectChange = (selectedValue) => {
                    setSelectPhanTho(selectedValue); // Cập nhật giá trị được chọn trong state
                };
                console.log("-----------", selectPhanTho);
                const handleSentDelete = async () => {
                    try {
                        let data = {
                            id: params.id,
                            work_note: work_note,
                        };

                        const response = await fetch("api/web/works_cacle", {
                            method: "POST",
                            body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                            headers: {
                                "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                            },
                        });
                        if (response.ok) {
                            // socketD.emit("addWorkTo_Server", "xoalich");
                            handleOpen();
                        }
                    } catch (error) {
                        console.log("Lỗi:", error);
                    }
                };

                const handleSentPhanTho = async (e) => {
                    try {
                        let data = {
                            id_cus: params.row.id,
                            id_worker: selectPhanTho,
                            work_note: params.row.work_note,
                        };
                        const response = await fetch(
                            "api/web/work-assignment",
                            {
                                method: "POST",
                                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                                headers: {
                                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                                },
                            }
                        );
                        if (response.ok) {
                            // socketD.emit("addWorkTo_Server", "xoalich");
                            handleOpenTho();
                        }
                    } catch (error) {
                        console.log("lixo", error);
                    }
                };
                return (
                    <div>
                        <div className="flex">
                            <UserPlusIcon
                                className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                                onClick={handleOpenTho}
                            />
                            <TrashIcon
                                className="w-8 h-8 p-1 mr-2 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                                onClick={handleOpen}
                            />
                        </div>
                        <Dialog
                            open={openTho}
                            handler={handleOpenTho}
                            className="lg:min-w-52"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>Lựa Chọn Thợ</DialogHeader>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3"
                                    onClick={handleOpenTho}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <DialogBody divider>
                                <Select
                                    value={selectPhanTho}
                                    options={infoWorkerDashboard}
                                    onChange={(selectedValue) =>
                                        handleSelectChange(selectedValue)
                                    }
                                    isMulti
                                    className="border-none shadow-none"
                                />
                            </DialogBody>
                            <DialogFooter className="space-x-2">
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleSentPhanTho}
                                >
                                    Phân Thợ
                                </Button>
                            </DialogFooter>
                        </Dialog>
                        <Dialog open={open} handler={handleOpen}>
                            <div className="flex items-center justify-between">
                                <DialogHeader>Lý do hủy</DialogHeader>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3"
                                    onClick={handleOpen}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <DialogBody divider>
                                <div className="grid gap-6">
                                    {/* <input type="text" value={params.id} /> */}
                                    <Textarea
                                        label="Lý do hủy"
                                        className="shadow-none"
                                        onChange={(e) =>
                                            setWorkNote(e.target.value)
                                        }
                                    />
                                </div>
                            </DialogBody>
                            <DialogFooter className="space-x-2">
                                <Button
                                    variant="gradient"
                                    color="red"
                                    onClick={handleSentDelete}
                                >
                                    Xác nhận
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </div>
                );
            },
        },
    ];
    const columnsRight = [
        {
            field: "work_content",
            headerName: "yêu cầu công việc",
            width: 140,
            editable: true,
        },
        {
            field: "street",
            headerName: "Địa Chỉ",
            type: "text",
            width: 150,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "district",
            headerName: "Quận",
            type: "text",
            width: 40,
            editable: true,
        },
        {
            field: "phone_number",
            headerName: "Số Điện thoại",
            width: 100,
            editable: true,
            type: "text",
        },
        {
            field: "date_book",
            headerName: "Ngày Làm",
            type: "text",
            width: 80,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "BH",
            headerName: "BH",
            width: 30,
            editable: true,
            type: "text",
        },
        {
            field: "worker_name",
            headerName: "Thợ",
            width: 80,
            editable: true,
            type: "singleSelect",
        },
        {
            field: "spending_total",
            headerName: "Chi",
            width: 100,
            editable: true,
            type: "text",
        },
        {
            field: "income_total",
            headerName: "Thu",
            width: 100,
            editable: true,
            type: "text",
        },
        {
            field: "seri_number",
            headerName: "Phiếu Thu",
            width: 100,
            editable: true,
            type: "text",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Chức Năng",
            width: 150,
            editable: false,
            cellClassName: "actions",
            renderCell: (params) => {
                // console.log(params);
                const [open, setOpen] = useState(false);
                const handleOpen = () => setOpen(!open);
                const [openTho, setOpenTho] = useState(false);
                const handleOpenTho = () => setOpenTho(!openTho);
                const [work_note, setWorkNote] = useState();
                const [selectPhanTho, setSelectPhanTho] = useState(null);
                const handleSelectChange = (selectedValue) => {
                    setSelectPhanTho(selectedValue); // Cập nhật giá trị được chọn trong state
                };
                // console.log('-----------', selectPhanTho);
                const handleSentDelete = async () => {
                    try {
                        let data = {
                            id: params.id,
                            work_note: work_note,
                        };

                        const response = await fetch("api/web/works_cacle", {
                            method: "POST",
                            body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                            headers: {
                                "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                            },
                        });
                        if (response.ok) {
                            // socketD.emit("addWorkTo_Server", "xoalich");
                            handleOpen();
                        }
                    } catch (error) {}
                };

                const handleSentPhanTho = async (e) => {
                    console.log("selectPhanTho", selectPhanTho.value);
                    try {
                        let data = {
                            id_works: params.row.id,
                            id_worker: selectPhanTho,
                            work_note: params.row.work_note,
                        };
                        console.log("handleSentPhanTho", data);
                        const response = await fetch(
                            "api/web/work-assignment",
                            {
                                method: "POST",
                                body: data, // Gửi dữ liệu dưới dạng JSON
                                headers: {
                                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                                },
                            }
                        );
                        if (response.ok) {
                            // socketD.emit("addWorkTo_Server", "xoalich");
                            handleOpenTho();
                            console.log("handleSentPhanTho1", data);
                        } else {
                            console.log("chua dau");
                        }
                    } catch (error) {
                        console.log("lixo", error);
                    }
                };
                return (
                    <div>
                        <div className="flex">
                            <Tooltip content="Admin Check">
                                <EyeIcon className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white" />
                            </Tooltip>
                            <Tooltip content="Thu Hồi Lịch">
                                <ArrowPathIcon className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white" />
                            </Tooltip>
                            <Tooltip content="Hủy Lịch">
                                <TrashIcon
                                    className="w-8 h-8 p-1 mr-2 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                                    onClick={handleOpen}
                                />
                            </Tooltip>
                        </div>
                        <Dialog open={openTho} handler={handleOpenTho}>
                            <div className="flex items-center justify-between">
                                <DialogHeader>Lựa Chọn Thợ</DialogHeader>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3"
                                    onClick={handleOpenTho}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <DialogBody divider>
                                <Select
                                    value={selectPhanTho}
                                    options={infoWorkerDashboard}
                                    onChange={(selectedValue) =>
                                        handleSelectChange(selectedValue)
                                    }
                                    isMulti
                                    className="shadow-none"
                                />
                            </DialogBody>
                            <DialogFooter className="space-x-2">
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleSentPhanTho}
                                >
                                    Phân Thợ
                                </Button>
                            </DialogFooter>
                        </Dialog>
                        <Dialog open={open} handler={handleOpen}>
                            <div className="flex items-center justify-between">
                                <DialogHeader>Lý do hủy</DialogHeader>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3"
                                    onClick={handleOpen}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <DialogBody divider>
                                <div className="grid gap-6">
                                    {/* <input type="text" value={params.id} /> */}
                                    <Textarea
                                        label="Lý do hủy"
                                        className="shadow-none"
                                        onChange={(e) =>
                                            setWorkNote(e.target.value)
                                        }
                                    />
                                </div>
                            </DialogBody>
                            <DialogFooter className="space-x-2">
                                <Button
                                    variant="gradient"
                                    color="red"
                                    onClick={handleSentDelete}
                                >
                                    Xác nhận
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </div>
                );
            },
        },
    ];
    // ----------------------------------------------------------------------------
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang Chủ" />
            <div
                className={`grid w-full  grid-flow-col overflow-scroll auto-cols-max mt-1 `}
                style={{ height: `${heightScreenTV}px` }}
            >
                <Card
                    className={
                        "grid w-full grid-flow-col overflow-scroll  auto-cols-max mt-1 text-white rounded-none"
                    }
                >
                    <div>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Điện Nước
                        </Typography>
                        {/* bang ben trai  */}
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataDN}
                                columns={columns}
                                editMode="row"
                                rowModesModel={rowModesModel}
                                hideFooterPagination={true}
                                slotProps={{
                                    className: "text-center",
                                }}
                            />
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Điện Lạnh
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataDL}
                                columns={columns}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Điện Gỗ
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataDG}
                                columns={columns}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Năng Lượng Mặt Trời
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataNLMT}
                                columns={columns}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Xây Dựng
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataXD}
                                columns={columns}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Vận Chuyển
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataVC}
                                columns={columns}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Cơ Khí
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataHX}
                                columns={columns}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />
                        </Box>
                    </div>
                </Card>

                <Card
                    className={
                        "grid w-full grid-flow-col overflow-scroll auto-cols-max mt-1 text-white rounded-none"
                    }
                >
                    <div>
                        <Typography className="w-[110vh] p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Điện Nước
                        </Typography>

                        <Box >
                            {isLoading ? (
                              <div className="flex justify-center p-2 align-middle ">
                                 <Spinner className="w-6 h-6" color="amber" />
                                 <p className="pl-2 text-center text-black" >
                                   Loading...
                                </p>
                              </div>
                            ) : (
                                <DataGrid
                                    rows={workDataDN_done}
                                    columns={columnsRight}
                                    editMode="row"
                                    rowModesModel={rowModesModel}
                                    hideFooterPagination={true}
                                />
                            )}
                        </Box>

                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Điện Lạnh
                        </Typography>
                        <Box >
                            {isLoading ? (
                              <div className="flex justify-center p-2 align-middle ">
                                 <Spinner className="w-6 h-6" color="amber" />
                                 <p className="pl-2 text-center text-black" >
                                   Loading...
                                </p>
                              </div>
                            ) : (
                            <DataGrid
                                rows={workDataDL_done}
                                columns={columnsRight}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />)}
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Đồ Gỗ
                        </Typography>
                        <Box >
                            {isLoading ? (
                              <div className="flex justify-center p-2 align-middle ">
                                 <Spinner className="w-6 h-6" color="amber" />
                                 <p className="pl-2 text-center text-black" >
                                   Loading...
                                </p>
                              </div>
                            ) : (
                            <DataGrid
                                rows={workDataDG_done}
                                columns={columnsRight}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />)}
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Năng Lượng Mặt Trời
                        </Typography>
                        <Box >
                            {isLoading ? (
                              <div className="flex justify-center p-2 align-middle ">
                                 <Spinner className="w-6 h-6" color="amber" />
                                 <p className="pl-2 text-center text-black" >
                                   Loading...
                                </p>
                              </div>
                            ) : (
                            <DataGrid
                                rows={workDataNLMT_done}
                                columns={columnsRight}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />)}
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Xây Dựng
                        </Typography>
                        <Box >
                            {isLoading ? (
                              <div className="flex justify-center p-2 align-middle ">
                                 <Spinner className="w-6 h-6" color="amber" />
                                 <p className="pl-2 text-center text-black" >
                                   Loading...
                                </p>
                              </div>
                            ) : (
                            <DataGrid
                                rows={workDataXD_done}
                                columns={columnsRight}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />)}
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Vận Chuyển
                        </Typography>
                        <Box >
                            {isLoading ? (
                              <div className="flex justify-center p-2 align-middle ">
                                 <Spinner className="w-6 h-6" color="amber" />
                                 <p className="pl-2 text-center text-black" >
                                   Loading...
                                </p>
                              </div>
                            ) : (
                            <DataGrid
                                rows={workDataVC_done}
                                columns={columnsRight}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />)}
                        </Box>
                        <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                            Cơ Khí
                        </Typography>
                        <Box >
                            {isLoading ? (
                              <div className="flex justify-center p-2 align-middle ">
                                 <Spinner className="w-6 h-6" color="amber" />
                                 <p className="pl-2 text-center text-black" >
                                   Loading...
                                </p>
                              </div>
                            ) : (
                            <DataGrid
                                rows={workDataHX_done}
                                columns={columnsRight}
                                editMode="row"
                                rowModesModel={rowModesModel}
                            />)}
                        </Box>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

export default memo(Dashboard);
