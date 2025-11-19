"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";

const Leadform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        setResponseMsg(" Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMsg(data.error || " Failed to send message. Try again.");
      }
    } catch (error) {
      console.error(error);
      setResponseMsg(" Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-20 mb-10 flex justify-center px-4 text-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-10 relative overflow-hidden"
      >
      
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl"></div>

        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="text-blue-600" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">
            Have Questions? Let's Talk!
          </h2>
        </div>

    
        <form onSubmit={handleSubmit} className="space-y-5">
         
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="peer w-full border border-gray-300 bg-white/60 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-2 peer-valid:text-xs bg-white/60 px-2">
              Your Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="peer w-full border border-gray-300 bg-white/60 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-2 peer-valid:text-xs bg-white/60 px-2">
              Your Email
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="peer w-full border border-gray-300 bg-white/60 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-2 peer-valid:text-xs bg-white/60 px-2">
              Subject
            </label>
          </div>

          <div className="relative">
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="peer w-full border border-gray-300 bg-white/60 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-all"
              required
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-2 peer-valid:text-xs bg-white/60 px-2">
              Your Message
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all"
          >
            {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
          </motion.button>

          {responseMsg && (
            <p className="text-center mt-3 text-sm font-medium text-gray-700">
              {responseMsg}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Leadform;
