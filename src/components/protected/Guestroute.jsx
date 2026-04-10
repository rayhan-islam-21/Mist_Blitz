"use client";

import { useContext, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContext from "@/context/Authcontext";
import CenterLoader from "@/components/ui/center-loader";

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
      <CenterLoader fullScreen containerClassName="bg-[#02040a]" />
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