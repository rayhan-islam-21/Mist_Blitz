"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaIdCard,
  FaUniversity,
  FaLink,
  FaLinkedin,
  FaCamera,
} from "react-icons/fa";
import PremiumDropdown from "@/components/ui/premium-dropdown";
import Image from "next/image";
import Button from "@/components/ui/retro-btn";

const AddMemberPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    dept: "Computer Science",
    image: "",
    linkedin: "",
  });

  const departments = [
    "Computer Science",
    "Electrical",
    "Mechanical",
    "Civil",
    "Business",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Member added successfully!");
  };

  // Standardized Style Classes
  const inputWrapperStyle = "group relative flex items-center bg-white border-2 border-slate-100 rounded-2xl transition-all duration-200 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-50";
  const iconBoxStyle = "flex items-center justify-center px-4 py-3 border-r border-slate-100   transition-colors";
  const inputFieldStyle = "flex-1 bg-transparent px-4 py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-10 px-4"
    >
      <div className="bg-white rounded-3xl shadow-xl shadow-red-100/50 border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-8 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FaUser size={120} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight italic uppercase">
            Add New Member
          </h2>
          <p className="text-red-100 mt-2 opacity-90 font-medium">
            Onboard a new student to the MIST Blitz platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          
          {/* Section 1: Basic Identity */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-red-50 pb-2">
              <div className="w-1.5 h-6 bg-red-600 rounded-full" />
              <h3 className="text-lg font-bold text-slate-800">Identity Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                <div className={inputWrapperStyle}>
                  <div className={iconBoxStyle}>
                    <FaUser className="text-red-500" />
                  </div>
                  <input
                    type="text"
                    required
                    className={inputFieldStyle}
                    placeholder="Tahmid Muntasir Auhin"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Student ID Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Student ID</label>
                <div className={inputWrapperStyle}>
                  <div className={iconBoxStyle}>
                    <FaIdCard className="text-red-500" />
                  </div>
                  <input
                    type="text"
                    required
                    className={inputFieldStyle}
                    placeholder="202318102"
                    onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Department & Media */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-red-50 pb-2">
              <div className="w-1.5 h-6 bg-red-600 rounded-full" />
              <h3 className="text-lg font-bold text-slate-800">Academic & Media</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2 space-y-6">
                {/* Custom Dropdown (Assuming it follows the same style) */}
                <PremiumDropdown
                  options={departments}
                  selected={formData.dept}
                  onSelect={(val) => setFormData({ ...formData, dept: val })}
                />

                {/* Image URL Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Profile Image URL</label>
                  <div className={inputWrapperStyle}>
                    <div className={iconBoxStyle}>
                      <FaCamera className="text-red-500" />
                    </div>
                    <input
                      type="url"
                      className={inputFieldStyle}
                      placeholder="https://images.unsplash.com/..."
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-red-100 rounded-3xl bg-red-50/30 min-h-[200px] transition-all">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">Preview</span>
                <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-2xl shadow-red-200 overflow-hidden bg-red-100">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized // Useful if using external random URLs
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Error"; }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-red-300">
                      <FaUser size={40} />
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm font-black text-red-600 truncate max-w-full italic uppercase tracking-tight">
                  {formData.name || "New Member"}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Social Links */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-red-50 pb-2">
              <div className="w-1.5 h-6 bg-red-600 rounded-full" />
              <h3 className="text-lg font-bold text-slate-800">Social Presence</h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">LinkedIn Profile</label>
              <div className={inputWrapperStyle}>
                <div className={iconBoxStyle}>
                  <FaLinkedin className="text-red-600" size={18} />
                  <span className="text-sm font-bold text-slate-400 ml-1">/in/</span>
                </div>
                <input
                  type="text"
                  placeholder="username"
                  className={inputFieldStyle}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
                {formData.linkedin.length > 2 && (
                  <div className="pr-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              className="w-full py-4 rounded bg-red-600 hover:bg-red-700 text-white border-b-4 border-red-900 shadow-xl  transition-all hover:-translate-y-1 active:translate-y-0.5 active:border-b-0"
            >
              <span className="font-black uppercase tracking-[0.2em] italic text-lg">
                Create Member Profile
              </span>
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddMemberPage;