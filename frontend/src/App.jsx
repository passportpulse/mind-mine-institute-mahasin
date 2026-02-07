import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import StudentZone from "./pages/StudentZone";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/student-zone" element={<StudentZone />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Global Footer */}
      <Footer />
    </>
  );
};

export default App;
