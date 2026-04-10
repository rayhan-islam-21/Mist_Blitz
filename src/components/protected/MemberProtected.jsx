"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import api from "@/lib/axios";
import CenterLoader from "@/components/ui/center-loader";

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
      <CenterLoader fullScreen containerClassName="bg-[#02040a]" />
    );
  }
  

  if (!authorized) return null;

  return children;
};

export default MemberProtectedRoute;
