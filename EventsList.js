import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { AiFillFilter } from "react-icons/ai";
import Footer from "./Footer";

export default function EventsList({ list, setModal }) {
    return (
        <div className="event-list-wrapper">
            <Navbar />
            <button
                type="button"
                onClick={() => {
                    setModal(true);
                }}
                className="filter-btn"
            >
                <AiFillFilter size={30} /> Filter
            </button>
            <div className="event-list-container">
                <div className="event-item event-header">
                    <h1>Name</h1>
                    <p>Organizer</p>
                    <p>Venue</p>
                    <p>City</p>
                    <p> Standard Ticket Price</p>
                    <p>Time</p>
                    <p>Date</p>
                </div>
                {list.map((listItem) => {
                    return (
                        <Link
                            to={`/event/${listItem.event_id}`}
                            className="event-item"
                            state={listItem}
                            key={listItem.event_id}
                            style={{ textDecoration: "none" }}
                        >
                            <h1>{listItem.event_name}</h1>
                            <p>{listItem.organizer}</p>
                            <p>{listItem.venue_name}</p>
                            <p>{listItem.city}</p>
                            <p>{listItem.standard}</p>
                            <p>{listItem.time}</p>
                            <p>{listItem.date}</p>
                        </Link>
                    );
                })}
            </div>
            <Footer />
        </div>
    );
}
