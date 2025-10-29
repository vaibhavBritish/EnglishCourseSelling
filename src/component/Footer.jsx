import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <Image src="/logo.png" alt="Logo" width={150} height={50} />
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Empowering learners worldwide through high-quality online language courses.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h1 className="text-lg font-semibold mb-4 text-white">Quick Links</h1>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-blue-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h1 className="text-lg font-semibold mb-4 text-white">Courses</h1>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/courses" className="hover:text-blue-400 transition-colors">
                English
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-blue-400 transition-colors">
                French
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-blue-400 transition-colors">
                Spanish
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-blue-400 transition-colors">
                German
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-lg font-semibold mb-4 text-white">Follow Us</h1>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-blue-400 transition"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-blue-700 transition"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} English Course | All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
