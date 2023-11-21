import { React, useState, useEffect } from "react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Input,
    Button,
    Spinner,
    Select,
    Option,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import AlertIcon from "@/Pages/Admin/DataImport/Components/AlertIcon";
import * as XLSX from "xlsx";
import { host } from "@/Utils/UrlApi";
import { toast } from "react-toastify";

function WorkerCheckCall() {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const [listWorkers, setListWorkers] = useState([]);
    const [listCheckCallWorkers, setListCheckCallWorkers] = useState([]);
    const [activeTab, setActiveTab] = useState("sim");

    const TABLE_HEAD = [
        "STT",
        "Số Thợ",
        "Số Gọi",
        "Ngày Gọi",
        "Thời Gian Gọi",
        "Trang Thái",
    ];

    useEffect(() => {
        fetch(host + "api/web/all-workers")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error Status Network");
                }
                return response.json();
            })
            .then((data) => {
                setListWorkers([data]);
            })
            .catch((error) => {
                console.error("Error API:", error);
            });
        fetch(host + "api/web/all-check-call-workers")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error Status Network");
                }
                return response.json();
            })
            .then((data) => {
                setListCheckCallWorkers(data);
            })
            .catch((error) => {
                console.error("Error API:", error);
            });
    }, []);

    const dataTabs = [
        {
            label: "Kiểm Tra Toàn Bộ Cuộc Gọi",
            value: "sim",
        },
        {
            label: "Kiểm Tra Thợ Gọi Khách ",
            value: "cty",
        },
    ];

    const listMonths = [
        "Tháng 01",
        "Tháng 02",
        "Tháng 03",
        "Tháng 04",
        "Tháng 05",
        "Tháng 06",
        "Tháng 07",
        "Tháng 08",
        "Tháng 09",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Lấy dữ liệu từ file Excel
            const firstSheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(
                workbook.Sheets[firstSheetName]
            );

            // Xử lý dữ liệu ở đây (ví dụ: lưu vào state của React)
            setFile(file);
            setShowAlertFailed(false);
        };
        reader.readAsArrayBuffer(file);
    };
    const uploadFile = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch(
                host + "api/web/import/data-check-call-worker",
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (response.ok) {
                console.log("Tải lên thành công");
                toast.success("Thông báo thành công", {
                    position: "top-center", // Đặt vị trí ở giữa
                    autoClose: 2000, // Đặt thời gian tồn tại là 2 giây (2000 mili giây)
                    closeOnClick: true, // Click tắt Toast thông báo
                    // hideProgressBar: true, // Ẩn progressbar chạy dưới
                });
            } else {
                console.error("Lỗi khi tải lên");
                toast.error("Lỗi thêm dữ liệu", {
                    position: "top-center", // Đặt vị trí ở giữa
                    autoClose: 2000, // Đặt thời gian tồn tại là 2 giây (2000 mili giây)
                    closeOnClick: true, // Click tắt Toast thông báo
                    // hideProgressBar: true, // Ẩn progressbar chạy dưới
                    pauseOnHover: false,
                });
            }
        } catch (error) {
            console.error("Lỗi khi tải lên: ", error);
        } finally {
            setIsLoading(false);
            setFile(null);
        }
    };
    const [screenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const heightScreenTV = screenSize.height;
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Kiểm tra thợ gọi" />
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Spinner className="w-12 h-12 " color="green" />
                </div>
            ) : (
                <div className={`h-screen gap-2 p-2`}>
                    <Card className="flex flex-row items-center justify-center p-2 border border-gray-300">
                        <div className="flex flex-row items-center justify-between gap-4 ">
                            <p>Thêm Dữ Liệu Cuộc Gọi Thợ:</p>
                            <span>
                                <Input
                                    labelProps={{ className: "hidden" }}
                                    type="file"
                                    accept=".xlsx, .xls"
                                    className="pl-0 border-none "
                                    onChange={handleFileUpload}
                                />
                            </span>
                            <span>
                                <Button
                                    className="w-40 p-2"
                                    color="green"
                                    onClick={() => {
                                        if (file != null) {
                                            uploadFile();
                                        } else {
                                            setShowAlertFailed(true);
                                        }
                                    }}
                                >
                                    Lưu Dữ Liệu
                                </Button>
                            </span>
                        </div>
                    </Card>

                    {showAlertFailed && (
                        <AlertIcon
                            setShowAlertFailed={setShowAlertFailed}
                            contentAlert={
                                "Vui lòng chọn file cần thêm dữ liệu !!"
                            }
                        />
                    )}
                    <Card className="grid grid-cols-2 gap-2 p-2 mt-2 border border-gray-300">
                        <div className="flex items-center">
                            <p className="mr-2">Chọn Thợ Cần Xem:</p>
                            <div className="w-[70%]">
                                <Select label="Chọn Thợ"  className="w-full">
                                    {listWorkers.map((data, index) => (<Option
                                            key={index}
                                            value={data.worker_name}
                                        >
                                            {data.worker_name}
                                        </Option>))}
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center justify-between ">
                            <p className="mr-2">Chọn Tháng Cần Xem:</p>
                            <span className="mr-2">
                            <Select label="Chọn Tháng">
                                {listMonths.map((data, index) => (
                                    <Option>{data}</Option>
                                ))}
                            </Select>
                            </span>
                            <Button
                                className="w-40"
                                fullWidth
                                color="green"
                                onClick={() => {
                                    console.log(listWorkers + "aaaaa");
                                }}
                            >
                                Tìm Thông tin{" "}
                            </Button>
                        </div>
                    </Card>
                    <Card className="mt-2 border border-gray-300">

                        <Tabs value={activeTab}>
                            <TabsHeader
                                className="w-1/2 p-0 bg-transparent border-b rounded-none border-blue-gray-50"
                                indicatorProps={{
                                    className:
                                        "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                            >
                                {dataTabs.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onClick={() => setActiveTab(value)}
                                    >
                                        <Typography
                                            color="green"
                                            className={`${
                                                activeTab === value
                                                    ? "font-bold"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {label}
                                        </Typography>
                                    </Tab>
                                ))}
                            </TabsHeader>
                            <Divider/>
                            <TabsBody>
                                <TabPanel key="sim" value="sim">
                                    <Card className="w-full h-full">
                                        <CardHeader
                                            floated={false}
                                            shadow={false}
                                            className="rounded-none"
                                        >
                                            <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
                                                <div>
                                                    <Typography
                                                        variant="h5"
                                                        color="blue-gray"
                                                    >
                                                        Kiểm Tra Cuộc Gọi
                                                    </Typography>
                                                    <Typography
                                                        color="gray"
                                                        className="mt-1 font-normal"
                                                    >
                                                        Tất cả các cuộc gọi của
                                                        thợ bằng sim công ty
                                                    </Typography>
                                                </div>
                                                <div className="flex w-full gap-2 shrink-0 md:w-max">
                                                    <div className="w-full md:w-72">
                                                        <Input
                                                            label="Tìm Kiếm"
                                                            icon={
                                                                <MagnifyingGlassIcon className="w-5 h-5" />
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardBody className="px-0 overflow-scroll">
                                            <table className="w-full text-left table-auto min-w-max">
                                                <thead>
                                                    <tr>
                                                        {TABLE_HEAD.map(
                                                            (head) => (
                                                                <th
                                                                    key={head}
                                                                    className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                                                                >
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal leading-none opacity-70"
                                                                    >
                                                                        {head}
                                                                    </Typography>
                                                                </th>
                                                            )
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listCheckCallWorkers.map(
                                                        (data, index) => {
                                                            const isLast =
                                                                index ===
                                                                listCheckCallWorkers.length -
                                                                    1;
                                                            const classes =
                                                                isLast
                                                                    ? "p-4"
                                                                    : "p-4 border-b border-blue-gray-50";

                                                            return (
                                                                <tr
                                                                    key={
                                                                        data.id
                                                                    }
                                                                >
                                                                    <td
                                                                        className={
                                                                            classes
                                                                        }
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <Typography
                                                                                variant="small"
                                                                                color="blue-gray"
                                                                                className="font-bold"
                                                                            >
                                                                                {
                                                                                    data.id
                                                                                }
                                                                            </Typography>
                                                                        </div>
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            classes
                                                                        }
                                                                    >
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                data.worker_phone
                                                                            }
                                                                        </Typography>
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            classes
                                                                        }
                                                                    >
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                data.worker_phone_called
                                                                            }
                                                                        </Typography>
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            classes
                                                                        }
                                                                    >
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                data.worker_call_date
                                                                            }
                                                                        </Typography>
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            classes
                                                                        }
                                                                    >
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                data.worker_call_start_time
                                                                            }
                                                                            ,{" "}
                                                                            {
                                                                                data.worker_call_time
                                                                            }
                                                                            s
                                                                        </Typography>
                                                                    </td>

                                                                    <td
                                                                        className={
                                                                            classes
                                                                        }
                                                                    >
                                                                        {data.worker_call_check ==
                                                                        0 ? (
                                                                            <Typography
                                                                                variant="small"
                                                                                color="green"
                                                                                className="font-bold"
                                                                            >
                                                                                Gọi
                                                                                Khách
                                                                            </Typography>
                                                                        ) : data.worker_call_check ==
                                                                          1 ? (
                                                                            <Typography
                                                                                variant="small"
                                                                                color="blue"
                                                                                className="font-bold"
                                                                            >
                                                                                Gọi
                                                                                Công
                                                                                Ty
                                                                            </Typography>
                                                                        ) : (
                                                                            <Typography
                                                                                variant="small"
                                                                                color="red"
                                                                                className="font-bold"
                                                                            >
                                                                                Gọi
                                                                                Số
                                                                                Ngoài
                                                                            </Typography>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </CardBody>
                                        <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                                            <Button
                                                variant="outlined"
                                                size="sm"
                                                color="green"
                                            >
                                                Quay Lại
                                            </Button>
                                            <div className="flex items-center gap-2">
                                                <IconButton
                                                    variant="outlined"
                                                    size="sm"
                                                    color="green"
                                                >
                                                    1
                                                </IconButton>
                                                <IconButton
                                                    variant="text"
                                                    size="sm"
                                                    color="green"
                                                >
                                                    2
                                                </IconButton>
                                                <IconButton
                                                    variant="text"
                                                    size="sm"
                                                    color="green"
                                                >
                                                    3
                                                </IconButton>
                                                <IconButton
                                                    variant="text"
                                                    size="sm"
                                                    color="green"
                                                >
                                                    ...
                                                </IconButton>
                                                <IconButton
                                                    variant="text"
                                                    size="sm"
                                                    color="green"
                                                >
                                                    8
                                                </IconButton>
                                                <IconButton
                                                    variant="text"
                                                    size="sm"
                                                    color="green"
                                                >
                                                    9
                                                </IconButton>
                                                <IconButton
                                                    variant="text"
                                                    size="sm"
                                                    color="green"
                                                >
                                                    10
                                                </IconButton>
                                            </div>
                                            <Button
                                                variant="outlined"
                                                size="sm"
                                                color="green"
                                            >
                                                Tiếp Theo
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </TabPanel>
                                <TabPanel key="cty" value="cty"></TabPanel>
                            </TabsBody>
                        </Tabs>
                    </Card>
                </div>
            )}
        </AuthenticatedLayoutAdmin>
    );
}
export default WorkerCheckCall;
