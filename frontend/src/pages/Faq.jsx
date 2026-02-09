import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import mainBanner from "../assets/main-banner.jpg";

const faqData = [
  {
    question: "Development & Design",
    answer:
      "Our development and design programs focus on practical skills, real-world projects, and industry-relevant tools. Students gain hands-on experience to build confidence and job-ready portfolios.",
  },
  {
    question: "Start With Mentors",
    answer:
      "All our courses are guided by experienced mentors who provide personal attention, career guidance, and continuous support throughout the learning journey.",
  },
  {
    question: "How long do I have access to a course?",
    answer:
      "Course access depends on the program you choose. Most courses provide full access for the entire duration, including study materials, practical sessions, and mentor support.",
  },
  {
    question: "The best way to Boost Your Career",
    answer:
      "Skill-based learning, hands-on practice, industry exposure, and consistent mentorship are the most effective ways to boost your career.",
  },
  {
    question: "What Can I do to Help?",
    answer:
      "You can contact us for admissions, counseling, course guidance, or career advice. Our team is always ready to assist you.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="min-h-screen antialiased bg-slate-50">
      {/* ================= HERO ================= */}
      <section
        className="relative h-[220px] bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBanner})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h1 className="text-4xl font-extrabold md:text-5xl">FAQ</h1>
          Everything you need to know about our programs and mentorship.
        </div>
      </section>

      {/* ================= FAQ CONTENT ================= */}
      <section className="max-w-6xl px-6 py-20 mx-auto">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* LEFT INTRO */}
          <div className="lg:col-span-1">
            <div className="sticky top-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                <HelpCircle size={16} />
                Support Center
              </div>

              <h2 className="text-3xl font-bold leading-tight text-gray-900">
                Any Questions?
                <br /> We’ve Got Answers.
              </h2>

              <p className="mt-5 text-gray-600">
                Can’t find what you’re looking for? Our support team is happy to
                guide you with personalized assistance.
              </p>

              {/* LINKED TO CONTACT PAGE */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center py-3 mt-8 font-semibold text-white transition bg-indigo-600 shadow-md px-7 rounded-xl hover:bg-indigo-700"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* RIGHT ACCORDION */}
          <div className="space-y-5 lg:col-span-2">
            {faqData.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl bg-white border-2 transition-all duration-300 ${
                    isActive
                      ? "border-indigo-500 shadow-lg bg-indigo-50/50"
                      : "border-gray-100 shadow-sm hover:border-indigo-200"
                  }`}
                >
                  <button
                    aria-expanded={isActive}
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="flex items-center justify-between w-full py-6 text-left px-7"
                  >
                    <span
                      className={`text-lg font-semibold ${
                        isActive ? "text-indigo-700" : "text-gray-800"
                      }`}
                    >
                      {item.question}
                    </span>

                    <span className="flex items-center justify-center w-10 h-10 text-indigo-700 bg-indigo-100 rounded-full">
                      {isActive ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-7 text-[17px] text-gray-600 leading-relaxed">
                          <div className="h-px mb-5 bg-gray-200" />
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
