import { NavLink } from "react-router-dom";

const InfoCardGrid = ({ cards }) => {
  return (
    <section className="py-10 bg-slate-50">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            Why Choose Mindmine Institute
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            We focus on long-term career outcomes through industry-aligned
            programs, expert mentorship, and practical training.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="
                  rounded-2xl 
                  bg-white 
                  border border-gray-200/80 
                  px-8 py-4
                  shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  transition-shadow
                "
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 mb-8 text-indigo-600 rounded-xl bg-indigo-50">
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {card.description}
                </p>

                {/* Link */}
                <NavLink
                  to={card.link}
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  {card.linkText}
                  <span aria-hidden>→</span>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfoCardGrid;
