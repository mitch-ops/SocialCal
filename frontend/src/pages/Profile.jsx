import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [friendRequestSent, setFriendRequestSent] = useState(false);

    // Get our user profile
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // fetch the user data
                // ahhhh I need a user enpoint in the backend now :(
                const response = await api.get(`/users/${userId}/`);
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        fetchUser();
    }, [userId]);

    // api call to send friend request
    const handleSendFriendRequest = async () => {
        try {
            // Sending friend request with the users id
            api.post(`/friend-request/send/${userId}`);
            setFriendRequestSent(true);
        } catch (error) {
            console.error('Failed to send friend request:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
            <button onClick={handleSendFriendRequest} disabled={friendRequestSent}>
                {friendRequestSent ? 'Friend Request Sent' : 'Send Friend Request'}
            </button>
        </div>
    );
}

export default Profile;