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
            const res = await axios.post('http://localhost:2001/user/login', { userName, password });
            console.log(res.data)
            const token = res.data.token
            Cookies.setItem("token", token)
            console.log(token)

            if (res.data.message === 'success') {
                alert('Successfully Logged-In');
                navigate('/');
            } else if (res.data.message === 'the password is incorrect') {
                setErrors({ ...errors, password: 'Incorrect password' });
            } else if (res.data.message === 'no user exists') {
                setErrors({ ...errors, userName: `The User doesn't exist` });
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };

    return (
        <div className='background-image'>

            {/* HEADER  */}

            <div className='log-header'>
                <h1>Welcome Back <br />Continuing the Journey: Together Towards a Greener Future!</h1>
            </div>

            {/* MAIN CONTAINER  */}

            <form className='main' onSubmit={handleSubmit}>
                <h1>Log-In</h1>
                <hr />
                <div className='inputs'>
                    <label>User Name</label>
                    <input type="text" name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    {errors.userName && <p className='errors'>{errors.userName}</p>}
                </div>
                <div className='inputs'>
                    <label>Password</label>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p className='errors'>{errors.password}</p>}
                </div>
                <p>New User?
                    <Link to={'/signUp'}>
                        <span>Sign-Up</span>
                    </Link>
                </p>
                <div>
                    <button type='submit'>Log-In</button>
                </div>
            </form>
        </div>
    )
}

export default LogInPage;
