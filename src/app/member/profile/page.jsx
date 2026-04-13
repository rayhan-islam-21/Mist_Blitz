"use client";

import React, { useContext, useState, useEffect } from "react";
import { Pencil, Save, X, Linkedin, Mail, Hash, Cpu, Briefcase, User } from "lucide-react";
import Image from "next/image";
import AuthContext from "@/context/Authcontext";
import PremiumDropdown from "@/components/ui/premium-dropdown";
import api from "@/lib/axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import CenterLoader from "@/components/ui/center-loader";

const MyProfile = () => {
  const { user, setUser, loading } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ linkedin: "", position: "" });

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

  const positionOptions = ["Senior Engineer", "Junior Engineer", "Apprentice Engineer", "Trainee"];

  const userData = {
    name:     user?.info?.name || user?.displayName || "Unknown",
    email:    user?.email || "—",
    position: user?.info?.position || "—",
    blitzId:  user?.info?.blitzId || "—",
    tech:     user?.info?.techDept?.join(", ") || "None",
    nonTech:  user?.info?.nonTechDept?.join(", ") || "None",
    image:    user?.info?.image,
    roll:     user?.info?.roll || "—",
    linkedin: user?.info?.linkedin || "",
  };

  const handleSave = async () => {
    if (!user?.email) return;
    setIsSaving(true);
    try {
      const res = await api.put(`/members/${user.email}`, {
        position: formData.position,
        linkedin: formData.linkedin,
      });
      if (res.status === 200) {
        setUser({ ...user, info: res.data });
        setIsEditing(false);
        toast.success("Profile updated");
      }
    } catch {
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <CenterLoader fullScreen containerClassName="bg-white" />;

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 md:p-10">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">Member Portal</p>
            <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight">
              My <span className="text-red-600">{isEditing ? "Edit" : "Profile"}</span>
            </h1>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-all"
            >
              <Pencil size={12} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors"
              >
                <Save size={12} /> {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors"
              >
                <X size={12} /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Profile card */}
          <div className="lg:col-span-1">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Photo */}
              <div className="relative aspect-square bg-slate-100">
                <Image
                  src={userData.image || "/placeholder-user.jpg"}
                  alt={userData.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              {/* Identity */}
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-xs font-mono text-slate-400 mb-0.5 uppercase tracking-widest">Name</p>
                  <p className="font-black italic uppercase text-lg tracking-tight leading-tight">{userData.name}</p>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-0.5 uppercase tracking-widest">Roll No.</p>
                    <p className="font-bold text-sm">{userData.roll}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-0.5 uppercase tracking-widest">Blitz ID</p>
                    <p className="font-mono text-sm text-red-600 font-bold">{userData.blitzId}</p>
                  </div>
                </div>
                {userData.linkedin && (
                  <>
                    <div className="h-px bg-slate-100" />
                    <Link
                      href={`https://linkedin.com/in/${userData.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin size={13} /> linkedin.com/in/{userData.linkedin}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-4">

            {/* Position */}
            <div className="border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <User size={13} className="text-red-600" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Position / Rank</p>
              </div>
              {isEditing ? (
                <PremiumDropdown
                  options={positionOptions}
                  selected={formData.position}
                  onSelect={(val) => setFormData((p) => ({ ...p, position: val }))}
                />
              ) : (
                <p className="text-xl font-black italic uppercase tracking-tight">{userData.position}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Linkedin size={13} className="text-red-600" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">LinkedIn Username</p>
              </div>
              {isEditing ? (
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData((p) => ({ ...p, linkedin: e.target.value }))}
                  placeholder="username only (e.g. john-doe)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-red-500"
                />
              ) : (
                <p className="text-base font-bold">{userData.linkedin || <span className="text-slate-300">Not set</span>}</p>
              )}
            </div>

            {/* Read-only info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-100 bg-slate-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={12} className="text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</p>
                </div>
                <p className="text-sm font-mono text-slate-700 break-all">{userData.email}</p>
              </div>

              <div className="border border-slate-100 bg-slate-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Hash size={12} className="text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Blitz ID</p>
                </div>
                <p className="text-sm font-mono font-bold text-red-600">{userData.blitzId}</p>
              </div>

              <div className="border border-slate-100 bg-slate-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={12} className="text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Technical Dept.</p>
                </div>
                <p className="text-sm font-bold text-slate-700">{userData.tech}</p>
              </div>

              <div className="border border-slate-100 bg-slate-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={12} className="text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Management Dept.</p>
                </div>
                <p className="text-sm font-bold text-slate-700">{userData.nonTech}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
