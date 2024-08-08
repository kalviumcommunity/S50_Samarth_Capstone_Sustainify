import React from 'react'
import './CSS/Landing.css'
import { Link } from 'react-router-dom';
import loginCheck from './LoginTokenCheck'
import imag from '../assets/Logo.png'


function LandingPage() {

    // CHECKING WHETHER THE USER HAVE SIGNED-UP OR NO 
    const login = loginCheck();

    return (
        <div className='background-image'>

            {/* HEADER */}

            <header className='flex'>
                <span className='logo'>
                    <img src={imag} alt="Logo" width={150} />
                </span>
                <span className="nav-btns w-[780px]">
                    <Link to={'/news'}>
                        <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">News</button>
                    </Link>
                    <Link to={'/posts'}>
                        <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Posts</button>
                    </Link>
                    <Link to={'/products'}>
                        <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Products</button>
                    </Link>
                    <Link to={'/videos'}>
                        <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Videos</button>
                    </Link>
                    <Link to={'/contact'}>
                        <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Contact Us</button>
                    </Link>
                    {login ?
                        <Link to={'/profile'}>
                            <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Profile</button>
                        </Link>
                        :
                        <Link to={'/signUp'}>
                            <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Sign In</button>
                        </Link>
                    }
                </span>

            </header>

            {/* MAIN CONTAINER  */}

            <div className='container ml-8'>
                <h1 className='font-serif'>Sustainify</h1>
                <p className='font-sans'>Sustainify offers a streamlined solution for eco-conscious living, providing personalized sustainability tips,
                    access to eco-friendly products, and a community of environmental enthusiasts. It centralizes resources and education,
                    helping individuals easily navigate their journey towards a more sustainable lifestyle, uniting intention with action
                    in environmental stewardship.</p>
                {login ?
                    <Link to={'/posts'}>
                        <button>Let's be the Change →</button>
                    </Link>
                    :
                    <Link to={'/signUp'}>
                        <button>Let's be the Change →</button>
                    </Link>
                }

            </div>
        </div>
    )
}

export default LandingPage
