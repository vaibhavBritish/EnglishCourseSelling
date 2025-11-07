"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-100 "
          : "bg-transparent backdrop-blur-md "
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="LearnWithUniConnect"
            width={160}
            height={160}
            className="w-40 h-auto transition-transform hover:scale-105"
          />
         
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-semibold">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Courses", href: "/courses" },
            { label: "Testimonials", href: "/testimonials" },
            { label: "Contact", href: "/contactus" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-gray-700 hover:text-indigo-600 transition group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="text-gray-500 text-sm">Loading...</div>
          ) : user ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm"
              >
                <User size={18} className="text-blue-600" />
                <span className="text-sm font-semibold text-gray-800">
                  {user.email}
                </span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={logout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold px-4 py-2 rounded-full shadow-md"
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow-md"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-full shadow-md"
                >
                  Sign Up
                </motion.button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-700 text-white flex flex-col items-center gap-5 py-6 font-medium text-lg shadow-lg"
          >
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Courses", href: "/courses" },
              { label: "Testimonials", href: "/testimonials" },
              { label: "Contact", href: "/contactus" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:bg-white/10 py-2 px-4 rounded-md transition-all w-full text-center"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 mt-4 px-4 w-full">
              {user ? (
                <>
                  <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                    <User size={20} />
                    <span>{user.username}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-full font-semibold hover:scale-105 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <button className="bg-white text-blue-700 py-2 rounded-full font-semibold w-full hover:bg-gray-100 transition">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="bg-white text-blue-700 py-2 rounded-full font-semibold w-full hover:bg-gray-100 transition">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
