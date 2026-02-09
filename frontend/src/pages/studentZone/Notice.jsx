import { CalendarDays, FileText } from "lucide-react";

const notices = [
  {
    id: 1,
    title: "Admission Open for Session 2025–26",
    date: "10 June 2025",
    description:
      "Admissions are now open for various diploma and certificate courses. Interested students are requested to apply online.",
    tag: "New",
  },
  {
    id: 2,
    title: "Semester Examination Schedule",
    date: "02 June 2025",
    description:
      "The semester examination schedule has been published. Students are advised to check the notice board regularly for updates.",
    tag: "Important",
  },
  {
    id: 3,
    title: "Holiday Notice – Rath Yatra",
    date: "25 May 2025",
    description:
      "The institute will remain closed on account of Rath Yatra. Regular classes will resume from the next working day.",
    tag: "",
  },
  {
    id: 4,
    title: "Scholarship Form Submission Deadline",
    date: "18 May 2025",
    description:
      "Last date for submission of scholarship forms has been extended. Eligible students should submit their forms at the office.",
    tag: "",
  },
];

const Notice = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Notice Board</h2>
        <p className="mt-2 text-gray-600">
          Stay updated with the latest announcements and important information.
        </p>
      </div>

      {/* ================= NOTICE LIST ================= */}
      <div className="space-y-6">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="p-6 transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* LEFT */}
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {notice.title}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <CalendarDays size={16} />
                  {notice.date}
                </div>
              </div>

              {/* TAG */}
              {notice.tag && (
                <span
                  className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ${
                    notice.tag === "New"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {notice.tag}
                </span>
              )}
            </div>

            <p className="mt-4 leading-relaxed text-gray-600">
              {notice.description}
            </p>

            {/* ACTION */}
            <div className="flex items-center gap-2 mt-5 text-sm font-semibold text-indigo-600 cursor-pointer hover:underline">
              <FileText size={16} />
              View Details
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
