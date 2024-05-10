import React, { useEffect, useState } from 'react'
import './CSS/Videos.css'
import { Link } from 'react-router-dom';
import loginCheck from './LoginTokenCheck'
import ReactPlayer from 'react-player'
import BarLoader from "react-spinners/BarLoader";


function Videos() {

    const login = loginCheck();
    const [loading, setLoading] = useState(false);


    // LOADING ANIMATION
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])

    return (
        <>
            {
                loading ?
                    <div className='loading'>
                        <BarLoader
                            color="#33f740"
                            height={6}
                            width={200}
                        />
                    </div>

                    :

                    <div className='flex-prods whole-container'>
                        <div className='pos'>

                            {/* TOP CATEGORIES BAR  */}

                            <div className='bg top-bar'>
                                <div className='srch'>
                                    <input type="text" placeholder='Search...                              🔍 ' />
                                </div>
                            </div>

                            {/* SIDE BAR / NAV BAR */}

                            <div className='vids-header'>
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
                                        <Link to={'/posts'}>
                                            <button>Posts</button>
                                        </Link>
                                        <Link to={'/products'}>
                                            <button>Products</button>
                                        </Link>
                                        <Link to={'/contact'}>
                                            <button>Contact Us</button>
                                        </Link>
                                        {login ?
                                            <Link to={'/profile'}>
                                                <button>Profile</button>
                                            </Link>
                                            :
                                            <Link to={'/signUp'}>
                                                <button>Sign In</button>
                                            </Link>
                                        }
                                    </span>
                                </header>
                            </div>
                        </div>

                        {/* MAIN VIDEO PART  */}

                        <div className='video-part'>
                            <div className='video-part'>
                                <div className='vids'>
                                    <ReactPlayer className='player' controls url='https://youtu.be/jfsWI8XgQyo?si=hxC2mDsA2zebwLnd' width={'25vw'} height={'30vh'} />
                                    <label >BIC: Two minutes to understand sustainable development</label>
                                </div>
                                <div className='vids'>
                                    <ReactPlayer className='player' controls url='https://youtu.be/fsWr0LfM_uQ?si=b2BnDBXDxyE9Lx6W' width={'25vw'} height={'30vh'} />
                                    <label >What Is the Most Sustainable City in the World?</label>
                                </div>
                                <div className='vids'>
                                    <ReactPlayer className='player' controls url='https://youtu.be/99VrWNJyJ3E?si=7KCbdXSaZQ1EjEIa' width={'25vw'} height={'30vh'} />
                                    <label >What is SUSTAINABILITY? Explained By An Expert</label>
                                </div>
                            </div>
                            <div className='video-part'>
                                <div className='vids'>
                                    <ReactPlayer className='player' controls url='https://youtu.be/RIMs211GWxs?si=ywFyHTML0PwHsGvW' width={'25vw'} height={'30vh'} />
                                    <label >Universities and Sustainable Development Goals 2030: Targets & Practices Conference Opening Session</label>
                                </div>
                                <div className='vids'>
                                    <ReactPlayer controls url='https://youtu.be/8Nw6Dh5uyTA?si=os-YRGpj2zS18q8M' width={'25vw'} height={'30vh'} />
                                    <label >Utilizing water's potential to attain sustainable development goals</label>
                                </div>
                                <div className='vids'>
                                    <ReactPlayer className='player' controls url='https://youtu.be/iq4IniNukRo?si=jGMzHxGXMk7I-MKO' width={'25vw'} height={'30vh'} />
                                    <label >NMI Green Growth Working Summit Addresses Sustainable Development Goals</label>
                                </div>
                            </div>
                            <div className='video-part'>
                                <div className='vids'>
                                    <ReactPlayer controls url='https://youtu.be/X5zHBCsz42I?si=by3TfyuSvFdn7vNX' width={'25vw'} height={'30vh'} />
                                    <label >Sustainable Development Goals In Hindi | Tricks To Remember SDG | UN Sustainable Development Goals</label>
                                </div>
                                <div className='vids'>
                                    <ReactPlayer controls url='https://youtu.be/B-dCmbViDEQ?si=epp5Fhd3WCZCXCPR' width={'25vw'} height={'30vh'} />
                                    <label >Defining Sustainability: Absolutely | Anjila Hjalsted | TEDxGoodenoughCollege</label>
                                </div>
                                <div className='vids'>
                                    <ReactPlayer controls url='https://youtu.be/kZIrIQDf1nQ?si=CUvohk2VfK5ZzPf0' width={'25vw'} height={'30vh'} />
                                    <label >Sustainability in everyday life | Sustainability</label>
                                </div>
                            </div>
                            <div className='video-part'>
                                <div className='vids'>
                                    <ReactPlayer controls url='https://youtu.be/CfM0MxBfi2g?si=eb-NYTkEGgcozdb-' width={'25vw'} height={'30vh'} />
                                    <label >8 Sustainable Practices In The Workplace</label>
                                </div>
                                <div className='vids'>
                                    <ReactPlayer controls url='https://youtu.be/_6xlNyWPpB8?si=Xq7BHa8HHlFo9W2E' width={'25vw'} height={'30vh'} />
                                    <label >What really happens to the plastic you throw away - Emma Bryce</label>
                                </div>
                                <div className='vids'>
                                    <ReactPlayer controls url='https://youtu.be/Yomf5pBN8dY?si=ChgBG4lhR_Y7ZLtg' width={'25vw'} height={'30vh'} />
                                    <label >Why We Need to Stop Plastic Pollution in Our Oceans FOR GOOD | Oceana</label>
                                </div>
                            </div>
                        </div>



                    </div>
            }

        </>
    )
}

export default Videos
