"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { setCourses } from "../../../../../redux/courseSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Plus } from "lucide-react";

const CoursesByIDinAdmin = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [admin, setAdmin] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editVideo, setEditVideo] = useState<any>(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.user || !data.user.isAdmin) {
          router.push("/auth/login?message=Access Denied");
          return;
        }
        setAdmin(data.user);
      } catch (error) {
        router.push("/auth/login?message=Authentication failed");
      }
    };
    checkAuth();
  }, [router]);

 
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/course/${id}`);
        const data = await res.json();
        if (data.course || data) {
          setCourse(data.course || data);
          dispatch(setCourses([data.course || data]));
        } else {
          setError("Course not found");
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id, dispatch]);

  
  const handleDelete = async (videoId: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const res = await fetch(`/api/admin/video/${videoId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setCourse({
          ...course,
          videos: course.videos.filter((v: any) => v.id !== videoId),
        });
      } else {
        alert(data.message || "Failed to delete video");
      }
    } catch {
      alert("Error deleting video");
    }
  };

  const handleEdit = async () => {
    if (!newTitle.trim()) return alert("Title cannot be empty!");

    try {
      const res = await fetch(`/api/admin/video/${editVideo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await res.json();

      if (data.success) {
        setCourse({
          ...course,
          videos: course.videos.map((v: any) =>
            v.id === editVideo.id ? { ...v, title: newTitle } : v
          ),
        });
        setEditVideo(null);
        setNewTitle("");
      } else {
        alert("Failed to update video title");
      }
    } catch {
      alert("Error updating video");
    }
  };


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading course details...
      </div>
    );


  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
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

  if (!admin)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Verifying admin access...
      </div>
    );

  if (!course)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        No course data found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 relative">
      <Link
        href="/admin/courses/video"
        className="fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 text-lg font-medium transition"
      >
        <Plus size={22} /> Add Video
      </Link>

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {course.title}
        </h1>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-medium">
            💰 ${course.price}
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl font-medium">
            ⏳ {course.duration || "N/A"} months
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl font-medium">
            📅 {new Date(course.createdAt).toLocaleDateString()}
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🎥 Course Videos
        </h2>

        {course.videos && course.videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {course.videos.map((video: any) => (
              <div
                key={video.id}
                className="group bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full h-52 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition">
                    {video.title}
                  </h3>
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => {
                        setEditVideo(video);
                        setNewTitle(video.title);
                      }}
                      className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic mt-3">No videos uploaded yet.</p>
        )}
      </div>

      {/* 🪄 Edit Video Modal */}
      {editVideo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b pb-2">
              ✏️ Edit Video Title
            </h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new video title"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditVideo(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesByIDinAdmin;
