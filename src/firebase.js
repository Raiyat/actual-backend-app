// src/firebase.js

/**
 * Firebase Configuration and Setup
 * This file initializes Firebase services and exports them for use throughout the application.
 * It handles authentication, database, and analytics setup with fallback for development.
 */

// Import required Firebase modules
// initializeApp: Core Firebase initialization
// getFirestore: Firestore database functionality
// Auth related imports for different authentication methods
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,      // Handles popup-based authentication
  sendSignInLinkToEmail, // Enables passwordless email sign-in
  isSignInWithEmailLink, // Checks if a URL is a sign-in with email link
  signInWithEmailLink,   // Completes the email link sign-in process
  connectAuthEmulator,// Import connectAuthEmulator
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

/**
 * Firebase configuration object
 * All sensitive credentials are stored in environment variables for security
 * Format: REACT_APP_* is required for Create React App to expose these variables
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,           // API key for Firebase project
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,   // Auth domain for Firebase hosting
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,     // Firebase project identifier
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // Storage bucket for files
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // Firebase Cloud Messaging
  appId: process.env.REACT_APP_FIREBASE_APP_ID,            // Unique app identifier
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID // Analytics measurement ID
};

// Initialize variables to hold Firebase service instances
let app, db, auth, analytics;

// Create Google authentication provider instance
const googleProvider = new GoogleAuthProvider();

/**
 * Configure Google OAuth provider with additional parameters
 * These credentials are required for Google Sign-In functionality
 */
googleProvider.setCustomParameters({
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET
});

try {
  // Attempt to initialize Firebase with production configuration
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);        // Initialize Firestore database
  auth = getAuth(app);           // Initialize Authentication
  analytics = getAnalytics(app); // Initialize Analytics

  // --- Emulator Connection (Development Only) ---
  // Check if we are running in a development environment
  if (process.env.NODE_ENV === 'development') {
    console.log('Connecting to Firebase Emulators...');
    // Connect to the Authentication emulator running on localhost:9099
    // Note: The URL for Auth emulator is http://localhost:port
    connectAuthEmulator(auth, 'http://localhost:9099');
    // Connect to the Firestore emulator running on localhost:8080
    // Note: The host is 'localhost' and port is 8080 for Firestore emulator
    connectFirestoreEmulator(db, 'localhost', 8080);
    // You would add connections for other emulators here (e.g., Realtime Database, Functions)
  }
  // ---------------------------------------------

} catch (error) {
  // If initialization fails (e.g., missing environment variables in development)
  console.error('Firebase initialization error:', error.message);
  
  /**
   * Fallback initialization for development environment
   * Uses minimal configuration to allow local development
   * Note: Some features may be limited in this mode
   */
  app = initializeApp({
    apiKey: 'development-key',
    authDomain: 'localhost',
    projectId: 'dev-project'
  });
  db = getFirestore(app);
  auth = getAuth(app);
  // Note: Analytics is not initialized in development fallback

  // --- Emulator Connection (Development Fallback) ---
  // Even in the fallback, connect to emulators if in development
  if (process.env.NODE_ENV === 'development') {
     console.log('Connecting to Firebase Emulators (Fallback)...');
     connectAuthEmulator(auth, 'http://localhost:9099');
     connectFirestoreEmulator(db, 'localhost', 8080);
     // Add other emulator connections here if needed in fallback
  }
  // --------------------------------------------------
}

// Export initialized Firebase services and authentication methods
export { 
  db,                    // Firestore database instance
  auth,                  // Authentication instance
  analytics,            // Analytics instance
  googleProvider,       // Configured Google authentication provider
  signInWithPopup,      // Function for popup-based sign-in
  sendSignInLinkToEmail, // Function for email link authentication
  isSignInWithEmailLink, // Function to verify email sign-in links
  signInWithEmailLink,   // Function to complete email link sign-in
  signInWithRedirect,   // Function to redirect to Google sign-in
  getRedirectResult    // Function to get the result of the redirect
};