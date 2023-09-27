import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState, useRef } from "react";
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
    Tooltip,
    Spinner,
} from "@material-tailwind/react";
// -------
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
// -----
import {
    TrashIcon,
    EyeIcon,
    ArrowPathIcon,
    UserPlusIcon,
    DocumentDuplicateIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import newSocket from "@/Utils/socket";
import { host } from "@/Utils/UrlApi";
import { url_API, url_API_District } from "@/data/UrlAPI/UrlApi";
import { data } from "autoprefixer";
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
function Dashboard({ auth }) {
    const [socketD, setSocketD] = useState();
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
    // ---------------------------- thoi gian thuc su dung socket -------------------------
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setSocketD(newSocket, { secure: true });
        fetchData();
        fetchDataDaPhan();
        fetchInfoWorker();
        // lắng nghe server
        newSocket.on("sendAddWorkTo_Client", (data) => {
            console.log("hell", data);
            if (data != "") {
                fetchDataDashboard(data);
                fetchData(data);
                fetchDataDaPhan(data);
            }
        });
        return () => {
            newSocket.disconnect();
        };
    }, []);
    // --------------------------kiem tra socket io tai khoan online -----------------------------
    useEffect(() => {
        if (socketD) {
            socketD.emit("pushOnline", message);
            pushOn();
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
            if (response.status == 200) {
                console.log("push on thanh cong");
            }
        } catch (error) {}
    };
    // ---------------lay du lieu cong viec chua phan----------------------------------------------
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
    const fetchDateCheck = async (dateCheck) => {
        try {
            const response = await fetch(
                `api/web/works?dateCheck=${dateCheck}`
            );
            const jsonData = await response.json();
            setWorkDataDN(jsonData.dien_nuoc);
            setWorkDataDL(jsonData.dien_lanh);
            setWorkDataDG(jsonData.do_go);
            setWorkDataNLMT(jsonData.nlmt);
            setWorkDataXD(jsonData.xay_dung);
            setWorkDataVC(jsonData.tai_xe);
            setWorkDataHX(jsonData.co_khi);
            console.log("HDHDHDHDHD", jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // --------------------------- lay du lieu lich da phan ----------------------------------
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
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // ----------------------------lay thong tin tho ----------------------------
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
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // -----------------lay kich thuoc man hinh reponsive bang---------------
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    var heightScreenTV = screenSize.height;

    // -----------------------------fetch api update du lieu trong bang---------------------------
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
                socketD?.emit("addWorkTo_Server", data);
                console.log("socketD", socketD);
                console.log("newSocket ahihi", newSocket);
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data lỗi rồi:", error);
        }
    };
    // ---------------------su dung nut di chuyen trong bang--------------------
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
    const handleKeyPress = (e) => {
        const { row, col } = selectedCell;

        switch (e.key) {
            case "ArrowUp":
                setSelectedCell({ row: Math.max(row - 1, 0), col });
                break;
            case "ArrowDown":
                setSelectedCell({
                    row: Math.min(row + 1, rows.length - 1),
                    col,
                });
                break;
            case "ArrowLeft":
                setSelectedCell({ row, col: Math.max(col - 1, 0) });
                break;
            case "ArrowRight":
                setSelectedCell({
                    row,
                    col: Math.min(col + 1, columns.length - 1),
                });
                break;
            default:
                break;
        }
    };
    // du lieu bang cong viec chua phan ------------------------------------
    const columns = [
        {
            field: "work_content",
            headerName: "yêu Cầu Công Việc",
            width: 140,
            editable: true,
            tabindex: 0,
            renderEditCell: (params) => (
                <input
                    type="text"
                    defaultValue={params.row.work_content}
                    className=" bg-white border-none rounded-none outline-none w-[137px]"
                    labelProps={{
                        className: "hidden",
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Tab") {
                            const newValue = e.target.value;
                            const data = {
                                ac: "1",
                                id: params.id,
                                work_content: newValue,
                            };
                            // Gọi hàm xử lý cập nhật dữ liệu lên máy chủ
                            fetchDataDashboard(data);
                        }
                    }}
                />
            ),
        },
        {
            field: "work_note",
            headerName: "Ghi Chú",
            width: 140,
            editable: true,
            tabindex: 0,
            renderEditCell: (params) => (
                <Input
                    type="text"
                    defaultValue={params.row.work_note}
                    className=" bg-white border-none rounded-none outline-none w-[137px]"
                    labelProps={{
                        className: "hidden",
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Tab") {
                            const newValue = e.target.value;
                            const data = {
                                ac: "2",
                                id: params.id,
                                work_note: newValue,
                            };
                            // Gọi hàm xử lý cập nhật dữ liệu lên máy chủ
                            fetchDataDashboard(data);
                        }
                    }}
                />
            ),
        },
        {
            field: "street",
            headerName: "Địa Chỉ",
            type: "text",
            width: 150,
            align: "left",
            headerAlign: "left",
            editable: true,
            renderEditCell: (params) => (
                <Input
                    type="text"
                    defaultValue={params.row.street}
                    className=" bg-white border-none rounded-none outline-none w-[137px]"
                    labelProps={{
                        className: "hidden",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Tab") {
                            const newValue = e.target.value;
                            const data = {
                                ac: "3",
                                id: params.id,
                                street: newValue,
                            };
                            // Gọi hàm xử lý cập nhật dữ liệu lên máy chủ
                            fetchDataDashboard(data);
                        }
                    }}
                />
            ),
        },
        {
            field: "district",
            headerName: "Quận",
            type: "text",
            width: 50,
            editable: true,
            renderEditCell: (params) => (
                <Input
                    type="text"
                    defaultValue={params.row.district}
                    className=" bg-white border-none rounded-none outline-none w-[50px]"
                    labelProps={{
                        className: "hidden",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Tab") {
                            const newValue = e.target.value;
                            const data = {
                                ac: "4",
                                id: params.id,
                                district: newValue,
                            };
                            // Gọi hàm xử lý cập nhật dữ liệu lên máy chủ
                            fetchDataDashboard(data);
                        }
                    }}
                />
            ),
        },
        {
            field: "phone_number",
            headerName: "Số Điện thoại",
            width: 110,
            editable: true,
            type: "text",
            renderEditCell: (params) => (
                <Input
                    type="text"
                    defaultValue={params.row.phone_number}
                    className=" bg-white border-none rounded-none outline-none w-[137px]"
                    labelProps={{
                        className: "hidden",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Tab") {
                            const newValue = e.target.value;
                            const data = {
                                ac: "5",
                                id: params.id,
                                phone_number: newValue,
                            };
                            // Gọi hàm xử lý cập nhật dữ liệu lên máy chủ
                            fetchDataDashboard(data);
                        }
                    }}
                />
            ),
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
                // console.log('params params :',params, auth);
                const handleSentDelete = async () => {
                    try {
                        let data = {
                            id: params.id,
                            id_auth: auth.user.id,
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
                            socketD.emit("addWorkTo_Server", "xoalich");
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
                            socketD.emit("addWorkTo_Server", "Phan Tho");
                            handleCopyToClipboard(params.row)
                            handleOpenTho();
                        }
                    } catch (error) {
                        console.log("lixo", error);
                    }
                };
                const handleSentNhanDoi = async (e) => {
                    // Lấy dữ liệu từ params.row
                    const originalData = params.row;

                    // Tạo bản sao của dữ liệu ban đầu và đặt ID thành null (hoặc một giá trị mới nếu cần)
                    const duplicatedData = { ...originalData, id: null };

                    try {
                        const response = await fetch(host + url_API, {
                            method: "POST",
                            body: JSON.stringify(duplicatedData), // Gửi dữ liệu mới lên máy chủ
                            headers: {
                                "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                            },
                        });

                        if (response.ok) {
                            socketD.emit("addWorkTo_Server", duplicatedData);
                            console.log("Đã nhân đôi dữ liệu:", duplicatedData);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };

                const handleCopyToClipboard = (text) => {
                    const work_content = text.work_content;
                    const street = text.street;
                    const phone_number = text.phone_number;
                    const name_cus = text.name_cus;
                    const district = text.district;
                    const work_note = text.work_note;
                    const data = `${work_content ? work_content + " " : ""} ${
                        street ? street + " " : ""
                    } ${phone_number ? phone_number + " " : ""} ${
                        name_cus ? name_cus + " " : ""
                    } ${district ? district + " " : ""} ${work_note ? work_note + " " : ""} `;

                    const textarea = document.createElement('textarea');
                    textarea.value = data;
                    document.body.appendChild(textarea);

                    textarea.select();

                    console.log('tam tai',document.execCommand);
                    document.body.removeChild(textarea);

                    // alert('Đã sao chép vào clipboard: ' + data);
                    console.log('Đã sao chép vào clipboard: ' + data);
                  };
                return (
                    <div>
                        <div className="flex">
                            <Tooltip content="Phân Thợ">
                                <UserPlusIcon
                                    className="w-8 h-8 p-1 mr-1 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                                    onClick={handleOpenTho}
                                />
                            </Tooltip>
                            <Tooltip content="Hủy Lịch">
                                <TrashIcon
                                    className="w-8 h-8 p-1 mr-1 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                                    onClick={handleOpen}
                                />
                            </Tooltip>
                            <Tooltip content="Nhân Đôi">
                                <DocumentDuplicateIcon
                                    className="w-8 h-8 p-1 mr-1 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                    onClick={handleSentNhanDoi}
                                />
                            </Tooltip>
                            {/* <Tooltip content="Sao Chép">
                                <DocumentDuplicateIcon
                                    className="w-8 h-8 p-1 mr-1 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                    onClick={() => handleCopyToClipboard(params.row)}
                                />
                            </Tooltip> */}
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
                                    className="border-none shadow-none qqq"
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
    // du lieu bang cong viec da phan ------------------------------------
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
                            socketD.emit("addWorkTo_Server", "xoalich");
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

    // -----------------------------Dinh dang lai ngay-----------------------------------------------
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedToday = `${year}-${month}-${day}`;

    const [selectedDate, setSelectedDate] = useState(formattedToday);
    const handleSearch = async () => {
        fetchDateCheck(selectedDate);
    };
    const handleDateChange = async (event) => {
        setSelectedDate(event.target.value);

    };
    // ----------------------------nut scrollView trong bang --------------------------
    const DN = useRef(null);
    const DL = useRef(null);
    const DG = useRef(null);
    const NLMT = useRef(null);
    const XD = useRef(null);
    const VC = useRef(null);
    const HX = useRef(null);
    const scrollView = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    // ----------------------------ket thuc nut scrollView trong bang --------------------------
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang Chủ" />
            <div
                className={`grid w-full grid-flow-col overflow-scroll mt-1 pl-3`}
                style={{ height: `${heightScreenTV}px` }}
            >
                <Card
                    className={
                        "grid w-full grid-flow-col overflow-scroll mt-1 text-white rounded-none"
                    }
                >
                    <div>
                        <Typography
                            className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium"
                            ref={DN}
                        >
                            Điện Nước
                        </Typography>
                        {/* bang ben trai  */}
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataDN}
                                columns={columns}
                                hideFooterPagination={true}
                                slotProps={{
                                    className: "text-center",
                                }}
                                onKeyDown={handleKeyPress}
                                cellClassName={(params) =>
                                    selectedCell.row === params.rowIndex &&
                                    selectedCell.col === params.colIndex
                                        ? "selected-cell"
                                        : ""
                                }
                            />
                        </Box>
                        <Typography
                            className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium"
                            ref={DL}
                        >
                            Điện Lạnh
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataDL}
                                columns={columns}
                                hideFooterPagination={true}
                                slotProps={{
                                    className: "text-center",
                                }}
                            />
                        </Box>
                        <Typography
                            className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium"
                            ref={DG}
                        >
                            Điện Gỗ
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataDG}
                                columns={columns}
                                hideFooterPagination={true}
                                slotProps={{
                                    className: "text-center",
                                }}
                            />
                        </Box>
                        <Typography
                            className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium"
                            ref={NLMT}
                        >
                            Năng Lượng Mặt Trời
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataNLMT}
                                columns={columns}
                                hideFooterPagination={true}
                                slotProps={{
                                    className: "text-center",
                                }}
                            />
                        </Box>
                        <Typography
                            className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium"
                            ref={XD}
                        >
                            Xây Dựng
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataXD}
                                columns={columns}
                                hideFooterPagination={true}
                                slotProps={{
                                    className: "text-center",
                                }}
                            />
                        </Box>
                        <Typography
                            className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium"
                            ref={VC}
                        >
                            Vận Chuyển
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataVC}
                                columns={columns}
                                hideFooterPagination={true}
                                slotProps={{
                                    className: "text-center",
                                }}
                            />
                        </Box>
                        <Typography
                            className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium"
                            ref={HX}
                        >
                            Cơ Khí
                        </Typography>
                        <Box sx={{ width: 1 }}>
                            <DataGrid
                                rows={workDataHX}
                                columns={columns}
                                hideFooterPagination={true}
                                slotProps={{
                                    className: "text-center",
                                }}
                            />
                        </Box>
                    </div>
                </Card>

                <Card
                    className={
                        "grid w-full grid-flow-col overflow-scroll mt-1 text-white rounded-none"
                    }
                >
                    {isLoading ? (
                        <div className="flex justify-center p-2 align-middle ">
                            <Spinner className="w-6 h-6" color="amber" />
                            <p className="pl-2 text-center text-black">
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <div>
                            <Typography className="w-full p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                Điện Nước
                            </Typography>

                            <Box>
                                <DataGrid
                                    rows={workDataDN_done}
                                    columns={columnsRight}
                                    editMode="row"
                                    hideFooterPagination={true}
                                />
                            </Box>

                            <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                Điện Lạnh
                            </Typography>
                            <Box>
                                <DataGrid
                                    rows={workDataDL_done}
                                    columns={columnsRight}
                                    editMode="row"
                                />
                            </Box>
                            <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                Đồ Gỗ
                            </Typography>
                            <Box>
                                <DataGrid
                                    rows={workDataDG_done}
                                    columns={columnsRight}
                                    editMode="row"
                                />
                            </Box>
                            <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                Năng Lượng Mặt Trời
                            </Typography>
                            <Box>
                                <DataGrid
                                    rows={workDataNLMT_done}
                                    columns={columnsRight}
                                    editMode="row"
                                />
                            </Box>
                            <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                Xây Dựng
                            </Typography>
                            <Box>
                                <DataGrid
                                    rows={workDataXD_done}
                                    columns={columnsRight}
                                    editMode="row"
                                />
                            </Box>
                            <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                Vận Chuyển
                            </Typography>
                            <Box>
                                <DataGrid
                                    rows={workDataVC_done}
                                    columns={columnsRight}
                                    editMode="row"
                                />
                            </Box>
                            <Typography className="p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                Cơ Khí
                            </Typography>
                            <Box>
                                <DataGrid
                                    rows={workDataHX_done}
                                    columns={columnsRight}
                                    editMode="row"
                                />
                            </Box>
                        </div>
                    )}
                </Card>
            </div>
            <div className="fixed flex mt-1">
                <div>
                    <Button
                        className="p-2 mx-1 text-green-700 bg-white border border-green-700 shadow-none hover:shadow-green-700"
                        onClick={() => scrollView(DN)}
                    >
                        Điện Nước
                    </Button>
                    <Button
                        className="p-2 mr-1 text-green-700 bg-white border border-green-700 shadow-none hover:shadow-green-700"
                        onClick={() => scrollView(DN)}
                    >
                        Điện Lạnh
                    </Button>
                    <Button
                        className="p-2 mr-1 text-green-700 bg-white border border-green-700 shadow-none hover:shadow-green-700"
                        onClick={() => scrollView(DG)}
                    >
                        Đồ Gỗ
                    </Button>
                    <Button
                        className="p-2 mr-1 text-green-700 bg-white border border-green-700 shadow-none hover:shadow-green-700"
                        onClick={() => scrollView(NLMT)}
                    >
                        Năng Lượng Mặt Trời
                    </Button>
                    <Button
                        className="p-2 mr-1 text-green-700 bg-white border border-green-700 shadow-none hover:shadow-green-700"
                        onClick={() => scrollView(XD)}
                    >
                        Xây Dựng
                    </Button>
                    <Button
                        className="p-2 mr-1 text-green-700 bg-white border border-green-700 shadow-none hover:shadow-green-700"
                        onClick={() => scrollView(VC)}
                    >
                        Vận Chuyển
                    </Button>
                    <Button
                        className="p-2 mr-1 text-green-700 bg-white border border-green-700 shadow-none hover:shadow-green-700"
                        onClick={() => scrollView(HX)}
                    >
                        Cơ Khí
                    </Button>
                </div>
                <div className="flex items-center dateBooking">
                    <Input
                        id="date_check"
                        type="date"
                        name="date_check"
                        containerProps={{
                            className: "min-w-[72px]",
                        }}
                        labelProps={{
                            className: "hidden",
                        }}
                        className="text-green-700"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <Button
                        size="sm"
                        className="px-2 text-green-700 bg-white border border-green-700 rounded"
                        onClick={handleSearch}
                    >
                        <MagnifyingGlassIcon className="w-4 h-4 " />
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
