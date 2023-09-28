import { Card, Typography } from "@material-tailwind/react";
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayoutAdmin';
import { Head } from '@inertiajs/react';
import React,{useEffect, useState} from 'react'

// const TABLE_HEAD = ["ID", "Tên nhân viên", "Email", "Thời gian online", "Tình trạng"];

// const TABLE_ROWS = [
//   {
//     id: "1",
//     name: "Mr Huy Lương",
//     email: "huy@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "2",
//     name: "Mr Thông Ngô",
//     email: "thongngo@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "3",
//     name: "Mr Hậu Nguyễn",
//     email: "haunguyen@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "4",
//     name: "Mr Hậu Phạm",
//     email: "haupham@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "5",
//     name: "Mr Thiện Phạm",
//     email: "thienpham@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "6",
//     name: "Ms Như Lương",
//     email: "nhuluong@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "7",
//     name: "Mr Kiệt Trịnh	",
//     email: "kiettrinh@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "8",
//     name: "Mr Tùng Phan",
//     email: "tungphan@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "9",
//     name: "Ms Yến Dương",
//     email: "yen@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "10",
//     name: "Ms Trang Lê",
//     email: "trangle@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "11",
//     name: "Mr Mạnh",
//     email: "tranmanh@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "12",
//     name: "Mr Thống",
//     email: "thongkieu@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "13",
//     name: "Ms Văn",
//     email: "van@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
//   {
//     id: "14",
//     name: "Mr Phú",
//     email: "nguyenphu@thoviet.com.vn",
//     time: "1 second ago",
//     status: "Online"
//   },
// ];

function Home({ auth }) {
  const [getData, usersData] = useState('');
  const fetchData = async () => {
    try {
        const response = await fetch("api/web/users");
        const jsonData = await response.json();
        if(response.ok)
        {
          usersData(jsonData);
          console.log(jsonData);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
useEffect(()=>{

  fetchData();
},[]);
const [isLoading, setIsLoading] = useState(true);
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Trang chủ Admin" />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              
                <th
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                  
                  </Typography>
                </th>
             
            </tr>
          </thead>
          <tbody>
            {getData.map(({ id, name, email, time, status }, index) => {
              const isLast = index === getData.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {time}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {status}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </AuthenticatedLayout>
  );
}
export default Home