import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/homeComponents/Hero";
import Programs from "../components/homeComponents/Programs";
import WhyChooseUs from "../components/homeComponents/WhyChooseUs";
import Performance from "../components/homeComponents/Performance";
import StatsStrip from "../components/homeComponents/StatsStrip";
import StudentZoneCTA from "../components/homeComponents/StudentZoneCTA";

const Home = () => {
  return (
    <>
      <Hero />
      <Programs />
      <WhyChooseUs />
      <Performance />
      <StatsStrip />
      <StudentZoneCTA />
    </>
  );
};

export default Home;
