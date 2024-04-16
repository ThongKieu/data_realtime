import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";

import { Head } from '@inertiajs/react';
import React from 'react';
import {
    PlusCircleIcon,
    MapPinIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import {Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Typography,Input, Textarea} from "@material-tailwind/react";

import { useState } from "react";
function CodeWorker(auth) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [dataCodeWorker,setFormDataCodeWorker] = useState({
        code_worker:'',kind_worker:'',descript_code_worker:''
});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataCodeWorker({ ...dataCodeWorker, [name]: value });
        console.log(dataCodeWorker);
    };
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Tài khoản thợ" />
            <div className="p-1">
               <Card>
                <div className="grid grid-cols-5 ">
                    <div className='col-span-4 m-auto'>
                        <h2 className= "uppercase" >Danh Sách - Mã Code</h2>
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
                        <Button variant="gradient" color="green" onClick={handleOpen}>
                            <span>Confirm</span>
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