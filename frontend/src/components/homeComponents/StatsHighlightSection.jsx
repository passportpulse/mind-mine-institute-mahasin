import { Users, GraduationCap, BookOpen, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "850+",
    label: "Graduates",
  },
  {
    icon: GraduationCap,
    value: "120+",
    label: "Current Students",
  },
  {
    icon: BookOpen,
    value: "15+",
    label: "Specialized Programmes",
  },
  {
    icon: Award,
    value: "250+",
    label: "Awards & Honors",
  },
];

const StatsHighlightSection = () => {
  return (
    <section className="bg-white py-15">
      <div className="px-6 mx-auto max-w-7xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[36px]
            bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600
            px-10 py-20
          "
        >
          {/* ultra-subtle texture */}
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(135deg,#fff_12%,transparent_12%,transparent_50%,#fff_50%,#fff_62%,transparent_62%,transparent)] bg-[length:32px_32px]" />

          {/* content */}
          <div className="relative z-10 grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex items-center gap-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 text-white border rounded-full border-white/30 bg-white/10">
                    <Icon size={28} strokeWidth={1.6} />
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-4xl font-semibold tracking-tight text-white">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm tracking-wide text-indigo-100">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsHighlightSection;
