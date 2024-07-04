import { useState } from "react";
import postForm from "./postForm";
import Navbar from "./Navbar";
import SuccessModal from "./SuccessModal";
import Footer from "./Footer";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [role, setRole] = useState("customer");
    const [success, setSuccess] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        postForm("http://localhost:5000/register", {
            name,
            email,
            pass,
            city,
            contact,
            role,
        }).then((data) => {
            console.log(data);
            if (!data?.error) {
                setSuccess(true);
            } else {
                alert("Email already taken.Try again");
            }
        });
    }
    return (
        <div className="form-wrapper">
            <Navbar />
            <div className="form-container-parent">
                <form onSubmit={handleSubmit} className="form-container">
                    <h1 style={{ marginBottom: "3rem" }}>Registration</h1>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        pattern="[a-zA-Z]+"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required
                        className="form-container-item"
                    />
                    <input
                        placeholder="City"
                        type="text"
                        pattern="[a-zA-Z]+"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                        required
                        className="form-container-item"
                    />
                    <input
                        placeholder="Contact"
                        type="tel"
                        minLength="11"
                        maxLength="11"
                        value={contact}
                        onChange={(e) => {
                            setContact(e.target.value);
                        }}
                        required
                        className="form-container-item"
                    />
                    <select
                        onChange={(event) => {
                            setRole(event.target.value);
                        }}
                        className="form-container-item"
                    >
                        <option value="customer">Customer</option>
                        <option value="organizer">Organizer</option>
                    </select>
                    <input
                        type="email"
                        placeholder="New Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                        className="form-container-item"
                    />
                    <input
                        placeholder="New Password"
                        type="password"
                        value={pass}
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                        required
                        className="form-container-item"
                    />
                    <button type="submit" className="form-container-item">
                        Submit
                    </button>
                </form>
            </div>
            {success && (
                <SuccessModal
                    to={"/getEvents"}
                    message={"Your account has been Created"}
                />
            )}
            <Footer />
        </div>
    );
}
