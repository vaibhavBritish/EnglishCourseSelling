'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("/api/contactus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMsg("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMsg(data.error || "❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error(error);
      setResponseMsg("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <div className="relative w-full h-64 md:h-[420px]">
        <Image
          src="/contactUs.jpg"
          alt="Contact Us Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide">
            Contact Us
          </h1>
          <p className="text-sm md:text-lg max-w-2xl">
            We’d love to hear from you! Whether you have a question or feedback, our team is here to help.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get In Touch</h2>
          <p className="text-gray-600 leading-relaxed">
            Reach out to us via the contact form or use the details below.
            Our support team will get back to you within 24 hours.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Address:</h3>
              <p className="text-gray-600">123 Main Street, Delhi, New Delhi, India</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone:</h3>
              <p className="text-gray-600">+91 9876 54321</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email:</h3>
              <p className="text-gray-600">support@example.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors duration-300 disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {responseMsg && (
              <p className="text-center mt-3 text-sm text-gray-700">{responseMsg}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs