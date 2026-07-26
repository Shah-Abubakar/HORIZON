// Firebase Configuration for Smartups
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBmb68-dFAYgSFWddp8elW9I_KimK8sWro",
  authDomain: "horizo-n.firebaseapp.com",
  projectId: "horizo-n",
  storageBucket: "horizo-n.firebasestorage.app",
  messagingSenderId: "198256967762",
  appId: "1:198256967762:web:7f4d5186b976c7e00a9f8b",
  measurementId: "G-FJJ7C5QZSP",
}

// Initialize Firebase (prevent double-init in hot reload)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { app, auth, googleProvider }
