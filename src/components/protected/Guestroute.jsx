"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import { FaFingerprint } from "react-icons/fa";

const GuestRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);

  const emailParam = searchParams.get("email");
  const blitzIdParam = searchParams.get("blitzId");

  useEffect(() => {
    if (loading) return;
    
    if (!emailParam && !blitzIdParam) {
      router.replace("/"); 
      return;
    }

    
    setIsChecking(false);
  }, [user, loading, emailParam, blitzIdParam, router]);

  
  
  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center font-mono text-red-500">
        <FaFingerprint className="text-4xl mb-4 animate-pulse" />
        <div className="text-[10px] tracking-[1em] font-black uppercase">
          Verifying Access Token...
        </div>
      </div>
    );
  }

  return children;
};

export default GuestRoute;