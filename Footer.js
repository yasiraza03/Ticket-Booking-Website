import {
    AiOutlineCopyrightCircle,
    AiOutlineMail,
    AiFillPhone,
    AiFillFacebook,
    AiFillTwitterCircle,
    AiFillInstagram,
    AiFillYoutube,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { ImLocation } from "react-icons/im";

import "./footer.css";
export default function Footer() {
    return (
        <footer>
            <div>
                <h1>TicketR</h1>
                <p>Your one Stop shop for Event Tickets</p>
                <p>Quick. Easy. Reliable. </p>
                <p>
                    CopyRight <AiOutlineCopyrightCircle /> 2022 TicketR
                </p>
            </div>
            <div className="second">
                <h1>Contact Us</h1>
                <div>
                    <ImLocation size={20} />
                    <span>Karachi,Pakistan</span>
                </div>
                <div>
                    <AiOutlineMail size={20} />
                    <span>ticketr@gmail.com</span>
                </div>
                <div>
                    <AiFillPhone size={20} />
                    <span>505-503-4455</span>
                </div>
            </div>
            <div className="third">
                <h1>About The Company</h1>
                <p>
                    We are Ticket Management Website providing Easy <br />
                    Solution to both Event Organizers and Customers
                </p>
                <AiFillFacebook size={35} />
                <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                >
                    <AiFillYoutube size={35} />
                </a>
                <AiFillTwitterCircle size={35} />
                <AiFillInstagram size={35} />
            </div>
        </footer>
    );
}
