import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Cart from "./Cart";
import "./eventStyles.css";
import Footer from "./Footer";

export default function Event() {
    const [count, setCount] = useState(0);
    const [type, setType] = useState("standard");
    const [cart, setCart] = useState(false);
    const location = useLocation();
    const eventData = location.state;
    console.log(eventData);
    return (
        <div className="event-wrapper">
            <Navbar />
            <main className="event">
                <h1>Name</h1>
                <h2>{eventData.event_name}</h2>
                <h1>Venue</h1>
                <h2>{eventData.venue_name}</h2>
                <h1>Organizer</h1>
                <h2>{eventData.organizer}</h2>
                <h1>Time</h1>
                <h2>{eventData.time}</h2>
                <h1>Date</h1>
                <h2>{eventData.date}</h2>
                <h1>Price</h1>
                <select
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                >
                    <option value="standard">
                        Standard {eventData.standard} PKR
                    </option>
                    <option value="premium">
                        Premium {eventData.premium} PKR
                    </option>
                    <option value="vip">VIP {eventData.vip} PKR</option>
                </select>
                <h1>Available </h1>
                <h2>{eventData.number}</h2>
                <div className="counter">
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
                                count < eventData.number && setCount(count + 1);
                            }}
                        >
                            +
                        </button>
                    </span>
                </div>
                <h2>Total:{count * eventData[type]}</h2>
                <button className="link" onClick={() => setCart(true)}>
                    Proceed to Cart
                </button>
                {cart && (
                    <Cart
                        eventData={eventData}
                        count={count}
                        type={type}
                        closeCart={setCart}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
}
