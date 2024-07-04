import { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import postForm from "./postForm";
import AuthContext from "./AuthProvider";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function UnapprovedEvents({ openMain, closeVenues, approved }) {
    const [venueData, setVenue] = useState();
    const { auth } = useContext(AuthContext);
    const [update, setUpdate] = useState(false);
    let array = [];
    console.log(approved);
    useEffect(() => {
        fetch(`http://localhost:5000/getVenues?approved=${approved}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setVenue(data);
            });
    }, [update]);
    function deleteItems() {
        postForm("http://localhost:5000/deleteVenue", {
            data: array,
            table: "events",
        }).then((data) => {
            console.log(data);
        });
        setUpdate(!update);
        console.log(update);
    }
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
    function updateItems() {
        postForm("http://localhost:5000/updateVenue", {
            data: array,
            adminId: auth.id,
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
                    closeVenues(false);
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
                            <th> Venue Name</th>
                            <th>City</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {venueData &&
                            venueData.map((venue) => {
                                return (
                                    <tr key={venue.venue_id}>
                                        <td>{venue.venue_name}</td>
                                        <td>{venue.city} </td>
                                        <td>{venue.address} </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                value={venue.venue_id}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {approved ? (
                    <button className="delete-btn" onClick={deleteItems}>
                        Delete Selected
                    </button>
                ) : (
                    <button className="delete-btn" onClick={updateItems}>
                        Update Selected
                    </button>
                )}
            </div>
        </div>
    );
}
