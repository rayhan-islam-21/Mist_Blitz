"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaIdCard,
  FaLinkedin,
  FaCloudUploadAlt,
  FaCircleNotch,
  FaCheckCircle,
  FaRocket,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";
import PremiumDropdown from "@/components/ui/premium-dropdown";
import Image from "next/image";
import Button from "@/components/ui/retro-btn";

const AddMemberPage = () => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      roll: "",
      dept: "Powertrain",
      image: "",
      linkedin: "",
    },
  });

  const formData = watch();
  const [uploading, setUploading] = useState(false);

  const departments = [
    "Powertrain", "Chassis", "Aerodynamics", "Documentation", "Management", "Media", "Non-Technical",
  ];

  // SECTION STYLES - Made responsive
  const sectionTitle = "flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-6";
  const inputBase = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50";

  const onSubmit = (data) => {
    console.log("🚀 Member Deployment Data:", data);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      setValue("image", imageUrl);
      setUploading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      {/* Container: Changed max-width and reduced padding for mobile */}
      <div className="max-w-6xl mx-auto py-8 md:py-16 px-4 sm:px-6">
        
        {/* Header Block: Responsive alignment and font size */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic leading-none">
              Member <span className="text-red-600">Onboarding</span>
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2">
              <FaShieldAlt className="text-red-500/50" /> Secure Admin Database
            </p>
          </div>
          <div className="text-left md:text-right border-l md:border-l-0 md:pl-0 pl-4 border-slate-200">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">System Version</p>
            <p className="text-[10px] font-bold text-slate-900">BLITZ-ADMIN v4.0.2</p>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Form Fields (Stack first on mobile) */}
          <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
            
            {/* Identity Details */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Identity Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
                  <input {...register("name", { required: true })} className={inputBase} placeholder="Tahimd Auhin" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Student ID</label>
                  <input {...register("roll", { required: true })} className={inputBase} placeholder="ID Number" />
                </div>
              </div>
            </section>

            {/* Affiliation */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Affiliation & Social
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <PremiumDropdown options={departments} selected={formData.dept} onSelect={(val) => setValue("dept", val)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">LinkedIn Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[9px]">IN/</span>
                    <input {...register("linkedin")} className={`${inputBase} pl-10`} placeholder="username" />
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Media */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Profile Media
              </div>
              <div className={`relative h-32 md:h-48 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer ${formData.image ? "border-red-500 bg-red-50/10" : "border-slate-200 bg-slate-50"}`}>
                <input type="file" className="hidden" id="fileUpload" onChange={handleImageUpload} />
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center px-4 text-center">
                  {uploading ? <FaCircleNotch className="animate-spin text-red-500 mb-2" size={20} /> : 
                   formData.image ? <FaCheckCircle className="text-red-500 mb-2" size={24} /> : 
                   <FaCloudUploadAlt className="text-slate-300 mb-2" size={32} />}
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {uploading ? "Uploading..." : formData.image ? "Change Photo" : "Upload Photo"}
                  </span>
                </label>
              </div>
            </section>
          </div>

          {/* Right Side: Preview Card (Appears on top or sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6 order-1 lg:order-2">
            
            {/* CARD SCALER: Ensures card fits any screen width */}
            <div className="w-full flex justify-center lg:block overflow-hidden">
              <div className="w-full max-w-100 sm:max-w-none transform scale-[0.85] xs:scale-90 sm:scale-100 origin-top">
                
                {/* ID Card UI */}
                <div className="bg-white border border-slate-200 rounded-[2rem] p-1.5 shadow-xl">
                  <div className="bg-slate-900 rounded-[1.8rem] p-5 md:p-8 text-white relative overflow-hidden aspect-[1.6/1] flex flex-col justify-between">
                    
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-40">MIST Blitz</span>
                      <div className="flex gap-2">
                        {formData.linkedin && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-[#0077b5]/20 rounded-full border border-[#0077b5]/30 text-[8px] font-black uppercase text-[#71c9f8]">
                            <FaLinkedin /> Linked
                          </div>
                        )}
                        <div className="px-2 py-0.5 bg-red-500/10 rounded-full border border-red-500/30 text-[8px] font-black uppercase text-red-500">Verified</div>
                      </div>
                    </div>

                    <div className="relative z-10 flex gap-4 md:gap-6 items-center">
                      <div className="relative h-20 w-20 md:h-28 md:w-28 shrink-0 rounded-2xl border-2 border-white/10 overflow-hidden bg-slate-800">
                        {formData.image ? (
                          <Image src={formData.image} alt="Preview" fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full opacity-10"><FaUser size={30} /></div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Card Holder</p>
                        <h4 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter leading-none text-white truncate">
                          {formData.name || "New Member"}
                        </h4>
                        <div className="mt-3">
                          <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Department</p>
                          <p className="text-xs font-bold text-red-500 uppercase truncate">{formData.dept}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex justify-between items-end">
                      <div>
                        <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">ID Number</p>
                        <p className="text-sm md:text-lg font-mono font-bold tracking-widest text-slate-300">{formData.roll || "00000000"}</p>
                      </div>
                      <FaRocket size={30} className="opacity-20 text-red-500" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <Button  type="submit" className="w-full py-4 rounded-2xl bg-red-600 text-white shadow-lg active:scale-95 transition-transform">
              <span className=" uppercase tracking-widest italic text-sm">Deploy Member</span>
            </Button>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
              <FaInfoCircle className="text-slate-300 shrink-0 text-sm" />
              <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                Verified LinkedIn profiles will display a blue badge upon deployment to the Blitz ecosystem.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;