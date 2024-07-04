import { Outlet, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthProvider";
import { useContext, useState, useEffect } from "react";

export default function RequireAuth() {
    const { auth, setAuth } = useContext(AuthContext);
    const [proceed, setProceed] = useState(false);
    const location = useLocation();
    console.log(location);
    let data;
    if (location.state) {
        data = location.state;
        console.log(data);
    }
    let sessionData = sessionStorage.getItem("loginData");
    useEffect(() => {
        if (sessionData != null) {
            sessionData = JSON.parse(sessionData);
            console.log(sessionData);
            setAuth(sessionData);
        }
        setProceed(true);
    }, []);
    console.log(auth);
    const temp = { from: location, ...data };
    console.log("here is the temp", temp);
    return auth.id
        ? proceed && <Outlet />
        : proceed && (
              <Navigate
                  to="/login"
                  state={{ from: location, ...data }}
                  replace
              />
          );
}
