import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Form.css';
import api from '../api';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        // prevents us from submitting the form and reloading the page (removes deafault behavior)
        e.preventDefault();

        // api request for loggin in
        try {
            const response = await api.post('/api/auth/login/', { username, password });
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            navigate('/calendar');
        } catch (error) {
            console.error('Login Failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1>Login</h1>
            <input 
                className='form-input'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
            />
            <input 
                className='form-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Username'
            />
            <button className='form-button' type='submit'>{loading ? 'Loading...' : 'Log In'}</button>
        </form>
    );
}

export default Login;