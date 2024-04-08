import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import React, { useEffect, useState, useRef } from "react";
import { Head } from "@inertiajs/react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Card,
    Typography,
    Avatar,
    Tooltip,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import {
    UsersIcon,
    BellAlertIcon,
    PlusCircleIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Box } from "@mui/material";
import useWindowSize from "@/Core/Resize";
import { Link } from "@inertiajs/react";
import { apiPost, host } from "@/Utils/UrlApi";
import { Editor } from "@tinymce/tinymce-react";

function PostList({ auth }) {
    const [rows, rowsData] = useState([]);
    const { width, height } = useWindowSize(110);
    const fetchDataDemo = async () => {
        try {
            const response = await fetch(host + "api/posts");
            const jsonData = await response.json();
            if (jsonData) {
                rowsData(jsonData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchDataDemo();
    }, []);
    const [isSpinning, setIsSpinning] = useState(false);

    const handleReload = () => {
        setIsSpinning(true);
        setTimeout(() => {
            setIsSpinning(false);
            window.location.reload();
        }, 500);
    };
    const columns = [
        { field: "id", headerName: "STT", width: 70, editable: false },
        {
            field: "title",
            headerName: "Tên Bài Viết",
            width: 450,
            align: "left",
            headerAlign: "left",
            editable: false,
        },
        {
            field: "description",
            headerName: "Mô Tả",
            width: 300,
            align: "left",
            headerAlign: "left",
            editable: false,
        },
        {
            field: "content",
            headerName: "Nội Dung",
            width: 400,
            align: "left",
            headerAlign: "left",
            editable: false,
        },
        {
            field: "image_post",
            headerName: "Hình Ảnh",
            width: 200,
            align: "left",
            headerAlign: "center",
            editable: false,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.image_post == "" ||
                        params.row.image_post == null ? (
                            <p className="italic text-red-500 ">
                                Vui lòng thêm hình bài viết
                            </p>
                        ) : (
                            <Button
                                className="flex flex-row w-32 h-32 p-1 m-1 bg-white border border-green-500"
                                // onClick={() => handleDetailImg(item)}
                            >
                                <img
                                    className="w-32 h-32"
                                    src={host + params.row.image_post}
                                    alt={params.row.title}
                                />
                            </Button>
                        )}
                    </>
                );
            },
        },
        {
            field: "name_author",
            headerName: "Tác Giả",
            width: 200,
            align: "left",
            headerAlign: "left",
            editable: false,
        },
        {
            field: "action",
            headerName: "Chức Năng",
            width: 180,
            editable: false,
            renderCell: (params) => {
                const [editTextPost, setEditTextPost] = useState(
                    params.row.content
                );
                const [editPost, setEditPost] = useState(params.row);
                const [selectedFiles, setSelectedFiles] = useState([]);
                const [previewImages, setPreviewImages] = useState([]);
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    setEditPost((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                };
                const handleFileChange = (e) => {
                    const files = Array.from(e.target.files);
                    console.log(files);
                    setSelectedFiles(files);
                    const previews = files.map((file) =>
                        URL.createObjectURL(file)
                    );
                    setPreviewImages(previews);
                };
                const editorRef = useRef(null);
                const [openEditPost, setOpenEditPost] = useState(false);
                const handleOpenEdit = () => setOpenEditPost(!openEditPost);
                const handleBanNhap = async () => {
                    if (editorRef.current) {
                        const newTextPost = editorRef.current.getContent();
                        setEditTextPost(newTextPost);
                    }
                };
                const handleSave = async () => {
                    if (editorRef.current) {
                        const newTextPost = editorRef.current.getContent();
                        // const formData = new FormData();
                        // formData.append("id_post", editPost.id);
                        // formData.append("title", editPost.title);
                        // formData.append("description", editPost.description);
                        // formData.append("image_post", selectedFiles);
                        // formData.append("content", newTextPost);
                        // formData.append("author", auth.user.name);
                        // try {
                        //     const response = await fetch(
                        //         `${host}${apiPost}/${editPost.id}`,
                        //         {
                        //             method: "PUT",
                        //             headers: {
                        //                 Accept: "application/json",
                        //                 "Content-Type": "application/json",
                        //             },
                        //             mode: "no-cors",
                        //             body: formData,
                        //         }
                        //     );
                        //     if (response.status === 200) {
                        //         // newSocket.emit("addWorkTo_Server", formData);
                        //         // handleOpen();
                        //         setEditTextPost(newTextPost);
                        //         console.log(formData);
                        //     }
                        // } catch (error) {
                        //     console.log(error);
                        // }
                        const myHeaders = new Headers();
                        myHeaders.append(
                            "Content-Type",
                            "application/x-www-form-urlencoded"
                        );

                        const urlencoded = new URLSearchParams();
                        urlencoded.append("id_post", editPost.id);
                        urlencoded.append("title", editPost.title);
                        urlencoded.append("description", editPost.description);
                        urlencoded.append("image_post", selectedFiles[0]);
                        selectedFiles.forEach((file, index) => {
                            urlencoded.append(`image_post`, file);
                        });
                        urlencoded.append("content", newTextPost);
                        urlencoded.append("author", auth.user.name);
                        const requestOptions = {
                            method: "PUT",
                            headers: myHeaders,
                            body: urlencoded,
                            redirect: "follow",
                        };

                        fetch(
                            `${host}${apiPost}/${editPost.id}`,
                            requestOptions
                        )
                            .then((response) => response.text())
                            .then((result) => console.log(result))
                            .catch((error) => console.error(error));
                    }
                };

                return (
                    <>
                        <div className="gap-1 p-2">
                            <Button
                                className="py-2 mr-1"
                                color="green"
                                variant="outlined"
                                onClick={handleOpenEdit}
                            >
                                Sửa
                            </Button>
                            <Button
                                className="py-2"
                                color="red"
                                variant="outlined"
                            >
                                Xóa
                            </Button>
                        </div>
                        <Dialog
                            open={openEditPost}
                            handler={handleOpenEdit}
                            size="xl"
                        >
                            <DialogHeader id="EditPostDialog">
                                Chỉnh Sửa Bài Viết
                            </DialogHeader>
                            <DialogBody divider className="grid grid-cols-4">
                                <div
                                    className={`h-[${height}px] rounded-xl m-2 text-center col-span-3`}
                                >
                                    <Editor
                                        onInit={(evt, editor) =>
                                            (editorRef.current = editor)
                                        }
                                        apiKey="tpgm94lyliuvm1rcrh8auttn458kh1pnwq9qwbz5wru7jbz4"
                                        initialValue={editTextPost}
                                        onChange={(e) =>
                                            setEditTextPost(e.target.value)
                                        }
                                        className={{ height: "400px" }}
                                        height={150}
                                        init={{
                                            plugins:
                                                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                                            toolbar:
                                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                                            tinycomments_mode: "embedded",
                                            tinycomments_author: "Author name",
                                            menubar: "none",
                                            ai_request: (
                                                request,
                                                respondWith
                                            ) =>
                                                respondWith.string(() =>
                                                    Promise.reject(
                                                        "See docs to implement AI Assistant"
                                                    )
                                                ),
                                        }}
                                    />
                                </div>
                                <Card className={` rounded-xl m-2`}>
                                    <div className="p-2">
                                        <Input
                                            label="Tiêu Đề"
                                            id="title"
                                            name="title"
                                            className="shadow-none"
                                            value={editPost.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <Input
                                            label="Mô Tả"
                                            className="shadow-none"
                                            id="description"
                                            name="description"
                                            value={editPost.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="gap-1 p-2">
                                        <img
                                            className="w-16"
                                            src={host + editPost.image_post}
                                            alt=""
                                        />
                                        <div className="text-left">
                                            <span className="mb-4 underline">
                                                Chọn hình ảnh thực tế
                                            </span>
                                            <input
                                                id="imgPost"
                                                type="file"
                                                onChange={handleFileChange}
                                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                                            />
                                        </div>
                                    </div>
                                    <Card
                                        className={`h-full mt-2 border border-green-500 rounded-md `}
                                    >
                                        <Typography
                                            variant="h5"
                                            className="italic underline"
                                        >
                                            Bản Nháp
                                        </Typography>
                                        <div className="grid items-center justify-between grid-cols-4 m-3 border border-green-500 ">
                                            <div className="col-span-3 pl-2 text-left">
                                                <p>
                                                    <span className="pr-2 italic underline">
                                                        Tiêu Đề:
                                                    </span>
                                                    {editPost.title == ""
                                                        ? "Chưa nhập"
                                                        : editPost.title}
                                                </p>
                                                <p>
                                                    <span className="pr-2 italic underline">
                                                        Mô Tả:
                                                    </span>
                                                    {editPost.des == ""
                                                        ? "Chưa nhập"
                                                        : editPost.description}
                                                </p>
                                            </div>
                                            <div>
                                                {previewImages ===
                                                    "undefined" ||
                                                !previewImages ? (
                                                    <p className="text-blue-500 ">
                                                        Chưa thêm hình ảnh
                                                    </p>
                                                ) : (
                                                    previewImages.map(
                                                        (preview, index) => (
                                                            <img
                                                                className="w-32 h-32 p-3"
                                                                key={index}
                                                                src={preview}
                                                                alt={`Preview ${index}`}
                                                            />
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`overflow-scroll h-[200px] `}
                                        >{`${
                                            editTextPost == "undefined"
                                                ? "Chưa có dữ liệu"
                                                : editTextPost
                                        }`}</div>
                                        <div className="grid grid-cols-2">
                                            <Button
                                                variant="outlined"
                                                className="py-2 m-2 text-center hover:bg-blue-500 hover:text-white"
                                                color="blue"
                                                onClick={handleBanNhap}
                                            >
                                                Bản Nháp
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                className="py-2 m-2 text-center hover:bg-green-500 hover:text-white"
                                                color="green"
                                                onClick={handleSave}
                                            >
                                                Lưu
                                            </Button>
                                        </div>
                                    </Card>
                                </Card>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpenEdit}
                                    className="mr-1"
                                >
                                    <span>Thoát</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleOpenEdit}
                                >
                                    <span>Cập Nhật</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                );
            },
        },
    ];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Post App - Công ty Thợ Việt" />
            <div className={`h-screen gap-2 p-2`}>
                <Card
                    className={`flex flex-row items-center justify-between m-2 text-center rounded-xl`}
                >
                    {/* <div className="h-8 px-0 py-0 w-72 "> */}
                    <Typography className="p-2 font-bold uppercase">
                        Post App - Công ty TNHH Dịch vụ kỹ thuật thợ việt
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
                <Card
                    className={`flex flex-row items-center justify-between m-2 px-2 text-center rounded-xl`}
                >
                    <Typography className="p-2 font-bold uppercase">
                        Danh Sách Bài Viết
                    </Typography>
                    <div className="flex flex-row justify-between">
                        <Tooltip content="Tải Lại Trang">
                            <ArrowPathIcon
                                className={`w-8 h-8 mr-3 text-green-500 cursor-pointer ${
                                    isSpinning ? "spin" : ""
                                }`}
                                onClick={handleReload}
                            />
                        </Tooltip>

                        <Tooltip content="Thêm Bài Viết">
                            <a
                                href={route("admin/create-post")}
                                target="_blank"
                            >
                                <PlusCircleIcon className="w-8 h-8 cursor-pointer" />
                            </a>
                        </Tooltip>
                    </div>
                </Card>
                <Card className={`m-2 px-2 text-center rounded-xl`}>
                    <Box
                        sx={{
                            height: height,
                        }}
                    >
                        <DataGrid
                            sx={{
                                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
                                    {
                                        outline: "none !important",
                                    },
                                ".css-wop1k0-MuiDataGrid-footerContainer": {
                                    display: "none !important",
                                },
                            }}
                            autoHeight
                            rows={rows}
                            columns={columns}
                            hideFooterPagination={true}
                            rowHeight={40}
                            disableRowSelectionOnClick
                            // slots={{
                            //     columnHeaders: () => null,
                            // }}
                        />
                    </Box>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

export default PostList;
