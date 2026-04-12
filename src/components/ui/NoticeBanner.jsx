"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function NoticeBanner() {
  const [notice, setNotice] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch("/api/notices");
        const data = await res.json();
        if (!data.notice) return;
        const dismissedId = localStorage.getItem("dismissedNotice");
        if (dismissedId === data.notice._id) return;
        setNotice(data.notice);
        setVisible(true);
      } catch { /* non-critical */ }
    };
    fetchNotice();
  }, []);

  useEffect(() => {
    if (visible) document.documentElement.setAttribute("data-notice", "true");
    else document.documentElement.removeAttribute("data-notice");
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem("dismissedNotice", notice._id);
    setVisible(false);
  };

  if (!visible || !notice) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-200 flex items-center justify-center overflow-hidden"
      style={{
        height: "48px",
        background: "linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 40%, #1a0a0a 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Left red accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-red-600" />

      {/* Right red accent */}
      <div className="absolute right-0 top-0 h-full w-1 bg-red-600" />

      {/* Glowing red orb left */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-red-600/20 blur-2xl pointer-events-none" />
      {/* Glowing red orb right */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-red-600/20 blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4 px-12">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
        <p className="text-white text-sm font-medium tracking-wide">{notice.message}</p>
        {notice.link && (
          <Link
            href={notice.link}
            className="shrink-0 inline-flex items-center gap-1 border border-red-500/60 hover:border-red-400 hover:bg-red-600/20 text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1 rounded-full transition-all whitespace-nowrap"
          >
            {notice.linkText || "Learn more"}
            <span>›</span>
          </Link>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors p-1.5 z-20"
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>
    </div>
  );
}
