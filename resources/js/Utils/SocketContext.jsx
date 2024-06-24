import React, { createContext, useContext, useState, useEffect } from "react";
import newSocket from "@/Utils/Socket"; // Đường dẫn tới file socket của bạn

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = newSocket({ secure: true });
        setSocket(socketInstance);
        return () => {
            socketInstance.close();
        };
    }, []); // Sử dụng mảng rỗng để chỉ chạy một lần khi component mount
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 123) {
                const htmlContent = "Dừng Lại Ngay";
                const htmlProFile =
                    "Công Ty TNHH Kỹ Thuật Thợ Việt - Chuyên cung cấp các dịch vụ - sửa chữa - lắp đặt điện lạnh - điện nước - xây dựng - đồ gỗ ";
                console.log(
                    "%c" + htmlProFile,
                    "font-size: 20px; color: yellow;"
                );
                console.log("%c" + htmlContent, "font-size: 40px; color: red;");
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
