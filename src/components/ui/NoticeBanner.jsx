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

  const isBg = notice.type === "warning" ? "bg-red-600" : "bg-[#111] border-b border-white/10";

  return (
    <div className={`fixed top-0 left-0 right-0 z-200 flex items-center justify-between gap-4 px-4 md:px-8 ${isBg}`} style={{ height: "36px" }}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse shrink-0" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 shrink-0 hidden sm:block">Notice</span>
        <p className="text-xs text-white/80 truncate">{notice.message}</p>
        {notice.link && (
          <Link href={notice.link} className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-white underline underline-offset-2 transition-colors whitespace-nowrap">
            {notice.linkText || "Learn More"} →
          </Link>
        )}
      </div>
      <button onClick={dismiss} className="shrink-0 text-white/30 hover:text-white transition-colors p-1" aria-label="Dismiss">
        <X size={12} />
      </button>
    </div>
  );
}
