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
import AlertIcon from "@/Pages/Admin/DataImport/Components/AlertIcon";
import GetCode_inter from "./GetCode_inter";
function Tab1() {
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const [excelData, setExcelData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setShowAlertFailed(false);
            setExcelData(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const sendZNSThanksMany = () => {
        excelData.forEach(async (row) => {
            try {
                const response = await fetch(
                    "https://business.openapi.zalo.me/message/template",
                    {
                        method: "POST",
                        headers: {
                            access_token:
                                "-BJuVgccsJ_qilnseg7NElUnyN6YlxD6WStALvwrbbkyvUXKilU16gM3eocDazrfgONtTVJ9e6ZRliTJ-lMLPl66xL6YzvyOZ-_0LAk6kbMCuEvaX_d8NucmhdQUr_H2WR-_TOpwt6_Hk_rVmAwMOUl3iqFMiUvesCkCGCk2gNRB-fTutf7tITRci7_VbSvnwDgOU-oRsb3byR0G-fMN1_hzt2d5cgG8mjtxFik4WGFawjOMvuA2FU7bl6Zff9r9_VRyHj6EmWY5dvSxhe_hTRpLp5USeOrPjF7GHe6hYdo1t_nlhwk78PxFyM_AhPLbmxJrRDxnh7M8v_1cjAEjUPBkyIp3evS6n_JgCDFibYVtc-eyrCd93FU5xnFnoBi3tAdx3k7EdWxJXUGUXCdQAx2Yc0eqT6KW4tYfkja_",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            phone:
                                "84" +
                                ((row[0] + "").startsWith("0")
                                    ? row[0].substring(1, 10)
                                    : row[0]),
                            template_id: "231677",
                            template_data: {
                                date: row[2],
                                code: "120199",
                                customer_name: row[1],
                                status: "Thành công",
                                warranty: row[3] + " " + row[4],
                            },
                            tracking_id: "120199",
                        }),
                    }
                );
                if (response.ok) {
                    const responseJson = await response.json();
                    console.log(responseJson);
                    switch (responseJson.error) {
                        case 0:
                            alert("Gửi thành công !!");
                            break;
                        case -108:
                            alert("Số liên hệ không hợp lệ !!");
                            break;
                        case -137:
                            alert(
                                "Thanh toán ZCA thất bại (Ví không đủ số dư !!)"
                            );
                            break;
                        default:
                            alert(
                                "Lỗi không xác định vui lòng liên hệ ADMIN !!)"
                            );
                            break;
                    }
                } else {
                    console.error("Lỗi response !!: ", response.statusText);
                }
            } catch (error) {
                console.error("Lỗi !!", error);
            }
        });
    };
    return (
        <div>
            <Card
                className={`border  ${
                    showAlertFailed
                        ? "border-red-400 shadow-red-400"
                        : "shadow-blue-400 border-blue-400"
                }`}
            >
                <div className="flex flex-col items-center justify-center p-2">
                    {showAlertFailed && (
                        <div className="w-1/2">
                            <AlertIcon
                                setShowAlertFailed={setShowAlertFailed}
                                contentAlert={
                                    "Vui lòng chọn file cần thêm dữ liệu !!"
                                }
                            />
                        </div>
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
                            className="pl-0 border-none"
                            onChange={handleFileUpload}
                        />
                        <Button
                            className="mt-10"
                            fullWidth
                            color="green"
                            onClick={() => {
                                if (excelData.length == 0) {
                                    setShowAlertFailed(true);
                                } else {
                                    // console.log(excelData);
                                    sendZNSThanksMany();
                                }
                            }}
                        >
                            Gửi Thông Báo
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}

function Tab2() {
    const [phoneCustomer, setPhoneCustomer] = useState("");
    const [nameCustomer, setNameCustomer] = useState("Anh/Chị");
    const [date, setDate] = useState(formattedDate);
    const [typeOfTime, setTypeOfTime] = useState("Ngày");
    const [time, setTime] = useState("");
    const [showAlertFailed, setShowAlertFailed] = useState(false);

    const handleInputChangePhoneCustomer = (event) => {
        if (event && event.target && event.target.value) {
            if (event.target.value.length <= 10) {
                setPhoneCustomer(event.target.value);
            }
        }
    };

    const handleChangeInputDate = (event) => {
        if (event && event.target && event.target.value) {
            setDate(event.target.value);
        }
    };

    const handleSelectChangeTypeOfTime = (event) => {
        if (event && event.target && event.target.value) {
            setTypeOfTime(event.target.value);
        }
    };

    const handleInputChangeTime = (event) => {
        if (event && event.target && event.target.value) {
            if (event.target.value.length <= 2) {
                setTime(event.target.value);
            }
        }
    };

    const classInput_border =
        'className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500  ';

    // body: JSON.stringify({
    //     "phone": "84968409323",
    //     "template_id": "285902",
    //     "template_data":{
    //         "phone": "0968409xxx",
    //         "code": "120199",
    //         "dc_kh": "184 Nguyễn Xí, P26, Bình Thạnh",
    //         "nd_cv": "Thông nghẹt toilet lầu 2",
    //         "status": "Hỗ trợ dịch vụ liên quan sau giao dịch"},
    //     "tracking_id":"223344"})

    const sendZNSThanksOnly = async () => {
        try {
            const response = await fetch(
                "https://business.openapi.zalo.me/message/template",
                {
                    method: "POST",
                    headers: {
                        access_token:
                            "-BJuVgccsJ_qilnseg7NElUnyN6YlxD6WStALvwrbbkyvUXKilU16gM3eocDazrfgONtTVJ9e6ZRliTJ-lMLPl66xL6YzvyOZ-_0LAk6kbMCuEvaX_d8NucmhdQUr_H2WR-_TOpwt6_Hk_rVmAwMOUl3iqFMiUvesCkCGCk2gNRB-fTutf7tITRci7_VbSvnwDgOU-oRsb3byR0G-fMN1_hzt2d5cgG8mjtxFik4WGFawjOMvuA2FU7bl6Zff9r9_VRyHj6EmWY5dvSxhe_hTRpLp5USeOrPjF7GHe6hYdo1t_nlhwk78PxFyM_AhPLbmxJrRDxnh7M8v_1cjAEjUPBkyIp3evS6n_JgCDFibYVtc-eyrCd93FU5xnFnoBi3tAdx3k7EdWxJXUGUXCdQAx2Yc0eqT6KW4tYfkja_",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phone:
                            "84" +
                            (phoneCustomer.startsWith("0")
                                ? phoneCustomer.substring(1, 10)
                                : phoneCustomer),
                        template_id: "231677",
                        template_data: {
                            date: date,
                            code: "Không phiếu thu",
                            customer_name: nameCustomer,
                            status: "Thành công",
                            warranty: time + " " + typeOfTime,
                        },
                        tracking_id: "120199",
                    }),
                }
            );
            if (response.ok) {
                const responseJson = await response.json();
                console.log(responseJson);
                switch (responseJson.error) {
                    case 0:
                        alert("Gửi thành công !!");
                        break;
                    case -108:
                        alert("Số liên hệ không hợp lệ !!");
                        break;
                    case -137:
                        alert("Thanh toán ZCA thất bại (Ví không đủ số dư !!)");
                        break;
                    default:
                        alert("Lỗi không xác định vui lòng liên hệ ADMIN !!)");
                        break;
                }
            } else {
                console.error("Lỗi response !!: ", response.statusText);
            }
        } catch (error) {
            console.error("Lỗi !!", error);
        }
    };

    // Xử lý logic cho Tab 2
    return (
        <div>
            <Card
                className={`border  ${
                    showAlertFailed
                        ? "border-red-400 shadow-red-400"
                        : "shadow-blue-400 border-blue-400"
                }`}
            >
                <div className="flex flex-col items-center justify-center p-2">
                    <div className="flex flex-col items-center justify-center">
                        <Typography variant="h4" color="blue-gray">
                            Gửi Thông Báo ZNS Cảm Ơn Từng Khách Hàng
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Vui lòng nhập thông tin khách hàng
                        </Typography>
                    </div>

                    <div className="flex row">
                        <form className="max-w-screen-lg mt-8 mb-2 mr-40 w-80 sm:w-96">
                            {showAlertFailed && (
                                <AlertIcon
                                    setShowAlertFailed={setShowAlertFailed}
                                    contentAlert={
                                        "Vui lòng nhập đủ thông tin khách hàng !!"
                                    }
                                />
                            )}
                            <div className="flex flex-col mb-4 ">
                                <p>Số liên hệ khách hàng: </p>
                                <Input
                                    value={phoneCustomer}
                                    onChange={handleInputChangePhoneCustomer}
                                    type="number"
                                    size="lg"
                                    className={
                                        `mb-4` +
                                        classInput_border +
                                        `[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
                                    }
                                    labelProps={{ className: "hidden" }}
                                />
                                <p className="mt-3">Tên khách hàng: </p>
                                <Input
                                    value={nameCustomer}
                                    disabled
                                    size="lg"
                                    className={classInput_border}
                                    labelProps={{ className: "hidden" }}
                                />
                                <p className="mt-3">Ngày làm: </p>
                                <Input
                                    size="lg"
                                    className={classInput_border}
                                    labelProps={{ className: "hidden" }}
                                    value={date}
                                    onChange={handleChangeInputDate}
                                />
                                <p className="mt-3">Thời gian bảo hành: </p>
                                <Select
                                    color="green"
                                    variant="outlined"
                                    value={typeOfTime}
                                    onChange={handleSelectChangeTypeOfTime}
                                    className={classInput_border}
                                    labelProps={{ className: "hidden" }}
                                >
                                    <Option value="Ngày" className="p-1">
                                        Ngày
                                    </Option>
                                    <Option value="Tháng" className="p-1 my-1">
                                        Tháng
                                    </Option>
                                    <Option value="Năm" className="p-1 ">
                                        Năm
                                    </Option>
                                </Select>
                                <Input
                                    value={time}
                                    onChange={handleInputChangeTime}
                                    type="number"
                                    size="lg"
                                    className={
                                        `mt-1 ` +
                                        classInput_border +
                                        `[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
                                    }
                                    labelProps={{ className: "hidden" }}
                                />
                            </div>
                            <Button
                                className="mt-6"
                                fullWidth
                                color="green"
                                onClick={() => {
                                    if (
                                        phoneCustomer.length == 0 ||
                                        date.length == 0 ||
                                        typeOfTime.length == 0 ||
                                        time.length == 0
                                    ) {
                                        setShowAlertFailed(true);
                                    } else {
                                        setShowAlertFailed(false);
                                        sendZNSThanksOnly();
                                    }
                                }}
                            >
                                Gửi Thông Báo
                            </Button>
                        </form>
                        <form
                            className="h-auto max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
                            style={{
                                border: "2px solid #ccc",
                                padding: "20px",
                                borderRadius: "5px",
                            }}
                        >
                            <Typography color="gray" className="mt-1 font-bold">
                                Thợ Việt chân thành cảm ơn!
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 text-sm font-normal"
                            >
                                Quý Khách đã quan tâm và sử dụng dịch vụ! Quý
                                Khách vui lòng cài đặt ứng dụng Thợ Việt để theo
                                dõi lịch sử công việc, bảo hành điện tử dễ dàng,
                                tiện lợi !
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 text-sm font-normal"
                            >
                                Mã đơn:
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 text-sm font-normal"
                            >
                                Trạng thái: Thành Công
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 text-sm font-normal"
                            >
                                Ngày làm: {date}
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 text-sm font-normal"
                            >
                                Thời gian bảo hành:
                            </Typography>

                            <Button className="mt-6" fullWidth color="green">
                                Liên Hệ Bộ Phận CSKH
                            </Button>
                            <Button className="mt-2" fullWidth color="gray">
                                Phản Hồi Dịch Vụ
                            </Button>
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
}
function ZaloSendZNSThanks() {
    const [activeTab, setActiveTab] = useState(1);
    const dataBtn = [
        {
            id: 1,
            colorBtn: "green",
            labelBtn: "Lấy token mới",
            valueInput:
                "29123j90354jdfs90234jsfd90238945jgdf9345jdfg9345jg90345jig9346j9456jyrt94jgrt903456jitg90u456j",
        },
        {
            id: 2,
            colorBtn: "orange",
            labelBtn: "Lấy token refresh",
            valueInput:
                "19123j90354jdfs90234jsfd90238945jgdf9345jdfg9345jg90345jig9346j9456jyrt94jgrt903456jitg90u456j",
        },
    ];
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Gửi ZNS cảm ơn khách hàng" />
            <div className="flex justify-center h-full p-2">
                <Card className=" w-[90%] h-[90%] m-auto  bg-white ">
                    <div className="p-2">
                        {dataBtn.map((item) => (
                            <GetCode_inter
                                key={item.id}
                                handleOnclick={item.handleOnClick}
                                labelBtn={item.labelBtn}
                                valueInput={item.valueInput}
                                colorBtn={item.colorBtn}
                            />
                        ))}
                    </div>
                    <Card className="container mx-auto mt-8 border border-gray-500 rounded-sm">
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
                            {activeTab === 1 ? <Tab1 /> : <Tab2 />}
                        </div>
                    </Card>
                </Card>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}
export default ZaloSendZNSThanks;
