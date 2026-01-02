"use client";

import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaLock, FaEnvelope, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "@/context/Authcontext";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams

const schema = yup.object().shape({
  email: yup.string().email("Invalid signature").required("Identifier required"),
  password: yup.string().required("Password required"),
});

const AdminLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, user, loading } = useContext(AuthContext);

  // 1. Get email from URL (sent by Footer logic)
  const emailFromUrl = searchParams.get("email");

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: emailFromUrl || "", // Pre-fill if exists
    }
  });

  // 2. Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace(user.role === "admin" ? "/admin/dashboard" : "/profile");
    }
  }, [user, loading, router]);

  // 3. Update field if URL param changes
  useEffect(() => {
    if (emailFromUrl) {
      setValue("email", emailFromUrl);
    }
  }, [emailFromUrl, setValue]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Identity Verified. Access Granted.");
    } catch (error) { 
      toast.error(error.message);
    }
  }

  const onSubmit = async (data) => {
    try {
      await signInWithEmail(data.email, data.password);
      toast.success("Identity Verified. Access Granted.");
      // The useEffect above will handle the redirect automatically
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500 font-mono italic tracking-widest">VERIFYING SESSION...</div>;

  // ... (Your existing JSX remains the same)
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans selection:bg-red-500/30">
      <Toaster position="top-center" />
      
      {/* (Rest of your UI code) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[460px] z-10 p-4"
      >
        <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="p-10 md:p-12">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-black italic text-white tracking-[0.1em] uppercase">
                Mist <span className="font-black text-red-600">Blitz</span>
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1 block">Email Identifier</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors text-xs" />
                  <input 
                    {...register("email")} 
                    type="email" 
                    placeholder="admin@mistblitz.com" 
                    className="w-full bg-slate-900/50 border border-slate-800 pl-12 pr-4 py-3.5 rounded-xl text-slate-200 placeholder:text-slate-600 text-sm focus:border-red-500/50 outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1 block">Password</label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors text-xs" />
                  <input 
                    {...register("password")} 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-slate-900/50 border border-slate-800 pl-12 pr-4 py-3.5 rounded-xl text-slate-200 placeholder:text-slate-600 text-sm focus:border-red-500/50 outline-none" 
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold uppercase text-xs hover:bg-red-500 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? "Connecting..." : "Establish Connection"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;