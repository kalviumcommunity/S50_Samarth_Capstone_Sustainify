import React from 'react'
import LandingPage from '../Components/LandingPage'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import SignUpPage from '../Components/SignUpPage'


function App() {

  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signUp' element={<SignUpPage />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
