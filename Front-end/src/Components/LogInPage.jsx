import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Landing.css';
import axios from 'axios';
import Cookies from 'js-cookies';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LogInPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ userName: '', password: '' });
    const [loading, setLoading] = useState(false);  // New loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true when the request starts

        try {
            const res = await axios.post('https://s50-samarth-capstone-sustainify.onrender.com/user/login', { userName, password });
            const { token, user } = res.data;

            Cookies.setItem("token", token);
            Cookies.setItem("Id", user._id);
            console.log(user._id, "this is the user id");

            if (res.status === 200) {
                toast.success('🦄 Successfully Logged-In!', {
                    onClose: () => navigate('/posts')
                });

                setErrors({ userName: '', password: '' });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrors({ ...errors, password: 'Incorrect password' });
                } else if (error.response.status === 404) {
                    setErrors({ ...errors, userName: `The User doesn't exist` });
                } else {
                    console.log('Login failed with status:', error.response.status);
                }
            } else if (error.request) {
                console.log('No response received:', error.request);
            } else {
                console.log('Error:', error.message);
                toast.error('There was an error');
            }
        } finally {
            setLoading(false);  // Set loading to false when the request ends
        }
    };

    return (
        <div className='background-image'>

            {/* HEADER  */}

            <div className='log-header font-sans'>
                <h1>Welcome Back <br />Continuing the Journey: Together Towards a Greener Future!</h1>
            </div>

            {/* MAIN CONTAINER  */}

            <form className='main' onSubmit={handleSubmit}>
                <h1>Log-In</h1>
                <hr />
                <div className='inputs'>
                    <label>User Name</label>
                    <input type="text" name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    {errors.userName && <p>{errors.userName}</p>}
                </div>
                <div className='inputs'>
                    <label>Password</label>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <p>New User?
                    <Link to={'/signUp'}>
                        <span>Sign-Up</span>
                    </Link>
                </p>
                <div className='flex-around'>
                    <Link to={'/'}>
                        <button type="button">Back</button>
                    </Link>
                    <button type='submit' disabled={loading}>
                        {loading ? 'Loading...' : 'Log-In'}
                    </button>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme="light"
                transition={Bounce} />
        </div>
    )
}

export default LogInPage;
