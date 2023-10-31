import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,

} from "@material-tailwind/react";
import {
  UserGroupIcon, CircleStackIcon, DevicePhoneMobileIcon, ChatBubbleLeftRightIcon, WrenchIcon, HomeIcon, ChevronDoubleRightIcon, ChevronDownIcon, XMarkIcon, Bars3Icon
} from "@heroicons/react/24/solid";
import { Link } from '@inertiajs/react';

export function SidebarAdmin() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
    const sidebarStyles = isSidebarOpen
    ? 'w-64 transition-all duration-500 transform translate-x-0' // mở
    : 'w-0 transition-all duration-500 transform -translate-x-64'; // đóng
  return (
    <div>
      {isSidebarOpen === false ?
        (<div className={`h-full w-[4rem] pt-3  bg-white flex justify-center`}>
          <Bars3Icon className="cursor-pointer w-7 h-7" onClick={toggleSidebar} fill="black" />
        </div>)
        :
        (<Card className={`h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 block ${sidebarStyles}`}>
          <div className="flex p-4 mb-2">
            <Typography variant="h5" color="blue-gray" className="mr-5" >
              THỢ VIỆT
            </Typography>
            <div className="flex items-center justify-center ml-auto text-white bg-white rounded-full w-7 h-7">
              <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} fill="black" />
            </div>
          </div>
          <List>
            <ListItem>

              <ListItemPrefix>
                <HomeIcon className="w-5 h-5" />

              </ListItemPrefix>
              <Link href={route('admin')}>
                Admin
              </Link>
            </ListItem>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="p-3 border-b-0">
                  <ListItemPrefix>
                    <UserGroupIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Thợ
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link href={route("admin/worker-check-call")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Kiểm Tra Liên Hệ
                    </ListItem>
                  </Link>
                  <Link href={route("admin/worker-list")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Danh Sách Thợ
                    </ListItem>
                  </Link>
                  <Link href={route("admin/worker-account")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Tài Khoản App
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)} className="p-3 border-b-0">
                  <ListItemPrefix>
                    <CircleStackIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Thêm Dữ Liệu
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link href={route("admin/data-import-customer")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Thêm Dữ Liệu Khách
                    </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Xuất Dữ Liệu Khách
                  </ListItem>
                  <Link href={route("admin/data-import-worker")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Thêm Dữ Liệu Thợ
                    </ListItem>
                  </Link>
                  <Link href={route("admin/data-import-price")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Thêm Bảng Giá
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)} className="p-3 border-b-0">
                  <ListItemPrefix>
                    <DevicePhoneMobileIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Ứng Dụng
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link href={route("admin/application-popup")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Popup Chương Trình Khuyến Mãi
                    </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    QR Code
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Banner
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Bảng Giá
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Bài Viết
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Danh Sách Công Việc
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 4}>
                <AccordionHeader onClick={() => handleOpen(4)} className="p-3 border-b-0">
                  <ListItemPrefix>
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Zalo
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link href={route("admin/zalo-zns-thanks")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Gửi ZNS Cảm Ơn
                    </ListItem>
                  </Link>
                  <Link href={route("admin/zalo-zns-quotes")}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Gửi ZNS Báo Giá
                    </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Gửi ZNS Báo Giá Sau 15 Ngày
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 5 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 5}>
                <AccordionHeader onClick={() => handleOpen(5)} className="p-3 border-b-0">
                  <ListItemPrefix>
                    <WrenchIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Công Cụ
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Chặn Số
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Kiểm Kê
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </List>
        </Card>)}

    </div>

  );
}
export default SidebarAdmin;
