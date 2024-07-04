import Navbar from "./Navbar";
import Header from "./Header";
import Middle from "./Middle";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

export default function Landing() {
    const location = useLocation();
    if (location.state) alert(location.state.message);
    return (
        <>
            <div className="top">
                <Navbar />
                <Header />
            </div>
            <Middle />
            <Footer />
        </>
    );
}
