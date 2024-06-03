import React, { createContext, useContext, useState, useEffect } from 'react';
import newSocket from "@/Utils/Socket"; // Đường dẫn tới file socket của bạn

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // const socketInstance = newSocket({ secure: true });
        setSocket(newSocket, { secure: true });
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
