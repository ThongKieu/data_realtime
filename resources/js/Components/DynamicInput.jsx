import { Button, Input, Select, Option } from "@material-tailwind/react";
import React, { useState } from "react";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
function DynamicTwoInput({ disabledAllowed, sendDataToParent }) {
    const [selectedValue, setSelectedValue] = useState();
    const [data, setData] = useState([
        {
            id: 0,
            warranty_time: 0,
            unit: "kbh",
            warranty_info: "Không Bảo Hành",
        },
    ]);

    const handleSelectChange = (selectedValue, id) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, unit: selectedValue };
            }
            return item;
        });

        setData(updatedData);
        setSelectedValue(selectedValue);
        setIsAllowedBH(selectedValue === "KBH");
    };
    const handleClick = () => {
        // Tìm key lớn nhất hiện có và tăng lên 1 để tạo key mới
        const maxKey = Math.max(...data.map((item) => item.id));
        const newId = maxKey + 1;
        setData((prevData) => [
            ...prevData,
            {
                id: newId,
                warranty_time: 0,
                unit: "KBH",
                warranty_info: "Không Bảo Hành",
            },
        ]);
    };
    const optionBH = [
        { id: 0, unit: "KBH", label: "KBH" },
        { id: 1, unit: "d", label: "Ngày" },
        { id: 2, unit: "w", label: "Tuần" },
        { id: 3, unit: "m", label: "Tháng" },
        { id: 4, unit: "y", label: "Năm" },
    ];
    const [isAllowedBH, setIsAllowedBH] = useState(false);

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, [name]: value };
            }
            return item;
        });
        setData(updatedData);
    };
    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);

        console.log(updatedData);
    };
    sendDataToParent(data);
    // Trả về dữ liệu JSON
    return (
        <div className="w-full mt-0">
            {data.map((val) => (
                <div key={val.id} className="flex justify-between gap-1 mb-2">
                    <div className="flex-none">
                        <Input
                            label="Thời Gian Bảo Hành"
                            id="warranty_time"
                            name="warranty_time"
                            type="number"
                            min="1"
                            max="30"
                            value={val.warranty_time}
                            onChange={(e) => handleChange(e, val.id)}
                            className="w-[100%] shadow-none"
                            disabled={disabledAllowed || isAllowedBH}
                        />
                    </div>
                    <div>
                        <Select
                            value={val.unit}
                            defaultValue={selectedValue}
                            label="Bảo Hành"
                            onChange={(selectedValue) =>
                                handleSelectChange(selectedValue, val.id)
                            }
                            disabled={disabledAllowed}
                        >
                            {optionBH.map((option) => (
                                <Option key={option.unit} value={option.unit ||'Khác'}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex-1">
                        <Input
                            label="Nội Dung Bảo Hành"
                            name="warranty_info"
                            value={val.warranty_info}
                            onChange={(e) => handleChange(e, val.id)}
                            disabled={disabledAllowed || isAllowedBH}
                            className="mr-1 w-[100%] shadow-none"
                        />
                    </div>
                    {val.id == 0 ? (
                        <Button
                            variant="outlined"
                            color="red"
                            className="px-2 py-0 mx-1 "
                            disabled
                            onClick={(e) => handleDelete(val.id)}
                        >
                            <TrashIcon className="w-5 h-5" />
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="red"
                            className="px-2 py-0 mx-1 "
                            disabled={disabledAllowed || isAllowedBH}
                            onClick={(e) => handleDelete(val.id)}
                        >
                            <TrashIcon className="w-5 h-5" />
                        </Button>
                    )}
                </div>
            ))}
            <Button
                onClick={handleClick}
                variant="outlined"
                color="green"
                className="px-1 py-1 mb-1"
                disabled={disabledAllowed || isAllowedBH}
            >
                <PlusCircleIcon className="w-5 h-5" />
            </Button>
        </div>
    );
}
export default DynamicTwoInput;
