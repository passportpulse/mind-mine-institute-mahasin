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
    <footer className="relative bg-white pt-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* COLUMN 1: BRAND IDENTITY */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <img src="/logo.png" alt="logo" className="w-10 h-10" />
              </div>
              <div className="leading-tight">
                <p className="text-xl font-black text-gray-900 tracking-tight">
                  Mindmine <span className="text-indigo-600">Inst.</span>
                </p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Skill Education
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
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
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-6">
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
                    className="group flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-all duration-300"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2"
                    />
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT DETAILS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-6">
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
          <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Subscribe to get the latest course updates and career tips.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
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
        <div className="py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm text-gray-500 font-medium">
              © 2026 Mindmine Institute. All rights reserved.
            </p>
            <p className="text-[10px] text-gray-400 font-mono tracking-tighter">
              REG NO: S/2L/54056 | ISO 9001:2015 CERTIFIED
            </p>
          </div>

          <div className="flex items-center gap-8">
            <NavLink
              to="/privacy"
              className="text-xs font-semibold text-gray-400 hover:text-indigo-600 transition"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/terms"
              className="text-xs font-semibold text-gray-400 hover:text-indigo-600 transition"
            >
              Terms of Service
            </NavLink>
            <NavLink
              to="/sitemap"
              className="text-xs font-semibold text-gray-400 hover:text-indigo-600 transition"
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
    <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
      <Icon size={16} />
    </div>
    <span className="text-sm text-gray-600 leading-tight flex-1 group-hover:text-gray-900 transition-colors">
      {text}
    </span>
  </div>
);

export default Footer;
