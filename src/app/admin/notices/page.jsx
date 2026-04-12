"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, BellRing, BellOff } from "lucide-react";

const TYPE_OPTIONS = [
  { value: "info",    label: "Info",    color: "text-white/60" },
  { value: "success", label: "Success", color: "text-green-400" },
  { value: "warning", label: "Warning", color: "text-red-400" },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    message: "",
    link: "",
    linkText: "",
    type: "info",
  });

  const fetchNotices = async () => {
    try {
      const res = await api.get("/admin/notices");
      setNotices(res.data.notices || []);
    } catch {
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return toast.error("Message is required");
    setSubmitting(true);
    try {
      await api.post("/admin/notices", form);
      toast.success("Notice published — all previous notices deactivated");
      setForm({ message: "", link: "", linkText: "", type: "info" });
      fetchNotices();
    } catch {
      toast.error("Failed to publish notice");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (notice) => {
    try {
      await api.patch(`/admin/notices/${notice._id}`, { isActive: !notice.isActive });
      toast.success(notice.isActive ? "Notice deactivated" : "Notice activated");
      fetchNotices();
    } catch {
      toast.error("Failed to update notice");
    }
  };

  const deleteNotice = async (id) => {
    if (!confirm("Delete this notice?")) return;
    try {
      await api.delete(`/admin/notices/${id}`);
      toast.success("Notice deleted");
      fetchNotices();
    } catch {
      toast.error("Failed to delete notice");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-black italic uppercase tracking-tight">Notice Management</h1>
          <p className="text-white/40 text-sm mt-1">
            Publish a notice — it appears as a banner on every page until dismissed by the visitor.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="border border-white/10 p-6 space-y-5">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
              Message *
            </label>
            <textarea
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-600 resize-none"
              placeholder="e.g. Registration open for MIST BLITZ Season 2026!"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Link URL (optional)
              </label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-600"
                placeholder="/join-us"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Link Text
              </label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-600"
                placeholder="Apply Now"
                value={form.linkText}
                onChange={(e) => setForm({ ...form, linkText: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
              Type
            </label>
            <div className="flex gap-3">
              {TYPE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setForm({ ...form, type: t.value })}
                  className={`px-4 py-2 border text-xs font-mono uppercase tracking-widest transition-colors ${
                    form.type === t.value
                      ? "border-red-600 bg-red-600/10 text-white"
                      : "border-white/10 text-white/40 hover:border-white/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest py-3 transition-colors"
          >
            {submitting ? "Publishing..." : "Publish Notice"}
          </button>
        </form>

        {/* Existing notices */}
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">
            All Notices ({notices.length})
          </h2>

          {loading ? (
            <p className="text-white/30 text-sm">Loading...</p>
          ) : notices.length === 0 ? (
            <p className="text-white/30 text-sm">No notices yet.</p>
          ) : (
            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n._id}
                  className={`flex items-start justify-between gap-4 border p-4 transition-colors ${
                    n.isActive ? "border-red-600/40 bg-red-600/5" : "border-white/5 opacity-50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-[9px] uppercase tracking-widest ${
                        n.type === "warning" ? "text-red-400" : n.type === "success" ? "text-green-400" : "text-white/30"
                      }`}>{n.type}</span>
                      {n.isActive && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-red-500 bg-red-600/10 px-2 py-0.5">
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white leading-snug">{n.message}</p>
                    {n.link && (
                      <p className="text-xs text-white/30 mt-1 font-mono">{n.link}</p>
                    )}
                    <p className="text-[10px] text-white/20 mt-2 font-mono">
                      {new Date(n.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleActive(n)}
                      title={n.isActive ? "Deactivate" : "Activate"}
                      className="p-2 border border-white/10 hover:border-white/30 text-white/40 hover:text-white transition-colors"
                    >
                      {n.isActive ? <BellOff size={14} /> : <BellRing size={14} />}
                    </button>
                    <button
                      onClick={() => deleteNotice(n._id)}
                      title="Delete"
                      className="p-2 border border-white/10 hover:border-red-600 text-white/40 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
