import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header>
      {/* logo */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">MIST BLITZ</h1>
      </div>
      {/* nav items */}
      <div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Partners</Link>
          </li>
          <li>
            <Link href="/">Join us</Link>
          </li>
          <li>
            <Link href="/">Gallery</Link>
          </li>
          <li>
            <Link href="/">shop</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
