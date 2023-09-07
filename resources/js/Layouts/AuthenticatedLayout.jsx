import FloatingButton from "@/Components/Navbar/FloatingButton";
import NavbarDefault from "@/Components/Navbar/Navbar";


function Authenticated({ children, user}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavbarDefault propAuth={user}/>
            <main >{children}</main>
            <div className='fixed bottom-2 right-2'>
                <FloatingButton />
            </div>
        </div>
    );
}
export default  Authenticated;
