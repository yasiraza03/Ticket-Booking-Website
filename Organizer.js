import { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthProvider";
import Navbar from "./Navbar";
import OrganizerInfo from "./OrganizerInfo";
import { AiOutlineEdit } from "react-icons/ai";
import ModalForm from "./ModalForm";

export default function Customer() {
    const { auth } = useContext(AuthContext);
    const url = `http://localhost:5000/adminDashboard?id=${auth.id}`;
    const [info, setinfo] = useState();
    const [main, setMain] = useState(true);
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
                    {info && <OrganizerInfo />}
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
                </div>
            )}
        </>
    );
}
