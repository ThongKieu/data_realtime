import { Button, Input, Select, Option } from "@material-tailwind/react";
import React, { useState } from "react";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// import Select from "react-select";

function DynamicTwoInput({ disabledAllowed, sendDataToParent }) {
    const [data, setData] = useState([{ id: 1, warranty_time: "",unit:"KBH" }]);
    const handleClick = (e) => {
        e.preventDefault();
        // Tìm key lớn nhất hiện có và tăng lên 1 để tạo key mới
        const maxKey = Math.max(...data.map((item) => item.id));
        const newId = maxKey + 1;
        setData([...data, { id: newId, warranty_time: "" }]);
    };
    const optionBH = [
        { id: 0, value: "KBH", label: "KBH" },
        { id: 1, value: "d", label: "Ngày" },
        { id: 2, value: "w", label: "Tuần" },
        { id: 3, value: "m", label: "Tháng" },
        { id: 4, value: "y", label: "Năm" },
    ];
    const handleSelectChange = (selectedValue, id) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, unit: selectedValue };
            }
            return item;
        });

        setData(updatedData);
        sendDataToParent(updatedData);
        console.log("updatedData11111", updatedData);
    };
    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, [name]: value };
            }
            return item;
        });
        setData(updatedData);
        sendDataToParent(updatedData);
    };

    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        sendDataToParent(updatedData);
        console.log("xoas", updatedData);
    };

    return (
        <div className="w-full mt-0">
            {data.map((val) => (
                <div key={val.id} className="flex justify-between gap-1 mb-2">
                    <div>
                        <Select
                            value={val.unit}
                            label="Bảo Hành"
                            onChange={
                                (selectedValue) =>
                                    handleSelectChange(selectedValue, val.id) // Truyền id của item vào handleSelectChange
                            }
                            disabled={disabledAllowed}
                        >
                            {optionBH.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex-none">
                        <Input
                            label="Thời Gian Bảo Hành"
                            id="warranty_time"
                            name="warranty_time"
                            type="number"
                            min="1"
                            max="30"
                            onChange={(e) => handleChange(e, val.id)}
                            className="w-[100%] shadow-none"
                            disabled={disabledAllowed}
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            label="Nội Dung Bảo Hành"
                            name="warranty_info"
                            value={val.warranty_info}
                            onChange={(e) => handleChange(e, val.id)}
                            disabled={disabledAllowed}
                            className="mr-1 w-[100%] shadow-none"
                        />
                    </div>

                    <Button
                        variant="outlined"
                        color="red"
                        className="px-2 py-0 mx-1 "
                        disabled={disabledAllowed}
                        onClick={(e) => handleDelete(e, val.id)}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </Button>
                </div>
            ))}
            <Button
                onClick={handleClick}
                variant="outlined"
                color="green"
                className="px-1 py-1 mb-1"
                disabled={disabledAllowed}
            >
                <PlusCircleIcon className="w-5 h-5" />
            </Button>
        </div>
    );
}
export default DynamicTwoInput;
