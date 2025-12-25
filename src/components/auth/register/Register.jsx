"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import saveAdminToDB from "@/lib/saveadminToDb";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AdminRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    user,
    loading,
    setLoading,
    signUpwithEmail,
    signInWithGoogle,
    signInWithFacebook,
  } = useContext(AuthContext);

  const router = useRouter();

  const onSubmit = async (user) => {
    try {
      const result = await signUpwithEmail(user.email, user.password);
      const loggedUser = result.user;

      console.log("User signed in:", loggedUser);

      await saveAdminToDB(loggedUser);
      toast.success("Signin successful!");
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const loggedUser = result.user;

      console.log("User signed in with Google:", loggedUser);

      await saveAdminToDB(loggedUser); // save to DB
      toast.success("Google Signin successful!");
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(error.message);
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:min-w-md mx-auto  p-6 rounded-lg "
    >
      <Toaster position="top-center" />
      <h2 className=" text-2xl md:text-3xl  text-gray-800 font-bold mb-2 text-start">
        Sign Up
      </h2>
      <p className="my-3 text-sm md:text-lg text-gray-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-1">
          login now
        </Link>
      </p>

      <div className="mb-4">
        <label className="block mb-1 text-gray-500">Full Name</label>
        <input
          type="text"
          {...register("name")}
          className="w-full border p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1  text-gray-500">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1  text-gray-500">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Forgot Password link */}
        <div className="mt-1 text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </button>
      <br />
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Continue with Social */}
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={fblogin}
          type="button"
          className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition"
        >
          <FaFacebook className="mr-2 text-blue-600" /> Continue with Facebook
        </button>
        <button
          onClick={googleLogin}
          type="button"
          className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition"
        >
          <FcGoogle size={20} className="mr-2 text-red-500" /> Continue with
          Google
        </button>
      </div>
    </form>
  );
};

export default AdminRegister;
