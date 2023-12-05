import { Fragment, useState, useEffect, memo } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Radio,
} from "@material-tailwind/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

import FileInput from "../FileInputImage";
function formatCardNumber(value) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(" ");
    } else {
        return value;
    }
}
// --------------------API ---------
import { getFormattedToday, url_API, url_API_District } from "@/data/UrlAPI/UrlApi";
import { host } from "@/Utils/UrlApi";
import newSocket from "@/Utils/socket";
function formatExpires(value) {
    return value
        .replace(/[^0-9]/g, "")
        .replace(/^([2-9])$/g, "0$1")
        .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
        .replace(/^0{1,}/g, "0")
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).\*/g, "$1/$2");
}

function FloatingButton() {
    // Lấy thông tin ngày, tháng và năm từ đối tượng Date

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [formData, setFormData] = useState({
        work_content: "",
        date_book: "",
        phone_number: "",
        district: "Khác",
        work_note: "",
        street: "",
        member_read: 1,
        kind_work: 0,
        status_cus: 0,
        from_cus: 0,
        flag_status: 1,
    });
    // ---------------------- select quan --------------------------------
    // const [selectedOptionDistrict, setSelectedOptionDistrict] = useState('');
    const [optionsDistrict, setOptionsDistrict] = useState([]);
    const [selectedOption, setSelectedOption] = useState("q1");

    const handleOptionChangeDistrict = (event) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(host + url_API_District);
            const jsonData = await response.json();
            setOptionsDistrict(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    //-------------- change value input form -----------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    //----------- change value input file image form -------------------
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    //-------------------- add new order ----------------------------
    const [socketFTB, setSocketFTB] = useState(null);
    useEffect(() => {
        setSocketFTB(newSocket, { secure: true });
        return () => {
            newSocket.disconnect();
        };
    }, []);
    const handleAddWork = async (e) => {
        e.preventDefault();
        const formData1 = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData1.append("image_work_path[]", selectedFiles[i]);
            console.log("ddddd",selectedFiles[i] );
        }
        formData1.append("work_content", formData.work_content);
        formData1.append("date_book", selectedDate);
        formData1.append("district", selectedOption);
        formData1.append("phone_number", formData.phone_number);
        formData1.append("kind_work", formData.kind_work);
        formData1.append("status_cus", formData.status_cus);
        formData1.append("work_note", formData.work_note);
        formData1.append("flag_status", formData.flag_status);
        formData1.append("from_cus", formData.from_cus);
        formData1.append("name_cus", formData.name_cus);
        formData1.append("street", formData.street);
        formData1.append("member_read", formData.member_read);
        console.log("ddddd",formData1, formData,selectedDate,selectedOption );
        try {
            const response = await fetch(host + url_API, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: formData1,
            });
            if (response.status === 200) {
                socketFTB.emit("addWorkTo_Server", formData1);
                console.log("ddddd",formData1 );
                handleOpen();
                // setFormData("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // ------------------------ format date -----------------

    const formattedToday = getFormattedToday();

    const [selectedDate, setSelectedDate] = useState(formattedToday);
    // console.log("selectedDate", selectedDate);
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    return (
        <Fragment>
            <Button
                className="p-3 text-black bg-blue-500 rounded-full "
                onClick={handleOpen}
            >
                <PlusIcon className="w-6 h-6" />
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className=" md:max-lg:text-xs">
                        Thêm Khách Hàng Mới
                    </DialogHeader>
                    <XMarkIcon
                        className="w-5 h-5 mr-3 cursor-pointer"
                        onClick={handleOpen}
                    />
                </div>
                <form className="flex flex-col">
                    <DialogBody divider>
                        <div className="my-1">
                            <div className="my-2">
                                <Input
                                    label="Số điện thoại"
                                    value={formData.phone_number}
                                    id="phone_number"
                                    name="phone_number"
                                    className="shadow-none"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="my-2">
                                <Input
                                    label="Yêu Cầu Công Việc"
                                    className="shadow-none"
                                    id="work_content"
                                    name="work_content"
                                    value={formData.work_content}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center gap-4 my-4">
                                <Input
                                    label="Địa Chỉ"
                                    className="shadow-none"
                                    id="street"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                />
                                {/* <Input label="Quận" className="shadow-none" id="district"
                                    name="district" value={formData.district} onChange={handleChange} /> */}

                                <select
                                    value={selectedOption}
                                    onChange={handleOptionChangeDistrict}
                                    className="border rounded-lg"
                                >
                                    {optionsDistrict.map(
                                        (optionDistrict, index) => (
                                            <option
                                                key={index}
                                                value={
                                                    optionDistrict.dis_sort_name
                                                }
                                            >
                                                {optionDistrict.dis_name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="my-2">
                                <Input
                                    label="Ghi Chú"
                                    className="shadow-none"
                                    id="work_note"
                                    name="work_note"
                                    value={formData.work_note}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center gap-4 my-4">
                                <Input
                                    type="text"
                                    label="Tên KH "
                                    value={formData.name_cus}
                                    onChange={handleChange}
                                    id="name_cus"
                                    name="name_cus"
                                    containerProps={{
                                        className: "min-w-[72px]",
                                    }}
                                    className="shadow-none"
                                />
                                <Input
                                    label="Ngày Làm"
                                    maxLength={4}
                                    id="date_book"
                                    type="date"
                                    name="date_book"
                                    containerProps={{
                                        className: "min-w-[72px]",
                                    }}
                                    className="shadow-none"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className="items-center justify-center gap-4 my-4 text-xs ">
                                <div className="flex justify-between w-full">
                                    <Radio
                                        id="DN"
                                        name="kind_work"
                                        label="Điện Nước"
                                        value="0"
                                        checked={formData.kind_work === "0"}
                                        onChange={handleChange}
                                    />
                                    <Radio
                                        id="DL"
                                        name="kind_work"
                                        label="Điện Lạnh"
                                        value="1"
                                        checked={formData.kind_work === "1"}
                                        onChange={handleChange}
                                    />
                                    <Radio
                                        id="DG"
                                        name="kind_work"
                                        label="Đồ Gỗ"
                                        value="2"
                                        checked={formData.kind_work === "2"}
                                        onChange={handleChange}
                                    />
                                    <Radio
                                        id="NLMT"
                                        name="kind_work"
                                        label="Năng Lượng"
                                        value="3"
                                        checked={formData.kind_work === "3"}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-between w-full">
                                    <Radio
                                        id="XD"
                                        name="kind_work"
                                        label="Xây Dựng"
                                        value="4"
                                        checked={formData.kind_work === "4"}
                                        onChange={handleChange}
                                    />
                                    <Radio
                                        id="TX"
                                        name="kind_work"
                                        label="Tài Xế"
                                        value="5"
                                        checked={formData.kind_work === "5"}
                                        onChange={handleChange}
                                    />
                                    <Radio
                                        id="HX"
                                        name="kind_work"
                                        label="Cơ Khí"
                                        value="6"
                                        checked={formData.kind_work === "6" }
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-center ">
                                <FileInput
                                    handleFileChange={handleFileChange}
                                    previewImages={previewImages}
                                />
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className="justify-center space-x-2">
                        <Button
                            size="lg"
                            className="w-11/12"
                            onClick={handleAddWork}
                        >
                            Thêm
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </Fragment>
    );
}
export default memo(FloatingButton);
