"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import { useState } from "react";
import api from "@/lib/axios";

const MemberProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  console.log("MemberProtectedRoute user:", user);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }

    const verifyMember = async () => {
      try {
        await api.get("/admin");
        const isMember = res.data.find(
          (u) => u.email === user.email && u.role === "member"
        );

        if (!isMember) {
          router.replace("/403");
          return;
        }

        setAuthorized(true);
      } catch (error) {
        router.replace("/auth/login");
      } finally {
        setChecking(false);
      }
    };

    verifyMember();
  }, [user, loading, router]);

  if (loading || checking) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking access...
      </div>
    );
  }

  if (!authorized) return null;

  return children;
};

export default MemberProtectedRoute;
