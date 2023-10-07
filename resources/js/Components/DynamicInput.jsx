import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import Select from "react-select";
function DynamicTwoInput({ disabledAllowed, sendDataToParent }) {
    const [data, setData] = useState([{ id: 1, NDBH: "" }]);
    const handleClick = (e) => {
        e.preventDefault();
        // Tìm key lớn nhất hiện có và tăng lên 1 để tạo key mới
        const maxKey = Math.max(...data.map((item) => item.id));
        const newId = maxKey + 1;
        setData([...data, { id: newId, NDBH: "" }]);
    };
    const optionBH = [
        { id: 0, value: "KBH", label: "KBH" },
        { id: 1, value: "d", label: "Ngày" },
        { id: 2, value: "w", label: "Tuần" },
        { id: 3, value: "m", label: "Tháng" },
        { id: 4, value: "y", label: "Năm" },
    ];
    const [selectBH, setSelectBH] = useState();
    const handleSelectChange = (selectedValue, id) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, selectValue: selectedValue };
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
        const updatedData = data.filter((item) => item.id !== id );
        setData(updatedData);
        sendDataToParent(updatedData);
        console.log("xoas", updatedData);
    };

    return (
        <div className="w-full mt-0">
            {data.map((val) => (
                <div key={val.id} className="flex justify-between gap-1 mb-2">
                    <div className="w-[120px]">
                        <Select
                            value={val.selectValue}
                            options={optionBH}
                            onChange={
                                (selectedValue) =>
                                    handleSelectChange(selectedValue, val.id) // Truyền id của item vào handleSelectChange
                            }
                            className="border-none shadow-none"
                        />
                    </div>
                    <div className="flex-none">
                        <Input
                            label="Thời Gian Bảo Hành"
                            id="info_BH"
                            name="info_BH"
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
                            name="NDBH"
                            value={val.fname}
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
