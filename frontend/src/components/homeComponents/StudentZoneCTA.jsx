import { ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { NavLink } from "react-router-dom";
import ctabg from "../../assets/ctabg.jpg";

const StudentZoneCTA = () => {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="relative mx-auto overflow-hidden max-w-7xl rounded-3xl">
        {/* Background Image */}
        <img
          src={ctabg}
          alt="Student Zone"
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 via-indigo-800/75 to-indigo-700/60" />

        {/* Content */}
        <div className="relative z-10 grid items-center px-10 py-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="max-w-xl text-white">
            <p className="inline-flex items-center gap-2 text-xs tracking-widest text-indigo-200 uppercase">
              <ShieldCheck size={14} />
              Student Portal Access
            </p>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight lg:text-5xl">
              Student <span className="text-cyan-300">Zone</span>
              <br />
              Digital Campus Gateway
            </h2>

            <p className="mt-6 text-base leading-relaxed text-indigo-100">
              Secure access to academic records, online applications,
              examination notices, payments, and important updates — everything
              students need in one protected platform.
            </p>

            {/* Trust Signals */}
            <div className="flex items-center gap-6 mt-8 text-sm text-indigo-200">
              <div className="flex items-center gap-2">
                <Lock size={14} />
                SSL Secured
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} />
                Verified Access
              </div>
            </div>

            {/* CTA */}
            <NavLink
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 mt-10 text-sm font-semibold text-indigo-900 transition rounded-xl bg-cyan-400 hover:bg-cyan-300"
            >
              Enter Student Zone
              <ArrowRight size={18} />
            </NavLink>
          </div>

          {/* RIGHT EMPTY SPACE (keeps layout premium & breathable) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

export default StudentZoneCTA;
