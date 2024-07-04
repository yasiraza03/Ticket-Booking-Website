import { useState, useContext } from "react";
import AuthContext from "./AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import postForm from "./postForm";
import { CgProfile } from "react-icons/cg";
import Footer from "./Footer";

export default function Login() {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [test, setTest] = useState("");
    const location = useLocation();
    let from = "/dashboard",
        passed_data;
    if (location.state) {
        from = location.state.from.pathname;
        passed_data = location.state;
    }
    function handleSubmit(event) {
        event.preventDefault();
        postForm("http://localhost:5000/login", { email, pass }).then(
            (data) => {
                console.log(data);
                setAuth(data);
                sessionStorage.setItem("loginData", JSON.stringify(data));
                if (data.id) {
                    navigate(from, { replace: true, state: passed_data });
                }
            }
        );
    }
    return (
        <div className="form-wrapper">
            <Navbar />
            <div className="form-container-parent">
                <form onSubmit={handleSubmit} className="form-container">
                    <CgProfile size={70} style={{ marginBottom: "3.5rem" }} />
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="form-container-item"
                        required
                    />
                    <input
                        type="password"
                        value={pass}
                        placeholder="Enter Password"
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                        className="form-container-item"
                        required
                    />
                    <button type="submit" className="form-container-item">
                        Submit
                    </button>
                    <div style={{ marginTop: "30px" }}>
                        <span>New here? </span>
                        <Link to="/register" style={{ display: "inline" }}>
                            Sign up Now
                        </Link>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
