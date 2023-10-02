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
    IconButton,
    Radio,
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
    ClipboardDocumentListIcon,
    ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import newSocket from "@/Utils/socket";
import { host } from "@/Utils/UrlApi";
import { url_API, url_API_District } from "@/data/UrlAPI/UrlApi";
import { data } from "autoprefixer";
import { Divider } from "@mui/material";
function Dashboard({ auth }) {
    const [socketD, setSocketD] = useState();
    const [message, setMessage] = useState(auth.user.id);
    // table left
    const [workDataDN, setWorkDataDN] = useState("");
    const [workDataDL, setWorkDataDL] = useState("");
    const [workDataDG, setWorkDataDG] = useState("");
    const [workDataNLMT, setWorkDataNLMT] = useState("");
    const [workDataXD, setWorkDataXD] = useState("");
    const [workDataVC, setWorkDataVC] = useState("");
    const [workDataHX, setWorkDataHX] = useState("");
    // table right
    const [workDataDN_done, setWorkDataDN_done] = useState("");
    const [workDataDL_done, setWorkDataDL_done] = useState("");
    const [workDataDG_done, setWorkDataDG_done] = useState("");
    const [workDataNLMT_done, setWorkDataNLMT_done] = useState("");
    const [workDataXD_done, setWorkDataXD_done] = useState("");
    const [workDataVC_done, setWorkDataVC_done] = useState("");
    const [workDataHX_done, setWorkDataHX_done] = useState("");
    // ---------------------------- thoi gian thuc su dung socket -------------------------
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchData();
        fetchDataDaPhan();
        fetchInfoWorker();
    }, []);
    useEffect(() => {
        setSocketD(newSocket, { secure: true });
        newSocket.on("sendAddWorkTo_Client", (data) => {
            console.log("hell", data);
            if (data != "") {
                fetchDataDashboard(data);
                fetchData(data);
                fetchDataDaPhan(data);
                fetchDataWorkDone(data);
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
    const fetchDataWorkDone = async (data) => {
        try {
            const res = await fetch("api/web/update/work-assignment", {
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
            type: "actions",
            headerName: "Ghi Chú",
            width: 80,
            editable: false,
            tabindex: 0,
            renderCell: (params) => {
                const [open, setOpen] = useState(false);
                const handleOpen = () => setOpen(!open);
                const hasData = params.row;
                const data = hasData.image_work_path;
                const parts = data?.split(",");
                const filteredArray = parts?.filter(
                    (item) => item.trim() !== ""
                );
                const shouldDisplayIconButton =
                    hasData.work_note !== null ||
                    hasData.image_work_path !== null;
                console.log("hasData", hasData.work_note, data);

                return (
                    <div className="text-center">
                        {shouldDisplayIconButton && (
                            <IconButton
                                className="w-8 h-8 p-1"
                                variant="outlined"
                                onClick={handleOpen}
                            >
                                <ClipboardDocumentListIcon className="w-4 h-4" />
                            </IconButton>
                        )}
                        <Dialog open={open} handler={handleOpen}>
                            <DialogHeader>Ghi Chú</DialogHeader>
                            <DialogBody divider>
                                <p className="object-cover object-center w-full p-2 mb-5 rounded-lg shadow-xl">
                                    {params.row.work_note}
                                </p>

                                <div className="flex flex-wrap">
                                    {filteredArray?.map((item, index) => (
                                        <img
                                            key={index}
                                            className="object-cover object-center w-1/2 p-1 rounded-lg shadow-xl"
                                            src={`${host}${item}`}
                                            alt="nature image"
                                        />
                                    ))}
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Thoát</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </div>
                );
            },
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
                            handleCopyToClipboard(params.row);
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
                    } ${district ? district + " " : ""} ${
                        work_note ? work_note + " " : ""
                    } `;

                    const textarea = document.createElement("textarea");
                    textarea.value = data;
                    document.body.appendChild(textarea);

                    textarea.select();

                    console.log("tam tai", document.execCommand);
                    document.body.removeChild(textarea);

                    // alert('Đã sao chép vào clipboard: ' + data);
                    console.log("Đã sao chép vào clipboard: " + data);
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
                            fetchDataWorkDone(data);
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
                            fetchDataWorkDone(data);
                        }
                    }}
                />
            ),
        },
        {
            field: "district",
            headerName: "Quận",
            type: "text",
            width: 40,
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
                            fetchDataWorkDone(data);
                        }
                    }}
                />
            ),
        },
        {
            field: "phone_number",
            headerName: "Số Điện thoại",
            width: 100,
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
                            fetchDataWorkDone(data);
                        }
                    }}
                />
            ),
        },
        {
            field: "date_book",
            headerName: "Ngày Làm",
            type: "text",
            width: 90,
            align: "left",
            headerAlign: "left",
            editable: false,
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
            renderCell: (params) => {
                const [open, setOpen] = useState(false);
                const handleOpen = () => setOpen(!open);
                const [cardExpires, setCardExpires] = useState(params.row);
                console.log(params.row);
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setCardExpires((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                    console.log(value);
                };
                const shouldDisplayIconButton = params.row.worker_name === null;
                return (
                    <div>
                        {/* {shouldDisplayIconButton ? (
                            <Tooltip content="Nhập Thu Chi">
                                <IconButton
                                    className="w-8 h-8 p-1"
                                    variant="outlined"
                                    onClick={handleOpen}
                                >
                                    <ClipboardDocumentListIcon className="w-4 h-4" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <p>{params.row.worker_name}</p>
                        )} */}
                        <p onClick={handleOpen}>{params.row.worker_name}</p>
                        <Dialog
                            open={open}
                            handler={handleOpen}
                            className="w-full max-w-full min-w-full 2xl:min-w-[70%]"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>CHỌN THỢ CẦN PHÂN</DialogHeader>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3 cursor-pointer"
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
                                <form className="flex flex-col gap-4 mt-2">
                                    <div className="flex items-center gap-4 ">
                                        <Input
                                            label="Thợ Chính"
                                            id="work_content"
                                            name="work_content"
                                            value={cardExpires.work_content}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Thợ Phụ"
                                            id="phone_number"
                                            name="phone_number"
                                            value={cardExpires.phone_number}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                    </div>

                                    <Divider />
                                    <div className="flex flex-row-reverse">
                                        <Button
                                            size="md"
                                            className="p-3 py-0 mx-4 text-green-500 border-green-500 "
                                            variant="outlined"
                                        >
                                            Xác Nhận
                                        </Button>
                                        <Button
                                            size="md"
                                            className="p-3 py-0 mx-4 text-gray-500 border-gray-500 "
                                            variant="outlined"
                                        >
                                            Hủy
                                        </Button>
                                    </div>
                                </form>
                            </DialogBody>
                        </Dialog>
                    </div>
                );
            },
        },
        {
            field: "spending_total",
            headerName: "Chi",
            width: 100,
            editable: false,
            type: "text",
            renderCell: (params) => {
                const [open, setOpen] = useState(false);
                const handleOpen = () => setOpen(!open);
                const [cardExpires, setCardExpires] = useState(params.row);
                console.log(params.row);
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setCardExpires((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                    console.log(value);
                };
                const shouldDisplayIconButton = params.row.spending_total === 0;
                return (
                    <div>
                        {shouldDisplayIconButton ? (
                            <Tooltip content="Nhập Thu Chi">
                                <IconButton
                                    className="w-8 h-8 p-1"
                                    variant="outlined"
                                    onClick={handleOpen}
                                >
                                    <ClipboardDocumentListIcon className="w-4 h-4" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <p>{params.row.spending_total}</p>
                        )}
                        <Dialog
                            open={open}
                            handler={handleOpen}
                            className="w-full max-w-full min-w-full 2xl:min-w-[70%]"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>Nhập Thu Chi</DialogHeader>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3 cursor-pointer"
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
                                <form className="flex flex-col gap-4 mt-2">
                                    <div className="flex items-center gap-4 ">
                                        <Input
                                            label="Yêu Cầu Công Việc"
                                            id="work_content"
                                            name="work_content"
                                            value={cardExpires.work_content}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Số Điện Thoại"
                                            id="phone_number"
                                            name="phone_number"
                                            value={cardExpires.phone_number}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            label="Địa Chỉ"
                                            id="street"
                                            name="street"
                                            value={cardExpires.street}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Quận"
                                            id="district"
                                            name="district"
                                            value={cardExpires.district}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            label="Tên Khách Hàng"
                                            id="name_cus"
                                            name="name_cus"
                                            value={cardExpires.name_cus}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Ngày Làm"
                                            id="date_book"
                                            name="date_book"
                                            value={cardExpires.date_book}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 ">
                                        <div className="w-full">
                                            <Input
                                                label="Ghi Chú"
                                                id="real_note"
                                                name="real_note"
                                                value={cardExpires.real_note}
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                        </div>

                                        <div className="flex items-center w-full gap-4 ">
                                            <Input
                                                label="Tiền Chi"
                                                id="spending_total"
                                                name="spending_total"
                                                value={
                                                    cardExpires.spending_total
                                                }
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                            <Input
                                                label="Tiền Thu"
                                                id="income_total"
                                                name="income_total"
                                                value={cardExpires.income_total}
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="items-center justify-center gap-4 my-2 text-sm ">
                                        <div className="flex justify-between w-full">
                                            <Radio
                                                id="DN"
                                                name="kind_work"
                                                label="Hoàn Thành"
                                                value="0"
                                                checked='{formData.kind_work === "0"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                            <Radio
                                                id="DL"
                                                name="kind_work"
                                                label="Mai Làm Tiếp"
                                                value="1"
                                                checked='{formData.kind_work === "1"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                            <Button
                                                className="px-1 py-0"
                                                variant="outlined"
                                            >
                                                Vật Tư
                                            </Button>
                                            <Button
                                                className="px-1 py-0"
                                                variant="outlined"
                                            >
                                                Phiếu Thu
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 ">
                                        <div className="w-[50%]">
                                            <Input
                                                label="Thông Tin Bảo Hành"
                                                id="info_BH"
                                                name="info_BH"
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                            <div className="flex justify-between w-full mt-5 text-sm">
                                                <Radio
                                                    id="BHDay"
                                                    name="BH"
                                                    label="Ngày"
                                                    value="0"
                                                    checked='{formData.kind_work === "0"}'
                                                    onChange={handleChange}
                                                    className="w-1 h-1 p-1"
                                                />
                                                <Radio
                                                    id="BHWeek"
                                                    name="BH"
                                                    label="Tuần"
                                                    value="1"
                                                    checked='{formData.kind_work === "1"}'
                                                    onChange={handleChange}
                                                    className="w-1 h-1 p-1"
                                                />
                                                <Radio
                                                    id="BHMonth"
                                                    name="BH"
                                                    label="Tháng"
                                                    value="0"
                                                    checked='{formData.kind_work === "0"}'
                                                    onChange={handleChange}
                                                    className="w-1 h-1 p-1"
                                                />
                                                <Radio
                                                    id="KBH"
                                                    name="BH"
                                                    label="Không bảo hành"
                                                    value="1"
                                                    checked='{formData.kind_work === "1"}'
                                                    onChange={handleChange}
                                                    className="w-1 h-1 p-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-[50%]">
                                            <Textarea
                                                label="Nội Dung Bảo Hành"
                                                className="shadow-none"
                                            />
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className="flex flex-row-reverse">
                                        <Button
                                            size="sx"
                                            className="p-3 py-2 mx-4 text-red-500 border-red-500"
                                            variant="outlined"
                                        >
                                            Báo Hủy
                                        </Button>
                                        <Button
                                            size="sx"
                                            className="p-3 py-0 mx-4 "
                                            variant="outlined"
                                        >
                                            Trả Lịch
                                        </Button>
                                        <Button
                                            size="sx"
                                            className="p-3 py-0 mx-4 text-orange-500 border-orange-500 "
                                            variant="outlined"
                                        >
                                            Khảo Sát
                                        </Button>
                                        <Button
                                            size="sx"
                                            className="p-3 py-0 mx-4 text-green-500 border-green-500 "
                                            variant="outlined"
                                        >
                                            Cập Nhật
                                        </Button>
                                    </div>
                                </form>
                            </DialogBody>
                        </Dialog>
                    </div>
                );
            },
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
                const [openAdminCheck, setOpenAdminCheck] = useState(false);
                const handleOpenAdminCheck = () =>
                    setOpenAdminCheck(!openAdminCheck);
                const [openUpdateThuChi, setOpenUpdateThuChi] = useState(false);
                const handleOpenUpdateThuChi = () =>
                    setOpenUpdateThuChi(!openUpdateThuChi);
                const [work_note, setWorkNote] = useState();
                const [selectPhanTho, setSelectPhanTho] = useState(null);
                const handleSelectChange = (selectedValue) => {
                    setSelectPhanTho(selectedValue); // Cập nhật giá trị được chọn trong state
                };
                const [cardExpires, setCardExpires] = useState(params.row);
                console.log(params.row);
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setCardExpires((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                    console.log(value);
                };
                // console.log('-----------', selectPhanTho);
                const handleSentDeleteDone = async () => {
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
                            socketD.emit("addWorkTo_Server", "xoalichDone");
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
                                <EyeIcon
                                    className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                                    onClick={handleOpenAdminCheck}
                                />
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
                            <Tooltip content="Cập Nhật Dữ Liệu">
                                <ArrowUpTrayIcon
                                    className="w-8 h-8 p-1 mr-2 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                    onClick={handleOpenUpdateThuChi}
                                />
                            </Tooltip>
                        </div>
                        <Dialog
                            open={openTho}
                            handler={handleOpenTho}
                            className="bg-transparent "
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
                                    onClick={handleSentDeleteDone}
                                >
                                    Xác nhận
                                </Button>
                            </DialogFooter>
                        </Dialog>

                        <Dialog
                            open={openAdminCheck}
                            handler={handleOpenAdminCheck}
                            className="w-full max-w-full min-w-full 2xl:min-w-[60%]"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>
                                    XÁC NHẬN THÔNG TIN THỢ BÁO
                                </DialogHeader>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                    onClick={handleOpenAdminCheck}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <DialogBody divider>
                                <form className="flex flex-col gap-4 mt-2">
                                    <div className="flex items-center gap-4 ">
                                        <Input
                                            label="Yêu Cầu Công Việc"
                                            id="work_content"
                                            name="work_content"
                                            value={cardExpires.work_content}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Số Điện Thoại"
                                            id="phone_number"
                                            name="phone_number"
                                            value={cardExpires.phone_number}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            label="Địa Chỉ"
                                            id="street"
                                            name="street"
                                            value={cardExpires.street}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Quận"
                                            id="district"
                                            name="district"
                                            value={cardExpires.district}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            label="Tên Khách Hàng"
                                            id="name_cus"
                                            name="name_cus"
                                            value={cardExpires.name_cus}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Ngày Làm"
                                            id="date_book"
                                            name="date_book"
                                            value={cardExpires.date_book}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            disabled
                                            className="shadow-none"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 ">
                                        <div className="w-full">
                                            <Input
                                                label="Ghi Chú"
                                                id="real_note"
                                                name="real_note"
                                                value={cardExpires.real_note}
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                        </div>

                                        <div className="flex items-center w-full gap-4 ">
                                            <Input
                                                label="Tiền Chi"
                                                id="spending_total"
                                                name="spending_total"
                                                value={
                                                    cardExpires.spending_total
                                                }
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                            <Input
                                                label="Tiền Thu"
                                                id="income_total"
                                                name="income_total"
                                                value={cardExpires.income_total}
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="items-center justify-center gap-4 my-2 text-sm ">
                                        <div className="flex justify-between w-full">
                                            <Radio
                                                id="DN"
                                                name="kind_work"
                                                label="Đã Làm"
                                                value="0"
                                                checked='{formData.kind_work === "0"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />

                                            <Button
                                                className="px-1 py-0"
                                                variant="outlined"
                                            >
                                                Vật Tư
                                            </Button>
                                            <Button
                                                className="px-1 py-0"
                                                variant="outlined"
                                            >
                                                Phiếu Thu
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="gap-4 ">
                                        <Card className="flex flex-row w-full px-5 py-2 mt-2 text-sm border">
                                            <label htmlFor="Nội Dung Bảo Hành">
                                                Nội Dung Bảo Hành:
                                            </label>
                                            <p className="pl-5">
                                                Không có thông tin bảo hành !
                                            </p>
                                        </Card>

                                        <Card className="flex flex-row justify-between w-full px-5 py-2 mt-5 text-sm border">
                                            <Radio
                                                id="BHDay"
                                                name="BH"
                                                label="Điện Nước"
                                                value="0"
                                                checked='{formData.kind_work === "0"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                            <Radio
                                                id="BHWeek"
                                                name="BH"
                                                label="Điện Lạnh"
                                                value="1"
                                                checked='{formData.kind_work === "1"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                            <Radio
                                                id="BHMonth"
                                                name="BH"
                                                label="Đồ Gỗ"
                                                value="2"
                                                checked='{formData.kind_work === "0"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                            <Radio
                                                id="KBH"
                                                name="BH"
                                                label="Xây Dựng"
                                                value="3"
                                                checked='{formData.kind_work === "1"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                            <Radio
                                                id="KBH"
                                                name="BH"
                                                label="Năng Lượng Mặt Trời"
                                                value="4"
                                                checked='{formData.kind_work === "1"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                            <Radio
                                                id="KBH"
                                                name="BH"
                                                label="Vận Chuyển"
                                                value="3"
                                                checked='{formData.kind_work === "1"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                            <Radio
                                                id="KBH"
                                                name="BH"
                                                label="Cơ Khí"
                                                value="4"
                                                checked='{formData.kind_work === "1"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />
                                        </Card>
                                    </div>
                                    <Divider />
                                    <div className="flex flex-row justify-center">
                                        <Typography className="font-medium text-red-700">
                                            (*_*)Vui Lòng Kiểm Tra Thông Tin Lại
                                            Trước Khi Xác Nhận!!
                                        </Typography>
                                        <Button
                                            size="sx"
                                            className="px-3 py-2 mx-4 "
                                            variant="outlined"
                                        >
                                            Xác Nhận Thông Tin
                                        </Button>
                                    </div>
                                </form>
                            </DialogBody>
                        </Dialog>
                        <Dialog
                            open={openUpdateThuChi}
                            handler={handleOpenUpdateThuChi}
                            className="w-full max-w-full min-w-full 2xl:min-w-[60%]"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>
                                    CẬP NHẬT THÔNG TIN THỢ
                                </DialogHeader>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                    onClick={handleOpenUpdateThuChi}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <DialogBody divider>
                                <form className="flex flex-col gap-4 mt-2">
                                    <div className="flex items-center gap-4 ">
                                        <Input
                                            label="Yêu Cầu Công Việc"
                                            id="work_content"
                                            name="work_content"
                                            value={cardExpires.work_content}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Số Điện Thoại"
                                            id="phone_number"
                                            name="phone_number"
                                            value={cardExpires.phone_number}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            label="Địa Chỉ"
                                            id="street"
                                            name="street"
                                            value={cardExpires.street}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Quận"
                                            id="district"
                                            name="district"
                                            value={cardExpires.district}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            label="Tên Khách Hàng"
                                            id="name_cus"
                                            name="name_cus"
                                            value={cardExpires.name_cus}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            className="shadow-none"
                                        />
                                        <Input
                                            label="Ngày Làm"
                                            id="date_book"
                                            name="date_book"
                                            value={cardExpires.date_book}
                                            onChange={handleChange}
                                            containerProps={{
                                                className: "min-w-[72px]",
                                            }}
                                            disabled
                                            className="shadow-none"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 ">
                                        <div className="w-full">
                                            <Input
                                                label="Ghi Chú"
                                                id="real_note"
                                                name="real_note"
                                                value={cardExpires.real_note}
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                        </div>

                                        <div className="flex items-center w-full gap-4 ">
                                            <Input
                                                label="Tiền Chi"
                                                id="spending_total"
                                                name="spending_total"
                                                value={
                                                    cardExpires.spending_total
                                                }
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                            <Input
                                                label="Tiền Thu"
                                                id="income_total"
                                                name="income_total"
                                                value={cardExpires.income_total}
                                                onChange={handleChange}
                                                containerProps={{
                                                    className: "min-w-[72px]",
                                                }}
                                                className="shadow-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="items-center justify-center gap-4 my-2 text-sm ">
                                        <div className="flex justify-between w-full">
                                            <Radio
                                                id="DN"
                                                name="kind_work"
                                                label="Đã Làm"
                                                value="0"
                                                checked='{formData.kind_work === "0"}'
                                                onChange={handleChange}
                                                className="w-1 h-1 p-1"
                                            />

                                            <Button
                                                className="px-1 py-0"
                                                variant="outlined"
                                            >
                                                Vật Tư
                                            </Button>
                                            <Button
                                                className="px-1 py-0"
                                                variant="outlined"
                                            >
                                                Phiếu Thu
                                            </Button>
                                        </div>
                                    </div>
                                    <Card className="flex flex-row w-full px-5 py-2 mt-2 text-sm border">
                                        <label htmlFor="Nội Dung Bảo Hành">
                                            Nội Dung Bảo Hành:
                                        </label>
                                        <p className="pl-5">
                                            Không có thông tin bảo hành !
                                        </p>
                                    </Card>
                                    <Divider />
                                    <div className="flex flex-row justify-center">
                                        <Typography className="font-medium text-red-700">
                                            (*_*)Vui Lòng Kiểm Tra Thông Tin Lại
                                            Trước Khi Xác Nhận!!
                                        </Typography>
                                        <Button
                                            size="sx"
                                            className="px-3 py-2 mx-4 "
                                            variant="outlined"
                                        >
                                            Xác Nhận Thông Tin
                                        </Button>
                                    </div>
                                </form>
                            </DialogBody>
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
