import axios from 'asxios';
import { ACCESS_TOKEN } from './constants';

// Url of our backend server
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

// Intercept any request we are gonna send and automatically add correct headers
// Easy to do this with axios
api.interceptors.request.use(config => {
    const token = localStorage.getItem(ACCESS_TOKEN); // get the access token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // passsing jwt access token, authorization header from axios
    }
    return config;
},
(error) => {
    return Promise.reject(error);
});

export default api;