import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import bannerImg from "../../assets/banner.png";
import starImg from "../../assets/star.svg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 w-full h-full -translate-x-1/2 left-1/2 -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-50/50 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-emerald-50/50 blur-[100px]" />
      </div>

      <div className="relative grid items-center grid-cols-1 gap-12 px-6 py-20 mx-auto max-w-7xl lg:py-10 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="z-10">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-sm font-bold text-indigo-700 shadow-sm animate-bounce-subtle">
            <Sparkles size={16} className="text-amber-500" />
            <span>Admissions Open 2025–26</span>
          </div>

          <h1 className="mt-8 text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.1]">
            Forging Leaders <br />
            <span className="relative">
              through{" "}
              <span className="relative z-10 text-transparent bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text">
                Skill Education
              </span>
              <svg
                className="absolute left-0 w-full h-3 text-indigo-100 -bottom-2 -z-10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0, 50 5 T 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                />
              </svg>
            </span>
          </h1>

          <p className="max-w-lg pl-4 mt-8 text-lg italic leading-relaxed text-gray-600 border-l-4 border-indigo-500">
            "Bridging academic excellence with real-world industry demands
            through outcome-driven, practical learning."
          </p>

          {/* Icon-based Trust Points */}
          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2">
            {[
              "UGC Approved Degree",
              "Industry-Aligned Curriculum",
              "100% Practical Exposure",
              "Expert Faculty",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <NavLink
              to="/student-zone/online-application"
              className="relative flex items-center gap-2 px-8 py-4 overflow-hidden text-white transition-all bg-indigo-600 group rounded-2xl hover:bg-indigo-700 hover:ring-4 hover:ring-indigo-100"
            >
              <span className="relative z-10 font-bold">Apply Now</span>
              <ArrowRight
                size={20}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
            </NavLink>

            <button className="flex items-center gap-2 px-8 py-4 font-bold text-gray-700 transition-all border-2 border-gray-200 rounded-2xl hover:border-indigo-600 hover:text-indigo-600">
              Explore Campus
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT - VISUALS */}
        <div className="relative lg:ml-auto">
          {/* Main Image Container */}
          <div className="relative z-20 animate-float-slow">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-indigo-100 to-emerald-100 blur-2xl opacity-50" />
            <img
              src={bannerImg}
              alt="Successful Student"
              className="relative w-full max-w-[500px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            />
          </div>

          {/* Floating Card 1: Placement */}
          <div className="absolute -bottom-6 -left-8 z-30 rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white flex items-center gap-4 animate-float">
            <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-600 shadow-lg rounded-2xl shadow-indigo-200">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-gray-900">
                100%
              </p>
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">
                Placement Rate
              </p>
            </div>
          </div>

          {/* Floating Card 2: Student Community */}
          <div className="absolute z-30 flex items-center gap-3 p-4 border border-white shadow-xl top-10 -right-4 rounded-2xl bg-white/90 backdrop-blur-xl">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 overflow-hidden bg-gray-200 border-2 border-white rounded-full"
                >
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <div className="text-xs font-bold text-gray-800">+2k Students</div>
          </div>

          {/* Decorative Star */}
          <img
            src={starImg}
            alt=""
            className="absolute top-0 left-0 w-12 animate-spin-slow opacity-30"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
