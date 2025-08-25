import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookies';

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [goals, setGoals] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.getItem('token');
    const userID = Cookies.getItem('Id');

    if (!token || !userID) {
      navigate('/login'); // Redirect if no token
      return;
    }

    // Fetch user data
    axios.get(`https://s50-samarth-capstone-sustainify.onrender.com/user/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const userData = response.data;

        
        setName(userData.name || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
        setBio(userData.bio || '');
        setGoals(userData.goals || '');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email) {
      alert('Name and email are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('bio', bio);
    formData.append('goals', goals);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    const token = Cookies.getItem('token');
    const userID = Cookies.getItem('Id');

    // Update user data
    axios.put(`https://s50-samarth-capstone-sustainify.onrender.com/user/${userID}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        navigate('/profile');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  if (loading) {
    return <div className='loading text-green-600'>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-4 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="w-full md:w-1/2 mb-4 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="w-full md:w-1/2 mb-4 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="w-full md:w-1/2 mb-4 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
              required
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="w-full md:w-1/2 mb-4 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goals">Goals</label>
            <textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              rows="3"
              required
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="w-full md:w-1/2 mb-4 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="w-full flex justify-between mt-6">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 mr-2"
            >

              {loading ? 'Loading...' : 'Save Changes'}
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-full md:w-1/2 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Back to Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
