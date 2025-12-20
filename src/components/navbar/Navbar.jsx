"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../ui/navigation-menu"; // adjust path
import { usePathname } from "next/navigation";
import NavLink from "./NavLink"; // your NavLink component

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check if the current route is an About sub-route
  const isAboutActive = pathname.startsWith("/about");

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-950 border-b border-yellow-500/40"
          : "bg-black/30 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/hero.png" alt="BLITZ Logo" width={110} height={110} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium text-white">
          <NavLink
            href="/"
            className={`hover:text-yellow-400 transition ${
              pathname === "/" ? "text-yellow-400 border-b-2 border-yellow-400" : ""
            }`}
          >
            Home
          </NavLink>

          {/* About Flyout */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`bg-transparent m-0 text-lg transition ${
                    isAboutActive
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-white hover:text-yellow-400"
                  }`}
                >
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-neutral-900 text-white border border-neutral-800 rounded-md shadow-lg min-w-60 p-4">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <NavLink
                          href="/about/what-we-do"
                          className="block px-3 py-2 hover:bg-neutral-800 rounded-md transition"
                        >
                          What We Do
                        </NavLink>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <NavLink
                          href="/about/who-we-are"
                          className="block px-3 py-2 hover:bg-neutral-800 rounded-md transition"
                        >
                          Who We Are
                        </NavLink>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <NavLink
                          href="/about/our-aim"
                          className="block px-3 py-2 hover:bg-neutral-800 rounded-md transition"
                        >
                          Our Aim
                        </NavLink>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavLink
            href="/partners"
            className={`hover:text-yellow-400 transition ${
              pathname === "/partners" ? "text-yellow-400 border-b-2 border-yellow-400" : ""
            }`}
          >
            Partners
          </NavLink>
          <NavLink
            href="/shop"
            className={`hover:text-yellow-400 transition ${
              pathname === "/shop" ? "text-yellow-400 border-b-2 border-yellow-400" : ""
            }`}
          >
            Shop
          </NavLink>
          <NavLink
            href="/gallery"
            className={`hover:text-yellow-400 transition ${
              pathname === "/gallery" ? "text-yellow-400 border-b-2 border-yellow-400" : ""
            }`}
          >
            Gallery
          </NavLink>

          <NavLink
            href="/join"
            className={`ml-0 rounded-md bg-yellow-400 px-4 py-2 text-black! font-semibold hover:bg-yellow-300 transition ${
              pathname === "/join" ? "border-2 border-black" : "text-red-500"
            }`}
          >
            Conatact Us
          </NavLink>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-neutral-900 text-white w-full absolute top-full left-0 border-t border-yellow-500/40 z-40">
          <ul className="flex flex-col gap-4 p-6 text-lg font-medium">
            <li>
              <NavLink
                href="/"
                className={`hover:text-yellow-400 transition ${
                  pathname === "/" ? "text-yellow-400" : ""
                }`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/about/what-we-do"
                className={`hover:text-yellow-400 transition ${
                  pathname.startsWith("/about") ? "text-yellow-400" : ""
                }`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/partners"
                className={`hover:text-yellow-400 transition ${
                  pathname === "/partners" ? "text-yellow-400" : ""
                }`}
              >
                Partners
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/shop"
                className={`hover:text-yellow-400 transition ${
                  pathname === "/shop" ? "text-yellow-400" : ""
                }`}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/gallery"
                className={`hover:text-yellow-400 transition ${
                  pathname === "/gallery" ? "text-yellow-400" : ""
                }`}
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/join"
                className="rounded-md bg-yellow-400 px-4 py-2
                 text-black font-semibold hover:bg-yellow-300 transition"
              >
                Join Us
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
