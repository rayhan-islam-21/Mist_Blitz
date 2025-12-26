"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FaBoxOpen, 
  FaBarcode, 
  FaUserShield, 
  FaLayerGroup, 
  FaPlus, 
  FaCircleNotch, 
  FaMicrochip,
  FaShieldAlt
} from 'react-icons/fa';

export default function AddEquipmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      ownerType: 'Blitz',
      memberName: '',
      quantity: 1
    }
  });

  const formData = watch();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const payload = {
      name: data.name,
      owner: data.ownerType === 'Member' ? data.memberName : 'Blitz',
      quantity: parseInt(data.quantity, 10)
    };

    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1500));
      const response = await fetch('/api/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'ASSET REGISTERED SUCCESSFULLY' });
        reset();
      } else { throw new Error(); }
    } catch (e) {
      setStatus({ type: 'error', message: 'SYSTEM ERROR: FAILED TO DEPLOY ASSET' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionLabel = "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4";
  const inputStyle = "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-bold text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none";

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans p-4 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-xs tracking-widest uppercase">
              <FaShieldAlt /> Inventory Control v4.0
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-slate-900">
              Asset <span className="text-blue-600">Acquisition</span>
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-[10px] text-slate-400">
            LOG_ID: {Math.random().toString(36).substring(7).toUpperCase()}<br />
            STATUS: <span className="text-green-500 font-bold underline">READY_FOR_ENTRY</span>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Success/Error Toast Simulation */}
            {status.message && (
              <div className={`p-4 rounded-lg font-mono text-xs font-bold border animate-pulse ${
                status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {status.type === 'success' ? '>>> ' : '!!! '} {status.message}
              </div>
            )}

            {/* General Specs */}
            <section>
              <h3 className={sectionLabel}><FaBoxOpen /> Equipment Specifications</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 mb-1 block tracking-wider">Hardware Nomenclature</label>
                  <input 
                    {...register("name", { required: "Name required" })}
                    placeholder="e.g. LI-PO BATTERY 5000MAH"
                    className={`${inputStyle} ${errors.name ? 'border-red-500 ring-red-50' : ''}`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 mb-1 block">Units (QTY)</label>
                    <input 
                      type="number"
                      {...register("quantity", { min: 1 })}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 mb-1 block">Ownership Source</label>
                    <select {...register("ownerType")} className={inputStyle}>
                      <option value="Blitz">Blitz Official</option>
                      <option value="Member">Private Member</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Ownership - Conditional */}
            {formData.ownerType === 'Member' && (
              <section className="animate-in slide-in-from-left-4 duration-300">
                <h3 className={sectionLabel}><FaUserShield /> Custodian Identity</h3>
                <div className="relative">
                  <input 
                    {...register("memberName", { required: true })}
                    placeholder="Enter full legal name"
                    className={inputStyle}
                  />
                </div>
              </section>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group bg-slate-900 text-white py-5 rounded-xl font-black uppercase italic tracking-[0.3em] text-sm hover:bg-blue-600 active:scale-95 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <FaCircleNotch className="animate-spin text-lg" />
              ) : (
                <>Deploy to Inventory <FaPlus className="group-hover:rotate-90 transition-transform" /></>
              )}
            </button>
          </div>

          {/* Right Column: Technical Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-start">
            <div className="w-full max-w-sm sticky top-12">
               <div className={sectionLabel}><FaBarcode /> Asset Label Preview</div>
               
               {/* The Card */}
               <div className="bg-white border-2 border-slate-900 rounded-sm p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                 <div className="bg-slate-900 p-6 text-white min-h-[240px] flex flex-col justify-between relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    <div className="flex justify-between items-start z-10">
                      <div className="bg-blue-600 text-[8px] font-black px-2 py-1 uppercase tracking-tighter">
                        Blitz Internal
                      </div>
                      <FaMicrochip className="text-2xl text-slate-700" />
                    </div>

                    <div className="z-10 mt-6">
                      <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest">Description</p>
                      <h2 className="text-xl font-black uppercase italic leading-tight truncate">
                        {formData.name || "UNNAMED ASSET"}
                      </h2>
                    </div>

                    <div className="z-10 grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800">
                      <div>
                        <p className="text-[7px] font-mono text-slate-500 uppercase">Custodian</p>
                        <p className="text-[10px] font-bold uppercase truncate">
                          {formData.ownerType === 'Blitz' ? 'HQ: BLITZ' : (formData.memberName || '---')}
                        </p>
                      </div>
                      <div>
                        <p className="text-[7px] font-mono text-slate-500 uppercase">Quantity</p>
                        <p className="text-[10px] font-bold uppercase">UNIT_COUNT: {formData.quantity}</p>
                      </div>
                    </div>
                 </div>
               </div>
               
               <div className="mt-6 flex gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 italic">
                  <FaLayerGroup className="text-blue-600 shrink-0 mt-1" />
                  <p className="text-[10px] leading-relaxed text-slate-600 font-medium">
                    New assets are automatically assigned a unique <span className="font-bold">UID Hash</span> and synced with the main Blitz database upon deployment.
                  </p>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}