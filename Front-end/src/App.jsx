import React from 'react'
import LandingPage from '../Components/LandingPage'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import SignUpPage from '../Components/SignUpPage'
import NewsPage from '../Components/NewsPage'
import LogInPage from '../Components/LogInPage'
import ContactUsPage from '../Components/ContactUsPage'
import PostsPage from '../Components/PostsPage'
import NewPost from '../Components/NewPost'
import ProfilePage from '../Components/ProfilePage'
import ProductsPage from '../Components/ProductsPage'
import Videos from '../Components/Videos'


function App() {

  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='/news' element={ <NewsPage /> }/>
        <Route path='/logIn' element={ <LogInPage /> }/>
        <Route path='/contact' element={<ContactUsPage />} />
        <Route path='/posts' element={<PostsPage />}  />
        <Route path='/newPost' element={<NewPost />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/videos' element={<Videos />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
