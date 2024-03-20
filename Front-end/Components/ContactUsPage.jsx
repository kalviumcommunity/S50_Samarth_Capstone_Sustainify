import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/ContactUs.css'


function ContactUsPage() {
    return (
        <>
            <div>

                {/* HEADER  */}

                <header className='flex bg'>
                    <span className='logo'>
                        <img src="../src/assets/Logo.png" alt="Logo" width={150} />
                    </span>
                    <span className='nav-btns'>
                        <Link to={'/'}>
                            <button>Home</button>
                        </Link>
                        <Link to={'/news'} >
                            <button>News</button>
                        </Link>
                        <button>Posts</button>
                        <button>Products</button>
                        <button>Videos</button>
                        <Link to={'/signUp'}>
                            <button>Sign In</button>
                        </Link>
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
