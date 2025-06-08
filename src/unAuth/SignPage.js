import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  db,
  auth, 
  googleProvider, 
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithRedirect,
  getRedirectResult,
} from '../firebase';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SignPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log('SignPage useEffect running. Current user:', user);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
         email = window.prompt('Please provide your email for confirmation');
      }

      if (email) {
         signInWithEmailLink(auth, email, window.location.href)
           .then(() => {
             window.localStorage.removeItem('emailForSignIn');
             navigate('/dashboard');
           })
           .catch((error) => {
             console.error('Error signing in with email link', error);
           });

         if (window.history && window.history.replaceState) {
           window.history.replaceState({}, document.title, window.location.pathname);
         }
      } else {
           console.log('Email confirmation not provided, sign-in cancelled.');
      }
    }

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log('Google sign-in via redirect successful', result.user);
           navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error('Error getting redirect result:', error);
        alert(`Error during Google sign-in redirect: ${error.message}\nCode: ${error.code}`);
      });

  }, [navigate, auth, isSignInWithEmailLink, signInWithEmailLink, getRedirectResult]);

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    
    const actionCodeSettings = {
      url: window.location.origin + '/signup',
      handleCodeInApp: true
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        alert('Check your email for the sign-in link!');
      })
      .catch((error) => {
        console.error("Error sending sign-in link to email", error);
      });
  };

  const handleGoogleSignIn = async () => {
     try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert(`Error signing in with Google: ${error.message}\nCode: ${error.code}`);
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-card">
        <h2 className="sign-header">Let's get started!</h2>
        <form className="sign-form" onSubmit={handleEmailSignIn}>
          <input
            type="email"
            placeholder="Enter your email"
            className="sign-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="sign-button">
            Sign in with Email
          </button>
        </form>
        
        <div className="sign-divider">
          <div className="sign-line"></div>
          <span className="sign-or">OR</span>
          <div className="sign-line"></div>
        </div>

        <div className="sign-google-container">
          <button className="sign-google-button" onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} className="sign-google-icon" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignPage;