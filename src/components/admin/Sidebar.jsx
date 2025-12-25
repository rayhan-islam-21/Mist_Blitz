"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaTachometerAlt,
  FaHandshake,
  FaFlag,
  FaClipboardList,
  FaTimes,
  FaChevronDown,
  FaUserPlus,
} from "react-icons/fa";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState({});

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
      name: "Members",
      icon: <FaUserPlus />, // or use FaUserPlus from react-icons/fa
      subMenu: [
        { name: "All Members", path: "/admin/members/all" },
        { name: "Add Member", path: "/admin/members/add" }, // This is the route for our form
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

  // Automatically keep submenus open if a child route is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subMenu?.some((sub) => sub.path === pathname)) {
        setOpenSubmenus((prev) => ({ ...prev, [item.name]: true }));
      }
    });
  }, [pathname]);

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out border-r border-gray-200
          bg-white text-slate-600 shadow-sm
          ${sidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}
          md:w-64 md:translate-x-0 md:flex md:flex-col
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 h-20 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              M
            </div>
            <span className="text-xl font-bold tracking-wider text-slate-900">
              MIST Blitz
            </span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            const isSubMenuOpen = openSubmenus[item.name];

            // Check if any child route is active
            const hasActiveChild = item.subMenu?.some(
              (sub) => sub.path === pathname
            );

            return (
              <div key={index} className="relative">
                {!item.subMenu ? (
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                      isActive
                        ? "bg-red-50 text-red-700 font-semibold"
                        : "hover:bg-gray-50 text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {/* Active Indicator Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-r-full" />
                    )}

                    <span
                      className={`text-lg ${
                        isActive
                          ? "text-red-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="ml-3 text-sm">{item.name}</span>
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all group ${
                        hasActiveChild
                          ? "text-red-700 font-normal"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`text-lg ${
                          hasActiveChild
                            ? "text-red-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="ml-3 text-sm">{item.name}</span>
                      <FaChevronDown
                        size={10}
                        className={`ml-auto transition-transform duration-300 ${
                          isSubMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isSubMenuOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-10 mt-1 space-y-1 border-l border-gray-100">
                            {item.subMenu.map((sub, i) => {
                              const isSubActive = pathname === sub.path;
                              return (
                                <Link
                                  key={i}
                                  href={sub.path}
                                  className={`block px-4 py-2 text-sm rounded-r-md transition-colors ${
                                    isSubActive
                                      ? "text-red-600 font-normal bg-red-50/50"
                                      : "text-slate-500 hover:text-red-600 hover:bg-gray-50"
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/30">
          <div className="flex items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold mr-3">
              JS
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">
                John Smith
              </p>
              <p className="text-[10px] text-slate-500 truncate">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
