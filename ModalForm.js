import { useState } from "react";
import postForm from "./postForm";
export default function ModalForm({ data, closeModal }) {
    console.log("modalData", data);
    const [name, setName] = useState(data.name);
    const [contact, setContact] = useState(data.contact);
    const [pass, setPass] = useState(data.password);
    const [city, setCity] = useState(data.city);
    function handleSubmit() {
        postForm("http://localhost:5000/updateDetails", {
            name,
            contact,
            city,
            pass,
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
                <h1>Update Current Details</h1>
                <div className="input-container">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        className="form-container-item"
                        placeholder="New Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Contact</label>
                    <input
                        type="text"
                        value={contact}
                        className="form-container-item"
                        placeholder="New Contact"
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>City</label>
                    <input
                        type="text"
                        value={city}
                        className="form-container-item"
                        placeholder="New City"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={pass}
                        className="form-container-item"
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>
                <button type="submit" className="form-container-item">
                    Submit
                </button>
            </form>
        </div>
    );
}
