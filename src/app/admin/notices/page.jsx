"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, BellRing, BellOff } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const TYPE_OPTIONS = [
  { value: "info",    label: "Info" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ message: "", link: "", linkText: "", type: "info" });
  const [deleteTarget, setDeleteTarget] = useState(null);

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
      toast.success("Notice published");
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
      toast.success(notice.isActive ? "Deactivated" : "Activated");
      fetchNotices();
    } catch {
      toast.error("Failed to update notice");
    }
  };

  const deleteNotice = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/notices/${deleteTarget._id}`);
      toast.success("Deleted");
      setDeleteTarget(null);
      fetchNotices();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-white text-slate-900 p-6 md:p-10">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <h1 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight text-slate-900">
            Notice <span className="text-red-600">Management</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Publish a notice — it appears as a banner on every page until dismissed by the visitor.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="border border-slate-200 rounded-xl p-6 space-y-5 bg-white shadow-sm">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Message *
            </label>
            <textarea
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-red-500 resize-none"
              placeholder="e.g. Registration open for MIST BLITZ Season 2026!"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Link URL (optional)
              </label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-red-500"
                placeholder="/join-us"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Link Text
              </label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-red-500"
                placeholder="Apply Now"
                value={form.linkText}
                onChange={(e) => setForm({ ...form, linkText: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Type</label>
            <div className="flex gap-2">
              {TYPE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setForm({ ...form, type: t.value })}
                  className={`px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition-colors ${
                    form.type === t.value
                      ? "border-red-600 bg-red-50 text-red-600"
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
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
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-lg transition-colors"
          >
            {submitting ? "Publishing..." : "Publish Notice"}
          </button>
        </form>

        {/* Notices list */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            All Notices ({notices.length})
          </h2>

          {loading ? (
            <p className="text-slate-400 text-sm">Loading...</p>
          ) : notices.length === 0 ? (
            <p className="text-slate-400 text-sm">No notices yet.</p>
          ) : (
            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n._id}
                  className={`flex items-start justify-between gap-4 border rounded-xl p-4 transition-colors ${
                    n.isActive ? "border-red-200 bg-red-50" : "border-slate-100 bg-slate-50 opacity-60"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        n.type === "warning" ? "bg-red-100 text-red-600"
                        : n.type === "success" ? "bg-green-100 text-green-600"
                        : "bg-slate-200 text-slate-500"
                      }`}>{n.type}</span>
                      {n.isActive && (
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 rounded-full">
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-snug">{n.message}</p>
                    {n.link && (
                      <p className="text-xs text-slate-400 mt-1 font-mono">{n.link}</p>
                    )}
                    <p className="text-[10px] text-slate-300 mt-2">
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
                      className="p-2 border border-slate-200 rounded-lg hover:border-slate-300 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {n.isActive ? <BellOff size={14} /> : <BellRing size={14} />}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(n)}
                      title="Delete"
                      className="p-2 border border-slate-200 rounded-lg hover:border-red-300 text-slate-400 hover:text-red-500 transition-colors"
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

      {/* Delete confirmation modal */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent className="sm:max-w-md rounded-none border-[6px] border-black/20 p-0 overflow-hidden bg-white shadow-2xl">
          <div className="p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 flex items-center justify-center shrink-0 border border-red-200">
                <Trash2 size={22} className="text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-sans uppercase italic tracking-tighter text-slate-950">
                  Delete <span className="text-red-600">Notice?</span>
                </h3>
                <p className="text-[11px] font-mono font-semibold text-slate-500 leading-relaxed uppercase tracking-tighter">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            {deleteTarget && (
              <div className="bg-slate-50 p-4 border-l-4 border-slate-950 shadow-inner">
                <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1 tracking-widest">MESSAGE:</span>
                <span className="text-sm font-mono font-black text-slate-950 break-all uppercase italic line-clamp-2">
                  {deleteTarget.message}
                </span>
              </div>
            )}
          </div>
          <div className="bg-slate-950 p-6 flex gap-4">
            <button
              onClick={() => setDeleteTarget(null)}
              className="flex-1 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={deleteNotice}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 font-black uppercase italic tracking-widest transition-all"
            >
              DELETE
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
