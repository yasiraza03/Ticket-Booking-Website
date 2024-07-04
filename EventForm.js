import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postForm from "./postForm";
import AuthContext from "./AuthProvider";
import Navbar from "./Navbar";
import SuccessModal from "./SuccessModal";
import Footer from "./Footer";

export default function EventForm() {
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [venue, setVenue] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [standard, setStandard] = useState("");
    const [premium, setPremium] = useState("");
    const [vip, setVip] = useState("");
    const [capacity, setCapacity] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [optn, setOptn] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:5000/getVenues?approved=1")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOptn(data);
            });
    }, []);
    function handleSubmit(event) {
        event.preventDefault();
        postForm("http://localhost:5000/admin/addEvent", {
            name,
            venue,
            organizer,
            standard,
            premium,
            vip,
            capacity,
            time,
            date,
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
                    <h1 style={{ marginBottom: "20px" }}>Add Event</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="Event Name"
                        pattern="[a-zA-Z]+"
                        required
                    />
                    <select
                        onChange={(e) => {
                            if (e.target.value !== "0") {
                                setVenue(e.target.value);
                                return;
                            }
                            console.log("here");
                            navigate("/addVenue");
                        }}
                        className="form-container-item"
                    >
                        <option>----Choose Venue----</option>
                        {optn &&
                            optn.map((venueElement) => {
                                return (
                                    <option
                                        value={venueElement.venue_id}
                                        key={venueElement.venue_id}
                                    >
                                        {venueElement.venue_name}
                                    </option>
                                );
                            })}
                        <option value={0}>Add New Venue</option>
                    </select>
                    <input
                        type="text"
                        value={organizer}
                        onChange={(e) => {
                            setOrganizer(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="Organizer"
                        pattern="[a-zA-Z]+"
                        required
                    />
                    <input
                        type="number"
                        value={standard}
                        onChange={(e) => {
                            setStandard(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder=" Standard Ticket Price"
                        min="100"
                        required
                    />
                    <input
                        type="number"
                        value={premium}
                        onChange={(e) => {
                            setPremium(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="Premium Ticket Price"
                        min="100"
                        required
                    />
                    <input
                        type="number"
                        value={vip}
                        onChange={(e) => {
                            setVip(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="VIP Ticket Price"
                        min="100"
                        required
                    />
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => {
                            setCapacity(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="Available Capacity"
                        min="10"
                        required
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="Time"
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                        className="form-container-item"
                        placeholder="Date"
                        min="2022-12-08"
                        required
                    />
                    <button type="submit" className="form-container-item">
                        Submit
                    </button>
                </form>
            </div>
            {success && (
                <SuccessModal
                    to={"/dashboard"}
                    message={
                        "Your event has been recorded and will be posted after an Admin's Approval"
                    }
                />
            )}
            <Footer />
        </div>
    );
}
