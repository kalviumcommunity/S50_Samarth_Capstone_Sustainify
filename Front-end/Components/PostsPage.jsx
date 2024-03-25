import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './CSS/PostsPage.css'
import NewPost from './NewPost';


function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [showModal, setModal] = useState(false)
    const [likes, setLike] = useState(0);

    
    // CODE FOR INCREASING THE LIKE COUNTER FOR THE POSTS 
    const increse = () => {
        setLike(likes + 1)
    }


    // CODE TO GET DATA FROM THE DATA AND STORING IN STATE USING useState()
    useEffect(() => {
        axios.get('http://localhost:2001/post')
            .then(
                res => setPosts(res.data)
            )
            .catch(err => {
                console.log('Error fetching the data', err);
            });
    }, []);

    return (
        <>
            <div className='flex-post'>
                {/* HEADER */}
                <div>
                    <header className='flex-coln bg'>
                        <span className='logo-post'>
                            <img src="../src/assets/Logo.png" alt="Logo" width={150} />
                        </span>
                        <span className='nav-btns flex-coln'>
                            <Link to={'/'}>
                                <button>Home</button>
                            </Link>
                            <Link to={'/news'}>
                                <button>News</button>
                            </Link>
                            <Link>
                                <button>Products</button>
                            </Link>
                            <Link>
                                <button>Videos</button>
                            </Link>
                            <Link to={'/contact'} >
                                <button>Contact Us</button>
                            </Link>
                            <button onClick={() => setModal(true)}>New Post</button>
                        </span>
                    </header>
                </div>

                {/* MAIN CONTIANER  */}

                <div className='right-post'>
                    <h1 className='post-head' >Community</h1>
                    <div className='posts-flex'>
                        {posts && posts.map((data, index) => (
                            <div className='main-post ' key={index}>
                                <div className='card card-post'>
                                    <div className='flex-card'>
                                        <span><img src={data.img} alt="Image" width={'600px'} /></span>
                                        <span className='card-data'>
                                            <h2>{data.title}</h2><br />
                                            <p>{data.description}</p>
                                        </span>
                                    </div>
                                    <div className='like'>
                                        <button onClick={increse} >Like♡ {likes}</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* NEW POST MODAL  */}
                {showModal && <NewPost onClose={() => setModal(false)} />}

            </div>
        </>
    )
}

export default PostsPage
