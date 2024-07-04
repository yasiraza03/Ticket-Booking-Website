import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./successModal.css";

export default function SuccessModal({ to, message }) {
    const navigate = useNavigate();
    return (
        <div className="modal center direction">
            <div className="modal-content tick center">
                <BsFillCheckCircleFill size={100} />
            </div>
            <div className="modal-content message center">
                <h1>Great!</h1>
                <p>{message}</p>
                <button className="ok-btn" onClick={() => navigate(to)}>
                    OK
                </button>
            </div>
        </div>
    );
}
