import AdminSidebar from "@/Components/Sidebar/AdminSidebar";
import SidebarAdmin from "@/Components/Sidebar/SidebarAdmin";

export default function Authenticated({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* <SidebarAdmin/> */}
            <AdminSidebar>
                <main className="w-full">{children}</main>
            </AdminSidebar>
        </div>
    );
}
