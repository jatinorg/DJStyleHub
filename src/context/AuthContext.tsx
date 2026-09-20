import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt?: any;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  registerUser: (name: string, email: string, phone: string, pass: string) => Promise<UserProfile>;
  loginUser: (email: string, pass: string) => Promise<UserProfile>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Firestore user profile for logged-in user
  const fetchUserProfile = async (uid: string, fallbackEmail = ''): Promise<UserProfile> => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        return { ...data, uid };
      }
    } catch (err) {
      console.warn('Firestore fetch notice:', err);
    }

    return {
      uid,
      name: fallbackEmail.split('@')[0] || 'User',
      email: fallbackEmail,
      role: 'user',
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profile = await fetchUserProfile(currentUser.uid, currentUser.email || '');
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register user live in Firebase Auth & write user document directly to Firestore users collection
  const registerUser = async (name: string, email: string, phone: string, pass: string): Promise<UserProfile> => {
    // 1. Create account in Firebase Auth
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    const newUser = res.user;

    const profileData: UserProfile = {
      uid: newUser.uid,
      name,
      email,
      phone,
      role: 'user', // Every new registration defaults to 'user'
      createdAt: new Date().toISOString(),
    };

    // 2. Write User Document live into Firestore Collection "users"
    try {
      await setDoc(doc(db, 'users', newUser.uid), profileData);
      console.log('Successfully written real user document to Firestore collection users!');
    } catch (dbErr) {
      console.error('Firestore setDoc error:', dbErr);
    }

    return profileData;
  };

  // Login user via Firebase Auth and fetch Firestore profile
  const loginUser = async (email: string, pass: string): Promise<UserProfile> => {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    const currentUser = res.user;
    const profile = await fetchUserProfile(currentUser.uid, currentUser.email || '');
    setUser(currentUser);
    setUserProfile(profile);
    return profile;
  };

  // Logout
  const logoutUser = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
