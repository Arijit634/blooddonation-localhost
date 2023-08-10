import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, adminLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      element={adminLoggedIn ? <Element /> : <Navigate to='/login' />}
    />
  );
};

export default ProtectedRoute;
