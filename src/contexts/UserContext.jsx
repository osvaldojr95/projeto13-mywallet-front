import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState({});

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
export function useUser() {
    const context = useContext(UserContext);
    const { userInfo, setUserInfo } = context;
    return { userInfo, setUserInfo };
}