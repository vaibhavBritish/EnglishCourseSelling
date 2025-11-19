"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/component/AdminLayout";

const EditCourse = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState<any>({
    title: "",
    description: "",
    price: "",
    category: "",
    duration: "",
    imageUrl: "",
  });
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/admin/course/${courseId}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourse((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...course,
        price: parseFloat(course.price),
        duration: parseInt(course.duration),
        imageBase64: imageBase64 || undefined,
      };

      const res = await fetch(`/api/admin/course/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update course");
      alert("Course updated successfully!");
      router.push("/admin/courses");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">Edit Course</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            Title
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              className="border p-2 rounded mt-1"
              required
            />
          </label>

          <label className="flex flex-col">
            Description
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              className="border p-2 rounded mt-1"
              rows={4}
              required
            />
          </label>

          <label className="flex flex-col">
            Price
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="border p-2 rounded mt-1"
              required
            />
          </label>

          <label className="flex flex-col">
            Category
            <select
              name="category"
              value={course.category}
              onChange={handleChange}
              className="border p-2 rounded mt-1"
              required
            >
              <option value="">Select Category</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="IELTS">IELTS</option>
              <option value="pte">PTE</option>
            </select>
          </label>

          <label className="flex flex-col">
            Duration
            <input
              type="number"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              className="border p-2 rounded mt-1"
              required
            />
          </label>

          <label className="flex flex-col">
            Image
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1" />
          </label>

          {imageBase64 ? (
            <img src={imageBase64} alt="Preview" className="w-64 h-40 object-cover mt-2 rounded" />
          ) : (
            course.imageUrl && (
              <img src={course.imageUrl} alt="Course" className="w-64 h-40 object-cover mt-2 rounded" />
            )
          )}

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mt-4 transition-all duration-200"
          >
            Update Course
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditCourse;