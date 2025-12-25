"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaLinkedin,
  FaCloudUploadAlt,
  FaCircleNotch,
  FaCheckCircle,
  FaRocket,
  FaInfoCircle,
  FaShieldAlt,
  FaCrown,
  FaUserFriends,
} from "react-icons/fa";
import PremiumDropdown from "@/components/ui/premium-dropdown";
import Image from "next/image";
import Button from "@/components/ui/retro-btn";
import saveMemberToDB from "@/lib/savememberToDb";
import toast, { Toaster } from "react-hot-toast";

const AddMemberPage = () => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      roll: "",
      dept: "Powertrain",
      position: "Member",
      image: "",
      linkedin: "",
    },
  });

  const formData = watch();
  const [uploading, setUploading] = useState(false);

  const departments = [
    "Powertrain",
    "Chassis",
    "Aerodynamics",
    "Documentation",
    "Management",
    "Media",
    "Non-Technical",
  ];

  const roles = ["Member", "Lead", "Sub-Lead", "Advisor"];

  const sectionTitle =
    "flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-6";
  const inputBase =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50";

  const onSubmit = async (data) => {
    // Basic check for image since it's not a standard input
    if (!data.image) {
      toast.error("Please upload a profile photo.");
      return;
    }

    try {
      console.log("🚀 Member Deployment Data:", data);
      await saveMemberToDB(data);
      toast.success(`${data.name} deployed to ${data.dept}!`);
      reset();
    } catch (error) {
      toast.error("Deployment failed. Check console.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: uploadData }
      );
      const data = await response.json();
      if (data.secure_url) setValue("image", data.secure_url);
    } catch (error) {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto py-8 md:py-16 px-4 sm:px-6">
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
          <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
            
            {/* --- SECTION 1: IDENTITY --- */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Identity Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className={`${inputBase} ${errors.name ? 'border-red-500 ring-4 ring-red-50' : ''}`}
                    placeholder="Tahimd Auhin"
                  />
                  {errors.name && <p className="text-red-500 text-[9px] font-bold uppercase tracking-tighter ml-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Student ID</label>
                  <input
                    {...register("roll", { required: "Student ID is required" })}
                    className={`${inputBase} ${errors.roll ? 'border-red-500 ring-4 ring-red-50' : ''}`}
                    placeholder="ID Number"
                  />
                  {errors.roll && <p className="text-red-500 text-[9px] font-bold uppercase tracking-tighter ml-1">{errors.roll.message}</p>}
                </div>
              </div>
            </section>

            {/* --- SECTION 2: RANK & DEPT --- */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Affiliation & Rank
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Assigned Team</label>
                  <PremiumDropdown
                    options={departments}
                    selected={formData.dept}
                    onSelect={(val) => setValue("dept", val)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Command Level (Position)</label>
                  <PremiumDropdown
                    options={roles}
                    selected={formData.position}
                    onSelect={(val) => setValue("position", val)}
                  />
                </div>
              </div>
              <div className="mt-6 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">LinkedIn Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[9px]">IN/</span>
                  <input
                    {...register("linkedin", { required: "LinkedIn handle is required" })}
                    className={`${inputBase} pl-10 ${errors.linkedin ? 'border-red-500 ring-4 ring-red-50' : ''}`}
                    placeholder="username"
                  />
                </div>
                {errors.linkedin && <p className="text-red-500 text-[9px] font-bold uppercase tracking-tighter ml-1">{errors.linkedin.message}</p>}
              </div>
            </section>

            {/* --- SECTION 3: MEDIA --- */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Profile Media
              </div>
              <div
                className={`relative h-32 md:h-48 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer ${
                  formData.image ? "border-red-500 bg-red-50/10" : errors.image ? "border-red-400 bg-red-50/5" : "border-slate-200 bg-slate-50"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center px-4 text-center w-full h-full justify-center">
                  {uploading ? <FaCircleNotch className="animate-spin text-red-500 mb-2" size={20} /> : 
                   formData.image ? <FaCheckCircle className="text-red-500 mb-2" size={24} /> : 
                   <FaCloudUploadAlt className={`${errors.image ? 'text-red-400' : 'text-slate-300'} mb-2`} size={32} />}
                  <span className={`text-[10px] font-black uppercase tracking-widest ${errors.image ? 'text-red-500' : 'text-slate-500'}`}>
                    {uploading ? "Uploading to Cloud..." : formData.image ? "Change Photo" : "Upload Photo"}
                  </span>
                </label>
              </div>
              {/* Hidden input to help react-hook-form track the image requirement */}
              <input type="hidden" {...register("image", { required: "Profile photo is required" })} />
              {errors.image && <p className="text-red-500 text-[9px] font-bold uppercase tracking-tighter mt-2 ml-1 text-center">{errors.image.message}</p>}
            </section>
          </div>

          {/* --- SIDEBAR: LIVE CARD PREVIEW --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6 order-1 lg:order-2">
            <div className="w-full flex justify-center lg:block overflow-hidden">
              <div className="w-full max-w-100 sm:max-w-none transform scale-[0.85] xs:scale-90 sm:scale-100 origin-top">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-1.5 shadow-xl">
                  <div className="bg-slate-900 rounded-[1.8rem] p-5 md:p-8 text-white relative overflow-hidden aspect-[1.6/1] flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-40">MIST Blitz</span>
                      <div className="flex gap-2">
                        {formData.linkedin && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-[#0077b5]/20 rounded-full border border-[#0077b5]/30 text-[8px] font-black uppercase text-[#71c9f8]">
                            <FaLinkedin /> Linked
                          </div>
                        )}
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[8px] font-black uppercase ${formData.position === "Lead" ? "bg-amber-500/20 border-amber-500/40 text-amber-500" : "bg-slate-700/50 border-slate-600 text-slate-400"}`}>
                          {formData.position === "Lead" ? <FaCrown /> : <FaUserFriends />} {formData.position}
                        </div>
                        <div className="px-2 py-0.5 bg-red-500/10 rounded-full border border-red-500/30 text-[8px] font-black uppercase text-red-500">Verified</div>
                      </div>
                    </div>
                    <div className="relative z-10 flex gap-4 md:gap-6 items-center">
                      <div className="relative h-20 w-20 md:h-28 md:w-28 shrink-0 rounded-2xl border-2 border-white/10 overflow-hidden bg-slate-800">
                        {formData.image ? <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized /> : 
                         <div className="flex items-center justify-center h-full opacity-10"><FaUser size={30} /></div>}
                        {formData.position === "Lead" && <div className="absolute top-1 right-1 bg-amber-500 text-slate-900 p-1 rounded-lg"><FaCrown size={10} /></div>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Card Holder</p>
                        <h4 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter leading-none text-white truncate">{formData.name || "New Member"}</h4>
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

            <Button
              type="submit"
              disabled={uploading}
              className="w-full py-4 rounded bg-red-600 text-white active:scale-95 transition-transform disabled:opacity-50"
            >
              <span className="uppercase tracking-widest italic text-sm">
                {uploading ? "Uploading..." : "Deploy Member"}
              </span>
            </Button>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
              <FaInfoCircle className="text-slate-300 shrink-0 text-sm" />
              <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                Designated <span className="text-red-600 font-bold">Leads</span> will have elevated visibility and authority within the Blitz Member ecosystem.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;