import AdminRegister from "@/components/auth/register/Register";
import React, { Suspense } from "react";

const Register = () => {
  return (
    <div className="md:min-h-screen">
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            Loading...
          </div>
        }
      >
        <AdminRegister />
      </Suspense>
    </div>
  );
};

export default Register;
