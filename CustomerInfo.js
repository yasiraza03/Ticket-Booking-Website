import { useEffect } from "react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import Navbar from "./Navbar";
import postForm from "./postForm";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./table.css";
export default function CustomerInfo({ closeCustomer, openMain, category }) {
    const [customerData, setCustomerData] = useState();
    const [update, setUpdate] = useState(true);
    let array = [];
    useEffect(() => {
        fetch(`http://localhost:5000/customers?category=${category}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCustomerData(data);
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
    function deleteTickets() {
        postForm("http://localhost:5000/delete", {
            data: array,
            table: "ticket",
        }).then((data) => {
            console.log(data);
        });
        console.log(update);
    }
    function deleteItems() {
        postForm("http://localhost:5000/delete", {
            data: array,
            table: "users",
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
                    closeCustomer(false);
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>City</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerData &&
                            customerData.map((customer) => {
                                return (
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email} </td>
                                        <td>{customer.contact} </td>
                                        <td>{customer.city} </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                value={customer.id}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <button className="delete-btn" onClick={deleteItems}>
                    Delete Selected Customer
                </button>
                <button className="delete-btn" onClick={deleteTickets}>
                    Delete Customer Tickets
                </button>
            </div>
        </div>
    );
}
