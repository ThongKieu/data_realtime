import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogBody,
    Avatar,
    Card,
} from "@material-tailwind/react";
import {
    TrashIcon,
    PaintBrushIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import io from "socket.io-client";
import newSocket from "@/Utils/socket";
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
        idCV: Math.floor(Math.random() * 1000),
        yccv: "",
        diaChi: "",
        quan: "",
        sdt: "",
        KTV: "",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "",
        diaChi: "",
        quan: "",
        sdt: "",
        KTV: "",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "",
        diaChi: "",
        quan: "",
        sdt: "",
        KTV: "",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "",
        diaChi: "",
        quan: "",
        sdt: "",
        KTV: "",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "",
        diaChi: "",
        quan: "",
        sdt: "",
        KTV: "",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "",
        diaChi: "",
        quan: "",
        sdt: "",
        KTV: "",
    },
];
const data = [
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "Sửa Nhà",
        diaChi: "Trần Hưng Đạo",
        quan: "q1",
        sdt: "0947613923",
        BH: "1 t",
        dsThu: "1.500.000đ",
        dsChi: "500.000đ",
        soPhieuThu: "17.1717",
        tinhTrangTT: "chua tt",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "Sửa Máy Lạnh",
        diaChi: "15 Nguyễn Trãi",
        quan: "q1",
        sdt: "0947613923",
        BH: "1 t",
        dsThu: "1.500.000đ",
        dsChi: "500.000đ",
        soPhieuThu: "17.1717",
        tinhTrangTT: "chua tt",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "Sửa Điện",
        diaChi: "30 Trần Xuân Soạn",
        quan: "q7",
        sdt: "0947613923",
        BH: "1 t",
        dsThu: "1.500.000đ",
        dsChi: "500.000đ",
        soPhieuThu: "17.1717",
        tinhTrangTT: "chua tt",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "Sửa máy bớm nước",
        diaChi: "15 Phạm Thế Hiển",
        quan: "q8",
        sdt: "0947613923",
        BH: "1 t",
        dsThu: "1.500.000đ",
        dsChi: "500.000đ",
        soPhieuThu: "17.1717",
        tinhTrangTT: "chua tt",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "Sửa dốc dắt xe",
        diaChi: "456 Sư Vạn Hạnh",
        quan: "q10",
        sdt: "0947613923",
        BH: "1 t",
        dsThu: "1.500.000đ",
        dsChi: "500.000đ",
        soPhieuThu: "17.1717",
        tinhTrangTT: "chua tt",
    },
    {
        idCV: Math.floor(Math.random() * 1000),
        yccv: "",
        diaChi: "",
        quan: "",
        sdt: "",
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
        idTho: Math.floor(Math.random() * 1000),
        maNV: "A03",
        tenNV: "Có",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "DN",
    },
    {
        idTho: Math.floor(Math.random() * 1000),
        maNV: "A04",
        tenNV: "Tiền",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "DN",
    },
    {
        idTho: Math.floor(Math.random() * 1000),
        maNV: "A05",
        tenNV: "Nhạc",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "DN",
    },
    {
        idTho: Math.floor(Math.random() * 1000),
        maNV: "A06",
        tenNV: "Thông",
        hoVaDem: "Nguyen Xuan",
        linhVuc: "DL",
    },
    {
        idTho: Math.floor(Math.random() * 1000),
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
    // const [message, setMessage] = useState(auth.user.id);

    // const [chatContent, setChatContent] = useState([]);
    // const ip_address = window.location.hostname;
    // const socket_port = "3000";
    // const newSocket = io(ip_address + ":" + socket_port);
    // kết nối đến server socket
    // console.log("dsadsadsa", workData);
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
        }

    }, [socketD]);
    // ----------------
    const fetchData = async () => {
        try {
            const response = await fetch("api/web/works");
            const jsonData = await response.json();
            setWorkData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // push online
    // const pushOnlineUser = (id) => {
    //     const url = "/api/web/push-online?id=" + id;

    //     fetch(url);
    //     console.log(fetch(url));
    // };
    // pushOnlineUser(message);

    // edit Table right
    const onChangeInputTableRight = (e, idCV) => {
        const { name, value } = e.target;
        const editDataTableRight = worksData.map((item) =>
            item.idCV === idCV && name ? { ...item, [name]: value } : item
        );
        setWorksData(editDataTableRight);
    };
    // them lich bang ben trai ------------------------------
    const handleSubmitAddWork = (e) => {
        e.preventDefault();
        setWorksData((prev) => {
            const newWorkData = [...prev, workData];
            const jsonNewData = JSON.stringify(newWorkData);
            localStorage.setItem("WorkData", jsonNewData);
            return newWorkData;
        });
        setWorkData("");
    };
    // xoa lich bang ben trai ------------------------------
    const handleDeleteRow = (idCV) => {
        const updatedTableData = workData.filter((item) => item.idCV !== idCV);
        setWorkData(updatedTableData);
    };
    // -----------------------------------------
    const onChangeInput = (e, idCV) => {
        const { name, value } = e.target;
        const editData = workData.map((item) =>
            item.idCV === idCV && name ? { ...item, [name]: value } : item
        );
        setWorkData(editData);
    };
    // ------------------option select thong tin tho  ---------------
    const [selectedOption, setSelectedOption] = useState();
    const [options, setOptions] = useState([]);
    useEffect(() => {
        setOptions(listWorker);
    }, []);

    const handleOptionChange = (e, idTho) => {
        setSelectedOption(e.target.value);
    };

    // ------------------option select quan huyen  ---------------
    const [selectedOptionDistrict, setSelectedOptionDistrict] = useState();
    const [optionsDistrict, setOptionsDistrict] = useState([]);

    const handleOptionChangeDistrict = (e, idQuan) => {
        setSelectedOptionDistrict(e.target.value);
    };
    //  ---------------------------------- reponve height table ---------------
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    var heightScreenTV = screenSize.height;
    // ---------------------fetch api left table -------------------------------------

    // -------------------open dialog------------
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen((cur) => !cur);
    const [openDialogIndex, setOpenDialogIndex] = useState(null);

    const handleOpenDialog = (index) => {
        setOpenDialogIndex(index);
    };

    const handleCloseDialog = () => {
        setOpenDialogIndex(null);
    };
    // ----------------------------------- list table left body  -------------------------------------
    const tableHeaders = [ "Yêu Cầu Công Việc",
    "Ngày Làm",
    "Địa Chỉ",
    "Quận",
    "Số Điện Thoại",
    "Thợ",
    "Hình Ảnh",
    "Chức Năng",];
    const tableData = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 28, 'Chicago'],
    ];
    const ListTrTableLeft = workData.map(
        (
            {
                work_content,
                date_book,
                street,
                phone_number,
                district,
                idCV,
                idQuan,
                image_work_path,
            },
            index
        ) => {
            const isLast = index === data.length - 1;
            const idTable = Math.random() * 1000;
            const classes = isLast
                ? "w-fit "
                : "border-b border-blue-gray-50 w-fit";
            const classGeneral1 =
                "border text-black p-1 rounded border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 ring-4 ring-transparent placeholder:text-blue-gray-200 focus:!border-blue-500 focus:!border-t-blue-500 focus:ring-blue-500/20 outline-none ";
            // convert string to obj -------------------
            if (typeof image_work_path !== "undefined") {
                var url_img = image_work_path?.split(",");
            }
            return (
                <tr key={idTable} id={idCV}>
                    <td className={classes}>
                        <input
                            name="yccv"
                            value={work_content}
                            type="text"
                            onChange={(e) => onChangeInput(e, idCV)}
                            placeholder="Yêu Cầu Công Việc"
                            className={classGeneral1}
                        />
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                        <input
                            name="date_book"
                            type="text"
                            placeholder="Ngày Làm"
                            className={classGeneral1}
                            value={date_book}
                            onChange={(e) => onChangeInput(e, idCV)}
                        />
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                        <input
                            name="diaChi"
                            type="text"
                            placeholder="Địa Chỉ"
                            className={classGeneral1}
                            value={street}
                            onChange={(e) => onChangeInput(e, idCV)}
                        />
                    </td>
                    <td className={classes}>
                        <input
                            name="quan"
                            type="text"
                            placeholder="Quận"
                            className={`${classGeneral1} text-center w-12`}
                            value={district}
                            onChange={(e) => onChangeInput(e, idCV)}
                        />
                    </td>
                    <td className={classes}>
                        <input
                            name="sdt"
                            type="text"
                            placeholder="Số Điện Thoại"
                            className={`${classGeneral1} w-28 text-center`}
                            value={phone_number}
                            onChange={(e) => onChangeInput(e, idCV)}
                        />
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50 w-20  `}>
                        <select
                            id={idCV}
                            value={selectedOptionDistrict}
                            onChange={(e) => {
                                if (typeof idQuan !== "undefined") {
                                    handleOptionChangeDistrict(e, idQuan);
                                }
                            }}
                            className={classGeneral1}
                        >
                            <option value="">Chọn</option>
                            {optionsDistrict.map((optionDistrict, index) => (
                                <option
                                    key={index}
                                    value={optionDistrict.tenQuan}
                                >
                                    {optionDistrict.tenQuan}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className={classes}>
                        {url_img?.map((item, index) => {
                            if (item !== "") {
                                return (
                                    <div key={index} id={index}>
                                        <Avatar
                                            className="mr-1 overflow-hidden transition-opacity cursor-pointer h-9 w-9 hover:opacity-90"
                                            alt="avatar"
                                            src={item}
                                            variant="rounded"
                                            onClick={() =>
                                                handleOpenDialog(index)
                                            } // Mở dialog tại index
                                        />
                                        <Dialog
                                            key={index}
                                            size="xl"
                                            open={openDialogIndex === index} // Kiểm tra xem dialog có nên mở hay không
                                            handler={handleCloseDialog} // Đóng dialog
                                            className="w-1/2"
                                        >
                                            <DialogBody
                                                divider={true}
                                                className="p-2 text-center "
                                                id={index}
                                            >
                                                <img
                                                    id={index}
                                                    key={index}
                                                    src={item}
                                                    alt="avatar"
                                                    className="inline-block w-1/2"
                                                />
                                            </DialogBody>
                                        </Dialog>
                                    </div>
                                );
                            }
                        })}
                    </td>
                    <td
                        className={`w-32 ${classes}`}
                        style={{ height: "10px" }}
                    >
                        <Button
                            variant="outlined"
                            className="p-1 mr-1 text-red-500 border-red-500 border-none"
                            onClick={(e) => {
                                handleDeleteRow(e, idCV);
                            }}
                        >
                            <TrashIcon className="w-4 h-4" />{" "}
                        </Button>
                        <Button
                            variant="outlined"
                            className="p-1 text-blue-500 border-blue-500 border-none "
                            onClick={(e) => handleSubmitAddWork(e, idCV)}
                        >
                            <PaperAirplaneIcon className="w-4 h-4" />
                        </Button>
                    </td>
                </tr>
            );
        }
    );
    // ------------------------ List Tr Table Right --------------------------------------
    const [worksData, setWorksData] = useState(data);
    const ListTrTableRight = worksData.map(
        (
            {
                yccv,
                diaChi,
                sdt,
                quan,
                idCV,
                dsChi,
                dsThu,
                BH,
                tinhTrangTT,
                soPhieuThu,
            },
            index
        ) => {
            const isLast = index === data.length - 1;
            const classes = isLast
                ? "p-1 w-3 "
                : "p-1 border-b border-blue-gray-50 w-3";
            const classGeneral =
                "border  p-1 rounded border-blue-gray-50 bg-white text-black shadow-lg shadow-blue-gray-900/5 ring-4 ring-transparent placeholder:text-blue-gray-200 focus:!border-blue-500 focus:!border-t-blue-500 focus:ring-blue-500/20 outline-none ";
            return (
                <tr key={index} id={index}>
                    <td className={classes}>
                        <input
                            name="yccv"
                            value={yccv ?? ""}
                            type="text"
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                            placeholder="Nội Dung Công Việc"
                            className={classGeneral}
                        />
                    </td>
                    <td className={classes}>
                        <input
                            name="BH"
                            type="text"
                            placeholder="BH"
                            className={`${classGeneral} text-center w-12`}
                            value={BH ?? ""}
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                        />
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                        <input
                            name="diaChi"
                            type="text"
                            placeholder="Địa Chỉ"
                            className={classGeneral}
                            value={diaChi ?? ""}
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                        />
                    </td>

                    <td className={classes}>
                        <input
                            name="quan"
                            type="text"
                            placeholder="Quận"
                            className={`${classGeneral} text-center w-12`}
                            value={quan ?? ""}
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                        />
                    </td>
                    <td className={classes}>
                        <input
                            name="tinhTrangTT"
                            type="text"
                            placeholder=""
                            className={`${classGeneral} text-center w-16`}
                            value={tinhTrangTT ?? ""}
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                        />
                    </td>
                    <td className={classes}>
                        <input
                            name="sdt"
                            type="text"
                            placeholder="Số Điện Thoại"
                            className={`${classGeneral} w-28 text-center`}
                            value={sdt ?? ""}
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                        />
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50 w-20`}>
                        <select
                            id={idCV}
                            value={selectedOption}
                            onChange={(e) => {
                                if (typeof idTho !== "undefined") {
                                    handleOptionChange(e, idTho);
                                }
                            }}
                            className={classGeneral}
                        >
                            <option value="">Chọn</option>
                            {options.map((option, index) => (
                                <option key={index} value={option.tenNV}>
                                    {option.tenNV}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className={classes}>
                        <input
                            name="dsChi"
                            type="text"
                            placeholder="Chi"
                            className={`${classGeneral} w-28 text-center`}
                            value={dsChi}
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                        />
                    </td>
                    <td className={classes}>
                        <input
                            name="dsThu"
                            type="text"
                            placeholder="Thu"
                            className={`${classGeneral} w-28 text-center`}
                            value={dsThu}
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                        />
                    </td>
                    <td className={classes}>
                        <input
                            name="soPhieuThu"
                            type="text"
                            placeholder="Thu"
                            className={`${classGeneral} w-28 text-center`}
                            value={soPhieuThu}
                            onChange={(e) => onChangeInputTableRight(e, idCV)}
                        />
                    </td>

                    <td className={`w-32 ${classes} `}>
                        <Button
                            variant="outlined"
                            className="p-1 mr-1 text-red-500 border-red-500 border-none"
                        >
                            <TrashIcon className="w-4 h-4" />{" "}
                        </Button>
                        <Button
                            variant="outlined"
                            className="p-1 text-blue-500 border-blue-500 border-none "
                        >
                            <PaintBrushIcon className="w-4 h-4" />
                        </Button>
                    </td>
                </tr>
            );
        }
    );
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang Chủ" />
            <div
                className={
                    "  grid w-full  grid-flow-col overflow-scroll auto-cols-max mt-1"
                }
            >
                <TableOrder headers={tableHeaders} data={tableData}/>
                <Card
                    className={
                        "grid w-full  grid-flow-col overflow-scroll auto-cols-max mt-1"
                    }
                >
                    {/* bang ben trai  */}
                    <table
                        className={`h-[${heightScreenTV}px] w-full text-left border-r-4 border-red-500 table-auto min-w-max`}
                        style={{ height: `300px` }}
                    >
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={index}
                                        id={index}
                                        className="p-1 text-sm font-normal leading-none border-b opacity-70 border-blue-gray-100 bg-blue-gray-50 w-fit"
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{ListTrTableLeft}</tbody>
                    </table>
                </Card>
                <Card
                    className={
                        "  grid w-full  grid-flow-col overflow-scroll auto-cols-max mt-1"
                    }
                >
                    {/* bang ben phai */}
                    <table
                        className="w-full text-left table-auto min-w-max "
                        style={{ height: `${heightScreenTV}px` }}
                    >
                        <thead>
                            <tr>
                                {TABLE_HEAD_RIGHT.map((head, index) => (
                                    <th
                                        key={index}
                                        className="p-1 text-sm font-normal leading-none border-b opacity-70 border-blue-gray-100 bg-blue-gray-50"
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{ListTrTableRight}</tbody>
                    </table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
