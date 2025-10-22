"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  return (
    <header className="text-black shadow-md sticky top-0 z-50 bg-white p-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">Logo</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-10 font-semibold">
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link href="/courses" className="hover:text-blue-400 transition">
            Courses
          </Link>
          <Link href="#" className="hover:text-blue-400 transition">
            Testimonials
          </Link>
          <Link href="#" className="hover:text-blue-400 transition">
            Contact Us
          </Link>
        </nav>

        <div className="hidden md:flex gap-3 items-center">
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : user ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md">
                <User size={20} />
                <span className="font-semibold">{user.email}</span>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 text-white font-bold hover:bg-red-600 px-4 py-2 rounded-md transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <button className="bg-blue-500 text-white font-bold hover:bg-blue-600 px-4 py-2 rounded-md transition">
                  Login
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="bg-blue-500 text-white font-bold hover:bg-blue-600 px-4 py-2 rounded-md transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white text-center flex flex-col gap-4 py-4 font-semibold">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/courses" onClick={() => setMenuOpen(false)}>
            Courses
          </Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          <div className="flex flex-col gap-3 mt-4 px-4">
            {user ? (
              <>
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-md">
                  <User size={20} />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition w-full">
                    Login
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition w-full">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;