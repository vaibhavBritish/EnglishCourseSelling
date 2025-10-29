import React from "react";

const Terms = () => {
  return (
    <div className="bg-gray-50 text-gray-800">

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-200">
            Please read these terms carefully before using our website or services.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-10 text-justify leading-relaxed">
          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to our platform. By accessing or using our website and
              services, you agree to these Terms of Service and our Privacy
              Policy. If you do not agree, please do not use our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">2. Use of Services</h2>
            <p className="text-gray-700">
              You agree to use our website and services only for lawful purposes.
              You are responsible for ensuring that your use of the site complies
              with all applicable laws and regulations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">3. Account Responsibility</h2>
            <p className="text-gray-700">
              When you create an account, you must provide accurate and complete
              information. You are responsible for maintaining the confidentiality
              of your account credentials and for all activities that occur under
              your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">4. Payments and Refunds</h2>
            <p className="text-gray-700">
              Payments for courses are processed securely. Once enrolled, fees are
              non-refundable except in specific cases described in our refund
              policy. Please review all course details before purchase.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this platform, including text, videos, and graphics,
              is owned or licensed by us. You may not reproduce, distribute, or
              create derivative works without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">6. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate your account at any
              time if you violate these Terms or engage in unlawful behavior.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">7. Limitation of Liability</h2>
            <p className="text-gray-700">
              We are not responsible for any indirect or consequential damages
              resulting from your use of our website or services. You use this
              platform at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">8. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms periodically. Any changes will be posted
              on this page, and continued use of our services means you accept the
              updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-[#155DFC] font-semibold mb-3">9. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@englishcourse.com"
                className="text-blue-600 hover:underline"
              >
                support@englishcourse.com
              </a>
              .
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-10">
            Last updated on {new Date().toLocaleDateString()}.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;
