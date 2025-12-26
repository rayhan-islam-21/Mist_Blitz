"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import api from "@/lib/axios";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    // Not logged in
    if (!user) {
      router.replace("/auth/login");
      return;
    }

    const verifyAdmin = async () => {
      try {
        const res = await api.get("/admin");

        // FIND current user in admin list
        const isAdmin = res.data.find(
          (u) => u.email === user.email && u.role === "admin"
        );

        if (!isAdmin) {
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

    verifyAdmin();
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

export default ProtectedRoute;
