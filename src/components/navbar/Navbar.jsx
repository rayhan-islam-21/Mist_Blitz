"use client";
import Link from "next/link";
import Button from "../ui/retro-btn";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-yellow-400 text-gray-900 p-4 md:px-8 shadow-md border-b-4 border-yellow-600">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <Image 
            src="/logo_black.png"
            alt="logo"
            width={120}
            height={120}
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex  space-x-4 items-center">
          <Button className="bg-yellow-300  text-black">
            <Link href="/">Home</Link>
          </Button>
          <Button className="bg-yellow-300 text-black">
            <Link href="/">About</Link>
          </Button>
          <Button className="bg-yellow-300 text-black">
            <Link href="/">Partners</Link>
          </Button>
          <Button className="bg-yellow-300 text-black">
            <Link href="/">Join Us</Link>
          </Button>
          <Button className="bg-yellow-300 text-black">
            <Link href="/">Gallery</Link>
          </Button>
          <Button className="bg-yellow-300 text-black">
            <Link href="/">Shop</Link>
          </Button>
          <Button className=" text-lg text-black font-[var(--font-comic)]">
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
