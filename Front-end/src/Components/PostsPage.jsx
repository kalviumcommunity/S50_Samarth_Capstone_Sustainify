import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/PostsPage.css';
import NewPost from './NewPost';
import loginCheck from './LoginTokenCheck';
import BarLoader from 'react-spinners/BarLoader';
import { FilePenLine, MessageCircle, SendHorizonalIcon } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import EditPost from './EditPost';
import Cookies from 'js-cookies'


function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [showModal, setModal] = useState(false);
    const [displayMod, setMod] = useState(false);
    const login = loginCheck();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState({});
    const [comment, setComment] = useState(' ')
    const [postId, setID] = useState(' ')
    const id = Cookies.getItem('Id')
    // const [userName, setUserName] = useState([])




    // CODE TO GET DATA FROM THE DATA AND STORING IN STATE USING useState()
    useEffect(() => {
        setLoading(true);
        // if (!login) {
        //     alert("Seems like you havent Logged In! Please Log-In to Explore more ")
        // }
        axios.get('http://localhost:2001/post')
            .then((res) => {
                const postsData = res.data;
                setPosts(postsData);
                setLoading(false);
            })
            .catch((err) => {
                console.log('Error fetching the data', err);
                setLoading(false);
            });

        // const fetchUserName = async () => {
        //     try {
        //         const res = await axios.get(`http://localhost:2001/post/userName/${id}`);
        //         setUserName(res.data.userName)
        //     }
        //     catch (err) {
        //         console.error('Error fetching user data:', error);
        //     }
        // };

        // fetchUserName();

    }, []);

    // CODE FOR INCREASING THE LIKE COUNTER FOR THE POSTS 
    const increaseLikes = async (postId) => {
        try {
            const response = await axios.put(`http://localhost:2001/post/like/${postId}`, { id });
            // console.log(response.status)
            // console.log(updatedLikes,"These r the no.of likes")
            if (response.status === 400) {
                alert("U have already liked the post🎉🎉")
            }
            window.location.reload()
        }
        catch (error) {
            console.error('Error increasing likes:', error);
        }
    };

    // TOGGLE TO SEE THE COMMENTS AND POST COMMENTS
    const handleCommentSectionOpen = (postId) => {
        setID(postId);
        setToggle(prevState => ({ ...prevState, [postId]: !prevState[postId] }));
    };


    // CODE FOR POSTING COMMENTS 
    const handleCommentSubmit = async () => {
        try {
            if (postId) {
                await axios.post(`http://localhost:2001/post/comments/${postId}`, { comment, id });
                const updatedPosts = posts.map(post => post._id === postId ? { ...post, comments: [...post.comments, { text: comment }] } : post);
                setPosts(updatedPosts);
                setComment(' ');
            }
            else {
                console.error('No postId available for comment submission');
            }
        }
        catch (error) {
            console.log("Erorr handling requset", error)
        }
    };


    return (
        <>
            {loading ? (
                <div className='loading'>
                    <BarLoader color='#33f740' height={6} width={200} />
                </div>
            ) : (
                <div className='flex-post'>
                    {/* HEADER */}
                    <div>
                        <header className='flex-coln bg'>
                            <span className='logo-post'>
                                <img src='../src/assets/Logo.png' alt='Logo' width={150} />
                            </span>
                            <span className='nav-btns flex-coln'>
                                <Link to={'/'}>
                                    <button>Home</button>
                                </Link>
                                <Link to={'/news'}>
                                    <button>News</button>
                                </Link>
                                <Link to={'/products'}>
                                    <button>Products</button>
                                </Link>
                                <Link to={'/videos'}>
                                    <button>Videos</button>
                                </Link>
                                {login ? (
                                    <Link to={'/profile'}>
                                        <button className='profile-btn'>Profile</button>
                                    </Link>
                                ) : (
                                    <Link to={'/signUp'}>
                                        <button>Sign In</button>
                                    </Link>
                                )}

                                <button onClick={() => setModal(true)}>New Post</button>
                            </span>
                        </header>
                    </div>

                    {/* MAIN CONTAINER  */}

                    <div className='right-post'>
                        <h1 className='post-head'>Community</h1>
                        <div className='posts-flex'>
                            {login ? (
                                posts && posts.map((data, index) => (
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
                                                    <button className={`flex-space like ${data.likes.includes(Cookies.getItem('Id')) ? 'liked' : 'not-liked'}`} onClick={() => increaseLikes(data._id)}>
                                                        <ThumbsUp />
                                                        <p>{data.likes.length || 0}</p>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className='flex-space' onClick={() => setMod(true)}>
                                                        <FilePenLine />
                                                    </button>
                                                </div>
                                                <div className='comms-btn'>
                                                    <button className='flex-space' onClick={() => handleCommentSectionOpen(data._id)} >
                                                        <MessageCircle />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* COMMENTS PART */}

                                            <div>
                                                {toggle[data._id] && (
                                                    <div className='comments'>
                                                        <div>
                                                            <h1>Comments Section</h1>
                                                            {data.comments.map((comment, index) => (
                                                                <div key={index} className='cmt'>
                                                                    <div className='flex-space '>
                                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYapQGaZ_WSo2ev2rgJz7XIAS0st_kr7Vy8Eyz_9ay59X-98tH3uVMEjmPxw&s" alt="" />
                                                                        <h2>Name</h2>
                                                                    </div>
                                                                    <div className='comment-text'>
                                                                        {comment.text}
                                                                    </div>

                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className='flex-space comms-write'>
                                                            <input
                                                                type="text" placeholder='Write your comment here...' value={comment} onChange={(e) => setComment(e.target.value)}
                                                            />
                                                            <button onClick={handleCommentSubmit} >
                                                                <SendHorizonalIcon />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    {navigate('/login')}
                                </div>
                            )}


                        </div>

                    </div>

                    {/* NEW POST MODAL  */}
                    {showModal && <NewPost onClose={() => setModal(false)} />}

                    {/* EDIT POST MODAL  */}
                    {displayMod && <EditPost onClose={() => setMod(false)} />}
                </div>
            )}
        </>
    );
}

export default PostsPage;
