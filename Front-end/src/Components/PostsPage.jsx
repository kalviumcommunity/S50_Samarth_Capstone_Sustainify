import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/PostsPage.css';
import NewPost from './NewPost';
import loginCheck from './LoginTokenCheck';
import BarLoader from 'react-spinners/BarLoader';
import { FilePenLine, MessageCircle, SendHorizonalIcon, ThumbsUp } from 'lucide-react';
import EditPost from './EditPost';
import Cookies from 'js-cookies';
import imag from '../assets/Logo.png';

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [showModal, setModal] = useState(false);
    const [displayMod, setMod] = useState(false);
    const login = loginCheck();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState({});
    const [comment, setComment] = useState('');
    const [postId, setID] = useState('');
    const id = Cookies.getItem('Id');
    const token = Cookies.getItem('token');

    useEffect(() => {
        setLoading(true);
        axios.get('https://s50-samarth-capstone-sustainify.onrender.com/post')
            .then((res) => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log('Error fetching the data', err);
                setLoading(false);
            });
    }, []);

    const increaseLikes = async (postId) => {
        try {
            const response = await axios.put(
                `http://localhost:2001/post/like/${postId}`,
                { id }
            );

            if (response.status === 200) {
                const updatedPosts = posts.map((post) => {
                    if (post._id === postId) {
                        const newLikes = post.likes.includes(id)
                            ? post.likes.filter((likeId) => likeId !== id)
                            : [...post.likes, id];
                        return { ...post, likes: newLikes };
                    }
                    return post;
                });
                setPosts(updatedPosts);
            }
        } catch (error) {
            console.error('Error increasing likes:', error);
        }
    };

    const handleCommentSectionOpen = (postId) => {
        setID(postId);
        setToggle((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };

    const handleCommentSubmit = async () => {
        try {
            if (postId) {
                await axios.post(
                    `http://localhost:2001/post/comments/${postId}`,
                    { comment, id }
                );

                const updatedPosts = posts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, { text: comment }] }
                        : post
                );
                setPosts(updatedPosts);
                setComment('');
            } else {
                console.error('No postId available for comment submission');
            }
        } catch (error) {
            console.log('Error handling request', error);
        }
    };

    return (
        <>
            {loading ? (
                <div className="loading">
                    <BarLoader color="#33f740" height={6} width={200} />
                </div>
            ) : (
                <div className="flex-post">
                    {/* HEADER */}
                    <div>
                        <header className="min-full fixed bg-green-800">
                            <img src={imag} alt="Logo" width={150} className="m-4" />
                            <span className="flex-coln mt-14">
                                <Link to="/products">
                                    <button className="bg-[#7ee982] border-none w-32 text-white py-2 px-4 rounded-md">
                                        Products
                                    </button>
                                </Link>
                                <Link to="/videos">
                                    <button className="bg-[#7ee982] border-none w-32 text-white py-2 px-4 rounded-md">
                                        Videos
                                    </button>
                                </Link>
                                {login ? (
                                    <Link to="/profile">
                                        <button className="bg-[#7ee982] border-none w-32 text-white py-2 px-4 rounded-md">
                                            Profile
                                        </button>
                                    </Link>
                                ) : (
                                    <Link to="/signUp">
                                        <button className="bg-[#7ee982] border-none w-32 text-white py-2 px-4 rounded-md">
                                            Sign In
                                        </button>
                                    </Link>
                                )}
                                <button
                                    onClick={() => setModal(true)}
                                    className="bg-[#7ee982] border-none w-32 text-white py-2 px-4 ml-9  rounded-md"
                                >
                                    New Post
                                </button>
                            </span>
                        </header>
                    </div>

                    {/* MAIN CONTAINER */}
                    <div className="right-post">
                        <h1 className="text-[35px] text-green-800 italic font-bold ml-64 mt-4">
                            Community
                        </h1>

                        <div className="space-y-8 mt-6 mr-20">
                            {login ? (
                                posts.map((data) => (
                                    <div
                                        key={data._id}
                                        className="bg-white rounded-xl shadow-md border border-green-200 overflow-hidden hover:shadow-lg transition w-[700px]"
                                    >
                                        <img
                                            src={data.img}
                                            alt="Post"
                                            className="w-[700px]"
                                        />
                                        <div className="p-5">
                                            <h3 className="font-bold text-xl text-green-700">
                                                {data.title}
                                            </h3>
                                            <p className="text-gray-600 mt-2">
                                                {data.description}
                                            </p>

                                            <div className="flex justify-between items-center mt-4">
                                                {/* Like Button */}
                                                <button
                                                    onClick={() => increaseLikes(data._id)}
                                                    className={`flex items-center gap-1 ${
                                                        data.likes.includes(id)
                                                            ? "text-white font-bold bg-red-500 p-1 rounded-[11px]"
                                                            : "text-green-600 hover:text-red-500"
                                                    }`}
                                                >
                                                    <ThumbsUp size={18} />{" "}
                                                    {data.likes.length} Likes
                                                </button>

                                                {/* Edit Button only if owner */}
                                                {id === data.createdBy && (
                                                    <button
                                                        onClick={() => {
                                                            setID(data._id);
                                                            setMod(true);
                                                        }}
                                                        className="flex items-center gap-1 text-gray-600 hover:text-black"
                                                    >
                                                        <FilePenLine size={18} /> Edit
                                                    </button>
                                                )}

                                                {/* Comments Button */}
                                                <button
                                                    onClick={() =>
                                                        handleCommentSectionOpen(data._id)
                                                    }
                                                    className="flex items-center gap-1 text-gray-600 hover:text-green-600"
                                                >
                                                    <MessageCircle size={18} /> Comments
                                                </button>
                                            </div>

                                            {/* COMMENTS SECTION */}
                                            {toggle[data._id] && (
                                                <div className="mt-4 border-t pt-4">
                                                    <h1 className="font-semibold text-lg">
                                                        Comments
                                                    </h1>
                                                    {data.comments.map((comment, index) => (
                                                        <div
                                                            key={index}
                                                            className="mt-2 p-2 border rounded-md shadow-sm"
                                                        >
                                                            <div className="flex items-center w-20">
                                                                <img
                                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYapQGaZ_WSo2ev2rgJz7XIAS0st_kr7Vy8Eyz_9ay59X-98tH3uVMEjmPxw&s"
                                                                    alt="avatar"
                                                                    className="w-7 h-7 rounded-full"
                                                                />
                                                                <h2 className="text-sm font-bold">
                                                                    Name
                                                                </h2>
                                                            </div>
                                                            <div className="mt-1 text-gray-700">
                                                                {comment.text}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Comment Input */}
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Write your comment..."
                                                            value={comment}
                                                            onChange={(e) =>
                                                                setComment(e.target.value)
                                                            }
                                                            className="flex-1 border border-gray-300 p-2 rounded"
                                                        />
                                                        <button
                                                            onClick={handleCommentSubmit}
                                                            className="text-gray-700 hover:text-green-600"
                                                        >
                                                            <SendHorizonalIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                navigate('/login')
                            )}
                        </div>
                    </div>

                    {/* NEW POST MODAL */}
                    {showModal && <NewPost onClose={() => setModal(false)} />}

                    {/* EDIT POST MODAL */}
                    {displayMod && <EditPost postId={postId} onClose={() => setMod(false)} />}
                </div>
            )}
        </>
    );
}

export default PostsPage;
