import { React, useState, useEffect, useMemo } from "react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import * as XLSX from "xlsx";
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
    Typography,
} from "@material-tailwind/react";
import { Divider } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AlertIcon from "@/Pages/Admin/DataImport/Components/AlertIcon";
import { host } from "@/Utils/UrlApi";
import { toast } from "react-toastify";
import {useWindowSize} from "@/Core/Resize";
import Box from "@mui/material/Box";
import { formatTime } from "@/Data/UrlAPI/UrlApi";
function WorkerCheckCall() {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const [listWorkers, setListWorkers] = useState([]);
    const [listCheckCallWorkers, setListCheckCallWorkers] = useState([]);
    const [activeTab, setActiveTab] = useState("sim");
    var currentDate = new Date();
    const this_month = (currentDate.getMonth() - 1).toString().padStart(2, "0");
    const this_year = currentDate.getFullYear();
    const { width, height } = useWindowSize(200);
    async function fetchWorkers() {
        try {
            const response = await fetch(host + "api/web/workers");
            if (!response.ok) {
                throw new Error("Error Status Network");
            } else {
                const data = await response.json();
                setListWorkers(data);
            }
        } catch (error) {
            console.error("Error API:", error);
        }
    }

    async function fetchCheckCallWorkers(this_month, this_year) {
        try {
            const response = await fetch(
                host +
                    "api/web/all-check-call-workers?this_month=" +
                    this_month +
                    "&this_year=" +
                    this_year
            );
            if (!response.ok) {
                throw new Error("Error Status Network");
            } else {
                const data = await response.json();
                setListCheckCallWorkers(data);
            }
        } catch (error) {
            console.error("Error API:", error);
        }
    }
    useEffect(() => {
        fetchWorkers();
        fetchCheckCallWorkers(this_month, this_year);
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
        { month: "01", label: "Tháng 01" },
        { month: "02", label: "Tháng 02" },
        { month: "03", label: "Tháng 03" },
        { month: "04", label: "Tháng 04" },
        { month: "05", label: "Tháng 05" },
        { month: "06", label: "Tháng 06" },
        { month: "07", label: "Tháng 07" },
        { month: "08", label: "Tháng 08" },
        { month: "09", label: "Tháng 09" },
        { month: "10", label: "Tháng 10" },
        { month: "11", label: "Tháng 11" },
        { month: "12", label: "Tháng 12" },
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
    const [selectedWorker, setSelectedWorker] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    const handleSearch = () => {
        console.log(selectedWorker);
        console.log(selectedMonth);
        fetch(
            host +
                "api/web/worker/all-check-call-workers?this_month=" +
                selectedMonth +
                "&this_year=" +
                this_year +
                "&phone=" +
                selectedWorker
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error Status Network");
                }
                return response.json();
            })
            .then((data) => {
                console.log("data", data);
                setListCheckCallWorkers(data);
            })
            .catch((error) => {
                console.error("Error API:", error);
            });
    };
    console.log("listCheckCallWorkers", listCheckCallWorkers);
    const columns = [
        {
            field: "id",
            headerName: "STT",
            width: 50,
            align: "center",
            renderCell: (params) => {
                return <p>{params.row.id}</p>;
            },
        },
        {
            field: "worker_phone",
            headerName: "Số Thợ",
            width: 100,
            align: "center",
        },
        {
            field: "worker_phone_called",
            headerName: "Số Gọi",
            width: 200,
            align: "center",
        },
        {
            field: "worker_call_date",
            headerName: "Ngày Gọi",
            width: 400,
            align: "center",
        },
        {
            field: "worker_call_start_time",
            headerName: "Thời Gian Bắt Đầu",
            width: 200,
            align: "center",
        },
        {
            field: "worker_call_time",
            headerName: "Thời Gian Gọi",
            width: 300,
            align: "center",
            renderCell: (params) => {
                return <p>{formatTime(params.row.worker_call_time)}</p>;
            },
        },

        {
            field: "worker_call_check",
            headerName: "Trình Trạng",
            width: 400,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        {params.row.worker_call_check == 0 ? (
                            <Typography
                                variant="small"
                                color="green"
                                className="p-2 font-bold border border-green-500 rounded-md"
                            >
                                Gọi Khách
                            </Typography>
                        ) : params.row.worker_call_check == 1 ? (
                            <Typography
                                variant="small"
                                color="blue"
                                className="p-2 font-bold border border-blue-500 rounded-md"
                            >
                                Gọi Công Ty
                            </Typography>
                        ) : (
                            <Typography
                                variant="small"
                                color="red"
                                className="p-2 font-bold border border-red-500 rounded-md"
                            >
                                Gọi Số Ngoài
                            </Typography>
                        )}
                    </>
                );
            },
        },
    ];
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
                                <select
                                    label="Chọn Thợ"
                                    className="w-full rounded-md"
                                    value={selectedWorker}
                                    onChange={(e) =>
                                        setSelectedWorker(e.target.value)
                                    }
                                >
                                    {listWorkers?.map((data) => (
                                        <option
                                            key={data.id}
                                            value={data.worker_phone_company}
                                            className="text-green-500"
                                        >
                                            ({data.worker_code})-
                                            {data.worker_full_name} -
                                            {data.worker_phone_company}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-between ">
                            <p className="mr-2">Chọn Tháng Cần Xem:</p>
                            <span className="mr-2">
                                <Select
                                    label="Chọn Tháng"
                                    value={selectedMonth}
                                    onChange={(value) =>
                                        setSelectedMonth(value)
                                    }
                                >
                                    {listMonths.map((data, index) => (
                                        <Option
                                            key={index}
                                            value={data.month}
                                            className="text-green-500"
                                        >
                                            {data.label}
                                        </Option>
                                    ))}
                                </Select>
                            </span>
                            <Button
                                className="w-40"
                                fullWidth
                                color="green"
                                onClick={handleSearch}
                            >
                                Tìm Thông tin
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
                            <Divider />
                            <TabsBody>
                                <TabPanel key="sim" value="sim">
                                    <Card className="w-full h-full">
                                        <Box
                                            sx={{
                                                height: { height },
                                                width: 1,
                                            }}
                                        >
                                            <DataGrid
                                                rows={listCheckCallWorkers}
                                                columns={columns}
                                                slots={{ toolbar: GridToolbar }}
                                                slotProps={{
                                                    toolbar: {
                                                        showQuickFilter: true,
                                                    },
                                                }}
                                                autoHeight
                                            />
                                        </Box>
                                    </Card>
                                </TabPanel>
                                <TabPanel key="cty" value="cty">
                                    <Card className="w-full h-full">
                                        <Box
                                            sx={{
                                                height: { height },
                                                width: 1,
                                            }}
                                        >
                                            <DataGrid
                                                rows={listCheckCallWorkers}
                                                columns={columns}
                                                slots={{ toolbar: GridToolbar }}
                                                slotProps={{
                                                    toolbar: {
                                                        showQuickFilter: true,
                                                    },
                                                }}
                                                autoHeight
                                            />
                                        </Box>
                                    </Card>
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </Card>
                </div>
            )}
        </AuthenticatedLayoutAdmin>
    );
}
export default WorkerCheckCall;
