import React from 'react'
import './CSS/Profile.css'
import { FilePenLine, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies'

function ProfilePage() {
    const navigate = useNavigate();


    // FUNCTION TO DELETE COOKIES
    const deleteToken = () => {
        Cookies.removeItem('token')
        alert("Logged-Out Successfully.")
        navigate('/')
    }


    return (
        <>

            {/* HEADER */}

            <div className='bg profile-bg'>
                <header className=' flex'>
                    <span className='logo-post'>
                        <img src="../src/assets/Logo.png" alt="Logo" width={150} />
                    </span>
                    <span className='nav-btns'>
                        <Link to={'/'}>
                            <button>Home</button>
                        </Link>
                        <Link to={'/news'}>
                            <button>News</button>
                        </Link>
                        <Link to={'/post'}>
                            <button>Posts</button>
                        </Link>
                        <Link>
                            <button>Products</button>
                        </Link>
                        <Link to={'/videos'}>
                            <button>Videos</button>
                        </Link>
                        <Link to={'/contact'} >
                            <button>Contact Us</button>
                        </Link>
                    </span>
                </header>
            </div>

            {/* MAIN CONTAINER  */}

            <div className='profile'>
                <div className='left-profile'>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYapQGaZ_WSo2ev2rgJz7XIAS0st_kr7Vy8Eyz_9ay59X-98tH3uVMEjmPxw&s" alt="" />
                        <h1>Samarth S Alva</h1>
                        <h1>Software Developer</h1>
                        <FilePenLine className='icon' />
                    </div>
                </div>

                <div className='right-profile'>
                    <div className='top-right'>
                        <h1>Information</h1>
                        <hr className='grey' />
                        <div className='space'>
                            <h2>Email</h2>
                            <p>Youremail@gmail.com</p>
                        </div>
                        <div>
                            <h2>Phone Number</h2>
                            <p>1234567890</p>
                        </div>
                    </div>
                    <div className='bottom-right '>
                        <h1>Achievements</h1>
                        <hr className='grey' />
                        <div className='space'>
                            <h2>Sustaibility Goal</h2>
                            <p>Your goal goes here</p>
                        </div>
                        <div>
                            <h2>Bio</h2>
                            <p>Your bio goes here</p>
                        </div>
                    </div>
                    <div className='flex log-out'>
                        <button onClick={deleteToken}>Log out </button>
                        <LogOut />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfilePage
