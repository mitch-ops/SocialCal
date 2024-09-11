import React, { useState, useEffect } from 'react';
import api from '../api';

function Friends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await api.get('api/friends/');
                // filter the confirmedFriends
                const confirmedFriends = response.data.filter(friendship => friendship.is_accepted);

                const friendsData = await Promise.all(
                    confirmedFriends.map(async (friendship) => {
                        const activitiesResponse = await api.get(`api/activities/?user=${friendship.friend.id}/`);
                        return {
                            friend: friendship.friend,
                            activities: activitiesResponse.data,
                        };
                    })
                );
                setFriends(friendsData);
            } catch (error) {
                console.error('Failed to fetch friends', error);
            }
        };
        fetchFriends();
    }, []);

    return (
        <div>
            <h1>Friends' Activities</h1>
            <ul>
                {friends.map(({ friend, activities }) => (
                    <li key={friend.id}>
                        <h2>{friend.username}</h2>
                        <ul>
                            {activities.map(activity => (
                                <li key={activity.id}>
                                    {activity.title} ({new Date(activity.start_time).toLocaleString()} - {new Date(activity.end_time).toLocaleString()})
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Friends;