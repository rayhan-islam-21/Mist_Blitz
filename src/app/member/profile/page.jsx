"use client";

import React, { useContext, useState, useEffect } from "react";
import {
  FaUserShield,
  FaEdit,
  FaBarcode,
  FaShieldAlt,
  FaFingerprint,
  FaProjectDiagram,
  FaGlobe,
  FaLinkedin,
  FaExternalLinkAlt,
  FaVoicemail,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import AuthContext from "@/context/Authcontext";
import PremiumDropdown from "@/components/ui/premium-dropdown";
import api from "@/lib/axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const MyProfile = () => {
  const { user, setUser, loading } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    linkedin: "",
    position: "",
  });

  useEffect(() => {
    if (user?.info) {
      setFormData({
        linkedin: user.info.linkedin || "",
        position: user.info.position || "Trainee",
      });
    }
  }, [user]);

  const positionOptions = [
    "Senior Engineer",
    "Junior Engineer",
    "Apprentice Engineer",
    "Trainee",
  ];

  const userData = {
    name: user?.info?.name || user?.displayName || "OPERATOR_NULL",
    email: user?.email || "NOT_LOGGED_IN",
    role: user?.info?.position || "Active Personnel",
    nodeID: user?.info?.blitzId || "PENDING_SYNC",
    tech: user?.info?.techDept?.join(", ") || "None Assigned",
    NonTech: user?.info?.nonTechDept?.join(", ") || "None Assigned",
    image: user?.info?.image,
    roll: user?.info?.roll,
    linkedin: user?.info?.linkedin || "",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPosition = (val) => {
    setFormData((prev) => ({ ...prev, position: val }));
  };

  const handleSave = async () => {
    if (!user?.email) return;
    setIsSaving(true);
    try {
      const updateData = {
        position: formData.position,
        linkedin: formData.linkedin,
      };

      const response = await api.put(`/members/${user.email}`, updateData);

      if (response.status === 200) {
        setUser({ ...user, info: response.data });
        setIsEditing(false);
        toast.success("Info Updated Successfully");
      }
    } catch (error) {
      toast.error("Process Failed");
      const msg = error.response?.data?.error || "Failed to commit changes";
      alert(`Registry Error: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const labelStyle = "text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 flex items-center gap-2";
  const cardBg = "bg-white border border-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)] transition-all duration-300";

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="text-xl md:text-3xl font-black text-slate-400 font-sans uppercase italic">Loading....</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans italic selection:bg-red-600 selection:text-white pb-24">
      <Toaster />
      <div className="max-w-7xl mx-auto pt-8 md:pt-16 px-4 md:px-6 relative z-10">
        
        {/* --- SYSTEM HEADER --- */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start border-slate-900 pl-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl md:text-5xl flex flex-wrap gap-2 md:gap-6 font-black tracking-tighter uppercase ">
              My <span className="text-red-600 block">{isEditing ? "Registry" : "Account"}</span>
            </h1>
          </motion.div>

          <div className={`p-4 md:p-6 rounded-sm w-full md:min-w-[240px] md:w-auto shadow-2xl transition-all duration-500 ${isEditing ? "bg-red-600" : "bg-slate-900"} text-white`}>
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <span className="text-[9px] font-mono tracking-widest opacity-50 uppercase">{isEditing ? "Mode_Rewrite" : "Auth_Status"}</span>
              <div className={`h-2 w-2 rounded-full ${isEditing ? "bg-white animate-ping" : "bg-green-500"} shadow-[0_0_10px_currentcolor]`} />
            </div>
            <p className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none">
              {isSaving ? "Syncing..." : isEditing ? "Editing" : "Verified"}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: TECHNICAL GRID --- */}
          <div className="order-2 lg:order-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Locked: Member Name */}
            <div className={`md:col-span-2 p-6 md:p-8 ${cardBg}`}>
              <div className={labelStyle}><div className="h-1 w-1 bg-red-600" />Member Name</div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-4">
                <p className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">{userData.name}</p>
                <div className="md:text-right flex flex-col md:items-end w-full md:w-auto">
                  <p className="text-[10px] font-mono text-slate-400 break-all">{userData.email}</p>
                  <div className="h-[2px] w-24 bg-red-600 mt-2" />
                </div>
              </div>
            </div>

            {/* Editable: Position */}
            <div className={`p-6 ${cardBg} group relative`}>
              <div className="flex justify-between items-start mb-4">
                <p className={labelStyle}>Position / Rank</p>
                <span className="text-slate-200 group-hover:text-red-600 transition-colors"><FaShieldAlt /></span>
              </div>
              {isEditing ? (
                <PremiumDropdown options={positionOptions} selected={formData.position} onSelect={handleSelectPosition} />
              ) : (
                <p className="text-lg md:text-xl font-black uppercase italic tracking-tighter text-slate-900">{userData.role}</p>
              )}
            </div>

            {/* Editable: LinkedIn */}
            <div className={`p-6 ${cardBg} group relative`}>
              <div className="flex justify-between items-start mb-4">
                <p className={labelStyle}>LinkedIn Username</p>
                {!isEditing && userData.linkedin ? (
                  <Link href={`https://linkedin.com/in/${userData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer" title="Visit LinkedIn Profile">
                    <FaLinkedin size={18} />
                  </Link>
                ) : (
                  <span className="text-slate-200 group-hover:text-red-600 transition-colors"><FaLinkedin /></span>
                )}
              </div>
              {isEditing ? (
                <input name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full bg-transparent border-b border-slate-300 focus:border-red-600 text-lg md:text-xl font-black uppercase italic focus:outline-none" placeholder="Username only" />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-lg md:text-xl font-black uppercase italic tracking-tighter text-slate-900">{userData.linkedin || "NOT_SET"}</p>
                  {userData.linkedin && (
                    <Link href={`https://linkedin.com/in/${userData.linkedin}`} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="text-[10px] text-red-600 opacity-50" />
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Locked Info Grid */}
            {[
              { label: "Blitz ID", val: userData.nodeID, icon: <FaUserShield /> },
              { label: "Tech Dept", val: userData.tech, icon: <FaProjectDiagram />, color: "text-red-600" },
              { label: "Non-Tech DEPt", val: userData.NonTech, icon: <FaGlobe /> },
              { label: "email", val: userData.email, icon: <FaVoicemail /> },
            ].map((item, i) => (
              <div key={i} className={`p-6 ${cardBg} group relative opacity-70`}>
                <div className="flex justify-between items-start mb-4">
                  <p className={labelStyle}>{item.label}</p>
                  <span className="text-slate-200 group-hover:text-red-600 transition-colors">{item.icon}</span>
                </div>
                <p className={`text-lg md:text-xl font-black uppercase italic tracking-tighter break-all ${item.color || "text-slate-900"}`}>
                  {item.val || "N/A"}
                </p>
              </div>
            ))}

            {/* Dynamic Action Buttons */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="relative overflow-hidden cursor-pointer group py-6 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[10px] active:scale-[0.98] transition-all md:col-span-2">
                  <div className="absolute top-0 left-0 w-full h-full bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3"><FaEdit /> Modify Profile Registry</span>
                </button>
              ) : (
                <>
                  <button onClick={handleSave} disabled={isSaving} className="py-6 bg-green-600 cursor-pointer text-white font-black uppercase tracking-[0.3em] text-[10px] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50">
                    <FaSave /> {isSaving ? "Processing..." : "Commit Changes"}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="py-6 bg-slate-200 cursor-pointer text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    <FaTimes /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* --- RIGHT: Dossier Card --- */}
          <div className="order-1 lg:order-2 lg:col-span-4">
            <div className="lg:sticky lg:top-12">
              <div className="bg-white border-2 border-slate-900/10 p-0 rounded-sm shadow-[10px_10px_0px_0px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-[8px] font-mono tracking-[0.4em]">LIVE_ID_FEED</span>
                  </div>
                  <FaFingerprint className="text-red-600" />
                </div>
                <div className="p-6 md:p-8 flex flex-col items-center">
                  <div className="relative h-48 w-48 md:h-72 md:w-full mb-6 md:mb-8 flex justify-center">
                    <Image src={userData.image || "/placeholder-user.jpg"} alt="Operator" fill className="object-cover rounded-full p-2 md:p-4 object-center" />
                  </div>
                  <div className="w-full space-y-2">
                    <p className="text-base md:text-lg font-black italic tracking-tighter uppercase border-b-2 border-slate-900 inline-block">Mist Blitz</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">ID</p>
                        <p className="text-sm font-mono font-bold tracking-widest">{userData.roll}</p>
                      </div>
                      <FaBarcode className="text-4xl md:text-5xl opacity-30" />
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