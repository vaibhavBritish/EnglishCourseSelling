import Image from "next/image";

export default function Home() {
  const courses = [
    {
      id: 1,
      img: "/Power-of-English.jpg",
      title: "Beginner's English",
      desc: "Master the fundamentals of English with easy, engaging lessons and real-world examples.",
      price: "59",
    },
    {
      id: 2,
      img: "/Learn French.jpg",
      title: "Intermediate French",
      desc: "Build on your French foundation with conversational and cultural learning modules.",
      price: "69",
    },
    {
      id: 3,
      img: "/advancedEnglish.jpg",
      title: "Advanced English",
      desc: "Perfect your English fluency and confidence for business and global communication.",
      price: "79",
    },
  ];

  const language = [
    { id: 1, img: "/advancedEnglish.jpg", title: "English" },
    { id: 2, img: "/Learn French.jpg", title: "French" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "This platform transformed my communication skills! The lessons are well structured and interactive.",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback:
        "I love learning at my own pace. The teachers make every session enjoyable and insightful!",
    },
    {
      id: 3,
      name: "Alice Johnson",
      feedback:
        "The community support and live practice sessions helped me gain real confidence in speaking.",
    },
  ];

  const prices = [
    {
      id: 1,
      plan: "Basic",
      features: [
        "Access to beginner courses",
        "Community support",
        "Monthly webinars",
      ],
      price: "19",
    },
    {
      id: 2,
      plan: "Standard",
      features: [
        "Access to all courses",
        "Priority support",
        "Weekly webinars",
        "Certificate of completion",
      ],
      price: "49",
    },
    {
      id: 3,
      plan: "Premium",
      features: [
        "All-access learning",
        "1-on-1 mentorship",
        "Personalized study plan",
        "Certificate & placement support",
      ],
      price: "99",
    },
  ];

  return (
    <div className="text-black">
      <section className="relative w-full h-[480px] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/group2.jpg"
          alt="Group Learning"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Unlock Your Potential with a New Language
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-6">
            Master English and French with our interactive and effective online
            learning platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition">
              Enroll Now
            </button>
            <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Watch Sample Lesson
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#eaf0f7] py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#155DFC]">
          Featured Courses
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="relative w-full h-56">
                <Image
                  src={course.img}
                  alt={course.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-lg">
                    ${course.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-10 text-[#155DFC]">
          Choose Your Language
        </h2>
        <div className="flex justify-center flex-wrap gap-10">
          {language.map((lang) => (
            <div
              key={lang.id}
              className="relative rounded-2xl overflow-hidden hover:scale-105 transition-transform w-[350px] h-[250px]"
            >
              <Image
                src={lang.img}
                alt={lang.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">
                  {lang.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#eaf0f7] py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-[#155DFC]">
          What Our Students Say
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                {testi.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-lg mb-2">{testi.name}</h3>
              <p className="text-gray-600 italic">"{testi.feedback}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#155DFC]">
          Flexible Pricing Plans
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Choose a plan that fits your learning goals. Upgrade, downgrade, or
          cancel anytime.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {prices.map((price, i) => (
            <div
              key={price.id}
              className={`rounded-2xl p-8 bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 ${i === 1 ? "border-2 border-blue-500" : ""
                }`}
            >
              <h3
                className={`text-2xl font-bold mb-4 ${i === 1 ? "text-blue-600" : "text-gray-800"
                  }`}
              >
                {price.plan}
              </h3>
              <ul className="text-gray-700 mb-6 text-left space-y-2">
                {price.features.map((f, index) => (
                  <li key={index}>✅ {f}</li>
                ))}
              </ul>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                ${price.price}
                <span className="text-sm text-gray-500">/month</span>
              </p>
              <button
                className={`w-full py-3 rounded-xl font-semibold ${i === 1
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#eaf0f7] py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-700 mb-4">
              Subscribe to our newsletter and never miss an update.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-l-md border border-gray-300 focus:outline-none w-64"
              />
              <button className="bg-blue-600 text-white px-5 py-3 rounded-r-md hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              Have questions? We're here for you 24/7.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}