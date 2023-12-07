import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Card,
    Typography,
    Avatar,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import {
    UsersIcon,
    BellAlertIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Box } from "@mui/material";
import useWindowSize from "@/Core/Resize";
import { Link } from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
const [rows,getData] = useState(['']);

const fetchDataDemo = async () => {
    try {
        
        const response = await fetch(host + 'api/posts');
        const jsonData = await response.json();
        console.log('111111111111111', jsonData);
        getData(jsonData);
        return jsonData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
// useEffect (()=>{
    fetchDataDemo();
// },[]);
// const rows = [
//     {
//         id: 1,
//         STT: 1,
//         PostName: 25,
//         Description: 1,
//         Picture: 25,
//         Author: 25,
//     },
// ];

const columns = [
    { field: "STT", headerName: "STT", width: 80, editable: false },
    {
        field: "PostName",
        headerName: "Tên Bài Viết",
        width: 450,
        align: "left",
        headerAlign: "left",
        editable: false,
    },
    {
        field: "Description",
        headerName: "Mô Tả",
        width: 700,
        align: "left",
        headerAlign: "left",
        editable: false,
    },
    {
        field: "Picture",
        headerName: "Hình Ảnh",
        width: 200,
        align: "left",
        headerAlign: "left",
        editable: false,
    },
    {
        field: "Author",
        headerName: "Tác Giả",
        width: 200,
        align: "left",
        headerAlign: "left",
        editable: false,
    },
    {
        field: "action",
        headerName: "Chức Năng",
        width: 180,
        editable: false,
        renderCell: (params) => {
            console.log(params);
            return (
                <div className="gap-1 p-2">
                    <Button
                        className="py-2 mr-1"
                        color="green"
                        variant="outlined"
                    >
                        Sửa
                    </Button>
                    <Button className="py-2" color="red" variant="outlined">
                        Xóa
                    </Button>
                </div>
            );
        },
    },
];

function PostList(auth) {

const hResize = useWindowSize();
const heightBoxPost = hResize.height - 30;
const widthBoxPost = hResize.width - 30;
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Post App - Công ty Thợ Việt" />
            <div className={`h-screen gap-2 p-2`}>
                <Card
                    className={`flex flex-row items-center justify-between m-2 text-center rounded-xl`}
                >
                    {/* <div className="h-8 px-0 py-0 w-72 "> */}
                    <Typography className="p-2 font-bold uppercase">
                        Post App - Công ty TNHH Dịch vụ kỹ thuật thợ việt
                    </Typography>
                    {/* </div> */}

                    <div className="flex flex-row justify-between">
                        <UsersIcon className="w-6 h-6 m-2" color="black" />
                        <BellAlertIcon className="w-6 h-6 m-2" color="black" />
                        <Avatar
                            src="https://cdn.chanhtuoi.com/uploads/2020/05/icon-facebook-08-2.jpg.webp"
                            alt="avatar"
                            size="xs"
                            className="p-1 m-2 border border-orange-500"
                        />
                    </div>
                </Card>
                <Card
                    className={`flex flex-row items-center justify-between m-2 px-2 text-center rounded-xl`}
                >
                    <Typography className="p-2 font-bold uppercase">
                        Danh Sách Bài Viết
                    </Typography>
                    <Tooltip content="Thêm Bài Viết">
                        <Link href={route("admin/create-post")}>
                            <PlusCircleIcon className="w-8 h-8 cursor-pointer" />
                        </Link>
                    </Tooltip>
                </Card>
                <Card className={` m-2 px-2 text-center rounded-xl`}>
                    <Box
                        sx={{
                            height: heightBoxPost,
                        }}
                    >
                        <DataGrid
                            sx={{
                                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
                                    {
                                        outline: "none !important",
                                    },
                                ".css-wop1k0-MuiDataGrid-footerContainer": {
                                    display: "none !important",
                                },
                            }}
                            autoHeight
                            rows={rows}
                            columns={columns}
                            hideFooterPagination={true}
                            rowHeight={40}
                            disableRowSelectionOnClick
                            // slots={{
                            //     columnHeaders: () => null,
                            // }}
                        />
                    </Box>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

export default PostList;
