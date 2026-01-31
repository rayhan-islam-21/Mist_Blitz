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
          const tokenResponse = await api.post("/auth/token", { 
            email: loggedUser.email 
          });
          
          const { token } = tokenResponse.data;

          // STEP 2: Save the "Key" in localStorage for Axios
          localStorage.setItem("admin_jwt", token);

          // STEP 3: Fetch Member info (Public-ish data)
          const response = await api.get(`/members/${encodeURIComponent(loggedUser.email)}`);
          const info = response.data;

          // STEP 4: Fetch Admin data (Now works because token is in localStorage)
          const userresponse = await api.get(`/admin/${encodeURIComponent(loggedUser.email)}`);
          const admindata = userresponse.data;

          setUser({
            ...loggedUser,
            admindata,
            info,
            isMember: true,
            token // Optional: keep it in state too
          });
        } catch (error) {
          console.error("Auth sync failed:", error);
          // If JWT fails, they might be a regular member but not an admin
          setUser({ ...loggedUser, isMember: false });
        }
      } else {
        // Cleanup on Logout
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