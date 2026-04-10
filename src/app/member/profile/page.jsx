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
import CenterLoader, { RoundedRedLoader } from "@/components/ui/center-loader";

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

  useEffect(() => {
    const refreshData = async () => {
      if (user?.email && !user?.info) {
        try {
          const res = await api.get(`/members/${user.email}`);
          setUser((prev) => ({ ...prev, info: res.data }));
        } catch (err) {
          console.error("Profile sync error:", err);
        }
      }
    };
    refreshData();
  }, [user, setUser]);

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

  const labelStyle =
    "text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 flex items-center gap-2";
  const cardBg =
    "bg-white border border-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)] transition-all duration-300";

  if (loading) {
    return <CenterLoader fullScreen containerClassName="bg-[#FDFDFD]" />;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans italic selection:bg-red-600 selection:text-white pb-24">
      <Toaster />
      <div className="max-w-7xl mx-auto pt-8 md:pt-16 px-4 md:px-6 relative z-10">
        {/* --- SYSTEM HEADER --- */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start border-slate-900 pl-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl md:text-5xl flex flex-wrap gap-2 md:gap-6 font-black tracking-tighter uppercase ">
              My{" "}
              <span className="text-red-600 block">
                {isEditing ? "Registry" : "Account"}
              </span>
            </h1>
          </motion.div>

          <div
            className={`p-4 md:p-6 hidden rounded-sm w-full md:min-w-[240px] md:w-auto shadow-2xl transition-all duration-500 ${
              isEditing ? "bg-red-600" : "bg-slate-900"
            } text-white`}
          >
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <span className="text-[9px] font-mono tracking-widest opacity-50 uppercase">
                {isEditing ? "Mode_Rewrite" : "Auth_Status"}
              </span>
              <div
                className={`h-2 w-2 rounded-full ${
                  isEditing ? "bg-white animate-ping" : "bg-green-500"
                } shadow-[0_0_10px_currentcolor]`}
              />
            </div>
            <p className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none">
              {isSaving ? <RoundedRedLoader size="h-5 w-5" className="border-white/35 border-t-white" /> : isEditing ? "Editing" : "Verified"}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT: TECHNICAL GRID --- */}
          <div className="order-2 lg:order-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Locked: Member Name */}
            <div className={`md:col-span-2 p-6 md:p-8 ${cardBg}`}>
              <div className={labelStyle}>
                <div className="h-1 w-1 bg-red-600" />
                Member Name
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-4">
                <p className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">
                  {userData.name}
                </p>
                <div className="md:text-right flex flex-col md:items-end w-full md:w-auto">
                  <p className="text-[10px] font-mono text-slate-400 break-all">
                    {userData.email}
                  </p>
                  <div className="h-[2px] w-24 bg-red-600 mt-2" />
                </div>
              </div>
            </div>

            {/* Editable: Position */}
            <div className={`p-6 ${cardBg} group relative`}>
              <div className="flex justify-between items-start mb-4">
                <p className={labelStyle}>Position / Rank</p>
                <span className="text-slate-200 group-hover:text-red-600 transition-colors">
                  <FaShieldAlt />
                </span>
              </div>
              {isEditing ? (
                <PremiumDropdown
                  options={positionOptions}
                  selected={formData.position}
                  onSelect={handleSelectPosition}
                />
              ) : (
                <p className="text-lg md:text-xl font-black uppercase italic tracking-tighter text-slate-900">
                  {userData.role}
                </p>
              )}
            </div>

            {/* Editable: LinkedIn */}
            <div className={`p-6 ${cardBg} group relative`}>
              <div className="flex justify-between items-start mb-4">
                <p className={labelStyle}>LinkedIn Username</p>
                {!isEditing && userData.linkedin ? (
                  <Link
                    href={`https://linkedin.com/in/${userData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Visit LinkedIn Profile"
                  >
                    <FaLinkedin size={18} />
                  </Link>
                ) : (
                  <span className="text-slate-200 group-hover:text-red-600 transition-colors">
                    <FaLinkedin />
                  </span>
                )}
              </div>
              {isEditing ? (
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-slate-300 focus:border-red-600 text-lg md:text-xl font-black uppercase italic focus:outline-none"
                  placeholder="Username only"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-lg md:text-xl font-black uppercase italic tracking-tighter text-slate-900">
                    {userData.linkedin || "NOT_SET"}
                  </p>
                  {userData.linkedin && (
                    <Link
                      href={`https://linkedin.com/in/${userData.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt className="text-[10px] text-red-600 opacity-50" />
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Locked Info Grid */}
            {[
              {
                label: "Blitz ID",
                val: userData.nodeID,
                icon: <FaUserShield />,
              },
              {
                label: "Tech Dept",
                val: userData.tech,
                icon: <FaProjectDiagram />,
                color: "text-red-600",
              },
              {
                label: "Non-Tech DEPt",
                val: userData.NonTech,
                icon: <FaGlobe />,
              },
              { label: "email", val: userData.email, icon: <FaVoicemail /> },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 ${cardBg} group relative opacity-70`}
              >
                <div className="flex justify-between items-start mb-4">
                  <p className={labelStyle}>{item.label}</p>
                  <span className="text-slate-200 group-hover:text-red-600 transition-colors">
                    {item.icon}
                  </span>
                </div>
                <p
                  className={`text-lg md:text-sm font-black uppercase italic tracking-tighter break-all ${
                    item.color || "text-slate-900"
                  }`}
                >
                  {item.val || "N/A"}
                </p>
              </div>
            ))}

            {/* Dynamic Action Buttons */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="relative overflow-hidden cursor-pointer group py-6 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[10px] active:scale-[0.98] transition-all md:col-span-2"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <FaEdit /> Modify Profile Registry
                  </span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="py-6 bg-green-600 cursor-pointer text-white font-black uppercase tracking-[0.3em] text-[10px] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                  >
                    <FaSave /> {isSaving ? "Processing..." : "Commit Changes"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="py-6 bg-slate-200 cursor-pointer text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <FaTimes /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* --- RIGHT: Dossier Card --- */}
          <div className="order-1 lg:order-2 lg:col-span-4">
            <div className="lg:sticky lg:top-12">
              {/* --- MAIN CARD CONTAINER --- */}
              <div className="relative group">
                {/* Brutalist "Offset" Background Decor */}
                <div className="absolute inset-0 bg-slate-900 translate-x-2 translate-y-2 rounded-sm" />

                <div className="relative bg-white border-2 border-slate-900 rounded-sm overflow-hidden flex flex-col">
                  {/* --- HEADER: TECHNICAL BAR --- */}
                  <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </div>
                      <span className="text-[9px] font-mono tracking-[0.3em] font-bold uppercase">
                        Signal_Active
                      </span>
                    </div>
                    <FaFingerprint className="text-white/40 group-hover:text-red-600 transition-colors duration-500" />
                  </div>

                  {/* --- IMAGE SECTION: THE "RECON" VIEW --- */}
                  <div className="p-6">
                    <div className="relative aspect-square w-full max-w-70 mx-auto bg-slate-50 border border-slate-200 group-hover:border-slate-900 transition-colors p-1">
                      {/* Corner Markers */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-900 -m-[2px]" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-900 -m-[2px]" />

                      <div className="relative w-full h-full overflow-hidden hover:scale-102 transition-all duration-700 bg-slate-200">
                        <Image
                          src={userData.image || "/placeholder-user.jpg"}
                          alt="Operator"
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- DATA SECTION --- */}
                  <div className="px-6 pb-6 space-y-6">
                    <div className="flex justify-between items-start pt-4 border-t border-slate-100">
                      <div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                          Mist <span className="text-red-600">Blitz</span>
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">
                          Roll
                        </p>
                        <p className="font-mono text-sm font-bold bg-slate-100 px-2 py-0.5 rounded italic">
                          #{userData.roll}
                        </p>
                      </div>
                    </div>

                    {/* Micro-Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 bg-slate-50/50 -mx-6 px-6">
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                          Auth_Status
                        </p>
                        <p className="text-[10px] font-black text-slate-800 uppercase italic tracking-tighter">
                          Verified_Operator
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                          Registry_V
                        </p>
                        <p className="text-[10px] font-black text-slate-800 uppercase italic tracking-tighter italic">
                          2026.01.2
                        </p>
                      </div>
                    </div>

                    {/* Barcode / Serial Footer */}
                    <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex gap-1">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-4 w-[1px] bg-slate-900 ${
                                i % 3 === 0 ? "h-6" : ""
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[8px] font-mono font-bold tracking-[0.2em]">
                          {userData.blitzId?.substring(0, 12)}
                        </span>
                      </div>
                      <FaBarcode className="text-4xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Hint Text */}
              <p className="mt-4 text-[9px] font-mono text-slate-400 uppercase text-center tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                Restricted_Data_Access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
