import React from "react";
import {
    Input,
    Textarea,
    Button,
    Radio,
    Divider,
    Card,
} from "@material-tailwind/react";

function WorkForm({ cardExpires, handleChange, vatCard,children,disabledAllowed }) {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <form className="flex flex-col gap-4 mt-2">
            {/* Các trường input */}
            <div className="flex items-center gap-4 ">
                <Input
                    label="Yêu Cầu Công Việc"
                    id="work_content"
                    name="work_content"
                    value={cardExpires.work_content}
                    onChange={handleChange}
                    containerProps={{
                        className: "min-w-[72px]",
                    }}
                    className="shadow-none"
                />
                <Input
                    label="Số Điện Thoại"
                    id="phone_number"
                    name="phone_number"
                    value={cardExpires.phone_number}
                    onChange={handleChange}
                    containerProps={{
                        className: "min-w-[72px]",
                    }}
                    className="shadow-none"
                />
            </div>
            <div className="flex items-center gap-4">
                <Input
                    label="Địa Chỉ"
                    id="street"
                    name="street"
                    value={cardExpires.street}
                    onChange={handleChange}
                    containerProps={{
                        className: "min-w-[72px]",
                    }}
                    className="shadow-none"
                />
                <Input
                    label="Quận"
                    id="district"
                    name="district"
                    value={cardExpires.district}
                    onChange={handleChange}
                    containerProps={{
                        className: "min-w-[72px]",
                    }}
                    className="shadow-none"
                />
            </div>
            <div className="flex items-center gap-4">
                <Input
                    label="Tên Khách Hàng"
                    id="name_cus"
                    name="name_cus"
                    value={cardExpires.name_cus}
                    onChange={handleChange}
                    containerProps={{
                        className: "min-w-[72px]",
                    }}
                    className="shadow-none"
                />

                <Input
                    label="Ngày Làm"
                    id="date_book"
                    name="date_book"
                    value={cardExpires.date_book}
                    onChange={handleChange}
                    containerProps={{
                        className: "min-w-[72px]",
                    }}
                    className="shadow-none"
                    disabled={disabledAllowed}
                />
            </div>

            <div className="flex items-center gap-4 ">
                <div className="w-full">
                    <Input
                        label="Ghi Chú"
                        id="real_note"
                        name="real_note"
                        value={cardExpires.real_note}
                        onChange={handleChange}
                        containerProps={{
                            className: "min-w-[72px]",
                        }}
                        className="shadow-none"
                    />
                </div>

                <div className="flex items-center w-full gap-4 ">
                    <Input
                        label="Tiền Chi"
                        id="spending_total"
                        name="spending_total"
                        value={cardExpires.spending_total}
                        onChange={handleChange}
                        containerProps={{
                            className: "min-w-[72px]",
                        }}
                        className="shadow-none"
                        disabled={disabledAllowed}
                    />
                    <Input
                        label="Tiền Thu"
                        id="income_total"
                        name="income_total"
                        value={cardExpires.income_total}
                        onChange={handleChange}
                        containerProps={{
                            className: "min-w-[72px]",
                        }}
                        className="shadow-none"
                        disabled={disabledAllowed}
                    />
                </div>
            </div>

            {/* Button và Radio */}

                        <main>{children}</main>
            {/* Thêm các trường input và component khác ở đây */}
        </form>
    );
}

export default WorkForm;
