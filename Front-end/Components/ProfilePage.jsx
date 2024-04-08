import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';
import { FilePenLine, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";

function ProfilePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState('');

    // FUNCTION TO DELETE COOKIES
    const deleteToken = () => {
        Cookies.removeItem('token');
        alert("Logged-Out Successfully.");
        navigate('/');
    };

    useEffect(() => {
        setLoading(true);
        const token = Cookies.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }
        axios.get('http://localhost:2001/user/verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUserInfo(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setLoading(false);
            });

    }, []);

    return (
        <>
            {loading ?
                <div className='loading'>
                    <BarLoader
                        color="#33f740"
                        height={6}
                        width={200}
                    />
                </div>
                :
                <div>
                    {/* HEADER */}
                    <div className='bg profile-bg'>
                        <header className='flex'>
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
                                <Link to={'/products'}>
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
                                <h1>{userInfo.name}</h1>
                                <h1>{userInfo.role}</h1>
                                <FilePenLine className='icon' />
                            </div>
                        </div>
                        <div className='right-profile'>
                            <div className='top-right'>
                                <h1>Information</h1>
                                <hr className='grey' />
                                <div className='space'>
                                    <h2>Email</h2>
                                    <p>{userInfo.email}</p>
                                </div>
                                <div>
                                    <h2>Phone Number</h2>
                                    <p>{userInfo.phoneNumber}</p>
                                </div>
                            </div>
                            <div className='bottom-right'>
                                <h1>Achievements</h1>
                                <hr className='grey' />
                                <div className='space'>
                                    <h2>Sustainability Goal</h2>
                                    <p>
                                        To live a Sustainibile life and contribute towards the betterment of the environment
                                    </p>
                                </div>
                                <div>
                                    <h2>Bio</h2>
                                    <p>{userInfo.bio}</p>
                                </div>
                            </div>
                            <div className='flex log-out' onClick={deleteToken}>
                                <button>Log out</button>
                                <LogOut />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ProfilePage;
