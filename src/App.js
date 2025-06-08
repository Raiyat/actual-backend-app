import React from 'react';
// Import routing components from react-router-dom
// Router: The main routing container
// Routes: Groups all our routes together
// Route: Defines a single route mapping
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './unAuth/HomePage';
import SignPage from './unAuth/SignPage';
import Dashboard from './Auth/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './icons';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Routes component watches URL changes and renders the matching Route */}
          <Routes>
            {/* When URL is /, show HomePage */}
            <Route path="/" element={<HomePage />} />
            {/* When URL is /signup, show SignPage */}
            <Route path="/signup" element={<SignPage />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
