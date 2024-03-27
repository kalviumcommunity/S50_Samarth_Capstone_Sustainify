import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './CSS/News.css'


function NewsPage() {

  const [news, setNews] = useState([]);
  const defaultURL="https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"
  const defaultText = "Click on read more to read more"


// FETCHING DATA FROM THE API AND THEN STORING IN STATE 
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
            <Link to={'/posts'}>
            <button>Posts</button>
            </Link>
            <button>Products</button>
            <button>Videos</button>
            <Link to={'/profile'}>
              <button>Profile</button>
            </Link>
            <Link to={'/contact'} >
              <button>Contact Us</button>
            </Link>
          </span>
        </header>
        <hr />

        {/* MAIN CONTAINER  */}

        <h1 className='latest'>Todays Latest news</h1>
        <div className='news'>
          {
           news && news.map((ele,index) => {
              return (
                <>
                  <div className='card' key={index} >
                    <img src={!ele.urlToImage ? defaultURL : ele.urlToImage} alt="here is the img" />
                    <div className='card-body' >
                      <h3 className='card-title'>{ele.title}</h3>
                      <p className='card-text'>{!ele.description ? defaultText : ele.description } </p>
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
