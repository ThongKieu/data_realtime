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
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Tooltip,
  Radio,
} from "@material-tailwind/react";
import { Box, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  TrashIcon,
  PencilIcon,
  ArrowPathIcon,
  UserPlusIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
  TicketIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function QuoteFlow({ auth }) {
  const [isLoading, setIsLoading] = useState(true);

  const [infoBook, setInfoBook] = useState("");

  const [adminUser, setAdminUser] = useState([]);

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
  const fetchUpdateData = async (data, url) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // socketD?.emit("addWorkTo_Server", data);
        return res;

      } else {
        console.error("Lỗi khi gửi dữ liệu:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching data lỗi rồi:", error);
    }
  };
  useEffect(() => {
    fetchInfoQuote(), fetchAdminUser();
  }, []);
  const getRowClassName = (params) => {
    return "centered-row";
  };
  const [selectAdmin, setSelectAdmin] = useState("0");
  const handleChangeSelectAdmin = (e) => {
    const selectedValue = e.target.value;
    setSelectAdmin(selectedValue);
  };
  // const  = infoBook;
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "work_content",
      headerName: "Nội dung công việc",
      minWidth: 400,
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
      width: 210,
      renderCell: (params) => {
        const [nameAdmin, setNameAdmin] = useState();

        useEffect(() => {
          if (adminUser && params.row.staff_in_change_id !== null) {
            adminUser.forEach((item, index) => {
              if (params.row.staff_in_change_id == item.id) {
                setNameAdmin(item.name);
              }
            });
          }
        }, [adminUser, params.row.staff_in_change_id]);
        return (
          <p className="bg-blue-gray-500 sr-onlyg">
            {params.row.staff_in_change_id === null ? (
              <select
                className="w-full border border-lg "
                defaultValue={selectAdmin}
                onChange={handleChangeSelectAdmin}
              >
                <option>Chưa Chọn</option>
                {adminUser.map((nam, index) => (
                  <option
                    key={index}
                    value={nam.id}
                    className="w-full"
                  >
                    {nam.name}
                  </option>
                ))}
              </select>
            ) : (
              <p>{nameAdmin}</p>
            )}
          </p>
        );
      },
    },
    {
      field: "total",
      headerName: "Tổng báo giá",
      description: "Tổng báo giá",
      width: 150,
      editable: false,
      renderCell:(params)=>{
        const formatter = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          
      });
      return (
        <span className="text-center">
            {formatter.format(params.row.total)}
        </span>
    );
      },
    },
    {
      field: "expense",
      headerName: "Tổng báo giá",
      description: "Tổng báo giá",
      width: 150,
      editable: false,
      renderCell:(params)=>{
        const formatter = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          
      });
      return (
        <span className="text-center">
            {formatter.format(params.row.expense)}
        </span>
    );
      },
    },
    {
      field: "pripot_percent",
      headerName: "% Lợi Nhuận",
      description: "% Lợi Nhuận",
      width: 150,
      editable: false,
      renderCell:(params)=>{
      
      return (
        <span className="text-center">
            {params.row.pripot_percent} %
        </span>
    );
      },
    },
    {
      field: "date_do",
      headerName: "Ngày Làm",
      description: "Ngày Làm",
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      description: "Thông tin trạng thái lịch báo giá",
      width: 200,
      editable: false,
      renderCell: (params) => {
        switch (params.row.status) {
          case 0:
            return (
              <span
                style={{
                  background: "red",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Chưa Xử Lý
              </span>
            );
          case 1:
            return (
              <span
                style={{
                  background: "blue",
                  fontWeight: "600",
                  padding: "3px",
                  color: "white",
                }}
              >
                Chưa liên hệ được khách
              </span>
            );
          case 2:
            return (
              <span
                style={{
                  background: "green",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Đã Gửi Báo Giá
              </span>
            );
          case 3:
            return (
              <span
                style={{
                  background: "yellowgreen",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Đã Hẹn Ngày Làm
              </span>
            );
          case 4:
            return (
              <span
                style={{
                  background: "gold",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Khách Chưa Phản Hồi
              </span>
            );
          case 5:
            return (
              <span
                style={{
                  background: "red",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Khách Không Chốt
              </span>
            );
          case 6:
            return (
              <span
                style={{
                  background: "orange",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Thợ Không Làm Được
              </span>
            );
          case 7:
            return (
              <span
                style={{
                  background: "gold",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Thợ Tự Gửi
              </span>
            );
          case 8:
            return (
              <span
                style={{
                  background: "red",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Khách đã chốt ngày làm
              </span>
            );
          case 9:
            return (
              <span
                style={{
                  background: "yellowgreen",
                  fontWeight: "600",
                  padding: "3px",
                }}
              >
                Đã Chăm Sóc
              </span>
            );
          default:
            return params.row.status;
        }
      },
    },
    {

      field: null,
      headerName: "Xử Lý",
      description: "Chọn Phương Án",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const [isChecked, setIsChecked] = useState(false);
        const [isCheckedVal, setIsCheckedVal] = useState('');

        const [open, setOpen] = React.useState(false);
        const handleOpenChangeStatus = () => setOpen(!open);

        const [openAdmin, setOpenAdmin] = React.useState(false);
        const handleOpenSetAdmin = () => setOpenAdmin(!openAdmin);

        const [openThuChi, setOpenThuChi] = React.useState(false);
        const handleOpenSetThuChi = () => setOpenThuChi(!openThuChi);

        const [statusChange, setStatusChange] = useState('');
        const handlePushChangeStatus = (e) => {
          console.log(e.target.value);
          const { name, value } = e.target;
          setStatusChange((prevData) => ({
            ...prevData,
            [name]: value,

          }));
          if (e.target.value == 8) {
            setIsChecked(true);

            console.log('1', isChecked);
          } else {
            setIsChecked(false);
            setIsCheckedVal('')
          }
        };
        const handleOnChangeValDate = (e) => {
          setIsCheckedVal(e.target.value);
        };
        //change status
        const onClickHandle = async () => {
          const url = 'api/web/quote/update';
          const data =
          {
            ...statusChange,
            id: params.row.id,
            ac: 0,
            auth_id: auth.user.id,
            date_do: isCheckedVal,
          }
          if (!data.status_change) {
            alert('Vui lòng chọn thay đổi thông tin');
          }
          const cc = await fetchUpdateData(data, url);
          // console.log('11111111111111111', cc);
          if (cc.status === 200) {
            handleOpenChangeStatus();
            fetchInfoQuote();
            setIsChecked(false);
            setStatusChange('');
          }
          else {
            alert('Vui lòng kiểm tra lại thông tin!!!!!!!!!!!!!!!');
          }
        };
        //change admin
        const onClickHandleAdmin = async () => {
          const url = 'api/web/quote/update';
          const data =
          {
            ad_min: selectAdmin,
            id: params.row.id,
            ac: 1,
            auth_id: auth.user.id,
          }


          const cc = await fetchUpdateData(data, url);

          if (cc.status === 200) {
            handleOpenSetAdmin();
            fetchInfoQuote();
          }
          else {
            alert('Vui lòng kiểm tra lại thông tin!!!!!!!!!!!!!!!');
          }
        };
        //change thu chi
        const onClickHandleThuChi = async () => {
          const url = 'api/web/quote/update';
          const data =
          {
            tien_thu: setTienThu,
            tien_chi: setTienChi,
            loi_nhuan: setLoiNhuan,
            id: params.row.id,
            ac: 2,
            auth_id: auth.user.id,
          }


          const cc = await fetchUpdateData(data, url);

          if (cc.status === 200) {
            handleOpenSetThuChi();
            fetchInfoQuote();
          }
          else {
            alert('Vui lòng kiểm tra lại thông tin!!!!!!!!!!!!!!!');
          }
        };

        const [setTienThu, setInputThu] = useState('');
        const onChangeTienThu = (e) => {
          setInputThu(e.target.value);


        };
        const [setTienChi, setInputChi] = useState(1);
        const onChangeTienChi = (e) => {
          setInputChi(e.target.value);


        };
        useEffect(() => {
          loi_nhuan();
        }, [setTienChi, setTienThu]);
        const [setLoiNhuan, getLoiNhuan] = useState('');
        const loi_nhuan = () => {
          if (setTienChi != null && setTienThu != null && setTienThu !== 0) {
            const bien = ((setTienThu - setTienChi) / setTienThu) * 100;
            getLoiNhuan(bien);
          }
        };

        return (
          <>
            <Tooltip className='w-[200px] h-auto' content='Thay đổi trạng thái'>
              <Button onClick={handleOpenChangeStatus} variant="outlined" className="p-2 m-1" >
                <PencilIcon className="w-5 h-5">

                </PencilIcon>
              </Button>
            </Tooltip>
            <Dialog open={open} handler={handleOpenChangeStatus}>
              <DialogHeader className="justify-center">Thay đổi trạng thái</DialogHeader>
              <Divider />
              <DialogBody>
                <div className="grid grid-cols-2 gap-2" id="status_change"  >
                  <Radio name="status_change" label="Chưa Xử Lý" defaultChecked value={0} onChange={handlePushChangeStatus} />
                  <Radio name="status_change" label="Khách Chưa Phản Hồi" value={1} onChange={handlePushChangeStatus} />
                  <Radio name="status_change" label="Chưa liên hệ được khách" value={2} onChange={handlePushChangeStatus} />
                  <Radio name="status_change" label="Khách Không Chốt" value={3} onChange={handlePushChangeStatus} />
                  <Radio name="status_change" label="Đã Gửi Báo Giá" value={4} onChange={handlePushChangeStatus} />
                  <Radio name="status_change" label="Thợ Không Làm Được" value={5} onChange={handlePushChangeStatus} />
                  <Radio name="status_change" label="Thợ Đã Gửi Báo Giá" value={6} onChange={handlePushChangeStatus} />
                  <Radio name="status_change" label="Đã Gửi Thợ Báo Giá Lại" value={7} onChange={handlePushChangeStatus} />
                  <Radio name="status_change" id="check_thifa-stack-2x" label="Khách Chốt Ngày làm" value={8} onChange={handlePushChangeStatus} />

                  <Input type="date" name='date_check' id="date_check" className={`${isChecked == true ? `block` : `hidden shadow-none `}`} labelProps={{ className: 'hidden' }} onChange={handleOnChangeValDate} value={isCheckedVal} />

                </div>

              </DialogBody>
              <Divider />
              <DialogFooter>
                <Button variant="gradient" color="green" onClick={onClickHandle} >
                  <span>Confirm</span>
                </Button>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpenChangeStatus}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
              </DialogFooter>
            </Dialog>
            <Tooltip className='w-[200px] h-auto' content='Thay Đổi Nhân Sự Báo Giá'>
              <Button onClick={handleOpenSetAdmin} variant="outlined" color="green" className="p-2 m-1">
                <UserPlusIcon className="w-5 h-5">

                </UserPlusIcon>
              </Button>
            </Tooltip>
            <Dialog open={openAdmin} handler={handleOpenSetAdmin}>
              <DialogHeader>Its a simple dialog.</DialogHeader>
              <DialogBody>
                <select
                  className="w-full border border-lg "
                  defaultValue={selectAdmin}
                  onChange={handleChangeSelectAdmin}
                >
                  <option>Chưa Chọn</option>
                  {adminUser.map((nam, index) => (
                    <option
                      key={index}
                      value={nam.id}
                      className="w-full"
                    >
                      {nam.name}
                    </option>
                  ))}
                </select>
              </DialogBody>
              <DialogFooter>
                <Button variant="gradient" color="green" onClick={onClickHandleAdmin}>
                  <span>Lưu</span>
                </Button>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpenSetAdmin}
                  className="mr-1"
                >
                  <span>Hủy</span>
                </Button>

              </DialogFooter>
            </Dialog>
            {/* thu chi */}
            <Tooltip className='w-[200px] h-auto' content='Nhập Thông Tin Báo Giá'>
              <Button onClick={handleOpenSetThuChi} variant="outlined" color="green" className="p-2 m-1">
                <UserPlusIcon className="w-5 h-5">

                </UserPlusIcon>
              </Button>
            </Tooltip>
            <Dialog open={openThuChi} handler={handleOpenSetThuChi} size="lg">
              <DialogHeader className="justify-center">Nhập thông tin báo giá</DialogHeader>
              <Divider></Divider>
              <DialogBody className="grid grid-cols-3 gap-2"  >
                <Input
                  label="Nhập tổng thu"
                  value={setTienThu}
                  onChange={onChangeTienThu}
                />
                <Input
                  label="Nhập số chi dự kiến"
                  value={setTienChi}
                  onChange={onChangeTienChi}
                />
                <Input
                  label="% lợi nhuận dự kiến"
                  value={setLoiNhuan}
                />
              </DialogBody>
              <Divider></Divider>
              <DialogFooter>
                <Button variant="gradient" color="green" onClick={onClickHandleThuChi}>
                  <span>Lưu</span>
                </Button>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpenSetThuChi}
                  className="mr-1"
                >
                  <span>Hủy</span>
                </Button>

              </DialogFooter>
            </Dialog>
          </>
        );
        ;
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
          <Box sx={{ height: 800, width: "100%" }} className="overflow-scroll">
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
  );
}

export default QuoteFlow;
