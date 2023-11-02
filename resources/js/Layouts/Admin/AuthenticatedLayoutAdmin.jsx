import AdminSidebar from "@/Components/Sidebar/AdminSidebar";
import React,{ useState} from 'react'
export default function Authenticated({ children }) {
    const [screenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const heightScreenTV = screenSize.height;
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar>
                <main className={`w-full h-[${heightScreenTV}px] bg-blue-gray-300` }>{children}</main>
            </AdminSidebar>
        </div>
    );
}
