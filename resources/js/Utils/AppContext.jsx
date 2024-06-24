import React, { createContext, useState ,useEffect} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState('');
    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         const confirmationMessage =
    //             "Bạn có chắc chắn muốn rời khỏi trang này?";
    //         event.returnValue = confirmationMessage; // Gecko + IE
    //         return confirmationMessage; // Webkit, Safari, Chrome etc.
    //     };
    //     window.addEventListener("beforeunload", handleBeforeUnload);
    //     // Cleanup function to remove the event listener on component unmount
    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);
    return (
        <AppContext.Provider value={{ sharedData, setSharedData }}>
            {children}
        </AppContext.Provider>
    );
};
