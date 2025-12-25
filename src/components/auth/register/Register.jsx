"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {
  FaUserPlus,
  FaChevronRight,
  FaEnvelope,
  FaLock,
  FaUserShield,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import saveAdminToDB from "@/lib/saveadminToDb";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid signature")
    .required("Identifier required"),
  password: yup
    .string()
    .min(6, "Security key must be 6+ chars")
    .required("Access key required"),
});

const AdminRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { signUpwithEmail, signInWithGoogle, user } = useContext(AuthContext);
  const router = useRouter();
  console.log("Current User in Register:", user);

  const handleGoogleRegistration = async () => {
    try {
      const result = await signInWithGoogle();
      await handlePostRegistration(result.user);
      toast.success("Identity Created via Google. System Access Granted.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePostRegistration = async (users) => {
    const adminData = {
      uid: users.uid,
      email: users.email,
      name: users.displayName,
      role: "admin",
      createdAt: new Date().toISOString(),
    };
    console.log("Admin Data to Save:", adminData);
    await saveAdminToDB(adminData);
    router.push("/admin/dashboard");
  };

  const onSubmit = async (data) => {
    try {
      const result = await signUpwithEmail(
        data.name,
        data.email,
        data.password
      );
      console.log("Registration Result:", result);
      await handlePostRegistration(result);
      toast.success("Identity Created. System Access Granted.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputClasses =
    "w-full bg-slate-900/50 border border-slate-800 pl-12 pr-4 py-3.5 rounded-xl text-slate-200 placeholder:text-slate-600 text-sm transition-all duration-300 outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50";
  const labelClasses =
    "text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1 block";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans selection:bg-red-500/30">
      <Toaster position="top-center" />

      {/* --- BACKGROUND LAYER --- */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-120 z-10 p-4"
      >
        <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Top Status Bar Decoration */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

          <div className="p-10 md:p-12">
            {/* --- HEADER --- */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
                <FaUserShield className="text-red-500 text-[10px]" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Admin access request
                </span>
              </div>

              <h1 className="text-3xl font-light text-white tracking-[0.1em] uppercase">
                Admin <span className="font-black text-red-600">Register</span>
              </h1>
              <p className="text-slate-500 text-xs mt-3 tracking-wide">
                Create secure administrator credentials
              </p>
            </div>

            {/* --- GOOGLE AUTH --- */}
            <button
              onClick={() => handleGoogleRegistration()}
              className="w-full flex items-center justify-center gap-3 bg-slate-800/40 border border-slate-700 py-3 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 group mb-8"
            >
              <FcGoogle size={18} />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                Connect with Google
              </span>
            </button>

            <div className="relative mb-8 flex items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="px-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">
                Credentials
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* --- FORM --- */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className={labelClasses}>Full Name</label>
                <div className="relative group">
                  <FaUserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors text-xs" />
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="e.g. Rayhan Islam"
                    className={inputClasses}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-medium ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClasses}>Email</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors text-xs" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="admin@mistblitz.com"
                    className={inputClasses}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-medium ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClasses}>Password</label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors text-xs" />
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className={inputClasses}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-medium ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2 hover:bg-red-500 transition-all active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-600 group mt-4"
              >
                {isSubmitting ? (
                  "Syncing Node..."
                ) : (
                  <>
                    Initialize Account{" "}
                    <FaChevronRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                Existing Node?
                <Link
                  href="/auth/login"
                  className="ml-2 text-slate-300 hover:text-red-500 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-red-500"
                >
                  Authenticate Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
