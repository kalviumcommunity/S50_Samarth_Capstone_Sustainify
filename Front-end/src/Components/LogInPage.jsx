import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Landing.css';
import axios from 'axios';
import Cookies from 'js-cookies';

function LogInPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ userName: '', password: '' });
    const navigate = useNavigate();

    // POST REQUEST FOR CHECKING WHETHER THE USER IS A MEMBER OF THE WEBSITE OR NO 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://s50-samarth-capstone-sustainify.onrender.com/user/login', { userName, password });
            const { token, user } = res.data;

            // console.log(user)
            Cookies.setItem("token", token);
            Cookies.setItem("Id", user._id);
            console.log(user._id, "this is the user id");

            if (res.status === 200) {
                alert('Successfully Logged-In');
                navigate('/posts');
            } else {
                if (res.status === 401) {
                    setErrors({ ...errors, password: 'Incorrect password' });
                } else if (res.status === 404) {
                    setErrors({ ...errors, userName: `The User doesn't exist` });
                } else {
                    console.error('Login failed with status:', res.status);
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
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
                        <button>Back</button>
                    </Link>
                    <button type='submit'>Log-In</button>
                </div>
            </form>
        </div>
    )
}

export default LogInPage;
