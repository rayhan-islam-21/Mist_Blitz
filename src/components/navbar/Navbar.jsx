"use client";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "../ui/retro-btn";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-(--blitz-yellow) text-gray-800 p-4 md:px-8 md:py-5 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <Image 
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Button variant="" className="text-black"><Link href="/">Home</Link></Button>
          <Link href="/">About</Link>
          <Link href="/">Partners</Link>
          <Link href="/">Join Us</Link>
          <Link href="/">Gallery</Link>
          <Link href="/">Shop</Link>
          <Button className="bg-red-600 text-lg text-white/90">Contact</Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-4 bg-yellow-300 rounded-lg shadow-lg p-4 flex flex-col space-y-3 text-center">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/" onClick={() => setIsOpen(false)}>Partners</Link>
          <Link href="/" onClick={() => setIsOpen(false)}>Join Us</Link>
          <Link href="/" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link href="/" onClick={() => setIsOpen(false)}>Shop</Link>
          <Button onClick={() => setIsOpen(false)}>Contact</Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
