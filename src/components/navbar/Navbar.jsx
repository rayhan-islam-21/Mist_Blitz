"use client";
import Link from "next/link";
import Button from "../ui/retro-btn";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown";

const Navbar = () => {
  return (
    <header className="bg-yellow-400 z-50 text-gray-900 p-4 md:px-8 py-6   shadow-md border-b-4 border-yellow-600">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <Image src="/logo_black.png" alt="logo" width={120} height={120} />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex  space-x-4 items-center">
          <Button variant="secondary" className="bg-yellow-300  text-black">
            <Link href="/">Home</Link>
          </Button>
          <DropdownMenu
            trigger={
              <Button className="bg-yellow-300 text-black relative overflow-hidden group">
                <span className="relative z-10">About</span>
              </Button>
            }
          >
            <div className="flex z-10 flex-col gap-1 p-1 ">
              <DropdownMenuItem onClick={() => console.log("What we do")}>
                <span className="tracking-wide text-xl">What we do</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => console.log("Who we are")}>
                <span className="tracking-wide text-xl">Who we are</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => console.log("Our aim")}>
                <span className="tracking-wide text-xl">Our aim</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenu>

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
          <Button className=" text-lg text-black font-(--font-comic)">
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
