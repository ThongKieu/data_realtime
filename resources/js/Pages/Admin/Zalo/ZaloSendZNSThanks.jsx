
import { Button, Card, Input, Checkbox, Typography, } from "@material-tailwind/react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import React, { useState } from 'react';

function Tab1() {
    // Xử lý logic cho Tab 1
    return (
        <div>
            <h2 className="text-2xl mb-4">Tab 1</h2>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Name" />
                        <Input size="lg" label="Email" />
                        <Input type="password" size="lg" label="Password" />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" fullWidth>
                        Register
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <a href="#" className="font-medium text-gray-900">
                            Sign In
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

function Tab2() {
    // Xử lý logic cho Tab 2
    return (
        <div>
            <h2 className="text-2xl mb-4">Tab 2</h2>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Name" />
                        <Input size="lg" label="Email" />
                        <Input type="password" size="lg" label="Password" />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" fullWidth>
                        Register
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <a href="#" className="font-medium text-gray-900">
                            Sign In
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}
function ZaloSendZNSThanks() {
    const [activeTab, setActiveTab] = useState(1);
    return (
        <AuthenticatedLayoutAdmin >
            <Head title="Gửi ZNS cảm ơn khách hàng" />
            <div className="min-h-screen flex-col mt-5" >
                <div className="row flex justify-center">
                    <div className="h-12">
                        <Button className=" mr-6" style={{ width: '200px' }} color="green" >Lấy token mới</Button>
                    </div>
                    <div className="border border-green-500 h-11 rounded-lg" style={{ width: '600px' }}>
                        <Input value={"9123j90354jdfs90234jsfd90238945jgdf9345jdfg9345jg90345jig9346j9456jyrt94jgrt903456jitg90u456j"} disabled />
                    </div>
                </div>
                <div className="row flex justify-center">
                    <div className="h-12">
                        <Button className="mr-6" style={{ width: '200px' }} color="orange" >Lấy token refresh</Button>
                    </div>
                    <div className="border border-orange-500 h-11 rounded-lg" style={{ width: '600px' }}>
                        <Input value={"9123j90354jdfs90234jsfd90238945jgdf9345jdfg9345jg90345jig9346j9456jyrt94jgrt903456jitg90u456j"} disabled />
                    </div>
                </div>
                <div className="container mx-auto mt-8">
                    <ul className="flex border-b">
                        <li className="-mb-px mr-1">
                            <button
                                className={`inline-block py-2 px-4 text-green-700 ${activeTab === 1
                                    ? 'border-gray border-l border-t border-r rounded-t bg-white '
                                    : 'border-white'
                                    }`}
                                onClick={() => setActiveTab(1)}
                            >
                                Gửi thông báo ZNS theo danh sách
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                                className={`inline-block py-2 px-4 text-green-500 ${activeTab === 2
                                    ? 'border-white bg-white '
                                    : 'border-white'
                                    }`}
                                onClick={() => setActiveTab(2)}
                            >
                                Gửi thông báo ZNS cho từng khách
                            </button>
                        </li>
                    </ul>
                    <div className="bg-white p-4 border border-t-0 rounded-b">
                        {activeTab === 1 ? <Tab1 /> : <Tab2 />}
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}
export default ZaloSendZNSThanks;