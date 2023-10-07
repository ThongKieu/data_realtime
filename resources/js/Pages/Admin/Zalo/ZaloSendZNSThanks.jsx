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
import { formattedDate } from "@/Utils/DateTime";

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
    const [date, setDate] = useState(formattedDate);
    const [selectedValue, setSelectedValue] = useState("Ngày");

    const handleSelectChange = (event) => {
        if (event && event.target && event.target.value) {
            setSelectedValue(event.target.value);
        }
    };
    const handleChangeInputDate = (event) => {
        if (event && event.target && event.target.value) {
            setDate(event.target.value);
        }
    };
    const classInput_border =
        'className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500  ';

    const postSenZNSThanksOnly = async ()=>{
        try {
            const response = await fetch("https://business.openapi.zalo.me/message/template", {
                method: "POST",
                headers: {
                    'access_token': 'fl8e9GB7sdUgz2mj2S3KSgdt8Ie9tfHmpUiuNHoucdpxo1PdAlUvN8oOCqvnrBvgkAiDP63EeM71lnDc9lAdOkI-9cT6zOv9duGTTq3HwqtdcKvDGlNe4Al3IJaMaAGmoDLSRZ-AwJp4tXrkBeoOKVI_FGCDZw8W_z8D10UVfbx6rYK249c1KEp7ScGti-9Pr-1EOYgfzbFOv5TDEAJjVEd4P6STZi4qoyir2pgJf2RQyWeBUhYlB8Vw7nTPkASDhlelLqtAbLcj-mHjLwcyFwIP3cHTzxH4YzqGV5QjcdNrcMra4i7LQScIHdXev-HSZ8XzHMMwtcdOX70w8xFcClhwO0iEpi8bwB4o7GdCXnpzXJ138kwMOksw35WdvvrarBKRPnxXbMxlXMH6Ai-TIjc5BrLna0V0QmBRsdS',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "phone": "84968409323",
                    "template_id": "285902",
                    "template_data":{
                        "phone": "0968409xxx",
                        "code": "120199",
                        "dc_kh": "184 Nguyễn Xí, P26, Bình Thạnh",
                        "nd_cv": "Thông nghẹt toilet lầu 2",
                        "status": "Hỗ trợ dịch vụ liên quan sau giao dịch"},
                    "tracking_id":"223344"})
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("Ok !!!",responseData);
                alert(' Gửi Thành Công!')
            } else {
                console.error("Lỗi response !!!:", response.statusText);
            }
        } catch (error) {
            console.error("Lỗi !!!", error);
        }
    }

    // Xử lý logic cho Tab 2
    return (
        <div>
            <Card color="transparent" shadow={false} className="ml-60" >
                <Typography variant="h4" color="blue-gray">
                    Gửi Thông Báo ZNS Cảm Ơn Từng Khách Hàng
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Vui lòng nhập thông tin khách hàng
                </Typography>
                <div className="flex row">
                <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96 mr-40">
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
                            }} value={date} onChange={handleChangeInputDate}
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
                        <Input type="number"
                            size="lg"
                            className={`mt-1 ` + classInput_border}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>

                    <Button className="mt-6" fullWidth color="green" onClick={() => {
                         postSenZNSThanksOnly();
                        }}>
                        Gửi Thông Báo
                    </Button>
                </form>
                <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96" style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                <Typography color="gray" className="mt-1 font-bold">
                Thợ Việt chân thành cảm ơn!
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                Quý Khách đã quan tâm và sử dụng dịch vụ! Quý Khách vui lòng cài đặt ứng dụng Thợ Việt để theo dõi lịch sử công việc, bảo hành điện tử dễ dàng, tiện lợi !
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                Mã đơn:
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                Trạng thái: Thành Công
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                Ngày làm: {date}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                Thời gian bảo hành:
                </Typography>

                    <Button className="mt-6" fullWidth color="green" >
                        Liên Hệ Bộ Phận CSKH
                    </Button>
                    <Button className="mt-2" fullWidth color="gray" >
                        Phản Hồi Dịch Vụ
                    </Button>
                </form>
                </div>
                
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
                                className={`inline-block py-2 px-4 text-green-600 font-bold ${activeTab === 1
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
                                className={`inline-block py-2 px-4 text-green-600 font-bold ${activeTab === 2
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
