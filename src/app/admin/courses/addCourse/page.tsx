"use client";
import React, { useState } from "react";

const AddCourses = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    duration: "",
    imageBase64: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imageBase64: reader.result as string }));
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/admin/course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
    } else {
      alert("Course Added Successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        duration: "",
        imageBase64: "",
      });
      setPreview(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gradient-to-br from-indigo-100 to-gray-200 px-4 py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Add New Course</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input type="text" name="title" value={formData.title} onChange={handleChange}
            placeholder="Enter course title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />

          <textarea name="description" value={formData.description} onChange={handleChange}
            placeholder="Enter course description" rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none" required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="number" name="price" value={formData.price} onChange={handleChange}
              placeholder="Price (₹)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
            <input type="text" name="category" value={formData.category} onChange={handleChange}
              placeholder="Category" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          <input type="number" name="duration" value={formData.duration} onChange={handleChange}
            placeholder="Duration (in hours)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />

          <div>
            <label htmlFor="image" className="block mb-2 font-medium text-gray-700">Upload Thumbnail</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 outline-none" required />
            {preview && (
              <div className="mt-4 flex justify-center">
                <img src={preview} alt="Course Preview" className="w-48 h-32 object-cover rounded-lg border border-gray-300" />
              </div>
            )}
          </div>

          <button type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-base px-5 py-3 transition-all duration-200 shadow-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourses;
