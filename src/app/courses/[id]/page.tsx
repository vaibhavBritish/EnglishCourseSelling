"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Lock, CheckCircle } from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`, { cache: "no-store" });
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCourse();
  }, [id]);

  // Handle payment status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    const sessionId = params.get("session_id");

    if (paymentStatus === "success") {
      const confirm = async () => {
        try {
          if (sessionId) {
            await fetch(`/api/stripe/session?session_id=${sessionId}`, {
              cache: "no-store",
            });
          }
        } catch {
          // ignore
        } finally {
          await fetchCourse();
          alert("✅ Payment successful! You now have access to the videos.");
          window.history.replaceState({}, "", `/courses/${id}`);
        }
      };
      confirm();
    } else if (paymentStatus === "cancelled") {
      alert("Payment cancelled. Try again anytime.");
    }
  }, [id]);

  // Handle enrollment
  const handleEnroll = async () => {
    if (!user) {
      alert("Please login first to enroll in this course.");
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ courseId: id, userId: user.id }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to start checkout session.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Payment initiation failed.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-blue-600 font-medium text-lg">
        Loading course details...
      </div>
    );

  if (!course)
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-semibold">
        Course not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 mt-20 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden rounded-b-[3rem]">
        <Image
          src={course.imageUrl || "/defaultCourse.jpg"}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-16 left-10 max-w-3xl text-white"
        >
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            {course.title}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
            {course.description?.slice(0, 160)}...
          </p>
        </motion.div>
      </div>

      {/* Course Info Section */}
      <div className="max-w-6xl mx-auto mt-[-80px] relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Learn from top instructors and gain practical skills.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold text-gray-900">
                💰 <span className="text-indigo-600">${course.price}</span>
              </p>

              {course.hasAccess ? (
                <span className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium">
                  <CheckCircle size={18} /> Enrolled
                </span>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Videos Section */}
          {course.hasAccess ? (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                🎬 Course Videos
              </h3>
              {course.videos?.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {course.videos.map((video: any) => (
                    <motion.div
                      key={video.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
                    >
                      <div className="relative h-48 w-full">
                        <video
                          src={video.videoUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {video.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No videos uploaded yet. Please check back later.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 italic bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-2xl shadow-inner">
              <Lock className="mx-auto mb-4 text-gray-500" size={40} />
              Enroll in this course to unlock all videos and resources.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
