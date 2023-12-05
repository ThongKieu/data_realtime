import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, Card, Spinner, Tooltip } from '@material-tailwind/react';
import {
  PlusCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import NavLink from '@/Components/NavLink';
import { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { host } from '@/Utils/UrlApi';

function Products({ auth }) {
  const [products, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fetchInfoQuote = async () => {
    try {
      const response = await fetch("/api/web/product");
      const jsonData = await response.json();

      setProduct(jsonData);

      if (jsonData.length > 0) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const columns = [
    { field: "code_product", headerName: "Mã SP", width: 150 },
    { field: "name_product", headerName: "Tên Sp", width: 350 },
    {
      field: "price_product", headerName: "Giá Mua", width: 200,
      renderCell: (params) => {
        const formatter = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",

        });
        return (
          <span className="text-center">
            {formatter.format(params.row.price_product)}
          </span>
        );
      },
    },
    {
      field: "sale_price_product", headerName: "Giá Bán Dự Kiến", width: 200,
      renderCell: (params) => {
        const formatter = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",

        });
        return (
          <span className="text-center">
            {formatter.format(params.row.sale_price_product)}
          </span>
        );
      },
    },
    { field: "provider_product", headerName: "Thông tin NCC", width: 250 },
    { field: "phone_product", headerName: "Số Liên hệ", width: 150 },
    {
      field: 'image_product', headerName: "Hình vật tư", width: 350,
      renderCell: (params) => {
        const [image_product, setImagesProduct] = useState([]);
        const data = params.row.image_product;
        const parts = data?.split(",");
        const filteredArray = parts?.filter(
          (item) => item.trim() !== ""
        );
        // useEffect(() => {
        //   const images = split(params.row.image_product,',');
        //   setImagesProduct(images);
        // }, [params.row.image_product,image_product]);
        //   console.log(image_product);
        return (
          <>
            <div className="flex flex-wrap">
              {filteredArray?.map((item, index) => (
                <img
                  key={index}
                  className="object-cover object-center w-[50px] p-1 rounded-lg shadow-xl"
                  src={`${host}${item}`}
                  alt="nature image"
                />
              ))}
            </div>
          </>
        );
      },
    },
    {
      field: '', headerName: "Xử Lý", width: 150,
      renderCell: (params) => {
        const formatter = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",

        });
        return (
          <Button variant="outlined" className="p-2 m-1" >
            <NavLink
            href={`product?id=${params.row.id}`}>
            <PencilIcon className="w-5 h-5">

          </PencilIcon>
            </NavLink>
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    fetchInfoQuote();
  }, []);
  return (
    <AuthenticatedLayout children={auth.user} user={auth.user}>
      <Head title="Trang thông tin sản phẩm" />
      <Card className="mt-2">
        <div className="grid m-2 pr-7 justify-items-stretch ">
          <div className="justify-self-end">
            <Tooltip content="Thêm Thợ Mới">
              <NavLink href={route('product')} className="font-normal">
                <PlusCircleIcon
                  className="w-10 h-10 pointer-events-auto"
                  color="#0056ffeb"
                />
              </NavLink>

            </Tooltip>
          </div>
        </div>
      </Card>
      <Card style={{ height: '100vh', width: '100%' }}>
        {isLoading ? (
          <div className="flex justify-center p-2 align-middle ">
            <Spinner className="w-6 h-6" color="amber" />
            <p className="pl-2 text-center text-black">
              Loading...
            </p>
          </div>
        ) : (
          <Box sx={{ height: 800, width: "100%" }} className="overflow-scroll">
            <DataGrid
              rows={products}
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
  )
}

export default Products
