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
    XMarkIcon,
} from "@heroicons/react/24/outline";
import newSocket from "@/utils/socket";
import { host } from "@/Utils/UrlApi";
import { url_API, url_API_District } from "@/data/UrlAPI/UrlApi";
import { Divider } from "@mui/material";
import AdminCheckDialog from "@/Components/AdminCheckDialog";
import WorkForm from "@/Components/WorkForm";
import DynamicTwoInput from "@/Components/DynamicInput";
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
            setWorkDataDNCu(jsonData.dien_nuoc_cu);
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
            const res = await fetch("api/web/update/work-continue", {
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
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

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
                        </div>
                        <Dialog
                            open={openTho}
                            handler={handleOpenTho}
                            className="lg:min-w-52"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>Lựa Chọn Thợ</DialogHeader>
                                <XMarkIcon
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                    onClick={handleOpenTho}
                                />
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
                                <XMarkIcon
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                    onClick={handleOpen}
                                />
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
                const shouldDisplayIconButton = params.row.worker_name === null;
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
                const [openHuy, setOpenHuy] = useState(false);
                const handleOpenHuy = () => setOpenHuy(!openHuy);
                const [openThuHoi, setOpenThuHoi] = useState(false);
                const handleOpenThuHoi = () => setOpenThuHoi(!openThuHoi);
                const [openAdminCheck, setOpenAdminCheck] = useState(false);
                const handleOpenAdminCheck = () =>
                    setOpenAdminCheck(!openAdminCheck);
                const [openUpdateThuChi, setOpenUpdateThuChi] = useState(false);
                const handleOpenUpdateThuChi = () =>
                    setOpenUpdateThuChi(!openUpdateThuChi);
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

                const dataRadio = [
                    {
                        id: "ThoDN",
                        name: "XNTTNV",
                        label: "Điện Nước",
                        value: "0",
                        checked: '{formData.kind_work === "0"}',
                    },
                    {
                        id: "ThoDL",
                        name: "XNTTNV",
                        label: "Điện Lạnh",
                        value: "1",
                        checked: '{formData.kind_work === "1"}',
                    },
                    {
                        id: "ThoDG",
                        name: "XNTTNV",
                        label: "Đồ Gỗ",
                        value: "2",
                        checked: '{formData.kind_work === "2"}',
                    },
                    {
                        id: "ThoXD",
                        name: "XNTTNV",
                        label: "Xây Dựng",
                        value: "3",
                        checked: '{formData.kind_work === "3"}',
                    },
                    {
                        id: "ThoNLMT",
                        name: "XNTTNV",
                        label: "Năng Lượng Mặt Trời",
                        value: "4",
                        checked: '{formData.kind_work === "4"}',
                    },
                    {
                        id: "ThoVC",
                        name: "XNTTNV",
                        label: "Vận Chuyển",
                        value: "5",
                        checked: '{formData.kind_work === "5"}',
                    },
                    {
                        id: "ThoHX",
                        name: "XNTTNV",
                        label: "Cơ Khí",
                        value: "6",
                        checked: '{formData.kind_work === "6"}',
                    },
                ];
                // cho phep su dung cac nut
                const isButtonDisabled = (permissionValue, valuePermiss) => {
                    return permissionValue !== valuePermiss;
                };
                // --------- thu chi ----------------------------

                const [isDataChanged, setIsDataChanged] = useState([]);
                const [selectedFiles, setSelectedFiles] = useState([]);
                const [previewImgVt, setPreviewImgVt] = useState([]);
                const [previewImgPt, setPreviewImgPt] = useState([]);
                const [openSpending_total, setOpenSpending_total] =
                    useState(false);
                const handleOpenSpending_total = () =>
                    setOpenSpending_total(!openSpending_total);
                const handleDataFromChild = (data) => setIsDataChanged(data);
                const handleFileChangeVt = (e) => {
                    const files = Array.from(e.target.files);
                    setSelectedFiles(files);
                    const previewsVt = files.map((file) =>
                        URL.createObjectURL(file)
                    );
                    setPreviewImgVt(previewsVt);
                };
                const handleFileChangePt = (e) => {
                    const files = Array.from(e.target.files);
                    setSelectedFiles(files);
                    const previewsPt = files.map((file) =>
                        URL.createObjectURL(file)
                    );
                    setPreviewImgPt(previewsPt);
                };
                console.log("params >_<", params);
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
                        // dataInput: isDataChanged,
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
                const check_admin = params.row.status_admin_check === 1;
                const spending = params.row.spending_total;
                const income = params.row.income_total;
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
                    const dataBody ={
                        auth_id: auth.user.id,
                        ac: 2,
                        id: params.row.id,
                        bill_imag_del: deletedImage,
                    }
                    const jsonData = JSON.stringify(dataBody);
                    console.log('00000',typeof jsonData);
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
                                "Hình đã được xóa thành công từ máy chủ",dataBody
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
                    const dataBody ={
                        auth_id: auth.user.id,
                        ac: 3,
                        id: params.row.id,
                        seri_imag_del: deletedImage,
                    }
                    const jsonData = JSON.stringify(dataBody);
                    console.log('00000',typeof jsonData);
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
                                "Hình đã được xóa thành công từ máy chủ",dataBody
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

                return (
                    <div>
                        <div className="flex">
                            {check_admin ? (
                                <Tooltip content="Admin Check">
                                    <Button
                                        className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer "
                                        onClick={handleOpenAdminCheck}
                                        disabled={isButtonDisabled(
                                            auth.user.permission,
                                            1
                                        )}
                                        variant="outlined"
                                    >
                                        <EyeIcon />
                                    </Button>
                                </Tooltip>
                            ) : (
                                <div className="flex w-full">
                                    {spending || income ? (
                                        <>
                                            <Tooltip content="Nhập Thu Chi">
                                                <ArrowUpTrayIcon
                                                    className="w-8 h-8 p-1 mr-2 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                                    onClick={
                                                        handleOpenSpending_total
                                                    }
                                                />
                                            </Tooltip>{" "}
                                            <Tooltip content="Admin Check">
                                                <Button
                                                    className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer "
                                                    onClick={
                                                        handleOpenAdminCheck
                                                    }
                                                    disabled={isButtonDisabled(
                                                        auth.user.permission,
                                                        1
                                                    )}
                                                    variant="outlined"
                                                >
                                                    <EyeIcon />
                                                </Button>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <>
                                            <Tooltip content="Nhập Thu Chi">
                                                <ArrowUpTrayIcon
                                                    className="w-8 h-8 p-1 mr-2 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                                    onClick={
                                                        handleOpenSpending_total
                                                    }
                                                />
                                            </Tooltip>

                                            <Tooltip content="Thu Hồi Lịch">
                                                <ArrowPathIcon
                                                    className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                                                    onClick={handleOpenThuHoi}
                                                />
                                            </Tooltip>
                                            <Tooltip content="Báo hủy">
                                                <TrashIcon
                                                    className="w-8 h-8 p-1 mr-2 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                                                    onClick={handleOpenHuy}
                                                />
                                            </Tooltip>
                                            <Tooltip content="Admin Check">
                                                <Button
                                                    className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer "
                                                    onClick={
                                                        handleOpenAdminCheck
                                                    }
                                                    disabled={isButtonDisabled(
                                                        auth.user.permission,
                                                        1
                                                    )}
                                                    variant="outlined"
                                                >
                                                    <EyeIcon />
                                                </Button>
                                            </Tooltip>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* ----------------ADMIN CHECK ------------ */}
                        <Dialog
                            open={openAdminCheck}
                            handler={handleOpenAdminCheck}
                            className="w-full max-w-full min-w-full 2xl:min-w-[60%]"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>
                                    XÁC NHẬN THÔNG TIN THỢ BÁO
                                </DialogHeader>
                                <XMarkIcon
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                    onClick={handleOpenAdminCheck}
                                />
                            </div>
                            <AdminCheckDialog
                                params={params}
                                addDot={addDot}
                                handleFileChangeVt={handleFileChangeVt}
                                imageVt1={imageVt1}
                                host={host}
                                handleImageVtDelete={(index)=>{handleImageVtDelete(index)}}
                                handleImagePtDelete={(index)=>{handleImagePtDelete(index)}}
                                imagePt1={imagePt1}
                                handleChange={handleChange}
                                cardExpires={cardExpires}
                            />
                        </Dialog>
                        {/*----------------------------- dialog form Thu Hoi ----------- */}
                        <Dialog open={openThuHoi} handler={handleOpenThuHoi}>
                            <div className="flex items-center justify-between">
                                <DialogHeader>Lý Do Thu Hồi</DialogHeader>
                                <XMarkIcon
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                    onClick={handleOpenThuHoi}
                                />
                            </div>
                            <DialogBody divider>
                                <div className="grid gap-6">
                                    <Textarea
                                        label="Lý do thu hồi"
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
                                    onClick={handleThuHoi}
                                >
                                    Xác nhận
                                </Button>
                            </DialogFooter>
                        </Dialog>
                        {/*----------------------------- dialog form Huy ----------- */}
                        <Dialog open={openHuy} handler={handleOpenHuy}>
                            <div className="flex items-center justify-between">
                                <DialogHeader>Lý do hủy</DialogHeader>
                                <XMarkIcon
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                    onClick={handleOpenHuy}
                                />
                            </div>
                            <DialogBody divider>
                                <div className="grid gap-6">
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
                        {/* ------------------Dialog Thu Chi----------------------------------- */}
                        <Dialog
                            open={openSpending_total}
                            handler={handleOpenSpending_total}
                            className="w-full max-w-full min-w-full 2xl:min-w-[70%]"
                        >
                            <div className="flex items-center justify-between">
                                <DialogHeader>Nhập Thu Chi</DialogHeader>
                                <XMarkIcon
                                    className="w-5 h-5 mr-3 cursor-pointer"
                                    onClick={handleOpenSpending_total}
                                />
                            </div>
                            <DialogBody divider>
                                <div className="flex justify-center w-full mb-4">
                                    <Card className="flex flex-row w-[50%] border justify-between px-10">
                                        <Radio
                                            id="HT"
                                            name="status_work"
                                            label="Hoàn Thành"
                                            value="0"
                                            checked={!isAllowed} // Đảo ngược trạng thái, checked là true khi isAllowed là false
                                            onChange={handleRadioChangeAllow}
                                            className="w-1 h-1 p-1"
                                        />
                                        <Radio
                                            id="MLT"
                                            name="status_work"
                                            label="Mai Làm Tiếp"
                                            value="1"
                                            checked={isAllowed} // checked là true khi isAllowed là true
                                            onChange={handleRadioChangeAllow}
                                            className="w-1 h-1 p-1"
                                        />
                                    </Card>
                                </div>
                                <WorkForm
                                    cardExpires={cardExpires}
                                    handleChange={handleChange}
                                    vatCard={vatCard}
                                    disabledAllowed={isAllowed}
                                >
                                    <div className="flex justify-between w-full my-2 text-sm">
                                        <DynamicTwoInput
                                            disabledAllowed={isAllowed}
                                            sendDataToParent={
                                                handleDataFromChild
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-center gap-4 align-middle ">
                                        <div className="w-full ">
                                            <div className="flex justify-center w-full">
                                                {vatCard ? (
                                                    <Card className="justify-center px-2 border border-green-500 rounded-none">
                                                        {params.row.bill_image}
                                                    </Card>
                                                ) : (
                                                    <Button
                                                        className="justify-center px-2 pt-1 text-center text-black bg-white border border-green-500 rounded-none"
                                                        disabled={isAllowed}
                                                    >
                                                        <input
                                                            id="image_Vt"
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            onChange={
                                                                handleFileChangeVt
                                                            }
                                                            multiple
                                                            className="w-full text-[10px] cursor-pointer text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 focus:outline-none focus:shadow-none"
                                                            disabled={isAllowed}
                                                        />
                                                        {previewImgVt ? (
                                                            <i className="text-[10px]">
                                                                (Hình Vật Tư)
                                                            </i>
                                                        ) : (
                                                            <div className="flex flex-row">
                                                                {previewImgVt.map(
                                                                    (
                                                                        preview,
                                                                        index
                                                                    ) => (
                                                                        <img
                                                                            key={
                                                                                index
                                                                            }
                                                                            src={
                                                                                preview
                                                                            }
                                                                            alt={`Preview ${index}`}
                                                                            style={{
                                                                                width: "100px",
                                                                                height: "auto",
                                                                                margin: "5px",
                                                                            }}
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                    </Button>
                                                )}
                                                {vatCard ? (
                                                    <Card className="justify-center px-2 border border-green-500 rounded-none">
                                                        {params.row.bill_image}
                                                    </Card>
                                                ) : (
                                                    <Button
                                                        className="justify-center px-2 pt-1 text-center text-black bg-white border border-green-500 rounded-none"
                                                        disabled={isAllowed}
                                                    >
                                                        <input
                                                            id="image_Pt"
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            onChange={
                                                                handleFileChangePt
                                                            }
                                                            multiple
                                                            className="w-full text-[10px] file:cursor-pointer text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 focus:outline-none focus:shadow-none"
                                                            disabled={isAllowed}
                                                        />
                                                        <i className="text-[10px]">
                                                            (Hình Phiếu Thu)
                                                        </i>
                                                        <div className="flex flex-row flex-wrap justify-center">
                                                            {previewImgPt.map(
                                                                (
                                                                    preview,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            preview
                                                                        }
                                                                        alt={`Preview ${index}`}
                                                                        style={{
                                                                            width: "100px",
                                                                            height: "auto",
                                                                            margin: "5px",
                                                                        }}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </Button>
                                                )}
                                                <div className="p-1 ">
                                                    <Input
                                                        label="Số Phiếu Thu"
                                                        id="seri_number"
                                                        name="seri_number"
                                                        value={
                                                            cardExpires.seri_number
                                                        }
                                                        defaultValue="k pt"
                                                        onChange={handleChange}
                                                        // disabled="{disabledAllowed || isAllowedBH}"
                                                        className="mr-1 w-[100%] shadow-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider className="pt-2" />
                                    <div className="flex flex-row-reverse pt-2">
                                        {dataBtnChi.map((result) => (
                                            <Button
                                                key={result.id}
                                                id={result.id}
                                                size="sm"
                                                className={
                                                    `p-3 py-2 mx-4 ` +
                                                    result.className
                                                }
                                                variant="outlined"
                                                onClick={result.handleSubmit}
                                            >
                                                {result.content}
                                            </Button>
                                        ))}
                                    </div>
                                </WorkForm>
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
    const dataGridLichChuaPhan = [
        {
            id: "workDNCu",
            rowsDataGrid: workDataDNCu,
            contentDataGird: "Lịch Ngày Trước Chưa Xử Lý",
        },
        {
            id: "workDN",
            rowsDataGrid: workDataDN,
            contentDataGird: "Điện Nước",
        },
        {
            id: "workDL",
            rowsDataGrid: workDataDL,
            contentDataGird: "Điện Lạnh",
        },
        {
            id: "workDG",
            rowsDataGrid: workDataDG,
            contentDataGird: "Đồ Gỗ",
        },
        {
            id: "workNLMT",
            rowsDataGrid: workDataNLMT,
            contentDataGird: "Năng Lượng Mặt Trời",
        },
        {
            id: "workXD",
            rowsDataGrid: workDataXD,
            contentDataGird: "Xây Dựng",
        },
        {
            id: "workVC",
            rowsDataGrid: workDataVC,
            contentDataGird: "Vận Chuyển",
        },
        {
            id: "workHX",
            rowsDataGrid: workDataHX,
            contentDataGird: "Cơ Khí",
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
        { id: 0, idFixedBtn: DN, contentBtnFixed: "Điện Nước" },
        { id: 1, idFixedBtn: DL, contentBtnFixed: "Điện Lạnh" },
        { id: 2, idFixedBtn: DG, contentBtnFixed: "Đồ Gỗ" },
        { id: 3, idFixedBtn: NLMT, contentBtnFixed: "Năng Lượng Mặt Trời" },
        { id: 4, idFixedBtn: XD, contentBtnFixed: "Xây Dựng" },
        { id: 5, idFixedBtn: VC, contentBtnFixed: "Vận Chuyển" },
        { id: 6, idFixedBtn: HX, contentBtnFixed: "Cơ Khí" },
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
                                                rows={result.rowsDataGrid}
                                                columns={columns}
                                                hideFooterPagination={true}
                                                containerProps={{
                                                    className: "hidden",
                                                }}
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
