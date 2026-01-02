"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchParams, useRouter } from "next/navigation";
import { FaUserCheck, FaChevronRight, FaLock, FaIdCard } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import Image from "next/image";
import AuthContext from "@/context/Authcontext";
import saveAdminToDB from "@/lib/saveadminToDb"; // Ensure path is correct

const schema = yup.object().shape({
  password: yup.string().min(6, "Password must be 6+ chars").required("Required"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const MemberRegister = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roll = searchParams.get("roll");

  // Properly destructure from Context at the top level
  const { signUpwithEmail } = useContext(AuthContext);

  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!roll) {
      router.replace("/");
      return;
    }

    const fetchIdentity = async () => {
      try {
        const res = await api.get(`/members/${roll}`);
        setMemberData(res.data);
      } catch (err) {
        toast.error("Invalid Identity Token");
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };
    fetchIdentity();
  }, [roll, router]);

  const onSubmit = async (data) => {
    try {
      // 1. Create Firebase Auth account using fetched member data
      const firebaseUser = await signUpwithEmail(
        memberData.name,
        memberData.email,
        data.password
      );

      // 2. Sync data to your database
      const newUserRecord = {
        uid: firebaseUser.uid,
        email: memberData.email,
        name: memberData.name,
        roll: memberData.roll,
        role: "member",
        blitzId: memberData.blitzId,
        image: memberData.image,
        createdAt: new Date().toISOString(),
      };

      await saveAdminToDB(newUserRecord);

      toast.success("Identity Synced Successfully!");
      router.push("/profile");
      
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message || "Failed to initialize account");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-red-600 font-mono italic">
      SYNCING BIO-DATA...
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#02040a] relative overflow-hidden p-6">
      <Toaster position="top-right" />

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden">
          
          <div className="p-12 bg-gradient-to-br from-blue-600/10 to-transparent border-r border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                <FaUserCheck className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-black text-white uppercase italic">Identity <span className="text-blue-500">Verified</span></h2>
            </div>

            <div className="mt-10">
              <div className="relative w-32 h-32 mb-6 shadow-2xl">
                <Image 
                   src={memberData.image} 
                   alt="Profile" 
                   fill 
                   className="rounded-2xl border-4 border-blue-500/50 object-cover" 
                />
              </div>
              <h3 className="text-3xl font-black text-white uppercase italic leading-none">{memberData.name}</h3>
              <p className="text-blue-400 font-mono text-sm mt-2">{memberData.position}</p>
              
              <div className="mt-8 space-y-2">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Department</p>
                <div className="flex gap-2">
                  <span className="bg-slate-800 text-slate-300 text-[10px] px-3 py-1 rounded-full uppercase font-bold">
                    {memberData.techDept?.[0] || memberData.nonTechDept?.[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12">
            <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">Finalize Authentication</h4>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="group">
                <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Assigned Email</label>
                <div className="relative">
                  <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                  <input value={memberData.email} disabled className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-xl text-slate-400 font-mono text-sm cursor-not-allowed" />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Create Access Key</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-blue-500 transition-colors" />
                  <input {...register("password")} type="password" placeholder="••••••••" className="w-full bg-black/40 border border-slate-800/60 pl-12 pr-4 py-4 rounded-xl text-slate-200 outline-none focus:border-blue-500/50 font-mono text-sm" />
                </div>
                {errors.password && <span className="text-[10px] text-red-500 mt-2 block font-mono">{errors.password.message}</span>}
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                {isSubmitting ? "PROCESSING..." : "COMPLETE REGISTRATION"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberRegister;