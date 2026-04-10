"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { RoundedRedLoader } from "@/components/ui/center-loader";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-500" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-500" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:bg-red-600" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:bg-blue-700" },
  { icon: Twitter, label: "Twitter / X", href: "#", color: "hover:bg-cyan-500" },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <p className="text-red-500 uppercase tracking-[0.4em] text-xs font-bold mb-4">Get In Touch</p>
        <h1 className="text-6xl md:text-8xl font-sans italic font-black uppercase tracking-tighter leading-none">
          Contact <span className="text-red-600">Us</span>
        </h1>
        <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto">
          Whether you want to collaborate, sponsor, or join the team — we&apos;d love to hear from you.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Left: Contact Info */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Reach Us</h2>
            <h3 className="text-2xl md:text-3xl font-sans font-black italic uppercase text-white mb-8">
              Contact Information
            </h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white font-black uppercase text-xs tracking-wider mb-1">Email</p>
                  <a href="mailto:info@mistblitz.com" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                    info@mistblitz.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-white font-black uppercase text-xs tracking-wider mb-1">Phone</p>
                  <p className="text-gray-400 text-sm">+880 XXXXXXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white font-black uppercase text-xs tracking-wider mb-1">Location</p>
                  <p className="text-gray-400 text-sm">MIST Campus, Mirpur Cantonment, Dhaka 1216, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mb-10">
              <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 transition-all duration-200 ${color} hover:text-white hover:border-transparent`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="border border-white/10 p-0 overflow-hidden">
              <iframe
                title="MIST Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.0254862765!2d90.35505!3d23.85500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c143a5f5d1b9%3A0x5e08e847f0a76e3b!2sMilitary%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sbd!4v1700000000000"
                width="100%"
                height="220"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Send a Message</h2>
            <h3 className="text-2xl md:text-3xl font-sans font-black italic uppercase text-white mb-8">
              Collaborate With Us
            </h3>

            {status === "success" ? (
              <div className="border border-red-600 p-8 text-center">
                <p className="text-3xl font-black italic uppercase text-white mb-2">Message Sent!</p>
                <p className="text-gray-400 text-sm">We&apos;ll get back to you as soon as possible.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-red-500 uppercase text-xs tracking-widest font-black hover:text-red-400 transition-colors"
                >
                  Send Another →
                </button>
              </div>
            ) : status === "error" ? (
              <div className="border border-white/20 p-8 text-center">
                <p className="text-xl font-black italic uppercase text-white mb-2">Failed to Send</p>
                <p className="text-gray-400 text-sm">Something went wrong. Please try again or email us directly.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-red-500 uppercase text-xs tracking-widest font-black hover:text-red-400 transition-colors"
                >
                  Try Again →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Sponsorship / Join the team / General inquiry"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-600 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="cta-btn w-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {status === "loading" ? <RoundedRedLoader size="h-5 w-5" className="border-white/35 border-t-white" /> : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
