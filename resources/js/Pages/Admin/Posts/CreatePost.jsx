import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import React, { useEffect, useRef } from "react";
import { Head } from "@inertiajs/react";
import {
    Card,
    Typography,
    Avatar,
    Tooltip,
    Button,
    Textarea,
} from "@material-tailwind/react";
import {
    UsersIcon,
    BellAlertIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import useWindowSize from "@/core/resize";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
function CreatePost(auth) {
    const hResize = useWindowSize();
    const heightBoxPost = hResize.height - 30;
    const [textPost, setTextPost] = useState('');
    const editorRef = useRef(null);

    const handleSave = async () => {
      if (editorRef.current) {
        const newTextPost = editorRef.current.getContent();
        console.log(newTextPost);
        // setTextPost(newTextPost);
    //     try {
    //       // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
    //       const response = await fetch('YOUR_API_ENDPOINT', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ textPost: newTextPost }),
    //       });

    //       if (response.ok) {
    //         console.log('Data successfully sent to the API');
    //       } else {
    //         console.error('Failed to send data to the API:', response.statusText);
    //       }
    //     } catch (error) {
    //       console.error('Error sending data to the API:', error);
    //     }
      }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Post App - Công ty Thợ Việt" />
            <div className={`h-screen gap-2 p-2`}>
                <Card
                    className={`flex flex-row items-center justify-between m-2 px-2 text-center rounded-xl`}
                >
                    <Typography className="p-2 font-bold uppercase">
                        Tạo Bài Viết Mới
                    </Typography>
                </Card>
                <Card className={`h-[${heightBoxPost}px] rounded-xl m-2 text-center`}>
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        apiKey="tpgm94lyliuvm1rcrh8auttn458kh1pnwq9qwbz5wru7jbz4"
                        initialValue={textPost}
                        onChange={(e) => setTextPost(e.target.value)}
                        init={{
                            plugins:
                                "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                            toolbar:
                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            mergetags_list: [
                                { value: "First.Name", title: "First Name" },
                                { value: "Email", title: "Email" },
                            ],
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
            </div>
        </AuthenticatedLayout>
    );
}

export default CreatePost;
