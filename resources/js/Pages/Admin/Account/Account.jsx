import { React, useState, useEffect } from "react";
import {
    MagnifyingGlassIcon
  } from "@heroicons/react/24/outline";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
  } from "@material-tailwind/react";
import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head} from "@inertiajs/react";
import { host } from "@/Utils/UrlApi";
  const TABS = [
    {
      label: "Xây Dựng",
      value: "XD",
    },
    {
      label: "Điện Nước",
      value: "DN",
    },
    {
      label: "Điện Lạnh",
      value: "monitored",
    },
    {
      label: "Cơ Khí",
      value: "CK",
    },
    {
      label: "Đồ Gỗ",
      value: "DG",
    },
    {
      label: "NLMT",
      value: "NLMT",
    },
  ];
   
  const TABLE_HEAD = ["Tên Thợ", "Tài Khoản","Đăng Nhập Lần Cuối", "ID Điện Thoại", "Đăng Nhập Sai", "Trạng Thái","Sửa Tài Khoản",  "Đổi Mật Khẩu"];
   
   
  function Account() {
    const [accountData, setAccountData] = useState([]);
    const [test, setTest] = useState("");
    const handleClick = () => {
      console.log(accountData);
    };
    useEffect(() => {
      fetch(host + "api/web/worker-account")
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Error Status Network");
              }
              return response.json();
          })
          .then((data) => {
            setAccountData(data); 
          })
          .catch((error) => {
              console.error("Error API:", error);
          });
  }, []);
  console.log(accountData);
 
    return (
        <AuthenticatedLayoutAdmin >
      <Head title="Tài khoản thợ" />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader >
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} className="w-fit" >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className=" w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {/* {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )} */}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accountData.map(
                (item, index) => {
                  const isLast = index === accountData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={item.id_worker}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg" alt={item.id_worker} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              Không tìm thấy tên thợ
                            </Typography>                           
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal  "
                        >
                          {item.acc_worker}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.last_active != null ? item.last_active : "Chưa đăng nhập"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.device_key != null ? item.device_key : "Chưa đăng nhập"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal  "
                        >
                          {item.time_log}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max" onClick={handleClick}>                       
                          <Chip                      
                            variant="ghost"
                            size="sm"
                            value="Trạng thái"
                            color="green"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max" onClick={handleClick}>                       
                          <Chip                      
                            variant="ghost"
                            size="sm"
                            value="Sửa tài khoản"
                            color="deep-purple"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max" onClick={handleClick}>                       
                          <Chip                      
                            variant="ghost"
                            size="sm"
                            value="Xoá tài khoản"
                            color="red"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      </AuthenticatedLayoutAdmin>
    );
  }
  
export default Account;