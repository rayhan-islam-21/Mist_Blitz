"use client"
import AuthContext from "@/context/Authcontext";
import React, { useContext } from "react";
import { motion } from 'motion/react';

const layout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading || !user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
        />
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 animate-pulse">
          Loading Data...
        </p>
      </div>
    );
  }

  return <div className="bg-white">{children}</div>;
};

export default layout;
