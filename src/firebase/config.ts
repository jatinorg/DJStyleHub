import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Direct Firebase Web Application Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFW5B4AfqyhbRYAcj4Sw641-JJuRClXas",
  authDomain: "djstylehub-afda4.firebaseapp.com",
  projectId: "djstylehub-afda4",
  storageBucket: "djstylehub-afda4.firebasestorage.app",
  messagingSenderId: "428285319768",
  appId: "1:428285319768:web:89f5d726e482877d25482d"
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
