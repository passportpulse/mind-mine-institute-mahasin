import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/homeComponents/Hero";
import ProgramsSection from "../components/homeComponents/ProgramsSection";

import StudentZoneCTA from "../components/homeComponents/StudentZoneCTA";
import BenefitsSection from "../components/homeComponents/BenefitsSection";
import ProgressStatsSection from "../components/homeComponents/ProgressStatsSection";
import StatsHighlightSection from "../components/homeComponents/StatsHighlightSection";
import PlacementPartnersSection from "../components/homeComponents/placement-partners";

const Home = () => {
  return (
    <>
      <Hero />
      <ProgramsSection />
      <BenefitsSection />
      <ProgressStatsSection />
      <StatsHighlightSection />
      <PlacementPartnersSection />

      <StudentZoneCTA />
    </>
  );
};

export default Home;
