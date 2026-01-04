import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';

type User = {
  uid: string;
  name?: string | null;
  email?: string | null;
};

export const AuthContext = createContext<any>(null);

/*
  AuthContext purpose:
  - Provides authentication state (the current `user`) and auth helpers
  - Exposes `login`, `register`, and `logout` functions to be used by the UI
  - Tracks a `signingOut` flag to coordinate UX (e.g., avoid clearing data during sign-out)
*/

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    // Subscribe to Firebase auth state changes.
    // onAuthStateChanged fires whenever the signed-in user changes
    // (initial load, sign-in, sign-out). We map the Firebase user to a
    // lightweight `User` object stored in React state so the rest of the
    // app can react to authentication changes.
    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setUser({ uid: fbUser.uid, email: fbUser.email, name: fbUser.displayName });
      } else {
        setUser(null);
      }
    });
    // Return the unsubscribe function to detach the listener on unmount.
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    // Sign in an existing user with email/password using Firebase Auth.
    // On success, map the Firebase user to local state so the app knows
    // who is signed in.
    const res = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = res.user;
    setUser({ uid: fbUser.uid, email: fbUser.email, name: fbUser.displayName });
  };

  const register = async (name: string, email: string, password: string) => {
    // Create a new user account in Firebase Auth. If a `name` is provided,
    // update the user's profile to include the displayName. Finally, store
    // a simplified user object in local state.
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res.user) {
      if (name) {
        await updateProfile(res.user, { displayName: name });
      }
      const fbUser = res.user;
      setUser({ uid: fbUser.uid, email: fbUser.email, name: fbUser.displayName });
    }
  };

  const logout = async () => {
    // Sign out the current user. `signingOut` is toggled to true while the
    // sign-out process is ongoing which allows other parts of the app to
    // avoid clearing state prematurely or displaying incorrect UI.
    setSigningOut(true);
    try {
      await signOut(auth);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, signingOut }}>
      {children}
    </AuthContext.Provider>
  );
};
