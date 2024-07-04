import { useContext, useState, useEffect } from "react";
import AuthContext from "./AuthProvider";
import postForm from "./postForm";
import { AiOutlineEdit } from "react-icons/ai";
import EventModal from "./EventModal";
export default function () {
    const [eventData, setEvent] = useState();
    const { auth } = useContext(AuthContext);
    const [update, setUpdate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [modalData, setModalData] = useState();
    let array = [];
    useEffect(() => {
        fetch(`http://localhost:5000/organizerEvents?id=${auth.id}`, {
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
            <h1 className="temp">Your events</h1>
            <div className="table-wrapper">
                <table style={{ width: "90%" }}>
                    <thead>
                        <tr>
                            <th> Event Name</th>
                            <th>Venue</th>
                            <th>Organizer</th>
                            <th>Base Price</th>
                            <th>Available Tickets</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Revenue</th>
                            <th className="second-last-child">Edit</th>
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
                                        <td>{events.standard}</td>
                                        <td>{events.number}</td>
                                        <td>{events.time}</td>
                                        <td>{events.date}</td>
                                        <td>{events.Revenue}PKR</td>
                                        <td>
                                            <button
                                                className="edit-btn hover-change"
                                                style={{ position: "static" }}
                                                onClick={() => {
                                                    setModalData({
                                                        name: events.event_name,
                                                        id: events.event_id,
                                                        organizer:
                                                            events.organizer,
                                                        available:
                                                            events.number,
                                                        date: events.date,
                                                        time: events.time,
                                                    });
                                                    setEdit(true);
                                                }}
                                            >
                                                <AiOutlineEdit
                                                    className="hover-change"
                                                    size={17}
                                                />
                                            </button>
                                        </td>
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
                <button
                    className="delete-btn"
                    onClick={deleteItems}
                    style={{ marginRight: "5%" }}
                >
                    Delete Selected
                </button>
            </div>
            {edit && <EventModal data={modalData} closeModal={setEdit} />}
        </div>
    );
}
