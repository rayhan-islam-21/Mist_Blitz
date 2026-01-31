"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AuthContext from "@/context/Authcontext";

import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaClipboardList,
  FaTimes,
  FaChevronDown,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaPowerOff,
} from "react-icons/fa";

import { Dialog, DialogContent } from "@/components/ui/dialog";

// ----- ROLE CONSTANTS -----
const ROLE = {
  ADMIN: "admin",
  MEMBER: "member",
};

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [openSubmenus, setOpenSubmenus] = useState({});
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const { user, logOut, loading } = useContext(AuthContext);

  // ✅ SAFE READINESS FLAG
  const isReady = !loading && !!user;

  // ✅ SAFE ROLE RESOLUTION
  const isAdmin =
    user?.admindata?.role?.toLowerCase() === "admin" ||
    user?.role?.toLowerCase() === "admin";

  const userRole = isAdmin ? ROLE.ADMIN : ROLE.MEMBER;

  // ----- MENU -----
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
      roles: [ROLE.MEMBER, ROLE.ADMIN],
    },
    {
      name: "Members",
      icon: <FaUserPlus />,
      roles: [ROLE.ADMIN],
      subMenu: [
        { name: "All Members", path: "/admin/members/all-members", roles: [ROLE.ADMIN] },
        { name: "Add Member", path: "/admin/members/add", roles: [ROLE.ADMIN] },
      ],
    },
    {
      name: "Equipment",
      icon: <FaClipboardList />,
      roles: [ROLE.ADMIN, ROLE.MEMBER],
      subMenu: [
        { name: "All Equipment", path: "/admin/equipment/all-equipment", roles: [ROLE.ADMIN] },
        { name: "Add Equipment", path: "/admin/equipment/add", roles: [ROLE.ADMIN] },
        { name: "Equipment Shop", path: "/member/equipment-shop", roles: [ROLE.MEMBER, ROLE.ADMIN] },
        { name: "My Equipment", path: "/member/my-equipment", roles: [ROLE.MEMBER, ROLE.ADMIN] },
      ],
    },
    {
      name: "Logistics",
      icon: <FaExchangeAlt />,
      roles: [ROLE.ADMIN],
      subMenu: [
        { name: "Current Handouts", path: "/admin/logistics/handouts", roles: [ROLE.ADMIN] },
        { name: "Transaction Logs", path: "/admin/logistics/history", roles: [ROLE.ADMIN] },
      ],
    },
  ];

  // ----- AUTO OPEN ACTIVE SUBMENU -----
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subMenu?.some((sub) => sub.path === pathname)) {
        setOpenSubmenus((prev) => ({ ...prev, [item.name]: true }));
      }
    });
  }, [pathname]);

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfirmLogout = async () => {
    await logOut();
    setLogoutModalOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out border-r border-gray-200
        bg-white text-slate-600 shadow-xl md:shadow-sm flex flex-col
        ${sidebarOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full md:translate-x-0 md:w-64"}`}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between p-6 h-20 border-b border-gray-50 shrink-0">
          <Image src="/logo_black.png" width={100} height={100} alt="logo" priority />
          <button onClick={toggleSidebar} className="md:hidden p-2 -mr-2 text-slate-400 hover:text-slate-600">
            <FaTimes size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
          {!isReady ? (
            <div className="space-y-3 px-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-full bg-slate-100 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            menuItems
              .filter((item) => item.roles.includes(userRole))
              .map((item, index) => {
                const isActive = pathname === item.path;
                const isSubMenuOpen = openSubmenus[item.name];
                const hasActiveChild = item.subMenu?.some((sub) => sub.path === pathname);

                return (
                  <div key={index} className="relative">
                    {!item.subMenu ? (
                      <Link
                        href={item.path}
                        className={`flex items-center px-4 py-3 rounded-xl transition-all group ${
                          isActive ? "bg-red-50 text-red-500 font-semibold" : "hover:bg-gray-50 text-slate-500"
                        }`}
                      >
                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-r-full" />}
                        <span className={`text-lg ${isActive ? "text-red-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                          {item.icon}
                        </span>
                        <span className="ml-3 text-sm">{item.name}</span>
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className={`flex items-center w-full px-4 py-3 rounded-xl transition-all group ${
                            hasActiveChild ? "text-red-500 font-semibold bg-red-50/30" : "hover:bg-gray-50"
                          }`}
                        >
                          <span className={`text-lg ${hasActiveChild ? "text-red-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                            {item.icon}
                          </span>
                          <span className="ml-3 text-sm">{item.name}</span>
                          <FaChevronDown size={10} className={`ml-auto transition-transform ${isSubMenuOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {isSubMenuOpen && (
                            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                              <div className="ml-9 mt-1 space-y-1 border-l-2 border-gray-100">
                                {item.subMenu
                                  .filter((sub) => sub.roles.includes(userRole))
                                  .map((sub, i) => (
                                    <Link
                                      key={i}
                                      href={sub.path}
                                      className={`block px-5 py-2.5 text-sm rounded-r-lg ${
                                        pathname === sub.path ? "text-red-600 font-medium bg-red-50" : "text-slate-500 hover:text-red-600"
                                      }`}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                );
              })
          )}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/20 space-y-2">
          {!isReady ? (
            <div className="h-14 w-full bg-slate-100 animate-pulse rounded-xl" />
          ) : (
            <>
              <div className="flex items-center p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                <div className="relative w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold mr-3 overflow-hidden">
                  {user?.info?.image ? (
                    <Image src={user.info.image} alt="profile" fill className="object-cover" />
                  ) : (
                    user?.displayName?.charAt(0) || "U"
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold font-mono uppercase truncate">
                    {user?.info?.name || user?.displayName || "User"}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate uppercase tracking-widest font-medium">
                    {user?.admindata?.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setLogoutModalOpen(true)}
                className="flex items-center font-mono justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
              >
                <FaSignOutAlt />
                <span>Logout Session</span>
              </button>
            </>
          )}
        </div>
      </aside>

      {/* --- LOGOUT CONFIRMATION MODAL (ORIGINAL UI RESTORED) --- */}
      <Dialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-[6px] border-black/20 p-0 overflow-hidden bg-white shadow-2xl">
          <div className="p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 flex items-center justify-center shrink-0 border border-red-200">
                <FaPowerOff size={22} className="text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-sans uppercase italic tracking-tighter text-slate-950">
                  End <span className="text-red-600">Session</span>?
                </h3>
                <p className="text-[11px] font-mono font-semibold text-slate-600 leading-relaxed uppercase tracking-tighter">
                  You are about to Logout from the dashboard
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 border-l-4 border-slate-950 shadow-inner">
              <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1 tracking-widest">
                ACTIVE_OPERATOR:
              </span>
              <span className="text-sm font-mono font-black text-slate-950 break-all uppercase italic">
                {user?.info?.name || user?.displayName || "NULL_USER"}
              </span>
            </div>
          </div>
          <div className="bg-slate-950 p-6 flex gap-4">
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="flex-1 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors border border-transparent hover:border-slate-700"
            >
              CANCEL
            </button>
            <button
              onClick={handleConfirmLogout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 font-black uppercase italic tracking-widest transition-all border-b-4 border-red-800 active:border-b-0 active:translate-y-0.5"
            >
              LOGOUT
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
