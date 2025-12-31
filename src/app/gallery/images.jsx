"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/gallery");
        setPhotos(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono uppercase tracking-[0.3em]">
        Loading_Visual_Archive...
      </div>
    );

  return (
    <section className="bg-black py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 1. TRANSPARENT TEXT WITH IMAGE BACKGROUND */}
        <div className="relative mb-24 flex flex-col items-center justify-center overflow-hidden py-10">
          <h1
            className="text-[15vw] font-sans md:text-[20vw] font-black uppercase leading-none tracking-tighter"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dnrubj8x4/image/upload/v1767172248/20251012_180008_vczdap.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Gallery
          </h1>
          <div className="h-1 w-32 bg-red-600 mt-[-2vw]"></div>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] mt-4 text-center">
            China_Expedition_Archive_2025
          </p>
        </div>

        {/* 2. MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <div
              key={photo._id || index}
              onClick={() => setSelectedImg(photo.imageUrl)}
              className="relative group cursor-zoom-in overflow-hidden border border-white/5 bg-zinc-900"
            >
              {/* MAIN IMAGE */}
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                width={500}
                height={700}
                className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-1000 ease-in-out"
              />

              {/* HOVER OVERLAY: SHOWS YEAR */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center">
                <div className="translate-y-4 font-sans group-hover:translate-y-0 transition-transform duration-500 text-center">
                  <span className="text-red-600 font-mono text-xs uppercase tracking-widest block mb-2">
                    Season
                  </span>
                  <h3 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">
                    {photo.year}
                  </h3>
                  <div className="w-8 h-1 bg-white mx-auto mt-2"></div>
                  <p className="text-gray-400 text-[10px] uppercase mt-4 tracking-widest px-4">
                    {photo.title}
                  </p>
                </div>
                <Maximize2
                  className="absolute bottom-4 right-4 text-white/30"
                  size={16}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 3. LIGHTBOX MODAL */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
              <X size={48} />
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
              <Image
                src={selectedImg}
                fill
                className="object-contain"
                alt="Enlarged view"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
