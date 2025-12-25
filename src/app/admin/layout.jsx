"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { FaBars } from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    // Added overflow-x-hidden to prevent the "outside" white space
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      
      {/* 1. Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 2. Main Content Area */}
      {/* Added max-w-full and min-w-0 to handle flexbox overflow */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full transition-all duration-300 md:ml-64">
        
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-16 bg-white border-b border-gray-200 w-full">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">MIST Blitz</span>
          </div>
          
          <button 
            onClick={toggleSidebar}
            className="p-2 text-slate-600 hover:bg-gray-100 rounded-lg"
          >
            <FaBars size={20} />
          </button>
        </header>

        {/* 3. Page Content */}
        {/* Ensure the main container doesn't exceed screen width */}
        <main className="p-1 md:p-8 lg:p-10 w-full bg-white max-w-full">
          <div className="max-w-full overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;