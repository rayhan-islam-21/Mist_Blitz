"use client";
import React, { useState, useEffect, useRef } from "react";

const User = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Community = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Subscription = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const Settings = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 6h8" />
    <path d="M16 6h4" />
    <path d="M10 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 18h4" />
    <path d="M12 18h8" />
    <path d="M10 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 12h4" />
    <path d="M12 12h8" />
  </svg>
);

const HelpCenter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);

const SignOut = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const DropdownMenu = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <div className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown */}
      <div
        className={`
          absolute left-1/2 text-4xl -translate-x-1/2 mt-2
          transition-all duration-150
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div
          className="
            w-56  rounded-xl border-2 border-black
            bg-(--blitz-yellow) text-black
            shadow-[6px_6px_0px_#000]
            p-2
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};


const DropdownMenuItem = ({ children, onClick, active = false }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
    }}
    className={`
      text-zinc-800 dark:text-zinc-200 font-medium group flex items-center 
      px-3 py-2.5 text-sm rounded-lg transition-colors duration-150
      ${
        active
          ? "bg-zinc-100 dark:bg-zinc-800"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }
    `}
    role="menuitem"
  >
    {children}
  </a>
);

const DropdownMenuSeparator = () => (
  <div className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
);

export { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator };
