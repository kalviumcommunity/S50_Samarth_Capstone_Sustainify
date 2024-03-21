import React from 'react'
import LandingPage from '../Components/LandingPage'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import SignUpPage from '../Components/SignUpPage'
import NewsPage from '../Components/NewsPage'
import LogInPage from '../Components/LogInPage'
import ContactUsPage from '../Components/ContactUsPage'
import PostsPage from '../Components/PostsPage'


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
      </Routes>
    </Router>
    </div>
  )
}

export default App
