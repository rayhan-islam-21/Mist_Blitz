// app/auth/layout.js
import GuestRoute from "@/components/protected/Guestroute";

export default function AuthLayout({ children }) {
  return (
    <GuestRoute>
      {children}
    </GuestRoute>
  );
}