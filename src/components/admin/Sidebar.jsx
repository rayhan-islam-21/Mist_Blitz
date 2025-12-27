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
  FaUser,
} from "react-icons/fa";

// ----- ROLE CONSTANTS -----
const ROLE = {
  ADMIN: "admin",
  MEMBER: "member",
};

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState({});

  // ----- USER ROLE -----
  const userRole = ROLE.ADMIN; // Replace with your auth/session role

  // ----- MENU ITEMS -----
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
      roles: [ROLE.ADMIN],
    },
    {
      name: "My Profile",
      icon: <FaUser />,
      path: "/member/profile",
      roles: [ROLE.MEMBER],
    },
    {
      name: "Partners",
      icon: <FaHandshake />,
      roles: [ROLE.ADMIN],
      subMenu: [
        {
          name: "All Partners",
          path: "/admin/partners/all",
          roles: [ROLE.ADMIN],
        },
        {
          name: "Add Partner",
          path: "/admin/partners/add",
          roles: [ROLE.ADMIN],
        },
        { name: "Tiers", path: "/admin/partners/tiers", roles: [ROLE.ADMIN] },
      ],
    },
    {
      name: "Members",
      icon: <FaUserPlus />,
      roles: [ROLE.ADMIN],
      subMenu: [
        {
          name: "All Members",
          path: "/admin/members/all",
          roles: [ROLE.ADMIN],
        },
        { name: "Add Member", path: "/admin/members/add", roles: [ROLE.ADMIN] },
      ],
    },
    {
      name: "Equipment",
      icon: <FaClipboardList />,
      roles: [ROLE.ADMIN, ROLE.MEMBER],
      subMenu: [
        {
          name: "All Equipment",
          path: "/admin/equipment/all-equipment",
          roles: [ROLE.ADMIN],
        },
        {
          name: "Equipment Shop",
          path: "/admin/equipment/equipment-shop",
          roles: [ROLE.MEMBER],
        },
        {
          name: "My Equipment",
          path: "/member/equipment/my-equipment",
          roles: [ROLE.MEMBER],
        },
        {
          name: "Add Equipment",
          path: "/admin/equipment/add",
          roles: [ROLE.ADMIN],
        },
      ],
    },
    {
      name: "Teams",
      icon: <FaUsers />,
      roles: [ROLE.ADMIN],
      subMenu: [
        { name: "All Teams", path: "/admin/teams/all", roles: [ROLE.ADMIN] },
        { name: "Add Team", path: "/admin/teams/add", roles: [ROLE.ADMIN] },
      ],
    },
    {
      name: "My Teams",
      icon: <FaUsers />,
      path: "/member/teams",
      roles: [ROLE.MEMBER],
    },
    {
      name: "Events",
      icon: <FaFlag />,
      roles: [ROLE.ADMIN],
      subMenu: [
        { name: "All Events", path: "/admin/events/all", roles: [ROLE.ADMIN] },
        {
          name: "Create Event",
          path: "/admin/events/add",
          roles: [ROLE.ADMIN],
        },
      ],
    },
    {
      name: "Tasks",
      icon: <FaClipboardList />,
      path: "/admin/tasks",
      roles: [ROLE.ADMIN],
    },
  ];

  // Auto-open submenu based on current path
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subMenu?.some((sub) => sub.path === pathname)) {
        setOpenSubmenus((prev) => ({ ...prev, [item.name]: true }));
      }
    });
  }, [pathname]);

  // Close sidebar automatically on mobile when a route changes
  useEffect(() => {
    if (window.innerWidth < 768 && sidebarOpen) {
      toggleSidebar();
    }
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
          bg-white text-slate-600 shadow-xl md:shadow-sm flex flex-col
          ${
            sidebarOpen
              ? "w-[280px] translate-x-0"
              : "w-[280px] -translate-x-full md:translate-x-0 md:w-64"
          }
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 h-20 border-b border-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              M
            </div>
            <span className="text-xl font-bold tracking-wider text-slate-900">
              MIST Blitz
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 -mr-2 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation - Scrollable area */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems
            .filter((item) => item.roles.includes(userRole)) // <-- FILTER MAIN MENU BY ROLE
            .map((item, index) => {
              const isActive = pathname === item.path;
              const isSubMenuOpen = openSubmenus[item.name];
              const hasActiveChild = item.subMenu?.some(
                (sub) => sub.path === pathname
              );

              return (
                <div key={index} className="relative">
                  {!item.subMenu ? (
                    <Link
                      href={item.path}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                        isActive
                          ? "bg-red-50 text-red-700 font-semibold"
                          : "hover:bg-gray-50 text-slate-500 hover:text-slate-900"
                      }`}
                    >
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
                        className={`flex items-center w-full px-4 py-3 rounded-xl transition-all group ${
                          hasActiveChild
                            ? "text-red-700 font-semibold bg-red-50/30"
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

                      <AnimatePresence initial={false}>
                        {isSubMenuOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-9 mt-1 space-y-1 border-l-2 border-gray-100">
                              {item.subMenu
                                .filter((sub) => sub.roles.includes(userRole)) // <-- FILTER SUBMENU BY ROLE
                                .map((sub, i) => {
                                  const isSubActive = pathname === sub.path;
                                  return (
                                    <Link
                                      key={i}
                                      href={sub.path}
                                      className={`block px-5 py-2.5 text-sm transition-colors rounded-r-lg ${
                                        isSubActive
                                          ? "text-red-600 font-medium bg-red-50"
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
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center p-3 rounded-xl transition-all cursor-pointer hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold mr-3 shadow-inner">
              JS
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">
                rayhan
              </p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-widest font-medium">
                Super Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay - Blur effect */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
