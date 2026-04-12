"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

const TYPE_STYLES = {
  info:    "bg-[#111]/95 border-white/10 text-white/80",
  success: "bg-[#0a1f0a]/95 border-green-600/40 text-green-200",
  warning: "bg-red-600 border-red-700 text-white",
};

const TYPE_DOT = {
  info:    "bg-white/40",
  success: "bg-green-400",
  warning: "bg-white",
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
        if (dismissedId === data.notice._id) return;

        setNotice(data.notice);
        setVisible(true);
      } catch {
        // non-critical — fail silently
      }
    };
    fetchNotice();
  }, []);

  // Push navbar down by toggling a data attribute on <html>
  useEffect(() => {
    if (visible) {
      document.documentElement.setAttribute("data-notice", "true");
    } else {
      document.documentElement.removeAttribute("data-notice");
    }
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem("dismissedNotice", notice._id);
    setVisible(false);
  };

  if (!visible || !notice) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-200 border-b backdrop-blur-sm flex items-center justify-between gap-4 px-4 py-2 ${TYPE_STYLES[notice.type] || TYPE_STYLES.info}`}
      style={{ minHeight: "36px" }}
    >
      {/* Status dot */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${TYPE_DOT[notice.type] || TYPE_DOT.info}`} />
        <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 shrink-0 hidden sm:inline">Notice</span>
        <p className="text-xs leading-snug truncate">{notice.message}</p>
        {notice.link && (
          <Link
            href={notice.link}
            className="shrink-0 font-mono text-[10px] uppercase tracking-widest underline underline-offset-2 hover:opacity-100 opacity-70 transition-opacity whitespace-nowrap"
          >
            {notice.linkText || "Learn More"} →
          </Link>
        )}
      </div>

      <button
        onClick={dismiss}
        className="shrink-0 p-1 opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>
    </div>
  );
}
