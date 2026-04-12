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

  const bgColor = notice.type === "success" ? "#16a34a" : notice.type === "warning" ? "#dc2626" : "#dc2626";

  return (
    <div
      className="fixed top-0 left-0 right-0 z-200 overflow-hidden flex items-center justify-center"
      style={{ height: "56px", backgroundColor: bgColor }}
    >
      {/* Decorative circles — left */}
      <div className="absolute left-0 top-0 h-full flex items-center pointer-events-none select-none">
        <div className="w-24 h-24 rounded-full opacity-20 bg-white -ml-8" />
        <div className="w-14 h-14 rounded-full opacity-10 bg-white -ml-4" />
        <div className="w-10 h-10 rounded-sm opacity-15 bg-white/30 ml-2 rotate-12" />
        <div className="w-16 h-16 rounded-full opacity-10 bg-white ml-1" />
      </div>

      {/* Decorative circles — right */}
      <div className="absolute right-0 top-0 h-full flex items-center pointer-events-none select-none">
        <div className="w-16 h-16 rounded-full opacity-10 bg-white -mr-1" />
        <div className="w-10 h-10 rounded-sm opacity-15 bg-white/30 mr-2 -rotate-12" />
        <div className="w-14 h-14 rounded-full opacity-10 bg-white mr-1" />
        <div className="w-24 h-24 rounded-full opacity-20 bg-white -mr-8" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4 px-10">
        <p className="text-white text-sm font-medium">{notice.message}</p>
        {notice.link && (
          <Link
            href={notice.link}
            className="shrink-0 inline-flex items-center gap-1.5 border border-white/50 hover:border-white text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors hover:bg-white/10 whitespace-nowrap"
          >
            {notice.linkText || "Learn more"}
            <span className="text-sm">›</span>
          </Link>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full z-20"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
