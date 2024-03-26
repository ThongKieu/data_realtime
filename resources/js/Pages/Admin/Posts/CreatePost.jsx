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
function CreatePost(auth) {
    const hResize = useWindowSize();
    const heightBoxPost = hResize.height - 30;
    const [textPost, setTextPost] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [post, setPost] = useState({
        title: "1",
        des: "1",
    });
    const editorRef = useRef(null);
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
            formData.append("image_post", selectedFiles);
            formData.append("content", newTextPost);
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
                if (response.status === 200) {
                    socketFTB.emit("addWorkTo_Server", formData);
                    // handleOpen();
                    console.log(formData);
                }
            } catch (error) {
                console.log(error);
            }
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
                <Box sx={{ height: { height }, width: 1 }}>
                    <div
                        className={`h-[${height}px] rounded-xl my-2 text-center grid grid-cols-4`}
                    >
                        <Card
                            className={`h-[${height}px] rounded-xl m-2 text-center col-span-3`}
                        >
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
                                        "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                                    toolbar:
                                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
                            <Button
                                variant="outlined"
                                className="py-2 m-2 text-center hover:bg-green-500 hover:text-white"
                                color="green"
                                onClick={handleSave}
                            >
                                Lưu
                            </Button>
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
                                <div className="h-full mt-2 border border-green-500">
                                    {previewImages === "undefined" ||
                                    !previewImages ? (
                                        <p className="text-blue-500 ">
                                            Chưa thêm hình ảnh
                                        </p>
                                    ) : (
                                        previewImages.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Preview ${index}`}
                                                style={{
                                                    width: "200px",
                                                    height: "auto",
                                                    margin: "5px",
                                                }}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                </Box>
            </div>
        </AuthenticatedLayout>
    );
}

export default CreatePost;
