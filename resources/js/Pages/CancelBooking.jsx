import React, { useState, useEffect, memo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Button,
    Card,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    Select,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import { UserPlusIcon, ArrowPathIcon, BookmarkSquareIcon, } from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, renderActionsCell } from "@mui/x-data-grid";
import newSocket from "@/Utils/Socket";
import { getFormattedToday } from "@/Data/UrlAPI/UrlApi";
import useWindowSize from "@/Core/Resize";
import { ARRAY_ACTION } from "@/Data/Table/Data";
import { Divider } from "@mui/material";


function CancelBooking({ auth }) {
    const [deleteBooking, setDeleteBooking] = useState([]);
    const [socketCard, setSocketCard] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        if (!hasLoaded) {
            fetchDelete();
            // setSocketCard(newSocket, { secure: true });
            newSocket.on("sendAddWorkTo_Client", (data) => {
                fetchDelete(data);
            });
            setHasLoaded(true);
        }
        // lắng nghe server
        // return () => {
        //     if (socketCard) {
        //         socketCard.disconnect();
        //     }
        // };
    }, []);
    const [userAuth, setUserAuth] = useState([]);
    const [infoWorker, setInfoWorker] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/web/users");
            const jsonData = await response.json();
            setUserAuth(jsonData.users);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchInfoWorker = async () => {
        try {
            const response = await fetch(`${host}api/web/workers`);
            if (!response.ok) {
                throw new Error("Response not OK");
            }
            const jsonData = await response.json();
            const formatJson = jsonData.map((item) => ({
                value: item.id,
                label: `(${item.worker_code}) - ${item.worker_full_name}`,
            }));
            setInfoWorker(formatJson);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchUser();
        fetchInfoWorker();
    }, []);
    const columns = [
        {
            field: "work_content",
            headerName: "Yêu Cầu Công Việc",
            type: "text",
            align: "left",
            headerAlign: "right",
            width: 220,
        },
        {
            field: "work_note",
            headerName: "Ghi Chú",
            type: "text",
            width: 220,
        },
        {
            field: "street",
            headerName: "Địa Chỉ",
            type: "text",
            width: 180,
        },
        {
            field: "district",
            headerName: "Quận",
            type: "text",
            width: 220,
        },
        {
            field: "phone_number",
            headerName: "Số Điện thoại",
            type: "text",
            width: 220,
        },
        {
            field: "name",
            headerName: "Người Xử Lý",
            type: "text",
            width: 220,
        },
        {
            // field: null,
            headerName: "Lịch Sử",
            type: "text",
            width: 220,
            editable: false,
            renderCell: (parmas) => {
               
                // console.log(parmas.row.his_work);
                const classTableHistory = 'px-6 py-3 leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300';

                const [openHis, setOpenHis] = React.useState(false);

                const handleOpenHis = () => setOpenHis(!openHis);
                let iJson = parmas.row?.work_note || null;
                let jsonParse = null;
                // Cố gắng phân tích dữ liệu JSON từ các chuỗi
                const safeParse = (str) => {
                    try {
                        return JSON.parse(str);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        return null;
                    }
                };
            
                // Parse dữ liệu JSON từ chuỗi
                if (iJson) {
                    if (typeof iJson === 'string' && (iJson.startsWith('{') || iJson.startsWith('['))) {
                        iJson = safeParse(iJson);
                    } else if (typeof iJson === 'string' || iJson === null || iJson === 'undefined') {
                        iJson = [{ id_auth: 1, action: iJson, time: 'Không c' }];
                    }
                }
            
                if (parmas.row?.his_work) {
                    jsonParse = safeParse(parmas.row.his_work);
                }
                
                // Nối hai mảng nếu cả hai đều tồn tại
                if (iJson && jsonParse) {
                    jsonParse = jsonParse.concat(iJson);
                } else if (iJson) {
                    // Nếu chỉ có iJson có giá trị, gán nó cho jsonParse
                    jsonParse = iJson;
                }
                
                // Đảm bảo jsonParse luôn là một mảng, ngay cả khi không có dữ liệu
                jsonParse = jsonParse || [];
                console.log(iJson);
                return (
                    <>
                        <Button onClick={handleOpenHis} variant="gradient">
                            Lịch sử xử lý công việc
                        </Button>
                        <Dialog open={openHis} handler={handleOpenHis}>
                            <DialogBody>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className={classTableHistory}>Người Xử Lý</th>
                                            <th className={classTableHistory}>Action</th>
                                            <th className={classTableHistory}>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jsonParse ? (
                                            jsonParse.map((itemJson, index) => {
                                                const correspondingAuth = userAuth.find(user => user.id === itemJson.id_auth);
                                                const correspondingWorker = infoWorker.value === itemJson.id_worker ? infoWorker.label : "Unknown";
                                                const workerFullName = correspondingAuth ? correspondingAuth.name : `(${infoWorker.label})- ${correspondingWorker}`;

                                                const checkAc = ARRAY_ACTION?.find(item => item.id === itemJson.action);

                                                return (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 border-b border-gray-500 border">
                                                            {workerFullName}
                                                        </td>
                                                        <td className="px-6 py-4 border-b border-gray-500 border">
                                                            {checkAc ? checkAc.value : itemJson.action}
                                                        </td>
                                                        <td className="px-6 py-4 border-b border-gray-500 border">
                                                            {itemJson.time.toString()} {/* Hiển thị giá trị thời gian */}
                                                            {itemJson.lat && itemJson.log && (
                                                                <button onClick={() => handleButtonClick(itemJson.lat, itemJson.log)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 border-b border-gray-500 border text-center">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </DialogBody>
                            <Divider />
                            <DialogFooter className="space-x-2">
                                <Button variant="outlined" className="px-5 py-2" color="red" onClick={handleOpenHis}>
                                    Xác nhận
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                );
            }
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

                const handleSentPhanTho = async (e) => {
                    try {
                        let data = {
                            id_cus: params.row.id,
                            id_worker: selectPhanTho,
                            work_note: params.row.work_note,
                        };
                        const response = await fetch("api/web/work-assignment", {
                            method: "POST",
                            body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                            headers: {
                                "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                            },
                        });
                        if (response.ok) {
                            // socket.emit("addWorkTo_Server", "xoalich");
                            handleOpenTho();
                        }
                    } catch (error) {
                        console.log("lixo", error);
                    }
                };

                return (
                    <div>
                        <div className="flex">
                            <Tooltip content="Phân Thợ">
                                <ArrowPathIcon
                                    className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                                    onClick={handleOpenTho}
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
                                {/* <Select
                                    value={selectPhanTho}
                                    options={infoWorkerDashboard}
                                    onChange={(selectedValue) =>
                                        handleSelectChange(selectedValue)
                                    }
                                    isMulti
                                    className="border-none shadow-none"
                                /> */}
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
                    </div>
                );
            },
        },
    ];
    const fetchDelete = async () => {
        try {
            const response = await fetch("api/web/cancle/works");
            const jsonData = await response.json();
            setDeleteBooking(jsonData.info_can);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const { width, height } = useWindowSize(100);
    // Sử dụng useState để lưu trữ giá trị của input date
    const [todayBook, setTodayBook] = useState("");
    // Hàm xử lý sự kiện khi giá trị của input thay đổi
    const handleDateChange = (event) => {
        setTodayBook(event.target.value);
    };
    return (
        <AuthenticatedLayout
            children={auth.user}
            user={auth.user}
            checkDate={todayBook}
        >
            <Head title="Trang Chủ" />
            <Card className="grid w-full grid-flow-col pl-2 mt-1 overflow-scroll text-white rounded-none">
                <div>
                    <Typography className="p-1 font-bold text-center bg-red-500 rounded-sm shadow-lg text-medium">
                        <span>Lịch Hủy</span>
                        <input
                            type="date"
                            className="hidden"
                            value={todayBook}
                            onChange={handleDateChange}
                        />
                    </Typography>
                    {/* bang ben trai  */}
                    <Box sx={{ width: 1, height: height }}>
                        <DataGrid
                            autoHeight
                            {...height}
                            rows={deleteBooking}
                            columns={columns}
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            slots={{ toolbar: GridToolbar }}
                            initialState={{
                                ...deleteBooking.initialState,
                                pagination: {
                                    paginationModel: { pageSize: 10 },
                                },
                            }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                        />
                    </Box>
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}

export default memo(CancelBooking);
