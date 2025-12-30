"use client";

import React, { useContext } from "react";
import { 
  FaUserShield, FaEdit, FaBarcode, FaShieldAlt, 
  FaFingerprint, FaProjectDiagram, FaGlobe, FaLinkedin,
  FaExternalLinkAlt,FaVoicemail
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiGmail } from "react-icons/si";

import AuthContext from "@/context/Authcontext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const userData = {
    name: user?.info?.name || user?.displayName || "OPERATOR_NULL",
    email: user?.email || "NOT_LOGGED_IN",
    role: user?.info?.position || "Active Personnel",
    clearance: user?.info?.position?.toLowerCase().includes("admin") ? "CLASS-5" : "CLASS-1",
    nodeID: user?.info?.blitzId || "PENDING_SYNC",
    // Join arrays with a comma if they exist, otherwise show "N/A"
    tech: user?.info?.techDept?.join(", ") || "None Assigned",
    NonTech: user?.info?.nonTechDept?.join(", ") || "None Assigned",
    image: user?.info?.image,
    roll: user?.info?.roll,
    linkedin: user?.info?.linkedin || ""
  };

  const labelStyle = "text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 flex items-center gap-2";
  const cardBg = "bg-white border border-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)] transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans italic selection:bg-red-600 selection:text-white pb-24">

      <div className="max-w-7xl mx-auto pt-16 px-6 relative z-10">
        
        {/* --- SYSTEM HEADER --- */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start border-slate-900 pl-2 gap-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-5xl flex gap-6 font-black tracking-tighter uppercase ">
              My <span className="text-red-600 block">Account</span>
            </h1>
          </motion.div>
          
          <div className="bg-slate-900 text-white p-6 rounded-sm min-w-[240px] shadow-2xl">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-mono tracking-widest opacity-50 uppercase">Auth_Status</span>
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
             </div>
             <p className="text-2xl font-black italic tracking-tighter uppercase leading-none">Verified</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: TECHNICAL GRID --- */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Identity Cell */}
            <div className={`col-span-2 p-8 ${cardBg}`}>
              <div className={labelStyle}><div className="h-1 w-1 bg-red-600" />Member Name</div>
              <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <p className="text-4xl font-black uppercase italic tracking-tighter">{userData.name}</p>
                <div className="text-right flex flex-col items-end">
                   <p className="text-[10px] font-mono text-slate-400">{userData.email}</p>
                   <div className="h-[2px] w-24 bg-red-600 mt-2" />
                </div>
              </div>
            </div>

            {/* Specs Cells */}
            {[
              { label: "Blitz ID", val: userData.nodeID, icon: <FaUserShield /> },
              { label: "Non-Tech DEPt", val: userData.NonTech, icon: <FaGlobe /> },
              { label: "Position", val: userData.role, icon: <FaShieldAlt /> },
              { label: "Tech Dept", val: userData.tech, icon: <FaProjectDiagram />, color: "text-red-600" },
              { 
                label: "LinkedIn Profile", 
                val: userData.linkedin || "No Link Provided", 
                icon: <FaLinkedin />, 
                isLink: true 
              },
              {
                label:"email",val:userData.email, icon:<FaVoicemail/>
              }

            ].map((item, i) => (
              <div key={i} className={`p-6 ${cardBg} group relative`}>
                <div className="flex justify-between items-start mb-4">
                   <p className={labelStyle}>{item.label}</p>
                   <span className="text-slate-200 group-hover:text-red-600 transition-colors">
                    {item.isLink && userData.linkedin ? (
                      <a href={`https://linkedin.com/in/${userData.linkedin}`} target="_blank" rel="noreferrer">
                        <FaExternalLinkAlt className="text-xs mb-1" />
                      </a>
                    ) : item.icon}
                   </span>
                </div>
                {item.isLink && userData.linkedin ? (
                  <a 
                    href={`https://linkedin.com/in/${userData.linkedin}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-lg font-black uppercase italic tracking-tighter hover:text-blue-600 transition-colors"
                  >
                    @{userData.linkedin}
                  </a>
                ) : (
                  <p className={`text-xl font-black uppercase italic tracking-tighter ${item.color || "text-slate-900"}`}>
                    {item.val}
                  </p>
                )}
              </div>
            ))}

            {/* Dynamic Buttons */}
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
               <button className="relative overflow-hidden group py-6 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[10px] active:scale-[0.98] transition-all">
                  <div className="absolute top-0 left-0 w-full h-full bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <FaEdit /> Modify Profile Registry
                  </span>
               </button>
  
            </div>
          </div>

          {/* --- RIGHT: THE PHYSICAL Dossier CARD --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-12">
              <div className="bg-white border-2 border-slate-900 p-0 rounded-sm shadow-[20px_20px_0px_0px_rgba(0,0,0,0.03)] overflow-hidden">
                
                {/* ID Header */}
                <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-[8px] font-mono tracking-[0.4em]">LIVE_ID_FEED</span>
                  </div>
                  <FaFingerprint className="text-red-600" />
                </div>

                <div className="p-8">
                   <div className="relative h-72 w-full mb-8 border-slate-200 group overflow-hidden flex justify-center">
                      <Image
                        src={userData.image || "/placeholder-user.jpg"}
                        alt="Operator"
                        fill
                        className="object-cover rounded-full p-4 object-center transition-all duration-1000 scale-105 group-hover:scale-100"
                      />
                   </div>

                   <div className="space-y-2">
                      <div>
                         <p className="text-lg font-black italic tracking-tighter uppercase border-b-2 border-slate-900 inline-block">Mist Blitz</p>
                      </div>
                      <div className="flex justify-between items-end">
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">ID</p>
                            <p className="text-sm font-mono font-bold tracking-widest">{userData.roll}</p>
                         </div>
                         <FaBarcode className="text-5xl opacity-30" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;