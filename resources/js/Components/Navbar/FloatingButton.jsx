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
import {
    getFormattedToday,
    url_API,
    url_API_District,
} from "@/Data/UrlAPI/UrlApi";
import { host } from "@/Utils/UrlApi";
import newSocket from "@/Utils/Socket";
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
        kind_work: 1,
        status_cus: 0,
        from_cus: 0,
        flag_status: 1,
    });
    // ---------------------- select quan --------------------------------
    const [optionsDistrict, setOptionsDistrict] = useState([]);
    const [kindWorker, setKindWorker] = useState([]);
    const [selectedOption, setSelectedOption] = useState("khác");
    const handleOptionChangeDistrict = (event) => {
        setSelectedOption(event.target.value);
    };
    const formattedToday = getFormattedToday();
    const [selectedDate, setSelectedDate] = useState(formattedToday);
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    useEffect(() => {
        fetchData();
        fetchDataKindWorker();
        return () => {
            newSocket.disconnect();
        };
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
    const fetchDataKindWorker = async () => {
        try {
            const response = await fetch(host + "api/web/workers/all-code");
            const jsonData = await response.json();
            setKindWorker(jsonData);
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
    const handleAddWork = async (e) => {
        e.preventDefault();
        const formData1 = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData1.append("image_work_path[]", selectedFiles[i]);
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
        try {
            const response = await fetch(
                host + `api/web/works?dateCheck=${selectedDate}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    mode: "no-cors",
                    body: formData1,
                }
            );
            if (response.status === 200) {
                newSocket.emit("addWorkTo_Server", formData);
                handleOpen();
                setFormData({
                    member_read: 1,
                    kind_work: 1,
                    status_cus: 0,
                    from_cus: 0,
                    flag_status: 1,
                });
            } else if (response.status === 422) {
                alert(
                    `Quên nhập thông tin khách hàng rồi kìa mấy má ơi! ${response.errors}`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    // ------------------------ format date -----------------

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
                                    type="text"
                                    name="phone_number"
                                    className="shadow-none required"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="my-2">
                                <Input
                                    label="Yêu Cầu Công Việc"
                                    className="shadow-none"
                                    id="work_content"
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                <div className="grid grid-cols-4 gap-2">
                                    {kindWorker.map((item, index) => {
                                        return (
                                            <Radio
                                                key={index}
                                                id={item.code_worker}
                                                name="kind_work"
                                                label={item.kind_worker}
                                                value={item.id}
                                                checked={
                                                    formData.kind_work ===
                                                    item.id
                                                }
                                                onChange={handleChange}
                                            />
                                        );
                                    })}
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
                            onClick={(e) => {
                                handleAddWork(e);
                            }}
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
