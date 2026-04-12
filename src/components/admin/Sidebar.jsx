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
  FaBell,
} from "react-icons/fa";

import { Dialog, DialogContent } from "@/components/ui/dialog";

const ROLE = { ADMIN: "admin", MEMBER: "member" };

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user, logOut, loading } = useContext(AuthContext);

  const isReady = !loading && !!user;
  const isAdmin =
    user?.admindata?.role?.toLowerCase() === "admin" ||
    user?.role?.toLowerCase() === "admin";
  const userRole = isAdmin ? ROLE.ADMIN : ROLE.MEMBER;

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard", roles: [ROLE.ADMIN] },
    { name: "My Profile", icon: <FaUser />, path: "/member/profile", roles: [ROLE.MEMBER, ROLE.ADMIN] },
    {
      name: "Members", icon: <FaUserPlus />, roles: [ROLE.ADMIN],
      subMenu: [
        { name: "All Members", path: "/admin/members/all-members", roles: [ROLE.ADMIN] },
        { name: "Add Member", path: "/admin/members/add", roles: [ROLE.ADMIN] },
      ],
    },
    {
      name: "Equipment", icon: <FaClipboardList />, roles: [ROLE.ADMIN, ROLE.MEMBER],
      subMenu: [
        { name: "All Equipment", path: "/admin/equipment/all-equipment", roles: [ROLE.ADMIN] },
        { name: "Add Equipment", path: "/admin/equipment/add", roles: [ROLE.ADMIN] },
        { name: "Equipment Shop", path: "/member/equipment-shop", roles: [ROLE.MEMBER, ROLE.ADMIN] },
        { name: "My Equipment", path: "/member/my-equipment", roles: [ROLE.MEMBER, ROLE.ADMIN] },
      ],
    },
    {
      name: "Logistics", icon: <FaExchangeAlt />, roles: [ROLE.ADMIN],
      subMenu: [
        { name: "Current Handouts", path: "/admin/logistics/handouts", roles: [ROLE.ADMIN] },
        { name: "Transaction Logs", path: "/admin/logistics/history", roles: [ROLE.ADMIN] },
      ],
    },
    { name: "Notices", icon: <FaBell />, path: "/admin/notices", roles: [ROLE.ADMIN] },
  ];

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subMenu?.some((sub) => sub.path === pathname)) {
        setOpenSubmenus((prev) => ({ ...prev, [item.name]: true }));
      }
    });
  }, [pathname]);

  const toggleSubmenu = (key) =>
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleConfirmLogout = async () => {
    await logOut();
    setLogoutModalOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out
          bg-[#0a0a0a] border-r border-white/5 flex flex-col
          ${sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/5 shrink-0">
          <Image src="/logo.png" width={90} height={36} alt="MIST BLITZ" priority />
          <button onClick={toggleSidebar} className="md:hidden text-white/40 hover:text-white p-1">
            <FaTimes size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {!isReady ? (
            <div className="space-y-2 px-2 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-9 w-full bg-white/5 animate-pulse rounded" />
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
                  <div key={index}>
                    {!item.subMenu ? (
                      <Link
                        href={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all ${
                          isActive
                            ? "bg-red-600/10 text-red-500 border-l-2 border-red-600"
                            : "text-white/40 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="font-mono text-[11px] uppercase tracking-wider">{item.name}</span>
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded text-sm transition-all border-l-2 ${
                            hasActiveChild
                              ? "text-red-500 border-red-600 bg-red-600/5"
                              : "text-white/40 hover:text-white hover:bg-white/5 border-transparent"
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="font-mono text-[11px] uppercase tracking-wider flex-1 text-left">{item.name}</span>
                          <FaChevronDown
                            size={9}
                            className={`transition-transform ${isSubMenuOpen ? "rotate-180" : ""}`}
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
                              <div className="ml-6 mt-0.5 border-l border-white/5 pl-3 space-y-0.5 pb-1">
                                {item.subMenu
                                  .filter((sub) => sub.roles.includes(userRole))
                                  .map((sub, i) => (
                                    <Link
                                      key={i}
                                      href={sub.path}
                                      className={`block py-2 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                                        pathname === sub.path
                                          ? "text-red-500"
                                          : "text-white/30 hover:text-white"
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

        {/* Footer */}
        <div className="p-3 border-t border-white/5 space-y-2">
          {isReady && (
            <>
              <div className="flex items-center gap-3 px-3 py-2.5 bg-white/3 rounded">
                <div className="relative w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden">
                  {user?.info?.image ? (
                    <Image src={user.info.image} alt="profile" fill className="object-cover" />
                  ) : (
                    user?.displayName?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono font-black uppercase truncate text-white">
                    {user?.info?.name || user?.displayName || "User"}
                  </p>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-white/30">
                    {user?.admindata?.role || "member"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setLogoutModalOpen(true)}
                className="flex items-center gap-2 w-full px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-white/30 hover:text-red-400 hover:bg-red-600/5 rounded transition-colors"
              >
                <FaSignOutAlt size={12} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Logout modal */}
      <Dialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
        <DialogContent className="sm:max-w-sm rounded-none border border-white/10 p-0 overflow-hidden bg-[#0a0a0a] shadow-2xl">
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                <FaPowerOff size={16} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-black italic uppercase tracking-tight text-white">
                  End <span className="text-red-600">Session?</span>
                </h3>
                <p className="text-[11px] font-mono text-white/40 mt-1 uppercase tracking-wider">
                  You will be logged out of the dashboard
                </p>
              </div>
            </div>
            <div className="bg-white/3 border border-white/5 p-3">
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Operator</p>
              <p className="text-sm font-mono font-black text-white uppercase">
                {user?.info?.name || user?.displayName || "Unknown"}
              </p>
            </div>
          </div>
          <div className="flex border-t border-white/5">
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="flex-1 px-4 py-3 text-[11px] font-mono uppercase tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLogout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-[11px] font-mono uppercase tracking-widest transition-colors"
            >
              Logout
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
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
