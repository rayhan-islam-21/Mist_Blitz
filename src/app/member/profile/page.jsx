"use client";

import React, { useState } from "react";
import { 
  FaUserShield, FaTerminal, FaFingerprint, FaEdit, 
  FaCogs, FaBarcode, FaShieldAlt, FaCircle, FaWaveSquare 
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

const MyProfile = () => {
  const [user] = useState({
    name: "Alex 'Blitz' Rivera",
    email: "a.rivera@mistblitz.com",
    role: "Lead Systems Commander",
    clearance: "Level 5 - Admin",
    joinedDate: "2023-05-12",
    operations: 142,
    status: "Active",
    avatar: "/china.jpg",
    nodeID: "ND-992-ALPHA",
  });

  const sectionTitle = "flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8";
  
  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-300 font-sans italic selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />

      <div className="max-w-7xl mx-auto py-8 md:py-16 px-4 sm:px-8 relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-10 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">System Authenticated</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-black">
              Command <span className="text-red-600">Dossier</span>
            </h1>
          </motion.div>
          
          <div className="flex gap-8 text-left md:text-right border-l md:border-l-0 md:pl-0 pl-6 border-red-600/30">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Auth Status</p>
              <p className="text-xl font-mono font-bold text-green-600 uppercase tracking-tighter">Verified</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* --- LEFT: TECHNICAL DATA --- */}
          <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">
            
            {/* Biography Section */}
            <section>
              <div className={sectionTitle}>
                <div className="h-[1px] w-12 bg-red-600" />
                Identity Specifications
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Legal Name", val: user.name },
                  { label: "Network Alias", val: user.email },
                  { label: "Registry Node", val: user.nodeID },
                  { label: "Current Status", val: user.status, color: "text-green-500" }
                ].map((item, i) => (
                  <div key={i} className="group bg-white/[0.02] border border-black/5 p-5 rounded-xl hover:bg-white/[0.04] transition-all duration-300">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className={`text-lg text-slate-600 font-bold  tracking-tight ${item.color || "text-slate-200"}`}>{item.val}</p>
                  </div>
                ))}
              </div>
            </section>


            {/* Terminal Access Log */}
            <section>
              <div className={sectionTitle}>
                <div className="h-[1px] w-12 bg-red-600" />
                Security Access Log
              </div>
              <div className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-[11px] space-y-4 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20" />
                <div className="flex gap-4 p-2 hover:bg-white/5 transition-colors border-l border-white/5">
                  <span className="text-slate-600">[2024-05-12 14:22]</span>
                  <span className="text-green-500/80 uppercase">Auth_Success: Session Init @ Node-1.1</span>
                </div>
                <div className="flex gap-4 p-2 hover:bg-white/5 transition-colors border-l border-white/5">
                  <span className="text-slate-600">[2024-05-12 18:10]</span>
                  <span className="text-red-500/80 animate-pulse font-bold uppercase tracking-tighter">Alert: Unauthorized probe blocked</span>
                </div>
              </div>
            </section>
          </div>

          {/* --- RIGHT: DIGITAL ID CARD --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-12 space-y-8 order-1 lg:order-2">
            
            {/* The ID Card with Tactical Styling */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-transparent rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000" />
              
              <div className="relative bg-[#111114] rounded-[2rem] p-8 border border-white/10 overflow-hidden shadow-2xl aspect-[1.58/1] flex flex-col justify-between">
                {/* Micro-Patterns */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                
                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <FaCircle className="text-red-600 text-[8px] animate-pulse" />
                    <span className="text-[8px] font-black tracking-[0.4em] uppercase text-slate-500">Personnel ID Tag</span>
                  </div>
                  <FaUserShield className="text-red-600 text-2xl" />
                </div>

                <div className="relative z-10 flex gap-8 items-center">
                  {/* Profile Image with Scanning Line */}
                  <div className="relative h-28 w-28 md:h-36 md:w-36 shrink-0 rounded-2xl border-2 border-red-600/30 p-1 bg-slate-900 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 shadow-[0_0_15px_red] animate-scan z-20" />
                    <Image
                      src={user.avatar}
                      alt="Operator"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] font-black text-red-500 uppercase tracking-[0.4em] mb-1">Rank: Lead Commander</p>
                    <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white leading-none mb-4">
                      {user.name.split(' ')[0]} <span className="text-red-600">{user.name.split(' ')[2]}</span>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{user.role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-6">
                  <div>
                    <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Node ID Signature</p>
                    <p className="text-xs md:text-sm font-mono font-bold tracking-[0.3em] text-white">
                      {user.nodeID}
                    </p>
                  </div>
                  <FaBarcode className="opacity-40 text-white w-14 h-14" />
                </div>
              </div>
            </div>

            {/* Improved Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-red-900/20">
                <FaEdit size={14} /> Update Dossier
              </button>
              <button className="flex items-center justify-center gap-3 py-4 bg-white/5 text-slate-300 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                <FaCogs size={14} /> Node Config
              </button>
            </div>

            <div className="p-6 bg-red-900/5 border border-red-900/20 rounded-2xl flex gap-4 items-start">
              <FaFingerprint className="text-red-600 text-2xl mt-1 shrink-0" />
              <p className="text-[10px] leading-relaxed text-slate-400 font-medium uppercase tracking-tight">
                All modifications to this dossier are logged in the <span className="text-red-500 underline underline-offset-4">Mist Blitz Ledger</span>. Unauthorized access attempts will trigger an immediate biometric lockout.
              </p>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MyProfile;