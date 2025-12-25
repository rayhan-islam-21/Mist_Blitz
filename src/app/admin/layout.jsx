"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { FaBars } from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 1. Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 md:ml-64">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <span className="font-bold text-indigo-600">MIST Blitz</span>
          <button 
            onClick={toggleSidebar}
            className="p-2 text-slate-600 hover:bg-gray-100 rounded-lg"
          >
            <FaBars size={20} />
          </button>
        </header>

        {/* 3. Page Content */}
        <main className="p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;