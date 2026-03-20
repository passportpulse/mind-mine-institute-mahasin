import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Faq from "./pages/Faq";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CategoryCourses from "./pages/CategoryCourses";
import Contact from "./pages/Contact";

// Student Zone Pages
import StudentZoneLayout from "./pages/studentZone/StudentZoneLayout";
import Enquiry from "./pages/studentZone/Enquiry";
import OnlineApplication from "./pages/studentZone/OnlineApplication";
import Notice from "./pages/studentZone/Notice";
import Payment from "./pages/studentZone/Payment";
import CheckStatus from "./pages/studentZone/CheckStatus";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Applications from "./pages/admin/Applications";
import AdminLogin from "./pages/admin/AdminLogin";

const App = () => {
  return (
    <>
      <Navbar />

      {/* 🔑 Global scroll handler */}
      <ScrollToTop />

      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />

        {/* Courses */}
        <Route
          path="/courses/category/:categorySlug"
          element={<CategoryCourses />}
        />
        <Route path="/courses/:courseSlug" element={<Courses />} />

        {/* Legacy redirects for old category URLs */}
        <Route
          path="/courses/management-it"
          element={<Navigate to="/courses/category/management-it" replace />}
        />
        <Route
          path="/courses/design-technology"
          element={
            <Navigate to="/courses/category/design-technology" replace />
          }
        />
        <Route
          path="/courses/healthcare"
          element={<Navigate to="/courses/category/healthcare" replace />}
        />
        <Route
          path="/courses/food-culinary-nutrition"
          element={
            <Navigate to="/courses/category/food-culinary-nutrition" replace />
          }
        />

        {/* Student Zone (Nested Routes) */}
        <Route path="/student-zone" element={<StudentZoneLayout />}>
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="online-application" element={<OnlineApplication />} />
          <Route path="notice" element={<Notice />} />
          <Route path="payment" element={<Payment />} />
          <Route path="check-status" element={<CheckStatus />} />
        </Route>
        {/* Admin Panel */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
