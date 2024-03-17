// Importing necessary functions from Firebase SDK
// 'initializeApp' is used to initialize the Firebase app with a given configuration.
import { initializeApp } from "firebase/app";
// Import 'getAuth' function for Firebase authentication.
// This is used to initialize the authentication service.
import { getAuth } from "firebase/auth";

// Firebase configuration object containing keys and identifiers for your app.
// This includes API key, auth domain, project ID, storage bucket, messaging sender ID, and app ID.
// These values are stored in environment variables to keep them secure and not hard-coded into the source code.
// process.env is used to access these environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyA3edUopQmw2H_RlxicUvfWB0Igkp_iMQM",
  authDomain: "weatherappdashboardass.firebaseapp.com",
  projectId: "weatherappdashboardass",
  storageBucket: "weatherappdashboardass.appspot.com",
  messagingSenderId: "586746252316",
  appId: "1:586746252316:web:04b64bf2ce73437b80a3d9"
};

// Initializing the Firebase application with the configuration object.
// The 'app' object represents your Firebase application and is used in subsequent Firebase service initializations.
const app = initializeApp(firebaseConfig);

// Initializing Firebase authentication service and exporting it.
// 'auth' is an instance of Firebase Auth service, used for handling user authentication.
export const auth = getAuth(app);
