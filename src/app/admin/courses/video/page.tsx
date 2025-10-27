"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../../../../redux/courseSlice";
import { useRouter } from "next/navigation";
import { UploadCloud, Video, Loader2 } from "lucide-react";

const VideoUpload = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const courses = useSelector((state: any) => state.course.courses);

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    videoFile: null as File | null,
    courseId: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!data.user || !data.user.isAdmin) {
          router.push("/auth/login?message=Access denied");
          return;
        }
        setAdmin(data.user);
      } catch {
        router.push("/auth/login?message=Authentication failed");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/admin/course");
        const data = await res.json();
        if (data.courses) dispatch(setCourses(data.courses));
        else setMessage("⚠️ Failed to load courses.");
      } catch {
        setMessage("❌ Error fetching courses.");
      }
    };
    fetchCourses();
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, videoFile: file }));
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courseId || !formData.videoFile) {
      setMessage("⚠️ Please select a course and upload a video.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const videoBase64 = await toBase64(formData.videoFile);
      const res = await fetch("/api/admin/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          duration: Number(formData.duration),
          courseId: formData.courseId,
          videoBase64,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("✅ Video uploaded successfully!");
        setFormData({
          title: "",
          duration: "",
          videoFile: null,
          courseId: "",
        });
        setPreviewUrl(null);
      } else {
        setMessage(`❌ Upload failed: ${data.message || "Try again."}`);
      }
    } catch {
      setMessage("⚠️ Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !admin) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6 flex justify-center text-black">
      <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <UploadCloud className="text-red-500 w-8 h-8" />
          <h1 className="text-3xl font-bold text-gray-800">Upload Course Video</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Select Course</label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
              required
            >
              <option value="">-- Select a Course --</option>
              {courses?.map((course: any) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

      
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Video Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter video title"
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
              required
            />
          </div>

          
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">
              Duration (minutes)
            </label>
            <input
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 10"
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
              required
            />
          </div>

     
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-red-400 rounded-2xl p-6 hover:bg-red-50 transition">
            <label
              htmlFor="video"
              className="cursor-pointer flex flex-col items-center text-gray-600"
            >
              <Video className="w-10 h-10 text-red-400 mb-2" />
              <span className="font-medium">Click to upload video</span>
              <span className="text-sm text-gray-400 mt-1">
                {formData.videoFile ? formData.videoFile.name : "MP4, MOV, AVI..."}
              </span>
            </label>
            <input
              id="video"
              name="video"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </div>

       
          {previewUrl && (
            <div className="mt-4">
              <video
                src={previewUrl}
                controls
                className="w-full rounded-lg shadow-sm border border-gray-200"
              />
            </div>
          )}

   
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center font-semibold ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
