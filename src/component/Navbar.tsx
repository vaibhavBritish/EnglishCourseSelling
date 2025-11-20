"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const courseSubLinks = [
  { label: "English", href: "/courses/english" },
  { label: "IELTS", href: "/courses/ielts" },
  { label: "PTE", href: "/courses/pte" },
  { label: "French", href: "/courses/french" },
  { label: "Celpip", href: "/courses/celpip" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, loading } = useAuth();
  const [courseOpen, setCourseOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);

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
          ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-100"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        

        <Link href="/" className="flex flex-col items-start">
          <Image
            src="/learnwithuniconnect.png"
            alt="LearnWithUniConnect"
            width={160}
            height={160}
            className="w-40 h-auto transition-transform hover:scale-105"
          />

    
          <span className="text-lg font-bold text-linear text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-wide -mt-2">
            Learn With Uniconnect
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-semibold relative">
          <Link
            href="/"
            className="relative text-gray-700 hover:text-indigo-600 transition group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>

          <Link
            href="/about"
            className="relative text-gray-700 hover:text-indigo-600 transition group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>

          {/* COURSES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setCourseOpen(true)}
            onMouseLeave={() => setCourseOpen(false)}
          >
            <button className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition">
              Courses
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {courseOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-8 left-0 bg-white shadow-lg rounded-xl p-4 w-52 border border-gray-200 flex flex-col gap-2 z-50"
                >
                  {courseSubLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 hover:text-indigo-600 px-2 py-1 rounded-md hover:bg-gray-100 transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/testimonials"
            className="relative text-gray-700 hover:text-indigo-600 transition group"
          >
            Testimonials
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>

          <Link
            href="/contactus"
            className="relative text-gray-700 hover:text-indigo-600 transition group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
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
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:bg-white/10 py-2 px-4 rounded-md transition-all w-full text-center"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:bg-white/10 py-2 px-4 rounded-md transition-all w-full text-center"
            >
              About
            </Link>

            <button
              onClick={() => setMobileCourseOpen(!mobileCourseOpen)}
              className="hover:bg-white/10 py-2 px-4 rounded-md transition-all w-full text-center flex items-center justify-center gap-2"
            >
              Courses <ChevronDown size={18} />
            </button>

            <AnimatePresence>
              {mobileCourseOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col w-full px-8 gap-2"
                >
                  {courseSubLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="bg-white/20 py-2 rounded-md text-center"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/testimonials"
              onClick={() => setMenuOpen(false)}
              className="hover:bg-white/10 py-2 px-4 rounded-md transition-all w-full text-center"
            >
              Testimonials
            </Link>

            <Link
              href="/contactus"
              onClick={() => setMenuOpen(false)}
              className="hover:bg-white/10 py-2 px-4 rounded-md transition-all w-full text-center"
            >
              Contact
            </Link>

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
