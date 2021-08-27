import React from 'react';
import "./Banner.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom"
toast.configure();
function Banner() {
    let history = useHistory();

    return (

        <div>
            <header

                className="banner" style={{
                    backgroundImage: `url("/resources/static/header.PNG")`, backgroundSize: 'contain',

                    backgroundPosition: " center center",
                    backgroundRepeat: "no-repeat"
                }}>



                <div className="banner__contents">

                    <div className="banner__buttons">
                        <button onClick={(e) => history.push("/registration")} className="banner__button">Add Member</button>
                        <button onClick={(e) => history.push("silchar/aitc-members")} className="banner__button">View Members</button>
                    </div>

                </div>
                <div className="banner__fadeBottom"></div>
            </header>


        </div>

    )
}

export default Banner
