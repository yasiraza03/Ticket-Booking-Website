import { Link } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="brand-title">
                <h1>TicketR</h1>
            </div>
            <div className="logo">
                <FaTicketAlt size={40} />
            </div>
            <nav className="navlist">
                <ul>
                    <li>
                        <Link to="/" className="profile">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/getEvents" className="profile">
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="profile">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/addEvent" className="profile">
                            Add Event
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="profile">
                            <CgProfile size={50} className="profile" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
