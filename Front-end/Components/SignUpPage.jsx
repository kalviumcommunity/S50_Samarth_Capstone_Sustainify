import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './CSS/Landing.css';
import axios from 'axios';

function SignUpPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:2001/user", data);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='background-image' >

            {/* HEADER */}

            <header>
                <h1>Sign-Up</h1>
                <p>Join us in weaving a greener future—where every step you take leaves the world a little brighter. <br />Sign up and become part of the change!</p>
            </header>

            {/* MAIN CONTAINER  */}
            
            <div className='main'>
                <h1>Sign-Up</h1>
                <hr />
                <form className='boxBody' onSubmit={handleSubmit(onSubmit)}>
                    <div className='inputs'>
                        <label>Name</label>
                        <input type="text" {...register('name', { required: true })} />
                        {errors.name && <p className='errors'>Enter your Name</p>}
                    </div>
                    <div className='inputs'>
                        <label>E-mail</label>
                        <input type="text" {...register('email', {
                            required: true,
                            pattern: /^\S+@\S+$/i
                        })} />
                        {errors.email && <p className='errors'>Enter a valid email</p>}
                    </div>
                    <div className='inputs'>
                        <label>User Name</label>
                        <input type="text" {...register('userName', { required: true })} />
                        {errors.userName && <p className='errors'>Enter your User Name</p>}
                    </div>
                    <div className='inputs'>
                        <label>Password</label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: { value: 8, message: "Password must be at least 8 characters long" }
                        })} />
                        {errors.password && <p className='errors'>{errors.password.type === "required" ? "Please enter your password" : errors.password.message}</p>}
                    </div>
                    <div>
                        <p>Already a user?
                            <Link to="/login">
                                <span>Log-in</span>
                            </Link>
                        </p>
                    </div>
                    <button type="submit">Sign-Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
