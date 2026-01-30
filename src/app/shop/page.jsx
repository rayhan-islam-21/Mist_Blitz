"use client";

import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function SimpleComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter an email.");
    toast.success("You're on the list!");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <Toaster position="top-center" />

      <div className="max-w-md w-full text-center space-y-8">
        {/* Simple Branding */}
        <h1 className="text-4xl italic font-bold tracking-tighter uppercase">
          MIST<span className="text-red-600">{" "}BLITZ</span>
        </h1>

        <div className="space-y-2">
          <h2 className="text-xl font-medium">Coming Soon</h2>
          <p className="text-gray-400 text-sm">
            Our online store is currently under construction. 
            Join the mailing list for the launch notification.
          </p>
        </div>

        {/* Minimal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded text-sm outline-none focus:border-red-600 transition-colors"
          />
          <button
            type="submit"
            className="bg-white text-black font-bold py-3 rounded text-sm hover:bg-red-600 hover:text-white transition-colors uppercase tracking-widest"
          >
            Notify Me
          </button>
        </form>

        {/* Footer */}
        <div className="pt-8 border-t border-zinc-900">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
            © 2026 Mist Blitz Shop
          </p>
        </div>
      </div>
    </div>
  );
}