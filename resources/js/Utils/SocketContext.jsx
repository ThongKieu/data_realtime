import React, { createContext, useContext, useState, useEffect } from "react";
import newSocket from "@/Utils/Socket"; // Đường dẫn tới file socket của bạn


const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    // const [userLeavingPage, setUserLeavingPage] = useState(false);

    // const handleBeforeUnload = (event) => {
    //     setUserLeavingPage(true);
    //     event.preventDefault();
    //     newSocket.emit('disconnect', 'Kết thúc phiên');
    //     newSocket.disconnect();
    // };

    useEffect(() => {
        setSocket(newSocket, { secure: true });

        // window.addEventListener('beforeunload', handleBeforeUnload);

        // return () => {
        //     window.removeEventListener('beforeunload', handleBeforeUnload);
        //     if (userLeavingPage) {
        //         newSocket.disconnect();
        //     }
        // };
    }, [newSocket]);
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 123) {
                const htmlContent = "Dừng Lại Ngay";
                const htmlProFile = "Công Ty TNHH Kỹ Thuật Thợ Việt - Chuyên cung cấp các dịch vụ - sửa chữa - lắp đặt điện lạnh - điện nước - xây dựng - đồ gỗ ";
                console.log(
                    "%c" + htmlProFile,
                    "font-size: 20px; color: yellow;"
                );
                console.log(
                    "%c" + htmlContent,
                    "font-size: 40px; color: red;"
                );

            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <SocketContext.Provider value={socket }>
            {children}
        </SocketContext.Provider>
    );
};
