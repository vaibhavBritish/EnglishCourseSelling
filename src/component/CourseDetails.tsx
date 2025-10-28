"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logged-in user from /api/auth/me
  async function getCurrentUser() {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include", // include HTTP-only cookies
      });
      const data = await res.json();
      return data.user; // either { id, email, username } or null
    } catch (err) {
      console.error("Error fetching current user:", err);
      return null;
    }
  }

  // ✅ Fetch course details
  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ✅ Handle success/cancel redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");

    if (paymentStatus === "success") {
      alert("✅ Payment successful! You now have access to the videos.");
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchCourse();
    } else if (paymentStatus === "cancelled") {
      alert("Payment cancelled. Try again anytime.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ✅ Enroll handler with real user check
  const handleEnroll = async () => {
    const user = await getCurrentUser();
    if (!user) {
      alert("Please login first to enroll in this course.");
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ensure cookies are sent
        body: JSON.stringify({ courseId: id, userId: user.id }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe checkout
      } else {
        console.error("No session URL returned:", data);
        alert("Unable to start checkout session.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Payment initiation failed.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-blue-600">
        Loading...
      </div>
    );

  if (!course)
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Course not found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-black">
      {/* ✅ Course Image */}
      <div className="relative w-full h-64 mb-6">
        <Image
          src={course.imageUrl || "/defaultCourse.jpg"}
          alt={course.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* ✅ Course Info */}
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-6">{course.description}</p>

      <div className="flex items-center justify-between mb-8">
        <p className="text-lg font-semibold">💰 Price: ${course.price}</p>
        {course.hasAccess ? (
          <span className="text-green-600 font-semibold">
            Enrolled ✓ You have full access
          </span>
        ) : (
          <button
            onClick={handleEnroll}
            className="bg-[#155DFC] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Enroll Now
          </button>
        )}
      </div>

      <hr className="my-8" />

      {/* ✅ Course Videos */}
      {course.hasAccess ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Course Videos</h2>
          <div className="space-y-4">
            {course.videos?.length > 0 ? (
              course.videos.map((video: any) => (
                <div
                  key={video.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold mb-2">{video.title}</h3>
                  <video
                    src={video.videoUrl}
                    controls
                    className="w-full rounded-lg"
                  ></video>
                </div>
              ))
            ) : (
              <p>No videos available yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 italic text-center py-8">
          🔒 Please enroll to view all course videos.
        </p>
      )}
    </div>
  );
}
