"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function Footer() {
  const router = useRouter();

  // Logic States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberCode, setMemberCode] = useState("");
  const [status, setStatus] = useState("idle");

  const quickLinks = [
    "About",
    "Car",
    "Events",
    "Sponsors",
    "Gallery",
    "News",
    "Contact",
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", bg: "bg-blue-500" },
    { icon: Twitter, label: "Twitter", bg: "bg-cyan-500" },
    { icon: Instagram, label: "Instagram", bg: "bg-pink-500" },
    { icon: Youtube, label: "YouTube", bg: "bg-red-600" },
    { icon: Linkedin, label: "LinkedIn", bg: "bg-purple-600" },
  ];

  const handleVerify = async (e) => {
    e.preventDefault();
    const input = memberCode.trim();
    if (!input) return;

    setStatus("loading");

    try {
      const res = await api.get(`/members/${input}`);
      const member = res.data;
      try {
        const userCheck = await api.get(`/admin/${member.email}`);
        if (userCheck.data) {
          toast.success("Identity recognized! Redirecting to Login...");
          router.push(`/auth/login?email=${member.email}`);
        }
      } catch (err) {
        toast.success("Identity Verified. Initialize your account.");
        // Change 'id' to 'blitzId' to match MemberRegister.js
        router.push(`/auth/register?blitzId=${member.blitzId}`);
      }
    } catch (err) {
      setStatus("error");
      toast.error("IDENTITY BREACH: Record not found in Blitz Database.");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <footer
      id="contact"
      className="relative bg-black border-t-2 border-slate-900 text-white overflow-hidden"
    >
      <Toaster />
      {/* Comic rays */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px bg-white"
              style={{ left: `${i * 5}%` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/hero.png"
                alt="logo"
                width={200}
                height={200}
                className="-ml-9"
              />
              <div className="mt-2 inline-block bg-yellow-300 border-3 border-white px-3 py-1 -rotate-2 shadow-[3px_3px_0px_white]">
                <span className="text-sm uppercase text-black tracking-wider">
                  Formula Student
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Engineering excellence on the racetrack. Join us in pushing the
              boundaries of innovation!
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 bg-red-500 border-2 border-white flex items-center justify-center transition-all hover:scale-110"
                  style={{ boxShadow: "3px 3px 0px white" }}
                >
                  <Mail size={16} />
                </div>
                info@mistblitz.com
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 bg-yellow-400 border-2 transition-all hover:scale-110 border-white flex items-center justify-center"
                  style={{ boxShadow: "3px 3px 0px white" }}
                >
                  <Phone size={16} />
                </div>
                +880 XXXXXXXX
              </div>
              <div className="flex items-center gap-3">
                <div
                  style={{ boxShadow: "3px 3px 0px white" }}
                  className="w-8 transition-all hover:scale-110 h-8 bg-blue-500 border-2 border-white flex items-center justify-center"
                >
                  <MapPin size={16} />
                </div>
                MIST Campus, Dhaka
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl mb-6 text-red-500">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="inline-block text-gray-300 hover:text-yellow-400 uppercase text-sm tracking-wider transition-all hover:translate-x-2"
                  >
                    → {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming */}
          <div>
            <h4 className="text-2xl mb-6 text-yellow-400">Upcoming</h4>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-400">Jan 15, 2025</p>
                Team Recruitment
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-gray-400">Mar 20, 2025</p>
                Car Launch Event
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="text-gray-400">Jun 10, 2025</p>
                Formula Student UK
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-2xl mb-6 text-blue-500">Follow Us</h4>
            <p className="text-gray-300 mb-6 text-sm">
              Stay connected for the latest updates, photos, and race results!
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, label, bg }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`group w-12 h-12 border-4 border-white flex items-center justify-center transition-all hover:scale-110 ${bg}`}
                  style={{ boxShadow: "3px 3px 0px white" }}
                >
                  <Icon
                    size={24}
                    strokeWidth={2.5}
                    className="group-hover:scale-125 transition-transform"
                  />
                </a>
              ))}
            </div>

            {/* UI IDENTICAL BUTTON WITH NEW LOGIC */}
            <div className="mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block bg-white text-black border-3 border-yellow-400 px-4 py-2 transform rotate-4 shadow-[4px_4px_0px_yellow] hover:rotate-0 transition-transform active:translate-y-1 active:shadow-none"
              >
                <span className="uppercase text-sm tracking-wider">
                  Member of Blitz?
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-4 border-white my-8"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <span>© 2024 MIST Blitz Formula Student Team</span>
          <div className="flex gap-3 mt-2 md:mt-0">
            <span className="px-3 py-1 bg-blue-500 border-2 border-white -rotate-2 text-xs uppercase tracking-wider text-white">
              Fast
            </span>
            <span className="px-3 py-1 bg-yellow-400 border-2 border-black text-black text-xs uppercase tracking-wider">
              Fierce
            </span>
            <span className="px-3 py-1 bg-red-500 border-2 border-white rotate-2 text-xs uppercase tracking-wider text-white">
              Fearless
            </span>
          </div>
        </div>
      </div>

      {/* VERIFICATION MODAL - Styled to match your Comic/FDS UI */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            {/* Overlay with a heavier blur for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 2 }}
              className="relative w-full max-w-sm bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_#ef4444]"
            >
              {/* Halftone texture overlay (optional CSS pattern) */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(black 1px, transparent 0)",
                  backgroundSize: "4px 4px",
                }}
              ></div>

              {/* Top Status Badge */}
              <div className="absolute -top-6 left-6 bg-black text-white px-4 py-1 -rotate-1 font-black uppercase text-[10px] tracking-[0.2em]">
                Status: Restricted Access
              </div>

              {/* Action Label */}
              <div className="absolute -top-4 -right-4 bg-yellow-300 border-4 border-black px-4 py-1 rotate-3 shadow-[4px_4px_0px_black] z-10">
                <span className="text-black font-sans font-black uppercase text-sm italic">
                  Member ID?
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-4xl font-sans font-black text-black italic leading-none uppercase tracking-tighter">
                  Blitz{" "}
                  <span className="text-red-600 underline decoration-[6px]">
                    Gate
                  </span>
                </h2>
                <p className="text-[10px] font-bold text-black/50 mt-2 uppercase tracking-widest">
                  Identify yourself to proceed
                </p>
              </div>

              <form onSubmit={handleVerify} className="relative space-y-4">
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    value={memberCode}
                    onChange={(e) => setMemberCode(e.target.value)}
                    placeholder="ENTER MEMBER ID"
                    className={`w-full border-4 border-black p-4 text-xl font-black focus:outline-none transition-all placeholder:text-black/10 uppercase
                ${
                  status === "error"
                    ? "bg-red-50 border-red-600 text-red-600"
                    : "bg-white text-black focus:bg-yellow-50 focus:shadow-[4px_4px_0px_black]"
                }
              `}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 font-black italic text-black">
                    #
                  </div>
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ x: -4 }}
                    animate={{ x: 4 }}
                    transition={{ repeat: 5, duration: 0.05 }}
                    className="bg-red-600 text-white border-2 border-black p-2 -rotate-1 shadow-[4px_4px_0px_black]"
                  >
                    <p className="text-[10px] font-black uppercase text-center italic tracking-wider">
                      Access Denied: Record Not Found
                    </p>
                  </motion.div>
                )}

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-black/40 text-[15px] font-black uppercase hover:text-red-600 transition-colors tracking-tighter"
                  >
                    [ Cancel ]
                  </button>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="relative group font-mono tracking-tighter bg-red-600 text-white border-4 border-black px-10 py-2 font-black uppercase italic shadow-[4px_4px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10">
                      {status === "loading" ? "SCANNING..." : "Authenticate"}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  </button>
                </div>
              </form>

              {/* Small detail element */}
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-600 border-2 border-black -rotate-12 shadow-[2px_2px_0px_black]"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Comic decorative element */}
      <div
        className="absolute bottom-4 right-4 w-20 h-20 bg-yellow-400 border-4 border-white opacity-20 transform rotate-45"
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
      ></div>
    </footer>
  );
}
