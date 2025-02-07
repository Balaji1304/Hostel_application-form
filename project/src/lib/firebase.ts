import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDM3dMydLIRU86NC26vAuH_GwCntoDm-BQ",
  authDomain: "registration-js.firebaseapp.com",
  databaseURL: "https://registration-js-default-rtdb.firebaseio.com",
  projectId: "registration-js",
  storageBucket: "registration-js.firebasestorage.app",
  messagingSenderId: "575304460654",
  appId: "1:575304460654:web:5cc9904cee2bc66b88397f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize admin user
export const initializeAdminUser = async () => {
  try {
    // First try to sign in
    await signInWithEmailAndPassword(auth, 'admin@ladyhostel.com', 'admin123');
  } catch (error: any) {
    // If user doesn't exist, create it
    if (error.code === 'auth/user-not-found') {
      try {
        await createUserWithEmailAndPassword(auth, 'admin@ladyhostel.com', 'admin123');
      } catch (createError: any) {
        // Ignore if user already exists
        if (createError.code !== 'auth/email-already-in-use') {
          console.error('Error creating admin user:', createError);
        }
      }
    }
  }
};