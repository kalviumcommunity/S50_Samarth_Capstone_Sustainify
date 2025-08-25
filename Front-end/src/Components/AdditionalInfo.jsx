import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookies";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdditionalInfo() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const covertImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const onSubmit = async (data) => {
    const file = data.proPic?.[0];
    const maxFileSize = 5 * 1024 * 1024;

    if (file && file.size > maxFileSize) {
      toast.error("File size exceeds 5 MB limit.");
      return;
    }

    try {
      const imgURL = file ? await covertImage(file) : "";

      // ✅ Instead of always checking localStorage first,
      // detect if user is Google signup OR manual signup
      let payload;
      let endpoint;

      const userData = Cookies.getItem("userData");
      const credential = localStorage.getItem("g_credential");

      if (userData) {
        // Manual signup flow
        const parsedUser = JSON.parse(userData);
        payload = {
          ...parsedUser,
          bio: data.bio || "",
          goal: data.goals || "",
          number: data.number || "",
          img: imgURL,
        };
        endpoint =
          "https://s50-samarth-capstone-sustainify.onrender.com/user";
      } else if (credential) {
        // Google signup flow
        payload = {
          credential,
          bio: data.bio || "",
          goal: data.goals || "",
          number: data.number || "",
          img: imgURL,
        };
        endpoint = "http://localhost:2001/auth/google/signup";
      } else {
        toast.error("Signup session expired. Please sign up again.");
        return;
      }

      const loadingToast = toast.loading("Submitting your data...");

      const res = await axios.post(endpoint, payload);

      const { token, user, id } = res.data;
      Cookies.setItem("token", token);
      Cookies.setItem("Id", user?._id || id);

      toast.update(loadingToast, {
        render: "Registered successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      setTimeout(() => navigate("/posts"), 1200);
    } catch (error) {
      console.error(error);
      toast.error("There was an error");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-green-200 via-white to-green-400">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 border border-green-200">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
            Additional Profile Information
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Help us personalize your experience by filling out these details
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Pic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                {...register("proPic")}
                className="block w-full text-sm text-gray-600 border border-green-300 rounded-lg p-2 cursor-pointer focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Bio + Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  rows="4"
                  placeholder="Tell us a bit about yourself..."
                  className="w-full border border-green-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upcoming Goals
                </label>
                <textarea
                  {...register("goals")}
                  rows="4"
                  placeholder="What do you want to achieve?"
                  className="w-full border border-green-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
            </div>

            {/* Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Number
              </label>
              <input
                type="text"
                {...register("number")}
                placeholder="Enter your contact number"
                className="w-full border border-green-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Link to={"/"}>
                <button
                  type="button"
                  className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium shadow-md hover:bg-red-600 transition-all"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition-all"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default AdditionalInfo;
