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
    <div className="fixed top-0 left-0 right-0 z-200 h-11 bg-red-600 flex items-center justify-center">
      {/* Content */}
      <div className="flex items-center gap-3 px-10">
        <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse shrink-0" />
        <p className="text-white text-xs font-semibold tracking-wide">{notice.message}</p>
        {notice.link && (
          <Link
            href={notice.link}
            className="shrink-0 inline-flex items-center gap-1 bg-white text-red-600 text-[11px] font-black uppercase tracking-widest px-3 py-1 hover:bg-red-50 transition-colors whitespace-nowrap"
          >
            {notice.linkText || "Learn more"} ›
          </Link>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1.5"
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>
    </div>
  );
}
