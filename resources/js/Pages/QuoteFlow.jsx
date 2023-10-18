import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Card,
    Typography,
    Input,
    Button,
    Spinner,
    Select,
    Option,
} from "@material-tailwind/react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { set } from "date-fns";

function QuoteFlow({ auth }) {
    const [isLoading, setIsLoading] = useState(true);

    const [infoBook, setInfoBook] = useState("");

    const [adminUser, setAdminUser] = useState("");

    const fetchAdminUser = async () => {
        try {
            const response = await fetch("/api/web/users");
            const jsonData = await response.json();
            setAdminUser(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log("dasd1111a", adminUser);
    const fetchInfoQuote = async () => {
        try {
            const response = await fetch("/api/web/quote");
            const jsonData = await response.json();

            setInfoBook(jsonData);

            if (jsonData.length > 0) {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchInfoQuote(), fetchAdminUser();
    }, []);
    // const  = infoBook;
    const columns = [
        { field: "id", headerName: "ID", width: 30 },
        {
            field: "work_content",
            headerName: "Nội dung công việc",
            width: 250,
            editable: true,
        },
        {
            field: "date_book",
            headerName: "Ngày Đăng ký",
            width: 100,
            editable: true,
        },
        {
            field: "add",
            headerName: "Địa chỉ",
            type: "number",
            width: 210,
            editable: false,
            sortable: false,
            valueGetter: (params) =>
                `${params.row.street || ""} ${params.row.district || ""}`,
        },
        {
            field: "name",
            headerName: "Ng Khởi tạo",
            description: "Nhân Viên Tạo Báo giá",
            type: "number",
            width: 110,
            editable: false,
        },
        {
            field: "staff_in_change_id",
            headerName: "Ng Xử Lý",
            description: "Nhân Viên đang phụ trách",
            sortable: false,
            width: 110,
            renderCell: (params) => {
                const [nameAdmin, setNameAdmin] = useState("Chưa Có");
                const asss = adminUser.users;
                console.log('assss',asss);
                useEffect(() => {
                    if (params.row.staff_in_change_id !== null) {
                        const matchedUser = asss?.find(
                            (user) => user.id == params.row.staff_in_change_id
                        );
                        if (matchedUser) {
                            setNameAdmin("dsadadas111");
                        }
                    }
                }, [params.row.staff_in_change_id, asss]);

                return (
                    <p>
                        {params.row.staff_in_change_id === null ? (
                            <Select>
                                {asss.map((item) => {
                                    <Option>{item.name}</Option>;
                                })}
                            </Select>
                        ) : (
                            <p>{nameAdmin}</p>
                        )}
                    </p>
                );
            },
        },
    ];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Thông tin báo giá lịch" />
            <Card
                className={
                    "grid w-full grid-flow-col mt-1 text-white rounded-none"
                }
            >
                {isLoading ? (
                    <div className="flex justify-center p-2 align-middle ">
                        <Spinner className="w-6 h-6" color="amber" />
                        <p className="pl-2 text-center text-black">
                            Loading...
                        </p>
                    </div>
                ) : (
                    <Box sx={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={infoBook}
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
                )}
            </Card>
        </AuthenticatedLayout>
    );
}

export default QuoteFlow;
