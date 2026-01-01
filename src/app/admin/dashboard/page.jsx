"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaUserPlus,
  FaShieldAlt,
  FaRocket,
  FaTerminal,
} from "react-icons/fa";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    memberCount: 0,
    equipmentCount: 0,
    recentMembers: [],
  });
  
  // Removed local loading state to let AdminLayout handle the initial mount

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [membersRes, equipmentRes] = await Promise.all([
          api.get("/members"),
          api.get("/equipment"),
        ]);

        const recent = [...membersRes.data].reverse().slice(0, 4);

        setStats({
          memberCount: membersRes.data.length,
          equipmentCount: equipmentRes.data.length,
          recentMembers: recent,
        });
      } catch (error) {
        toast.error("SYSTEM_SYNC_FAILURE");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white text-slate-900 font-sans p-4 md:p-10">
      <Toaster position="top-center" />

      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
            System <span className="text-red-600">Overview</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2">
            <FaShieldAlt className="text-red-500/50" /> Command Level: Administrator
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest italic">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Database_Live
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Members Card */}
          <div className="group bg-white border border-slate-200 p-8 relative overflow-hidden transition-all rounded hover:shadow-2xl hover:shadow-red-50">
            <div className="relative z-10">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
                Total_Personnel
              </p>
              <h3 className="text-7xl font-black italic tracking-tighter leading-none mb-4 group-hover:scale-110 transition-transform origin-left">
                {stats.memberCount.toString().padStart(2, "0")}
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900 bg-slate-50 w-fit px-3 py-1 rounded-full border border-slate-100">
                <FaUsers className="text-red-600" /> Active_Members
              </div>
            </div>
            <FaUsers size={120} className="absolute -right-4 -bottom-4 text-slate-50 group-hover:text-red-50/50 transition-colors" />
          </div>

          {/* Total Equipment Card */}
          <div className="group bg-slate-950 p-8 relative overflow-hidden transition-all border-b-[6px] border-red-600">
            <div className="relative z-10 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                Inventory_Assets
              </p>
              <h3 className="text-7xl font-black italic tracking-tighter leading-none mb-4 group-hover:scale-110 transition-transform origin-left">
                {stats.equipmentCount.toString().padStart(2, "0")}
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-white bg-red-600 w-fit px-3 py-1 italic">
                <FaBoxOpen /> Active_Equipment
              </div>
            </div>
            <FaBoxOpen size={120} className="absolute -right-4 -bottom-4 text-white/5 opacity-20" />
          </div>
        </div>

        {/* BOTTOM SECTION: RECENT ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-slate-200 rounded-2xl p-6 bg-white">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-sm font-black uppercase italic tracking-widest flex items-center gap-2">
                <FaUserPlus className="text-red-600" /> Recently_Joined
              </h4>
              <Link href="/admin/members/all-members" className="text-[10px] font-black uppercase text-slate-400 hover:text-red-600">
                View_All_Members
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.recentMembers.map((member) => (
                <div key={member._id} className="flex items-center gap-4 p-4 border border-slate-50 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="relative w-12 h-12 bg-slate-900 rounded-lg overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    {member.image ? (
                      <Image src={member.image} alt="" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <FaTerminal size={14} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase italic truncate">{member.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 tracking-tight">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM STATUS CARD */}
          <div className="bg-slate-50 p-6 border-l-4 border-slate-950 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">System_Integrity</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase">Database_Link</span>
                  <span className="text-[10px] font-mono text-green-600 font-bold">STABLE</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 overflow-hidden">
                  <div className="w-full h-full bg-slate-950" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase">Asset_Security</span>
                  <span className="text-[10px] font-mono text-green-600 font-bold">100%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 overflow-hidden">
                  <div className="w-full h-full bg-red-600" />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <FaRocket className="text-red-500 animate-bounce" size={14} />
                <span className="text-[11px] font-black uppercase italic">Mist_Blitz_V1.0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;