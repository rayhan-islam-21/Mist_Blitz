"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FaBoxOpen,
  FaCircleNotch,
  FaInfoCircle,
  FaBarcode,
  FaWarehouse,
  FaCartPlus,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import PremiumDropdown from "@/components/ui/premium-dropdown";
import Button from "@/components/ui/retro-btn";
import Image from "next/image";

const AddEquipmentPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const generateBash = () =>
    `BZ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      ownerType: "Blitz Official Inventory",
      memberName: "",
      quantity: 1,
      category: "Electronics",
      bash: generateBash(),
      image: null,
    },
  });

  const formData = watch();

  const categories = [
    "Electronics",
    "Mechanical",
    "Optics",
    "Tools",
    "Safety Gear",
  ];
  const ownerTypes = ["Blitz Official Inventory", "Private Member Owned"];

  const sectionTitle =
    "flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-6";
  const inputBase =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50";

const handleImageChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image must be under 5MB");
    return;
  }

  setValue("image", file);

  const reader = new FileReader();
  reader.onloadend = () => setImagePreview(reader.result);
  reader.readAsDataURL(file);
};


  /* ---------- submit ---------- */
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", data.name);
      payload.append("category", data.category);
      payload.append("quantity", data.quantity);
      payload.append(
        "owner",
        data.ownerType === "Blitz Official Inventory"
          ? "Blitz"
          : data.memberName
      );
      payload.append("bash", data.bash);
      if (data.image) payload.append("image", data.image);

      console.log("SUBMIT DATA:", Object.fromEntries(payload));

      toast.success("Asset added successfully");

      reset({
        name: "",
        ownerType: "Blitz Official Inventory",
        memberName: "",
        quantity: 1,
        category: "Electronics",
        bash: generateBash(),
        image: null,
      });
      setImagePreview(null);
    } catch (err) {
      toast.error("Failed to add asset");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  text-slate-900 font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto py-8 md:py-16 px-4 sm:px-6">
        {/* Header */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic leading-none">
              Asset <span className="text-red-600">Acquisition</span>
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2">
              <FaCartPlus className="text-red-500/50" /> Blitz Inventory Command
            </p>
          </div>
          <div className="text-left md:text-right border-l md:border-l-0 md:pl-0 pl-4 border-slate-200">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              Inventory Module
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
          <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
            {/* Hardware Specifications */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Hardware Specifications
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Equipment Name
                  </label>
                  <input
                    {...register("name", {
                      required: "Product name is required",
                    })}
                    className={`${inputBase} ${
                      errors.name ? "border-red-500 ring-4 ring-red-50" : ""
                    }`}
                    placeholder="e.g. Latop"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Asset Category
                    </label>
                    <PremiumDropdown
                      options={categories}
                      selected={formData.category}
                      onSelect={(val) => setValue("category", val)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Quantity (Units)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      {...register("quantity", {
                        required: true,
                        min: { value: 1, message: "Min 1" },
                      })}
                      className={inputBase}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Custody */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Custody Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Owner Type
                  </label>
                  <PremiumDropdown
                    options={ownerTypes}
                    selected={formData.ownerType}
                    onSelect={(val) => setValue("ownerType", val)}
                  />
                </div>
                {formData.ownerType === "Private Member Owned" && (
                  <div className="space-y-1.5 animate-in slide-in-from-left-2 duration-200">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Custodian Name
                    </label>
                    <input
                      {...register("memberName", { required: "Required" })}
                      className={inputBase}
                      placeholder="Enter Member Name"
                    />
                  </div>
                )}
              </div>
            </section>
            {/* Image Upload Section */}
            <section>
              <div className={sectionTitle}>
                <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full" />
                Visual Documentation
              </div>
              <div
                onClick={() => fileInputRef.current.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-8 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                  ${
                    imagePreview
                      ? "border-red-500 bg-red-50/30"
                      : "border-slate-200 hover:border-red-400 hover:bg-slate-50"
                  }`}
              >
                <input
                  type="file"
                  {...register("image")}
                  
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />

                {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-bold uppercase text-xs tracking-widest">
                        Change Image
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-xl"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <FaCamera className="text-slate-400 group-hover:text-red-500 text-2xl" />
                    </div>
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-tight">
                      Drop asset photo here
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase mt-1 font-medium tracking-widest">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6 order-1 lg:order-2 flex flex-col items-center">
            <div className="w-full flex justify-center">
              <div className="w-full max-w-108 bg-amber-400 rounded-2xl transform scale-[0.85] xs:scale-95 sm:scale-100 origin-top shadow-2xl transition-transform duration-500 ">
                <div className="bg-white rounded-2xl p-1">
                  <div className="bg-slate-900 rounded-2xl p-4 md:p-8 text-white relative overflow-hidden aspect-[1.58/1] flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                    <div className="relative z-10 flex justify-between items-start">
                      <span className="text-[7px] md:text-[8px] font-black tracking-[0.3em] uppercase opacity-40">
                        BLITZ ASSET TAG
                      </span>
                      <div className="px-1.5 py-0.5 bg-red-500/10 rounded-full border border-red-500/30 text-[7px] font-black uppercase text-red-500">
                        {formData.category}
                      </div>
                    </div>

                    <div className="relative z-10 flex gap-6 items-center">
                      <div className="relative h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-xl border border-white/10 flex items-center justify-center bg-slate-800 shadow-inner overflow-hidden">
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            fill
                            className="w-full h-full object-cover"
                            alt="Thumb"
                          />
                        ) : (
                          <FaBoxOpen className="text-slate-600 text-3xl" />
                        )}
                        <div className="absolute w-6 h-6 -bottom-0.5 -right-0.5 flex justify-center items-center bg-amber-400 text-slate-900 rounded-full text-[10px] font-black">
                          x{formData.quantity || 1}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[6px] md:text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
                          Nomenclature
                        </p>
                        <h4 className="text-lg md:text-xl font-black uppercase italic tracking-tighter text-white truncate leading-none">
                          {formData.name || "Awaiting Data..."}
                        </h4>
                        <div className="mt-3">
                          <p className="text-[6px] md:text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
                            Custodian
                          </p>
                          <p className="text-[9px] md:text-[11px] font-bold text-red-500 uppercase truncate">
                            {formData.ownerType === "Blitz Official Inventory"
                              ? "OFFICIAL: MIST BLITZ"
                              : formData.memberName || "No Custodian"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex justify-between items-end">
                      <div>
                        <p className="text-[6px] md:text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
                          System Hash
                        </p>
                        <p className="text-[10px] md:text-sm font-mono font-bold tracking-widest text-slate-300 leading-none uppercase">
                         {formData.bash}

                        </p>
                      </div>
                      <FaBarcode className="opacity-20 text-white w-8 h-8 md:w-12 md:h-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded bg-red-500 text-white active:scale-95 transition-all shadow-xl shadow-red-100 hover:bg-red-600 disabled:bg-slate-200"
            >
              <div className="flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <FaCircleNotch className="animate-spin" />
                ) : (
                  <>
                    <FaWarehouse className="text-sm" />
                    <span className="uppercase tracking-[0.2em] font-black italic text-sm">
                      Deploy to Database
                    </span>
                  </>
                )}
              </div>
            </Button>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3 w-full">
              <FaInfoCircle className="text-slate-300 shrink-0 text-sm" />
              <p className="text-[10px] leading-relaxed text-slate-500 font-medium italic uppercase tracking-tighter">
                Syncing this asset will make it visible to all authorized Blitz
                commanders.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentPage;
