import AboutHero from "../components/about/AboutHero";
import AboutContent from "../components/about/AboutContent";
import InfoCardGrid from "../components/about/InfoCardGrid";
import { aboutCards } from "../data/aboutData";

import ProgressStatsSection from "../components/homeComponents/ProgressStatsSection";
import StatsHighlightSection from "../components/homeComponents/StatsHighlightSection";
import PlacementPartnersSection from "../components/homeComponents/placement-partners";
import StudentZoneCTA from "../components/homeComponents/StudentZoneCTA";

const About = () => {
  return (
    <main className="bg-white">
      <AboutHero />
      <AboutContent />
      <InfoCardGrid cards={aboutCards} />

      {/* Shared Sections */}
      <ProgressStatsSection />
      <StatsHighlightSection />
      <PlacementPartnersSection />
      <StudentZoneCTA />
    </main>
  );
};

export default About;
