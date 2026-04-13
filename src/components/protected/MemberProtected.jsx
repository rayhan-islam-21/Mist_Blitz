"use client";

import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import api from "@/lib/axios";
import CenterLoader from "@/components/ui/center-loader";

const MemberProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const verified = useRef(false);

  // Synchronous check before paint — skips spinner when cache already exists
  useLayoutEffect(() => {
    if (loading || !user) return;
    if (verified.current) {
      setAuthorized(true);
      setChecking(false);
      return;
    }
    const cached = sessionStorage.getItem("memberVerified");
    if (cached === user.email) {
      verified.current = true;
      setAuthorized(true);
      setChecking(false);
    }
  }, [user, loading]);

  // Async path — only runs on first visit before cache is set
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    if (verified.current) return;

    const verifyMember = async () => {
      try {
        await api.get("/admin");
        sessionStorage.setItem("memberVerified", user.email);
        verified.current = true;
        setAuthorized(true);
        setChecking(false);
      } catch {
        router.replace("/");
      }
    };

    verifyMember();
  }, [user, loading, router]);

  if (loading || checking) {
    return <CenterLoader fullScreen containerClassName="bg-white" />;
  }

  return authorized ? children : null;
};

export default MemberProtectedRoute;
