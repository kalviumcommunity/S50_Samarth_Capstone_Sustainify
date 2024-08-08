import React, { useEffect, useState } from 'react'
import './CSS/Products.css'
import { Link } from 'react-router-dom'
import loginCheck from './LoginTokenCheck'
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import BarLoader from "react-spinners/BarLoader";
import imag from '../assets/Logo.png'



function ProductsPage() {

    const login = loginCheck();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

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

                    <header className=' bg flex'>
                        <span className='logo'>
                            <img src={imag} alt="Logo" width={150} />
                        </span>
                        <span className='nav-btns'>
                            <Link to={'/'}>
                                <button>Home</button>
                            </Link>
                            <Link to={'/news'}>
                                <button>News</button>
                            </Link>
                            <Link to={'/posts'}>
                                <button>Posts</button>
                            </Link>
                            <Link to={'/videos'}>
                                <button>Videos</button>
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

                    {/* MAIN CONTAINER  */}

                    <div>
                        <div className='search'>
                            <input type="text" placeholder='🔍 Search...' />
                        </div>
                        <div className='products bg flex-prods'>
                            <div className='left-product'>
                                <div className='sort flex'>
                                    <span>
                                        <h1>Sort</h1>
                                        <p>What's new?</p>
                                    </span>
                                    <span>
                                        <ChevronDown />
                                    </span>
                                </div>
                                <div className='filter'>
                                    <h2>Filter</h2>
                                    <div className='flex option' >
                                        <h1> Bamboo Toothbrushes</h1>
                                        <ArrowUpRight />
                                    </div>
                                    <div className='flex option'>
                                        <h1>Reusable Shopping Bags</h1>
                                        <ArrowUpRight />
                                    </div>
                                    <div className='flex option'>
                                        <h1>Solar-Powered Chargers</h1>
                                        <ArrowUpRight />
                                    </div>
                                    <div className='flex option'>
                                        <h1>Recycled Paper Products</h1>
                                        <ArrowUpRight />
                                    </div>
                                    <div className='flex option'>
                                        <h1>LED Light Bulbs</h1>
                                        <ArrowUpRight />
                                    </div>
                                </div>
                            </div>
                            <div className='rigth-product'>
                                <div className='flex'>
                                    <div className="prod-cards">
                                        <img src="https://m.media-amazon.com/images/I/41XMv7Q2tKL._SX300_SY300_QL70_FMwebp_.jpg" alt="product image" />
                                        <h2>Rusabl Organic Bamboo Toothbrush Biodegradable (Pack of 4)
                                        </h2>
                                        <p>₹229(₹57.25 / count)</p>
                                    </div>
                                    <div className="prod-cards">
                                        <img src="https://m.media-amazon.com/images/I/41XMv7Q2tKL._SX300_SY300_QL70_FMwebp_.jpg" alt="product image" />
                                        <h2>Rusabl Organic Bamboo Toothbrush Biodegradable (Pack of 4)
                                        </h2>
                                        <p>₹229(₹57.25 / count)</p>
                                    </div>
                                    <div className="prod-cards">
                                        <img src="https://m.media-amazon.com/images/I/41XMv7Q2tKL._SX300_SY300_QL70_FMwebp_.jpg" alt="product image" />
                                        <h2>Rusabl Organic Bamboo Toothbrush Biodegradable (Pack of 4)
                                        </h2>
                                        <p>₹229(₹57.25 / count)</p>
                                    </div>
                                    <div className="prod-cards">
                                        <img src="https://m.media-amazon.com/images/I/41XMv7Q2tKL._SX300_SY300_QL70_FMwebp_.jpg" alt="product image" />
                                        <h2>Rusabl Organic Bamboo Toothbrush Biodegradable (Pack of 4)
                                        </h2>
                                        <p>₹229(₹57.25 / count)</p>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className="prod-cards">
                                        <img src="https://m.media-amazon.com/images/I/41XMv7Q2tKL._SX300_SY300_QL70_FMwebp_.jpg" alt="product image" />
                                        <h2>Rusabl Organic Bamboo Toothbrush Biodegradable (Pack of 4)
                                        </h2>
                                        <p>₹229(₹57.25 / count)</p>
                                    </div>
                                    <div className="prod-cards">
                                        <img src="https://m.media-amazon.com/images/I/41XMv7Q2tKL._SX300_SY300_QL70_FMwebp_.jpg" alt="product image" />
                                        <h2>Rusabl Organic Bamboo Toothbrush Biodegradable (Pack of 4)
                                        </h2>
                                        <p>₹229(₹57.25 / count)</p>
                                    </div>
                                    <div className="prod-cards">
                                        <img src="https://m.media-amazon.com/images/I/41XMv7Q2tKL._SX300_SY300_QL70_FMwebp_.jpg" alt="product image" />
                                        <h2>Rusabl Organic Bamboo Toothbrush Biodegradable (Pack of 4)
                                        </h2>
                                        <p>₹229(₹57.25 / count)</p>
                                    </div>
                                    <div className="prod-cards">
                                        <img src="https://m.media-amazon.com/images/I/41XMv7Q2tKL._SX300_SY300_QL70_FMwebp_.jpg" alt="product image" />
                                        <h2>Rusabl Organic Bamboo Toothbrush Biodegradable (Pack of 4)
                                        </h2>
                                        <p>₹229(₹57.25 / count)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </>
    )
}

export default ProductsPage
