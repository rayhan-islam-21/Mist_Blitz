"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Eye, EyeOff } from "lucide-react";

const CATEGORIES = ["Competition", "Achievement", "Team Update", "Event", "Announcement"];

const EMPTY = { title: "", excerpt: "", category: "Announcement", image: "" };

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const fetchNews = async () => {
    try {
      const res = await api.get("/admin/news");
      setNews(res.data.news || []);
    } catch {
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim()) return toast.error("Title and excerpt are required");
    setSubmitting(true);
    try {
      await api.post("/admin/news", form);
      toast.success("Update published");
      setForm(EMPTY);
      fetchNews();
    } catch {
      toast.error("Failed to publish");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (item) => {
    try {
      await api.patch(`/admin/news/${item._id}`, { isPublished: !item.isPublished });
      toast.success(item.isPublished ? "Unpublished" : "Published");
      fetchNews();
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this update?")) return;
    try {
      await api.delete(`/admin/news/${id}`);
      toast.success("Deleted");
      fetchNews();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 md:p-10">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <h1 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight">
            News &amp; <span className="text-red-600">Updates</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage news shown on the home page Latest Updates section.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="border border-slate-200 rounded-xl p-6 space-y-5 bg-white shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Title *</label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-red-500"
                placeholder="e.g. MIST BLITZ completes endurance laps at FSC China 2025"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Excerpt *</label>
              <textarea
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-red-500 resize-none"
                placeholder="Short description shown on the card (2-3 sentences)..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Category</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-500"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Image URL (optional)</label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-red-500"
                placeholder="https://... or /image.jpg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-lg transition-colors"
          >
            {submitting ? "Publishing..." : "Publish Update"}
          </button>
        </form>

        {/* News list */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            All Updates ({news.length})
          </h2>

          {loading ? (
            <p className="text-slate-400 text-sm">Loading...</p>
          ) : news.length === 0 ? (
            <p className="text-slate-400 text-sm">No updates yet.</p>
          ) : (
            <div className="space-y-3">
              {news.map((item) => (
                <div
                  key={item._id}
                  className={`flex items-start justify-between gap-4 border rounded-xl p-4 transition-colors ${
                    item.isPublished ? "border-slate-200 bg-white" : "border-slate-100 bg-slate-50 opacity-60"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      {item.isPublished && (
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-900 leading-snug">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.excerpt}</p>
                    <p className="text-[10px] text-slate-300 mt-1.5">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublish(item)}
                      title={item.isPublished ? "Unpublish" : "Publish"}
                      className="p-2 border border-slate-200 rounded-lg hover:border-slate-300 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {item.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
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
  );
}
