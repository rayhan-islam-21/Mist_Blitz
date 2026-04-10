"use client";

import React, { useContext, useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLock, FaUserShield, FaArrowRight, FaShieldAlt, FaEnvelope, FaCheckCircle, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "@/context/Authcontext";
import api from "@/lib/axios";
import Image from "next/image";
import CenterLoader from "@/components/ui/center-loader";

const schema = yup.object().shape({
  email: yup.string().email("Invalid format").required("Email is required"),
  password: yup.string().required("Access Key Required"),
});

// ISOLATED HOOK COMPONENT
const LoginUrlParamTracker = ({ setUrlEmail }) => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  useEffect(() => {
    if (email) setUrlEmail(email);
  }, [email, setUrlEmail]);
  return null;
};

const AdminLogin = () => {
  const router = useRouter();
  const [emailFromUrl, setEmailFromUrl] = useState(null);
  const { signInWithEmail, user, loading: authLoading } = useContext(AuthContext);
  
  const [memberInfo, setMemberInfo] = useState(null);
  const [isFetchingIdentity, setIsFetchingIdentity] = useState(false);
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "" }
  });

  useEffect(() => {
    if (emailFromUrl) {
      const fetchIdentity = async () => {
        try {
          setIsFetchingIdentity(true);
          setValue("email", emailFromUrl);
          const res = await api.get(`/members/${emailFromUrl}`);
          setMemberInfo(res.data);
        } catch (err) {
          toast.error("IDENTITY BREACH: PROFILE NOT RECOGNIZED");
        } finally {
          setIsFetchingIdentity(false);
        }
      };
      fetchIdentity();
    }
  }, [emailFromUrl, setValue]);

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
      toast.success("ACCESS GRANTED", { id: loginToast });
    } catch (error) {
      toast.error("INVALID ACCESS KEY", { id: loginToast });
    } finally {
      setIsSubmittingManual(false);
    }
  };

  if (authLoading || isFetchingIdentity) {
    return (
      <CenterLoader fullScreen containerClassName="bg-[#02040a]" />
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-0 md:p-10 font-mono overflow-hidden">
      <Suspense fallback={null}>
        <LoginUrlParamTracker setUrlEmail={setEmailFromUrl} />
      </Suspense>
      <Toaster position="top-right" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row bg-[#0a0f18]/90 backdrop-blur-2xl border border-white/10 overflow-hidden rounded-none md:rounded-3xl"
      >
        {/* LEFT PANEL */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-12">
          <div className="w-40 h-40 rounded-2xl border-2 border-red-600 p-2 relative">
            <div className="relative w-full h-full rounded-lg overflow-hidden grayscale">
              <Image src={memberInfo?.image || "/fallback-avatar.png"} fill className="object-cover" alt="Agent" priority />
            </div>
          </div>
          <div className="text-center mt-6">
            <h2 className="text-white text-3xl font-black uppercase italic">{memberInfo?.name || "Access Denied"}</h2>
            <p className="text-red-500 text-[11px] font-black mt-2">ID_REF: {memberInfo?.blitzId || "UNKNOWN"}</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 bg-black/40 p-12 border-l border-white/5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase">Identity</label>
              <input {...register("email")} type="email" readOnly={!!emailFromUrl} className="w-full bg-[#0d1117] border border-white/5 p-5 rounded-2xl text-white outline-none" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase">Access Key</label>
              <input {...register("password")} type="password" placeholder="••••••••" className="w-full bg-[#0d1117] border border-white/5 p-5 rounded-2xl text-white text-lg tracking-[0.5em] outline-none" />
            </div>
            <button type="submit" className="w-full bg-red-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em]">
              {isSubmittingManual ? "AUTHORIZING..." : "GRANT ACCESS"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;