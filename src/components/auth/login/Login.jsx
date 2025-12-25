"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaShieldAlt, FaLock, FaEnvelope, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("Invalid signature").required("Identifier required"),
  password: yup.string().required("Password required"),
});

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await signInWithEmail(data.email, data.password);
      toast.success("Identity Verified. Access Granted.");
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputClasses = "w-full bg-slate-900/50 border border-slate-800 pl-12 pr-4 py-3.5 rounded-xl text-slate-200 placeholder:text-slate-600 text-sm transition-all duration-300 outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50";
  const labelClasses = "text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1 block";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans selection:bg-red-500/30">
      <Toaster position="top-center" />

      {/* --- BACKGROUND LAYER: Subtle Grid & Glow --- */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[460px] z-10 p-4"
      >
        <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
          
          {/* Top Status Bar Decoration */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

          <div className="p-10 md:p-12">
            {/* --- HEADER --- */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Login</span>
              </div>
              
              <h1 className="text-3xl font-light text-white tracking-[0.1em] uppercase">
                Mist <span className="font-black text-red-600">Blitz</span>
              </h1>
              <p className="text-slate-500 text-xs mt-3 tracking-wide">Admin Terminal </p>
            </div>

            {/* --- GOOGLE AUTH --- */}
            <button
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 bg-slate-800/40 border border-slate-700 py-3 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 group mb-8"
            >
              <FcGoogle size={18} />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Verify with Google</span>
            </button>

            <div className="relative mb-8 flex items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="px-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">Credentials</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* --- FORM --- */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className={labelClasses}>Admin Email</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors text-xs" />
                  <input {...register("email")} type="email" placeholder="admin@mistblitz.com" className={inputClasses} />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] mt-2 font-medium">
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={labelClasses}>Admin Password</label>
                  <Link href="#" className="text-[9px] font-bold text-slate-500 hover:text-red-500 transition-colors uppercase">Recovery</Link>
                </div>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors text-xs" />
                  <input {...register("password")} type="password" placeholder="••••••••" className={inputClasses} />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-2 font-medium">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2 hover:bg-red-500 transition-all active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-600 group"
              >
                {isSubmitting ? "Authenticating..." : (
                  <>
                    Establish Connection <FaChevronRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                Restricted Access Area. 
                <Link href="/auth/register" className="ml-2 text-slate-300 hover:text-red-500 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-red-500">
                  Register Node
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;