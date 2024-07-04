import "./middle.css";
import { AiOutlineStock, AiOutlineCompass, AiFillHeart } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
export default function Middle() {
    return (
        <div className="middle">
            <div className="middle-container">
                <div className="middle-child">
                    <AiOutlineStock size={50} />
                    <h1>More for Less</h1>
                    <p>
                        We offer e-tickets with
                        <br /> exceptional discounted deals
                        <br />
                        across the country.
                    </p>
                </div>
                <div className="middle-child">
                    <AiOutlineCompass size={50} />
                    <h1>Affordable Tickets</h1>
                    <p>
                        We provide affordable tickets to <br /> save up to 50%
                    </p>
                </div>
                <div className="middle-child">
                    <AiFillHeart size={50} />
                    <h1>We Care</h1>
                    <p>
                        We provide 24/7 effective <br /> customer care service.
                    </p>
                </div>
                <div className="middle-child">
                    <BsGlobe size={50} />
                    <h1>Discover</h1>
                    <p>
                        We make travelling easy across <br /> Pakistan by
                        providing easy <br />
                        e-tickets.
                    </p>
                </div>
            </div>
        </div>
    );
}
