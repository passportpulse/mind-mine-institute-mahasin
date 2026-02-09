import { Outlet, useLocation } from "react-router-dom";
import mainBanner from "../../assets/main-banner.jpg";

const pageTitleMap = {
  "/student-zone/enquiry": "Enquiry",
  "/student-zone/online-application": "Online Application",
  "/student-zone/notice": "Notice",
  "/student-zone/payment": "Payment",
};

const StudentZoneLayout = () => {
  const location = useLocation();
  const title = pageTitleMap[location.pathname] || "Student Zone";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= BANNER ================= */}
      <section
        className="relative h-[220px] bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBanner})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h1 className="text-4xl font-extrabold md:text-5xl">{title}</h1>

          <div className="px-5 py-1 mt-4 text-sm font-semibold rounded-full bg-white/20 backdrop-blur">
            Home &nbsp;›&nbsp; Student Zone &nbsp;›&nbsp; {title}
          </div>
        </div>
      </section>

      {/* ================= PAGE CONTENT ================= */}
      <main className="max-w-6xl px-6 py-20 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentZoneLayout;
