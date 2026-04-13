"use client";

import { useEffect, useState, useContext } from "react";
import { Users, Package, ArrowRight, TrendingUp, Shield } from "lucide-react";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import AuthContext from "@/context/Authcontext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ memberCount: 0, equipmentCount: 0, recentMembers: [] });
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const quickLinks = [
    { label: "All Members",     href: "/admin/members/all-members" },
    { label: "Add Member",      href: "/admin/members/add" },
    { label: "All Equipment",   href: "/admin/equipment/all-equipment" },
    { label: "Add Equipment",   href: "/admin/equipment/add" },
    { label: "Notices",         href: "/admin/notices" },
    { label: "News",            href: "/admin/news" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 md:p-10">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">Admin Panel</p>
            <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight">
              Good to see you, <span className="text-red-600">{user?.info?.name?.split(" ")[0] || "Admin"}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System online
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/members/all-members"
            className="group border border-slate-200 hover:border-red-200 p-8 rounded-xl transition-all hover:shadow-lg hover:shadow-red-50 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total Members</p>
              <p className="text-6xl font-black italic tracking-tighter text-slate-900 group-hover:text-red-600 transition-colors">
                {loading ? "—" : stats.memberCount.toString().padStart(2, "0")}
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-slate-50 group-hover:bg-red-50 flex items-center justify-center transition-colors">
              <Users size={24} className="text-slate-300 group-hover:text-red-500 transition-colors" />
            </div>
          </Link>

          <Link href="/admin/equipment/all-equipment"
            className="group border border-slate-200 hover:border-slate-400 p-8 rounded-xl transition-all hover:shadow-lg flex items-center justify-between bg-slate-950 text-white"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Equipment</p>
              <p className="text-6xl font-black italic tracking-tighter text-white">
                {loading ? "—" : stats.equipmentCount.toString().padStart(2, "0")}
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
              <Package size={24} className="text-slate-500" />
            </div>
          </Link>
        </div>

        {/* Recent Members + Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Members */}
          <div className="lg:col-span-2 border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <TrendingUp size={14} className="text-red-600" /> Recently Added
              </h2>
              <Link href="/admin/members/all-members"
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight size={10} />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-14 bg-slate-50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {stats.recentMembers.map((member) => (
                  <div key={member._id} className="flex items-center gap-4 py-3">
                    <div className="relative w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                      {member.image ? (
                        <Image src={member.image} alt="" fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-black text-sm">
                          {member.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold uppercase tracking-tight text-slate-900 truncate">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{member.position || "—"}</p>
                    </div>
                    <span className="text-[9px] font-mono text-slate-300 shrink-0">{member.blitzId}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-700 flex items-center gap-2 mb-6">
              <Shield size={14} className="text-red-600" /> Quick Access
            </h2>
            <div className="space-y-1">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors group"
                >
                  {label}
                  <ArrowRight size={12} className="text-slate-300 group-hover:text-red-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
