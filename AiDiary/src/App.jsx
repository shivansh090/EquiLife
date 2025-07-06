import { Routes, Route, Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import './App.css'
import Dash from './Components/Dash'
import LoginPage from './Components/auth/login'
import SignupPage from './Components/auth/signup'
import HomePage from './Components/Home'
import { Navbar } from './Components/Navbar'
import MoodJournal from './Components/AddDailyActivity/addJournal'
import Analytics from './Components/MoodAnalytics/analytics'
import SelfCareResources from './Components/SelfCare/selfCare'
import MyProfile from './Components/Profile/Profile'
import AuthPage from './Components/auth/AuthPage';
import bg from './assets/images/bg.png'; // adjust path if needed

// Custom PrivateRoute component
function PrivateRoute({ element: Element }) {
  const authToken = localStorage.getItem('authToken'); // Get the auth token
  if (!authToken) {
    console.log("No auth token found");
    return <Navigate to="/login" replace />;
  }

  try {
    console.log("Auth Token: ", authToken); // Log the token
    const decodedToken = jwtDecode(authToken); // Decode the JWT token
    const currentTime = Date.now() / 1000; // Get the current time in seconds

    if (decodedToken.exp < currentTime) {
      // If the token is expired, clear it from localStorage and redirect to login
      localStorage.removeItem('authToken');
      return <Navigate to="/login" replace />;
    }

    // If token is valid, render the Navbar and the element
    return (
      <>
        <Navbar />
        <Element />
      </>
    );
  } catch (error) {
    console.log("Error decoding token: ", error); // Log error
    localStorage.removeItem('authToken');
    return <Navigate to="/login" replace />;
  }
}


function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={Dash} />} />
        <Route path="/diary" element={<PrivateRoute element={MoodJournal} />} />
        <Route path="/analytics" element={<PrivateRoute element={Analytics} />} />
        <Route path="/self-care" element={<PrivateRoute element={SelfCareResources} />} />
        <Route path="/profile" element={<PrivateRoute element={MyProfile} />} />
      </Routes>
    </div>
  );
}

export default App;
