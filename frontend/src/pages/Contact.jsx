import mainBanner from "../assets/main-banner.jpg";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section
        className="relative h-[220px]  bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBanner})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h1 className="text-4xl font-extrabold md:text-5xl">Contact Us</h1>

          <div className="px-5 py-1 mt-4 text-sm font-semibold rounded-full bg-white/20 backdrop-blur">
            Home &nbsp;›&nbsp; Contact Us
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="grid gap-16 px-6 py-20 mx-auto max-w-7xl lg:grid-cols-2">
        {/* ================= LEFT INFO ================= */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            We’re always excited to hear from you
          </h2>

          <p className="max-w-lg mt-3 text-gray-600">
            Reach out to us for admissions, course details, or guidance. Our
            team will assist you with the right information.
          </p>

          {/* INFO CARDS */}
          <div className="mt-10 space-y-6">
            {/* OUR CAMPUSES */}
            <div className="p-6 bg-white border shadow-sm rounded-3xl">
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center flex-shrink-0 text-white bg-indigo-600 rounded-full h-14 w-14">
                  <MapPin />
                </div>

                <div>
                  <h4 className="mb-3 text-lg font-bold text-gray-900">
                    Our Campuses
                  </h4>

                  <p className="text-sm leading-relaxed text-gray-600">
                    <b>Howrah Campus:</b>
                    <br />
                    Maharaja Agrasain Dham, Ghoraghata, PS-Bagnan, Howrah –
                    711303
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    <b>Kolkata City Campus:</b>
                    <br />
                    52A, Indian Mirror Street, Taltala, Opp. G.D. Hospital,
                    Kolkata – 700013
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    <b>South Kolkata Campus:</b>
                    <br />
                    64, James Long Sarani, “Baisakhi Villa”, Thakurpukur, Near
                    Joka Metro Station, Kolkata – 700104
                  </p>
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="p-6 bg-white border shadow-sm rounded-3xl">
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center flex-shrink-0 text-white bg-indigo-600 rounded-full h-14 w-14">
                  <Mail />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Email Address
                  </h4>
                  <p className="mt-1 text-sm text-indigo-600">
                    admissions@mindmineskillcollege.com
                  </p>
                </div>
              </div>
            </div>

            {/* PHONE NUMBERS */}
            <div className="p-6 bg-white border shadow-sm rounded-3xl">
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center flex-shrink-0 text-white bg-indigo-600 rounded-full h-14 w-14">
                  <Phone />
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900">
                    Phone Numbers
                  </h4>

                  <p className="text-sm text-gray-600">
                    <b>Howrah:</b> +91 7595077659 / +91 6289086116
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    <b>Kolkata City:</b> +91 7605057139 / +91 7595077657
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    <b>South Kolkata:</b> +91 7605057138 / +91 7595077656
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="rounded-[32px] bg-gradient-to-br from-indigo-50 to-white p-10 shadow-xl">
          <h3 className="text-2xl font-extrabold text-gray-900">
            Get in Touch
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Fill in the form and our team will contact you shortly.
          </p>

          <form className="mt-8 space-y-5">
            <input
              type="text"
              placeholder="Full Name*"
              className="w-full px-4 py-3 text-sm border outline-none rounded-xl focus:border-indigo-600"
            />

            <input
              type="email"
              placeholder="Email Address*"
              className="w-full px-4 py-3 text-sm border outline-none rounded-xl focus:border-indigo-600"
            />

            <input
              type="text"
              placeholder="Subject*"
              className="w-full px-4 py-3 text-sm border outline-none rounded-xl focus:border-indigo-600"
            />

            <textarea
              rows="4"
              placeholder="Your Message*"
              className="w-full px-4 py-3 text-sm border outline-none rounded-xl focus:border-indigo-600"
            ></textarea>

            <button
              type="submit"
              className="w-full py-4 text-sm font-bold text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Send Message →
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
