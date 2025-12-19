"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  exact = false,
  className = "",
  activeClass = "text-yellow-400 border-b-2 border-yellow-400",
  inactiveClass = "text-white hover:text-yellow-400",
}) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`${isActive ? activeClass : inactiveClass} transition ${className}`}
    >
      {children}
    </Link>
  );
}
