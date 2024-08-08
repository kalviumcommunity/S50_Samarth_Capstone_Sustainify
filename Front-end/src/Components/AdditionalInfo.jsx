import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookies'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdditionalInfo() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.proPic[0]);
      const imgURL = await covertImage(data.proPic[0]);

      const userData = JSON.parse(Cookies.getItem('userData'));

      const combinedData = {
        ...userData,
        ...data,
        img: imgURL,
        bio: data.bio,
        goal: data.goals,
        number: data.number
      };

      const res = await axios.post('https://s50-samarth-capstone-sustainify.onrender.com/user', combinedData);
      console.log(res.data);
      const { id, token } = res.data;
      Cookies.setItem("token", token);
      Cookies.setItem("Id", id);
      toast.success('Registered successfully!',{
        onClose: () => navigate('/posts')
      });
    } catch (error) {
      console.error(error);
      toast.error('There was an error');
    }
  };



  // Function to convert image file to URL
  const covertImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = err => reject(err)
    })
  }

  return (
    <>
      <div className='background-image'>
        <div className='flex flex-wrap justify-center	items-center w-6/12	rounded-2xl	fixed top-16 lft bg text-white'>
          <div>
            <div>
              <h1 className='text-2xl font-extrabold mt-10 mr-36 mb-2'>Additional User Profile Information</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className='mr-48 mt-5'>
              <div className='inputs cursor-pointer'>
                <label>Profile Picture</label>
                <input type="file" {...register("proPic")} />
              </div>
              <div className='flex'>
                <div className='inputs'>
                  <label>Bio</label>
                  <textarea {...register("bio")} cols="30" rows="5"></textarea>
                </div>
                <div className='inputs pl-5'>
                  <label className='w-28'>Upcoming Goals</label>
                  <textarea {...register("goals")} cols="30" rows="5"></textarea>
                </div>
              </div>
              <div className='inputs mb-10' >
                <label>Your Number</label>
                <input type="text" {...register("number")} />
              </div>
              <div className='max-w-64 mt-5 ml-48 mb-10'>
                <Link to={'/'}>
                  <button type="button" className="bg-red-500 text-white font-semibold py-2 px-8 rounded-lg shadow-md mr-4">Back</button>
                </Link>
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg shadow-md">Save</button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdditionalInfo;
