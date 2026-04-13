"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Eye, EyeOff, ImagePlus, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { RoundedRedLoader } from "@/components/ui/center-loader";

const CATEGORIES = ["Competition", "Achievement", "Team Update", "Event", "Announcement"];

const EMPTY = { title: "", excerpt: "", category: "Announcement", image: "" };

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: uploadData }
      );
      const data = await res.json();
      if (data.secure_url) setForm((f) => ({ ...f, image: data.secure_url }));
      else toast.error("Upload failed");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

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

  const deleteItem = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/news/${deleteTarget._id}`);
      toast.success("Deleted");
      setDeleteTarget(null);
      fetchNews();
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
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Cover Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              {form.image ? (
                <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video">
                  <Image src={form.image} alt="preview" fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, image: "" }))}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full h-28 border-2 border-dashed border-slate-200 hover:border-red-400 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  {uploading ? <RoundedRedLoader size="h-5 w-5" /> : <ImagePlus size={20} />}
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {uploading ? "Uploading..." : "Upload Image"}
                  </span>
                </button>
              )}
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
                      onClick={() => setDeleteTarget(item)}
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
                  Delete <span className="text-red-600">Update?</span>
                </h3>
                <p className="text-[11px] font-mono font-semibold text-slate-500 leading-relaxed uppercase tracking-tighter">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            {deleteTarget && (
              <div className="bg-slate-50 p-4 border-l-4 border-slate-950 shadow-inner">
                <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1 tracking-widest">ITEM:</span>
                <span className="text-sm font-mono font-black text-slate-950 break-all uppercase italic line-clamp-2">
                  {deleteTarget.title}
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
              onClick={deleteItem}
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
