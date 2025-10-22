import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
    return (
        <div className="text-black">
            <div className="relative w-full h-64 md:h-[480px]">
                <Image
                    src="/aboutUsBanner.webp"
                    alt="About Us Banner"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">About Us</h1>
                    <p className="text-base md:text-lg max-w-3xl">
                        Your trusted destination for mastering English and French — where learning meets culture,
                        confidence, and connection.
                    </p>
                </div>
            </div>


            <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">
                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#155DFC]">Who We Are</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        At <strong className='text-[#155DFC]'>Your Academy Name</strong>, we’re a team of passionate educators, linguists, and
                        language lovers dedicated to making communication across cultures effortless. Established with
                        a vision to bring world-class language education to every learner, our academy bridges the gap
                        between learning and real-life speaking confidence.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        We specialize in English and French courses tailored to all levels — from beginners taking their
                        first step to professionals refining their fluency. Our platform combines structured learning,
                        cultural immersion, and modern technology to make language mastery both achievable and enjoyable.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        We believe that learning a new language is more than memorizing words — it’s about opening your
                        mind to new ideas, perspectives, and opportunities that transform your career, travel, and
                        personal growth.
                    </p>
                </div>


                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#155DFC]">Our Mission & Vision</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        <strong>Our Vision:</strong> To become a global platform where language learning goes beyond
                        textbooks — inspiring curiosity, confidence, and cross-cultural understanding in every student.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        <strong>Our Mission:</strong> To provide high-quality, accessible, and practical English and
                        French education for learners worldwide. We aim to make every student fluent, confident, and
                        culturally aware through engaging lessons, real-world applications, and consistent mentorship.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Our approach is centered around communication, not memorization. We equip you with the skills to
                        express yourself naturally and effectively — whether you’re preparing for studies abroad,
                        enhancing your career, or exploring new cultures.
                    </p>
                </div>


                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#155DFC]">Why Choose Us</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        With so many online courses available, what makes us different is our commitment to quality,
                        personalization, and real-world results. Every learner is unique — and so is our approach. We
                        combine expert instruction, practical training, and cutting-edge digital tools to ensure your
                        language journey is effective and enjoyable.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>
                            <strong>Certified native-speaking instructors</strong> with years of international teaching
                            experience.
                        </li>
                        <li>
                            <strong>Personalized learning paths</strong> that adapt to your goals, pace, and skill level.
                        </li>
                        <li>
                            <strong>Live interactive classes</strong> for real-time speaking practice and confidence building.
                        </li>
                        <li>
                            <strong>Conversation-based curriculum</strong> for real-world fluency, not just grammar drills.
                        </li>
                        <li>
                            <strong>Flexible online access</strong> — learn anytime, anywhere, from any device.
                        </li>
                        <li>
                            <strong>Recognized certifications</strong> to boost your academic and career profile.
                        </li>
                    </ul>
                </div>


                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#155DFC]">Our Teaching Approach</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Our teaching philosophy revolves around one idea: languages are best learned through real
                        communication. We focus on helping you think, speak, and understand naturally — just like a
                        native speaker. Each course blends structured grammar with conversational practice to build both
                        fluency and confidence.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Our lessons include speaking drills, cultural videos, listening exercises, and vocabulary games
                        that make learning dynamic and enjoyable. We also integrate role-playing and storytelling to help
                        you apply what you learn in real-world contexts.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Whether it’s pronunciation mastery, business communication, or travel-friendly vocabulary — our
                        approach ensures you’re ready to use the language in any situation with ease and accuracy.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#155DFC]">Meet Our Instructors</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Our strength lies in our team of dedicated, qualified instructors who bring language to life. Each
                        of our trainers is a certified educator fluent in multiple languages and skilled at tailoring
                        lessons to suit diverse learning styles. Their goal is not just to teach you a language — but to
                        inspire confidence, curiosity, and cultural understanding.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Instructor Card 1 */}
                        <div className="text-center flex flex-col items-center">
                            <div className="relative w-60 h-60 rounded-xl overflow-hidden">
                                <Image
                                    src="/teacher1.jpg"
                                    alt="Instructor"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="font-semibold mt-4 text-lg">Marie Dupont</h4>
                            <p className="text-gray-600 text-sm">French Language Expert</p>
                            <p className="text-gray-500 text-sm mt-2 px-4">
                                With 10+ years of teaching experience, Marie specializes in conversational French,
                                pronunciation, and cultural fluency.
                            </p>
                        </div>

                        {/* Instructor Card 2 */}
                        <div className="text-center flex flex-col items-center">
                            <div className="relative w-60 h-60 rounded-xl overflow-hidden">
                                <Image
                                    src="/teacher2.jpg"
                                    alt="Instructor"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="font-semibold mt-4 text-lg">James Anderson</h4>
                            <p className="text-gray-600 text-sm">English Communication Coach</p>
                            <p className="text-gray-500 text-sm mt-2 px-4">
                                A TESOL-certified instructor with a background in corporate communication, James helps
                                students build fluency and confidence in professional English.
                            </p>
                        </div>

                        {/* Instructor Card 3 */}
                        <div className="text-center flex flex-col items-center">
                            <div className="relative w-60 h-60 rounded-xl overflow-hidden">
                                <Image
                                    src="/teacher3.png"
                                    alt="Instructor"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="font-semibold mt-4 text-lg">Sophie Laurent</h4>
                            <p className="text-gray-600 text-sm">Bilingual Language Coach</p>
                            <p className="text-gray-500 text-sm mt-2 px-4">
                                Fluent in both English and French, Sophie brings creative strategies that help learners
                                transition smoothly between languages.
                            </p>
                        </div>
                    </div>



                    <div className="text-center mt-10">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-[#155DFC]">
                            Join Our Global Learning Community
                        </h3>
                        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                            Over <strong>5,000+</strong> learners from around the world have trusted{" "}
                            <strong>Your Academy Name</strong> to achieve their language dreams. Whether you're learning for
                            study, travel, or career growth, we’re here to make your journey smoother and more enjoyable.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-200">
                            Explore Courses
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs
