import React from "react";
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function TabBar() {
    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    };

    const userId = localStorage.getItem('userId');

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
                {userId && (
                    <li>
                        <Link to={`/profile/${userId}`}>Profile</Link>
                    </li>
                )}
                <li>
                    <Link to="/friend-requests">Friend Requests</Link>
                </li>
                <li>
                    <Link to="/login" onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default TabBar;