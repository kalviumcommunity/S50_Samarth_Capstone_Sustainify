import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './CSS/News.css'


function NewsPage() {

  const [news, setNews] = useState([]);
  const defaultURL="https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"

  const fecthData = async () => {
    let res = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=32ea84c3ad124191883db3dba95886e0")
    let data = await res.json()
    setNews(data.articles)
  }

  useEffect(() => {
    fecthData()
  }, [])


  return (
    <>
      <div className="news-header">

        {/* HEADER */}

        <header className='flex'>
          <span className='logo'>
            <img src="../src/assets/Logo.png" alt="Logo" width={150} />
          </span>
          <span className='nav-btns'>
            <Link to={'/'}>
              <button>Home</button>
            </Link>
            <button>Posts</button>
            <button>Products</button>
            <button>Videos</button>
            <Link to={'/contact'} >
              <button>Contact Us</button>
            </Link>
            <Link to={'/signUp'}>
              <button>Sign In</button>
            </Link>
          </span>
        </header>
        <hr />

        {/* MAIN CONTAINER  */}

        <h1 className='latest'>Todays Latest news</h1>
        <div className='news'>
          {
            news.map((ele) => {
              return (
                <>
                  <div className='card' >
                    <img src={ele.urlToImage == null ? defaultURL : ele.urlToImage} alt="here is the img" />
                    <div className='card-body' >
                      <h3 className='card-title'>{ele.title}</h3>
                      <p className='card-text'>{ele.description} </p>
                      <a href={ele.url} target='_blank'><button>Read more</button></a>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>

    </>
  )
}

export default NewsPage
