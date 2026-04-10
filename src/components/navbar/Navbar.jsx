"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Journey", href: "/our-journey" },
    { name: "Teams", href: "/team" },
    { name: "Our Cars", href: "/our-cars" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Gallery", href: "/gallery" },
    { name: "Support Us", href: "/support-us" },
    { name: "Join Us", href: "/join-us" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-150 transition-all duration-300 ${
          scrolled
            ? "bg-[#05070d]/35 backdrop-blur-xl border-b border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            : "bg-transparent backdrop-blur-[2px]"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-18">

          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative rounded-md border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-md">
              <Image
                src="https://res.cloudinary.com/dnrubj8x4/image/upload/v1771498710/hero_q5f7az.png"
                alt="MIST BLITZ"
                width={130}
                height={52}
                className="brightness-200 contrast-125 w-28 h-auto md:w-36"
                priority
              />
            </div>
          </Link>

          {/* CENTER: Nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-0">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 xl:px-4 py-5 text-[11px] xl:text-[12px] font-black uppercase tracking-wider transition-all duration-200 group ${
                    active ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Contact button + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="cta-btn hidden sm:inline-flex min-h-10 min-w-0 px-6 py-2 bg-red-600 text-white text-[11px] xl:text-[12px] hover:bg-red-700 -skew-x-6"
            >
              <span className="skew-x-6">Contact Us</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-[#060913]/70 backdrop-blur-xl z-149 border-b border-white/15 lg:hidden">
          <div className="flex flex-col py-4 px-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 text-sm font-black uppercase tracking-wider border-b border-white/5 transition-colors ${
                    active ? "text-red-500" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="cta-btn mt-4 bg-red-600 text-white text-center hover:bg-red-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
