import { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LayoutGrid,
  Palette,
  HeartPulse,
  Utensils,
  FileText,
  ClipboardList,
  Bell,
  CreditCard,
} from "lucide-react";

/* ================= DATA ================= */

const studentZoneMenu = [
  {
    label: "Enquiry",
    path: "/student-zone/enquiry",
    icon: <FileText size={18} />,
  },
  {
    label: "Online Application",
    path: "/student-zone/online-application",
    icon: <ClipboardList size={18} />,
  },
  { label: "Notice", path: "/student-zone/notice", icon: <Bell size={18} /> },
  {
    label: "Payment",
    path: "/student-zone/payment",
    icon: <CreditCard size={18} />,
  },
];

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

/* ================= UTILS ================= */

const slugify = (text) =>
  text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

/* ================= COMPONENT ================= */

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [coursesOpen, setCoursesOpen] = useState(false);

  const location = useLocation();
  const closeTimeout = useRef(null);

  const isParentActive = (path) => location.pathname.startsWith(path);

  const linkClass = ({ isActive }) =>
    `relative py-2 text-[15px] font-medium transition ${
      isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
    }`;

  /* ---- Hover Handlers ---- */

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setCoursesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setCoursesOpen(false);
      setActiveCategory(0);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Mindmine" className="w-10 h-10" />
          <div>
            <p className="text-xl font-bold">
              Mindmine <span className="text-indigo-600">Institute</span>
            </p>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              Skill Education
            </p>
          </div>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="items-center hidden gap-8 lg:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>

          {/* COURSES MENU */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1 py-2 font-medium transition ${
                isParentActive("/courses")
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Courses <ChevronDown size={16} />
            </button>

            {coursesOpen && (
              <div className="absolute left-0 flex pt-1 mt-2 top-full">
                <div className="flex">
                  {/* LEFT PANEL */}
                  <div className="w-[280px] bg-white p-3 rounded-l-2xl border shadow-lg">
                    {courseData.map((cat, index) => (
                      <button
                        key={cat.category}
                        onMouseEnter={() => setActiveCategory(index)}
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-sm font-semibold transition ${
                          activeCategory === index
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
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
                  <div className="w-[340px] bg-white p-6 rounded-r-2xl border shadow-xl border-l-0">
                    <h4 className="mb-4 text-xs font-bold tracking-widest text-indigo-400 uppercase">
                      {courseData[activeCategory].category}
                    </h4>

                    <div className="space-y-1">
                      {courseData[activeCategory].items.map((item) => (
                        <NavLink
                          key={item}
                          to={`/courses/${slugify(item)}`}
                          onClick={() => {
                            setCoursesOpen(false);
                            setActiveCategory(0);
                          }}
                          className={({ isActive }) =>
                            `block px-3 py-2 text-sm font-medium rounded-lg transition ${
                              isActive
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50"
                            }`
                          }
                        >
                          {item}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STUDENT ZONE */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1 py-2 text-[15px] font-medium transition ${
                isParentActive("/student-zone")
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Student Zone <ChevronDown size={16} />
            </button>

            <div className="absolute left-0 hidden pt-2 top-full group-hover:block">
              <div className="w-[260px] bg-white p-2 rounded-2xl border shadow-xl">
                {studentZoneMenu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm font-semibold transition rounded-xl ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/faq" className={linkClass}>
            FAQ
          </NavLink>
        </nav>

        {/* MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/contact"
            className="hidden lg:inline-flex bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition"
          >
            Contact Us
          </NavLink>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 lg:hidden"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="px-6 py-6 space-y-6 bg-white border-t lg:hidden overflow-y-auto max-h-[80vh]">
          {courseData.map((cat) => (
            <div key={cat.category}>
              <p className="flex items-center gap-2 mb-2 font-bold text-indigo-600">
                {cat.icon} {cat.category}
              </p>

              <div className="pl-6 space-y-1">
                {cat.items.map((item) => (
                  <NavLink
                    key={item}
                    to={`/courses/${slugify(item)}`}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600"
                      }`
                    }
                  >
                    {item}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <hr />

          <div className="space-y-2">
            {studentZoneMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 font-medium ${
                    isActive ? "text-indigo-600" : "text-gray-700"
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
