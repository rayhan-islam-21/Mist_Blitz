"use client";

import React, { useState, useContext } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { FaBars } from "react-icons/fa";
import AuthContext from "@/context/Authcontext";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/protected/Protected";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 flex flex-col min-w-0 max-w-full transition-all duration-300 md:ml-64">
          <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-16 bg-white border-b border-gray-200 w-full">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="font-bold text-slate-900 text-sm tracking-tight">
                MIST Blitz
              </span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 text-slate-600 hover:bg-gray-100 rounded-lg"
            >
              <FaBars size={20} />
            </button>
          </header>

          <main className="p-1 md:p-8 lg:p-4 w-full bg-white max-w-full min-h-screen">
            <div className="max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
