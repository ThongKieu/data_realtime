import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState('');

    return (
        <AppContext.Provider value={{ sharedData, setSharedData }}>
            {children}
        </AppContext.Provider>
    );
};
