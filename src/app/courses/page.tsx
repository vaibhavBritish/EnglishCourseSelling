"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../../redux/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const courses = useSelector((state: any) => state.course.courses);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/admin/course");
        const data = await res.json();

        if (Array.isArray(data)) {
          dispatch(setCourses(data));
        } else if (data.courses) {
          dispatch(setCourses(data.courses));
        } else {
          dispatch(setCourses([]));
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch]);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] bg-white text-blue-600">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold">Fetching Courses...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <p className="text-red-600 font-semibold text-lg mb-3">
          Oops! Something went wrong.
        </p>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="text-black">
      <div className="relative w-full h-64 md:h-[420px]">
        <Image
          src="/coursesBanner.jpg"
          alt="Courses Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Our Courses</h1>
          <p className="text-base md:text-lg max-w-2xl">
            Master English or French with interactive, structured, and practical
            online lessons designed to boost your fluency and confidence.
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#155DFC]">
          Explore Our Language Programs
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Whether you're a beginner or aiming for professional-level fluency,
          our courses are crafted to fit your goals. Each course includes
          structured lessons, live speaking sessions, grammar practice, and
          cultural insights to help you communicate confidently in real-life
          situations.
        </p>
      </section>


      {courses.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          No courses available at the moment.
        </p>
      ) : (
        <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course: any) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-48">
                <Image
                  src={course.imageUrl || "/defaultCourse.jpg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {course.description.length > 120
                    ? `${course.description.slice(0, 120)}...`
                    : course.description}
                </p>

                <ul className="text-gray-700 text-sm space-y-1 mb-4">
                  <li>🕒 Duration: {course.duration || "NA"} Months</li>
                  <li>🎯 Level: {course.level || "Beginner"}</li>
                  <li>💰 Price: ₹{course.price || "NA"}</li>
                </ul>

                <button className="w-full bg-[#155DFC] text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#155DFC]">
            Why Learn With Us?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-10">
            Our courses are designed by certified language experts who combine
            academic structure with real-world use. Learn in small groups,
            practice speaking daily, and receive personalized feedback from your
            instructor.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "📚 Structured Learning",
                desc: "Step-by-step lessons that guide you from beginner to fluent speaker.",
              },
              {
                title: "🗣️ Live Speaking Practice",
                desc: "Improve pronunciation and confidence with interactive sessions.",
              },
              {
                title: "🎓 Certified Trainers",
                desc: "Learn from TESOL & DELF-certified instructors with global experience.",
              },
              {
                title: "🌎 Cultural Immersion",
                desc: "Understand how native speakers think and express themselves naturally.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-semibold mb-2 text-black">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#155DFC] text-white py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Start Your Language Journey Today!
        </h2>
        <p className="max-w-2xl mx-auto mb-6">
          Join thousands of learners who’ve transformed their communication
          skills with us. Choose your course and begin your journey toward
          fluency.
        </p>
        <button className="bg-white text-[#155DFC] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          View All Courses
        </button>
      </section>
    </div>
  );
};

export default Courses;
