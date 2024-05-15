import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';
import { FilePenLine, LogOut, ChevronsDown, ChevronsUp, ThumbsUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";

function ProfilePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [userPost, setUserPosts] = useState([]);

    // FUNCTION TO DELETE COOKIES
    const deleteToken = () => {
        Cookies.removeItem('token');
        Cookies.removeItem('Id');
        Cookies.removeItem('userData');

        alert("Logged-Out Successfully.");
        navigate('/');
    };

    // TOGGLE TO SHOW THE USER'S POSTS
    const showPosts = () => {
        if (toggle == false) {
            setToggle(true)
        }
        else {
            setToggle(false)
        }
    }


    useEffect(() => {
        const token = Cookies.getItem('token');
        const userID = Cookies.getItem('Id');

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
                console.log(token)
                console.log("hii", response.data)
                setUserInfo(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setLoading(false);
            });

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/user/myPosts/${userID}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
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
                                <img src={userInfo.img} alt="" />
                                <h1 className='font-bold mt-1'>{userInfo.userName}</h1>
                                <Link to={'/editProfile'} >
                                    <FilePenLine className='icon' />
                                </Link>
                            </div>
                            <div className='top-right pb-5 text-left mt-5'>
                                <h1 className='text-2xl	font-bold'>Information</h1>
                                <hr className='grey' />
                                <div className='space'>
                                    <h2 className='text-lg font-bold'>Name</h2>
                                    <p>{userInfo.name}</p>
                                </div>
                                <div >
                                    <h2 className='text-lg	font-bold '>Email</h2>
                                    <p>{userInfo.email}</p>
                                </div>
                                <div>
                                    <h2 className='text-lg	font-bold '>Phone Number</h2>
                                    <p>{userInfo.number}</p>
                                </div>
                            </div>
                        </div>
                        <div className='right-profile'>
                            <div className='bottom-right space'>
                                <h1>Achievements</h1>
                                <hr className='grey' />
                                <div className='space'>
                                    <h2 className='text-lg font-bold'>Sustainability Goal</h2>
                                    <p>
                                        {userInfo.goal}
                                    </p>
                                </div>
                                <br />
                                <div>
                                    <h2 className='text-lg font-bold'>Bio</h2>
                                    <p>{userInfo.bio}</p>
                                </div>
                            </div>
                            <div className='flex-space w-72 mt-10'>
                                <div className='disPost'>
                                    <button className='flex-space' onClick={showPosts}>
                                        See posts
                                        {toggle ? <ChevronsUp /> : <ChevronsDown />}
                                    </button>
                                </div>

                                <div className='flex log-out' onClick={deleteToken}>
                                    <button>Log out</button>
                                    <LogOut />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* POST PART */}
                    <div className='posts' >
                        <div>
                            {
                                toggle ?
                                    <div>
                                        {userPost && userPost.map((data, index) => (
                                            <div className='main-post' key={index}>
                                                <div className='card card-post'>
                                                    <div className='flex-card'>
                                                        <span>
                                                            <img src={data.img} alt='Image' width={'600px'} />
                                                        </span>
                                                        <span className='card-data'>
                                                            <h2>{data.title}</h2>
                                                            <br />
                                                            <p>{data.description}</p>
                                                        </span>
                                                    </div>
                                                    <div className='post-btns flex-space'>
                                                        <div className='like'>
                                                            <button className='flex-space like' onClick={() => increaseLikes(data.id)}>
                                                                <ThumbsUp />
                                                            </button>
                                                        </div>
                                                        <div className='flex-space'>
                                                            <button className='flex-space' >
                                                                {/* onClick={() => setMod(true)} */}
                                                                <FilePenLine />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ProfilePage;
