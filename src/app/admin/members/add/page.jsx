"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
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
import saveMemberToDB from "@/lib/savememberToDb";
import toast, { Toaster } from "react-hot-toast";

const AddMemberPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      roll: "",
      techDept: [],
      nonTechDept: [],
      position: "Trainee",
      image: "",
      linkedin: "",
    },
  });

  const formData = watch();
  const [uploading, setUploading] = useState(false);

  const technicalTeams = [
    "Suspension, Steering and Braking",
    "Chassis and Aerodynamics",
    "Powertrain",
    "Electronics",
  ];

  const nonTechnicalTeams = [
    "Management",
    "Finance",
    "Logistics",
    "Documentation",
    "Business Plan Presentation",
    "Media",
  ];

  const commandLevels = [
    "Senior Engineer",
    "Junior Engineer",
    "Apprentice Engineer",
    "Trainee",
    "Member",
    "Lead",
    "Sub-Lead",
    "Advisor",
  ];

  const handleMultiSelect = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setValue(field, updatedValues);
  };

  const sectionTitle =
    "flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-6";
  const inputBase =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50";
  const onSubmit = async (data) => {
    // Validate required fields
    if (!data.image) {
      toast.error("Please upload a profile photo.");
      return;
    }
    if (!data.techDept || data.techDept.length === 0) {
      toast.error("Please select at least one Technical Team.");
      return;
    }
    if (!data.nonTechDept || data.nonTechDept.length === 0) {
      toast.error("Please select at least one Non-Technical Team.");
      return;
    }

    try {
      console.log("Submitting data:", data);
      await saveMemberToDB(data);
      toast.success(`${data.name} deployed successfully!`);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Deployment failed. Check console for details.");
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
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              System Version
            </p>
            <p className="text-[10px] font-bold text-slate-900">
              BLITZ-ADMIN PANEL
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Form Content */}
          <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
            {/* Identity section remains same... */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Identity Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className={`${inputBase} ${
                      errors.name ? "border-red-500 ring-4 ring-red-50" : ""
                    }`}
                    placeholder="Tahimd Auhin"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Student ID
                  </label>
                  <input
                    {...register("roll", {
                      required: "Student ID is required",
                    })}
                    className={`${inputBase} ${
                      errors.roll ? "border-red-500 ring-4 ring-red-50" : ""
                    }`}
                    placeholder="ID Number"
                  />
                </div>
              </div>
            </section>

            {/* Other sections remain same... */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Team Assignment
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Technical Team (Multi)
                  </label>
                  <PremiumDropdown
                    options={technicalTeams}
                    selected={formData.techDept}
                    onSelect={(val) => handleMultiSelect("techDept", val)}
                    multi={true}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Non-Technical Team (Multi)
                  </label>
                  <PremiumDropdown
                    options={nonTechnicalTeams}
                    selected={formData.nonTechDept}
                    onSelect={(val) => handleMultiSelect("nonTechDept", val)}
                    multi={true}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                  Position / Command Level
                </label>
                <PremiumDropdown
                  options={commandLevels}
                  selected={formData.position}
                  onSelect={(val) => setValue("position", val)}
                />
              </div>

              <div className="mt-6 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                  LinkedIn Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[9px]">
                    IN/
                  </span>
                  <input
                    {...register("linkedin")}
                    className={`${inputBase} pl-10
                    }`}
                    placeholder="username"
                  />
                </div>
              </div>
            </section>

            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Profile Media
              </div>
              <div
                className={`relative h-32 md:h-48 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer ${
                  formData.image
                    ? "border-red-500 bg-red-50/10"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex flex-col items-center px-4 text-center w-full h-full justify-center"
                >
                  {uploading ? (
                    <FaCircleNotch
                      className="animate-spin text-red-500 mb-2"
                      size={20}
                    />
                  ) : formData.image ? (
                    <FaCheckCircle className="text-red-500 mb-2" size={24} />
                  ) : (
                    <FaCloudUploadAlt
                      className="text-slate-300 mb-2"
                      size={32}
                    />
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {uploading
                      ? "Uploading..."
                      : formData.image
                      ? "Change Photo"
                      : "Upload Photo"}
                  </span>
                </label>
              </div>
              <input
                type="hidden"
                {...register("image", {
                  required: "Profile photo is required",
                })}
              />
            </section>
          </div>

          {/* Sidebar Preview - FIXED FOR MOBILE VISIBILITY */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6 order-1 lg:order-2 flex flex-col items-center">
            <div className="w-full flex justify-center">
              <div className="w-full max-w-108 bg-amber-400 rounded-2xl transform scale-[0.85] xs:scale-95 sm:scale-100 origin-top">
                <div className="bg-white rounded-2xl p-1 shadow-xl">
                  {/* Changed p-5 md:p-8 to p-4 md:p-8 and reduced spacing to fit mobile */}
                  <div className="bg-slate-900 rounded-2xl p-4 md:p-8 text-white relative overflow-hidden aspect-[1.58/1] flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                    <div className="relative z-10 flex justify-between items-start gap-2">
                      <span className="text-[7px] md:text-[8px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-40 shrink-0">
                        MIST Blitz
                      </span>
                      <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                        {formData.linkedin && (
                          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#0077b5]/20 rounded-full border border-[#0077b5]/30 text-[7px] font-black uppercase text-[#71c9f8]">
                            <FaLinkedin className="hidden xs:block" /> LINKED
                          </div>
                        )}
                        <div
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[7px] font-black uppercase ${
                            formData.position === "Lead"
                              ? "bg-amber-500/20 border-amber-500/40 text-amber-500"
                              : "bg-slate-700/50 border-slate-600 text-slate-400"
                          }`}
                        >
                          {formData.position}
                        </div>
                        <div className="px-1.5 py-0.5 bg-red-500/10 rounded-full border border-red-500/30 text-[7px] font-black uppercase text-red-500">
                          VERIFIED
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex gap-10 md:gap-6 items-center">
                      <div className="relative h-28 w-28 xs:h-28 xs:w-28 md:h-32 md:w-32 shrink-0 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden bg-slate-800">
                        {formData.image ? (
                          <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full opacity-10">
                            <FaUser size={24} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[6px] md:text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
                          Card Holder
                        </p>
                        <h4 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter text-white truncate leading-none">
                          {formData.name || "New Member"}
                        </h4>
                        <div className="mt-2 md:mt-3">
                          <p className="text-[6px] md:text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
                            Assigned Teams
                          </p>
                          <p className="text-[8px] md:text-[10px] font-bold text-red-500 uppercase truncate leading-tight">
                            {[
                              ...formData.techDept,
                              ...formData.nonTechDept,
                            ].join(" • ") || "No Teams Selected"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex justify-between items-end">
                      <div>
                        <p className="text-[6px] md:text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
                          ID Number
                        </p>
                        <p className="text-xs md:text-lg font-mono font-bold tracking-widest text-slate-300 leading-none">
                          {formData.roll || "00000000"}
                        </p>
                      </div>
                      <FaRocket className="opacity-20 text-red-500 w-5 h-5 md:w-8 md:h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={uploading}
              className="w-full py-4 rounded bg-red-600 text-white active:scale-95 transition-transform"
            >
              <span className="uppercase tracking-widest italic text-sm">
                {uploading ? "Uploading..." : "Deploy Member"}
              </span>
            </Button>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3 w-full">
              <FaInfoCircle className="text-slate-300 shrink-0 text-sm" />
              <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                Designated <span className="text-red-600 font-bold">Leads</span>{" "}
                will have elevated visibility and authority.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;
