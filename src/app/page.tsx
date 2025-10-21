import Image from "next/image";
import { features } from "process";

export default function Home() {
  const courses = [
    {
      id: 1,
      img: "/Power-of-English.jpg",
      title: "Beginner's English",
      desc: "Master the fundamentals of English with our comprehensive beginner's course.",
      price: "59",
    },
    {
      id: 2,
      img: "/Learn French.jpg",
      title: "Intermediate French",
      desc: "Take your French to the next level with our engaging intermediate course.",
      price: "69",
    },
    {
      id: 3,
      img: "/advancedEnglish.jpg",
      title: "Advanced English",
      desc: "Perfect your English fluency with our advanced course for professionals.",
      price: "79",
    },
  ];

  const language = [
    {
      id: 1,
      img: "/advancedEnglish.jpg",
      title: "English"
    },
    {
      id: 2,
      img: "/Learn French.jpg",
      title: "French"
    }
  ]

  const testimonials = [
    {
      id: 1,
      img: "",
      name: "John Doe",
      feedback: "This platform transformed my language skills! The courses are engaging and effective."
    },
    {
      id: 2,
      img: "",
      name: "Jane Smith",
      feedback: "I love the flexibility of learning at my own pace. The instructors are fantastic!"
    },
    {
      id: 3,
      img: "",
      name: "Alice Johnson",
      feedback: "The community support is amazing. I've made so many friends while learning!"
    },
    {
      id: 4,
      img: "",
      name: "Michael Brown",
      feedback: "The course content is top-notch. I've seen significant improvement in my language abilities."
    }
  ]
  const prices = [
    {
      id: 1,
      plan: "Basic",
      features: ["Access to all beginner courses", "Community support", "Monthly webinars"],
      price: "19"
    },
    {
      id: 2,
      plan: "Standard",
      features: ["Access to all courses", "Priority support", "Weekly webinars", "Certificate of completion"],
      price: "49"
    },
    {
      id: 3,
      plan: "Premium",
      features: ["Access to all courses", "Priority support", "Monthly webinars", "Certificate of completion", "Personalized learning plan"],
      price: "99"
    },
  ]
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <div className="relative w-full max-w-6xl h-[450px] rounded-lg overflow-hidden">
          <Image
            src="/group2.webp"
            alt="Group"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 p-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Unlock Your Potential with a New Language
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">
              Master English and French with our engaging and effective online courses. Start your journey today.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition">
                Enroll Now
              </button>
              <button className="bg-white text-black px-6 py-3 rounded-md transition">
                Watch Sample Lesson
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-16 px-4 bg-[#eaf0f7] p-10 text-black">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative w-full h-56">
                <Image
                  src={course.img}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-700 mb-4">{course.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-semibold text-blue-600">${course.price}</span>
                  <button className="bg-[#eaf0f7] text-blue-600 font-semibold px-4 py-2 rounded-md transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 mx-auto">
        <div>
          <h1 className="font-bold text-3xl text-center text-black">Choose Your Language</h1>
          <div className="flex justify-center gap-10 mt-10 flex-wrap">
            {language.map((lang) => (
              <div
                key={lang.id}
                className="relative w-auto h-auto rounded-lg overflow-hidden hover:shadow-lg transition hover:scale-105"
              >
                <Image
                  src={lang.img}
                  alt={lang.title}
                  height={350}
                  width={400}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h2 className="text-white text-xl font-semibold text-center">
                    {lang.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf0f7] p-10 mt-16 mx-auto text-center">
        <h1 className="text-2xl font-bold text-black">What Our Students Say</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {testimonials.map((testi) => (
            <div key={testi.id}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white">
                    {testi.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-xl text-black font-semibold mb-2">{testi.name}</h3>
                <p className="text-gray-700 italic">"{testi.feedback}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="mt-16 mx-auto text-black py-16">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-4">
          Flexible Pricing Plans
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Choose a plan that fits your needs. Upgrade, downgrade, or cancel anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
          {prices.map((price, index) => (
            <div
              key={price.id}
              className={`max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl ${index === 1 ? "border-4 border-blue-500" : "border border-gray-200"
                }`}
            >
              <div className="p-8 flex flex-col justify-between h-full">
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 text-center ${index === 1 ? "text-blue-600" : "text-gray-800"
                      }`}
                  >
                    {price.plan}
                  </h2>

                  {index === 1 && (
                    <p className="text-sm text-blue-600 bg-blue-100 font-semibold text-center rounded-full w-28 mx-auto mb-4 py-1">
                      Most Popular
                    </p>
                  )}

                  <ul className="mb-6">
                    {price.features.map((feature, i) => (
                      <li key={i} className="flex items-center mb-2">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center mt-6">
                  <span className="text-4xl font-extrabold text-blue-600">
                    {price.price === "Contact Us"
                      ? price.price
                      : `$${price.price}`}
                  </span>
                  {price.price !== "Contact Us" && (
                    <span className="text-gray-500 text-sm"> /month</span>
                  )}

                  <button
                    className={`mt-6 w-full py-3 font-semibold rounded-xl transition-all ${index === 1
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 text-black p-10 bg-[#eaf0f7] mx-auto">
        <div className="flex justify-between max-w-6xl mx-auto flex-wrap gap-6">
          <div>
            <h1 className="font-bold mb-2 text-2xl">Stay Updated</h1>
            <p>Subscribe to our newsletter to get the latest news and updates.</p>
            <div>
              <input type="email" placeholder="Enter your email" className="p-2 rounded-l-md border border-gray-300 focus:outline-none" />
              <button className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition">Subscribe</button>
            </div>
          </div>

          <div>
            <h1 className="font-bold  mb-2 text-2xl">Contact Us</h1>
            <p>Have Questions? We're here to help. Reach out to us anytime</p>
            <button className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition">Get in Touch</button>
          </div>
        </div>
      </section>

    </div>
  );
}
