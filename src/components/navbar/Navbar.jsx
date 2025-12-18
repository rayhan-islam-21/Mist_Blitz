"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-neutral-950 border-b border-yellow-500/40"
            : "bg-black/30 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/hero.png"
            alt="BLITZ Logo"
            width={110}
            height={110}
            priority
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <DropdownMenu
            trigger={
              <button className="hover:text-yellow-400 transition">
                About
              </button>
            }
          >
            <div className="bg-neutral-900 border border-neutral-800 rounded-md p-1">
              <DropdownMenuItem>What We Do</DropdownMenuItem>
              <DropdownMenuItem>Who We Are</DropdownMenuItem>
              <DropdownMenuItem>Our Aim</DropdownMenuItem>
            </div>
          </DropdownMenu>

          <Link href="/partners" className="hover:text-yellow-400 transition">
            Partners
          </Link>

          <Link href="/gallery" className="hover:text-yellow-400 transition">
            Gallery
          </Link>

          <Link
            href="/join"
            className="ml-4 rounded-md bg-yellow-400 px-4 py-2 text-black font-semibold hover:bg-yellow-300 transition"
          >
            Join Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
