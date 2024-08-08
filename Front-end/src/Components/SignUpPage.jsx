import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './CSS/Landing.css';
// import axios from 'axios';
import Cookies from 'js-cookies';

function SignUpPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


    // SUBMITTING THE FORM AND SAVING IN THE DATABASE 
    const onSubmit = async (data) => {
        try {
            Cookies.setItem("userData", JSON.stringify(data));
            alert("Welcome to Sustainify. Please add Your information");
            navigate("/info")
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    // FUNTION TO OPEN THE GOOGLE AUTH 
    const openGoogle = () => {
        try {
            window.location.href = "http://localhost:2001/auth/google";
        } catch (error) {
            console.log(error);
        }
    }


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
                    <div className='auth' onClick={openGoogle}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUScqW4YTyBJ0Lg5GHQYI9TuRsM7rXzNWzw&s" alt="Google Icon" width={'40px'} />
                        <p>Sign up with Google</p>
                    </div>
                    <div className='flex-around'>
                        <Link to={'/'}>
                            <button>Back</button>
                        </Link>
                        <button type="submit">Sign-Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
