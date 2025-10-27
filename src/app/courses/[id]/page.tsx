"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`/api/admin/course/${id}`);
      const data = await res.json();
      setCourse(data.course || data);
    };
    if (id) fetchCourse();
  }, [id]);

  if (!course)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading course details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
  
      <div className="relative bg-white shadow-md rounded-xl m-6 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={course.imageUrl || "/placeholder-course.jpg"}
            alt={course.title}
            className="w-full md:w-1/3 h-56 object-cover rounded-xl shadow-sm"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {course.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {course.category || "General"}
              </span>
              {course.duration && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                  {course.duration} hrs
                </span>
              )}
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                ₹{course.price}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="m-6 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-900">
          Course Videos
        </h2>

        {course.videos?.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {course.videos.map((video: any) => (
              <div
                key={video.id}
                className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-gray-50"
              >
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600">
                    {video.title}
                  </h3>
                  {video.duration && (
                    <p className="text-sm text-gray-500 mt-1">
                      Duration: {video.duration} mins
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic mt-6">No videos added yet.</div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
