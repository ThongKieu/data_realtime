import React from 'react';
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

function DataPriceImport() {
    return (
        <AuthenticatedLayoutAdmin >
            <Head title="Thêm dữ liệu bảng giá" />
            <div className="min-h-screen flex justify-center mt-5">
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Thêm Dữ Liệu Bảng Giá
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Vui lòng chọn file để import.
                    </Typography>
                    <form className="mt-8 w-80 max-w-screen-lg sm:w-96">
                        <div className=" flex flex-col gap-6">
                            <Button variant="outlined" className="flex items-center justify-center gap-3" color="blue-gray" >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"                                    
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                                Upload Files
                            </Button>
                        </div>
                        <Typography color="gray" className="mt-1 font-normal">
                            Không có tệp nào được chọn?
                        </Typography>
                        <Button className="mt-8" fullWidth color="green">
                            Lưu Dữ Liệu
                        </Button>
                    </form>
                </Card>
            </div>

        </AuthenticatedLayoutAdmin>
    );
}

export default DataPriceImport;