import NavbarDefault from '@/Components/nav/Admin/NavAdmin';

export default function Authenticated({children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavbarDefault />
            <main>{children}</main>

        </div>
    );
}
