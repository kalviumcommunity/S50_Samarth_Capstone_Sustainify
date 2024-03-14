import React from 'react'
import './CSS/Landing.css'

function LandingPage() {
    return (
        <div>
            <header className='flex'>
                <span className='flex logo'>
                    <img src="../src/assets/Logo.png" alt="Logo" width={160} height={100} />
                    <h1>Sustainify</h1>
                </span>
                <span className='nav-btns'>
                    <button>News</button>
                    <button>Posts</button>
                    <button>Products</button>
                    <button>Videos</button>
                    <button>Contact Us</button>
                    <button>Sign-Up</button>
                </span>
            </header>
            <div className='container'>
                <h1>Sustainify</h1>
                <p>Sustainify offers a streamlined solution for eco-conscious living, providing personalized sustainability tips,
                    access to eco-friendly products, and a community of environmental enthusiasts. It centralizes resources and education,
                    helping individuals easily navigate their journey towards a more sustainable lifestyle, uniting intention with action
                    in environmental stewardship.</p>
                <button>Let's be the Change →</button>
            </div>
            <footer>
                <h2>We do not inherit the earth from our ancestors, we borrow it from our children.”<span> <br />– Native American Proverb</span></h2>
            </footer>
        </div>
    )
}

export default LandingPage
