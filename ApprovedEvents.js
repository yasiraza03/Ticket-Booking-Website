import { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import postForm from "./postForm";
import AuthContext from "./AuthProvider";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function UnapprovedEvents({ openMain, closeEvents }) {
    const [eventData, setEvent] = useState();
    const { auth } = useContext(AuthContext);
    const [update, setUpdate] = useState(false);
    let array = [];
    useEffect(() => {
        fetch(`http://localhost:5000/approvedEvents?id=${auth.id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEvent(data);
            });
    }, [update]);
    function handleChange(event) {
        let value = event.target.value;
        console.log(event.target.value);
        if (event.target.checked) array.push(parseInt(event.target.value));
        else {
            let temparray = array.filter((e) => {
                if (e !== parseInt(event.target.value)) return e;
            });
            array = temparray;
        }
        console.log(array);
    }
    function deleteItems() {
        postForm("http://localhost:5000/delete", {
            data: array,
            table: "events",
        }).then((data) => {
            console.log(data);
        });
        setUpdate(!update);
        console.log(update);
    }
    return (
        <div className="wrapper-container">
            <Navbar />
            <button
                onClick={() => {
                    openMain(true);
                    closeEvents(false);
                }}
                className="goback-btn"
            >
                <AiOutlineArrowLeft size={20} />
                Go Back
            </button>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th> Event Name</th>
                            <th>Venue</th>
                            <th>Organizer</th>
                            <th>Price</th>
                            <th>Available Tickets</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventData &&
                            eventData.map((events) => {
                                return (
                                    <tr key={events.event_id}>
                                        <td>{events.event_name}</td>
                                        <td>{events.venue_name} </td>
                                        <td>{events.organizer} </td>
                                        <td>{events.price}</td>
                                        <td>{events.number}</td>
                                        <td>{events.time}</td>
                                        <td>{events.date}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                value={events.event_id}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <button className="delete-btn" onClick={deleteItems}>
                    Delete Selected
                </button>
            </div>
        </div>
    );
}
