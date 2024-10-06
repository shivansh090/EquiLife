import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Components/Dashboard'
import { Navbar } from './Components/Navbar'
import MoodJournal from './Components/AddDailyActivity/addJournal'
import { Router, Routes, Route } from 'react-router-dom'
import Analytics from './Components/MoodAnalytics/analytics'
import SelfCareResources from './Components/SelfCare/selfCare'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/diary" element={<MoodJournal />}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='self-care' element={<SelfCareResources/>}/>
      </Routes>
  </>
  )
}

export default App
