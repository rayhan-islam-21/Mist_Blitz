"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import api from "@/lib/axios";
import { FaFingerprint } from "react-icons/fa";

const MemberProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    const verifyMember = async () => {
      try {
        const res = await api.get("/admin");

        const isMember = res.data.find(
          (u) => u.email === user.email && u.role === "member"
        );

        setAuthorized(true);
      } catch (error) {
        router.replace("/");
      } finally {
        setChecking(false);
      }
    };

    verifyMember();
  }, [user, loading, router]);

  if (loading || checking) {
    return (
     <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center font-mono text-red-500">
      <FaFingerprint className="text-4xl mb-4 animate-pulse" />
      <div className="text-[10px] tracking-[1em] font-black uppercase">Syncing Bio-Data...</div>
    </div>
    );
  }
  

  if (!authorized) return null;

  return children;
};

export default MemberProtectedRoute;
