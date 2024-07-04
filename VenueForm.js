import { useState, useContext } from "react";
import postForm from "./postForm";
import AuthContext from "./AuthProvider";
import Navbar from "./Navbar";
import SuccessModal from "./SuccessModal";
import Footer from "./Footer";

export default function VenueForm() {
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        postForm("http://localhost:5000/addVenue", {
            name,
            city,
            address,
            id: auth.id,
        }).then((data) => {
            console.log(data);
            setSuccess(true);
        });
    }
    return (
        <div className="form-wrapper">
            <Navbar />
            <div className="form-container-parent">
                <form onSubmit={handleSubmit} className="form-container">
                    <h1 style={{ marginBottom: "20px" }}>Add Venue</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="venue Name"
                        pattern="[a-zA-Z]+"
                        required
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="Address"
                        required
                    />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="City"
                        pattern="[a-zA-Z]+"
                        required
                    />
                    <button type="submit" className="form-container-item">
                        Submit
                    </button>
                </form>
            </div>
            {success && (
                <SuccessModal
                    to={"/"}
                    message={
                        "Your Venue has been recorded and will be posted after an Admin's Approval"
                    }
                />
            )}
            <Footer />
        </div>
    );
}
