"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";



type VideoType = {
  id: string;
  title: string;
  videoUrl: string;
};

type CourseType = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  hasAccess?: boolean;
  videos?: VideoType[];
};

type UserType = {
  id: string;
  name?: string;
  email?: string;
};



export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      setUser(data.user as UserType);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`, { cache: "no-store" });
      const data = await res.json();
      setCourse(data as CourseType);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
    fetchCourse();
  }, [id]);

  // Payment success handler
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    const sessionId = params.get("session_id");

    if (paymentStatus === "success") {
      const confirm = async () => {
        try {
          if (sessionId) {
            await fetch(`/api/stripe/session?session_id=${sessionId}`, { cache: "no-store" });
          }
        } catch (err) {
          console.log(err);
        }
        await fetchCourse();
        alert("Payment successful! You now have access.");
        window.history.replaceState({}, "", `/courses/${id}`);
      };
      confirm();
    }
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return alert("Please login first to enroll.");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ courseId: id, userId: user.id }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-indigo-600 text-xl font-semibold">
        Loading...
      </div>
    );

  if (!course)
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl font-bold">
        Course Not Found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              {course.title}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {course.description?.slice(0, 250)}...
            </p>

            <div className="flex items-center gap-5 mb-8">
              <p className="text-3xl font-bold text-indigo-600">${course.price}</p>

              {course.hasAccess ? (
                <span className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold text-sm">
                  <CheckCircle size={18} /> Enrolled
                </span>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all"
                >
                  Enroll Now
                </button>
              )}
            </div>

            {!course.hasAccess && (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
                <p className="text-gray-600 text-center italic">
                  Unlock lifetime access to all videos and resources.
                </p>
              </div>
            )}
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src={course.imageUrl || "/defaultCourse.jpg"}
              alt={course.title}
              fill
              priority
              className="object-cover object-center scale-105 hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>

      
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Videos</h2>

          {course.hasAccess ? (
            course.videos && course.videos.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {course.videos.map((video: VideoType) => (
                  <motion.div
                    key={video.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="relative h-48 w-full">
                      <video src={video.videoUrl} controls className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 truncate">{video.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No videos available yet.</p>
            )
          ) : (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-md">
              <Lock className="mx-auto mb-4 text-gray-500" size={40} />
              <p className="text-gray-600 text-lg italic">Purchase the course to unlock all content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
