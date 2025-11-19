"use client";
import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

const Login = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FormData),
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (!data.user) {
      alert(data.message || "Something went wrong");
    } else {
      login(data.user);
      alert(" Login Successful!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
            <LogIn size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to continue your learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700 text-sm"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={FormData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-gray-50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700 text-sm"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={FormData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Logging in..." : <>Login <LogIn size={18} /></>}
          </button>

        </form>
          <button
            onClick={() => window.location.href = "/api/auth/google"}
            className="w-full mt-4 bg-red-500 text-white p-3 rounded-xl"
          >
            Continue with Google
          </button>

        <div className="text-center mt-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
