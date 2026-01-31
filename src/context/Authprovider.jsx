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
import api from "@/lib/axios";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH STATE OBSERVER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      setLoading(true);

      if (!loggedUser) {
        localStorage.removeItem("admin_jwt");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // 1️⃣ Get backend JWT (ADMIN / MEMBER aware)
        const tokenRes = await api.post("/auth/token", {
          email: loggedUser.email,
        });

        const { token } = tokenRes.data;
        localStorage.setItem("admin_jwt", token);

        // 2️⃣ Fetch public member info
        const memberRes = await api.get(
          `/members/${encodeURIComponent(loggedUser.email)}`
        );

        // 3️⃣ Try admin fetch (may fail for members)
        let adminData = null;
        try {
          const adminRes = await api.get(
            `/admin/${encodeURIComponent(loggedUser.email)}`
          );
          adminData = adminRes.data;
        } catch {
          adminData = null;
        }

        setUser({
          ...loggedUser,
          info: memberRes.data,
          admindata: adminData,
          role: adminData?.role || "member",
          isMember: true,
          token,
        });
      } catch (error) {
        // ❌ BACKEND FAILURE = UNKNOWN STATE (NOT MEMBER)
        console.error("Auth sync failed:", error);

        setUser({
          ...loggedUser,
          role: "unknown",
          admindata: null,
          info: null,
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------- AUTH ACTIONS ----------
  const signUpwithEmail = async (name, email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      return result.user;
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

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    localStorage.removeItem("admin_jwt");
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        setLoading,
        signUpwithEmail,
        signInWithEmail,
        signInWithGoogle,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
