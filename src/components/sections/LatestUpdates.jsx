"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CATEGORY_COLORS = {
  Competition:   "bg-red-600/10 text-red-500 border-red-600/20",
  Achievement:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Team Update": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Event:         "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Announcement:  "bg-white/5 text-white/50 border-white/10",
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show:   { y: 0, opacity: 1 },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function LatestUpdates() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setNews(d.news || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && news.length === 0) return null;

  return (
    <section className="bg-[#050505] border-t border-white/5 pt-24 pb-0 px-4 md:px-8 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-3"
            >
              Latest Updates
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter text-white"
            >
              News &amp; <span className="text-red-600">Updates</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-white/5 p-6 animate-pulse">
                <div className="h-3 w-20 bg-white/5 rounded mb-4" />
                <div className="h-5 w-full bg-white/5 rounded mb-2" />
                <div className="h-5 w-3/4 bg-white/5 rounded mb-4" />
                <div className="h-3 w-full bg-white/5 rounded mb-2" />
                <div className="h-3 w-2/3 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {news.map((item, i) => (
              <motion.div
                key={item._id}
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className={`group border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col ${
                  i === 0 ? "md:col-span-1 row-span-1" : ""
                }`}
              >
                {/* Top accent */}
                <div className="h-0.5 bg-white/5 group-hover:bg-red-600 transition-colors duration-300" />

                {/* Image */}
                {item.image && (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Category + date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-[9px] uppercase tracking-widest border px-2 py-0.5 ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Announcement}`}>
                      {item.category}
                    </span>
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider">
                      {timeAgo(item.createdAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-black italic uppercase text-white text-lg leading-tight tracking-tight mb-3 group-hover:text-red-500 transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/40 text-sm leading-relaxed flex-1">
                    {item.excerpt}
                  </p>

                  {/* Bottom */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-600" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">
                      MIST BLITZ · {new Date(item.createdAt).getFullYear()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
