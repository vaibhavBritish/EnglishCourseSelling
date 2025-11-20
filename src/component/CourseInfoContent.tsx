"use client";

import React from "react";
import { Course } from "@prisma/client";
import Image from "next/image";
import { motion } from "framer-motion";
import Leadform from "./Leadform";

interface CourseInfoContentProps {
  course: Course;
}

const CourseInfoContent: React.FC<CourseInfoContentProps> = ({ course }) => {

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
    <div className="mt-32 text-black bg-gray-50 pb-20">
      <div className="relative w-full h-[450px] shadow-xl rounded-b-3xl overflow-hidden">
        <Image
          src={course.imageUrl || "/defaultCourse.jpg"}
          alt={course.title}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-10 left-10 text-white max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold drop-shadow-xl"
          >
            {course.title}
          </motion.h1>
        </div>
      </div>

      <div className="px-6 max-w-6xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">About This Course</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">{course.description}</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{course.description_more}</p>

          <div className="my-6 bg-gray-50 p-5 rounded-xl border border-gray-200 inline-flex items-center gap-3">
            <span className="font-semibold text-2xl text-gray-700">Price:</span>
            <span className="text-3xl font-bold text-blue-600">${course.price}</span>
          </div>

          <p className="mt-6 text-gray-600 text-lg">
            <strong>Category:</strong> {course.category}
          </p>
        </motion.div>

        {/* <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Subscription Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a plan that fits you best. Upgrade anytime and enjoy unlimited access.
          </p>
        </div> */}

      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#155DFC]">
          Subscription Plans
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Choose a plan that fits your learning goals. Upgrade, downgrade, or
          cancel anytime.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {prices.map((price, i) => (
            <motion.div
              key={price.id}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl p-8 bg-white shadow-lg hover:shadow-2xl transition transform ${
                i === 1 ? "border-2 border-blue-500" : ""
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-4 ${
                  i === 1 ? "text-blue-600" : "text-gray-800"
                }`}
              >
                {price.plan}
              </h3>
              <ul className="text-gray-700 mb-6 text-left space-y-2">
                {price.features.map((f, index) => (
                  <li key={index}> {f}</li>
                ))}
              </ul>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                ${price.price}
                <span className="text-sm text-gray-500">/month</span>
              </p>
              <button
                className={`w-full py-3 rounded-xl font-semibold ${
                  i === 1
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
        <Leadform/>
      </section>
      </div>
    </div>
  );
};

export default CourseInfoContent;

