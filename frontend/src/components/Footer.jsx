import {
  Facebook,
  Linkedin,
  Youtube,
  Send,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Instagram,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative pt-24 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute rounded-full -top-24 -right-24 w-96 h-96 bg-indigo-50/50 blur-3xl -z-10"></div>
      <div className="absolute rounded-full -bottom-24 -left-24 w-96 h-96 bg-emerald-50/50 blur-3xl -z-10"></div>

      <div className="px-6 mx-auto max-w-7xl">
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* COLUMN 1: BRAND IDENTITY */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <img src="/logo.png" alt="logo" className="w-10 h-10" />
              </div>
              <div className="leading-tight">
                <p className="text-xl font-black tracking-tight text-gray-900">
                  Mindmine <span className="text-indigo-600">Inst.</span>
                </p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Skill Education
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">
              Empowering the next generation with industry-certified skills and
              practical excellence since 2025.
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon Icon={Facebook} href="#" color="hover:bg-blue-600" />
              <SocialIcon Icon={Instagram} href="#" color="hover:bg-pink-600" />
              <SocialIcon Icon={Linkedin} href="#" color="hover:bg-blue-700" />
              <SocialIcon Icon={Youtube} href="#" color="hover:bg-red-600" />
            </div>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase">
              Institution
            </h4>
            <ul className="space-y-4">
              {[
                "About Us",
                "Courses",
                "Student Zone",
                "Admissions",
                "Events",
              ].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center text-sm text-gray-600 transition-all duration-300 group hover:text-indigo-600"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-2 -ml-4 transition-all opacity-0 group-hover:opacity-100 group-hover:ml-0"
                    />
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT DETAILS */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase">
              Get in Touch
            </h4>
            <div className="space-y-5">
              <ContactItem
                Icon={MapPin}
                text="52A, Indian Mirror St, Kolkata, WB 700014"
              />
              <ContactItem Icon={Phone} text="+91 75950 77657" />
              <ContactItem Icon={Mail} text="admissions@mindmineskill.com" />
            </div>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div className="p-6 border border-gray-100 bg-gray-50/50 rounded-3xl">
            <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase">
              Newsletter
            </h4>
            <p className="mb-4 text-xs leading-relaxed text-gray-500">
              Subscribe to get the latest course updates and career tips.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 text-sm transition-all bg-white border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button className="absolute right-1.5 top-1.5 bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                <Send size={16} />
              </button>
            </form>
            <p className="mt-4 text-[10px] text-gray-400 italic">
              * We promise not to spam your inbox.
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col items-center justify-between gap-6 py-8 border-t border-gray-100 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="text-sm font-medium text-gray-500">
              © 2026 Mindmine Institute. All rights reserved.
            </p>
            <p className="text-[10px] text-gray-400 font-mono tracking-tighter">
              REG NO: S/2L/54056 | ISO 9001:2015 CERTIFIED
            </p>
          </div>

          <div className="flex items-center gap-8">
            <NavLink
              to="/privacy"
              className="text-xs font-semibold text-gray-400 transition hover:text-indigo-600"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/terms"
              className="text-xs font-semibold text-gray-400 transition hover:text-indigo-600"
            >
              Terms of Service
            </NavLink>
            <NavLink
              to="/sitemap"
              className="text-xs font-semibold text-gray-400 transition hover:text-indigo-600"
            >
              Sitemap
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-components for cleaner code
const SocialIcon = ({ Icon, href, color }) => (
  <a
    href={href}
    className={`h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-all duration-300 hover:text-white ${color} hover:-translate-y-1`}
  >
    <Icon size={18} />
  </a>
);

const ContactItem = ({ Icon, text }) => (
  <div className="flex items-start gap-3 group">
    <div className="flex items-center justify-center w-8 h-8 mt-1 text-indigo-600 transition-colors duration-300 rounded-lg bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white">
      <Icon size={16} />
    </div>
    <span className="flex-1 text-sm leading-tight text-gray-600 transition-colors group-hover:text-gray-900">
      {text}
    </span>
  </div>
);

export default Footer;
