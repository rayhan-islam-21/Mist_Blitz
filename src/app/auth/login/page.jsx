
import AdminLogin from "@/components/auth/login/Login";
import AdminRegister from "@/components/auth/register/Register";
import React, { Suspense } from "react";

const Login = () => {
  return (
    <div className="md:min-h-screen  bg-white">
    <Suspense fallback={<div className="h-screen flex justify-center items-center">Loading...</div>}>
       <AdminLogin/>
    </Suspense>
    </div>
  );
};

export default Login;
