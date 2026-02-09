import kalyan from "../../assets/placement/kalyan.png";
import pantaloons from "../../assets/placement/pantaloons.png";
import apollo from "../../assets/placement/apollo.png";
import psGroup from "../../assets/placement/ps-group.png";
import ckBirla from "../../assets/placement/ck-birla.png";
import charnock from "../../assets/placement/charnock.png";
import ruby from "../../assets/placement/ruby-hospital.png";
import svs from "../../assets/placement/svs-marwari.png";

const partners = [
  kalyan,
  pantaloons,
  apollo,
  psGroup,
  ckBirla,
  charnock,
  ruby,
  svs,
];

const PlacementPartnersSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <p className="text-xl font-semibold tracking-widest text-indigo-600 uppercase">
            Our Placement Partners
          </p>

          <h2 className="mt-4 text-4xl font-semibold text-gray-900">
            Trusted by Leading{" "}
            <span className="text-indigo-600">Organizations</span>
          </h2>

          <p className="mt-5 text-gray-600">
            Our students are placed with reputed brands, hospitals, and
            organizations across multiple industries.
          </p>
        </div>

        {/* LOGO GRID */}
        <div className="grid items-center grid-cols-2 gap-12 border border-gray-200 sm:grid-cols-3 md:grid-cols-4 rounded-3xl p-14">
          {partners.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={logo}
                alt="Placement Partner"
                className="object-contain max-h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementPartnersSection;
