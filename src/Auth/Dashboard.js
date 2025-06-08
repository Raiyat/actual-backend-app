// Dashboard.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to the Dashboard!</h1>
        {user && <p className="user-greeting">Hello, {user.email}!</p>}
      </header>

      <main className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Profile Status</h3>
            <p>{user ? 'Active' : 'Not Logged In'}</p>
          </div>
          <div className="stat-card">
            <h3>Last Login</h3>
            <p>{user ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div className="stat-card">
            <h3>Account Type</h3>
            <p>{user?.emailVerified ? 'Verified' : 'Unverified'}</p>
          </div>
        </div>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-button">View Profile</button>
            <button className="action-button">Settings</button>
            <button className="action-button">Help</button>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© 2024 Your App Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;