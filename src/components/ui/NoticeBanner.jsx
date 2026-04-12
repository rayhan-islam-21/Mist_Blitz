"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

const TYPE_STYLES = {
  info:    "bg-[#111] border-white/10 text-white/80",
  success: "bg-[#0a1f0a] border-green-600/40 text-green-200",
  warning: "bg-[#1f0a0a] border-red-600/40 text-red-200",
};

const TYPE_ACCENT = {
  info:    "bg-white/20",
  success: "bg-green-500",
  warning: "bg-red-600",
};

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
        if (dismissedId === data.notice._id) return; // already dismissed

        setNotice(data.notice);
        setVisible(true);
      } catch {
        // silently fail — notice is non-critical
      }
    };
    fetchNotice();
  }, []);

  const dismiss = () => {
    localStorage.setItem("dismissedNotice", notice._id);
    setVisible(false);
  };

  if (!visible || !notice) return null;

  return (
    <div className={`relative z-50 w-full border-b px-4 py-2.5 flex items-center justify-between gap-4 ${TYPE_STYLES[notice.type] || TYPE_STYLES.info}`}>
      {/* Left accent bar */}
      <span className={`absolute left-0 top-0 h-full w-1 ${TYPE_ACCENT[notice.type] || TYPE_ACCENT.info}`} />

      <div className="flex items-center gap-3 ml-3 flex-1 min-w-0">
        <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 shrink-0">Notice</span>
        <p className="text-xs leading-snug truncate">{notice.message}</p>
        {notice.link && (
          <Link
            href={notice.link}
            className="shrink-0 font-mono text-[10px] uppercase tracking-widest underline underline-offset-2 hover:opacity-100 opacity-60 transition-opacity"
          >
            {notice.linkText || "Learn More"} →
          </Link>
        )}
      </div>

      <button
        onClick={dismiss}
        className="shrink-0 p-1 opacity-40 hover:opacity-100 transition-opacity"
        aria-label="Dismiss notice"
      >
        <X size={14} />
      </button>
    </div>
  );
}
