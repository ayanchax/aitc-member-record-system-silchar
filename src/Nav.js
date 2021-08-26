import React from "react";
import "./Nav.css"
import { useHistory } from "react-router-dom"
function Nav() {
 
    let history = useHistory();
    
    return (
        <div className="nav">
            <div className="nav__contents ">
                <img onClick={(e) => history.push("/")} className="nav__logo" src="resources/static/aitc-logo.PNG" alt="AITC-Logo" />  
            </div>

        </div>
    )
}

export default Nav