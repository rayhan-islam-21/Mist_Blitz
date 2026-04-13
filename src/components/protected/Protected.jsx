"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import api from "@/lib/axios";
import CenterLoader from "@/components/ui/center-loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const verified = useRef(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    // Already verified this session — skip API call
    if (verified.current) {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    const cached = sessionStorage.getItem("adminVerified");
    if (cached === user.email) {
      verified.current = true;
      setAuthorized(true);
      setChecking(false);
      return;
    }

    const verifyAdmin = async () => {
      try {
        const res = await api.get("/admin");
        const isAdmin = res.data.find(
          (u) => u.email === user.email && u.role === "admin"
        );
        if (isAdmin) {
          sessionStorage.setItem("adminVerified", user.email);
          verified.current = true;
          setAuthorized(true);
          setChecking(false);
        } else {
          router.replace("/403");
        }
      } catch {
        router.replace("/");
      }
    };

    verifyAdmin();
  }, [user, loading, router]);

  if (loading || checking) {
    return <CenterLoader fullScreen containerClassName="bg-white" />;
  }

  return authorized ? children : null;
};

export default ProtectedRoute;
