import {
    Button,
    Card,
    Input,
    Select,
    Option,
    Typography,
} from "@material-tailwind/react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import * as XLSX from "xlsx";

function Tab1({ showAlertFailed, handleFileUpload, file }) {
    // Xử lý logic cho Tab 1
    return (
        <div>
            <Card color="transparent" shadow={false} className="ml-60">
                {showAlertFailed && (
                    <AlertIcon setShowAlertFailed={setShowAlertFailed} />
                )}
                <Typography variant="h4" color="blue-gray">
                    Gửi Thông Báo ZNS Cảm Ơn Theo Danh Sách Khách Hàng
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Vui lòng chọn file danh sách khách hàng
                </Typography>
                <form className="max-w-screen-lg mt-8 w-80 sm:w-96">
                    <Input
                        labelProps={{ className: "hidden" }}
                        type="file"
                        accept=".xlsx, .xls"
                        className="pl-0 border-none" // Sử dụng lớp CSS 'border-none' của Material Tailwind
                        onChange={handleFileUpload}
                    />
                    <Button
                        className="mt-12"
                        fullWidth
                        color="green"
                        onClick={() => {
                            if (file != null) {
                                console.log(file + "hahahahaha");
                            } else {
                                setShowAlertFailed(true);
                            }
                        }}
                    >
                        Gửi Thông Báo
                    </Button>
                </form>
            </Card>
        </div>
    );
}

function Tab2() {
    const [selectedValue, setSelectedValue] = useState("Ngày");

    const handleSelectChange = (event) => {
        if (event && event.target && event.target.value) {
            setSelectedValue(event.target.value);
        }
    };
    const classInput_border =
        'className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500  ';

    // Xử lý logic cho Tab 2
    return (
        <div>
            <Card color="transparent" shadow={false} className="ml-60">
                <Typography variant="h4" color="blue-gray">
                    Gửi Thông Báo ZNS Cảm Ơn Từng Khách Hàng
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Vui lòng nhập thông tin khách hàng
                </Typography>
                <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
                    <div className="flex flex-col mb-4 ">
                        <p>Số liên hệ khách hàng: </p>
                        <Input
                            size="lg"
                            className={`mb-4` + classInput_border}
                            labelProps={{
                                className: "hidden",
                            }}
                        />

                        <p className="mt-3">Tên khách hàng: </p>
                        <Input
                            size="lg"
                            className={classInput_border}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                        <p className="mt-3">Ngày làm: </p>
                        <Input
                            size="lg"
                            className={classInput_border}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                        <p className="mt-3">Thời gian bảo hành: </p>
                        <Select
                            color="green"
                            variant="outlined"
                            value={selectedValue}
                            onChange={handleSelectChange}
                            className={classInput_border}
                            labelProps={{
                                className: "hidden",
                            }}
                        >
                            {/*  chinh sua phan value option de lay gia tri mac dinh  */}
                            <Option value="Ngày" className="p-1">Ngày</Option>
                            <Option value="Tháng" className="p-1 my-1">Tháng</Option>
                            <Option value="Năm" className="p-1 ">Năm</Option>
                        </Select>
                        <Input
                            size="lg"
                            className={`mt-1 ` + classInput_border}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>

                    <Button className="mt-6" fullWidth color="green">
                        Gửi Thông Báo
                    </Button>
                </form>
            </Card>
        </div>
    );
}
function ZaloSendZNSThanks() {
    const [activeTab, setActiveTab] = useState(1);
    const [file, setFile] = useState(null);
    const [showAlertFailed, setShowAlertFailed] = useState(false);

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
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Gửi ZNS cảm ơn khách hàng" />
            <div className="flex-col min-h-screen mt-5">
                <div className="flex justify-center row">
                    <div className="h-12">
                        <Button
                            className="mr-6 "
                            style={{ width: "200px" }}
                            color="green"
                        >
                            Lấy token mới
                        </Button>
                    </div>
                    <div
                        className="border border-green-500 rounded-lg h-11"
                        style={{ width: "600px" }}
                    >
                        <Input
                            value={
                                "9123j90354jdfs90234jsfd90238945jgdf9345jdfg9345jg90345jig9346j9456jyrt94jgrt903456jitg90u456j"
                            }
                            disabled
                        />
                    </div>
                </div>
                <div className="flex justify-center row">
                    <div className="h-12">
                        <Button
                            className="mr-6"
                            style={{ width: "200px" }}
                            color="orange"
                        >
                            Lấy token refresh
                        </Button>
                    </div>
                    <div
                        className="border border-orange-500 rounded-lg h-11"
                        style={{ width: "600px" }}
                    >
                        <Input
                            value={
                                "9123j90354jdfs90234jsfd90238945jgdf9345jdfg9345jg90345jig9346j9456jyrt94jgrt903456jitg90u456j"
                            }
                            disabled
                        />
                    </div>
                </div>
                <div className="container mx-auto mt-8">
                    <ul className="flex border-b">
                        <li className="mr-1 -mb-px">
                            <button
                                className={`inline-block py-2 px-4 text-green-600 font-bold ${
                                    activeTab === 1
                                        ? "border border-gray bg-white "
                                        : "border-white"
                                }`}
                                onClick={() => setActiveTab(1)}
                            >
                                Gửi thông báo ZNS theo danh sách
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                                className={`inline-block py-2 px-4 text-green-600 font-bold ${
                                    activeTab === 2
                                        ? "border border-gray bg-white "
                                        : "border-white"
                                }`}
                                onClick={() => setActiveTab(2)}
                            >
                                Gửi thông báo ZNS cho từng khách
                            </button>
                        </li>
                    </ul>
                    <div className="p-4 bg-white border border-t-0 rounded-b">
                        {activeTab === 1 ? (
                            <Tab1
                                setShowAlertFailed={setShowAlertFailed}
                                handleFileUpload={handleFileUpload}
                                file={file}
                            />
                        ) : (
                            <Tab2 />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}
export default ZaloSendZNSThanks;
