import React, { useRef, useState } from 'react';
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import * as XLSX from 'xlsx';

function DataCustomerImport() {
    const [excelData, setExcelData] = useState(null);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Lấy dữ liệu từ file Excel
            const firstSheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

            // Xử lý dữ liệu ở đây (ví dụ: lưu vào state của React)
            setExcelData(sheetData);
        };
        reader.readAsArrayBuffer(file);
    };
    // In giá trị file
    console.log(excelData + 'aaa');
    return (
        <AuthenticatedLayoutAdmin >
            <Head title="Thêm dữ liệu khách hàng" />
            <div className="min-h-screen flex justify-center mt-5">
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Thêm Dữ Liệu Của Khách Hàng
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Vui lòng chọn file để import.
                    </Typography>
                    <form className="mt-8 w-80 max-w-screen-lg sm:w-96">
                        <Input 
                            labelProps={{className:"hidden"}}
                            type="file"
                            accept=".xlsx, .xls"
                            className="border-none pl-0" // Sử dụng lớp CSS 'border-none' của Material Tailwind
                            onChange={handleFileUpload}
                        />
                        <Button className="mt-12" fullWidth color="green">
                            Lưu Dữ Liệu
                        </Button>
                    </form>
                </Card>
            </div>

        </AuthenticatedLayoutAdmin>
    );
}

export default DataCustomerImport;