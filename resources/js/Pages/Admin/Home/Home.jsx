import { Card, Typography } from "@material-tailwind/react";
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayoutAdmin';
import { Head } from '@inertiajs/react';
import React,{useEffect, useState} from 'react'
import { TableRow } from "@mui/material";
import { host } from "@/utils/UrlApi";

const TABLE_HEAD = ["ID", "Tên nhân viên", "Email", "Thời gian online", "Tình trạng"];

const TABLE_ROWS = [
  {
    id: "1",
    name: "Mr Huy Lương",
    email: "huy@thoviet.com.vn",
    time: "1 second ago",
    status: "Online"
  },

];

function Home({ auth }) {
    useEffect(()=>{
        fetchData();
      },[]);
  const [getData, usersData] = useState('');
  const fetchData = async () => {
    try {
        const response = await fetch(host+"api/web/users");
        const jsonData = await response.json();
        if(response.ok)
        {
          usersData(jsonData.users);
          setIsLoading(false);
          console.log(jsonData);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


console.log('sdsdas',getData);
const [isLoading, setIsLoading] = useState(true);
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Trang chủ Admin" />
      <Card> <h1 className="text-center font-medium">Công ty TNHH Dịch Vụ Kỹ Thuật Thợ Việt</h1>
      <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
        <div class="col-span-2">01</div>
        <div ><Card className="w-full h-full overflow-scroll">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                  {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
                        <div className="flex justify-center p-2 align-middle ">
                            {/* <Spinner className="w-6 h-6" color="amber" /> */}
                            <p className="pl-2 text-center text-black">
                                Loading...
                            </p>
                        </div>
                    ) : (getData.map(({ id, name, email, time, status }, index) => {
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
            }))}
          </tbody>
        </table>
      </Card></div>
        
      </div>
      </Card>
      
    </AuthenticatedLayout>
  );
}
export default Home
