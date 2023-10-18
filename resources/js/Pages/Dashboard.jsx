import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState, useRef } from "react";
import {
    Button,
    Card,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Tooltip,
    Spinner,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
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
    XMarkIcon,
    EllipsisVerticalIcon,
    TicketIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import newSocket from "@/utils/socket";
import { host } from "@/Utils/UrlApi";
import { url_API, url_API_District } from "@/data/UrlAPI/UrlApi";
import { Divider } from "@mui/material";
import AdminCheckDialog from "@/Components/AdminCheckDialog";
import {
    ThoDialog,
    KhaoSatDialog,
    ReasonDialog,
    ThuHoiDialog,
} from "@/Components/ColumnRightDialog";
import SpendingDialog from "@/Components/SpendingDialog";
import { HuyDialog } from "@/Components/ColumnRightDialog";

// ----

function Dashboard({ auth }) {
    const [socketD, setSocketD] = useState();
    const [message, setMessage] = useState(auth.user.id);
    // table left
    const [workDataDN, setWorkDataDN] = useState("");
    const [workDataDNCu, setWorkDataDNCu] = useState("");
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
        if (socketD) {
            socketD.emit("pushOnline", message);
            pushOn();
        }

        setSocketD(newSocket, { secure: true });
        newSocket.on("sendAddWorkTo_Client", (data) => {
            if (data != "") {
                fetchDataDashboard(data);
                fetchData(data);
                fetchDataDaPhan(data);
                // fetchDataWorkDone(data);
            }
        });
        return () => {
            newSocket.disconnect();
        };
    }, []);
    // --------------------------kiem tra socket io tai khoan online -----------------------------

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
    const fetchDataDemo = async (url) => {
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    };
    const fetchData = async () => {
        const url = `api/web/works`;
        const jsonData = await fetchDataDemo(url);
        if (jsonData) {
            setWorkDataDN(jsonData.dien_nuoc);
            setWorkDataDNCu(jsonData.dien_nuoc_cu);
            setWorkDataDL(jsonData.dien_lanh);
            setWorkDataDG(jsonData.do_go);
            setWorkDataNLMT(jsonData.nlmt);
            setWorkDataXD(jsonData.xay_dung);
            setWorkDataVC(jsonData.tai_xe);
            setWorkDataHX(jsonData.co_khi);
        }
    };
    const fetchDateCheck = async (dateCheck) => {
        const url = `api/web/works?dateCheck=${dateCheck}`;
        const jsonData = await fetchDataDemo(url);
        if (jsonData) {
            setWorkDataDN(jsonData.dien_nuoc);
            setWorkDataDL(jsonData.dien_lanh);
            setWorkDataDG(jsonData.do_go);
            setWorkDataNLMT(jsonData.nlmt);
            setWorkDataXD(jsonData.xay_dung);
            setWorkDataVC(jsonData.tai_xe);
            setWorkDataHX(jsonData.co_khi);
        }
    };
    // --------------------------- lay du lieu lich da phan ----------------------------------
    const fetchDataDaPhan = async () => {
        const url = `/api/web/work-assignment/all`;
        const jsonData = await fetchDataDemo(url);
        if (jsonData) {
            setWorkDataDN_done(jsonData.dien_nuoc_done);
            setWorkDataDL_done(jsonData.dien_lanh_done);
            setWorkDataDG_done(jsonData.do_go_done);
            setWorkDataNLMT_done(jsonData.nlmt_done);
            setWorkDataXD_done(jsonData.xay_dung_done);
            setWorkDataVC_done(jsonData.tai_xe_done);
            setWorkDataHX_done(jsonData.co_khi_done);
            setIsLoading(false);
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
    const fetchUpdateData = async (data, url) => {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                socketD?.emit("addWorkTo_Server", data);
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data lỗi rồi:", error);
        }
    };
    const fetchDataDashboard = async (data) => {
        const url = "api/web/update/work";
        fetchUpdateData(data, url);
    };
    const fetchDataWorkDone = async (data) => {
        const url = "api/web/update/work-continue";
        fetchUpdateData(data, url);
    };
    // ---------------------su dung nut di chuyen trong bang--------------------
    const fetchDataUpdateThuchi = async (
        data,
        Url_Api,
        seri_imag,
        bill_imag
    ) => {
        try {
            // Tạo một đối tượng FormData mới
            const formData = new FormData();
            // Lặp qua tất cả các cặp key-value trong đối tượng data và thêm chúng vào formData
            for (const key in data) {
                formData.append(key, data[key]);
            }
            // Thêm danh sách các tệp hình `bill_image` vào FormData
            for (let i = 0; i < seri_imag.length; i++) {
                formData.append("seri_imag[]", seri_imag[i]);
            }

            // Thêm danh sách các tệp hình `image_vt` vào FormData
            for (let i = 0; i < bill_imag?.length; i++) {
                formData.append("bill_imag[]", bill_imag[i]);
            }
            const res = await fetch(Url_Api, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: formData,
            });

            if (res.ok) {
                console.log(`Cập nhật thông tin ${data.ac}`, data);
                socketD.emit("addWorkTo_Server", formData);
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data lỗi rồi:", error);
        }
    };

    // hàm thêm dấu chấm trong chuỗi
    function addDot(num) {
        if (num) {
            const str = num.toString();
            const result = str.slice(0, 2) + "." + str.slice(2);
            return result;
        }
    }
    // ---------- Dialog ------------------------
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [openWorkerNameTableRight, setOpenWorkerNameTableRight] =
        useState(false);
    const handleOpenWorkerNameTableRight = () =>
        setOpenWorkerNameTableRight(!openWorkerNameTableRight);
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
            field: "date_book",
            headerName: "Ngày",
            width: 100,
            editable: true,
            tabindex: 0,
            renderCell: (params) => <span>{params.row.date_book}</span>,
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
                            auth_id: auth.user.id,
                            work_note: work_note,
                        };

                        const response = await fetch("api/web/cancle/works", {
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
                    let data = {
                        id_cus: params.row.id,
                        id_worker: selectPhanTho,
                        work_note: params.row.work_note,

                        auth_id: auth.user.id,
                    };
                    try {
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
                    document.body.removeChild(textarea);
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
                        </div>
                        <ThoDialog
                            open={openTho}
                            handleOpenTho={handleOpenTho}
                            selectPhanTho={selectPhanTho}
                            infoWorkerDashboard={infoWorkerDashboard}
                            handleSelectChange={handleSelectChange}
                            handleSentPhanTho={handleSentPhanTho}
                        />
                        <ReasonDialog
                            open={open}
                            handleOpen={handleOpen}
                            params={params}
                            setWorkNote={setWorkNote}
                            handleSentDelete={handleSentDelete}
                        />
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
            editable: false,
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
            editable: false,
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
            editable: false,
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
            editable: false,
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
            editable: false,
            type: "text",

        },
        {
            field: "worker_name",
            headerName: "Thợ",
            width: 80,
            editable: false,
            type: "singleSelect",
            renderCell: (params) => {
                const [cardExpires, setCardExpires] = useState(params.row);
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setCardExpires((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                };
                return (
                    <div>
                        <p onClick={handleOpenWorkerNameTableRight}>
                            {params.row.worker_name}
                        </p>
                        <Dialog
                            open={openWorkerNameTableRight}
                            handler={handleOpenWorkerNameTableRight}
                            className="w-full max-w-full min-w-full 2xl:min-w-[70%]"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>CHỌN THỢ CẦN PHÂN</DialogHeader>
                                <XMarkIcon
                                    onClick={handleOpenWorkerNameTableRight}
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                />
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
                                            onClick={
                                                handleOpenWorkerNameTableRight
                                            }
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
            width: 120,
            editable: false,
            type: "number",
            renderCell: (params) => {
                const formatter = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                });
                return (
                    <span className="text-center">
                        {formatter.format(params.row.spending_total)}
                    </span>
                );
            },
        },
        {
            field: "income_total",
            headerName: "Thu",
            width: 120,
            editable: false,
            type: "number",
            renderCell: (params) => {
                const formatter = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                });
                return (
                    <span className="text-center">
                        {formatter.format(params.row.income_total)}
                    </span>
                );
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Chức Năng",
            width: 150,
            editable: false,
            cellClassName: "actions",
            renderCell: (params) => {
                const [cardExpires, setCardExpires] = useState(params.row);
                const useToggle = (initialState) => {
                    const [open, setOpen] = useState(initialState);
                    const handleOpen = () => setOpen(!open);
                    return [open, handleOpen];
                };
                // Sử dụng hàm useToggle
                const [openHuy, handleOpenHuy] = useToggle(false);
                const [openKS, handleOpenKS] = useToggle(false);
                const [openThuHoi, handleOpenThuHoi] = useToggle(false);
                const [openAdminCheck, handleOpenAdminCheck] = useToggle(false);
                const [openSpending_total, handleOpenSpending_total] =
                    useToggle(false);
                const [openUpdateThuChi, handleOpenUpdateThuChi] =
                    useToggle(false);
                const [work_note, setWorkNote] = useState();
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setCardExpires((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                };
                const handleSentDeleteDone = async () => {
                    try {
                        let data = {
                            id: params.id,
                            id_cus: params.row.id_cus,
                            real_note: params.row.real_note,
                            auth_id: auth.user.id,
                        };
                        const response = await fetch(
                            "api/web/update/work-assignment-cancle",
                            {
                                method: "POST",
                                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                                headers: {
                                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                                },
                            }
                        );
                        if (response.ok) {
                            socketD.emit("addWorkTo_Server", "xoalichDone");
                            handleOpen();
                        }
                    } catch (error) {}
                };
                // --------- thu chi ----------------------------
                const [isDataChanged, setIsDataChanged] = useState([]);
                const handleDataFromChild = (data) => setIsDataChanged(data);
                const [selectedFiles, setSelectedFiles] = useState([]);
                const [previewImgVt, setPreviewImgVt] = useState([]);
                const [previewImgPt, setPreviewImgPt] = useState([]);
                const [previewImgKS, setPreviewImgKS] = useState([]);
                const handleFileChange = (e, setImagePreview) => {
                    const files = Array.from(e.target.files);
                    setSelectedFiles(files);
                    const previews = files.map((file) =>
                        URL.createObjectURL(file)
                    );
                    setImagePreview(previews);
                };
                const vatCard = params.row.bill_image === null;
                const [isAllowed, setIsAllowed] = useState(false); // Trạng thái cho phép/mở
                const [valueRadio, setValueRadio] = useState("0");
                const handleRadioChangeAllow = (e) => {
                    const value = e.target.value;
                    setIsAllowed(value === "1");
                    setValueRadio(value); // Nếu radio "allow" được chọn, cho phép.
                };
                // ---------- ------- - cần tối ưu code ----------------------------------
                const handleValueBh = () => {
                    isDataChanged.forEach(async (data) => {
                        const dataBh = {
                            id_work_has: params.id,
                            warranty_time: data.warranty_time,
                            warranty_info: data.warranty_info,
                            unit: data.unit,
                        };
                        try {
                            const res = await fetch(
                                "api/web/update/work-assignment-warranties",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(dataBh),
                                }
                            );

                            if (res.ok) {
                                console.log("Đã Gửi Thông Tin Bảo Hành");
                            } else {
                                console.error(
                                    "Lỗi khi gửi dữ liệu:",
                                    res.statusText
                                );
                            }
                        } catch (error) {
                            console.error(
                                "Error fetching data lỗi rồi:",
                                error
                            );
                        }
                    });
                };
                const handleUpdateThuChi = async (e) => {
                    const UrlApi = "api/web/update/work-continue";
                    const data_0 = {
                        ...cardExpires,
                        ac: valueRadio,
                        id: params.row.id,
                        member_read: auth.user.id,
                    };
                    const image_Pt = document.getElementById("image_Pt").files;
                    const image_Vt = document.getElementById("image_Vt").files;
                    const data_1 = {
                        ac: valueRadio,
                        id: params.row.id,
                    };
                    if (valueRadio === "0") {
                        fetchDataUpdateThuchi(
                            data_0,
                            UrlApi,
                            image_Pt,
                            image_Vt
                        );
                        handleValueBh();
                        console.log("cardExpires data_0", data_0);
                    } else if (valueRadio === "1") {
                        fetchDataUpdateThuchi(data_1, UrlApi);
                        console.log("cardExpires data_1", data_1);
                    }
                    handleOpenSpending_total();
                };
                const handleThuHoi = async (e) => {
                    e.preventDefault();
                    console.log("thu hoi lich");
                    let data = {
                        id: params.id,
                        id_cus: params.row.id_cus,
                        auth_id: auth.user.id,
                        real_note: params.row.real_note,
                    };
                    console.log("data______", data);
                    try {
                        const response = await fetch(
                            "api/web/update/work-assignment-return",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                                },
                                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                            }
                        );
                        if (response.ok) {
                            socketD.emit("addWorkTo_Server", "Thu hoi lich");
                            handleThuHoi();
                        }
                    } catch (error) {
                        console.log("Loi", error);
                    }
                };
                const handleCheckAdmin = async (e) => {
                    const UrlApi = "api/web/update/check-admin";
                    const prevData = {
                        work_content: params.row.work_content,
                        phone_number: params.row.phone_number,
                        street: params.row.street,
                        district: params.row.district,
                        name_cus: params.row.name_cus,
                        work_note: params.row.real_note,
                        income_total: params.row.income_total,
                        spending_total: params.row.spending_total,
                    };

                    if (prevData.work_content !== cardExpires.work_content) {
                        fetchUpdateData(
                            {
                                ac: 4,
                                auth_id: auth.user.id,
                                id_cus: params.row.id_cus,
                                work_content: cardExpires.work_content,
                            },
                            UrlApi
                        );
                    }

                    if (prevData.phone_number !== cardExpires.phone_number) {
                        fetchUpdateData(
                            {
                                ac: 5,
                                auth_id: auth.user.id,
                                id_cus: params.row.id_cus,
                                phone_number: cardExpires.phone_number,
                            },
                            UrlApi
                        );
                    }

                    if (prevData.street !== cardExpires.street) {
                        fetchUpdateData(
                            {
                                ac: 6,
                                auth_id: auth.user.id,
                                id_cus: params.row.id_cus,
                                street: cardExpires.street,
                            },
                            UrlApi
                        );
                    }

                    if (prevData.district !== cardExpires.district) {
                        fetchUpdateData(
                            {
                                ac: 7,
                                auth_id: auth.user.id,
                                id_cus: params.row.id_cus,
                                district: cardExpires.district,
                            },
                            UrlApi
                        );
                    }

                    if (prevData.name_cus !== cardExpires.name_cus) {
                        fetchUpdateData(
                            {
                                ac: 8,
                                auth_id: auth.user.id,
                                id_cus: params.row.id_cus,
                                name_cus: cardExpires.name_cus,
                            },
                            UrlApi
                        );
                    }

                    if (prevData.work_note !== cardExpires.real_note) {
                        fetchUpdateData(
                            {
                                ac: 9,
                                auth_id: auth.user.id,
                                id_cus: params.row.id_cus,
                                work_note: cardExpires.real_note,
                            },
                            UrlApi
                        );
                    }
                    if (prevData.income_total !== cardExpires.income_total) {
                        fetchUpdateData(
                            {
                                ac: 10,
                                auth_id: auth.user.id,
                                id: params.row.id,
                                income_total: cardExpires.income_total,
                            },
                            UrlApi
                        );
                    }
                    if (prevData.spending_total !== cardExpires.spending_total) {
                        fetchUpdateData(
                            {
                                ac: 11,
                                auth_id: auth.user.id,
                                id: params.row.id,
                                spending_total: cardExpires.spending_total,
                            },
                            UrlApi
                        );
                    }

                };
                const dataBtnChi = [
                    {
                        id: "BtnTraLich",
                        content: "Trả Lịch",
                        className: "text-blue-500 rounded-none border-blue-500",
                    },
                    {
                        id: "BtnKhaoSat",
                        content: "Khảo Sát",
                        className:
                            "text-orange-500 rounded-none border-orange-500",
                    },
                    {
                        id: "BtnCapNhat",
                        content: "Cập Nhật",
                        className:
                            "text-green-500 rounded-none border-green-500",
                        handleSubmit: handleUpdateThuChi,
                    },
                ];
                // Điều kiện các nút chức năng
                const check_admin = params.row.status_admin_check == 1;
                const spending = params.row.spending_total;
                const income = params.row.income_total;
                const DK1 = auth.user.permission != 1 ? "hidden" : "";
                const DK2 = spending && income ? "hidden" : "";
                // ------------- cắt chuỗi hình phieu mua vat tu ----------------
                const hasData = params.row;
                const data = hasData.bill_imag;
                const parts = data?.split(",");
                const filteredArray = parts?.filter(
                    (item) => item.trim() !== ""
                );
                const [imageVt1, setImageVt1] = useState(filteredArray);
                const handleImageVtDelete = async (index) => {
                    const deletedImage = imageVt1[index];
                    const newImages = imageVt1.filter((_, i) => i !== index);
                    setImageVt1(newImages);
                    const dataBody = {
                        auth_id: auth.user.id,
                        ac: 2,
                        id: params.row.id,
                        bill_imag_del: deletedImage,
                    };
                    const jsonData = JSON.stringify(dataBody);
                    try {
                        const response = await fetch(
                            "api/web/update/check-admin",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: jsonData,
                            }
                        );

                        if (response.ok) {
                            console.log(
                                "Hình đã được xóa thành công từ máy chủ",
                                dataBody
                            );
                        } else {
                            console.error(
                                "Lỗi khi gửi yêu cầu xóa hình:",
                                response.statusText
                            );
                        }
                    } catch (error) {
                        console.error("Lỗi khi gửi yêu cầu xóa hình:", error);
                    }
                };
                // ------------- cắt chuỗi hình phieu thu----------------
                const hinhPt = hasData.seri_imag;
                const partsPt = hinhPt?.split(",");
                const filteredImgPt = partsPt?.filter(
                    (item) => item.trim() !== ""
                );
                const [imagePt1, setImagePt1] = useState(filteredImgPt);

                const handleImagePtDelete = async (index) => {
                    const deletedImage = imagePt1[index];
                    const newImages = imagePt1.filter((_, i) => i !== index);
                    setImagePt1(newImages);
                    const dataBody = {
                        auth_id: auth.user.id,
                        ac: 3,
                        id: params.row.id,
                        seri_imag_del: deletedImage,
                    };
                    const jsonData = JSON.stringify(dataBody);
                    console.log("00000", typeof jsonData);
                    try {
                        const response = await fetch(
                            "api/web/update/check-admin",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: jsonData,
                            }
                        );

                        if (response.ok) {
                            console.log(
                                "Hình đã được xóa thành công từ máy chủ",
                                dataBody
                            );
                        } else {
                            console.error(
                                "Lỗi khi gửi yêu cầu xóa hình:",
                                response.statusText
                            );
                        }
                    } catch (error) {
                        console.error("Lỗi khi gửi yêu cầu xóa hình:", error);
                    }
                };
                const classButtonDaPhan =
                    "w-8 h-8 p-1 mr-2 rounded border cursor-pointer hover:text-white";
                return (
                    <div>
                        <div className="flex">
                            {check_admin ? (
                                <>
                                    <Tooltip content="Nhập Thu Chi">
                                        <CheckCircleIcon
                                            className={`text-green-500 border-green-500 hover:bg-green-500  ${classButtonDaPhan} `}
                                            onClick={handleOpenSpending_total}
                                        />
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Tooltip content="Nhập Thu Chi">
                                        <ArrowUpTrayIcon
                                            className={`text-green-500 border-green-500 hover:bg-green-500  ${classButtonDaPhan} `}
                                            onClick={handleOpenSpending_total}
                                        />
                                    </Tooltip>
                                    <Tooltip content="Admin Check">
                                        <Button
                                            className={`text-blue-500 border-blue-500 hover:bg-blue-500 ${classButtonDaPhan} ${DK1}`}
                                            onClick={handleOpenAdminCheck}
                                            variant="outlined"
                                        >
                                            <EyeIcon />
                                        </Button>
                                    </Tooltip>
                                    <Menu allowHover>
                                        <MenuHandler>
                                            <EllipsisVerticalIcon
                                                className={`w-6 h-6 pt-2 cursor-pointer ${
                                                    DK1 + DK2
                                                }`}
                                            />
                                        </MenuHandler>
                                        <MenuList className="flex justify-between">
                                            <MenuItem className="p-0">
                                                <Tooltip content="Thu Hồi Lịch">
                                                    <ArrowPathIcon
                                                        className={`text-blue-500 border border-blue-500  hover:bg-blue-500 ${classButtonDaPhan} `}
                                                        onClick={
                                                            handleOpenThuHoi
                                                        }
                                                    />
                                                </Tooltip>
                                            </MenuItem>
                                            <MenuItem className="p-0">
                                                <Tooltip content="Báo hủy">
                                                    <TrashIcon
                                                        className={`text-red-500 border border-red-500 hover:bg-red-500 ${classButtonDaPhan}`}
                                                        onClick={handleOpenHuy}
                                                    />
                                                </Tooltip>
                                            </MenuItem>
                                            <MenuItem className="p-0">
                                                <Tooltip content="Khảo Sát">
                                                    <TicketIcon
                                                        className="w-8 h-8 p-1 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                                                        onClick={handleOpenKS}
                                                    />
                                                </Tooltip>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>
                            )}
                        </div>
                        {/* ----------------ADMIN CHECK ------------ */}
                        <AdminCheckDialog
                            openAdminCheck={openAdminCheck}
                            handleOpenAdminCheck={handleOpenAdminCheck}
                            params={params}
                            addDot={addDot}
                            handleFileChangeVt={(e) =>
                                handleFileChange(e, setPreviewImgVt)
                            }
                            imageVt1={imageVt1}
                            host={host}
                            handleImageVtDelete={(index) => {
                                handleImageVtDelete(index);
                            }}
                            handleImagePtDelete={(index) => {
                                handleImagePtDelete(index);
                            }}
                            imagePt1={imagePt1}
                            handleChange={handleChange}
                            cardExpires={cardExpires}
                            auth={auth}
                            handleEdit={() => {
                                handleCheckAdmin();
                            }}
                        />
                        {/*----------------------------- dialog form Thu Hoi ----------- */}
                        <ThuHoiDialog
                            openThuHoi={openThuHoi}
                            handleOpenThuHoi={handleOpenThuHoi}
                            setWorkNote={setWorkNote}
                            handleThuHoi={handleThuHoi}
                        />
                        {/*----------------------------- dialog form Huy ----------- */}
                        <HuyDialog
                            openHuy={openHuy}
                            handleOpenHuy={handleOpenHuy}
                            setWorkNote={setWorkNote}
                            handleSentDeleteDone={handleSentDeleteDone}
                        />
                        {/*----------------------------- dialog form Huy ----------- */}
                        <KhaoSatDialog
                            openKS={openKS}
                            handleOpenKS={handleOpenKS}
                            setWorkNote={setWorkNote}
                            handleSentKS={handleSentDeleteDone}
                            cardExpires={cardExpires}
                            handleChange={handleChange}
                            vatCard={vatCard}
                            disabledAllowed={isAllowed}
                            handleFileChange={(e) =>
                                handleFileChange(e, setPreviewImgKS)
                            }
                            previewImages={previewImgKS}
                        />
                        {/* ------------------Dialog Thu Chi----------------------------------- */}
                        <SpendingDialog
                            openSpending_total={openSpending_total}
                            handleOpenSpending_total={handleOpenSpending_total}
                            isAllowed={isAllowed}
                            handleRadioChangeAllow={handleRadioChangeAllow}
                            cardExpires={cardExpires}
                            handleChange={handleChange}
                            vatCard={vatCard}
                            handleFileChangeVt={(e) =>
                                handleFileChange(e, setPreviewImgVt)
                            }
                            previewImgVt={previewImgVt}
                            handleFileChangePt={(e) =>
                                handleFileChange(e, setPreviewImgPt)
                            }
                            previewImgPt={previewImgPt}
                            dataBtnChi={dataBtnChi}
                            params={params}
                            handleDataFromChild={handleDataFromChild}
                        />
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
    const DNCU = useRef(null);
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
    const dataGridLichChuaPhan = [
        {
            id: "workDNCu",
            rowsDataGrid: workDataDNCu,
            contentDataGird: "Lịch Ngày Trước Chưa Xử Lý",
            ref: DNCU,
        },
        {
            id: "workDN",
            rowsDataGrid: workDataDN,
            contentDataGird: "Điện Nước",
            ref: DN,
        },
        {
            id: "workDL",
            rowsDataGrid: workDataDL,
            contentDataGird: "Điện Lạnh",
            ref: DL,
        },
        {
            id: "workDG",
            rowsDataGrid: workDataDG,
            contentDataGird: "Đồ Gỗ",
            ref: DG,
        },
        {
            id: "workNLMT",
            rowsDataGrid: workDataNLMT,
            contentDataGird: "Năng Lượng Mặt Trời",
            ref: NLMT,
        },
        {
            id: "workXD",
            rowsDataGrid: workDataXD,
            contentDataGird: "Xây Dựng",
            ref: XD,
        },
        {
            id: "workVC",
            rowsDataGrid: workDataVC,
            contentDataGird: "Vận Chuyển",
            ref: VC,
        },
        {
            id: "workHX",
            rowsDataGrid: workDataHX,
            contentDataGird: "Cơ Khí",
            ref: HX,
        },
    ];
    //------------------------------------data dataGrid---------------------------------------------
    const dataGrid = [
        {
            id: "workDN",
            rowsDataGrid: workDataDN_done,
            contentDataGird: "Điện Nước",
        },
        {
            id: "workDL",
            rowsDataGrid: workDataDL_done,
            contentDataGird: "Điện Lạnh",
        },
        {
            id: "workDG",
            rowsDataGrid: workDataDG_done,
            contentDataGird: "Đồ Gỗ",
        },
        {
            id: "workNLMT",
            rowsDataGrid: workDataNLMT_done,
            contentDataGird: "Năng Lượng Mặt Trời",
        },
        {
            id: "workXD",
            rowsDataGrid: workDataXD_done,
            contentDataGird: "Xây Dựng",
        },
        {
            id: "workVC",
            rowsDataGrid: workDataVC_done,
            contentDataGird: "Vận Chuyển",
        },
        {
            id: "workHX",
            rowsDataGrid: workDataHX_done,
            contentDataGird: "Cơ Khí",
        },
    ];
    const dataBtnFixed = [
        { id: 0, idFixedBtn: DNCU, contentBtnFixed: "Lịch Cũ" },
        { id: 1, idFixedBtn: DN, contentBtnFixed: "Điện Nước" },
        { id: 2, idFixedBtn: DL, contentBtnFixed: "Điện Lạnh" },
        { id: 3, idFixedBtn: DG, contentBtnFixed: "Đồ Gỗ" },
        { id: 4, idFixedBtn: NLMT, contentBtnFixed: "Năng Lượng Mặt Trời" },
        { id: 5, idFixedBtn: XD, contentBtnFixed: "Xây Dựng" },
        { id: 6, idFixedBtn: VC, contentBtnFixed: "Vận Chuyển" },
        { id: 7, idFixedBtn: HX, contentBtnFixed: "Cơ Khí" },
    ];
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang Chủ" />
            <div
                className={`grid w-full grid-flow-col overflow-scroll mt-1 pl-3`}
                style={{ height: `${heightScreenTV}px` }}
            >
                <Card className={" w-full  mt-1 text-white rounded-none"}>
                    {isLoading ? (
                        <div className="flex justify-center p-2 align-middle ">
                            <Spinner className="w-6 h-6" color="amber" />
                            <p className="pl-2 text-center text-black">
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <div>
                            {dataGridLichChuaPhan.map((result, index) => {
                                return (
                                    <div key={index} id={result.id}>
                                        <Typography className="w-full p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                            {result.contentDataGird}
                                        </Typography>
                                        <Box>
                                            <DataGrid
                                                ref={result.ref}
                                                rows={result.rowsDataGrid}
                                                columns={columns}
                                                hideFooterPagination={true}
                                                containerProps={{
                                                    className: "hidden",
                                                }}
                                                disableRowSelectionOnClick
                                            />
                                        </Box>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
                <Card
                    className={
                        "grid w-full grid-flow-col mt-1 text-white rounded-none"
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
                            {dataGrid.map((result, index) => {
                                return (
                                    <div key={index} id={result.id}>
                                        <Typography className="w-full p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                            {result.contentDataGird}
                                        </Typography>

                                        <Box>
                                            <DataGrid
                                                rows={result.rowsDataGrid}
                                                columns={columnsRight}
                                                hideFooterPagination={true}
                                                containerProps={{
                                                    className: "hidden",
                                                }}
                                                disableRowSelectionOnClick
                                            />
                                        </Box>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
            </div>
            <div className="fixed flex mt-1">
                <div key={auth.user.id}>
                    {dataBtnFixed.map((result, index) => {
                        return (
                            <Button
                                key={index}
                                id={result.id}
                                className={`p-2 mx-1 text-green-700 border border-green-700 rounded-tr-none rounded-bl-none shadow-none focus:bg-green-700 focus:text-white `}
                                onClick={() => {
                                    scrollView(result.idFixedBtn);
                                }}
                                variant="outlined"
                            >
                                {result.contentBtnFixed}
                            </Button>
                        );
                    })}
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
                        className="text-green-700 rounded-tr-none rounded-bl-none"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <Button
                        size="sm"
                        className="p-2 text-green-700 border border-green-700 rounded-full"
                        onClick={handleSearch}
                        variant="outlined"
                    >
                        <MagnifyingGlassIcon className="w-4 h-4 " />
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
