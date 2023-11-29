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
import Divider from "@mui/material/Divider";
import {
    url_API,
    url_API_District,
    sendPhanThoRequest,
} from "@/data/UrlAPI/UrlApi";
import AdminCheckDialog from "@/Components/AdminCheckDialog";
import {
    ThoDialog,
    KhaoSatDialog,
    ReasonDialog,
    ThuHoiDialog,
} from "@/Components/ColumnRightDialog";
import SpendingDialog from "@/Components/SpendingDialog";
import { HuyDialog } from "@/Components/ColumnRightDialog";
import Select from "react-select";
// ----

function Dashboard({ auth }) {
    const [socketD, setSocketD] = useState();
    const [message, setMessage] = useState(auth.user.id);
    const [infoWorkerDashboard, setInfoWorkerDashboard] = useState([]);
    // table left
    const [workDataDN, setWorkDataDN] = useState("");
    const [workDataDNCu, setWorkDataDNCu] = useState("");
    const [workDataDL, setWorkDataDL] = useState("");
    const [workDataDG, setWorkDataDG] = useState("");
    const [workDataNLMT, setWorkDataNLMT] = useState("");
    const [workDataXD, setWorkDataXD] = useState("");
    const [workDataVC, setWorkDataVC] = useState("");
    const [workDataHX, setWorkDataHX] = useState("");
    // format date Định dạng lại ngày
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedToday = `${year}-${month}-${day}`;

    const [selectedDate, setSelectedDate] = useState(formattedToday);
    // table right
    console.log(selectedDate, formattedToday);
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
        fetchDateCheck(selectedDate);
        fetchDateDoneCheck(selectedDate);
        if (socketD) {
            socketD.emit("pushOnline", message);
            pushOn();
        }
        setSocketD(newSocket, { secure: true });
        newSocket.on("UpdateDateTable_To_Client", (selectedDate, data) => {
            fetchDateCheck(selectedDate);
            fetchDataDashboard(selectedDate, data);
            fetchDataDaPhan(selectedDate, data);
        });
        newSocket.on("sendAddWorkTo_Client", (data) => {
            if (data !== "") {
                fetchDateCheck(selectedDate);
                fetchDataDashboard(data);
                fetchData(data);
                fetchDataDaPhan(data);
            }
        });
        return () => {
            newSocket.disconnect();
        };
    }, [selectedDate]);

    const handleDateChange = async (event) => {
        setSelectedDate(event.target.value);
        socketD?.emit("UpdateDateTable_To_Server", event);
    };
    const handleSearch = async () => {
        fetchDateCheck(selectedDate);
        console.log("xinchaoselecteddate", selectedDate);
        fetchDateDoneCheck(selectedDate);
    };
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
        } catch (error) {
            console.log("push on Loi", error);
        }
    };
    // ---------------lay du lieu cong viec chua phan ---------
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
    const fetchDateDoneCheck = async (dateCheck) => {
        const url = `/api/web/work-assignment?dateCheck=${dateCheck}`;
        const jsonData = await fetchDataDemo(url);
        if (jsonData) {
            setWorkDataDN_done(jsonData.dien_nuoc_done);
            setWorkDataDL_done(jsonData.dien_lanh_done);
            setWorkDataDG_done(jsonData.do_go_done);
            setWorkDataNLMT_done(jsonData.nlmt_done);
            setWorkDataXD_done(jsonData.xay_dung_done);
            setWorkDataVC_done(jsonData.tai_xe_done);
            setWorkDataHX_done(jsonData.co_khi_done);
        }
    };
    // --------------------------- lay du lieu lich da phan ----------------------------------
    const fetchDataDaPhan = async () => {
        const url = `/api/web/work-assignment`;
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
            socketD?.emit(
                "UpdateDateTable_To_Server",
                "Cập Nhật trạng thái AdminCheck"
            );
        } else {
            setWorkDataDN_done(dataDefault);
        }
    };
    // ----------------------------lay thong tin tho ----------------------------

    const fetchInfoWorker = async (e) => {
        try {
            const response = await fetch(host + "api/web/workers");
            const jsonData = await response.json();
            const formatJson = jsonData.map((item) => ({
                value: item.id,
                label: item.worker_code + " " + item.worker_full_name,
                workerCode: item.worker_code,
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
                socketD?.emit("UpdateDateTable_To_Server", data);
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data lỗi rồi:", error);
        }
    };
    const fetchDataDashboard = async (data) => {
        const url = `api/web/update/work`;
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

                socketD.emit("addWorkTo_Server", formData);
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
    const handleCopyToClipboard = (text) => {
        const {
            work_content,
            street,
            phone_number,
            name_cus,
            district,
            work_note,
        } = text;
        const data = `${work_content || ""} ${street || ""} ${
            phone_number || ""
        } ${name_cus || ""} ${district || ""} ${work_note || ""}`;

        const textarea = document.createElement("textarea");
        textarea.value = data;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        console.log("Đã sao chép thành công vào clipboard: ", data);
    };

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
                    await sendPhanThoRequest(
                        params,
                        selectPhanTho,
                        auth,
                        socketD,
                        handleCopyToClipboard,
                        handleOpenTho
                    );
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
            width: 170,
            editable: false,
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
            width: 50,
            editable: false,
            type: "text",
            renderCell: (params) => {
                const [TTBH, setDataBH] = useState([]);
                const [open, setOpen] = useState(false);
                const handleOpen = () => {
                    setOpen(!open);
                };
                const getDataBh = async () => {
                    if (params.row.id != "undefined") {
                        try {
                            const url = `/api/web/work-assignment/warranties?id=${params.row.id}`;
                            const response = await fetch(url);
                            const data = await response.json();
                            setDataBH(data);
                        } catch (error) {
                            console.error("Error fetching data:", error);
                            ssss;
                        }
                    }
                };
                useEffect(() => {
                    getDataBh();
                }, []);
                return (
                    <>
                        {TTBH.length > 0 ? (
                            <IconButton
                                className="w-8 h-8 p-1"
                                variant="outlined"
                                onClick={handleOpen}
                            >
                                <ClipboardDocumentListIcon className="w-4 h-4" />
                            </IconButton>
                        ) : (
                            <span></span>
                        )}
                        <Dialog open={open} handler={handleOpen} size="lg">
                            <DialogHeader>Ghi Chú</DialogHeader>
                            <DialogBody divider>
                                <div className="h-[50vh] overflow-y-auto">
                                    {TTBH.map((item, index) => {
                                        return (
                                            <Card
                                                className="p-2 my-2 border border-green-500"
                                                key={index}
                                            >
                                                <span>
                                                    Bảo Hành:
                                                    {item.warranty_time === 0
                                                        ? "kbh"
                                                        : `${
                                                              item.warranty_time
                                                          } ${
                                                              item.unit === "d"
                                                                  ? "ngày"
                                                                  : item.unit ===
                                                                    "w"
                                                                  ? "tuần"
                                                                  : item.unit ===
                                                                    "m"
                                                                  ? "tháng"
                                                                  : item.unit ===
                                                                    "y"
                                                                  ? "năm"
                                                                  : ""
                                                          }`}
                                                </span>
                                                <span>
                                                    Nội Dung:
                                                    {item.warranty_info}
                                                </span>
                                            </Card>
                                        );
                                    })}
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
            field: "worker_full_name",
            headerName: "Thợ",
            width: 85,
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
                const handleSentPhanTho = async (e) => {
                    await sendPhanThoRequest(
                        params,
                        selectPhanTho,
                        auth,
                        socketD,
                        handleCopyToClipboard,
                        handleOpenTho
                    );
                };

                const check_admin = params.row.status_admin_check == 1;
                const [idPhuArray, setIdPhuArray] = useState([]);
                useEffect(() => {
                    if (cardExpires.id_phu !== 0) {
                        const newIdPhuArray = cardExpires.id_phu
                            .split(",")
                            .map((item) => Number(item.replace(/\[|\]/g, "")));
                        console.log('sss', newIdPhuArray);
                        setIdPhuArray(newIdPhuArray);
                    }
                }, [cardExpires.id_phu]);
                const resultArray = idPhuArray.map((value) => {
                    const foundElement = infoWorkerDashboard.find(
                        (element) => element.value === value
                    );
                    return foundElement ? foundElement.label : "";
                });

                return (
                    <>
                        {check_admin || params.row.status_work === 1 ? (
                            <p>{params.row.worker_full_name}</p>
                        ) : (
                            <>
                                <p onClick={handleOpenTho}>
                                    {params.row.worker_full_name}
                                </p>
                                <Dialog
                                    open={openWorkerNameTableRight}
                                    handler={handleOpenTho}
                                    className="w-full max-w-full min-w-full 2xl:min-w-[70%]"
                                >
                                    <div className="flex items-center justify-between">
                                        <DialogHeader>
                                            CHỌN THỢ CẦN PHÂN
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
                                                    Thợ Phụ:{resultArray}
                                                </p>
                                            ) : (
                                                <p className="w-full p-1 border border-green-500">
                                                    Không có thợ phụ
                                                </p>
                                            )}
                                        </div>
                                        <form className="flex flex-col gap-4 mt-2">

                                            <div className="flex items-center gap-4 ">
                                                <Select
                                                    value={selectPhanTho}
                                                    options={
                                                        infoWorkerDashboard
                                                    }
                                                    onChange={(selectedValue) =>
                                                        handleSelectChange(
                                                            selectedValue
                                                        )
                                                    }
                                                    isMulti
                                                    className="w-full border-none shadow-none"
                                                />
                                            </div>
                                            <Input className="shadow-none " label="Lý Do Đổi Thợ" />
                                            <Divider />
                                            <div className="flex flex-row-reverse">
                                                <Button
                                                    size="md"
                                                    className="p-3 py-0 mx-4 text-green-500 border-green-500 "
                                                    variant="outlined"
                                                    onClick={handleSentPhanTho}
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
                const [isEdited, setIsEdited] = useState(false);
                const [openSpending_total, handleOpenSpending_total] =
                    useToggle(false);
                const [work_note, setWorkNote] = useState();
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setCardExpires((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                    setIsEdited(true);
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
                    setSelectedFiles(files);
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
                        // formData.append("seri_imag_new[]", selectedHinh);
                        console.log(`Đã gửi hình ${type}:`, selectedHinh);
                        // Thêm danh sách các tệp hình `image_vt` vào FormData
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
                            console.log(`Cập nhật thông tin ${type}`, formData);
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
                // ---------- ------- - cần tối ưu code ----------------------------------

                // Các phần khác của component

                const handleValueBh = async () => {
                    try {
                        const promises = isDataChanged.map(async (data) => {
                            const dataBh = {
                                id_work_has: params.id,
                                warranty_time: data.warranty_time,
                                warranty_info: data.warranty_info,
                                unit: data.unit,
                                income_total: cardExpires.income_total,
                            };
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
                                console.log(
                                    "Đã Gửi Thông Tin Bảo Hành",
                                    dataBh
                                );
                            } else {
                                console.error(
                                    "Lỗi khi gửi dữ liệu:",
                                    res.statusText
                                );
                            }
                        });
                        await Promise.all(promises);
                    } catch (error) {
                        console.error("Error fetching data lỗi rồi:", error);
                    }
                };

                const handleUpdateThuChi = async (e) => {
                    e.preventDefault();
                    const UrlApi = `api/web/update/work-continue`;
                    const data_0 = {
                        ...cardExpires,
                        ac: valueRadio,
                        id: params.row.id,
                        member_read: auth.user.id,
                    };

                    const data_1 = {
                        ac: valueRadio,
                        id: params.row.id,
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
                        handleValueBh();
                    } else if (valueRadio === "1") {
                        fetchDataUpdateThuchi(data_1, UrlApi);
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
                            handleOpenThuHoi();
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
                        real_note: params.row.real_note,
                        income_total: params.row.income_total,
                        spending_total: params.row.spending_total,
                        seri_number: params.row.seri_number,
                    };

                    const dataFields = [
                        {
                            key: "work_content",
                            ac: 4,
                            id_cus: params.row.id_cus,
                        },
                        {
                            key: "phone_number",
                            ac: 5,
                            id_cus: params.row.id_cus,
                        },
                        { key: "street", ac: 6, id_cus: params.row.id_cus },
                        { key: "district", ac: 7, id_cus: params.row.id_cus },
                        { key: "name_cus", ac: 8, id_cus: params.row.id_cus },
                        { key: "real_note", ac: 9, id: params.row.id },
                        { key: "income_total", ac: 10, id: params.row.id },
                        { key: "spending_total", ac: 11, id: params.row.id },
                        { key: "seri_number", ac: 12, id: params.row.id },
                    ];

                    dataFields.forEach((field) => {
                        if (prevData[field.key] !== cardExpires[field.key]) {
                            const data = {
                                ...field,
                                auth_id: auth.user.id,
                                [field.key]: cardExpires[field.key],
                            };
                            fetchUpdateData(data, UrlApi);
                        }
                    });
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
                const DK1 = auth.user.permission != 1 ? "hidden" : "";
                const DK2 = spending !== 0 || income !== 0 ? "hidden" : "";
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
                            {check_admin ||
                            (check_admin && selectedDate != formattedToday) ? (
                                <>
                                    <Tooltip content="Admin đã xác nhận">
                                        <CheckCircleIcon
                                            className={`text-green-500 border-green-500 hover:bg-green-500 w-8 h-8 p-1 mr-2 rounded border hover:text-white`}
                                        />
                                    </Tooltip>
                                </>
                            ) : params.row.status_work != 1 ? (
                                <>
                                    <Tooltip content="Nhập Thu Chi">
                                        <ArrowUpTrayIcon
                                            className={`text-green-500 border-green-500 hover:bg-green-500  ${classButtonDaPhan} ${DK2}`}
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
                                        <MenuList className="flex justify-between p-1 border border-green-500 rounded-none w-fit min-w-fit MenuListEdit">
                                            <MenuItem className="p-0 w-fit">
                                                <Tooltip content="Thu Hồi Lịch">
                                                    <ArrowPathIcon
                                                        className={`text-blue-500 border border-blue-500  hover:bg-blue-500 ${classButtonDaPhan} `}
                                                        onClick={
                                                            handleOpenThuHoi
                                                        }
                                                    />
                                                </Tooltip>
                                            </MenuItem>
                                            <MenuItem className="p-0 w-fit">
                                                <Tooltip content="Báo hủy">
                                                    <TrashIcon
                                                        className={`text-red-500 border border-red-500 hover:bg-red-500 ${classButtonDaPhan}`}
                                                        onClick={handleOpenHuy}
                                                    />
                                                </Tooltip>
                                            </MenuItem>
                                            <MenuItem className="p-0 w-fit">
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
                            ) : (
                                <p className="p-1 text-blue-500 border border-blue-500 rounded-sm">
                                    Mai Làm Tiếp
                                </p>
                            )}
                        </div>
                        {/* ----------------ADMIN CHECK ------------ */}
                        <AdminCheckDialog
                            imageVt1={imageVt1}
                            host={host}
                            params={params}
                            imagePt1={imagePt1}
                            previewImagesVT={previewImgVt}
                            previewImagesPT={previewImgPt}
                            openAdminCheck={openAdminCheck}
                            handleOpenAdminCheck={handleOpenAdminCheck}
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
                            handleEdit={() => {
                                handleCheckAdmin();
                            }}
                            classNameChild={`${
                                isEdited ? "border-red-500" : "border-gray-300"
                            }`}
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
    const TABLE_HEAD_LEFT = [
        {
            id: "yccvLeft",
            colWidthLeft: 165,
            nameHeadLeft: "Yêu Cầu Công Việc",
        },
        { id: "ngayLamLeft", colWidthLeft: 90, nameHeadLeft: "Ngày Làm" },
        { id: "ghiChuLeft", colWidthLeft: 60, nameHeadLeft: "Ghi Chú" },
        { id: "dcLeft", colWidthLeft: 150, nameHeadLeft: "Địa Chỉ" },
        { id: "quanLeft", colWidthLeft: 70, nameHeadLeft: "Quận" },
        { id: "sdtLeft", colWidthLeft: 105, nameHeadLeft: "Số Điện Thoại" },
        { id: "chucNangLeft", colWidthLeft: 120, nameHeadLeft: "Chức Năng" },
    ];

    const TABLE_HEAD_RIGHT = [
        { id: "yccvRight", colWidth: 165, nameHead: "Yêu Cầu Công Việc" },
        { id: "ngayLamRight", colWidth: 90, nameHead: "Ngày Làm" },
        { id: "bhRight", colWidth: 40, nameHead: "BH" },
        { id: "dcRight", colWidth: 150, nameHead: "Địa Chỉ" },
        { id: "quanRight", colWidth: 70, nameHead: "Quận" },
        { id: "sdtRight", colWidth: 105, nameHead: "Số Điện Thoại" },
        { id: "thoRight", colWidth: 85, nameHead: "Thợ" },
        { id: "chiRight", colWidth: 120, nameHead: "Chi" },
        { id: "thuRight", colWidth: 120, nameHead: "Thu" },
        { id: "chucNangRight", colWidth: 120, nameHead: "Chức Năng" },
    ];
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang Chủ" />

            <div
                className={`flex flex-row w-full overflow-scroll mt-1 pl-3 `}
                style={{ height: `${heightScreenTV}px` }}
            >
                <Card className="w-full mt-1 text-white rounded-none h-fit basis-5/12">
                    {isLoading ? (
                        <div className="flex justify-center p-2 align-middle ">
                            <Spinner className="w-6 h-6" color="amber" />
                            <p className="pl-2 text-center text-black">
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <div id="tableLeft">
                            <thead className=" sticky top-0 z-50 -mt-[10px] py-[10px] pr-12 bg-white  w-[100%]">
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
                            {dataGridLichChuaPhan.map((result, index) => {
                                return (
                                    <div key={index} id={result.id}>
                                        <Typography className="w-full p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
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
                                                ref={result.ref}
                                                rows={result.rowsDataGrid}
                                                columns={columns}
                                                hideFooterPagination={true}
                                                containerProps={{
                                                    className: "hidden",
                                                }}
                                                rowHeight={40}
                                                disableRowSelectionOnClick
                                                slots={{
                                                    columnHeaders: () => null,
                                                    pagination: () => null,
                                                }}
                                            />
                                        </Box>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
                <Card className="grid w-full grid-flow-col mt-1 text-white rounded-none h-fit basis-7/12">
                    {isLoading ? (
                        <div className="flex justify-center p-2 align-middle ">
                            <Spinner className="w-6 h-6" color="amber" />
                            <p className="pl-2 text-center text-black">
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <div id="tableRight">
                            <thead className="sticky top-0 z-50 -mt-[10px] py-[10px] pr-12 bg-white w-[100%] ">
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
                            {dataGrid.map((result, index) => {
                                return (
                                    <div key={index} id={result.id}>
                                        <Typography className="w-full p-1 font-bold text-center bg-blue-400 rounded-sm shadow-lg text-medium">
                                            {result.contentDataGird}
                                        </Typography>
                                        <Box
                                            sx={{
                                                height:
                                                    result.rowsDataGrid == ""
                                                        ? 40
                                                        : "fit-content",
                                            }}
                                        >
                                            <DataGrid
                                                rows={result.rowsDataGrid}
                                                columns={columnsRight}
                                                hideFooterPagination={false}
                                                containerProps={{
                                                    className: "hidden",
                                                }}
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
