import {
    React,
    useState,
    useEffect,
    useMemo,

} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {

    DialogBody,
    Avatar,
    Card,
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import {
    PlusCircleIcon,
    TrashIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
   
import Box from '@mui/material/Box';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  
} from '@mui/x-data-grid';

const VISIBLE_FIELDS = ['id', 'worker_firstname', 'worker_name', 'add_woker', 'phone_cty'];
// const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];
function WorkersMain({ auth }) {
    // thêm thợ
    const [open, setOpen] = useState(false);
    const [info_worker, setFormDataWorker] = useState({
        worker_firstname: '',
        worker_name: '',
        add_woker: '',
        phone_cty: '',
        phone_cn: '',
        kind_worker: '',
    });
    const handleOpen = () => setOpen(!open);

    const handleSelectChange = (e) => {
        setFormDataWorker({ ...info_worker, kind_worker: e.target.value }); 
        // Cập nhật trạng thái khi người dùng chọn tùy chọn
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormDataWorker({ ...info_worker, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

            const URL_API = '/api/web/workers';
            console.log(info_worker);
            try {
                const response = await fetch(URL_API, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(info_worker),
                });
                
                if (response.ok) {
                  const responseData = await response.json();
                  console.log('Dữ liệu đã được gửi và phản hồi từ máy chủ:', responseData);
                  window.location.reload();
                } else {
                  console.error('Lỗi khi gửi dữ liệu:', response.statusText);
                }
              } catch (error) {
                console.error('Lỗi khi gửi dữ liệu:', error);
              }

    };
    //lấy dữ liệu thợ
    // const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
  
    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      setRows(rows.filter((row) => row.id !== id));
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
  
    const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    };
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
    const [rows, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        fetch('api/web/workers')
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setData(data); // Lưu dữ liệu vào trạng thái React
            setLoading(false); // Đã lấy xong dữ liệu
        })
        .catch((error) => {
            console.error('Lỗi khi lấy dữ liệu từ API:', error);
        });
    }, []); // useEffect chỉ chạy một lần sau khi render đầu tiên
    
    
      // Otherwise filter will be applied on fields such as the hidden column id
      const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'fullName',
            headerName: 'Họ Tên',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            editable: true,
            valueGetter: (params) =>
              `${params.row.worker_firstname || ''} ${params.row.worker_name || ''}`,
          },
        {
          field: 'phone_ct',
          headerName: 'Số Công ty',
          width: 150,
          editable: true,
        },
        {
          field: 'phone_cn',
          headerName: 'Số cá nhân',
          width: 150,
          editable: true,
        },
        {
          field: 'kind_worker',
          headerName: 'Tình Trang',
          type: 'actions',
          width: 110,
          editable: false,
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<PlusCircleIcon className='w-6 h-6' />}
                  label="Save"
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<TrashIcon className='w-6 h-6'  />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />,
              ];
            }
    
            return [
              <GridActionsCellItem
                icon={<PencilSquareIcon className='w-6 h-6'  />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<PlusCircleIcon className='w-6 h-6'  />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
         },
        },
        
      ];
      
  
      
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang quản lý thông tin thợ" />

            <Card className='mt-2'>
                <div className="grid justify-items-stretch m-2 ">
                    <div className="justify-self-end">
                        <Tooltip
                            content='Thêm Thợ Mới'
                        >
                            <PlusCircleIcon className='w-10 h-10 pointer-events-auto' color='#0056ffeb' onClick={handleOpen} />
                        </Tooltip>
                    </div>
                </div>
            </Card>

            <Dialog open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader >
                        <div className='m-auto'>Nhập thông tin thợ mới</div></DialogHeader>
                    <DialogBody divider>

                        <div className=" grid grid-cols-2 m-1 gap-2">
                            <Input
                                type="text"
                                className='shadow-none'
                                id="name"
                                name="worker_firstname"
                                value={info_worker.worker_firstname}
                                onChange={handleChange}
                                label='Họ'
                            />
                            <Input
                                type="text"
                                className='shadow-none'
                                id="name"
                                name="worker_name"
                                value={info_worker.worker_name}
                                onChange={handleChange}
                                label='Tên'
                            />
                            <Input
                                type="text"
                                className='shadow-none'
                                id="name"
                                name="add_woker"
                                value={info_worker.add_woker}
                                onChange={handleChange}
                                label='Địa Chỉ'
                            />
                            <Input value="Tên tắt vd: A01,A02..." className='shadow-none' size="lg" readOnly />
                            <Input
                                type="text"
                                className='shadow-none'
                                id="name"
                                name="phone_cty"
                                value={info_worker.phone_cty}
                                onChange={handleChange}
                                label='Số Công Ty'
                            />
                            <Input
                                type="text"
                                className='shadow-none'
                                id="name"
                                name="phone_cn"
                                value={info_worker.phone_cn}
                                onChange={handleChange}
                                label='Số Cá Nhân'
                            />
                        </div>
                        <div className=" grid grid-cols-2 m-1 gap-2">

                        </div>
                        <div className="m-1">
                            <select
                                id="kind_worker"
                                name="kind_worker"
                                value={info_worker.kind_worker}
                                onChange={handleSelectChange}
                                className='border rounded-lg w-full'>
                                <option value=''>Vui lòng chọn loại thợ</option>
                                <option value={0}>Điện Nước</option>
                                <option value={1}>Điện Lạnh</option>
                                <option value={2}>Đồ Gỗ</option>
                                <option value={3}>Năng lượng mặt trời</option>
                                <option value={4}>Xây Dựng</option>
                                <option value={5}>Tài Xế</option>
                                <option value={6}>Cơ Khí</option>
                            </select>
                        </div>


                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Hủy</span>
                        </Button>
                        <Button variant="gradient" color="green" type='submit'>
                            <span>Lưu</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
            {/* -Đổ dữ liệu thợ- */}
       <Card>
        <Box sx={{ height: 400, width: 1 }}>
        <DataGrid
            rows={rows}
            columns={columns}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            // slots={{ toolbar: GridToolbar }}
            slotProps={{
            toolbar: {
                showQuickFilter: true,
            },
            }}
        />
        </Box>
        </Card>
        </AuthenticatedLayout>

    )
}

export default WorkersMain  