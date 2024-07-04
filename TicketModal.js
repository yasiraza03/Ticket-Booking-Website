import { useState } from "react";
import postForm from "./postForm.js";
import "./ticketModal.css";

export default function TicketModal({ data, set }) {
    console.log(data);
    const [count, setCount] = useState(data.count);
    function handleSubmit() {
        data.newCount = data.count - count;
        postForm("http://localhost:5000/updateTicket", data).then((data) => {
            console.log(data);
        });
        window.location.reload();
    }
    return (
        <div className="modal form-container-parent">
            <div className="counter modal-content form-container ticket-modal">
                <button
                    className="close-button"
                    onClick={() => {
                        set(false);
                    }}
                >
                    X
                </button>
                <span style={{ fontSize: "1.5rem" }}>{data.name}:</span>
                <span>
                    <button
                        onClick={() => {
                            count > 0 && setCount(count - 1);
                        }}
                    >
                        -
                    </button>
                </span>
                <span style={{ fontSize: "2rem" }}>{count}</span>
                <span>
                    <button
                        onClick={() => {
                            count < data.count && setCount(count + 1);
                        }}
                    >
                        +
                    </button>
                </span>
                <button onClick={handleSubmit}>OK</button>
            </div>
        </div>
    );
}
