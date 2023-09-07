import {
    React,
    useState,
    useEffect,

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
   
} from "@heroicons/react/24/outline";

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
    const [data, setData] = useState([]);
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
        {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-fixed">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ Tên</th>
              <th>Mã Nhân Viên</th>
              <th>Địa Chỉ</th>
              <th>Điện Thoại Cty</th>
              <th>Điện Thoại CNhan</th>
              <th>Thiếu Lịch</th>
              <th>Làm/ Nghỉ</th>
              <th>Tài Khoản</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.worker_firstname} - {item.worker_name}</td>
                <td>{item.sort_name}</td>
                <td>{item.add_woker}</td>
                <td>{item.phone_ct}</td>
                <td>{item.phone_cn}</td>
                <td>{item.has_work}</td>
                <td>{item.status_worker}</td>
                <td>{item.check_acc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </Card>

        </AuthenticatedLayout>

    )
}

export default WorkersMain  