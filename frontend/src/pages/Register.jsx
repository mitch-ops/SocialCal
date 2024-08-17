import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        // prevents us from submitting the form and reloading the page (removes deafault behavior)
        e.preventDefault();

        // api request for registering
        try {
            // post it to the backend
            await api.post('/api/auth/register/', { username, email, password, first_name: firstName, last_name: lastName })
            navigate('login/');
        } catch (error) {
            console.error('Register Failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1>Register</h1>
            <input
                className='form-input'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
            />
            <input
                className='form-input'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
            />
            <input
                className='form-input'
                type='password'
                value={[password]}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            <input
                className='form-input'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='First Name'
            />
            <input
                className='form-input'
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Last Name'
            />
            <button className='form-button' type='submit'>{loading ? 'Loading...' : 'Register'}</button>
        </form>
    );
}

export default Register;