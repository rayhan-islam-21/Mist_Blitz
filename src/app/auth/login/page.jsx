import { Suspense } from "react";
import GuestRoute from "@/components/protected/Guestroute";
import AdminLogin from "@/components/auth/login/Login";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <GuestRoute>
        <AdminLogin/>
      </GuestRoute>
    </Suspense>
  );
}

function LoginFallback() {
  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-red-500 font-mono">
      Initializing Secure Session...
    </div>
  );
}

