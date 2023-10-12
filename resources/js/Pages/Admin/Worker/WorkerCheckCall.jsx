import { React } from "react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { Input, Button } from "@material-tailwind/react";



function WorkerCheckCall() {


    return (
        <AuthenticatedLayoutAdmin >
            <Head title="Kiểm tra thợ gọi" />
            <div className="flex justify-center">
                <div className="col-2 m-auto">
                <p className="font-normal text-gray-900 text-lg">Thêm Dữ Liệu Cuộc Gọi Thợ:</p>
                </div>
                <div className="col-6 m-auto">
                    <Input labelProps={{ className: "hidden" }} type="file" accept=".xlsx, .xls" className="pl-0 border-none" />
                </div>
                <div className="col-4 m-auto">
                <Button className="m-6" fullWidth color="green" >Lưu Dữ Liệu </Button>
                </div>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

export default WorkerCheckCall;