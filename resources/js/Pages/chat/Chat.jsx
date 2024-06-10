import React, { useEffect, useState } from "react";
import newSocket from "@/Utils/Socket";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function Chat({ auth }) {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [chatContent, setChatContent] = useState([]);
    // useEffect(() => {
    //     setSocket(newSocket, { secure: true });
    //     return () => {
    //         newSocket.disconnect();
    //     };
    // }, []);
    // Trả giá trị về từ server
    useEffect(() => {
        if (socket) {
            socket.on("sendChatToClient", (message) => {
                setChatContent((prevChat) => [...prevChat, message]);
            });
        }
    }, [socket]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (socket) {
                socket.emit("sendChatToServer", message);
                setMessage("");
                console.log("Thu", message);
            }
        }
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Chat" />
            <div className="container mx-auto rounded-lg shadow-lg">
                {/* Chatting */}
                <div className="flex flex-row justify-between bg-white">
                    {/* Chat list */}
                    <div className="flex flex-col w-2/5 overflow-y-auto border-r-2">
                        {/* Search component */}
                        <div className="px-2 py-4 border-b-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                className="w-full px-2 py-2 border-2 border-gray-200 rounded-2xl"
                            />
                        </div>
                        {/* End Search component */}
                        {/* User list */}
                        <div className="flex flex-row items-center justify-center px-2 py-4 border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                    className="object-cover w-12 h-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">
                                    Luis1994
                                </div>
                                <span className="text-gray-500">
                                    Pick me at 9:00 AM
                                </span>
                            </div>
                        </div>
                        {/* ... Remaining user list items */}
                    </div>
                    {/* End Chat list */}
                    {/* Message */}
                    <div className="flex flex-col justify-between w-full px-5">
                        <div className="flex flex-col mt-5">
                            <div className="flex justify-end mb-4">
                                <div className="px-4 py-3 mr-2 text-white bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl">
                                    {message}
                                </div>
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover w-8 h-8 rounded-full"
                                    alt=""
                                />
                            </div>
                            {/* ... Remaining message items */}
                        </div>
                        <div className="py-5">
                            <input
                                className="w-full px-3 py-5 bg-gray-300 rounded-xl"
                                type="text"
                                placeholder="Viết gì đi bạn ơi!"
                                onBlur={handleKeyPress}
                            />
                        </div>
                    </div>
                    {/* End Message */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Chat;
