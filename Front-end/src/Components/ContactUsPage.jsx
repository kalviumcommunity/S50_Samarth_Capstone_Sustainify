import React from "react";
import { Link } from "react-router-dom";
import imag from "../assets/Logo.png";
import loginCheck from "./LoginTokenCheck";

function ContactUsPage() {
    const login = loginCheck();

    return (
        <div className="min-h-screen bg-gradient-to-t from-green-100 to-green-800">
            {/* HEADER */}
            <header className="flex items-center justify-between px-16 mt-[-10px] backdrop-blur-md shadow-md">
                <div className="flex items-center">
                    <img src={imag} alt="Logo" width={150} />
                </div>

                <nav className="flex items-center gap-6 text-white font-medium">
                    <Link to="/" className="hover:underline hover:underline-offset-4">
                        Home
                    </Link>

                    {login ? (
                        <Link to="/profile">
                            <button className="ml-4 px-5 py-1 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition">
                                Profile
                            </button>
                        </Link>
                    ) : (
                        <Link to="/signUp">
                            <button className="ml-4 px-5 py-1 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-700 hover:scale-105 transition">
                                Sign In
                            </button>
                        </Link>
                    )}
                </nav>
            </header>

            {/* MAIN */}
            <main className="flex flex-col lg:flex-row justify-center items-start gap-12 px-10 py-14 flex-grow">
                {/* LEFT CREDITS */}
                <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 max-w-lg">
                    <h1 className="text-3xl font-bold text-green-700 mb-6">Credits</h1>
                    <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-green-700">Sustainify</span> is
                        a website whose sole motive is to create awareness among people
                        about sustainable living and preserving the environment for future
                        generations. This means using natural resources responsibly without
                        compromising their availability for the future.
                    </p>
                </div>

                {/* RIGHT FORM */}
                <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 max-w-md">
                    <h1 className="text-3xl font-bold text-green-700 mb-6">Contact Us</h1>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                User Name
                            </label>
                            <input
                                type="text"
                                name="userName"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                E-Mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Query
                            </label>
                            <textarea
                                name="query"
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ContactUsPage;
