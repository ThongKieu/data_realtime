import React from "react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import { Card, Typography } from "@material-tailwind/react";
import { Box, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function ToolsAdminBlockSDT() {
    const column = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          editable: true,
          align: 'left',
          headerAlign: 'left',
        },
        {
          field: 'dateCreated',
          headerName: 'Date Created',
          type: 'date',
          width: 180,
          editable: true,
        },
        {
          field: 'lastLogin',
          headerName: 'Last Login',
          type: 'dateTime',
          width: 220,
          editable: true,
        },
      ];

      const row = [
        {
          id: 1,
          name: 1,
          age: 25,
        },
        {
          id: 2,
          name: 1,
          age: 36,
        },
        {
          id: 3,
          name: 1,
          age: 19,
        },
        {
          id: 4,
          name: 1,
          age: 28,
        },
        {
          id: 5,
          name: 1,
          age: 23,
        },
      ];
    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Danh Sách Chặn Số Điện Thoại" />
            <div className="flex justify-center h-full p-2">
                <Card className="flex flex-row w-full h-full m-auto bg-white">
                    <Card className="border border-blue-500 rounded w-[60%]">
                        <Typography className="p-2 font-bold text-center text-white bg-gray-500">
                            Danh Sách Liên Hệ Chặn
                        </Typography>
                        <Divider className="w-full" />
                        <Box>
                            <DataGrid rows={row} columns={column} />
                        </Box>
                    </Card>
                    <Card className="border  w-[40%] border-blue-500 rounded">
                        <Typography className="p-2 font-bold text-center text-white bg-gray-500">
                            Thêm số mới
                        </Typography>
                        <Divider className="w-full" />
                    </Card>
                </Card>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}
export default ToolsAdminBlockSDT;
