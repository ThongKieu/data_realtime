import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FloatingButton from '@/Components/Navbar/FloatingButton';
import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
    IconButton,
    Typography,
    Card
} from "@material-tailwind/react";
import {
    TrashIcon, PaintBrushIcon, PaperAirplaneIcon

} from "@heroicons/react/24/outline";
const TABLE_HEAD = ["Yêu Cầu Công Việc", "Địa Chỉ", "Quận", "Số Điện Thoại", "Thợ", "Hình Ảnh", "Chức Năng"];
const TABLE_HEAD_RIGHT = ["Nội Dung Công Việc", "BH", "Địa Chỉ KH", "KV", "Thanh Toán", "SDT", "KTV", "Chi", "Thu", "Số Phiếu Thu", "Chức Năng"];

export default function Distrist({ auth }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Trang quản lý quận" />
            <div className={'  grid w-full  grid-flow-col overflow-scroll auto-cols-max mt-1'}>
                <Card className={'  grid w-full  grid-flow-col overflow-scroll auto-cols-max mt-1'} >
                    {/* bang ben trai  */}

                </Card>

            </div>
            <div className='fixed bottom-2 right-2'>
                <FloatingButton />
            </div>
        </AuthenticatedLayout>
    );
}
