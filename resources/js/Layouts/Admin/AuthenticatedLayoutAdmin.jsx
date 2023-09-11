import SidebarAdmin from '@/Components/Sidebar/SidebarAdmin';

export default function Authenticated({children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <SidebarAdmin />
            <main className='w-full'>{children}</main>

        </div>
    );
}
