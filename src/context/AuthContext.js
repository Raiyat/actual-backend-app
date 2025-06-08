// This file creates a global authentication system using React Context that any component can access
// It manages user login state and provides it to all components

import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Create a new context object that will hold our authentication state
// This is like a global storage box that any component can access
const AuthContext = createContext();

// Custom hook to easily access the auth context from any component
// Instead of writing useContext(AuthContext) everywhere, we can just use useAuth()
export const useAuth = () => {
  return useContext(AuthContext);
};

// The main authentication provider component
// This wraps our app and provides authentication state to all children
export const AuthProvider = ({ children }) => {
  // State to store the current user (null if not logged in)
  const [user, setUser] = useState(null);
  // State to track if we're still checking the initial authentication
  const [loading, setLoading] = useState(true);

  // Set up a listener for authentication state changes
  useEffect(() => {
    // This function runs when the component is first added to the page
    // It sets up a listener that watches for changes in the user's login status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the user state whenever the auth state changes
      setUser(user);
      // Once we have the initial auth state, we're done loading
      setLoading(false);
    });

    // Cleanup function that runs when the component is removed
    // This prevents memory leaks by removing the listener
    return () => unsubscribe();
  }, []); // Empty array means this effect runs only once when mounted

  // The data that will be available to all components
  const state = {
    user,     // The current user (null if not logged in)
    loading   // Whether we're still checking authentication
  };

  // Don't render anything while we're still checking authentication
  if (loading) {
    return null;
  }

  // Provide the auth context to all children components
  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}; 