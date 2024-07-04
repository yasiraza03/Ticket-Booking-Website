import { useState } from "react";
import postForm from "./postForm";

export default function EventModal({ data, closeModal }) {
    const [name, setName] = useState(data.name);
    const [organizer, setOrganizer] = useState(data.organizer);
    const [time, setTime] = useState(data.time);
    const [date, setDate] = useState(data.date);
    const [available, setAvailable] = useState(data.available);

    function handleSubmit() {
        postForm("http://localhost:5000/updateEvent", {
            name,
            organizer,
            time,
            date,
            available,
            id: data.id,
        });
    }
    return (
        <div className="modal form-container-parent">
            <form
                onSubmit={handleSubmit}
                className="modal-content form-container"
            >
                <button
                    className="close-button close-button-add"
                    onClick={() => closeModal(false)}
                    type="button"
                >
                    X
                </button>
                <h1>Update Event Details</h1>
                <div className="input-container">
                    <label>Event Name</label>
                    <input
                        type="text"
                        value={name}
                        className="form-container-item"
                        placeholder="New Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Organizer</label>
                    <input
                        type="text"
                        value={organizer}
                        className="form-container-item"
                        placeholder="New Contact"
                        onChange={(e) => setOrganizer(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Available</label>
                    <input
                        type="number"
                        value={available}
                        className="form-container-item"
                        placeholder="Available Tickets"
                        min={1}
                        onChange={(e) => setAvailable(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        className="form-container-item"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Time</label>
                    <input
                        type="time"
                        value={time}
                        className="form-container-item"
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <button type="submit" className="form-container-item">
                    Submit
                </button>
            </form>
        </div>
    );
}
