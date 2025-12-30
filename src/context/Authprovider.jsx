"use client";

import React, { useEffect, useState } from "react";
import AuthContext from "../context/Authcontext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import api from "@/lib/axios"; // Your axios instance

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // AUTH STATE OBSERVER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        try {
         const response = await api.get(`/members/${encodeURIComponent(loggedUser.email)}`);
         const info = response.data
          setUser({
            ...loggedUser,
            info,
            isMember: true 
          });
        } catch (error) {
          console.error("Member matching failed:", error);
          // Fallback if email doesn't exist in MongoDB yet
          setUser({ ...loggedUser, isMember: false });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // SIGN UP
  const signUpwithEmail = async (name, email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      return result.user; 
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userInfo = {
    user,
    loading,
    setUser,
    setLoading,
    signUpwithEmail,
    signInWithEmail,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;