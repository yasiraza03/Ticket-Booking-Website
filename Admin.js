import { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthProvider";
import Navbar from "./Navbar";
import CustomerInfo from "./CustomerInfo";
import UnapprovedEvents from "./UnapprovedEvent";
import ApprovedEvents from "./ApprovedEvents";
import HandleVenue from "./HandleVenues";
import { AiOutlineEdit } from "react-icons/ai";
import ModalForm from "./ModalForm";
import Footer from "./Footer";

export default function Customer() {
    const { auth } = useContext(AuthContext);
    const url = `http://localhost:5000/adminDashboard?id=${auth.id}`;
    const [info, setinfo] = useState();
    const [customer, setCustomer] = useState(false);
    const [unapproved, setUnapproved] = useState(false);
    const [approved, setApproved] = useState(false);
    const [main, setMain] = useState(true);
    const [venue, setVenue] = useState(false);
    const [approvedVenue, setApprovedVenue] = useState();
    const [userCategory, setUserCategory] = useState("");
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        fetch(url, { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setinfo(data);
            });
    }, []);
    return (
        <>
            {main && (
                <div className="dashboard-wrapper">
                    <Navbar />
                    {info && (
                        <div className="dashboard-container">
                            <h1 className="dashboard-heading">Profile</h1>
                            <div className="dashboard-item">
                                <h1>Name: </h1> <span>{info[0].name}</span>
                            </div>
                            <div className="dashboard-item">
                                <h1>Contact: </h1>{" "}
                                <span>{info[0].contact}</span>
                            </div>
                            <div className="dashboard-item">
                                <h1>City: </h1> <span>{info[0].city}</span>
                            </div>
                            <button
                                className="edit-btn hover-change"
                                onClick={() => setEdit(true)}
                            >
                                <AiOutlineEdit
                                    className="hover-change"
                                    size={25}
                                />
                            </button>
                        </div>
                    )}
                    {info && (
                        <div className="dashboard-container">
                            <h1 className="dashboard-heading">Admin</h1>
                            <button
                                onClick={() => {
                                    setCustomer(true);
                                    setMain(false);
                                    setUserCategory("customer");
                                }}
                                className="admin-btn"
                            >
                                View All Customers
                            </button>
                            <button
                                onClick={() => {
                                    setCustomer(true);
                                    setMain(false);
                                    setUserCategory("organizer");
                                }}
                                className="admin-btn"
                            >
                                View All Organizers
                            </button>
                            <button
                                onClick={() => {
                                    setUnapproved(true);
                                    setMain(false);
                                }}
                                className="admin-btn"
                            >
                                View Unapproved Events
                            </button>
                            <button
                                onClick={() => {
                                    setApproved(true);
                                    setMain(false);
                                }}
                                className="admin-btn"
                            >
                                View Events Approved by You
                            </button>
                            <button
                                onClick={() => {
                                    setVenue(true);
                                    setMain(false);
                                    setApprovedVenue(0);
                                }}
                                className="admin-btn"
                            >
                                View Unapproved Venues
                            </button>
                            <button
                                onClick={() => {
                                    setVenue(true);
                                    setMain(false);
                                    setApprovedVenue(1);
                                }}
                                className="admin-btn"
                            >
                                View Approved Venues
                            </button>
                        </div>
                    )}
                </div>
            )}
            {customer && (
                <CustomerInfo
                    closeCustomer={setCustomer}
                    openMain={setMain}
                    category={userCategory}
                />
            )}
            {unapproved && (
                <UnapprovedEvents
                    closeEvents={setUnapproved}
                    openMain={setMain}
                />
            )}
            {approved && (
                <ApprovedEvents closeEvents={setApproved} openMain={setMain} />
            )}
            {venue && (
                <HandleVenue
                    closeVenues={setVenue}
                    openMain={setMain}
                    approved={approvedVenue}
                />
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
        </>
    );
}
