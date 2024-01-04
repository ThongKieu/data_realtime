import React, { useState, useEffect } from "react";
import { Card, Typography, Tooltip } from "@material-tailwind/react";
import {
    UserPlusIcon,

} from "@heroicons/react/24/outline";
import {
    ThoDialog,
   
} from "@/Components/ColumnRightDialog";

import { host } from "@/Utils/UrlApi";
function TableTVLeft({ tableRows, auth, socketD }) {
    // const [workDataDN_done, setWorkDataDN_done] = useState([]);
    useEffect(() => {
        fetchInfoWorker();
    }, []);
    const [infoWorkerDashboard, setInfoWorkerDashboard] = useState([]);

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
    // const fetchDataDemo = async (url) => {
    //   try {
    //     const response = await fetch(url);
    //     const jsonData = await response.json();
    //     return jsonData;
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     return null;
    //   }
    // };

    // const fetchDataDaPhan = async () => {
    //   const url = fetchDataUrl;
    //   const jsonData = await fetchDataDemo(url);
    //   if (jsonData) {
    //     setWorkDataDN_done(jsonData.dien_nuoc_done);
    //     // ... (Tương tự cho các biến state khác)
    //   } else {
    //     // Set a default value or handle the error as needed
    //     setWorkDataDN_done([]);
    //   }
    // };

    // useEffect(() => {
    //   fetchDataDaPhan();
    // }, [fetchDataUrl]);
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
                // id: params.id,
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
        try {
            if (tableRows && tableRows.length > 0) {
                setOpenTho(true);
                for (let i = 0; i < tableRows.length; i++) {
                    const row = tableRows[i];
                    let data = {
                        id_cus: row.id,
                        id_worker: selectPhanTho,
                        work_note: row.work_note,
                        auth_id: auth.user.id,
                    };
                    console.log(data);

                    const response = await fetch("api/web/work-assignment", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        console.error(
                            `Error for row ${i}:`,
                            response.statusText
                        );
                        // Handle the error as needed
                    }
                }

                socketD?.emit("addWorkTo_Server", "Phan Tho");
                console.log("All requests successful");
                // handleOpenTho();
            }
        } catch (error) {
            console.log("An error occurred:", error);
            // Handle the error as needed
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
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        console.log("Đã sao chép thành công vào clipboard: ", data);
    };

    return (
        <Card className="w-full h-full overflow-scroll">
            <table className="w-full text-left table-auto min-w-max">
                <tbody>
                    {Array.isArray(tableRows) &&
                        tableRows.map((item, index) => {
                            const isLast = index === tableRows.length - 1;
                            const classes = isLast
                                ? "p-1"
                                : "p-1 border-b border-blue-gray-50";
                            console.log(tableRows);
                            console.log('dd Index:', index);
                            return (
                                <tr key={index}>
                                    <td className={`${classes} w-[150px]`}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal "
                                        >
                                            {item?.work_content}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}  w-[90px]`}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.date_book}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} w-[60px] `}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.work_note}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} w-[150px] `}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.street}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} w-[70px] `}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.district}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} w-[105px] `}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.phone_number}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} w-[120px]`}>
                                        <div>
                                            <div className="flex">
                                                <Tooltip content="Phân Thợ">
                                                    <UserPlusIcon
                                                        className="w-8 h-8 p-1 mr-1 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                                                        onClick={(e) => {
                                                            handleOpenTho(e,index);
                                                        }}
                                                    />
                                                </Tooltip>
                                                {/* <Tooltip content="Hủy Lịch">
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
                            </Tooltip> */}
                                            </div>
                                            <ThoDialog
                                                open={openTho}
                                                handleOpenTho={handleOpenTho}
                                                selectPhanTho={selectPhanTho}
                                                infoWorkerDashboard={
                                                    infoWorkerDashboard
                                                }
                                                handleSelectChange={
                                                    handleSelectChange
                                                }
                                                handleSentPhanTho={
                                                    handleSentPhanTho
                                                }
                                            />
                                            {/* <ReasonDialog
                            open={open}
                            handleOpen={handleOpen}
                            params={params}
                            setWorkNote={setWorkNote}
                            handleSentDelete={handleSentDelete}
                        /> */}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </Card>
    );
}

export default TableTVLeft;
