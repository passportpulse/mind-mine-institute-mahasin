import { NavLink } from "react-router-dom";
import { programsData } from "../../data/programsData.js";

const ProgramsSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-2xl mx-auto mb-20 text-center">
          <p className="text-xl font-semibold tracking-widest text-indigo-600 uppercase">
            Academic 
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
            Discover <span className="text-indigo-600">Certificate & Diploma</span>{" "}
            programs
          </h2>

          <p className="mt-5 text-base leading-relaxed text-gray-600">
            Industry-ready academic and professional programs designed to
            prepare students for real-world careers.
          </p>
        </div>

        {/* ================= PROGRAM CARDS ================= */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {programsData.map((program, index) => (
            <div
              key={index}
              className="
                group flex flex-col
                rounded-2xl bg-white
                border border-gray-200/70
                shadow-[0_1px_1px_rgba(0,0,0,0.04)]
                hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)]
                transition-shadow
              "
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={program.image}
                  alt={program.title}
                  className="object-cover w-full h-full"
                />

                {/* TAG */}
                <span className="absolute px-2 text-xs font-semibold text-white bg-indigo-600 rounded-full top-2 left-4">
                  {program.tag}
                </span>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 px-6 py-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  {program.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {program.description}
                </p>

                {/* CTA pinned to bottom */}
                <NavLink
                  to={program.link}
                  className="inline-flex items-center gap-2 pt-6 mt-auto text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  {program.cta}
                  <span aria-hidden>→</span>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
