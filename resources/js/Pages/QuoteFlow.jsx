import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';
import { Card, Typography, Input, Button, Spinner, Select, Option } from "@material-tailwind/react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function QuoteFlow({ auth }) {

  const [isLoading, setIsLoading] = useState(true);

  const [infoBook, setInfoBook] = useState('');

  const [adminUser, setAdminUser] = useState([]);
  const [nameAdmin, setNameAdmin] = useState('Chưa có');


  const fetchAdminUser = async () => {
    try {
      const response = await fetch("/api/web/users");
      const jsonData = await response.json();
      setAdminUser(jsonData.users);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
  useEffect(() => { fetchInfoQuote(), fetchAdminUser() }, []);
  const getRowClassName = (params) => {
    return 'centered-row';
  };
  const  [selectAmin, setSelectAmin]= useState('0');
  const pushAdmin= (event)=>{
    setSelectAmin(event.target.value);
  };
  // const  = infoBook;
  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'work_content',
      headerName: 'Nội dung công việc',
      width: 250,
      editable: true,
    },
    {
      field: 'date_book',
      headerName: 'Ngày Đăng ký',
      width: 100,
      editable: true,
    },
    {
      field: 'add',
      headerName: 'Địa chỉ',
      type: 'number',
      width: 210,
      editable: false,
      sortable: false,
      valueGetter: (params) =>
        `${params.row.street || ''} ${params.row.district || ''}`,
    },
    {
      field: 'name',
      headerName: 'Ng Khởi tạo',
      description: 'Nhân Viên Tạo Báo giá',
      type: 'number',
      width: 110,
      editable: false,

    },
    {
      field: 'staff_in_change_id',
      headerName: 'Ng Xử Lý',
      description: 'Nhân Viên đang phụ trách',
      sortable: false,
      width: 210,
      renderCell: ((params) => {
        if (adminUser && params.row.staff_in_change_id != null) {
          adminUser.forEach((item, index) => {
            if (params.row.staff_in_change_id == item.id) {
              setNameAdmin(item.name);

            }
          });

        }


        return <p className='bg-blue-gray-500'>{params.row.staff_in_change_id === null ? (
          <select
            className="border border-lg w-full "
            value={selectAmin}
            onChange={pushAdmin}
          >
            <option> Chưa Chọn </option>
            {adminUser.map(
              (nam, index) => (
                <option
                  key={index}
                  value={
                    nam.id
                  }
                  className='w-full'
                >
                  {nam.name}
                </option>
              )
            )}
          </select>

        ) : (
          <p>{nameAdmin}</p>
        )} </p>
      }),
    },
    {
      field: 'total',
      headerName: 'Tổng báo giá',
      description: 'Tổng báo giá',
      width: 150,
      editable: false,

    },

    {
      field: 'pripot_percent',
      headerName: '% Lợi Nhuận',
      description: '% Lợi Nhuận',
      width: 150,
      editable: false,

    },
    {
      field: 'date_do',
      headerName: 'Ngày Làm',
      description: 'Ngày Làm',
      width: 150,
      editable: false,

    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      description: 'Thông tin trạng thái lịch báo giá',
      width: 200,
      editable: false,
      renderCell: ((params) => {
        switch (params.row.status) {
          case 0:
            return <span style={{ background: 'red',fontWeight: '600',padding:'3px' }}>Chưa Xử Lý</span>;
          case 1:
            return <span style={{ background: 'blue',fontWeight: '600',padding:'3px',color:'white' }}>Chưa liên hệ được khách</span>;
          case 2:
            return <span style={{ background: 'green',fontWeight: '600',padding:'3px' }}>Đã Gửi Báo Giá</span>;
          case 3:
            return <span style={{ background: 'yellowgreen',fontWeight: '600',padding:'3px' }}>Đã Hẹn Ngày Làm</span>;
          case 4:
            return <span style={{ background: 'gold',fontWeight: '600',padding:'3px' }}>Khách Chưa Phản Hồi</span>;
          case 5:
            return <span style={{ background: 'red' ,fontWeight: '600',padding:'3px'}}>Khách Không Chốt</span>;
          case 6:
            return <span style={{ background: 'orange' ,fontWeight: '600',padding:'3px'}}>Thợ Không Làm Được</span>;
          case 7:
            return <span style={{ background: 'gold',fontWeight: '600',padding:'3px' }}>Thợ Tự Gửi</span>;
          case 8:
            return <span style={{ background: 'red' ,fontWeight: '600',padding:'3px'}}>Chưa Cham Soc</span>;
          case 9:
            return <span style={{ background: 'yellowgreen' ,fontWeight: '600',padding:'3px'}}>Đã Chăm Sóc</span>;
          default:
            return params.row.status;
        }
      }),
    },
  ];

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Thông tin báo giá lịch" />
      <Card className={
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
          <Box sx={{ height: 800, width: '100%' }}>
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
              getRowClassName={getRowClassName}
              pageSizeOptions={[30]}
              // checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </Card>

    </AuthenticatedLayout>

  )
}

export default QuoteFlow
