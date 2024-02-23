import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import GoogleMapReact from "google-map-react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import { host } from "@/Utils/UrlApi";

function MapWorker({ auth }) {
    const defaultProps = {
        center: {
            lat: 10.8199936,
            lng: 106.7122688,
        },
        icon: "assets/avatar/avata1.png",
        zoom: 15,
    };
    const AnyReactComponent = ({ text, icon }) => (
        <>
            <Tooltip content={text}>
                <img
                    src={icon}
                    alt={text}
                    className="inline-block relative object-cover object-center w-9 h-9 rounded-md border border-blue-500 p-0.56 bg-white "
                />
            </Tooltip>
        </>
    );

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    const [infoWorkerMaps, setInfoWorkerMaps] = useState([]);
    const [localWorker, setLocalWorker] = useState([]);
    const [resultArrayMaps, setResultArrayMaps] = useState([]);

    const fetchInfoWorker = async (e) => {
        try {
            const response = await fetch(host + "api/web/workers");
            const jsonData = await response.json();
            const formatJson = jsonData.map((item) => ({
                value: item.id,
                label:
                    "(" +
                    item.worker_code +
                    ")" +
                    " - " +
                    item.worker_full_name,
                workerCode: item.worker_code,
                onLeave: item.worker_status,
            }));
            setInfoWorkerMaps(formatJson);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const localWorkerMaps = async (e) => {
        try {
            const response = await fetch(host + "api/maps");
            const jsonData = await response.json();
            setLocalWorker(jsonData.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log("local worker", localWorker);
    useEffect(() => {
        localWorkerMaps();
        fetchInfoWorker();
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight - 100,
            });
        };
        window.addEventListener("resize", handleResize);
        const tempResultArray = [];
        // Tạo một đối tượng để nhanh chóng kiểm tra id_worker có tồn tại trong localWorker hay không
        const localWorkerIds = new Set(
            localWorker.map((item) => item.id_worker)
        );
        // Duyệt qua từng phần tử của array1
        for (const item1 of infoWorkerMaps) {
            // Kiểm tra xem id_worker có tồn tại trong localWorker không
            if (localWorkerIds.has(item1.value)) {
                // Nếu có, tìm phần tử trong localWorker tương ứng với id_worker
                const matchingItem = localWorker.find(
                    (item2) => item2.id_worker === item1.value
                );
                console.log("matchingItem", matchingItem);
                // Tạo đối tượng mới và thêm vào mảng kết quả
                const resultItem = {
                    id_worker_info: item1.value,
                    label: item1.label,
                    is_online: matchingItem.is_online,
                    lat: matchingItem.lat,
                    lng: matchingItem.lng,
                };
                console.log("matchingItem", resultItem);
                tempResultArray.push(resultItem);
            }
        }
        // Cập nhật state với mảng kết quả
        setResultArrayMaps(tempResultArray);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    console.log("resultArrayMaps", resultArrayMaps);
    var heightScreenTV = screenSize.height;
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Vị Trí Thợ" />
            <div className="grid grid-cols-6 gap-1 m-2">
                <div className="col-span-1">
                    <Card
                        className="p-3 "
                        style={{ height: `${heightScreenTV}px` }}
                    >
                        <Typography className="flex justify-between gap-1">
                            {/* //Bấm xem sẽ load lại maps */}
                            <Input
                                label="Tìm theo tên hoặc mã thợ"
                                className="shadow-none focus:outline-none"
                            />
                            <Button variant="outlined" color="green">
                                Xem
                            </Button>
                        </Typography>
                        <CardBody
                            className="relative flex flex-col w-full p-0 mt-1 overflow-scroll text-gray-700 bg-white border border-green-500 rounded-none shadow-md bg-clip-border"
                            style={{ height: `${heightScreenTV}px` }}
                        >
                            {/* Danh sach tho  */}
                            {infoWorkerMaps.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700"
                                    >
                                        <Tooltip content={item.created_at}>
                                            {/* tài khoản đang đươc xem thì active bằng bg-gray-300 */}
                                            <div
                                                role="button"
                                                className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                            >
                                                <p>{item.label}</p>
                                                <div className="grid ml-auto place-items-center justify-self-end">
                                                    <p
                                                        className={`w-3 h-3 ${
                                                            item.onLeave == 0
                                                                ? "bg-green-500"
                                                                : "bg-gray-500 "
                                                        } rounded-full`}
                                                    ></p>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    </div>
                                );
                            })}
                        </CardBody>
                        <CardFooter className="w-full p-0 mt-1">
                            <Button className="w-full">Xem Tất Cả</Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="col-span-5 ">
                    <div
                        style={{ height: `${heightScreenTV}px`, width: "100%" }}
                        className="customIMG"
                    >
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                // key: "AIzaSyBzAoR7KxrtAYO4WBp5z0YTpTjyKs-Ug8E",
                                key: "AIzaSyC5iIi-ZChi0PZ12auf77C_ZO_ooTHtAjA",
                            }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            defaultIcon={defaultProps.icon}
                        >
                            {resultArrayMaps.map((i, index) => (
                                <AnyReactComponent
                                    key={index}
                                    lat={i.lat}
                                    lng={i.lng}
                                    text={i.label}
                                    icon={host + "assets/tholocal.png"}
                                />
                            ))}
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default MapWorker;
