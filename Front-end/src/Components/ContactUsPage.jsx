import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/ContactUs.css'
import imag from '../assets/Logo.png'
import loginCheck from './LoginTokenCheck'


function ContactUsPage() {

    const login = loginCheck();

    return (
        <>
            <div>

                {/* HEADER  */}

                <header className='flex bg'>
                    <span className='logo'>
                        <img src={imag} alt="Logo" width={150} />
                    </span>
                    <span className='nav-btns'>
                        <Link to={'/'}>
                            <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Home</button>
                        </Link>
                        <Link to={'/news'} >
                            <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">News</button>
                        </Link>
                        <Link to={'/posts'}>
                            <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Posts</button>
                        </Link>
                        <Link to={'/products'}>
                            <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Products</button>
                        </Link>
                        <button className="mx-2 items-center border-none text-white font-normal text-lg cursor-pointer px-6 hover:border hover:px-1.45 hover:shadow-lg hover:rounded-md ">Videos</button>
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

                <div className='con-flex'>
                    <div className='left'>
                        <h1 className='head'>Contact Us</h1>
                        <form className='con-bg'>
                            <div className='inputs'>
                                <label>User Name</label>
                                <input type="text" name='userName' />
                            </div>
                            <div className='inputs'>
                                <label>E-Mail</label>
                                <input type="text" name='email' />
                            </div>
                            <div className='inputs'>
                                <label>Subject</label>
                                <input type="text" name='Subject' />
                            </div>
                            <div className='inputs'>
                                <label >Query</label>
                                <textarea name="query" cols="30" rows="5"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className='right'>
                        <h1 className='head'>Credits</h1>
                        <div className='con-bg'>
                            <p>Sustainify is a website who's sole motive is to create awareness among the people of Sustainible living preserve the environment for the future
                                generations, thsi means using the natural resources without affecting the amount of natural resources required for the future.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContactUsPage
