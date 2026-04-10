"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import api from "@/lib/axios";
import CenterLoader from "@/components/ui/center-loader";

const ProtectedRoute = ({ children }) => {
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

    const verifyAdmin = async () => {
      try {
        const res = await api.get("/admin");

        
        const isAdmin = res.data.find(
          (u) => u.email === user.email && u.role === "admin"
        );

        if (isAdmin) {
          setAuthorized(true);
          setChecking(false);
        } else {
          
          router.replace("/403");
        }
      } catch (error) {
        console.error("Admin verification failed:", error);
        router.replace("/");
      }
    };

    verifyAdmin();
  }, [user, loading, router]);

  
  if (loading || checking) {
    return (
      <CenterLoader fullScreen containerClassName="bg-[#02040a]" />
    );
  }

  
  return authorized ? children : null;
};

export default ProtectedRoute;