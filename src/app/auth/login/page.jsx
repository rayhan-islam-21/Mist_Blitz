"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 1. We import the components dynamically with SSR disabled.
// This forces Next.js to skip pre-rendering these components during 'npm run build'.
const GuestRoute = dynamic(() => import("@/components/protected/Guestroute"), { ssr: false });
const AdminLogin = dynamic(() => import("@/components/auth/login/Login"), { ssr: false });

export default function LoginPage() {
  return (
    // 2. We keep the Suspense boundary as a double-safety measure.
    <Suspense fallback={<LoginLoadingFallback />}>
      <GuestRoute>
        <AdminLogin />
      </GuestRoute>
    </Suspense>
  );
}

function LoginLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center font-mono text-red-500">
      <div className="text-4xl mb-4 animate-pulse">🔒</div>
      <div className="text-[10px] tracking-[1em] font-black uppercase">
        Initializing Secure Session...
      </div>
    </div>
  );
}