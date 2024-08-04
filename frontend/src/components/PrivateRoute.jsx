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
    const [isAuthenticated, setIsAuthorized] = useState(null);

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
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
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
            setIsAuthorized(true) // token aint expired
        }
    };

    if (isAuthenticated) {
        return (
            <div>Loading...</div>
        )
    }
}

export default PrivateRoute;