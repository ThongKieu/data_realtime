import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Typography,
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Box, Divider } from "@mui/material";
import { getFirstName } from "@/Data/UrlAPI/UrlApi";
import { host } from "@/Utils/UrlApi";
const TABLE_HEAD = [
    "Mã CV",
    "Nội dung",
    "Thời gian",
    "Bảo hành",
    "Tên khách",
    "Địa chỉ",
    "Số điện thoại",
    "Ghi chú",
    "Thợ làm",
    "Tổng chi",
    "Tổng thu",
    "Số phiếu thu",
    "Yêu Cầu Bảo Hành",
    "Lịch Sử",
];
function Search({ auth }) {
    // const onChange = ({ target }) => setEmail(target.value);
    const [dataReturn, setDataReturn] = useState([
        {
            id: 1,
            id_cus: 1,
            id_worker: 2,
            id_phu: 0,
            real_note: 'cần thang',
            spending_total: 150000,
            income_total: 1500000,
            bill_imag: null,
            seri_imag: 'assets/images/work_assignment/1/seri_imag/1-171636579648.jpg,',
            status_work: 2,
            check_in: 0,
            seri_number: 123564,
            status_admin_check: 1,
            flag_check: 0,
            his_work: "[{\"id_auth\":1,\"id_worker\":null,\"action\":\"G\\u1eedi L\\u1ecbch Th\\u1ee3\",\"time\":\"2024-05-27 15:20\"}]",
            work: {
                id: 1,
                work_content: 'Sửa máy  lạnh 1500k',
                work_note: 'cần thang',
                name_cus: 'Thống Kiều',
                date_book: '2024-05-24',
                phone_number: '0947613923',
                street: '400 Sư Vạn Hạnh Nối Dài',
                district: 'q10',
                member_read: 1
            },
            worker: {
                id: 2,
                worker_full_name: ' Nguyễn Thế Minh',
                worker_code: 'A04'
            },
            warranty: [
                {
                    id: 1,
                    id_work_has: 1,
                    warranty_time: 3,
                    warranty_info: 'Không Bảo Hành',
                    unit: 'm'
                },
                {
                    id: 2,
                    id_work_has: 1,
                    warranty_time: 2,
                    warranty_info: '12aaaaaaaaaaaa312',
                    unit: 'm'
                }
            ]
        },
    ]);
    const [keySearch, setKey] = useState("");
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    const fetchSearch = async () => {
        try {
            let data = {
                keySearch: keySearch,
            };
            const response = await fetch("api/web/search", {
                method: "POST",
                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
            });

            // console.log("XIN CHAO DATA ACTIVE:",response.ok);
            if (response.ok) {
                const responseData = await response.json(); // Convert response to JSON
                setDataReturn(responseData);
            } else {
                console.error("Error:", response.status, response.statusText);
            }
        } catch (error) {
            console.log("hihi", error);
        }
    };
    const handelBH = async (id, id_cus, worker_full_name, code) => {
        let data = {
            id: id,
            id_cus: id_cus,
            worker_full_name: worker_full_name,
            worker_code: code,
        };
        console.log(data);
        try {
            const response = await fetch("api/web/search/warranty", {
                method: "POST",
                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
                headers: {
                    "Content-Type": "application/json", // Xác định loại dữ liệu gửi đi
                },
            });
            // console.log("XIN CHAO DATA ACTIVE:",response.ok);
            if (response.ok) {
                // const responseData = await response.json(); // Convert response to JSON
                // setDataReturn(responseData);
                window.history.back();
            } else {
                console.error("Error:", response.status, response.statusText);
            }
        } catch (error) {
            console.log("hihi", error);
        }
    };
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight - 100,
            });
        };
        fetchSearch();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogNote, setOpenDialogNote] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [openDialogHis, setOpenDialogHis] = useState(false);

    const handleOpenDialogBH = (id_cus) => {
        setSelectedItemId(id_cus);
        setOpenDialog(!openDialog);
    };
    const handleOpenDialogNote = (id_cus) => {
        setSelectedItemId(id_cus);
        setOpenDialogNote(!openDialogNote);
    };
    const handleOpenDialogHis = (id_cus) => {
        setSelectedItemId(id_cus);
        setOpenDialogHis(!openDialogHis);
    };
    const [dataWan, setDataWan] = useState();
    const [imgNote, setImgNote] = useState([]);
    const handleGetDataBH = async (id_row) => {
        try {
            const url = `/api/web/work-assignment/warranties?id=${id_row}`;
            const response = await fetch(url);
            const data = await response.json();
            setDataWan(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleGetImgNote = (index) => {
        const data = dataReturn[index].image_work_path;
        const parts = data?.split(",");
        const filteredArray = parts?.filter((item) => item.trim() !== "");
        setImgNote(filteredArray);
    };
    const ReadMore = ({ text, maxLength }) => {
        const [isReadMore, setIsReadMore] = useState(false);

        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };

        const displayText = isReadMore
            ? text
            : `${text.slice(0, maxLength)}...`;

        return (
            <div>
                <p>{displayText}</p>
                {text.length > maxLength && (
                    <Button
                        color="orange"
                        variant="outlined"
                        className="p-1"
                        onClick={toggleReadMore}
                    >
                        {isReadMore ? "Thu gọn" : "Xem Thêm"}
                    </Button>
                )}
            </div>
        );
    };
    // useEffect(() => {
    //     // Chuỗi JSON bạn muốn giải mã
    //     const jsonString = '[{"id_auth":1,"id_worker":null,"action":"G\\u1eedi L\\u1ecbch Th\\u1ee3","time":"2024-05-27 15:20"}]';

    //     // Giải mã chuỗi JSON
    //     const decodedData = JSON.parse(jsonString);
    //     decodeHis(decodedData);
    //     // Cập nhật state với dữ liệu giải mã
    //     // setData(decodedData);
    //   }, []);
    // const decodeHis = () => {
    // console.log(hi);
    // const his_work = JSON.parse(hi);
    // console.log(his_work);
    // return (
    //     <div>
    //         {
    //             his_work.map((item,
    //                 index) => {
    //                     return (

    //                         <div
    //                             key={
    //                                 index
    //                             }
    //                             className="p-2 mb-2 border border-green-500 rounded-md"
    //                         >
    //                             <div>

    //                             </div>
    //                             <div>
    //                                 <span className="pr-2">
    //                                     Nội
    //                                     Dung:
    //                                 </span>
    //                                 <span>
    //                                     {
    //                                         item.id_auth
    //                                     }
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     );

    //             }
    //             )
    //         }
    //     </div>
    // );
    // }
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tìm Kiếm Khách Hàng" />
            <div className="p-2">
                <Input
                    type="text"
                    label="Tìm Kiếm"
                    name="search"
                    value={keySearch}
                    onChange={(e) => setKey(e.target.value)}
                    onKeyUp={fetchSearch}
                    className="rounded-none shadow-none focus:outline-none"
                />
            </div>
            <Box
                sx={{
                    height: `${screenSize.height}px`,
                    width: "100%",
                }}
                className="p-2 pr-0 overflow-scroll"
            >
                <table
                    className={`w-full p-2 text-left border border-green-500 table-auto min-w-max`}
                // style={{ height: `${screenSize.height - 50}px` }}
                >
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={index}
                                    className="p-2 text-center border border-blue-gray-300 bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-black leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataReturn != "" ? (
                            <>
                                {dataReturn?.map((item, index) => {
                                    const isLast = index === item.length - 1;
                                    const classes = isLast
                                        ? "p-1 text-center"
                                        : "p-1 border border-blue-gray-300 text-center";
                                    const formatter = new Intl.NumberFormat(
                                        "vi-VN",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    );
                                    const maxLength = 50;
                                    // // if (item.his_work != undefined) {
                                        const cleanJsonString = item.his_work?.slice(1, -1);
                                        const jsonParse = JSON?.parse(cleanJsonString);
                                        console.log(jsonParse);
                                    // // }
                                    return (
                                        <tr
                                            key={index}
                                            className="border hover:bg-blue-gray-100 border-blue-gray-100"
                                        >
                                            <td
                                                className={`${classes} w-[60px] `}
                                            >
                                                {item.id}
                                            </td>
                                            <td
                                                className={`${classes} w-[200px]`}
                                            >
                                                {maxLength < 30 ? (
                                                    <p>{item.work.work_content}</p>
                                                ) : (
                                                    <ReadMore
                                                        text={item.work.work_content}
                                                        maxLength={maxLength}
                                                    />
                                                )}
                                                {/* {item.work_content} */}
                                            </td>
                                            <td
                                                className={`${classes} w-[60px]`}
                                            >
                                                {item.work.date_book}
                                            </td>
                                            <td
                                                className={`${classes} text-center w-[50px]`}
                                            >
                                                <Button
                                                    className="p-2 text-orange-400 border border-orange-400 rounded-md"
                                                    onClick={() => {
                                                        handleOpenDialogBH(
                                                            item.id_cus
                                                        );
                                                        handleGetDataBH(
                                                            item.id
                                                        );
                                                    }}
                                                    variant="outlined"
                                                >
                                                    BH
                                                </Button>
                                                {openDialog &&
                                                    selectedItemId ===
                                                    item.id_cus && (
                                                        <Dialog
                                                            open={openDialog}
                                                            handler={
                                                                handleOpenDialogBH
                                                            }
                                                        >
                                                            <DialogHeader>
                                                                Thông Tin Bảo
                                                                Hành
                                                            </DialogHeader>
                                                            <Divider />
                                                            {item.warranty !==
                                                                undefined ? (
                                                                <DialogBody>
                                                                    {item.warranty == '' ? "Không bảo hành" :
                                                                        <>
                                                                            {item.warranty.map(
                                                                                (
                                                                                    item,
                                                                                    index
                                                                                ) => {
                                                                                    return (

                                                                                        <div
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            className="p-2 mb-2 border border-green-500 rounded-md"
                                                                                        >
                                                                                            <div>
                                                                                                <span className="pr-2">
                                                                                                    Bảo
                                                                                                    Hành: {item.warranty_time}
                                                                                                </span>
                                                                                                <span>
                                                                                                    {item.unit ===
                                                                                                        "d"
                                                                                                        ? "ngày"
                                                                                                        : item.unit ===
                                                                                                            "w"
                                                                                                            ? "tuần"
                                                                                                            : item.unit ===
                                                                                                                "m"
                                                                                                                ? "tháng"
                                                                                                                : item.unit ===
                                                                                                                    "y"
                                                                                                                    ? "năm"
                                                                                                                    : ""
                                                                                                    }
                                                                                                </span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="pr-2">
                                                                                                    Nội
                                                                                                    Dung:
                                                                                                </span>
                                                                                                <span>
                                                                                                    {
                                                                                                        item.warranty_info
                                                                                                    }
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </>
                                                                    }
                                                                </DialogBody>
                                                            ) : (
                                                                <DialogBody>
                                                                    <p>
                                                                        Không có
                                                                        dữ liệu
                                                                    </p>
                                                                </DialogBody>
                                                            )}
                                                            <Divider />
                                                            <DialogFooter>
                                                                <Button
                                                                    variant="text"
                                                                    color="red"
                                                                    onClick={
                                                                        handleOpenDialogBH
                                                                    }
                                                                    className="mr-1"
                                                                >
                                                                    <span>
                                                                        Đóng
                                                                    </span>
                                                                </Button>
                                                            </DialogFooter>
                                                        </Dialog>
                                                    )}
                                            </td>
                                            <td
                                                className={`${classes} w-[100px]`}
                                            >
                                                {item.work.name_cus}
                                            </td>
                                            <td
                                                className={`${classes} w-[200px]`}
                                            >
                                                {item.work.street} - {item.work.district}
                                            </td>
                                            <td
                                                className={`${classes} w-[60px]`}
                                            >
                                                {item.work.phone_number}
                                            </td>
                                            <td
                                                className={`${classes} w-[60px]`}
                                            >
                                                <Button
                                                    className="p-1 text-orange-400 border border-orange-400 rounded-sm"
                                                    onClick={() => {
                                                        if (!openDialogNote) {
                                                            handleOpenDialogNote(
                                                                item.id_cus
                                                            );
                                                            handleGetImgNote(
                                                                index
                                                            );
                                                        } else {
                                                            handleOpenDialogNote(
                                                                item.id_cus
                                                            );
                                                        }
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Ghi Chú
                                                </Button>
                                                {openDialogNote &&
                                                    selectedItemId ===
                                                    item.id_cus && (
                                                        <Dialog
                                                            open={
                                                                openDialogNote
                                                            }
                                                            handler={
                                                                handleOpenDialogNote
                                                            }
                                                        >
                                                            <DialogHeader>
                                                                Thông Tin Ghi
                                                                Chú
                                                            </DialogHeader>
                                                            <Divider />
                                                            <DialogBody>
                                                                <span className="pr-2 italic underline">
                                                                    Nội dung ghi
                                                                    chú:
                                                                </span>
                                                                <span>
                                                                    {
                                                                        item.real_note
                                                                    }
                                                                </span>
                                                                <Divider className="mb-2" />
                                                                <div>
                                                                    {imgNote?.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    className="grid grid-cols-4 mt-2"
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            host +
                                                                                            item
                                                                                        }
                                                                                        alt=""
                                                                                        className="w-full"
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            </DialogBody>
                                                            <Divider />
                                                            <DialogFooter>
                                                                <Button
                                                                    variant="text"
                                                                    color="red"
                                                                    onClick={
                                                                        handleOpenDialogNote
                                                                    }
                                                                    className="mr-1"
                                                                >
                                                                    <span>
                                                                        Thoát
                                                                    </span>
                                                                </Button>
                                                            </DialogFooter>
                                                        </Dialog>
                                                    )}
                                            </td>
                                            <td
                                                className={`${classes} w-[100px]`}
                                            >
                                                ({item.worker.worker_code})-
                                                {getFirstName(
                                                    item.worker.worker_full_name
                                                )}
                                            </td>
                                            <td
                                                className={`${classes} w-[90px] text-right`}
                                            >
                                                {formatter.format(
                                                    item.spending_total
                                                )}
                                            </td>
                                            <td
                                                className={`${classes} w-[90px] text-right`}
                                            >
                                                {formatter.format(
                                                    item.income_total
                                                )}
                                            </td>
                                            <td
                                                className={`${classes} w-[70px]`}
                                            >
                                                {item.seri_number !== "null" ? (
                                                    <p>{item.seri_number}</p>
                                                ) : (
                                                    <p>k pt</p>
                                                )}
                                            </td>
                                            <td
                                                className={`${classes} w-[90px]`}
                                            >
                                                <Button
                                                    className={`p-1 rounded-sm`}
                                                    color="orange"
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handelBH(
                                                            item.id,
                                                            item.work.id,
                                                            item.worker.worker_full_name,
                                                            item.worker.worker_code
                                                        )
                                                    }
                                                >
                                                    Bảo Hành
                                                </Button>
                                            </td>
                                            <td
                                                className={`${classes} w-[90px]`}
                                            > <Button
                                                className="p-1 text-orange-400 border border-orange-400 rounded-sm"
                                                onClick={() => {
                                                    if (!openDialogHis) {
                                                        handleOpenDialogHis(
                                                            item.id_cus
                                                        );

                                                    } else {
                                                        handleOpenDialogHis(
                                                            item.id_cus
                                                        );
                                                    }
                                                }}
                                                variant="outlined"
                                            >
                                                    Lịch Sử
                                                </Button>
                                                {openDialogHis &&
                                                    selectedItemId ===
                                                    item.id_cus && (
                                                        <Dialog
                                                            open={
                                                                openDialogHis
                                                            }
                                                            handler={
                                                                handleOpenDialogHis
                                                            }
                                                        >
                                                            <DialogHeader>
                                                                Lịch sử
                                                            </DialogHeader>
                                                            <Divider />
                                                            <DialogBody>
                                                                <span className="pr-2 italic underline">
                                                                    {
                                                                        // decodeHis(item.his_work)
                                                                        //    parseJson(item.his_work)
                                                                    }
                                                                </span>
                                                                <span>

                                                                </span>
                                                                <Divider className="mb-2" />
                                                                <div>

                                                                </div>
                                                            </DialogBody>
                                                            <Divider />
                                                            <DialogFooter>
                                                                <Button
                                                                    variant="text"
                                                                    color="red"
                                                                    onClick={
                                                                        handleOpenDialogHis
                                                                    }
                                                                    className="mr-1"
                                                                >
                                                                    <span>
                                                                        Thoát
                                                                    </span>
                                                                </Button>
                                                            </DialogFooter>
                                                        </Dialog>
                                                    )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </>
                        ) : (
                            <tr className="w-full text-center hover:bg-blue-gray-100">
                                <td colSpan={13}>Không Có Dữ Liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Box>
        </AuthenticatedLayout>
    );
}

export default Search;
