import { Card, Typography, Avatar } from "@material-tailwind/react";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { host } from "@/utils/UrlApi";
import {
    UsersIcon,
    BellAlertIcon,
    FolderPlusIcon,
} from "@heroicons/react/24/outline";
import CardOrder from "./CardOrder";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import CardOrderSource from "./CardOrderSource";
const TABLE_HEAD = [
    "ID",
    "Tên nhân viên",
    "Email",
    "Thời gian online",
    "Quyền",
];
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const dataNumber = [11111, 2222, 444, 555];
// ________Doanh so thu chi_________________
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Doanh thu",
        },
    },
};
const labels = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
];
export const data = {
    labels,
    datasets: [
        {
            label: "Tổng Thu",
            data: labels.map((label, index) => dataNumber[index]),
            backgroundColor: "#3480b5",
        },
        {
            label: "Tổng Chi",
            data: labels.map((label, index) => dataNumber[index]),
            backgroundColor: "#d30303",
        },
    ],
};
//_______________   end ___________________________
// ________Doanh Số tho_________________
export const dataVDS = {
    labels: ["Vượt Doanh Số", "Đủ Doanh Số", "Chưa Đủ Doanh Số"],
    datasets: [
        {
            label: "Tỷ lệ",
            data: [60, 25, 15],
            backgroundColor: ["#0099ff", "#f39e00", "#ff0037"],
            borderColor: ["#0099ff", "#f39e00", "#ff0037"],
            borderWidth: 1,
        },
    ],
};
// ________end Doanh Số tho_________________
// ________Nguồn nhận lịch_________________

const labelsOrderSource = ["App", "Web", "Tổng Đài", "Thợ Gửi"];

export const dataOrderSource = {
    labelsOrderSource,
    datasets: [
        {
            label: "App",
            data: labelsOrderSource.map((label, index) => dataNumber[index]),
            borderColor: "rgb(114, 247, 96)",
            backgroundColor: "rgba(114, 247, 96, 0.5)",
        },
        {
            label: "Web",
            data: labelsOrderSource.map((label, index) => dataNumber[index]),
            borderColor: "rgb(220, 253, 71)",
            backgroundColor: "rgba(220, 253, 71, 0.5)",
        },
        {
            label: "Tổng Đài",
            data: labelsOrderSource.map(() => 10000),
            borderColor: "rgb(0, 46, 197)",
            backgroundColor: "rgba(0, 46, 197, 0.5)",
        },
        {
            label: "Thợ Gửi",
            data: labelsOrderSource.map(() => 100),
            borderColor: "rgb(235, 150, 53)",
            backgroundColor: "rgba(235, 150, 53, 0.5)",
        },
    ],
};
//___________SMS Brand Count_____________
// ________End Nguồn nhận lịch_________________
function Home({ auth }) {
    useEffect(() => {
        fetchData();
    }, []);
    const [getData, usersData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch(host + "api/web/users");
            const jsonData = await response.json();
            if (response.ok) {
                usersData(jsonData.users);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Gọi hàm để thực hiện yêu cầu

    const [isLoading, setIsLoading] = useState(true);
    const dataCardOrder = [
        {
            id: 0,
            titleTop: "Tổng Lịch",
            titleMid: 158,
            titleBot: 16,
            imgSrc: 'assets/all.png'
            // IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 1,
            titleTop: "Điện Nước",
            titleMid: 130,
            titleBot: 14,imgSrc: 'assets/dn.png'
            // IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 2,
            titleTop: "Điện Lạnh",
            titleMid: 158,
            titleBot: 5,imgSrc: 'assets/dl.png'
            // IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 3,
            titleTop: "Đồ Gỗ",
            titleMid: 130,
            titleBot: 3,imgSrc: 'assets/dg.png'
            // IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 4,
            titleTop: "NLMT",
            titleMid: 130,
            titleBot: 2,imgSrc: 'assets/nlmt.png'
            // IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 5,
            titleTop: "Cơ Khí",
            titleMid: 158,
            titleBot: 1,imgSrc: 'assets/hx.png'
            // IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 6,
            titleTop: "Vận Chuyển",
            titleMid: 130,
            titleBot: 7,imgSrc: 'assets/vc.png'
            // IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
        {
            id: 7,
            titleTop: "Vệ Sinh Bể Nước",
            titleMid: 130,
            titleBot: 4,imgSrc: 'assets/vsbn.png'
            // IconChild: <FolderPlusIcon className="w-6 h-6" />,
        },
    ];
    const [screenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const heightScreenTV = screenSize.height;
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Trang chủ Admin" />
            <Card
                className={`h-[${heightScreenTV}px] rounded-none bg-blue-gray-500`}
            >
                <Card className="flex flex-row items-center justify-between h-10 m-2 text-center rounded-xl">
                    {/* <div className="h-8 px-0 py-0 w-72 "> */}
                    <Typography className="p-2 font-bold uppercase">
                        Công ty TNHH Dịch vụ kỹ thuật thợ việt
                    </Typography>
                    {/* </div> */}

                    <div className="flex flex-row justify-between">
                        <UsersIcon className="w-6 h-6 m-2" color="black" />
                        <BellAlertIcon className="w-6 h-6 m-2" color="black" />
                        <Avatar
                            src="https://cdn.chanhtuoi.com/uploads/2020/05/icon-facebook-08-2.jpg.webp"
                            alt="avatar"
                            size="xs"
                            className="p-1 m-2 border border-orange-500"
                        />
                    </div>
                </Card>
                <div className="flex flex-row justify-between p-1 m-2 text-center">
                    {dataCardOrder.map((item, index) => {
                        const classBot = `${item.titleBot >= 15
                                ? "green"
                                : item.titleBot <= 14 && item.titleBot >= 6
                                    ? "yellow"
                                    : item.titleBot <= 5 && item.titleBot >= 3
                                        ? "orange"
                                        : item.titleBot < 3
                                            ? "red"
                                            : ""
                            }`;

                        return (
                            <CardOrder
                                key={index}
                                ClassCard={classBot}
                                titleTop={item.titleTop}
                                titleMid={item.titleMid}
                                titleBot={item.titleBot}
                                classSpanIcon={classBot}
                                classIconBot={classBot}
                                classSpanText={classBot}
                                imgSrc={item.imgSrc}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-row gap-3 p-2">
                    <Card className="w-[35%] rounded-sm">
                        <Typography className="p-2 font-bold text-center text-white bg-blue-gray-300">
                            <p className="font-bold ">
                                Doanh Thu Qua Các Tháng
                            </p>
                        </Typography>
                        <Bar options={options} data={data} />;
                    </Card>
                    <Card className="w-[35%] rounded-sm">
                        <Typography className="p-2 font-bold text-center text-white bg-blue-gray-300">
                            <p className="font-bold ">Doanh Số Của Thợ</p>
                        </Typography>
                        <div className="w-[80%] h-[80%] m-auto flex flex-row items-center justify-center">
                            <Pie data={dataVDS} className="flex flex-row" />
                        </div>
                    </Card>
                    <Card className="w-[30%] rounded-sm">
                        <Typography className="p-2 font-bold text-center text-white bg-blue-gray-300">
                            <p className="font-bold ">
                                Số Lượng Lịch Nhận Từ Các Nguồn Tiếp Nhận Thông
                                Tin
                            </p>
                        </Typography>
                        <div className="grid items-start justify-between grid-cols-4 p-2">
                            <CardOrderSource />
                            <Line data={dataOrderSource} />
                        </div>
                    </Card>
                </div>
                <div className="p-2 ">
                    <Typography className="p-2 font-bold text-center text-white bg-blue-gray-300">
                        <p className="font-bold ">
                            Danh Sách Nhân Viên Vượt Doanh Số Cao Trong Tháng
                        </p>
                    </Typography>
                    <Card className="w-full">
                        <table className="w-full text-left table-auto">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
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
                                ) : (
                                    getData.map(
                                        (
                                            {
                                                id,
                                                name,
                                                email,
                                                is_online,
                                                permission,
                                            },
                                            index
                                        ) => {
                                            const isLast =
                                                index === getData.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

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
                                                            {is_online}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            as="span"
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-medium"
                                                        >
                                                            {permission}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>

            </Card>
            <Card>
            </Card>
        </AuthenticatedLayout>
    );
}
export default Home;
