import { useEffect, useState } from "react";
import api from "../api";

function FriendRequests() {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        // Fetch the friend requests
        const fetchFriendRequests = async () => {
            try {
                const response = await api.get('/api/friend-requests/');
                setFriendRequests(response.data);
            } catch (error) {
                console.log('Failed to fetch friend-requests', error);
            }
        };
        fetchFriendRequests();
    }, []);

    const handleResponse = async (requestId, action) => {
        // api call
        try {
            // takes in an aciton
            await api.put(`/api/friend-request/respond/${requestId}`, { action })
        } catch (error) {
            console.log(`Failed to ${action} friend request`, error);
        }
    }

    return (
        <div>
            <h1>
                Friend Requests
            </h1>
            <ul>
                {friendRequests.length === 0 ? (
                    <p1>No Friend Requests.</p1>
                ) : (
                    friendRequests.map(request => (
                        <li key={request.id}>
                            <p>{request.sender.username} wants to be your friend</p>
                            <button onClick={() => handleResponse(request.id, 'accept')}>Accept</button>
                            <button onClick={() => handleResponse(request.id, 'reject')}>Reject</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default FriendRequests;