import { Suspense } from "react";
import GuestRoute from "@/components/protected/Guestroute";
import AdminLogin from "@/components/auth/login/Login";

export default function LoginPage() {
  return (
    // This boundary now catches the useSearchParams() call inside GuestRoute
    <Suspense fallback={<GlobalAuthFallback />}>
      <GuestRoute>
        <AdminLogin />
      </GuestRoute>
    </Suspense>
  );
}

function GlobalAuthFallback() {
  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center font-mono text-red-500">
      <div className="text-4xl mb-4 animate-pulse">🔒</div>
      <div className="text-[10px] tracking-[1em] font-black uppercase">
        Establishing Secure Tunnel...
      </div>
    </div>
  );
}