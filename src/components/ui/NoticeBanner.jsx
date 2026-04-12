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

  const isBg = notice.type === "warning"
    ? "bg-red-600"
    : notice.type === "success"
    ? "bg-green-700"
    : "bg-slate-900";

  return (
    <div className={`fixed top-0 left-0 right-0 z-200 flex items-center justify-between gap-4 px-4 md:px-10 ${isBg}`} style={{ height: "44px" }}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
        <span className="font-mono text-[10px] font-black uppercase tracking-widest text-white/60 shrink-0 hidden sm:block border-r border-white/10 pr-3">Notice</span>
        <p className="text-xs font-semibold text-white truncate">{notice.message}</p>
        {notice.link && (
          <Link href={notice.link} className="shrink-0 font-mono text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 transition-colors whitespace-nowrap">
            {notice.linkText || "Learn More"} →
          </Link>
        )}
      </div>
      <button onClick={dismiss} className="shrink-0 text-white/40 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded" aria-label="Dismiss">
        <X size={13} />
      </button>
    </div>
  );
}
