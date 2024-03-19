import React from 'react'
import './CSS/Landing.css'
import { Link } from 'react-router-dom';


function LandingPage() {
    return (
        <div>
            <header className='flex'>
                <span className='logo'>
                    <img src="../src/assets/Logo.png" alt="Logo" width={150} />
                </span>
                <span className='nav-btns'>
                    <button>News</button>
                    <button>Posts</button>
                    <button>Products</button>
                    <button>Videos</button>
                    <button>Contact Us</button>
                    <Link to={'/signUp'}>
                        <button>Sign In</button>
                    </Link>
                </span>
            </header>
            <div className='container'>
                <h1>Sustainify</h1>
                <p>Sustainify offers a streamlined solution for eco-conscious living, providing personalized sustainability tips,
                    access to eco-friendly products, and a community of environmental enthusiasts. It centralizes resources and education,
                    helping individuals easily navigate their journey towards a more sustainable lifestyle, uniting intention with action
                    in environmental stewardship.</p>
                <Link to={'/news'}>
                    <button>Let's be the Change →</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage
