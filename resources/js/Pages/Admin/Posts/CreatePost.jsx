import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import React, { useEffect, useRef } from "react";
import { Head } from "@inertiajs/react";
import {
    Card,
    Typography,
    Avatar,
    Tooltip,
    Input,
    Button,
    Textarea,
} from "@material-tailwind/react";
import Box from "@mui/material/Box";
import {
    UsersIcon,
    BellAlertIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import useWindowSize from "@/Core/Resize";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import FileInput from "@/Components/FileInputImage";
import { host, apiPost } from "@/Utils/UrlApi";
import newSocket from "@/Utils/Socket";
import parse from "html-react-parser";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function CreatePost({auth}) {
    const [textPost, setTextPost] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [post, setPost] = useState({
        title: "",
        des: "",
    });
    useEffect(() => {
        return () => {
            newSocket.disconnect();
        };
    }, []);
    const editorRef = useRef(null);
    console.log(auth);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);
    };
    const handleSave = async () => {
        if (editorRef.current) {
            const newTextPost = editorRef.current.getContent();
            const formData = new FormData();
            formData.append("title", post.title);
            formData.append("description", post.des);
            formData.append("image_path", selectedFiles);
            formData.append("content", newTextPost);
            formData.append("author", auth.user.name);
            try {
                const response = await fetch(host + apiPost, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    mode: "no-cors",
                    body: formData,
                });
                setTextPost(newTextPost);
                if (response.status === 200) {
                    newSocket.emit("addWorkTo_Server", formData);
                    // handleOpen();
                    console.log(formData);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleBanNhap = async () => {
        if (editorRef.current) {
            const newTextPost = editorRef.current.getContent();
            setTextPost(newTextPost);
        }
    };
    const { width, height } = useWindowSize(65);


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Post App - Công ty Thợ Việt" />
            <div className={`p-1 h-[${height}]px`}>
                <Card
                    className={`flex flex-row items-center justify-between m-2 px-2 text-center rounded-xl`}
                >
                    <Typography className="p-2 font-bold uppercase">
                        Tạo Bài Viết Mới
                    </Typography>
                </Card>
                <Box sx={{ height: height, width: 1 }}>
                    <div
                        className={`h-[${height}px] rounded-xl my-2 text-center grid grid-cols-4`}
                    >
                        <Card
                            className={`h-[${height}px] rounded-xl m-2 text-center col-span-3`}
                        >
                            {/* <CKEditor
                                editor={ClassicEditor}
                                data={textPost}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    setTextPost(data);
                                }}
                            /> */}
                            <Editor
                                onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                }
                                apiKey="tpgm94lyliuvm1rcrh8auttn458kh1pnwq9qwbz5wru7jbz4"
                                initialValue={textPost}
                                onChange={(e) => setTextPost(e.target.value)}
                                className={{ height: `${height}px` }}
                                init={{
                                    plugins:
                                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                                    toolbar:
                                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                                    tinycomments_mode: "embedded",
                                    tinycomments_author: "Author name",
                                    menubar: "none",
                                    ai_request: (request, respondWith) =>
                                        respondWith.string(() =>
                                            Promise.reject(
                                                "See docs to implement AI Assistant"
                                            )
                                        ),
                                }}
                            />
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
                        <Card className={`h-[${height}px] rounded-xl m-2`}>
                            <div className="p-2">
                                <Input
                                    label="Tiêu Đề"
                                    id="title"
                                    name="title"
                                    className="shadow-none"
                                    value={post.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="p-2">
                                <Input
                                    label="Mô Tả"
                                    className="shadow-none"
                                    id="des"
                                    name="des"
                                    value={post.des}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="gap-1 p-2">
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
                                <Card className="mt-2 border border-green-500 rounded-md">
                                    <Typography
                                        variant="h4"
                                        className="italic underline"
                                    >
                                        Bản Nháp
                                    </Typography>
                                    <div className="grid items-center justify-between grid-cols-4 m-3 border border-green-500">
                                        <div className="col-span-3 pl-2 text-left">
                                            <p>
                                                <span className="pr-2 italic underline">
                                                    Tiêu Đề:
                                                </span>
                                                {post.title == ""
                                                    ? "Chưa nhập"
                                                    : post.title}
                                            </p>
                                            <p>
                                                <span className="pr-2 italic underline">
                                                    Mô Tả:
                                                </span>
                                                {post.des == ""
                                                    ? "Chưa nhập"
                                                    : post.des}
                                            </p>
                                        </div>
                                        <div>
                                            {previewImages === "undefined" ||
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
                                    <>{`${
                                        textPost == "undefined"
                                            ? "Chưa có dữ liệu"
                                            : textPost
                                    }`}</>
                                </Card>
                            </div>
                        </Card>
                    </div>
                </Box>
            </div>
        </AuthenticatedLayout>
    );
}

export default CreatePost;
