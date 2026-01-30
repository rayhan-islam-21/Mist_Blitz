import { Suspense } from "react";
import GuestRoute from "@/components/protected/Guestroute";
import AdminLogin from "@/components/auth/login/Login";

export default function LoginPage() {
  return (
    <GuestRoute>
      {/* Moving Suspense INSIDE GuestRoute ensures that the 
         CSR (Client Side Rendering) bailout is caught immediately 
         when AdminLogin tries to use searchParams.
      */}
      <Suspense fallback={<LoginFallback />}>
        <AdminLogin />
      </Suspense>
    </GuestRoute>
  );
}

function LoginFallback() {
  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-red-500 font-mono">
      Initializing Secure Session...
    </div>
  );
}