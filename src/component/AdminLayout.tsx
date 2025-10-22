"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/users", label: "Users" },
    { href: "/admin/courses", label: "Courses" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-8 text-center text-indigo-600">Admin Panel</h2>
        <nav>
          <ul className="space-y-3">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-gray-700 hover:bg-indigo-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {children ? children : <h1 className="text-xl font-semibold">Welcome to Admin Dashboard</h1>}
      </main>
    </div>
  );
};

export default AdminLayout;
