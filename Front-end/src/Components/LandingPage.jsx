import React from 'react'
import { Link } from 'react-router-dom';
import loginCheck from './LoginTokenCheck'
import imag from '../assets/Logo.png'

function LandingPage() {
    const login = loginCheck();

    return (
        <div className="relative min-h-screen font-[Inter] bg-gradient-to-b from-green-600 via-white to-white text-green-900">

            {/* === NAVBAR === */}
            <header className="fixed top-0 w-full px-12 py-1 flex justify-between items-center bg-transparent backdrop-blur-md border-b border-gray-200 z-10">
                {/* Logo */}
                <span className="logo">
                    <img src={imag} alt="Logo" width={150} />
                </span>

                {/* Nav buttons */}
                <nav className="flex items-center gap-6 text-gray-600 font-medium z-1">
                    <Link to="/contact" className="group relative">
                        <span className="relative cursor-pointer transition-colors duration-300 group-hover:text-[#7dff9c]">
                            Contact us
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#7dff9c] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </Link>

                    {/* Conditional render for login/signup */}
                    {login ? (
                        <div className="flex items-center gap-3">
                            <span className="text-gray-600">Look at yourself →</span>
                            <Link to="/profile">
                                <button className="px-5 py-2 rounded-full font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300">
                                    Profile
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-green-200">New to world? →</span>
                            <Link to="/signUp">
                                <button className="px-5 py-2 rounded-sm font-semibold border-2 border-green-600 text-green-600 bg-white shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105">
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            {/* === CONTENT === */}
            <div className="relative top-40 z-10 max-w-3xl mx-auto px-5 pb-16 text-center animate-fadeInUp">
                <h1 className="text-6xl font-bold text-green-900 mb-3">Sustainify</h1>
                <h3 className="text-2xl text-green-500 mb-6">Eco-Living Made Simple 🌍</h3>
                <p className="text-[1.05rem] leading-8 mb-10">
                    Sustainify offers a streamlined solution for eco-conscious living,
                    providing personalized sustainability tips, access to eco-friendly products,
                    and a community of environmental enthusiasts. It centralizes resources and education,
                    helping individuals easily navigate their journey towards a more sustainable lifestyle,
                    uniting intention with action in environmental stewardship.
                </p>

                {login ? (
                    <Link to={'/posts'}>
                        <button className="px-5 py-2 rounded-sm font-semibold border-2 border-green-600 text-green-600 bg-white shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105">
                            Let's be the Change →
                        </button>
                    </Link>
                ) : (
                    <Link to={'/signUp'}>
                        <button className="px-5 py-2 rounded-sm font-semibold border-2 border-green-600 text-green-600 bg-white shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105">
                            Let's be the Change →
                        </button>
                    </Link>
                )}
            </div>

            {/* === ANIMATION KEYFRAME === */}
            <style>
                {`
                @keyframes fadeInUp {
                  from { opacity: 0; transform: translateY(40px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp {
                  animation: fadeInUp 1.2s ease forwards;
                }
                `}
            </style>
        </div>
    )
}

export default LandingPage
