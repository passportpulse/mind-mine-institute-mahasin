import mainBanner from "../../../src/assets/main-banner.jpg";

const AboutHero = () => {
  return (
    <section
      className="relative h-[220px] bg-cover bg-center"
      style={{ backgroundImage: `url(${mainBanner})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <h1 className="text-4xl font-extrabold md:text-5xl">About</h1>

        <div className="px-5 py-1 mt-4 text-sm font-semibold rounded-full bg-white/20 backdrop-blur">
          Home &nbsp;›&nbsp; About
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
