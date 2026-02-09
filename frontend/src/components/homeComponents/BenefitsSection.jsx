import { NavLink } from "react-router-dom";
import { benefitsData } from "../../data/benefitsData.js";

const BenefitsSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-2xl mx-auto mb-20 text-center">
          <p className="text-xl font-semibold tracking-widest text-indigo-600 uppercase">
            Why Choose Mindmine
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
            Learning that goes <span className="text-indigo-600">beyond</span>{" "}
            the classroom
          </h2>

          <p className="mt-5 text-base leading-relaxed text-gray-600">
            We focus on quality education, expert mentorship, and continuous
            support to help students build confidence, skills, and successful
            careers.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {benefitsData.map((item, index) => (
            <div
              key={index}
              className="
                flex flex-col
                rounded-2xl
                border border-indigo-200/60
                px-8 py-14
                text-center
                bg-white
                shadow-[0_1px_1px_rgba(0,0,0,0.04)]
              "
            >
              {/* IMAGE */}
              <div className="flex justify-center mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain w-30 h-30"
                />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>

              {/* CTA pinned to bottom */}
              <NavLink
                to="/student-zone/enquiry"
                className="inline-flex items-center justify-center gap-2 pt-10 mt-auto text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Learn More
                <span aria-hidden>→</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
