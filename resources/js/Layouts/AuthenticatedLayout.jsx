import FloatingButton from "@/Components/Navbar/FloatingButton";
import NavbarDefault from "@/Components/Navbar/Navbar";
import React, { memo, createContext, useState, useEffect } from "react";
import newSocket from "@/Utils/Socket";

export const SocketContext = new createContext();

const Authenticated = ({
    children,
    user,
    checkDate,
    data_Work,
    data_Work_Assign,
}) => {
    const [socketAuth, setSocketAuth] = useState(null);

    useEffect(() => {
        setSocketAuth(newSocket);
        return () => {
            newSocket.close(); // Đóng kết nối socket khi component bị unmounted
        };
    }, []);

    return (
        <SocketContext.Provider value={socketAuth}>
            <div className="min-h-screen bg-gray-100">
                <NavbarDefault
                    propauth={user}
                    check={checkDate}
                    data_Work={data_Work}
                    data_Work_Assign={data_Work_Assign}
                    socket_Card={socketAuth}
                />
                <main>{children}</main>
                <div className="fixed bottom-2 right-2">
                    <FloatingButton />
                </div>
            </div>
        </SocketContext.Provider>
    );
};

export default memo(Authenticated);
