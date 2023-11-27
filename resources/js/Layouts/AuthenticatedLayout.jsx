import FloatingButton from "@/Components/Navbar/FloatingButton";
import NavbarDefault from "@/Components/Navbar/Navbar";
import { memo } from "react";


function Authenticated({ children, user}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavbarDefault  propauth={user} />
            <main >{children}</main>
            <div className='fixed bottom-2 right-2'>
                <FloatingButton />
            </div>
        </div>
    );
}
export default  memo(Authenticated);
