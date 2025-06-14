// src/routes/PrivateRoutes.jsx
import { Navigate, useLocation } from 'react-router-dom';

import LoadingSppiner from '../Components/LoadingSppiner';
import useAuth from './UseAuth';


const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
console.log(location)
  if (loading) {
    return <LoadingSppiner />;
  }

  if (user) {
    return children; 
  }


   return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
