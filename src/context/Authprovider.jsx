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
        // Step 1: Get the backend JWT
        const { data } = await api.post("/auth/token", { email: loggedUser.email });
        
        // Step 2: Save to localStorage IMMEDIATELY
        localStorage.setItem("admin_jwt", data.token);

        // Step 3: Fetch both Member and Admin data
        // We use separate try/catches or Promise.all to ensure one failure doesn't wipe all data
        const [infoRes, adminRes] = await Promise.allSettled([
          api.get(`/members/${encodeURIComponent(loggedUser.email)}`),
          api.get(`/admin/${encodeURIComponent(loggedUser.email)}`)
        ]);

        setUser({
          ...loggedUser,
          info: infoRes.status === 'fulfilled' ? infoRes.value.data : null,
          admindata: adminRes.status === 'fulfilled' ? adminRes.value.data : null,
          isMember: infoRes.status === 'fulfilled',
        });
      } catch (error) {
        console.error("Auth sync failed:", error);
        setUser({ ...loggedUser, isMember: false });
      }
    } else {
      localStorage.removeItem("admin_jwt");
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