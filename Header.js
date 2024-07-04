import { Link } from "react-router-dom";
export default function Header() {
    return (
        <div className="header-container">
            <div className="header-item">
                <h1>
                    Experience every Event
                    <br />
                    with Ticketr
                </h1>
                <p>
                    Your one stop shop for all event tickets across the
                    year.Incredibly fast and stress free
                </p>
                <Link to="/getEvents" className="header-btn">
                    Explore Events
                </Link>
            </div>
        </div>
    );
}
