import { NavLink } from "react-router-dom";
import { progressStatsData } from "../../data/progressStatsData";
import bgImage from "../../assets/one.jpg";
import studentImage from "../../assets/two.jpg";
import { FiArrowRight } from "react-icons/fi";

const ProgressStatsSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="grid items-center gap-24 px-6 mx-auto max-w-7xl lg:grid-cols-2">
        {/* ================= LEFT VISUAL ================= */}
        <div className="relative flex justify-center lg:justify-start">
          {/* Background oval image */}
          <div className="relative w-[380px] sm:w-[420px] h-[520px] rounded-[220px] overflow-hidden shadow-md">
            <img
              src={bgImage}
              alt="Students learning"
              className="object-cover object-center w-full h-full"
              style={{ objectPosition: "65% center" }}
            />
          </div>

          {/* Foreground student image */}
          <div className="absolute bottom-10 right-8">
            <div className="w-[240px] h-[340px] rounded-[180px] overflow-hidden border-8 border-white shadow-lg">
              <img
                src={studentImage}
                alt="Student"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute px-6 py-4 bg-white border shadow-sm left-6 bottom-24 rounded-2xl">
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
              Our Progress
            </p>
            <p className="mt-1 text-sm text-gray-600">Outcomes that matter</p>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div>
          <p className="text-xl font-semibold tracking-widest text-indigo-600 uppercase">
            Excellence in Numbers
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-snug tracking-tight text-gray-900">
            Measurable outcomes that <br />
            reflect academic excellence.
          </h2>

          <p className="max-w-xl mt-6 text-base leading-relaxed text-gray-600">
            Our programs are designed with a strong focus on employability,
            practical learning, and long-term career growth.
          </p>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-2 mt-12 gap-x-14 gap-y-10">
            {progressStatsData.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-semibold text-indigo-600">
                    {stat.value}%
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {stat.label}
                  </span>
                </div>

                <div className="w-full h-2 overflow-hidden bg-indigo-100 rounded-full">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ================= CTA ================= */}
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 py-3 text-sm font-semibold text-white transition bg-indigo-600 rounded-full mt-14 px-9 hover:bg-indigo-700"
          >
            View All Programs
            <FiArrowRight />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ProgressStatsSection;
