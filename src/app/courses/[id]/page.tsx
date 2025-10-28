"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Fetch user
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

  // Fetch course
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

  // Loading state
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-blue-600 font-medium">
        Loading course details...
      </div>
    );

  // Not found
  if (!course)
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-semibold">
        Course not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative w-full h-72">
          <Image
            src={course.imageUrl || "/defaultCourse.jpg"}
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <h1 className="text-4xl font-bold text-white drop-shadow-md">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Course Info */}
        <div className="px-8 py-6">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {course.description}
          </p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <p className="text-xl font-semibold text-gray-800">
              💰 Price: <span className="text-blue-600">${course.price}</span>
            </p>

            {course.hasAccess ? (
              <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium shadow-sm">
                ✅ Enrolled – Full Access Granted
              </span>
            ) : (
              <button
                onClick={handleEnroll}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200"
              >
                Enroll Now
              </button>
            )}
          </div>

          <hr className="border-gray-200 mb-10" />

          {/* Videos Section */}
          {course.hasAccess ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                🎬 Course Videos
              </h2>

              {course.videos?.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {course.videos.map((video: any) => (
                    <div
                      key={video.id}
                      className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition p-4"
                    >
                      <h3 className="font-semibold mb-2 text-gray-800 truncate">
                        {video.title}
                      </h3>
                      <video
                        src={video.videoUrl}
                        controls
                        className="w-full rounded-lg border border-gray-300"
                      ></video>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No videos uploaded yet. Please check back later.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 italic bg-gray-50 rounded-xl">
              🔒 Enroll in this course to unlock all videos and resources.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
