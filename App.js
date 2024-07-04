import AuthContext from "./AuthProvider";
import { useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import RequireAuth from "./RequireAuth";
import Landing from "./Landing";
import EventForm from "./EventForm";
import GetEvents from "./GetEvents";
import VenueForm from "./VenueForm";
import Event from "./Event";
import Customer from "./Customer";
import Organizer from "./Organizer";
import Admin from "./Admin";
import "./styles.css";
import "./formStyles.css";
import "./modal.css";
import "./eventStyles.css";
import "./dashboard.css";

function App() {
    const { auth } = useContext(AuthContext);
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/event/:id" element={<Event />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/getEvents" element={<GetEvents />} />
                <Route element={<RequireAuth />}>
                    <Route
                        path="/addevent"
                        element={
                            auth.role === "organizer" ? (
                                <EventForm />
                            ) : (
                                <Navigate
                                    to="/"
                                    state={{
                                        message:
                                            "You need to be an organizer to Add Event",
                                    }}
                                />
                            )
                        }
                    />
                    <Route path="/addVenue" element={<VenueForm />} />
                    <Route
                        path="/auth"
                        element={<h1>Only authorized proplr allowed</h1>}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            auth.role === "customer" ? (
                                <Customer />
                            ) : auth.role === "organizer" ? (
                                <Organizer />
                            ) : (
                                <Admin />
                            )
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
