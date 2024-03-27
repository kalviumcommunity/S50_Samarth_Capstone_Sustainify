import React, { useEffect, useState } from 'react'
import './CSS/Landing.css'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookies'

function LandingPage() {
    const [login, setlogin] = useState(false);

    useEffect(() => {
        const token = Cookies.getItem('token')

        if (token) {
            setlogin(true);
        }
        else {
            setlogin(false);
        }
    })

    return (
        <div className='background-image'>

            {/* HEADER */}

            <header className='flex'>
                <span className='logo'>
                    <img src="../src/assets/Logo.png" alt="Logo" width={150} />
                </span>
                <span className='nav-btns'>
                    <Link to={'/news'}>
                        <button>News</button>
                    </Link>
                    <Link to={'/posts'}>
                        <button>Posts</button>
                    </Link>
                    <button>Products</button>
                    <button>Videos</button>
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

            <div className='container'>
                <h1>Sustainify</h1>
                <p>Sustainify offers a streamlined solution for eco-conscious living, providing personalized sustainability tips,
                    access to eco-friendly products, and a community of environmental enthusiasts. It centralizes resources and education,
                    helping individuals easily navigate their journey towards a more sustainable lifestyle, uniting intention with action
                    in environmental stewardship.</p>
                {login ?
                    <Link to={'/news'}>
                        <button>Let's be the Change →</button>
                    </Link>
                    :
                    <Link to={'/signUp'}>
                        <button>Let's be the Change →</button>
                    </Link>
                }

            </div>
        </div>
    )
}

export default LandingPage
