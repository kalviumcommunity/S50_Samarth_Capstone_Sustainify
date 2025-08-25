import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';

function LogInPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ userName: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ---------------- Normal Login ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                'https://s50-samarth-capstone-sustainify.onrender.com/user/login',
                { userName, password }, 
                { withCredentials: true }
            );

            const { token, user } = res.data;
            Cookies.set("token", token);
            Cookies.set("Id", user._id);

            toast.success('Successfully Logged-In!', {
                onClose: () => navigate('/posts')
            });
            setErrors({ userName: '', password: '' });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrors({ ...errors, password: 'Incorrect password' });
                } else if (error.response.status === 404) {
                    setErrors({ ...errors, userName: `The User doesn't exist` });
                }
            } else {
                toast.error('There was an error');
            }
        } finally {
            setLoading(false);
        }
    };

    // ---------------- Google Login ----------------
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const credential = credentialResponse.credential; 

            const res = await axios.post(
                "http://localhost:2001/auth/google/login",
                { credential },
                { withCredentials: true }
            );

            const { token, user } = res.data;
            Cookies.set("token", token);
            Cookies.set("Id", user._id);

            toast.success('Google Login Successful!', {
                onClose: () => navigate('/posts')
            });
        } catch (err) {
            console.error("Google login failed:", err);
            toast.error("Google Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-white to-green-400 px-6">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6 border border-green-300">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-green-600">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Log in to continue your journey 🌱</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">User Name</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                        {errors.userName && <p className="text-sm text-red-500 mt-1">{errors.userName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <p className="text-sm text-gray-500">
                        New User?{" "}
                        <Link to={'/signUp'} className="text-green-500 font-semibold hover:underline">
                            Sign-Up
                        </Link>
                    </p>

                    {/* Google login */}
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => console.log("Google Login Failed")}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-4">
                        <Link to={'/'}>
                            <button
                                type="button"
                                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-sm text-gray-700"
                            >
                                Back
                            </button>
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md transition duration-200"
                        >
                            {loading ? 'Loading...' : 'Log-In'}
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer position="top-center" autoClose={2000} theme="light" transition={Bounce} />
        </div>
    );
}

export default LogInPage;
