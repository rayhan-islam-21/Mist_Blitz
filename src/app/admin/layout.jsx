"use client";

import React, { useState, useContext } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { FaBars } from "react-icons/fa";
import AuthContext from "@/context/Authcontext";
import ProtectedRoute from "@/components/protected/Protected";
import CenterLoader from "@/components/ui/center-loader";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading || !user) {
    return <CenterLoader fullScreen containerClassName="bg-[#0a0a0a]" />;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-x-hidden">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 flex flex-col min-w-0 md:ml-64">
          {/* Mobile top bar */}
          <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-[#0a0a0a] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-600 flex items-center justify-center text-white font-black text-xs">M</div>
              <span className="font-mono text-xs uppercase tracking-widest text-white">MIST BLITZ</span>
            </div>
            <button onClick={toggleSidebar} className="p-2 text-white/40 hover:text-white">
              <FaBars size={16} />
            </button>
          </header>

          <main className="flex-1 p-4 md:p-8 bg-[#0a0a0a] min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
