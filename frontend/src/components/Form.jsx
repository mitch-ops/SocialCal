// import { useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
// import '../styles/Form.css';

// /**
//  * This function has two props, route and method
//  * route we want to go to when we submit the form
//  * method is registering or loging in depending...
//  */
// function Form({ route, method }) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // name for the title
//     const name = method === 'login' ? 'Login' : 'Register';

//     const handleSubmit = async (e) => {
//         setLoading(true);
//         // prevents us from submitting the form and reloading the page (removes deafault behavior)
//         e.preventDefault();

//         // attempt to send an api call to whatever route this is
//         try {
//             const response = await api.post(route, { username, password });
//             if (method === 'login') {
//                 // when using djanogrestframework-simplejwt access and refresh are included by deafault in the schema
//                 localStorage.setItem(ACCESS_TOKEN, response.data.access);
//                 localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
//                 navigate('/calendar');
//             } else {
//                 navigate('/login');
//             }

//         } catch (error) {
//             alert(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className='form-container'>
//             <h1>{name}</h1>
//             <input
//                 className='form-input'
//                 type='text'
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder='Username'
//             />
//             <input
//                 className='form-input'
//                 type='password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder='Password'
//             />
//             <button className='form-button' type='submit'>{loading ? 'Loading...' : 'Submit'}</button>
//         </form>
//     );
// }

// export default Form;