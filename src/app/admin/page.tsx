"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

const Admin = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.user || !data.user.isAdmin) {
          router.push("/auth/login?message=Access denied");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/auth/login?message=Authentication failed");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            Welcome, <span className="font-semibold">{user.email}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">User ID: {user.id}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Admin Controls</h2>
        </div>
      </div>
    </div>
  );
};

export default Admin;