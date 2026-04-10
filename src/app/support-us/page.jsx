"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import Link from "next/link";

const ways = [
  {
    icon: "💰",
    title: "Financial Support",
    desc: "Direct funding helps us purchase materials, tools, machined components, and cover competition registration and travel costs.",
  },
  {
    icon: "⚙️",
    title: "Technical Support",
    desc: "Access to engineering expertise, simulation software, manufacturing facilities, or technical mentorship is invaluable to our development.",
  },
  {
    icon: "🔩",
    title: "Materials & Parts",
    desc: "Donations of raw materials — steel, aluminum, carbon fiber, electronics components — directly reduce our manufacturing costs.",
  },
  {
    icon: "📚",
    title: "Knowledge & Mentorship",
    desc: "Industry professionals who can guide, review our designs, or share engineering knowledge help us grow as future engineers.",
  },
];

const tiers = [
  {
    name: "Bronze Partner",
    color: "border-amber-700",
    accent: "text-amber-600",
    benefits: ["Logo on team website", "Social media mention", "Certificate of support"],
  },
  {
    name: "Silver Partner",
    color: "border-gray-400",
    accent: "text-gray-300",
    benefits: ["Logo on car bodywork", "All Bronze benefits", "Logo on team kit", "Feature post on social media"],
  },
  {
    name: "Gold Partner",
    color: "border-yellow-400",
    accent: "text-yellow-400",
    featured: true,
    benefits: ["Premium logo placement on car", "All Silver benefits", "Banner at competition", "Detailed impact report", "Dedicated press release"],
  },
  {
    name: "Title Sponsor",
    color: "border-red-500",
    accent: "text-red-500",
    benefits: ["Car named after sponsor", "All Gold benefits", "VIP event access", "Engineering presentation", "Co-branding rights"],
  },
];

const SupportUsPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative w-full h-[70vh] overflow-hidden flex flex-col justify-end">
        <Image src="/bg2.jpg" fill alt="Support Us" className="object-cover opacity-50 transition-all duration-700" priority />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />
        <div className="relative z-10 px-6 md:px-16 pb-12">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
              Support <span className="text-red-600">Us</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg mt-4 max-w-lg">
              Your support fuels innovation and the next generation of engineers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Support Matters */}
      <section className="bg-[#0a0a0a] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Why It Matters</h2>
            <h3 className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-6">
              More Than a Sponsorship
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              MIST Blitz is entirely student-run and student-funded. Every taka raised goes directly into building a
              better race car and shaping better engineers. Your support doesn&apos;t just put a logo on a car — it sends
              young engineers to the world stage.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Formula Student is recognized globally as the premier engineering design competition for university students.
              By backing us, you invest in Bangladesh&apos;s future engineering talent and gain visibility at an international level.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "50+", label: "Engineers Trained" },
              { value: "3", label: "Cars Built" },
              { value: "4+", label: "Years of Innovation" },
              { value: "Global", label: "Competition Stage" },
            ].map((s, i) => (
              <div key={i} className="border border-white/10 p-6 text-center">
                <p className="text-3xl font-black text-red-600 font-sans italic">{s.value}</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="bg-[#111111] border-y border-white/5 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">How You Can Help</h2>
          <p className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-12">
            Ways to Support
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {ways.map((w, i) => (
              <div key={i} className="border border-white/10 p-8 hover:border-red-600/40 transition-colors duration-300">
                <div className="text-3xl mb-4">{w.icon}</div>
                <h4 className="text-lg font-black uppercase italic text-white mb-3">{w.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="bg-[#0a0a0a] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Partnership Levels</h2>
          <p className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-12">
            Sponsorship Tiers
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`border-2 p-6 ${tier.color} ${tier.featured ? "bg-yellow-400/5" : ""} transition-all duration-300`}
              >
                {tier.featured && (
                  <div className="text-xs uppercase tracking-widest text-yellow-400 font-bold mb-2">★ Most Popular</div>
                )}
                <h4 className={`text-xl font-black uppercase italic mb-4 ${tier.accent}`}>{tier.name}</h4>
                <ul className="space-y-3">
                  {tier.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className={`mt-0.5 text-xs ${tier.accent}`}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Download */}
      <section className="bg-red-600 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-4">
            Ready to Partner?
          </h3>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Download our sponsorship proposal for full details on partnership benefits, our team, and competition plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sponsorship-proposal.pdf"
              download
              className="cta-btn bg-white text-red-600 hover:bg-red-50"
            >
              Download Proposal (PDF)
            </a>
            <Link
              href="/contact"
              className="cta-btn border-2 border-white text-white hover:bg-white hover:text-red-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default SupportUsPage;
