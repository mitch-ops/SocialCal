import React, { useState, useEffect } from 'react';
import api from '../api';

function Friends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await api.get('friendships/');
                setFriends(response.data);
            } catch (error) {
                console.error('Failed to fetch friends', error);
            }
        };
    }, []);

    return (
        <div>
            <h1>Friends</h1>
            <ul>
                {friends.map(friend => {
                    <li key={friend.id}>
                        {friend.friend.username}'s Avtivities:
                        <ul>
                            {friend.friend.activities.map(activity => {
                                <li key={activity.id}>
                                    {activity.title} ({new Date(activity.start_time).toLocaleString()} - {new Date(activity.end_time).toLocaleString()})
                                </li>
                            })}
                        </ul>
                    </li>
                })}
            </ul>
        </div>
    );
}

export default Friends;