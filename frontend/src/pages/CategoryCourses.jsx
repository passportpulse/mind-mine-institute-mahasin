import { useParams, NavLink } from "react-router-dom";
import coursesData from "../data/coursesData";

const CategoryCourses = () => {
  const { categorySlug } = useParams();
  
  // Debug: Log the categorySlug
  console.log("CategorySlug:", categorySlug);
  
  // Map category slugs to actual categories
  const categoryMap = {
    "management-it": "Management & IT",
    "design-technology": "Design Technology", 
    "healthcare": "Healthcare",
    "food-culinary-nutrition": "Food, Culinary & Nutrition"
  };

  const category = categoryMap[categorySlug];
  
  // Debug: Log the mapped category
  console.log("Mapped Category:", category);
  
  // Debug: Show all available categories in coursesData
  const availableCategories = [...new Set(Object.values(coursesData).map(course => course.category))];
  console.log("Available Categories:", availableCategories);
  
  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">CategorySlug: {categorySlug}</p>
          <NavLink 
            to="/" 
            className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go to Home
          </NavLink>
        </div>
      </div>
    );
  }

  // Filter courses by category
  const categoryCourses = Object.entries(coursesData)
    .filter(([slug, course]) => course.category === category)
    .map(([slug, course]) => ({ ...course, slug }));

  // Debug: Log the filtered courses
  console.log("Filtered Courses:", categoryCourses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* ================= HEADER ================= */}
      <section className="px-6 py-16 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xl font-semibold tracking-widest text-indigo-600 uppercase">
            Programs
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            {category}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
            Career-focused {category.toLowerCase()} programs designed to prepare students 
            for real-world success with practical training and industry exposure.
          </p>
        </div>
      </section>

      {/* ================= COURSES GRID ================= */}
      <section className="px-6 pb-16 mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryCourses.map((course) => (
            <div
              key={course.slug}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Course Header */}
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-200 rounded-full">
                  {course.duration}
                </span>
                <h3 className="mt-3 text-xl font-bold text-gray-900">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {course.eligibility}
                </p>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Highlights</h4>
                  <ul className="space-y-2">
                    {course.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 mt-1.5 bg-indigo-600 rounded-full flex-shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Career Prospects</h4>
                  <p className="text-sm text-gray-600">
                    {course.careerProspects.slice(0, 3).join(", ")} and more...
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Fees</p>
                    <p className="text-sm font-semibold text-gray-900">{course.fees}</p>
                  </div>
                  <NavLink
                    to={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Details
                    <span aria-hidden>→</span>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categoryCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No courses found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryCourses;
