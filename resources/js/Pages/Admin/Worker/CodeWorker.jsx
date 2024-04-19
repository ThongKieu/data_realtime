import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";

import { Head } from '@inertiajs/react';
import React from 'react';
import {
    PlusCircleIcon,
    MapPinIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Typography, Input, Textarea } from "@material-tailwind/react";

import { useState } from "react";
import { host } from "@/Utils/UrlApi";
function CodeWorker(auth) {
    const [open, setOpen] = useState(false);
    const [checkCode, setCheckCode] = useState('');

    const handleOpen = () => setOpen(!open);
    const [dataCodeWorker, setFormDataCodeWorker] = useState({
        code_worker: '', kind_worker: '', descript_code_worker: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'code_worker') {
            // Kiểm tra xem mã code_worker có ít nhất 3 ký tự không
            if (value.length < 3) {
                console.log('Mã code_worker cần ít nhất 3 ký tự');
                // Thực hiện các hành động khác nếu cần
            }
        }
        
        setFormDataCodeWorker({ ...dataCodeWorker, [name]: value });
        // fetchCheckCode(value);
        console.log(dataCodeWorker.code_worker);
    };
     // useEffect chỉ chạy một lần sau khi render đầu tiên

     const fetchData = async (dataCodeWorker) => {
        try {
            const res = await fetch(host + "api/web/workers/code-worker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataCodeWorker),
            });
            if (res.ok) {
                console.log("status_change_worker");
                handleOpen();
                window.location.reload();
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        // console.log('11111');
    };
    const fetchCheckCode = async (code) => {
        try {
            const res = await fetch(host + "api/web/workers/check-code-worker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(code),
            });
            if (res.ok) {

                console.log(res);
                // Xử lý kết quả trả về từ API nếu cần
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    };
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Tài khoản thợ" />
            <div className="p-1">
                <Card>
                    <div className="grid grid-cols-5 ">
                        <div className='col-span-4 m-auto'>
                            <h2 className="uppercase" >Danh Sách - Mã Code</h2>
                        </div>

                        <div className="col-span-1 m-auto"> <PlusCircleIcon className="w-10 h-10" onClick={handleOpen}></PlusCircleIcon>


                            <Dialog open={open} handler={handleOpen}>
                                <DialogHeader>
                                    <h2 className="m-auto">Nhập thông tin thợ mới</h2>
                                </DialogHeader>
                                <DialogBody divider>
                                    <div className="grid grid-cols-2 gap-2 m-1 ">
                                        <Input
                                            type="text"
                                            className="shadow-none text-black"
                                            id="code_worker"
                                            name="code_worker"
                                            value={dataCodeWorker.code_worker}
                                            onChange={handleChange}
                                            label="Nhập Ký Hiệu Mã mới"
                                            required
                                        />
                                        <Input
                                            type="text"
                                            className="shadow-none"
                                            id="kind_worker"
                                            name="kind_worker"
                                            value={dataCodeWorker.kind_worker}
                                            onChange={handleChange}
                                            label="Loại Thợ"
                                            required
                                        />


                                    </div>
                                    <Textarea
                                        type="text"
                                        className="shadow-none "
                                        id="descript_code_worker"
                                        name="descript_code_worker"
                                        value={dataCodeWorker.descript_code_worker}
                                        onChange={handleChange}
                                        label="Mô tả loại thợ"
                                        required
                                    />

                                </DialogBody>

                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleOpen}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="green" onClick={()=>fetchData(dataCodeWorker)}>
                                        <span>Con1firm</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </div>

                    </div>
                </Card>

            </div>
            <Card className="bg-white ">

            </Card>
        </AuthenticatedLayoutAdmin>
    )
}

export default CodeWorker