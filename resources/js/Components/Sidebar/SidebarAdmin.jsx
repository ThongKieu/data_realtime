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
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const sidebarStyles = isSidebarOpen
    ? 'w-64 transition-all duration-300 transform translate-x-0' // mở
    : 'w-0 transition-all duration-300 transform -translate-x-64'; // đóng


  return (
    <div>
      {isSidebarOpen === false ?
        (<div className={`h-full w-[4rem] pt-3  bg-white flex justify-center`}>
          <Bars3Icon className="w-7 h-7" onClick={toggleSidebar} fill="black" />
        </div>)
        :
        (<Card className={`h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 block ${sidebarStyles}`}>
          <div className="mb-2 p-4 flex">
            <Typography variant="h5" color="blue-gray" className="mr-5" >
              THỢ VIỆT
            </Typography>
            <div className="w-7 h-7 rounded-full bg-white text-white flex items-center justify-center ml-auto">
              <XMarkIcon className="w-6 h-6" onClick={toggleSidebar} fill="black" />
            </div>
          </div>
          <List>
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Admin
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
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <UserGroupIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Thợ
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Kiểm Tra Liên Hệ
                  </ListItem>
                  <Link
                    href={route("admin/worker-list")}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Danh Sách Thợ
                    </ListItem>
                  </Link>
                  <Link
                    href={route("admin/worker-account")}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
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
                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <CircleStackIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Thêm Dữ Liệu
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link href={route("admin/data-customer-import")}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Thêm Dữ Liệu Khách
                  </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Xuất Dữ Liệu Khách
                  </ListItem>
                  <Link href={route("admin/data-worker-import")}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Thêm Dữ Liệu Thợ
                  </ListItem>
                  </Link>
                  <Link href={route("admin/data-price-import")}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
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
                <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <DevicePhoneMobileIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Ứng Dụng
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                <Link href={route("admin/popup-discount")}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Popup Chương Trình Khuyến Mãi
                  </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    QR Code
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Banner
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Bảng Giá
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Bài Viết
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
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
                <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Zalo
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Gửi ZNS Cảm Ơn
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Gửi ZNS Báo Giá
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
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
                <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <WrenchIcon className="h-5 w-5" />
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
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Chặn Số
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronDoubleRightIcon strokeWidth={3} className="h-3 w-5" />
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