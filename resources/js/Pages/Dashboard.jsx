import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState, memo } from "react";

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
} from "@material-tailwind/react";
// -------
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
// -----
import {
    TrashIcon,
    PlusCircleIcon,
    PencilSquareIcon,
    XCircleIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import io from "socket.io-client";
import newSocket from "@/utils/socket";
import TableOrder from "@/Core/TableOrder";

const TABLE_HEAD = [
    "Yêu Cầu Công Việc",
    "Ngày Làm",
    "Địa Chỉ",
    "Quận",
    "Số Điện Thoại",
    "Thợ",
    "Hình Ảnh",
    "Chức Năng",
];
const TABLE_HEAD_RIGHT = [
    "Nội Dung Công Việc",
    "BH",
    "Địa Chỉ KH",
    "KV",
    "Thanh Toán",
    "SDT",
    "KTV",
    "Chi",
    "Thu",
    "Số Phiếu Thu",
    "Chức Năng",
];
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
const data = [
    {
        id: 1,
        yccv: "Sửa Nhà",
        diaChi: "Trần Hưng Đạo",
        quan: "q1",
        sdt: "0947613923",
        ngayLam: "19/5",
        BH: "1 t",
        dsThu: "1.500.000đ",
        dsChi: "500.000đ",
        soPhieuThu: "17.1717",
        tinhTrangTT: "chua tt",
    },
];
// ------------------data thong tin tho ---------------
const listWorker = [
    {
        idTho: 3,
        maNV: "A03",
        tenNV: "Có",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "DN",
    },
    {
        idTho: 4,
        maNV: "A04",
        tenNV: "Tiền",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "DN",
    },
    {
        idTho: 5,
        maNV: "A05",
        tenNV: "Nhạc",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "DN",
    },
    {
        idTho: 6,
        maNV: "A06",
        tenNV: "Thông",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "DL",
    },
    {
        idTho: 7,
        maNV: "A07",
        tenNV: "Thống",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "XD",
    },
];

function Dashboard({ auth }) {
    const [socketD, setSocketD] = useState(null);
    const [message, setMessage] = useState(auth.user.id);
    const [workData, setWorkData] = useState(dataNew);
    const [workDataDL, setWorkDataDL] = useState(dataNew);
    const [workDataDG, setWorkDataDG] = useState(dataNew);
    const [workDataNLMT, setWorkDataNLMT] = useState(dataNew);
    const [workDataXD, setWorkDataXD] = useState(dataNew);
    const [workDataVC, setWorkDataVC] = useState(dataNew);
    const [workDataHX, setWorkDataHX] = useState(dataNew);
    useEffect(() => {
        setSocketD(newSocket, { secure: true });
        fetchData();
        // lắng nghe server
        newSocket.on("sendAddWorkTo_Client", (data) => {
            // setWorkData(data);
            fetchData(data);
            console.log("Có lịch mới", workData);
            console.log("dat111a", data);
        });
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socketD) {
            socketD.emit("pushOnline", message);
            pushOn();
            console.log("User is online");
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
        } catch (error) {}
    };
    // ----------------
    const fetchData = async () => {
        try {
            const response = await fetch("api/web/works");
            const jsonData = await response.json();
            setWorkData(jsonData.dien_nuoc);
            setWorkDataDL(jsonData.dien_lanh);
            setWorkDataDG(jsonData.do_go);
            setWorkDataNLMT(jsonData.nlmt);
            setWorkDataXD(jsonData.xay_dung);
            setWorkDataVC(jsonData.tai_xe);
            setWorkDataHX(jsonData.co_khi);
            // console.log('ss',setWorkDataCountOrder);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // ------------------option select thong tin tho  ---------------
    const [selectedOption, setSelectedOption] = useState();
    const [options, setOptions] = useState([]);
    useEffect(() => {
        setOptions(listWorker);
    }, []);

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    var heightScreenTV = screenSize.height;

    const [worksData, setWorksData] = useState(data);

    // -----------------------------handle---------------------------
    const [rows, setRows] = useState(dataNew);
    const [rowModesModel, setRowModesModel] = useState({});
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setWorkData({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    // --------------------------------column -------------------------
    const columns = [
        {
            field: "work_content",
            headerName: "yêu Cầu Công Ciệc",
            width: 140,
            editable: true,
        },
        {
            field: "date_book",
            headerName: "Ngày Làm",
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
                console.log(params);
                const [open, setOpen] = useState(false);
                const handleOpen = () => setOpen(!open);
                const [openTho, setOpenTho] = useState(false);
                const handleOpenTho = () => setOpenTho(!openTho);
                return (
                    <div>
                        <div className="flex">
                            <UserPlusIcon className="w-8 h-8 p-1 mr-2 text-blue-500 border border-blue-500 rounded cursor-pointer "
                            onClick={handleOpenTho}/>
                            <TrashIcon
                                className="w-8 h-8 p-1 mr-2 text-red-500 border border-red-500 rounded cursor-pointer"
                                onClick={handleOpen}
                            />
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
                                <div className="grid gap-6">
                                    <Input
                                        label="Chọn Thợ Phù Hợp"
                                        className="shadow-none"
                                    />

                                </div>
                            </DialogBody>
                            <DialogFooter className="space-x-2">
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleOpenTho}
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
                                    <Textarea
                                        label="Lý do hủy"
                                        className="shadow-none"
                                    />
                                </div>
                            </DialogBody>
                            <DialogFooter className="space-x-2">
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleOpen}
                                >
                                    Hủy
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
            field: "yccv",
            headerName: "yêu cầu công việc",
            width: 140,
            editable: true,
        },
        {
            field: "diaChi",
            headerName: "Địa Chỉ",
            type: "text",
            width: 150,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "quan",
            headerName: "Quận",
            type: "text",
            width: 40,
            editable: true,
        },
        {
            field: "sdt",
            headerName: "Số Điện thoại",
            width: 100,
            editable: true,
            type: "text",
        },
        {
            field: "ngayLam",
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
            field: "KTV",
            headerName: "Thợ",
            width: 80,
            editable: true,
            type: "singleSelect",
            valueOptions: listWorker,
        },
        {
            field: "dsChi",
            headerName: "Chi",
            width: 100,
            editable: true,
            type: "text",
        },
        {
            field: "dsThu",
            headerName: "Thu",
            width: 100,
            editable: true,
            type: "text",
        },
        {
            field: "soPhieuThu",
            headerName: "Phiếu Thu",
            width: 100,
            editable: true,
            type: "text",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Chức Năng",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<PlusCircleIcon className="w-6 h-6" />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<XCircleIcon className="w-6 h-6" />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<PencilSquareIcon className="w-6 h-6" />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<TrashIcon className="w-6 h-6" />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    // ----------------------------------------------------------------------------
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang Chủ" />
            <div
                className={`  grid w-full  grid-flow-col overflow-scroll auto-cols-max mt-1 `}
                style={{ height: `${heightScreenTV}px` }}
            >
                <Card
                    className={
                        "grid w-full grid-flow-col overflow-scroll auto-cols-max mt-1"
                    }
                >
                    <div>
                        <Typography className="p-2 text-lg font-bold text-white w-full max-w-[26rem] shadow-lg bg-blue-500 rounded-sm text-center">
                            Điện Nước
                        </Typography>
                        {/* bang ben trai  */}
                        <DataGrid
                            rows={workData}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            slotProps={{
                                toolbar: { setRows, setRowModesModel },
                            }}
                        />
                        <Typography className="p-2 text-lg font-bold text-white w-full max-w-[26rem] shadow-lg bg-blue-500 rounded-sm text-center">
                            Điện Lạnh
                        </Typography>
                        <DataGrid
                            rows={workDataDL}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            slotProps={{
                                toolbar: { setRows, setRowModesModel },
                            }}
                        />
                    </div>
                </Card>
                <div>
                    {/* <Typography className="p-2 text-lg font-bold text-white w-full max-w-[26rem] shadow-lg bg-blue-500 rounded-sm text-center">
                        Điện Nước
                    </Typography>
                    <Card
                        className={
                            "  grid w-full  grid-flow-col overflow-scroll auto-cols-max mt-1"
                        }
                    >
                        <DataGrid
                            rows={worksData}
                            columns={columnsRight}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}

                            slotProps={{
                                toolbar: { setRows, setRowModesModel },
                            }}
                        />
                    </Card> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default memo(Dashboard);
