const AboutContent = () => {
  return (
    <section className="py-16 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* About Us Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ABOUT US</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Maharaja Agrasain Dham-Mindmine Institute for Skill Training (MA DHAM-MIST) a Joint Collaborative Institution of Maharaja Agrasain Dham Trust and Mindmine Institute for Skill Training Society run by dedicated and experienced professionals in field of education. This campus is about 50 KM from Kolkata city and also 50 KM from Kharagpur and having lush green 100 acres campus near Bagnan city of Dist-Howrah and near Kolaghat of Dist-Purba Medinipore, well connected with South Eastern Railway line and just 200 meter from Ghoraghata Railway station.
                </p>
                <p>
                  Already running a general hospital, a mental development center and one occupational therapy center as well as free artificial limb center. Also planning to start wellness center, old age home, regular school and college and Agrakul Devi Mahalakshmi Ji Mandir. On post pandemic demand of today's world of skill development education we have started this institution in year 2023. In this curriculum Mindmine Institute for Skill Training is a pioneer institution since 1998 become joined hand in this project.
                </p>
              </div>
            </div>

            {/* Mission Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MISSION</h2>
              <p className="text-gray-600 leading-relaxed">
                To upgrade skill to international standards through significant industry exposure and develop necessary frameworks for standard curriculum and quality training.
              </p>
            </div>

            {/* Ambition Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AMBITION</h2>
              <p className="text-gray-600 leading-relaxed">
                Learning new skills is one of best ways to become more successful in your career. Whether you are looking for a new career opportunity or would like to move into a new role, upgrading your skills can increase your chances of reaching your career goals.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* From The Desk Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">FROM THE DESK OF OUR PRESIDENT</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We have great pleasure in welcoming you to Maharaja Agrasain Dham-Mindmine Institute for Skill Training (MA DHAM-MIST), a Joint Collaborative Institution of Maharaja Agrasain Dham Trust and Mindmine Institute for Skill Training Society for undertaking studies for Skill Development Training Program in various areas and faculties covering the entire spectrum of Paramedical, Design, Professional, IT and Management disciplines.
                </p>
                <p>
                  MA DHAM-MIST is providing high quality teaching and training for equipping youth acquires knowledge and skill for enhancing quality of life, knowledge and skill acquisition, gainful employment. The curriculum and training program of MA DHAM-MIST are knowledge and skill-focused and at the same time tailor made to the development of international demand are the priority agenda of MA DHAM-MIST.
                </p>
                <p>
                  On behalf of the entire Academic and Administrative community of MA DHAM-MIST we invite you to experience the quality education system prevailing here. MA DHAM-MIST is having good tie-ups with the latest national and international technical organizations all over the world, which help and accelerate our students to be placed smoothly and quickly.
                </p>
                <p>
                  MA DHAM-MIST is conveniently located near Ghoraghata railway station in Howrah District, in a 100 acres campus which helps people access easily. We are having all modern facility with all amenities, which saves travelling and helps concentrate on studies.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-indigo-600 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-600">100 acres lush green campus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-indigo-600 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-600">200 meters from Ghoraghata Railway Station</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-indigo-600 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-600">Well connected with South Eastern Railway</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-indigo-600 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-600">Modern facilities with all amenities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-indigo-600 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-600">Running hospital and healthcare centers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
