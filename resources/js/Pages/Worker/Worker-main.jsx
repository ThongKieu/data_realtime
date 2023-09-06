import {
    React,
    useState,

} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {

    DialogBody,
    Avatar,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    Select,
    Option,
    Dialog,
    DialogHeader,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import {
    PlusCircleIcon,
    PaintBrushIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

function WorkersMain({ auth }) {
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
    const handleChangeIp = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...info_worker,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Access the form data from the state
        console.log('Form data submitted:', formData);
    
        // You can now send this data to a server or perform any other actions.
      };
    
    // const handleChangeIp = (e) => {
    //     // const { name, value } = e.target;
    //     setFormDataWorker({ ...info_worker, [e.target.name]: e.target.value });
    // };
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
                            id="name"
                            name="worker_firstname"
                            value={info_worker.worker_firstname}
                            onChange={handleChangeIp}
                        />
                        {/* <Input label="Họ" size="lg" name='worker_firstname' />  <Input label="Tên" size="lg" value={info_worker.worker_name} />
                        <Input label="Địa Chỉ" size="lg" value={info_worker.add_woker}/>
                        <Input label="Tên tắt vd: A01,A02..." size="lg" readOnly/>
                        <Input label="Số Công Ty" size="lg" value={info_worker.phone_cty}/>
                        <Input label="Số Cá Nhân" size="lg" value={info_worker.phone_cn}/> */}
                    </div>
                    <div className=" grid grid-cols-2 m-1 gap-2">

                    </div>
                    {/* <div className="m-1">
                        <Select label="Phân Loại Thợ" value={info_worker.kind_worker} onChange={handleChangeIp}>
                            <Option value='0'>Điện Nước</Option>
                            <Option value='1'>Điện Lạnh</Option>
                            <Option value='2'>Đồ Gỗ</Option>
                            <Option value='3'>Xây Dựng</Option>
                            <Option value='4'>Năng lượng mặt trời</Option>
                            <Option value='5'>Cơ Khí</Option>
                        </Select>
                    </div> */}


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

        </AuthenticatedLayout>

    )
}

export default WorkersMain  