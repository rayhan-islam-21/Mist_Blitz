import AdminRegister from "@/components/auth/register/Register";
import React, { Suspense } from "react";
import CenterLoader from "@/components/ui/center-loader";

const Register = () => {
  return (
    <div className="md:min-h-screen">
      <Suspense
        fallback={
          <CenterLoader fullScreen containerClassName="bg-[#02040a]" />
        }
      >
        <AdminRegister />
      </Suspense>
    </div>
  );
};

export default Register;
