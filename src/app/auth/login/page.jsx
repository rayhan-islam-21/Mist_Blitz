import GuestRoute from "@/components/protected/Guestroute";
import AdminLogin from "@/components/auth/login/Login";

export default function LoginPage() {
  return (
    <GuestRoute>
      <AdminLogin />
    </GuestRoute>
  );
}