import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Replace with actual authentication check (e.g., check token in localStorage)
  return localStorage.getItem('user') ? true : false;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
