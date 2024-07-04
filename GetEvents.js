import { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthProvider";
import EventsList from "./EventsList";
import FilterModal from "./FilterModal";

export default function GetEvents() {
    const { update } = useContext(AuthContext);
    const [events, setEvents] = useState("");
    const [filter, setFilter] = useState("");
    const [modal, setModal] = useState(false);
    useEffect(() => {
        fetch("http://localhost:5000/getEvents?approved=1", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEvents(data);
                setFilter(data);
            });
    }, [update]);
    return (
        <>
            {filter && <EventsList list={filter} setModal={setModal} />}
            {modal && (
                <FilterModal
                    setToggle={setModal}
                    list={events}
                    filter={setFilter}
                />
            )}
        </>
    );
}
