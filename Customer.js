import { useContext, useState, useEffect } from "react";
import AuthContext from "./AuthProvider";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import TicketModal from "./TicketModal";
import { AiOutlineEdit } from "react-icons/ai";
import ModalForm from "./ModalForm";
import Footer from "./Footer";

export default function Dashboard() {
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [edit, setEdit] = useState(false);
    const { auth } = useContext(AuthContext);
    const url = `http://localhost:5000/dashboard?id=${auth.id}`;
    const [info, setinfo] = useState();
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setinfo(data);
            });
    }, []);
    return (
        <div className="dashboard-wrapper">
            {modal && <TicketModal data={modalData} set={setModal} />}
            <Navbar />
            {info && (
                <div className="dashboard-container">
                    <h1 className="dashboard-heading">Profile</h1>
                    <div className="dashboard-item">
                        <h1>Name: </h1> <span>{info[0].name}</span>
                    </div>
                    <div className="dashboard-item">
                        <h1>Contact: </h1> <span>{info[0].contact}</span>
                    </div>
                    <div className="dashboard-item">
                        <h1>City: </h1> <span>{info[0].city}</span>
                    </div>
                    <button
                        className="edit-btn hover-change"
                        onClick={() => setEdit(true)}
                    >
                        <AiOutlineEdit className="hover-change" size={25} />
                    </button>
                </div>
            )}
            {info && info[0].count ? (
                <div className="dashboard-container">
                    <h1 className="dashboard-heading">Tickets</h1>
                    {info.map((ticket) => {
                        return (
                            <div key={ticket.event_id + ticket.type}>
                                <div className="dashboard-item">
                                    <h1>Event Name: </h1>
                                    <Link
                                        to={`/event/${ticket.event_id}`}
                                        state={ticket}
                                        style={{
                                            textDecoration: "none",
                                            fontSize: "2rem",
                                            color: " #0C0F04",
                                        }}
                                    >
                                        {ticket.event_name}
                                    </Link>
                                </div>
                                <div className="dashboard-item">
                                    <h1>{ticket.type} Tickets: </h1>
                                    <span>{ticket.count}</span>
                                    <button
                                        className="minus-btn"
                                        onClick={() => {
                                            setModalData({
                                                id: ticket.event_id,
                                                name: ticket.event_name,
                                                count: ticket.count,
                                                user_id: auth.id,
                                                price: ticket[ticket.type],
                                                newCount: ticket.count,
                                                available: ticket.number,
                                                type: ticket.type,
                                                amount:
                                                    ticket[ticket.type] *
                                                    ticket.count,
                                            });
                                            setModal(true);
                                        }}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="dashboard-container">
                    <h1 className="dashboard-heading">Tickets</h1>
                    <h1>No Event Ticktes booked</h1>
                </div>
            )}
            {edit && (
                <ModalForm
                    data={{
                        name: info[0].name,
                        contact: info[0].contact,
                        password: info[0].password,
                        city: info[0].city,
                        id: auth.id,
                    }}
                    closeModal={setEdit}
                />
            )}
            <Footer />
        </div>
    );
}
