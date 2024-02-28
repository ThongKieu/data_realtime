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
import newSocket from "@/Utils/Socket";

function MapWorker({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [localOneWorkerMaps, setLocalOneWorkerMaps] = useState([]);
    const [localWorkerMaps, setLocalWorkerMaps] = useState([]);
    const [searchResults, setSearchResults] = useState(localWorkerMaps);
    const fetchLocalWorkerMaps = async (e) => {
        try {
            const response = await fetch(host + "api/maps");
            const jsonData = await response.json();
            setLocalWorkerMaps(jsonData.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
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
    const handleViewLocalWorker = async () => {
        fetchLocalWorkerMaps();
    };
    const filterLocalWorker = (itemLocal) => {
        if (itemLocal || itemLocal != undefined) {
            const filteredResults = localWorkerMaps.filter(
                (item) =>
                    item.worker_full_name
                        .toLowerCase()
                        .includes(itemLocal.toLowerCase()) ||
                    item.worker_code
                        .toLowerCase()
                        .includes(itemLocal.toLowerCase()) ||
                    item.worker_phone_company.includes(itemLocal)
            );
            setSearchResults(filteredResults);
        }
    };
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Lọc kết quả từ mảng ban đầu dựa trên giá trị nhập
        filterLocalWorker(term);
    };
    const handleLocalOneWorker = (id) => {
        // Gọi hàm với một giá trị id cụ thể
        if (id || id != undefined || id != "" || id != null) {
            filterLocalWorker(id);
        }
    };
    // useEffect cho handleResize
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight - 100,
            });
        };
        window.addEventListener("resize", handleResize);
        fetchLocalWorkerMaps();
        return () => {
            window.removeEventListener("resize", handleResize);
            newSocket.disconnect();
        };
    }, []);
    useEffect(() => {
        setSearchResults(localWorkerMaps);
    }, [localWorkerMaps]);
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
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {/* <Button
                                variant="outlined"
                                color="green"
                                onClick={() => handleSearchLocalWorker()}
                            >
                                Xem
                            </Button> */}
                        </Typography>
                        <CardBody
                            className="relative flex flex-col w-full p-0 mt-1 overflow-scroll text-gray-700 bg-white border border-green-500 rounded-none shadow-md bg-clip-border"
                            style={{ height: `${heightScreenTV}px` }}
                        >
                            {/* Danh sach tho  */}
                            {searchResults == null
                                ? localWorkerMaps.map((item, index) => {
                                      return (
                                          <div
                                              key={index}
                                              className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700"
                                          >
                                              <Tooltip
                                                  content={item.last_active}
                                              >
                                                  <div
                                                      role="button"
                                                      className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                                      onClick={() =>
                                                          handleLocalOneWorker(
                                                              item.worker_code
                                                          )
                                                      }
                                                  >
                                                      <p>
                                                          ({item.worker_code}) -{" "}
                                                          {
                                                              item.worker_full_name
                                                          }
                                                      </p>
                                                      <div className="grid ml-auto place-items-center justify-self-end">
                                                          <p
                                                              className={`w-3 h-3 ${
                                                                  item.is_online !==
                                                                  0
                                                                      ? "bg-green-500"
                                                                      : "bg-gray-500 "
                                                              } rounded-full`}
                                                          ></p>
                                                      </div>
                                                  </div>
                                              </Tooltip>
                                          </div>
                                      );
                                  })
                                : searchResults.map((item, index) => {
                                      return (
                                          <div
                                              key={index}
                                              className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700"
                                          >
                                              <Tooltip
                                                  content={item.last_active}
                                              >
                                                  {/* tài khoản đang đươc xem thì active bằng bg-gray-300 */}
                                                  <div
                                                      role="button"
                                                      className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                                      onClick={() =>
                                                          handleLocalOneWorker(
                                                              item.worker_code
                                                          )
                                                      }
                                                  >
                                                      <p>
                                                          ({item.worker_code}) -{" "}
                                                          {
                                                              item.worker_full_name
                                                          }
                                                      </p>
                                                      <div className="grid ml-auto place-items-center justify-self-end">
                                                          <p
                                                              className={`w-3 h-3 ${
                                                                  item.is_online !==
                                                                  0
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
                            <Button
                                className="w-full"
                                onClick={() => handleViewLocalWorker()}
                            >
                                Xem Tất Cả
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="col-span-5 ">
                    {searchResults == null ? (
                        <div
                            style={{
                                height: `${heightScreenTV}px`,
                                width: "100%",
                            }}
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
                                {localWorkerMaps.map((i, index) => (
                                    <AnyReactComponent
                                        key={index}
                                        lat={i.lat}
                                        lng={i.lng}
                                        text={
                                            i.worker_full_name +
                                            " " +
                                            i.last_active
                                        }
                                        icon={host + "assets/tholocal.png"}
                                    />
                                ))}
                            </GoogleMapReact>
                        </div>
                    ) : (
                        <div
                            style={{
                                height: `${heightScreenTV}px`,
                                width: "100%",
                            }}
                            className="customIMG"
                        >
                            <GoogleMapReact
                                bootstrapURLKeys={{
                                    key: "AIzaSyC5iIi-ZChi0PZ12auf77C_ZO_ooTHtAjA",
                                }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                defaultIcon={defaultProps.icon}
                            >
                                {searchResults.map((i, index) => (
                                    <AnyReactComponent
                                        key={index}
                                        lat={i.lat}
                                        lng={i.lng}
                                        text={
                                            i.worker_full_name +
                                            " " +
                                            i.last_active
                                        }
                                        icon={host + "assets/tholocal.png"}
                                    />
                                ))}
                            </GoogleMapReact>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default MapWorker;
