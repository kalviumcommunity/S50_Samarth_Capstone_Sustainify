import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import axios from 'axios';

function EditPost({ postId, onClose }) {
    const mdlRef = useRef();
    const { register, handleSubmit, setValue } = useForm();

    // Close modal when clicking outside
    const closeModal = (e) => {
        if (mdlRef.current === e.target) {
            onClose();
        }
    };

    // Fetch existing post data
    useEffect(() => {
        if (!postId) return;
        axios.get(`https://s50-samarth-capstone-sustainify.onrender.com/post/${postId}`)
            .then(res => {
                setValue('title', res.data.title);
                setValue('description', res.data.description);
            })
            .catch(err => {
                console.error('Error fetching post data:', err);
            });
    }, [postId, setValue]);

    const onSubmit = async (data) => {
        try {
            // Later: axios.put(...) to update
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            ref={mdlRef}
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <h1 className="text-2xl font-bold text-green-700 text-center mb-4">
                    Edit the Post
                </h1>
                <hr className="mb-4 border-green-200" />

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            {...register("title")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            rows="5"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPost;
