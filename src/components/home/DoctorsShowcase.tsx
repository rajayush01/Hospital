import React, { useState } from "react";
import BookingModal from "../ui/BookingModal";
import img1 from "../../assets/doc1.png";
import img2 from "../../assets/doc2.png";
import img3 from "../../assets/doc3.png";
import { useNavigate } from "react-router-dom";

const DoctorsShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: "Dr. Jaya Mishra",
      specialty: "Ob-Gyn & Infertility Specialist",
      qualification: "M.B.B.S., D.G.O. (AFMC, Pune)",
      experience: "30+ years",
      surgeries: "20,000-25,000",
      deliveries: "25,000+",
      image: img1,
      description:
        "Preeminent Ob-Gyn practitioner, infertility specialist, and laparoscopic surgeon",
      role: "Founder, Mahakaleshwar IVF Centre",
      route: "/jaya",
    },
    {
      id: 2,
      name: "Dr. Katyayan Mishra",
      specialty: "Dermatology & Cosmetology",
      qualification: "M.B.B.S., M.D. (AFMC, Pune)",
      experience: "30+ years",
      position: "President, IMA Ujjain",
      association: "President, Ujjain Nursing Home Association",
      image: img2,
      description:
        "Distinguished Dermatologist, Cosmetologist, and Laser Surgeon",
      role: "Director, J.K. Hospital",
      route: "/katyayan",
    },
    {
      id: 3,
      name: "Dr. Anany Mishra",
      specialty: "Business & Healthcare Management",
      qualification: "M.B.B.S., Masters in International Business",
      experience: "5+ years",
      education: "Hult International Business School, Boston",
      company: "J.K. Lifecare Centers Pvt. Ltd.",
      image: img3,
      description:
        "Managing Director focusing on pharmaceutical manufacturing and healthcare innovation",
      role: "Managing Director, J.K. Lifecare Centers",
      route: "/Anany",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-cyan-50 py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-100 rounded-full mb-3 sm:mb-4">
              <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                Meet Our Experts
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-3 sm:mb-4 px-4">
              Our Specialist Doctors
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Expert healthcare professionals dedicated to your wellbeing and
              exceptional care
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-blue-100 hover:shadow-blue-200 transition-all duration-500 hover:scale-105 group"
              >
                {/* Doctor Image */}
                <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                    <span className="text-yellow-500 text-base sm:text-lg font-bold">★ {doctor.rating}</span>
                  </div> */}
                </div>

                {/* Doctor Details */}
                <div className="p-5 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    {doctor.name}
                  </h3>

                  <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-3 sm:mb-4">
                    <span className="text-blue-600 font-semibold text-xs sm:text-sm">
                      {doctor.specialty}
                    </span>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                    {doctor.description}
                  </p>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-start justify-between">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        Qualification:
                      </span>
                      <span className="font-semibold text-gray-800 text-xs sm:text-sm text-right">
                        {doctor.qualification}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        Experience:
                      </span>
                      <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                        {doctor.experience}
                      </span>
                    </div>
                    {doctor.surgeries && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          Surgeries:
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                          {doctor.surgeries}
                        </span>
                      </div>
                    )}
                    {doctor.deliveries && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          Deliveries:
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                          {doctor.deliveries}
                        </span>
                      </div>
                    )}
                    {doctor.position && (
                      <div className="flex items-start justify-between">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          Position:
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm text-right">
                          {doctor.position}
                        </span>
                      </div>
                    )}
                    {doctor.association && (
                      <div className="flex items-start justify-between">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          Association:
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm text-right">
                          {doctor.association}
                        </span>
                      </div>
                    )}
                    {doctor.education && (
                      <div className="flex items-start justify-between">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          Education:
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm text-right">
                          {doctor.education}
                        </span>
                      </div>
                    )}
                    {doctor.company && (
                      <div className="flex items-start justify-between">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          Company:
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm text-right">
                          {doctor.company}
                        </span>
                      </div>
                    )}
                    {doctor.role && (
                      <div className="flex items-start justify-between">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          Role:
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm text-right">
                          {doctor.role}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Book Appointment
                    </button>
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(doctor.route);
                      }}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      See More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DoctorsShowcase;
