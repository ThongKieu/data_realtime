import { React, useState, useEffect, createRef } from "react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Card,
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import {
    PlusCircleIcon,
    MapPinIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { host } from "@/Utils/UrlApi";
import useWindowSize from "@/Core/Resize";
function ManagerMedia({ auth }) {
    const { width, height } = useWindowSize(65);
    return (
        <AuthenticatedLayoutAdmin children={auth.user} user={auth.user}>
            <Head title="Quản Lý Hình Ảnh" />
            <div className={`p-1 h-[${height}]px`}>
                <Card className="text-center bg-green-400 rounded shadow-md">
                    <h2 className="w-full p-2 text-2xl font-bold text-white ">
                        Hình ảnh
                    </h2>
                </Card>
                <Box sx={{ height: { height }, width: 1 }}>
                    <Card className={`p-1 h-[${height}]px rounded-none`}>
                       <div className="w-32 h-32 border border-red-500">
                        {/* <p>{}</p> */}
                       {/* <img src={host+`assets`+`/`} alt=""className="w-32 h-32" /> */}
                       </div>
                    </Card>
                </Box>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

export default ManagerMedia;
