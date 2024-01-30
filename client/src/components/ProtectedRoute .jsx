import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, redirectTo, ...props }) => {
  if (isAuth) {
    return <Route {...props} />;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

export default ProtectedRoute;
