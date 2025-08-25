import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewPost({ onClose }) {
  const mdlRef = useRef();
  const { register, handleSubmit, setValue } = useForm();
  const [selectedOption, setSelectedOption] = useState("file");
  const navigate = useNavigate();

  // Close modal if clicked outside
  const closeModal = (e) => {
    if (mdlRef.current === e.target) {
      onClose();
    }
  };

  // Convert image file to base64
  const covertImage = (file) => {
    return new Promise((resolve, reject) => {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onload = () => resolve(render.result);
      render.onerror = (err) => reject(err);
    });
  };

  // Submit new post
  const onSubmit = async (data) => {
    try {
      const Id = Cookies.get("Id");

      let postData = {
        title: data.title,
        description: data.description,
        createdBy: Id,
      };

      if (selectedOption === "file") {
        const imgURL = await covertImage(data.file[0]);
        postData.img = imgURL;
      } else {
        postData.img = data.url;
      }

      const res = await axios.post(
        "https://s50-samarth-capstone-sustainify.onrender.com/post",
        postData
      );
      console.log(res.data);

      toast.success("Posted 👍");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong 😞");
    }
  };

  // Handle option change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("file", null);
  };

  return (
    <div
      ref={mdlRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-green-700 mb-4">
          Create a New Post
        </h1>
        <hr className="mb-4 border-green-200" />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Upload type */}
          <div className="flex gap-6 text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="file"
                checked={selectedOption === "file"}
                onChange={handleOptionChange}
                className="text-green-600 focus:ring-green-500"
              />
              File Upload
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="url"
                checked={selectedOption === "url"}
                onChange={handleOptionChange}
                className="text-green-600 focus:ring-green-500"
              />
              Image URL
            </label>
          </div>

          {/* File or URL input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {selectedOption === "file" ? "Upload File" : "Image URL"}
            </label>
            {selectedOption === "file" ? (
              <input
                type="file"
                {...register("file")}
                className="block w-full border border-green-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            ) : (
              <input
                type="text"
                {...register("url")}
                placeholder="https://example.com/image.jpg"
                className="block w-full border border-green-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            )}
          </div>

          {/* Title input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Enter post title"
              className="w-full border border-green-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* Description input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="4"
              placeholder="Write something..."
              className="w-full border border-green-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Post
            </button>
          </div>
        </form>

        {/* Toast */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default NewPost;
