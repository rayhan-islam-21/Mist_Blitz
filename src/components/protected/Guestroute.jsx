"use client";

import { useContext, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import { FaFingerprint } from "react-icons/fa";

// This tiny component isolates the "poisonous" hook
const GuestRedirectLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const blitzIdParam = searchParams.get("blitzId");

  useEffect(() => {
    if (!emailParam && !blitzIdParam) {
      router.replace("/");
    }
  }, [emailParam, blitzIdParam, router]);

  return null;
};

const GuestRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center font-mono text-red-500">
        <FaFingerprint className="text-4xl mb-4 animate-pulse" />
        <div className="text-[10px] tracking-[1em] font-black uppercase">Verifying Access Token...</div>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <GuestRedirectLogic />
      </Suspense>
      {children}
    </>
  );
};

export default GuestRoute;