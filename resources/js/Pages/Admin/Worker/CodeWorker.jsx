import AuthenticatedLayoutAdmin from "@/Layouts/Admin/AuthenticatedLayoutAdmin";

import { Head } from "@inertiajs/react";
import React from "react";
import {
    PlusCircleIcon,
    MapPinIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography,
    Input,
    Textarea,
    Spinner,
    Divider,
    Switch,
} from "@material-tailwind/react";

import { useState } from "react";
import { host } from "@/Utils/UrlApi";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
function CodeWorker(auth) {
    const [open, setOpen] = useState(false);
    const [checkCode, setCheckCode] = useState("");
    const [getData, usersData] = useState([]);
    const handleOpen = () => setOpen(!open);
    const [dataCodeWorker, setFormDataCodeWorker] = useState({
        code_worker: "",
        kind_worker: "",
        descript_code_worker: "",
    });
    const [changStatus, setchangStatus] = useState({
        id: "",
        status: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormDataCodeWorker({ ...dataCodeWorker, [name]: value });
        // fetchCheckCode(value);
        console.log(dataCodeWorker.code_worker);
    };
    // useEffect chỉ chạy một lần sau khi render đầu tiên

    const sentData = async (dataCodeWorker) => {
        console.log(dataCodeWorker);
        try {
            const res = await fetch(host + "api/web/workers/code-worker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataCodeWorker),
            });
            if (res.ok) {
                const resData = await res.json();
                console.log("re", resData);
                if (resData.data == 1) {
                    alert("Mã vừa nhập đã tồn tại vui lòng đổi mã!!! ");
                } else {
                    window.location.reload();
                }
                // handleOpen();
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        // console.log('11111');
    };
    const fetchChangSataus = async (changStatus) => {
        try {
            const res = await fetch(
                host + "api/web/workers/change-code-status",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(changStatus),
                }
            );
            if (res.ok) {
                console.log(res);
                // Xử lý kết quả trả về từ API nếu cần
            } else {
                console.error("Lỗi khi gửi dữ liệu:", res.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await fetch(host + "api/web/workers/all-code");
            const jsonData = await response.json();
            if (response.ok) {
                usersData(jsonData);
                console.log(jsonData);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);
    const column = [
        {
            field: "id",
            headerName: "STT",
            type: "text",
            width: 100,
            minWidth: 50,
            maxWidth: 200,
            editable: false,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "code_worker",
            headerName: "Mã Thợ",
            type: "text",
            editable: false,
            align: "center",
            width: 250,
            headerAlign: "center",
        },
        {
            field: "kind_worker",
            headerName: "Loại Thợ",
            type: "text",
            editable: false,
            align: "center",
            width: 250,
            headerAlign: "center",
        },
        {
            field: "descript_code_worker",
            headerName: "Mô tả",
            type: "text",
            editable: false,
            align: "center",
            width: 250,
            headerAlign: "center",
        },
        {
            field: "status_code_worker",
            headerName: "Trạng Thái ",
            type: "text",
            width: 220,
            editable: false,
            renderCell: (params) => {
                // pramas.row.status_code_worker
                const [checked, setChecked] = useState(
                    params.row.status_code_worker === 1
                );
                const handleChange = () => {
                    const newChecked = !checked;
                    setChecked(newChecked);
                    // onUpdate(params.row.id, newChecked ? 1 : 0); // Gửi yêu cầu cập nhật dữ liệu tới server
                };

                // const [checked, setChecked] = useState(false);

                console.log('checked',checked);

                return (
                    <>
                        <Switch checked={checked} onChange={handleChange} />
                        <div className="text-sm font-semibold text-gray-700">
                            status_code_worker
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayoutAdmin>
            <Head title="Tài khoản thợ" />
            <div className="p-1">
                <Card>
                    <div className="grid grid-cols-5 ">
                        <div className="col-span-4 m-auto">
                            <h2 className="uppercase">Danh Sách - Mã Code</h2>
                        </div>

                        <div className="col-span-1 m-auto">
                            {" "}
                            <PlusCircleIcon
                                className="w-10 h-10"
                                onClick={handleOpen}
                            ></PlusCircleIcon>
                            <Dialog open={open} handler={handleOpen}>
                                <DialogHeader>
                                    <h2 className="m-auto">
                                        Nhập thông tin thợ mới
                                    </h2>
                                </DialogHeader>
                                <DialogBody divider>
                                    <div className="grid grid-cols-2 gap-2 m-1 ">
                                        <Input
                                            type="text"
                                            className="text-black shadow-none"
                                            id="code_worker"
                                            name="code_worker"
                                            value={dataCodeWorker.code_worker}
                                            onChange={handleChange}
                                            label="Nhập Ký Hiệu Mã mới"
                                            required
                                        />
                                        <Input
                                            type="text"
                                            className="shadow-none"
                                            id="kind_worker"
                                            name="kind_worker"
                                            value={dataCodeWorker.kind_worker}
                                            onChange={handleChange}
                                            label="Loại Thợ"
                                            required
                                        />
                                    </div>
                                    <Textarea
                                        type="text"
                                        className="shadow-none "
                                        id="descript_code_worker"
                                        name="descript_code_worker"
                                        value={
                                            dataCodeWorker.descript_code_worker
                                        }
                                        onChange={handleChange}
                                        label="Mô tả loại thợ"
                                        required
                                    />
                                </DialogBody>

                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleOpen}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        color="green"
                                        onClick={() => sentData(dataCodeWorker)}
                                    >
                                        <span>Con1irm</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </div>
                    </div>
                </Card>
            </div>
            <Card className="bg-white ">
                {isLoading ? (
                    <div className="flex justify-center p-2 align-middle ">
                        <Spinner className="w-6 h-6" color="amber" />
                        <p className="pl-2 text-center text-black">
                            Loading...
                        </p>
                    </div>
                ) : (
                    <DataGrid
                        {...getData}
                        rows={getData}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        columns={column}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                )}
            </Card>
        </AuthenticatedLayoutAdmin>
    );
}

export default CodeWorker;
