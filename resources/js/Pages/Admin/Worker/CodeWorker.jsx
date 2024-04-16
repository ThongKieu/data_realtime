import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";

import { Head } from '@inertiajs/react';
import React from 'react';
import {
    PlusCircleIcon

} from "@heroicons/react/24/solid";
import Card from "@material-tailwind/react";
function CodeWorker() {
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Tài khoản thợ" />
            <div className="p-1">
                <Card></Card>
            </div>
        </AuthenticatedLayoutAdmin>
    )
}

export default CodeWorker