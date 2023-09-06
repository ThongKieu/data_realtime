import FloatingButton from "@/Components/nav/floatingButton";
import NavbarDefault from "@/Components/nav/nav";


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
