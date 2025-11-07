import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Sharma",
    image: "/user1.jpg",
    review:
      "The English course helped me gain confidence in speaking fluently. The lessons are practical, engaging, and very well structured.",
    rating: 5,
    course: "English Speaking Course",
  },
  {
    name: "Priya Mehta",
    image: "/user2.jpg",
    review:
      "I absolutely loved the French classes! The teachers make learning fun and easy to understand, even for beginners.",
    rating: 4,
    course: "French Beginner Course",
  },
  {
    name: "Rohit Verma",
    image: "/user3.jpg",
    review:
      "The best online language platform! I could learn at my own pace and still feel connected with the instructors.",
    rating: 5,
    course: "German Intermediate Course",
  },
  {
    name: "Sana Khan",
    image: "/user4.jpg",
    review:
      "Excellent content and great support team. The platform is smooth, and lessons are top quality!",
    rating: 5,
    course: "English Advanced Course",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-50">

      <section className="bg-gradient-to-r from-blue-200 mt-10 to-indigo-700 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Hear From Our Learners
          </h1>
          <p className="text-lg text-gray-200">
            Real experiences. Real transformations. Discover how our students improved their language skills and confidence.
          </p>
        </div>
      </section>

  
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#155DFC] mb-4">Student Testimonials</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Hear from learners who’ve transformed their communication skills through our courses.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300 text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.course}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">{t.review}</p>

                <div className="flex text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
