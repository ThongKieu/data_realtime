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
    BookmarkSquareIcon,
} from "@heroicons/react/24/outline";
import newSocket from "@/Utils/Socket";
import { host } from "@/Utils/UrlApi";
import Divider from "@mui/material/Divider";
import {
    url_API,
    url_API_District,
    sendPhanThoRequest,
    sendDoiThoRequest,
    getFirstName,
    getFormattedToday,
} from "@/Data/UrlAPI/UrlApi";
import { copyTextToClipboard } from "@/Components/HandleEvent/Handles";
import AdminCheckDialog from "@/Components/AdminCheckDialog";
import {
    ThoDialog,
    KhaoSatDialog,
    ReasonDialog,
    ThuHoiDialog,
} from "@/Components/ColumnRightDialog";
import SpendingDialog from "@/Components/SpendingDialog";
import { HuyDialog } from "@/Components/ColumnRightDialog";
import { TABLE_HEAD_RIGHT, TABLE_HEAD_LEFT } from "@/Data/Table/Data";
import Select from "react-select";
// ----

function Dashboard({ auth }) {
    const [socketD, setSocketD] = useState();
    const [message, setMessage] = useState(auth.user.id);
    const [infoWorkerDashboard, setInfoWorkerDashboard] = useState([]);
    // table left
    const [workDataDN, setWorkDataDN] = useState([]);
    const [workDataDL, setWorkDataDL] = useState([]);
    const [workDataDG, setWorkDataDG] = useState([]);
    const [workDataNLMT, setWorkDataNLMT] = useState([]);
    const [workDataXD, setWorkDataXD] = useState([]);
    const [workDataVC, setWorkDataVC] = useState([]);
    const [workDataHX, setWorkDataHX] = useState([]);
    //---- Lịch Chưa Xử Lý Của Ngày Hôm Trước-------------------
    const [workDataDN_cu, setWorkDataDN_cu] = useState([]);
    const [workDataDL_cu, setWorkDataDL_cu] = useState([]);
    const [workDataDG_cu, setWorkDataDG_cu] = useState([]);
    const [workDataNLMT_cu, setWorkDataNLMT_cu] = useState([]);
    const [workDataXD_cu, setWorkDataXD_cu] = useState([]);
    const [workDataVC_cu, setWorkDataVC_cu] = useState([]);
    const [workDataHX_cu, setWorkDataHX_cu] = useState([]);
    // ---- Gộp Data--------------
    const totalArray = workDataDN_cu.concat(
        workDataDL_cu,
        workDataDG_cu,
        workDataNLMT_cu,
        workDataXD_cu,
        workDataVC_cu,
        workDataHX_cu
    );
    // format date Định dạng lại ngày
    const formattedToday = getFormattedToday();
    const [selectedDate, setSelectedDate] = useState(formattedToday);
    const dataDefault = [
        {
            id: 1,
            work_content: "1",
            BH: "",
            street: "",
            district: "",
            phone_number: "",
            date_book: "",
            worker_full_name: "",
            spending_total: "",
            income_total: "",
        },
    ];
    const [workDataDN_done, setWorkDataDN_done] = useState([]);
    const [workDataDL_done, setWorkDataDL_done] = useState([]);
    const [workDataDG_done, setWorkDataDG_done] = useState([]);
    const [workDataNLMT_done, setWorkDataNLMT_done] = useState([]);
    const [workDataXD_done, setWorkDataXD_done] = useState([]);
    const [workDataVC_done, setWorkDataVC_done] = useState([]);
    const [workDataHX_done, setWorkDataHX_done] = useState([]);

    // ---------------------------- thoi gian thuc su dung socket -------------------------
    const [isLoading, setIsLoading] = useState(true);
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [idUserFix, setIdUserFix] = useState();
    const [rowIdData, setRowIdData] = useState();
    useEffect(() => {
        fetchInfoWorker();
        fetchDateCheck(selectedDate);
        fetchDateDoneCheck(selectedDate);
        pushOn();
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight - 100,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [selectedDate]);
    useEffect(() => {
        if (socketD) {
            socketD.emit("pushOnline", message);
            pushOn();
        }
        setSocketD(newSocket, { secure: true });
        newSocket.on("UpdateDateTable_To_Client", (selectedDate, data) => {
            fetchDateCheck(data, selectedDate);
            fetchDateDoneCheck(data, selectedDate);
            fetchDataDashboard(data, selectedDate);
        });
        newSocket.on("sendAddWorkTo_Client", (selectedDate, data) => {
            if (data !== "") {
                fetchDateCheck(selectedDate);
                fetchDataDashboard(data);
                fetchDateDoneCheck(data, selectedDate);
            }
        });
        newSocket.on(
            "ButtonDisable_To_Client",
            ({ id, isDisabled, userFix }) => {
                setRowIdData(id);
                setIdUserFix(userFix);
                setIsButtonDisabled(isDisabled);
                fetchDateDoneCheck(selectedDate);
            }
        );
        return () => {
            newSocket.disconnect();
        };
    }, [selectedDate]);
    var heightScreenTV = screenSize.height;
    const handleDateChange = async (event) => {
        setSelectedDate(event.target.value);
        socketD?.emit("UpdateDateTable_To_Server", event);
    };
    const handleSearch = async () => {
        fetchDateCheck(selectedDate);
        fetchDateDoneCheck(selectedDate);
    };
    // --------------------------kiem tra socket io tai khoan online -----------------------------
    const pushOn = async () => {
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
        } catch (error) {
            console.log("push on Loi", error);
        }
    };
    // ---------------lay du lieu cong viec chua phan ---------
    const fetchDataDemo = async (url) => {
        if (url || url != undefined || url != null || url != "") {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                return jsonData;
            } catch (error) {
                console.error("Error fetching data:", error);
                return null;
            }
        } else {
            console.error("Fail connect fetch data demo");
        }
    };

    const fetchDateCheck = async (dateCheck) => {
        const url = `api/web/works?dateCheck=${selectedDate}`;
        const jsonData = await fetchDataDemo(url);
        if (jsonData) {
            setWorkDataDN(jsonData.dien_nuoc);
            setWorkDataDL(jsonData.dien_lanh);
            setWorkDataDG(jsonData.do_go);
            setWorkDataNLMT(jsonData.nlmt);
            setWorkDataXD(jsonData.xay_dung);
            setWorkDataVC(jsonData.tai_xe);
            setWorkDataHX(jsonData.co_khi);
            setWorkDataDN_cu(jsonData.dien_nuoc_cu);
            setWorkDataDL_cu(jsonData.dien_lanh_cu);
            setWorkDataDG_cu(jsonData.do_go_cu);
            setWorkDataNLMT_cu(jsonData.nlmt_cu);
            setWorkDataXD_cu(jsonData.xay_dung_cu);
            setWorkDataVC_cu(jsonData.tai_xe_cu);
            setWorkDataHX_cu(jsonData.co_khi_cu);
            setIsLoading(false);
        } else {
            console.log("Data lỗi không tồn tại!!");
        }
    };
    const fetchDateDoneCheck = async (dateCheck) => {
        const url = `/api/web/work-assignment?dateCheck=${selectedDate}`;
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
        } else {
            console.log("Data lỗi không tồn tại!!");
        }
    };
    // ----------------------------lay thong tin tho ----------------------------
    const fetchInfoWorker = async (e) => {
        try {
            const response = await fetch(host + "api/web/workers");
            const jsonData = await response.json();
            const formatJson = jsonData.map((item) => ({
                value: item.id,
                label:
                    "(" +
                    item.worker_code +
                    ")" +
                    " - " +
                    item.worker_full_name,
                workerCode: item.worker_code,
            }));
            setInfoWorkerDashboard(formatJson);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // -----------------------------fetch api update du lieu trong bang---------------------------
    const fetchUpdateData = async (data, url, socketUpdate) => {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                socketD?.emit(socketUpdate, data);
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data lỗi rồi:", error);
        }
    };
    const fetchDataDashboard = async (data) => {
        const url = `api/web/update/work`;
        const socketUpdate = "addWorkTo_Server";
        fetchUpdateData(data, url, socketUpdate);
    };
    const fetchDataWorkDone = async (data) => {
        const url = "api/web/update/work-continue";
        const socketUpdate = `UpdateDateTable_To_Server`;
        fetchUpdateData(data, url, socketUpdate);
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
            for (let i = 0; i < seri_imag?.length; i++) {
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
                socketD.emit("UpdateDateTable_To_Server", formData);
                socketD.emit("ButtonDisable_To_Server", formData);
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data lỗi rồi:", error);
        }
    };
    // ---------- Dialog ------------------------
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    // ----- lay thong tin bao hanh --------
    // du lieu bang cong viec chua phan ------------------------------------
    const columns = [
        {
            field: "work_content",
            headerName: "yêu Cầu Công Việc",
            width: 165,
            editable: true,
            tabindex: 0,
            renderEditCell: (params) => (
                <input
                    type="text"
                    defaultValue={params.row.work_content}
                    className=" bg-white border-none rounded-none outline-none w-[165px]"
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
                                <div className="object-cover object-center w-full p-2 mb-2 border border-green-500 rounded-lg shadow-xl">
                                    <p className="italic font-bold underline">
                                        Nội dung ghi chú:
                                    </p>
                                    <p>{params.row.work_note}</p>
                                </div>
                                <div className="object-cover object-center w-full p-2 mb-5 border border-green-500 rounded-lg shadow-xl">
                                    <p className="italic font-bold underline">
                                        Hình ảnh khách gửi:
                                    </p>
                                    <div className="flex flex-wrap">
                                        {data ||
                                        data !== "" ||
                                        data !== null ||
                                        data !== "undefine" ? (
                                            filteredArray?.map(
                                                (item, index) => (
                                                    <img
                                                        key={index}
                                                        className="object-cover object-center w-32 p-1 m-1 border border-green-500 rounded-sm shadow-xl"
                                                        src={`${host}${item}`}
                                                        alt="nature image"
                                                    />
                                                )
                                            )
                                        ) : (
                                            <p>Khách không gửi hình nha!</p>
                                        )}
                                    </div>
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
            width: 30,
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
                            console.log(newValue);
                            if (newValue.length > 10) {
                                alert("Số điện thoại không được quá 10 ký tự.");
                            } else {
                                const data = {
                                    ac: "5",
                                    id: params.id,
                                    phone_number: newValue,
                                };
                                // Gọi hàm xử lý cập nhật dữ liệu lên máy chủ
                                fetchDataDashboard(data);
                            }
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
                            console.log("Xóa thành Công");
                        }
                    } catch (error) {
                        console.log("Lỗi:", error);
                    }
                };

                const handleSentPhanTho = async (e) => {
                    await sendPhanThoRequest(
                        params,
                        selectPhanTho,
                        auth,
                        socketD,
                        copyTextToClipboard,
                        handleOpenTho
                    );
                };
                const handleSentNhanDoi = async (e) => {
                    // Lấy dữ liệu từ params.row
                    const originalData = params.row;

                    // Tạo bản sao của dữ liệu ban đầu và đặt ID thành null (hoặc một giá trị mới nếu cần)
                    const duplicatedData = {
                        ...originalData,
                        id: null,
                        work_content: params.row.work_content + " " + "(copy)",
                    };

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
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };
                return (
                    <div className="flex flex-row justify-center">
                        <Tooltip
                            content="Phân Thợ"
                            animate={{
                                mount: {
                                    scale: 1,
                                    y: 0,
                                },
                                unmount: {
                                    scale: 0,
                                    y: 25,
                                },
                            }}
                        >
                            <UserPlusIcon
                                className="w-8 h-8 p-1 mr-1 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                                onClick={handleOpenTho}
                            />
                        </Tooltip>
                        <Tooltip
                            content="Hủy Lịch"
                            animate={{
                                mount: {
                                    scale: 1,
                                    y: 0,
                                },
                                unmount: {
                                    scale: 0,
                                    y: 25,
                                },
                            }}
                        >
                            <TrashIcon
                                className="w-8 h-8 p-1 mr-1 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                                onClick={handleOpen}
                            />
                        </Tooltip>
                        <Tooltip
                            content="Nhân Đôi"
                            animate={{
                                mount: {
                                    scale: 1,
                                    y: 0,
                                },
                                unmount: {
                                    scale: 0,
                                    y: 25,
                                },
                            }}
                        >
                            <DocumentDuplicateIcon
                                className="w-8 h-8 p-1 mr-1 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                onClick={handleSentNhanDoi}
                            />
                        </Tooltip>

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
    // du lieu bang cong viec da phan -----------------------------------
    const columnsright = [
        {
            field: "work_content",
            headerName: "yêu cầu công việc",
            width: 180,
            editable: false,
        },
        {
            field: "BH",
            headerName: "BH",
            width: 50,
            editable: false,
            type: "text",
            renderCell: (params, index) => {
                const [TTBH, setDataBH] = useState([]);
                const [open, setOpen] = useState(false);
                const [checkBtnBh, setCheckBtnBH] = useState(0);
                useEffect(() => {
                    getDataBh();
                }, []);
                useEffect(() => {
                    newSocket.on("UpdateDateTable_To_Client", () => {
                        getDataBh();
                    });
                }, []);
                const handleOpen = () => {
                    setOpen(!open);
                };
                const getDataBh = async () => {
                    if (params.row.id != "undefined") {
                        try {
                            const url = `/api/web/work-assignment/warranties?id=${params.row.id}`;
                            const response = await fetch(url);
                            const data = await response.json();
                            if (data != "") {
                                setDataBH(data);
                            } else {
                                setCheckBtnBH(1);
                            }
                        } catch (error) {
                            console.error("Error fetching data:", error);
                        }
                    }
                };
                const TABLE_HEAD = ["STT", "Thời Gian", "Nội Dung"];
                return (
                    <>
                        <IconButton
                            className={`${
                                checkBtnBh == 0 ? "" : "hidden"
                            } w-8 h-8 p-1`}
                            variant="outlined"
                            onClick={() => {
                                handleOpen();
                                getDataBh();
                            }}
                        >
                            <ClipboardDocumentListIcon className="w-4 h-4" />
                        </IconButton>

                        <Dialog open={open} handler={handleOpen} size="sm">
                            <DialogHeader>Thông Tin Bảo Hành</DialogHeader>
                            <DialogBody divider>
                                <div className="h-[50vh] overflow-y-auto">
                                    <Card className="w-full h-full overflow-scroll">
                                        <table className="w-full text-left table-auto min-w-max">
                                            <thead>
                                                <tr>
                                                    {TABLE_HEAD.map((head) => (
                                                        <th
                                                            key={head}
                                                            className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                                                        >
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal leading-none opacity-70"
                                                            >
                                                                {head}
                                                            </Typography>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {TTBH?.map(
                                                    (
                                                        {
                                                            warranty_time,
                                                            unit,
                                                            warranty_info,
                                                        },
                                                        index
                                                    ) => {
                                                        const isLast =
                                                            index ===
                                                            TTBH.length - 1;
                                                        const classes = isLast
                                                            ? "p-4"
                                                            : "p-4 border border-blue-gray-50";

                                                        return (
                                                            <tr key={index}>
                                                                <td
                                                                    className={`${classes} w-[10px]`}
                                                                >
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {index}
                                                                    </Typography>
                                                                </td>
                                                                <td
                                                                    className={`${classes} w-[70px]`}
                                                                >
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {warranty_time ===
                                                                        0
                                                                            ? "kbh"
                                                                            : `${warranty_time} ${
                                                                                  unit ===
                                                                                  "d"
                                                                                      ? "ngày"
                                                                                      : unit ===
                                                                                        "w"
                                                                                      ? "tuần"
                                                                                      : unit ===
                                                                                        "m"
                                                                                      ? "tháng"
                                                                                      : unit ===
                                                                                        "y"
                                                                                      ? "năm"
                                                                                      : ""
                                                                              }`}
                                                                    </Typography>
                                                                </td>
                                                                <td
                                                                    className={`${classes} w-[180px]`}
                                                                >
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {
                                                                            warranty_info
                                                                        }
                                                                    </Typography>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </Card>
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
                    </>
                );
            },
        },
        {
            field: "real_note",
            headerName: "Ghi Chú",
            type: "text",
            width: 90,
            align: "left",
            headerAlign: "left",
            editable: false,
        },
        {
            field: "street",
            headerName: "Địa Chỉ",
            type: "text",
            width: 170,
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
            field: "worker_full_name",
            headerName: "Thợ",
            width: 140,
            editable: false,
            type: "singleSelect",
            renderCell: (params) => {
                const [openWorkerNameTableRight, setOpenWorkerNameTableRight] =
                    useState(false);
                const handleOpenTho = () =>
                    setOpenWorkerNameTableRight(!openWorkerNameTableRight);
                const [cardExpires, setCardExpires] = useState(params.row);
                const [selectPhanTho, setSelectPhanTho] = useState("");
                const handleSelectChange = (selectedValue) => {
                    setSelectPhanTho(selectedValue); // Cập nhật giá trị được chọn trong state
                };
                const [reasonMessage, setReasonMessage] = useState();
                const handleDoiTho = async (e) => {
                    await sendDoiThoRequest(
                        params,
                        selectPhanTho,
                        auth,
                        socketD,
                        copyTextToClipboard,
                        handleOpenTho,
                        reasonMessage
                    );
                };
                const check_admin = params.row.status_admin_check == 1;
                const [idPhuArray, setIdPhuArray] = useState([]);
                useEffect(() => {
                    if (cardExpires.id_phu !== 0) {
                        const newIdPhuArray = cardExpires.id_phu
                            .split(",")
                            .map((item) => Number(item.replace(/\[|\]/g, "")));
                        setIdPhuArray(newIdPhuArray);
                    }
                }, [cardExpires.id_phu]);
                const resultArray = idPhuArray.map((value) => {
                    const foundElement = infoWorkerDashboard.find(
                        (element) => element.value === value
                    );
                    return foundElement ? foundElement.label : "";
                });
                const firstName = getFirstName(params.row.worker_full_name);

                return (
                    <>
                        {check_admin ||
                        params.row.status_work === 1 ||
                        params.row.income_total !== 0 ||
                        params.row.spending_total !== 0 ? (
                            <p>{`(${params.row.worker_code}) ${firstName} `}</p>
                        ) : (
                            <>
                                <p
                                    onClick={handleOpenTho}
                                    className="cursor-pointer "
                                >
                                    {`(${params.row.worker_code}) ${firstName} `}
                                </p>
                                <Dialog
                                    open={openWorkerNameTableRight}
                                    handler={handleOpenTho}
                                    className=" max-w-full min-w-full p-2 2xl:min-w-[40%]"
                                >
                                    <div className="flex items-center justify-between">
                                        <DialogHeader>
                                            Thông Tin Phân Công Thợ
                                        </DialogHeader>
                                        <XMarkIcon
                                            onClick={handleOpenTho}
                                            className="w-5 h-5 mr-3 cursor-pointer"
                                        />
                                    </div>
                                    <DialogBody divider>
                                        <div className="flex justify-between">
                                            <p className="w-full p-1 border border-green-500">
                                                Thợ Chính:{" "}
                                                {cardExpires.worker_full_name}
                                            </p>

                                            {idPhuArray != 0 ? (
                                                <p className="w-full p-1 border border-green-500">
                                                    Thợ Phụ:
                                                    <p className="pl-4">
                                                        {resultArray.map(
                                                            (item, index) => (
                                                                <p
                                                                    className="block"
                                                                    key={index}
                                                                >
                                                                    {index + 1}:
                                                                    {item}
                                                                </p>
                                                            )
                                                        )}
                                                    </p>
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <Card className="p-2 mt-2 border border-green-500 ">
                                            <Typography className="p-2 font-bold text-center text-white uppercase rounded-sm bg-blue-gray-500">
                                                Chọn Thợ Cần Đổi
                                            </Typography>
                                            <form className="flex flex-col gap-4 mt-2">
                                                <div className="flex items-center gap-4 ">
                                                    <Select
                                                        closeMenuOnSelect={
                                                            false
                                                        }
                                                        value={selectPhanTho}
                                                        options={
                                                            infoWorkerDashboard
                                                        }
                                                        onChange={(
                                                            selectedValue
                                                        ) =>
                                                            handleSelectChange(
                                                                selectedValue
                                                            )
                                                        }
                                                        isMulti
                                                        className="w-full border-none shadow-none"
                                                    />
                                                </div>
                                                <Input
                                                    label="Lý Do Đổi Thợ"
                                                    className="shadow-none"
                                                    id="returnWorker"
                                                    name="returnWorker"
                                                    value={reasonMessage}
                                                    onChange={(e) =>
                                                        setReasonMessage(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Divider />
                                                <div
                                                    className="flex flex-row-reverse"
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleDoiTho();
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                >
                                                    <Button
                                                        size="md"
                                                        className="p-4 py-2 mx-4 text-green-500 border-green-500 "
                                                        variant="outlined"
                                                        onClick={() =>
                                                            handleDoiTho()
                                                        }
                                                    >
                                                        Xác Nhận
                                                    </Button>
                                                    <Button
                                                        size="md"
                                                        className="p-3 py-0 mx-4 text-gray-500 border-gray-500 "
                                                        variant="outlined"
                                                        onClick={handleOpenTho}
                                                    >
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </form>
                                        </Card>
                                    </DialogBody>
                                </Dialog>
                            </>
                        )}
                    </>
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
            width: 130,
            editable: false,
            cellClassName: "actions",
            renderCell: (params) => {
                const [cardExpires, setCardExpires] = useState(params.row);
                const useToggle = (initialState) => {
                    const [open, setOpen] = useState(initialState);
                    const handleOpen = () => {
                        setOpen(!open);
                    };
                    return [open, handleOpen];
                };
                // Sử dụng hàm useToggle
                const [openHuy, handleOpenHuy] = useToggle(false);
                const [openKS, handleOpenKS] = useToggle(false);
                const [openThuHoi, handleOpenThuHoi] = useToggle(false);
                const [openAdminCheck, handleOpenAdminCheck] = useToggle(false);
                const [openSpending_total, handleOpenSpending_total] =
                    useToggle(false);
                const [work_note, setWorkNote] = useState();
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setCardExpires((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                };
                const handleButtonAction = (
                    rowId,
                    isOpenState,
                    handleOpenFunction,
                    actionType
                ) => {
                    // Gửi thông điệp đến server để thông báo về việc disable button

                    socketD.emit("ButtonDisable_To_Server", {
                        id: rowId,
                        isDisabled: !isOpenState,
                        userFix: auth.user.name,
                    });
                    switch (actionType) {
                        case "openSpendingTotal":
                            handleOpenFunction(!isOpenState);
                            console.log("isOpenState", !isOpenState);
                            break;
                        case "openHuy":
                            handleOpenFunction(!isOpenState);
                            break;
                        case "openKS":
                            handleOpenFunction(!isOpenState);
                            break;
                        case "openThuHoi":
                            handleOpenFunction(!isOpenState);
                            break;
                        case "openAdminCheck":
                            handleOpenFunction(!isOpenState);
                            break;
                        default:
                            break;
                    }
                };
                const handleOpenSpendingTotalWithDisable = (rowId) => {
                    rowId = params.row.id;
                    handleButtonAction(
                        rowId,
                        openSpending_total,
                        handleOpenSpending_total,
                        "openSpendingTotal"
                    );
                    console.log("xin chao openSpendingTotal", rowId);
                };
                const handleOpenHuyWithDisable = (rowId) => {
                    rowId = params.row.id;
                    handleButtonAction(
                        rowId,
                        openHuy,
                        handleOpenHuy,
                        "openHuy"
                    );
                };
                const handleOpenKSWithDisable = (rowId) => {
                    rowId = params.row.id;
                    handleButtonAction(rowId, openKS, handleOpenKS, "openKS");
                };
                const handleOpenThuHoiWithDisable = (rowId) => {
                    rowId = params.row.id;
                    handleButtonAction(
                        rowId,
                        openThuHoi,
                        handleOpenThuHoi,
                        "openThuHoi"
                    );
                };
                const handleOpenAdminCheckWithDisable = (rowId) => {
                    rowId = params.row.id;
                    handleButtonAction(
                        rowId,
                        openAdminCheck,
                        handleOpenAdminCheck,
                        "openAdminCheck"
                    );
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
                            socketD.emit(
                                "addWorkTo_Server",
                                "Xóa lịch đã phân"
                            );
                            handleOpen();
                        }
                    } catch (error) {}
                };
                const [selectedFilesKS, setSelectedFilesKS] = useState([]);
                const handleSentKS = async () => {
                    try {
                        let data = {
                            id: params.id,
                            id_cus: params.row.id_cus,
                            real_note: params.row.real_note,
                            auth_id: auth.user.id,
                            image_work_path: selectedFilesKS,
                        };
                        console.log("data khao sat:", data);
                        const response = await fetch(
                            "api/web/update/work-assignment-quote",
                            {
                                method: "POST",
                                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                                headers: {
                                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                                },
                            }
                        );
                        if (response.ok) {
                            socketD.emit("addWorkTo_Server", "Khảo sát");
                            handleOpen();
                            handleOpenKSWithDisable();
                        }
                    } catch (error) {}
                };
                // --------- thu chi ----------------------------
                const [isDataChanged, setIsDataChanged] = useState([]);
                const handleDataFromChild = (data) => setIsDataChanged(data);
                // const [selectedFiles, setSelectedFiles] = useState([]);
                const [selectedFilesPT, setSelectedFilesPT] = useState([]);
                const [selectedFilesVT, setSelectedFilesVT] = useState([]);

                const [previewImgVt, setPreviewImgVt] = useState([]);
                const [previewImgPt, setPreviewImgPt] = useState([]);
                const [previewImgKS, setPreviewImgKS] = useState([]);
                const handleFileChange = (
                    e,
                    setImagePreview,
                    setSelectedFiles
                ) => {
                    const files = Array.from(e.target.files);
                    if (typeof setSelectedFiles === "function") {
                        setSelectedFiles(files);
                    } else {
                        console.error("setSelectedFiles is not a function");
                    }
                    const previews = files.map((file) =>
                        URL.createObjectURL(file)
                    );
                    setImagePreview(previews);
                };
                const handleImageSubmit = (selectedHinh, type, id_ac) => {
                    if (selectedHinh) {
                        const urlAPI = `api/web/update/check-admin`;
                        const formData = new FormData();
                        formData.append("ac", id_ac);
                        formData.append("id", params.row.id);
                        formData.append("auth_id", auth.user.id);
                        for (let i = 0; i < selectedHinh?.length; i++) {
                            formData.append(
                                `${
                                    id_ac == 2
                                        ? "bill_imag_new[]"
                                        : "seri_imag_new[]"
                                }`,
                                selectedHinh[i]
                            );
                        }
                        const res = fetch(urlAPI, {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            mode: "no-cors",
                            body: formData,
                        });

                        if (res.ok) {
                            socketD.emit("UpdateDateTable_To_Server", formData);
                        } else {
                            console.error(
                                "Lỗi khi gửi dữ liệu:",
                                res.statusText
                            );
                        }
                    } else {
                        console.log("Vui lòng chọn hình trước khi gửi.");
                    }
                };
                const vatCard = params.row.bill_image === null;
                const [isAllowed, setIsAllowed] = useState(false); // Trạng thái cho phép/mở
                const [valueRadio, setValueRadio] = useState("0");
                const handleRadioChangeAllow = (e) => {
                    const value = e.target.value;
                    setIsAllowed(value === "1");
                    setValueRadio(value); // Nếu radio "allow" được chọn, cho phép.
                };
                // Các phần khác của component
                const handleUpdateThuChi = async (e) => {
                    e.preventDefault();
                    const UrlApi = `api/web/update/work-continue`;
                    const jsonArray = JSON.stringify(isDataChanged);
                    const data_0 = {
                        ...cardExpires,
                        ac: valueRadio,
                        id: params.row.id,
                        member_read: auth.user.id,
                        warranty: jsonArray,
                    };
                    const data_1 = {
                        ac: valueRadio,
                        id: params.row.id,
                        id_cus: params.row.id_cus,
                        id_worker: params.row.id_worker,
                        id_phu: params.row.id_phu,
                    };
                    if (valueRadio === "0") {
                        const image_Pt =
                            document.getElementById("image_Pt")?.files;
                        const image_Vt =
                            document.getElementById("image_Vt")?.files;
                        fetchDataUpdateThuchi(
                            data_0,
                            UrlApi,
                            image_Pt,
                            image_Vt
                        );
                    } else if (valueRadio === "1") {
                        fetchDataUpdateThuchi(data_1, UrlApi);
                    }
                    handleOpenSpending_total();
                };

                const handleThuHoi = async (e) => {
                    let data = {
                        id: params.id,
                        id_cus: params.row.id_cus,
                        // auth_id: auth.user.id,
                        real_note: params.row.real_note,
                        worker_name: params.row.worker_full_name,
                    };
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
                            socketD.emit(
                                "returnWorkWebToServer",
                                params.row.id_worker
                            );
                            handleOpenThuHoi();
                        }
                    } catch (error) {
                        console.log("Loi", error);
                    }
                };
                const dataBtnChi = [
                    {
                        id: "BtnTraLich",
                        content: "Trả Lịch",
                        className: "text-blue-500 rounded-none border-blue-500",
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
                const DK1 =
                    auth.user.permission != 1 && auth.user.permission != 0
                        ? "hidden"
                        : "";
                const DK2 = spending !== 0 || income !== 0 ? "hidden" : "";
                const DK3 = spending !== 0 || income !== 0 ? "" : "hidden";
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

                    // Sử dụng window.confirm thay vì alert
                    const userConfirmed = window.confirm(
                        "Có thật muốn xóa hình"
                    );

                    if (userConfirmed) {
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
                                console.log("Hình đã được xóa thành công");
                            } else {
                                console.error(
                                    "Lỗi khi gửi yêu cầu xóa hình:",
                                    response.statusText
                                );
                            }
                        } catch (error) {
                            console.error(
                                "Lỗi khi gửi yêu cầu xóa hình:",
                                error
                            );
                        }
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
                    const urlApi = "api/web/update/check-admin";
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
                    try {
                        const response = await fetch(urlApi, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: jsonData,
                        });

                        if (response.ok) {
                            console.log(
                                "Hình đã được xóa thành công từ máy chủ",
                                dataBody
                            );
                            socketD.emit("addWorkTo_Server");
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
                const classButtonDaPhan = `w-8 h-8 p-1 mr-2 rounded border cursor-pointer hover:text-white ${
                    params.row.flag_check === 1 ? "hidden" : ""
                }`;
                return (
                    <div className="text-center">
                        {isButtonDisabled == true &&
                        params.row.id == rowIdData ? (
                            <p className="w-full text-center">{idUserFix}</p>
                        ) : (
                            <div className="flex flex-row justify-center">
                                {check_admin ||
                                (check_admin &&
                                    selectedDate != formattedToday) ? (
                                    <>
                                        <Tooltip content="Admin đã xác nhận">
                                            <CheckCircleIcon
                                                className={`text-green-500 border-green-500 hover:bg-green-500 w-8 h-8 p-1 mr-2 rounded border hover:text-white ${
                                                    params.row.flag_check === 1
                                                        ? "hidden"
                                                        : ""
                                                }`}
                                            />
                                        </Tooltip>
                                    </>
                                ) : params.row.status_work == 1 ? (
                                    <p
                                        className={`p-1 text-blue-500 border border-blue-500 rounded-sm`}
                                    >
                                        Mai Làm Tiếp
                                    </p>
                                ) : params.row.status_work == 3 ? (
                                    <p
                                        className={`p-1 text-blue-500 border border-blue-500 rounded-sm`}
                                    >
                                        Khảo Sát
                                    </p>
                                ) : (
                                    <>
                                        <Tooltip
                                            content="Nhập Thu Chi"
                                            animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: {
                                                    scale: 0,
                                                    y: 25,
                                                },
                                            }}
                                        >
                                            <Button
                                                color="white"
                                                className={`text-green-500 bg-none hover:bg-green-500 border-green-500 ${classButtonDaPhan} ${DK2} `}
                                                onClick={
                                                    handleOpenSpendingTotalWithDisable
                                                }
                                            >
                                                <ArrowUpTrayIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip
                                            content="Sửa liên hệ admin"
                                            animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: {
                                                    scale: 0,
                                                    y: 25,
                                                },
                                            }}
                                        >
                                            <BookmarkSquareIcon
                                                className={`text-green-500 border hover:bg-green-500  border-green-500 cursor-help ${classButtonDaPhan} ${DK3}`}
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            content="Admin Check"
                                            animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: {
                                                    scale: 0,
                                                    y: 25,
                                                },
                                            }}
                                        >
                                            <Button
                                                className={`text-blue-500 border-blue-500 hover:bg-blue-500 ${classButtonDaPhan} ${DK1}`}
                                                onClick={() => {
                                                    handleOpenAdminCheckWithDisable();
                                                }}
                                                variant="outlined"
                                            >
                                                <EyeIcon />
                                            </Button>
                                        </Tooltip>
                                        <Menu allowHover>
                                            <MenuHandler>
                                                <EllipsisVerticalIcon
                                                    className={`w-8 h-8 pt-2 cursor-pointer hover:bg-orange-300 border-orange-300 ${classButtonDaPhan} ${DK1} ${DK2}`}
                                                />
                                            </MenuHandler>
                                            <MenuList className="flex justify-between p-1 border border-green-500 rounded-none w-fit min-w-fit MenuListEdit">
                                                <MenuItem className="p-0 w-fit">
                                                    <Tooltip
                                                        content="Thu Hồi Lịch"
                                                        animate={{
                                                            mount: {
                                                                scale: 1,
                                                                y: 0,
                                                            },
                                                            unmount: {
                                                                scale: 0,
                                                                y: 25,
                                                            },
                                                        }}
                                                    >
                                                        <ArrowPathIcon
                                                            className={`text-blue-500 border border-blue-500  hover:bg-blue-500 ${classButtonDaPhan} `}
                                                            onClick={
                                                                handleOpenThuHoiWithDisable
                                                            }
                                                        />
                                                    </Tooltip>
                                                </MenuItem>
                                                <MenuItem className="p-0 w-fit">
                                                    <Tooltip
                                                        content="Báo hủy"
                                                        animate={{
                                                            mount: {
                                                                scale: 1,
                                                                y: 0,
                                                            },
                                                            unmount: {
                                                                scale: 0,
                                                                y: 25,
                                                            },
                                                        }}
                                                    >
                                                        <TrashIcon
                                                            className={`text-red-500 border border-red-500 hover:bg-red-500 ${classButtonDaPhan}`}
                                                            onClick={
                                                                handleOpenHuyWithDisable
                                                            }
                                                        />
                                                    </Tooltip>
                                                </MenuItem>
                                                <MenuItem className="p-0 w-fit">
                                                    <Tooltip
                                                        content="Khảo Sát"
                                                        position="top" // Đặt vị trí của Tooltip ở trên (các giá trị khác có thể là 'bottom', 'left', 'right', ...)
                                                        arrowSize={10} // Đặt kích thước mũi tên của Tooltip
                                                        padding={10} // Đặt khoảng cách giữa nội dung và mép của Tooltip
                                                        distance={10} // Đặt khoảng cách giữa Tooltip và phần tử mục tiêu
                                                        tagName="div" // Đặt loại thẻ sẽ được sử dụng cho Tooltip (mặc định là 'span')
                                                        className="custom-tooltip" // Đặt class cho Tooltip để tùy chỉnh kiểu dáng
                                                        contentStyle={{
                                                            backgroundColor:
                                                                "red",
                                                            color: "white",
                                                        }}
                                                        animate={{
                                                            mount: {
                                                                scale: 1,
                                                                y: 0,
                                                            },
                                                            unmount: {
                                                                scale: 0,
                                                                y: 25,
                                                            },
                                                        }}
                                                    >
                                                        <TicketIcon
                                                            className="w-8 h-8 p-1 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                                                            onClick={
                                                                handleOpenKSWithDisable
                                                            }
                                                        />
                                                    </Tooltip>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </>
                                )}
                            </div>
                        )}

                        {/* ----------------ADMIN CHECK ------------ */}
                        <AdminCheckDialog
                            imageVt1={imageVt1}
                            host={host}
                            params={params}
                            imagePt1={imagePt1}
                            previewImagesVT={previewImgVt}
                            previewImagesPT={previewImgPt}
                            openAdminCheck={openAdminCheck}
                            handleOpenAdminCheck={
                                handleOpenAdminCheckWithDisable
                            }
                            handleFileChangeVt={(e) =>
                                handleFileChange(
                                    e,
                                    setPreviewImgVt,
                                    setSelectedFilesVT
                                )
                            }
                            handleFileChangePt={(e) =>
                                handleFileChange(
                                    e,
                                    setPreviewImgPt,
                                    setSelectedFilesPT
                                )
                            }
                            handleImageVtDelete={(index) => {
                                handleImageVtDelete(index);
                            }}
                            handleImagePtDelete={(index) => {
                                handleImagePtDelete(index);
                            }}
                            handleChange={handleChange}
                            cardExpires={cardExpires}
                            auth={auth}
                            handleSendImagePT={() =>
                                handleImageSubmit(selectedFilesPT, "PT", 3)
                            }
                            handleSendImageVT={() =>
                                handleImageSubmit(selectedFilesVT, "VT", 2)
                            }
                            socketD={socketD}
                            handleSearch={handleSearch}
                        />
                        {/*----------------------------- dialog form Thu Hoi ----------- */}
                        <ThuHoiDialog
                            openThuHoi={openThuHoi}
                            handleOpenThuHoi={handleOpenThuHoiWithDisable}
                            setWorkNote={setWorkNote}
                            handleThuHoi={handleThuHoi}
                        />
                        {/*----------------------------- dialog form Huy ----------- */}
                        <HuyDialog
                            openHuy={openHuy}
                            handleOpenHuy={handleOpenHuyWithDisable}
                            setWorkNote={setWorkNote}
                            handleSentDeleteDone={handleSentDeleteDone}
                        />
                        {/*----------------------------- dialog form Huy ----------- */}
                        <KhaoSatDialog
                            openKS={openKS}
                            handleOpenKS={handleOpenKSWithDisable}
                            setWorkNote={setWorkNote}
                            handleSentKS={handleSentKS}
                            cardExpires={cardExpires}
                            handleChange={handleChange}
                            vatCard={vatCard}
                            disabledAllowed={isAllowed}
                            handleFileChange={(e) =>
                                handleFileChange(
                                    e,
                                    setPreviewImgKS,
                                    setSelectedFilesKS
                                )
                            }
                            previewImages={previewImgKS}
                        />
                        {/* ------------------Dialog Thu Chi----------------------------------- */}
                        <SpendingDialog
                            openSpending_total={openSpending_total}
                            handleOpenSpending_total={
                                handleOpenSpendingTotalWithDisable
                            }
                            isAllowed={isAllowed}
                            handleRadioChangeAllow={handleRadioChangeAllow}
                            cardExpires={cardExpires}
                            handleChange={handleChange}
                            vatCard={vatCard}
                            previewImgVt={previewImgVt}
                            handleFileChangeVt={(e) =>
                                handleFileChange(e, setPreviewImgVt, null)
                            }
                            handleFileChangePt={(e) =>
                                handleFileChange(e, setPreviewImgPt, null)
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
    const DNCU = useRef(null);
    const DN = useRef(null);
    const DL = useRef(null);
    const DG = useRef(null);
    const NLMT = useRef(null);
    const XD = useRef(null);
    const VC = useRef(null);
    const HX = useRef(null);
    // ----------------------------nut scrollView trong bang --------------------------
    const scrollView = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    // ----------------------------ket thuc nut scrollView trong bang --------------------------
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
    const dataGridLichChuaPhan = [
        {
            id: "workDNCu",
            rowsDataGrid: totalArray,
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
        // Thêm các mục khác tương tự ở đây
    ];
    return (
        <AuthenticatedLayout
            children={auth.user}
            user={auth.user}
            checkDate={selectedDate}
        >
            <Head title="Lịch Hẹn" />
            <div
                className={`flex flex-row w-full overflow-scroll mt-1 gap-[2px] `}
                style={{ height: `${heightScreenTV}px` }}
            >
                <Card className="w-full mt-1 text-white rounded-none basis-5/12">
                    {isLoading ? (
                        <div className="flex justify-center p-2 align-middle ">
                            <Spinner className="w-6 h-6" color="amber" />
                            <p className="pl-2 text-center text-black">
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <div
                            id="tableLeft"
                            className="bg-white border-blue-700"
                        >
                            <table className=" sticky top-0 z-50 -mt-[10px] py-[10px] pr-12 bg-white  w-[100%]">
                                <thead>
                                    <tr className="w-full">
                                        {TABLE_HEAD_LEFT.map((head) => (
                                            <th
                                                key={head.id}
                                                className={`p-0 py-1`}
                                                style={{
                                                    width: `${head.colWidthLeft}px`,
                                                }}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="w-full font-bold leading-none text-black uppercase"
                                                >
                                                    {head.nameHeadLeft}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                            </table>
                            {dataGridLichChuaPhan.map((result, index) => {
                                return (
                                    <div key={index} id={result.id}>
                                        <Typography className="w-full p-1 font-bold text-center bg-blue-400 rounded-none shadow-lg text-medium">
                                            {result.contentDataGird}
                                        </Typography>
                                        <Box
                                            sx={{
                                                height:
                                                    result.rowsDataGrid == ""
                                                        ? 40
                                                        : "fit-content",
                                                width: "100%",
                                            }}
                                        >
                                            <DataGrid
                                                sx={{
                                                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
                                                        {
                                                            outline:
                                                                "none !important",
                                                        },
                                                    ".MuiDataGrid-withBorderColor":
                                                        {
                                                            borderRight:
                                                                "1px solid #e0e0e0",
                                                        },
                                                }}
                                                rows={result.rowsDataGrid}
                                                columns={columns}
                                                hideFooterPagination={true}
                                                autoHeight
                                                {...heightScreenTV}
                                                ref={result.ref}
                                                containerProps={{
                                                    className: "hidden",
                                                }}
                                                rowHeight={40}
                                                disableRowSelectionOnClick
                                                slots={{
                                                    columnHeaders: () => null,
                                                    pagination: () => null,
                                                }}
                                                slotProps={{
                                                    cell: { border: "red" },
                                                }}
                                            />
                                        </Box>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
                <Card className="grid w-full grid-flow-col mt-1 text-white rounded-none basis-7/12">
                    {isLoading ? (
                        <div className="flex justify-center p-2 align-middle ">
                            <Spinner className="w-6 h-6" color="amber" />
                            <p className="pl-2 text-center text-black">
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <div id="tableRight" className="bg-white">
                            <table className="sticky top-0 z-50 -mt-[10px] py-[10px] pr-12 bg-white w-[100%] ">
                                <thead>
                                    <tr className="w-full">
                                        {TABLE_HEAD_RIGHT.map((head) => (
                                            <th
                                                key={head.id}
                                                className={`p-0 py-1`}
                                                style={{
                                                    width: `${head.colWidth}px`,
                                                }}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="w-full font-bold leading-none text-black uppercase"
                                                >
                                                    {head.nameHead}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                            </table>
                            {dataGrid.map((result, index) => {
                                return (
                                    <div key={index} id={result.id}>
                                        <Typography className="w-full p-1 font-bold text-center bg-blue-400 rounded-none shadow-lg text-medium">
                                            {result.contentDataGird}
                                        </Typography>
                                        <Box
                                            sx={{
                                                height:
                                                    result.rowsDataGrid == ""
                                                        ? 40
                                                        : "fit-content",
                                                width: "100%",
                                            }}
                                        >
                                            <DataGrid
                                                sx={{
                                                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
                                                        {
                                                            outline:
                                                                "none !important",
                                                        },
                                                    ".MuiDataGrid-withBorderColor":
                                                        {
                                                            borderRight:
                                                                "1px solid #e0e0e0",
                                                        },
                                                }}
                                                width={100}
                                                autoHeight
                                                {...heightScreenTV}
                                                rows={result.rowsDataGrid}
                                                columns={columnsright}
                                                hideFooterPagination={false}
                                                rowHeight={40}
                                                disableRowSelectionOnClick
                                                slots={{
                                                    columnHeaders: () => null,
                                                }}
                                            />
                                        </Box>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
            </div>
            <div className="fixed z-30 flex mt-1">
                <>
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
                </>
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
