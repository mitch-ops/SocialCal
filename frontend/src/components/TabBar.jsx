import React from "react";
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function TabBar() {
    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    };

    return(
        <nav>
            <ul>
                <li>
                    <Link to="/calendar">Calendar</Link>
                </li>
                <li>
                    <Link to="/create">Create</Link>
                </li>
                <li>
                    <Link to="/friends">Friends</Link>
                </li>
                {/* <li>
                    <Link to="/profile">Friends</Link>
                </li> */}
                <li>
                    <Link to="/login" onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default TabBar;