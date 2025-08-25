import React, { useEffect, useState } from 'react';
import { FilePenLine, LogOut, ChevronsDown, ChevronsUp, ThumbsUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import imag from '../assets/Logo.png';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [userPost, setUserPosts] = useState([]);

    const deleteToken = () => {
        Cookies.removeItem('token');
        Cookies.removeItem('Id');
        Cookies.removeItem('userData');

        toast.success('Logged-Out Successfully!', {
            onClose: () => navigate('/')
        });
    };

    const showPosts = () => setToggle(prev => !prev);

    useEffect(() => {
        const token = Cookies.getItem('token');
        const userID = Cookies.getItem('Id');

        if (!token) {
            setLoading(false);
            return;
        }

        axios.get('https://s50-samarth-capstone-sustainify.onrender.com/user/verify', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setUserInfo(response.data))
            .catch(error => console.error('Error fetching user details:', error))
            .finally(() => setLoading(false));

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://s50-samarth-capstone-sustainify.onrender.com/user/myPosts/${userID}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-50">
                    <BarLoader color="#22c55e" height={6} width={200} />
                </div>
            ) : (
                <div className="min-h-screen bg-gradient-to-br my-[-10px] from-green-50 via-white to-green-100">
                    {/* HEADER */}
                    <header className="flex items-center justify-between px-10 shadow-md bg-green-700">
                        <img src={imag} alt="Logo" width={140} />
                        <nav className="flex items-center gap-6 text-white font-medium">
                            {["posts", "products", "videos", "contact"].map((item, i) => (
                                <Link key={i} to={`/${item}`} className="relative group">
                                    <span className="cursor-pointer transition-colors duration-300 group-hover:text-[#7dff9c]">
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </span>
                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#7dff9c] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>
                    </header>

                    {/* MAIN PROFILE SECTION */}
                    <main className="p-8 h-full max-w-4xl mx-auto border-2 m-5 rounded-2xl flex">
                        <ToastContainer position="top-center" autoClose={2000} theme="light" transition={Bounce} />

                        {/* PROFILE HEADER */}
                        <div className="flex flex-col items-center mb-10">
                            <img
                                src={userInfo.img}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md"
                            />
                            <h1 className="text-2xl font-bold mt-3 text-green-700">{userInfo.userName}</h1>
                            <Link
                                to="/editProfile"
                                className="mt-2 text-green-600 hover:text-green-800 flex items-center gap-1 font-medium"
                            >
                                <FilePenLine size={18} /> Edit Profile
                            </Link>

                            {/* Information */}

                            <div className='bg-white rounded-2xl shadow-lg border border-green-200 p-8 mt-5'>
                                <h2 className="text-lg font-bold text-green-700 mb-2">Information</h2>
                                <hr className="mb-4 border-green-300" />
                                <div className="space-y-3 text-gray-700">
                                    <p><span className="font-semibold">Name:</span> {userInfo.name}</p>
                                    <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
                                    <p><span className="font-semibold">Phone:</span> {userInfo.number}</p>
                                </div>
                            </div>
                        </div>

                        {/* ACHIEVEMENTS BOX */}  
                        <div className=" bg-white rounded-2xl shadow-lg border border-green-200 p-8 grid grid-flow-row lg:grid-row-2 gap-6 ml-10 ">


                            {/* Achievements */}
                            <div>
                                <h2 className="text-lg font-bold text-green-700 mb-2">Achievements</h2>
                                <hr className="mb-4 border-green-300" />
                                <div className="space-y-3 text-gray-700">
                                    <div>
                                        <h3 className="font-semibold">Sustainability Goal</h3>
                                        <p>{userInfo.goal}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Bio</h3>
                                        <p>{userInfo.bio}</p>
                                    </div>
                                </div>
                            </div>
                            {/* BUTTONS */}
                            <div className="flex gap-2">
                                <button
                                    className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                                    onClick={showPosts}
                                >
                                    See Posts
                                    {toggle ? <ChevronsUp /> : <ChevronsDown />}
                                </button>

                                <button
                                    className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                                    onClick={deleteToken}
                                >
                                    Log Out <LogOut size={18} />
                                </button>
                            </div>
                        </div>


                    </main>

                    {/* POSTS */}
                    {toggle && (
                        <section className="w-full max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                                Your Posts
                            </h2>

                            <div className="space-y-8">
                                {userPost.map((data, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-md border border-green-200 overflow-hidden hover:shadow-lg transition"
                                    >
                                        <img
                                            src={data.img}
                                            alt="Post"
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="p-5">
                                            <h3 className="font-bold text-xl text-green-700">{data.title}</h3>
                                            <p className="text-gray-600 mt-2">{data.description}</p>

                                            <div className="flex justify-between items-center mt-4">
                                                <button className="flex items-center gap-1 text-green-600 cursor-default">
                                                    <ThumbsUp size={18} />{data.likes.length} Likes 
                                                </button>
                                                <button className="flex items-center gap-1 text-gray-600 hover:text-black">
                                                    <FilePenLine size={18} /> Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            )}
        </>
    );
}

export default ProfilePage;
