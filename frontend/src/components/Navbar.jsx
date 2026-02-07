import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  LayoutGrid,
  Palette,
  HeartPulse,
  Utensils,
} from "lucide-react";

/* ================= COURSE DATA ================= */
const courseData = [
  {
    category: "Management & IT",
    icon: <LayoutGrid size={18} />,
    items: [
      "Banking & Finance",
      "Digital Marketing with AI",
      "Website Development",
      "Retail Management & E-Commerce",
    ],
  },
  {
    category: "Design Technology",
    icon: <Palette size={18} />,
    items: [
      "Fashion Design",
      "Jewellery Design",
      "Interior Design",
      "Textile Design",
    ],
  },
  {
    category: "Healthcare",
    icon: <HeartPulse size={18} />,
    items: [
      "General Nursing",
      "Phlebotomy",
      "Medical Lab Assistant",
      "OT Assistant",
      "Physiotherapy Assistant",
      "ICU Assistant",
      "Optometry Assistant",
    ],
  },
  {
    category: "Food, Culinary & Nutrition",
    icon: <Utensils size={18} />,
    items: [
      "Food & Nutrition",
      "Culinary & Food Production",
      "Cake Making",
      "Food & Beverage",
    ],
  },
];

const slugify = (text) =>
  text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const navLinkStyles = ({ isActive }) =>
    `relative py-2 text-[15px] font-medium transition-colors ${
      isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-indigo-600 after:transition-all ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <div>
            <p className="text-xl font-bold text-gray-900">
              Mindmine <span className="text-indigo-600">Institute</span>
            </p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Skill Education
            </p>
          </div>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkStyles}>
            About Us
          </NavLink>

          {/* COURSES MEGA MENU */}
          <div
            className="relative group"
            onMouseLeave={() => setActiveCategory(null)}
          >
            <button
              className="flex items-center gap-1 py-2 text-[15px] font-medium text-gray-700 hover:text-indigo-600"
              aria-expanded={activeCategory !== null}
            >
              Courses
              <ChevronDown
                size={16}
                className="group-hover:rotate-180 transition-transform"
              />
            </button>

            {/* MEGA MENU */}
            <div className="absolute left-0 top-full hidden pt-2 group-hover:flex items-start pointer-events-auto">
              {/* LEFT PANEL */}
              <div className="w-[280px] bg-gray-50 p-3 rounded-2xl border shadow-xl">
                {courseData.map((cat, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveCategory(idx)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      activeCategory === idx
                        ? "bg-white text-indigo-600 shadow ring-1 ring-gray-100"
                        : "text-gray-600 hover:bg-white hover:text-indigo-600"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {cat.icon}
                      {cat.category}
                    </span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>

              {/* RIGHT PANEL */}
              {activeCategory !== null && (
                <div className="ml-2 w-[340px] p-7 bg-white rounded-2xl border shadow-2xl">
                  <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                    {courseData[activeCategory].category} Programs
                  </h4>

                  {courseData[activeCategory].items.map((item) => (
                    <NavLink
                      key={item}
                      to={`/courses/${slugify(item)}`}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {item}
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 opacity-0 group-hover:opacity-100" />
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          <NavLink to="/student-zone" className={navLinkStyles}>
            Student Zone
          </NavLink>
          <NavLink to="/faq" className={navLinkStyles}>
            FAQ
          </NavLink>
        </nav>

        {/* CTA + MOBILE */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/contact"
            className="hidden lg:inline-flex rounded-full bg-indigo-600 px-7 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition"
          >
            Contact Us
          </NavLink>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t px-6 py-6 space-y-6 shadow-xl max-h-[80vh] overflow-y-auto">
          {courseData.map((cat) => (
            <div key={cat.category}>
              <p className="font-bold text-indigo-600 flex items-center gap-2">
                {cat.icon} {cat.category}
              </p>
              {cat.items.map((item) => (
                <NavLink
                  key={item}
                  to={`/courses/${slugify(item)}`}
                  onClick={() => setIsOpen(false)}
                  className="block ml-6 mt-1 text-sm text-gray-600"
                >
                  {item}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
