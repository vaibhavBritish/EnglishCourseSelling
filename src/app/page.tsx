"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Leadform from "@/component/Leadform";
import { Phone } from "lucide-react";

export default function Home() {
  const courses = [
    {
      id: 1,
      img: "/Power-of-English.jpg",
      title: "Beginner's English",
      desc: "Master the fundamentals of English with easy, engaging lessons and real-world examples.",
      price: "59",
    },
    {
      id: 2,
      img: "/Learn French.jpg",
      title: "Intermediate French",
      desc: "Build on your French foundation with conversational and cultural learning modules.",
      price: "69",
    },
    {
      id: 3,
      img: "/advancedEnglish.jpg",
      title: "Advanced English",
      desc: "Perfect your English fluency and confidence for business and global communication.",
      price: "79",
    },
  ];

  const languages = [
    { id: 1, img: "/advancedEnglish.jpg", title: "English", link: "/courses/english" },
    { id: 2, img: "/Learn French.jpg", title: "French", link: "/courses/french" },
    { id: 3, img: "/ielts.jpg", title: "IELTS", link: "/courses/ielts" },
    { id: 4, img: "/pte.jpg", title: "PTE", link: "/courses/pte" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "This platform transformed my communication skills! The lessons are well structured and interactive.",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback:
        "I love learning at my own pace. The teachers make every session enjoyable and insightful!",
    },
    {
      id: 3,
      name: "Alice Johnson",
      feedback:
        "The community support and live practice sessions helped me gain real confidence in speaking.",
    },
  ];

  const prices = [
    {
      id: 1,
      plan: "Basic",
      features: [
        "Access to beginner courses",
        "Community support",
        "Monthly webinars",
        "3 Months Course Access"
      ],
      price: "300",
    },
    {
      id: 2,
      plan: "Standard",
      features: [
        "Access to course",
        "Priority support",
        "Weekly webinars",
        "Certificate of completion",
        "6 Months Course Access"
      ],
      price: "600",
    },
    {
      id: 3,
      plan: "Premium",
      features: [
        "1-on-1 mentorship",
        "Personalized study plan",
        "Certificate & placement support",
        "12 Months Course Access",
      ],
      price: "1000",
    },
  ];

  return (
    <div className="text-black scroll-smooth">
      <section className="relative w-full h-[520px] flex items-center justify-center text-center overflow-hidden mt-10">
        <Image
          src="/group2.jpg"
          alt="Group Learning"
          fill
          priority
          className="object-cover brightness-75"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl leading-tight">
            Unlock Your Potential <br /> with a New Language
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 opacity-90">
            Master English and French with our interactive, practical and engaging lessons designed by experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/courses">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 hover:scale-105 transition-transform shadow-lg">
                Enroll Now
              </button>
            </Link>
            <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-transform shadow-lg">
              Watch Sample Lesson
            </button>
          </div>
        </motion.div>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/contactus">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-xl hover:opacity-90 hover:scale-105 transition">
            <Phone className="inline-block" />
          </button>
        </Link>
      </div>


      <section className="bg-[#f3f6fb] py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-14 text-[#155DFC]"
        >
          Featured Courses
        </motion.h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition"
            >
              <div className="relative w-full h-56">
                <Image
                  src={course.img}
                  alt={course.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{course.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-lg">
                    ${course.price}
                  </span>
                  <Link href="/courses">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Enroll
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10 text-[#155DFC]">Choose Your Course</h2>
        <div className="flex justify-center flex-wrap gap-8">
          {languages.map((lang) => (
            <motion.div
              key={lang.id}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden w-[300px] h-[200px] shadow-md hover:shadow-xl"
            >
              <Link href={lang.link}>
                <Image src={lang.img} alt={lang.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold tracking-wide">
                    {lang.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#f3f6fb] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-[#155DFC]">What Our Students Say</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testi) => (
            <motion.div
              key={testi.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                {testi.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-lg mb-2">{testi.name}</h3>
              <p className="text-gray-600 italic">"{testi.feedback}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#155DFC]">Flexible Pricing Plans</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Choose a plan that fits your learning goals. Upgrade, downgrade, or cancel anytime.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {prices.map((price, i) => (
            <motion.div
              key={price.id}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl p-8 bg-white shadow-lg hover:shadow-2xl transition transform ${i === 1 ? "border-2 border-blue-500" : ""
                }`}
            >
              <h3 className={`text-2xl font-bold mb-4 ${i === 1 ? "text-blue-600" : "text-gray-800"
                }`}>
                {price.plan}
              </h3>
              <ul className="text-gray-700 mb-6 text-left space-y-2">
                {price.features.map((f, index) => (
                  <li key={index}>{f}</li>
                ))}
              </ul>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                ${price.price}
                <span className="text-sm text-gray-500">/month</span>
              </p>
              <button
                className={`w-full py-3 rounded-xl font-semibold ${i === 1
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:opacity-90"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <Leadform />
      </section>

      <section className="bg-[#f3f6fb] py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-700 mb-4">Subscribe to our newsletter and never miss an update.</p>
            <div className="flex flex-wrap justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-l-md border border-gray-300 focus:outline-none w-64"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-r-md hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
            <p className="text-gray-700 mb-4">Have questions? We're here for you 24/7.</p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full hover:opacity-90 transition-transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
