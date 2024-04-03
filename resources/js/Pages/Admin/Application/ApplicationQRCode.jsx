import { React, useState, useRef } from 'react'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayoutAdmin'
import { Head } from '@inertiajs/react'
import { Button, Card, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'
// import  from 'react'
import QRCode from 'react-qr-code';
import * as htmlToImage from 'html-to-image';

function ApplicationQRCode() {
    const [inputData, setInputData] = useState('');
    // Khai báo state để lưu trữ dữ liệu QR code
    const [qrData, setQrData] = useState('https://thoviet.com.vn');


    // Hàm xử lý sự kiện khi người dùng nhấn vào nút "Tạo"
    const handleGenerateQRCode = () => {
        // Sử dụng dữ liệu từ input để cập nhật trạng thái của component
        setQrData(inputData);
    };

    return (
        <Authenticated>
            <Head title="Tạo QR Code" />
            <div className={`h-screen gap-2 p-1`}>
                <Card className="w-full h-full">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="p-2 text-center border rounded-lg bg-cyan-400 border-deep-orange-300">
                        <Typography
                            className="text-lg font-extrabold text-white"
                        >
                            Tạo QR Code
                        </Typography>
                    </CardHeader>
                    <div className='grid grid-cols-3 gap-1'>
                        <Card className='m-2 border rounded-xl border-cyan-300'>
                            <CardHeader
                                floated={false}
                                shadow={false}
                            >
                                <Typography
                                    className="text-lg font-extrabold text-center"
                                >
                                    Chọn thông tin cần tạo QR code
                                </Typography>
                                <div className='p-1 '>
                                    <Input value={inputData} onChange={(e) => setInputData(e.target.value)} className='shadow-none' />
                                    <Button className='m-1' onClick={handleGenerateQRCode}>Tạo</Button>
                                </div>
                            </CardHeader>

                        </Card>
                        <Card className='col-span-2 m-2 border rounded-xl border-cyan-300'>
                            {qrData && (
                                <Card>

                                    <div className='h-[500]px p-2 flex justify-center'>
                                        <QRCode
                                            value={qrData}
                                            size={720}
                                            level="M"
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                        />
                                    </div>
                                </Card>
                            )}
                        </Card>
                    </div>
                </Card>
            </div>


        </Authenticated>
    )
}

export default ApplicationQRCode
