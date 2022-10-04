import { createContext, useState } from "react";
import { useSessionStorage } from "../utils/session/session-storage";


export const UserContext = createContext({
    user: null,
    setUser: ()=>{},
    setToken: ()=> {},
    isIconOpen: false,
    setIsIconOpen: ()=>{},
    isAuthenticated: false,
    setIsAuthenticated: ()=> {}
})


export const UserProvider = ({children})=>{
    const [token, setToken] = useSessionStorage('token', '');
    const [user, setUser] = useSessionStorage('user', null);
    const [isIconOpen, setIsIconOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useSessionStorage('authenticated', false)
    const value = { token, user, setUser, setToken,isIconOpen, setIsIconOpen, isAuthenticated, setIsAuthenticated}


    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )

}

