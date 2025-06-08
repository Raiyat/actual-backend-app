// This component creates a protected route that only logged-in users can access by using the AuthContext
// If a user isn't logged in, they'll be redirected to the signup page

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PrivateRoute is a wrapper component that protects its children
// It takes other components as children and only shows them to logged-in users
const PrivateRoute = ({ children }) => {
  // Get the current user and loading state from our auth context
  const { user, loading } = useAuth();

  // Show a loading indicator while we check if the user is logged in
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's a user, show the protected content (children)
  // If there's no user, redirect to the signup page
  return user ? children : <Navigate to="/signup" />
};

export default PrivateRoute;