import { useParams, NavLink } from "react-router-dom";
import coursesData from "../data/coursesData";

const Courses = () => {
  const { courseSlug } = useParams();
  const course = coursesData[courseSlug];

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* ================= HERO ================= */}
      <section>
        <div className="grid items-center gap-10 px-6 py-10 mx-auto max-w-7xl md:grid-cols-2">
          {/* LEFT */}
          <div>
            <p className="text-sm font-bold tracking-widest text-indigo-600 uppercase">
              {course.category}
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              {course.title}
            </h1>

            <p className="mt-6 leading-relaxed text-gray-600">
              {course.description}
            </p>

            {/* SINGLE APPLY CTA */}
            <div className="mt-8">
              <NavLink
                to="/student-zone/online-application"
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 hover:gap-4"
              >
                Apply Now
                <span className="text-lg">→</span>
              </NavLink>
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white shadow rounded-2xl">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {course.duration}
              </p>
            </div>

            <div className="p-6 bg-white shadow rounded-2xl">
              <p className="text-sm text-gray-500">Eligibility</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {course.eligibility}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section className="max-w-6xl px-6 py-16 mx-auto">
        <h2 className="mb-8 text-2xl font-extrabold text-gray-900">
          What You Will Learn
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {/* HIGHLIGHTS */}
          <ul className="space-y-4 text-gray-600">
            {course.highlights.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-indigo-600 rounded-full"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* SUPPORTING INFO (NOT CTA) */}
          <div className="p-8 shadow rounded-2xl bg-white/70 backdrop-blur">
            <h3 className="text-xl font-extrabold text-gray-900">
              Why Choose Mindmine Institute?
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              We focus on practical training, experienced faculty, and
              industry-relevant curriculum to help students build real skills
              and career confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
