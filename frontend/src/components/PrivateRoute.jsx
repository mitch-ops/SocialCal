import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useState, useEffect } from 'react';

/*
* Wrapper for a protected route, this for something where we need an auth
* token to access a route
*/
function PrivateRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    // this happens as soon as we load a protected route
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        // send request to backend with refresh token to get new access token
        try {
            const response = await api.post('/api/auth/token/refresh/', { refresh: refreshToken, });
            if (response.status == 200) {
                const accessToken = response.data.access;
                localStorage.setItem(ACCESS_TOKEN, accessToken);

                // decode the access token to get the userId
                const decoded = jwtDecode(accessToken);
                const userId = decoded.user_id;
                localStorage.setItem('userId', userId);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        // look for a token and handle if it is authorized
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return
        }
        // handle the refresh token
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // date in seconds

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            // Token is valid, store userId in local storage
            const userId = decoded.user_id;
            localStorage.setItem('userId', userId);

            setIsAuthorized(true) // token aint expired
        }
    };

    if (isAuthorized === null) {
        return (
            <div>Loading...</div>
        );
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default PrivateRoute;