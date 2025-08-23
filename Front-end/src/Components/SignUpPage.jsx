import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookies';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';

function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    Cookies.setItem("userData", JSON.stringify(data));
    alert("Welcome to Sustainify. Please add Your information");
    navigate("/info");
  };

  const handleGoogleSuccess = (credentialResponse) => {
    localStorage.setItem('g_credential', credentialResponse.credential);
    navigate('/info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-white to-green-300 flex flex-col items-center justify-center px-4 overflow-hidden">
      
      {/* HEADER ANIMATION */}
      <motion.header
        className="text-center mb-10"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: -10, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-green-700 mt-8">Sign Up</h1>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Join us in weaving a greener future—where every step you take leaves the world a little brighter. 🌿
        </p>
      </motion.header>

      {/* FORM CARD ANIMATION */}
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10 border border-green-200 mb-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-5">Create your account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              {...register('name', { required: true })} 
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              placeholder="Virat kholi"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">Enter your Name</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input 
              type="email" 
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              placeholder="kholi@example.com"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">Enter a valid email</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">User Name</label>
            <input 
              type="text" 
              {...register('userName', { required: true })} 
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              placeholder="sustainify_user"
            />
            {errors.userName && <p className="text-sm text-red-500 mt-1">Enter your User Name</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              {...register('password', { required: true, minLength: 8 })} 
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              placeholder="********"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">Password must be at least 8 characters</p>}
          </div>

          {/* Already user */}
          <p className="text-sm text-gray-600">
            Already a user?{" "}
            <Link to="/login" className="text-green-600 underline hover:text-green-800">
              Log-in
            </Link>
          </p>

          {/* Google login */}
          <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google SignUp Failed")}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <Link to="/">
              <button type="button" className="px-5 py-2 rounded-lg border border-green-400 text-green-600 hover:bg-green-50">
                Back
              </button>
            </Link>
            <button type="submit" className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Sign Up
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default SignUpPage;
