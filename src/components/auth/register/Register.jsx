"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchParams, useRouter } from "next/navigation";
import { FaUserShield, FaArrowRight, FaLock, FaFingerprint, FaShieldAlt, FaEnvelope, FaCheckCircle, FaUserCheck } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import Image from "next/image";
import AuthContext from "@/context/Authcontext";
import saveAdminToDB from "@/lib/saveadminToDb";

const schema = yup.object().shape({
  password: yup.string().min(6, "Security Key must be 6+ chars").required("Required"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const MemberRegister = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const controls = useAnimation();
  
  // 1. Get blitzId from URL (Matches Footer: ?blitzId=...)
  const blitzId = searchParams.get("blitzId");

  const { signUpwithEmail } = useContext(AuthContext);

  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

// Inside MemberRegister.js
useEffect(() => {
  // Use 'blitzId' because that's what we defined above
  if (!blitzId) {
    console.log("No blitzId found, redirecting...");
    // router.replace("/"); // Temporary comment this out to debug if needed
    return;
  }

  const fetchIdentity = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/members/${blitzId}`);
      setMemberData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("IDENTITY BREACH: INVALID TOKEN");
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  fetchIdentity();
}, [blitzId, router]);

  const onSubmit = async (data) => {
    if (isSubmittingManual) return;
    setIsSubmittingManual(true);
    const syncToast = toast.loading("Initializing Bio-Metric Sync...");

    try {
      // 2. Firebase Auth Sign Up
      const firebaseUser = await signUpwithEmail(
        memberData.name,
        memberData.email,
        data.password
      );

      // 3. Database Sync
      const newUserRecord = {
        uid: firebaseUser.uid,
        email: memberData.email,
        name: memberData.name,
        role: "member",
        blitzId: blitzId // Storing the reference
      };

      await saveAdminToDB(newUserRecord);

      toast.success("IDENTITY SYNCHRONIZED", { id: syncToast });
      router.push("/member/profile");
      
    } catch (error) {
      const errMsg ="SYNC_FAILED: INTERNAL ERROR";
      toast.error(errMsg);
    } finally {
      setIsSubmittingManual(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center font-mono text-red-500">
      <FaFingerprint className="text-4xl mb-4 animate-pulse" />
      <div className="text-[10px] tracking-[1em] font-black uppercase">Syncing Bio-Data...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#02040a] selection:bg-red-600 selection:text-white flex items-center justify-center p-0 md:p-10 font-mono overflow-hidden">
      <Toaster position="top-right" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#450a0a_0%,transparent_70%)] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="relative z-10 w-full max-w-5xl h-full md:min-h-[650px] flex flex-col md:flex-row bg-[#0a0f18]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden rounded-none md:rounded-3xl"
      >
        
        {/* LEFT PANEL: PROFILE DATA */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-12 bg-gradient-to-br from-red-900/20 via-transparent to-transparent">
          <div className="absolute top-10 left-10 w-10 h-10 border-t-2 border-l-2 border-red-500/30" />
          <div className="absolute bottom-10 left-10 w-10 h-10 border-b-2 border-l-2 border-red-500/30" />
          
          <div className="relative mb-8">
            <div className="w-40 h-40 rounded-2xl border-2 border-red-600 p-2 relative z-10 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <div className="relative w-full h-full rounded-lg overflow-hidden grayscale contrast-125">
                <Image 
                  src={memberData?.image || "/fallback-avatar.png"} 
                  fill 
                  className="object-cover" 
                  alt="Agent" 
                  priority
                />
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-red-500/50 blur-sm z-20"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-75 animate-pulse" />
          </div>

          <div className="text-center space-y-2 relative z-10">
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter italic">
              {memberData?.name || "Access Denied"}
            </h2>
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 px-4 py-1.5 rounded-full">
              <span className="text-[11px] text-red-500 font-black uppercase tracking-widest">
                BLITZ_ID: {blitzId}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">
              {memberData?.position || "Member"}
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: REGISTRATION FORM */}
        <motion.div 
          animate={controls}
          className="w-full md:w-1/2 bg-black/40 flex flex-col p-12 border-t md:border-t-0 md:border-l border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
               <FaShieldAlt className="text-red-600 text-xl" />
               <div className="leading-none">
                 <p className="text-white text-xs font-black uppercase tracking-[0.2em]">Auth Module</p>
                 <p className="text-[9px] text-red-500/60 font-bold uppercase tracking-widest mt-1">INITIALIZE_ACCOUNT</p>
               </div>
             </div>
             <div className="p-3 bg-red-600/10 border border-red-500/20 rounded-xl text-red-500">
                <FaUserCheck size={14} />
             </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col justify-center">
            
            {/* EMAIL (LOCKED) */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Assigned Email</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" />
                <input 
                  value={memberData?.email || ""} 
                  disabled 
                  className="w-full bg-[#0d1117] border border-white/5 pl-14 pr-12 py-5 rounded-2xl text-slate-500 text-sm outline-none cursor-not-allowed" 
                />
                <FaCheckCircle className="absolute right-5 top-1/2 -translate-y-1/2 text-green-500/40" />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Create Access Key</label>
              <div className="relative group">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-500 transition-colors" />
                <input 
                  {...register("password")} 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-[#0d1117] border border-white/5 pl-14 pr-6 py-5 rounded-2xl text-white text-lg focus:ring-1 focus:ring-red-500/50 outline-none transition-all tracking-[0.5em] placeholder:text-slate-900" 
                />
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.password.message}</p>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Confirm Key</label>
              <div className="relative group">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-500 transition-colors" />
                <input 
                  {...register("confirmPassword")} 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-[#0d1117] border border-white/5 pl-14 pr-6 py-5 rounded-2xl text-white text-lg focus:ring-1 focus:ring-red-500/50 outline-none transition-all tracking-[0.5em] placeholder:text-slate-900" 
                />
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.confirmPassword.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmittingManual} 
              className="w-full group relative flex items-center justify-between bg-red-700 hover:bg-red-600 disabled:bg-red-900/50 disabled:cursor-not-allowed text-white px-8 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] transition-all active:scale-[0.98] mt-4 shadow-lg shadow-red-900/20"
            >
              <span>{isSubmittingManual ? "PROCESSING..." : "COMPLETE REGISTRATION"}</span>
              {!isSubmittingManual && <FaArrowRight className="group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 flex justify-between items-center opacity-30">
             <div className="space-y-1 text-[8px] font-bold uppercase tracking-widest text-slate-500">
               <p>Status: Pending Initialization</p>
               <p>Network: Mist_Red_v1</p>
             </div>
             <FaUserShield className="text-white text-2xl" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MemberRegister;