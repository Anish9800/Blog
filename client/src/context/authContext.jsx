import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (payload) => {
        const res = await axios.post("auth/login",payload, { withCredentials: true })
        setCurrentUser(res.data)
    }

    const logout = async (payload) => {
        const res = await axios.post("auth/logout",{}, { withCredentials: true })
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}