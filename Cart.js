import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import postForm from "./postForm";
import AuthContext from "./AuthProvider";

export default function Cart({ eventData, count, type, closeCart }) {
    const { auth, setUpdate, update } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log("from cart", eventData);
    const handleSubmit = () => {
        if (auth.role !== "customer") {
            alert("You need to login as Customer to buy tickets");
            return;
        }
        const amount = eventData[type] * count;
        const data = {
            user_id: auth.id,
            event_id: eventData.event_id,
            count: count,
            number: eventData.number,
            amount: amount,
            type: type,
        };
        postForm("http://localhost:5000/addTicket", data).then((data) =>
            console.log(data)
        );
        setUpdate(!update);
        navigate("/getEvents");
    };
    return (
        <div className="modal center">
            <div className="modal-content cart center">
                <p>Your total: {count * eventData[type]}</p>
                <button onClick={handleSubmit} className="cart-btn">
                    Confirm Order
                </button>
                <button className="cart-btn" onClick={() => closeCart(false)}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
