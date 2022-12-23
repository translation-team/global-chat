import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
function Navigations({username, profile_path}){
    return(
        <div>
            <div className="navigation">
                <div className="container">
                    <div className="inside">
                        <div className="nav nav-tab menu">
                            <Button variant="btn"><img className="avatar-xl" src={process.env.REACT_APP_HOST_URL+profile_path[username]} alt="avatar"></img></Button>
                            <a href="#members" data-toggle="tab"><i className="material-icons">account_circle</i></a>
                            <a href="#discussions" data-toggle="tab" className="f-grow1 active"><i className="material-icons">chat_bubble_outline</i></a>
                            <Link to='/logout' data-toggle="tab"><i className="material-icons">power_settings_new</i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigations;