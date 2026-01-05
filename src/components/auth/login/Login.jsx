"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLock, FaUserShield, FaArrowRight, FaFingerprint, FaShieldAlt, FaEnvelope, FaCheckCircle, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "@/context/Authcontext";
import api from "@/lib/axios";
import Image from "next/image";

const schema = yup.object().shape({
  email: yup.string().email("Invalid format").required("Email is required"),
  password: yup.string().required("Access Key Required"),
});

const AdminLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email");
  
  const { signInWithEmail, user, loading: authLoading } = useContext(AuthContext);
  
  const [memberInfo, setMemberInfo] = useState(null);
  const [isFetchingIdentity, setIsFetchingIdentity] = useState(!!emailFromUrl);
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: emailFromUrl || "" }
  });

  useEffect(() => {
    // 1. If no email param, kick back to home before showing UI
    if (!emailFromUrl && !authLoading) {
      router.replace("/");
      return;
    }

    if (emailFromUrl) {
      const fetchIdentity = async () => {
        try {
          setIsFetchingIdentity(true);
          setValue("email", emailFromUrl);
          
          const res = await api.get(`/members/${emailFromUrl}`);
          setMemberInfo(res.data);
        } catch (err) {
          console.error("Identity fetch failed:", err);
          toast.error("IDENTITY BREACH: PROFILE NOT RECOGNIZED");
        } finally {
          setIsFetchingIdentity(false);
        }
      };
      fetchIdentity();
    }
  }, [emailFromUrl, setValue, router, authLoading]);

  useEffect(() => {
    if (!authLoading && user) {
      const path = user.role === "admin" ? "/admin/dashboard" : "/member/profile";
      router.replace(path);
    }
  }, [user, authLoading, router]);

  const onSubmit = async (data) => {
    if (isSubmittingManual) return;
    
    setIsSubmittingManual(true);
    const loginToast = toast.loading("Verifying Bio-Metric Access...");

    try {
      await signInWithEmail(data.email, data.password);
      toast.success("ACCESS GRANTED: WELCOME AGENT", { id: loginToast });
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error("INVALID ACCESS KEY", { id: loginToast });
    } finally {
      setIsSubmittingManual(false);
    }
  };

  if (authLoading || isFetchingIdentity || !emailFromUrl) {
    return (
      <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center font-mono text-red-500">
        <FaFingerprint className="text-4xl mb-4 animate-pulse" />
        <div className="text-[10px] tracking-[1em] font-black uppercase">Syncing Bio-Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] selection:bg-red-600 selection:text-white flex items-center justify-center p-0 md:p-10 font-mono overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Background FX - FIXED URL SYNTAX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#450a0a_0%,transparent_70%)] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="relative z-10 w-full max-w-5xl h-full md:min-h-162.5 flex flex-col md:flex-row bg-[#0a0f18]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden rounded-none md:rounded-3xl"
      >
        
        {/* LEFT PANEL: IDENTITY CARD */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-12 bg-linear-to-br from-red-900/20 via-transparent to-transparent">
          <div className="absolute top-10 left-10 w-10 h-10 border-t-2 border-l-2 border-red-500/30" />
          <div className="absolute bottom-10 left-10 w-10 h-10 border-b-2 border-l-2 border-red-500/30" />
          
          <div className="relative mb-8">
            <div className="w-40 h-40 rounded-2xl border-2 border-red-600 p-2 relative z-10 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <div className="relative w-full h-full rounded-lg overflow-hidden grayscale contrast-125">
                <Image 
                  src={memberInfo?.image || "/fallback-avatar.png"} 
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
              {memberInfo?.name || "Access Denied"}
            </h2>
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 px-4 py-1.5 rounded-full">
              <span className="text-[11px] text-red-500 font-black uppercase tracking-widest">
                ID_REF: {memberInfo?.blitzId || "UNKNOWN"}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">
              {memberInfo?.position || "Awaiting Verification"}
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: LOGIN MODULE */}
        <div className="w-full md:w-1/2 bg-black/40 flex flex-col p-12 border-t md:border-t-0 md:border-l border-white/5">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
               <FaShieldAlt className="text-red-600 text-xl" />
               <div className="leading-none">
                 <p className="text-white text-xs font-black uppercase tracking-[0.2em]">Auth Module</p>
                 <p className="text-[9px] text-red-500/60 font-bold uppercase tracking-widest mt-1">SECURE_DASHBOARD</p>
               </div>
             </div>
             <div className="p-3 bg-red-600/10 border border-red-500/20 rounded-xl text-red-500">
                <FaUserCheck size={14} />
             </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col justify-center">
            
            {/* EMAIL */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Identity (Email)</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-500 transition-colors" />
                <input 
                  {...register("email")} 
                  type="email"
                  readOnly={!!emailFromUrl}
                  placeholder="AGENT_EMAIL"
                  className={`w-full bg-[#0d1117] border border-white/5 pl-14 pr-12 py-5 rounded-2xl text-sm outline-none transition-all ${emailFromUrl ? 'text-slate-500 cursor-not-allowed' : 'text-white focus:ring-1 focus:ring-red-500/50'}`} 
                />
                {emailFromUrl && <FaCheckCircle className="absolute right-5 top-1/2 -translate-y-1/2 text-green-500/40" />}
              </div>
              {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Access Key</label>
              <div className="relative group">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-500 transition-colors" />
                <input 
                  {...register("password")} 
                  type="password" 
                  autoFocus
                  placeholder="••••••••" 
                  className="w-full bg-[#0d1117] border border-white/5 pl-14 pr-6 py-5 rounded-2xl text-white text-lg focus:ring-1 focus:ring-red-500/50 outline-none transition-all tracking-[0.5em] placeholder:text-slate-900" 
                />
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmittingManual} 
              className="w-full group relative flex items-center justify-between bg-red-700 hover:bg-red-600 disabled:bg-red-900/50 disabled:cursor-not-allowed text-white px-8 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] transition-all active:scale-[0.98] mt-4 shadow-lg shadow-red-900/20"
            >
              <span>{isSubmittingManual ? "AUTHORIZING..." : "GRANT ACCESS"}</span>
              {!isSubmittingManual && <FaArrowRight className="group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 flex justify-between items-center opacity-30">
             <div className="space-y-1 text-[8px] font-bold uppercase tracking-widest text-slate-500">
               <p>Status: Secure Link Established</p>
               <p>Encryption: Mist_RSA_4096</p>
             </div>
             <FaUserShield className="text-white text-2xl" />
          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default AdminLogin;