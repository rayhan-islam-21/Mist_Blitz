"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaUserPlus, FaBell } from "react-icons/fa";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const StatCard = ({ label, value, icon: Icon, accent = false }) => (
  <div className={`relative border p-6 overflow-hidden ${accent ? "border-red-600/30 bg-red-600/5" : "border-white/5 bg-white/2"}`}>
    <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-3">{label}</p>
    <p className="text-5xl font-black italic text-white leading-none mb-4">
      {String(value).padStart(2, "0")}
    </p>
    <Icon size={60} className="absolute -right-2 -bottom-2 text-white/3" />
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ memberCount: 0, equipmentCount: 0, recentMembers: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [membersRes, equipmentRes] = await Promise.all([
          api.get("/members"),
          api.get("/equipment"),
        ]);
        setStats({
          memberCount: membersRes.data.length,
          equipmentCount: equipmentRes.data.length,
          recentMembers: [...membersRes.data].reverse().slice(0, 6),
        });
      } catch {
        toast.error("Failed to load dashboard data");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen selection:bg-red-600 selection:text-white">
      <Toaster position="top-right" toastOptions={{ style: { background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" } }} />

      {/* Header */}
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-white/5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-2">Admin Panel</p>
          <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white leading-none">
            System <span className="text-red-600">Overview</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 border border-white/5 px-3 py-1.5 bg-white/2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">DB Live</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard label="Total Members" value={stats.memberCount} icon={FaUsers} accent />
        <StatCard label="Equipment Items" value={stats.equipmentCount} icon={FaBoxOpen} />
        <div className="border border-white/5 bg-white/2 p-6 flex flex-col justify-between">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-3">DB Status</p>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-[10px] text-green-400 uppercase">Connected</span>
            </div>
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-wider">MongoDB Atlas</p>
          </div>
        </div>
        <div className="border border-white/5 bg-white/2 p-6 flex flex-col justify-between">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-3">Platform</p>
          <div>
            <p className="font-black italic text-white text-lg leading-none">MIST</p>
            <p className="font-black italic text-red-600 text-lg leading-none">BLITZ</p>
            <p className="font-mono text-[9px] text-white/20 mt-1 uppercase tracking-wider">v1.0 · 2025</p>
          </div>
        </div>
      </div>

      {/* Recent Members + Quick Links */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Members */}
        <div className="lg:col-span-2 border border-white/5 bg-white/2">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <FaUserPlus size={12} className="text-red-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">Recently Added</span>
            </div>
            <Link
              href="/admin/members/all-members"
              className="font-mono text-[9px] uppercase tracking-widest text-white/20 hover:text-red-500 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {stats.recentMembers.length === 0 ? (
              <p className="px-6 py-8 text-white/20 font-mono text-xs">No members yet</p>
            ) : (
              stats.recentMembers.map((member) => (
                <div key={member._id} className="flex items-center gap-4 px-6 py-3 hover:bg-white/2 transition-colors">
                  <div className="relative w-8 h-8 bg-white/5 overflow-hidden shrink-0">
                    {member.image ? (
                      <Image src={member.image} alt="" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 font-black text-xs">
                        {member.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black italic uppercase text-white truncate">{member.name}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/30">{member.position}</p>
                  </div>
                  {member.year && (
                    <span className="font-mono text-[9px] text-white/20 shrink-0">{member.year}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border border-white/5 bg-white/2">
          <div className="px-6 py-4 border-b border-white/5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">Quick Actions</span>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: "Add Member", href: "/admin/members/add", accent: true },
              { label: "All Members", href: "/admin/members/all-members" },
              { label: "Add Equipment", href: "/admin/equipment/add" },
              { label: "All Equipment", href: "/admin/equipment/all-equipment" },
              { label: "Handouts", href: "/admin/logistics/handouts" },
              { label: "Notices", href: "/admin/notices", icon: <FaBell size={10} /> },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 w-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  item.accent
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "border border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
