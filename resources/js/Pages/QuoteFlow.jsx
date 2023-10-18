import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Card,
    Typography,
    Input,
    Button,
    Spinner,
} from "@material-tailwind/react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function QuoteFlow({ auth }) {
    const [isLoading, setIsLoading] = useState(true);
    const rows = [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35, age2: 35 },
    ];
    const [infoBook, setInfoBook] = useState(rows);

    const columns = [
        { field: "id", headerName: "ID", width: 30 },
        {
            field: "firstName",
            headerName: "Nội dung công việc",
            width: 250,
            editable: true,
        },
        {
            field: "lastName",
            headerName: "Ngày Đăng ký",
            width: 150,
            editable: true,
        },
        {
            field: "age",
            headerName: "Tên khách",
            type: "number",
            width: 110,
            editable: true,
        },
        {
            field: "age2",
            headerName: "Địa chỉ",
            type: "number",
            width: 250,
            editable: true,
        },
        {
            field: "fullName",
            headerName: "Địa chỉ",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ""} ${params.row.lastName || ""}`,
        },
    ];
    const fetchInfoQuote = async () => {
        try {
            const response = await fetch("/api/web/quote");
            const jsonData = await response.json();

            setInfoBook(jsonData);
            console.log("685464646", jsonData);
            if (jsonData.lenght > 0) {
                setIsLoading(false);
                console.log("685464646", jsonData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchInfoQuote();
    }, []);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Thông tin báo giá lịch" />
            <Card
                className={
                    "grid w-full grid-flow-col mt-1 text-white rounded-none"
                }
            >
                {/* {isLoading ? (
                        <div className="flex justify-center p-2 align-middle ">
                            <Spinner className="w-6 h-6" color="amber" />
                            <p className="pl-2 text-center text-black">
                                Loading...
                            </p>
                        </div>
                    ) : ( */}
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 30,
                                },
                            },
                        }}
                        pageSizeOptions={[30]}
                        // checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
                {/* )} */}
            </Card>
        </AuthenticatedLayout>
    );
}

export default QuoteFlow;
