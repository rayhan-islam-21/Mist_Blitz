"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaUsers,
  FaTachometerAlt,
  FaHandshake,
  FaFlag,
  FaClipboardList,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    {
      name: "Partners",
      icon: <FaHandshake />,
      subMenu: [
        { name: "All Partners", path: "/admin/partners/all" },
        { name: "Add Partner", path: "/admin/partners/add" },
        { name: "Tiers", path: "/admin/partners/tiers" },
      ],
    },
    {
      name: "Teams",
      icon: <FaUsers />,
      subMenu: [
        { name: "All Teams", path: "/admin/teams/all" },
        { name: "Add Team", path: "/admin/teams/add" },
      ],
    },
    {
      name: "Events",
      icon: <FaFlag />,
      subMenu: [
        { name: "All Events", path: "/admin/events/all" },
        { name: "Create Event", path: "/admin/events/add" },
      ],
    },
    { name: "Tasks", icon: <FaClipboardList />, path: "/admin/tasks" },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-200 ease-in-out overflow-y-auto
          bg-gradient-to-b from-black via-slate-900 to-slate-950 text-white
          ${sidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}
          md:w-64 md:translate-x-0 md:flex md:flex-col
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 md:hidden">
          <div className="text-xl font-bold">MIST Blitz</div>
          <button onClick={toggleSidebar}>
            <FaTimes size={24} />
          </button>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-extrabold">MIST Blitz</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {!item.subMenu ? (
                <Link
                  href={item.path}
                  className={`flex items-center p-2 rounded hover:bg-gray-800 transition ${
                    pathname === item.path ? "bg-gray-800" : ""
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-800 transition"
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                    <FaChevronDown
                      className={`ml-auto transition-transform ${
                        openSubmenus[item.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSubmenus[item.name] && (
                    <div className="ml-6 mt-2 flex flex-col space-y-1">
                      {item.subMenu.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.path}
                          className={`p-2 rounded hover:bg-gray-700 transition ${
                            pathname === sub.path ? "bg-gray-800" : ""
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
