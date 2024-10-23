import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dash from './Components/Dash'
import Dashboard from './Components/Dashboard'
import { Navbar } from './Components/Navbar'
import MoodJournal from './Components/AddDailyActivity/addJournal'
import { Router, Routes, Route } from 'react-router-dom'
import Analytics from './Components/MoodAnalytics/analytics'
import SelfCareResources from './Components/SelfCare/selfCare'
import MyProfile from './Components/Profile/Profile'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dash/>} />
        <Route path="/diary" element={<MoodJournal />}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='self-care' element={<SelfCareResources/>}/>
        <Route path='/profile' element={<MyProfile/>}/>
      </Routes>
  </>
  )
}

export default App
