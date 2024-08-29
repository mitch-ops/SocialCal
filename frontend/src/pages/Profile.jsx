import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const [searchError, setSearchError] = useState('');

    // Get our user profile by id
    // use params get the user id from the link
    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    // fetch the user data
                    // ahhhh I need a user enpoint in the backend now :(
                    const response = await api.get(`/api/users/${userId}/`);
                    console.log('fetched user: ', response.data);
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            };
            fetchUser();
        }
    }, [userId]);

    // api call to send friend request
    const handleSendFriendRequest = async () => {
        try {
            // get the id with the inputted username
            const response = await api.get(`/api/users/?username=${username}`)
            const userId = response.data[0].id;
            // Sending friend request with the users id
            api.post(`/api/friend-request/send/${userId}/`);
            setFriendRequestSent(true);
            setSearchError('');
        } catch (error) {
            console.error('Failed to send friend request:', error);
            setSearchError('User not found or friend request failed.');
        }
    };

    if (userId && !user) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {user && (
                <>
                    <h1>{user.username}</h1>
                    <p>{user.email}</p>
                    <button onClick={handleSendFriendRequest} disabled={friendRequestSent}>
                        {friendRequestSent ? 'Friend Request Sent' : 'Send Friend Request'}
                    </button>
                </>
            )}

            <div>
                <h1>Send a Friend Request</h1>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleSendFriendRequest} disabled={friendRequestSent}>
                    Send Friend Request
                </button>
                {searchError && <p>{searchError}</p>}
            </div>
        </div>
    );
}

export default Profile;