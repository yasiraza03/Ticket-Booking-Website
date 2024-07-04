import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});
export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [update, setUpdate] = useState(false);
    return (
        <AuthContext.Provider value={{ auth, setAuth, update, setUpdate }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;
