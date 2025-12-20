import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Specialty {
  id: string;
  name: string;
  description: string;
  image: string;
  procedures: string[];
}

const specialties: Specialty[] = [
  {
    id: 'cardiac',
    name: 'ENT (EAR, NOSE, THROAT)',
    description: "Our Cardiac Sciences department is at the forefront of cardiac care, offering a comprehensive range of services from advanced diagnostics and minimally invasive procedures to complex surgeries and rehabilitation programs.",
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop',
    procedures: ['HEART TRANSPLANT', 'ANGIOPLASTY', 'CARDIAC SURGERY']
  },
  {
    id: 'oncology',
    name: 'Gynecology and Obstetrics',
    description: "Our Oncology department provides cutting-edge cancer care with advanced treatment options, personalized care plans, and comprehensive support throughout the treatment journey.",
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop',
    procedures: ['CANCER TREATMENT', 'RADIATION THERAPY', 'CHEMOTHERAPY']
  },
  {
    id: 'neurosciences',
    name: 'General Medicine',
    description: "Leading the way in neurological care, our Neurosciences center offers advanced diagnostics, surgical interventions, and rehabilitative services for complex neurological conditions.",
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    procedures: ['BRAIN SURGERY', 'SPINE SURGERY', 'NEUROLOGY']
  },
  // {
  //   id: 'gastroenterology',
  //   name: 'Gastroenterology',
  //   description: "Our Gastroenterology department specializes in digestive system disorders, offering state-of-the-art diagnostic and therapeutic procedures with expert clinical care.",
  //   image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop',
  //   procedures: ['LIVER TRANSPLANT', 'ENDOSCOPY', 'COLONOSCOPY']
  // },
  // {
  //   id: 'orthopaedics',
  //   name: 'Orthopaedics',
  //   description: "Experience world-class orthopaedic care with our specialized team providing joint replacements, sports medicine, and comprehensive rehabilitation services.",
  //   image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop',
  //   procedures: ['JOINT REPLACEMENT', 'ARTHROSCOPY', 'SPORTS MEDICINE']
  // },
  // {
  //   id: 'transplants',
  //   name: 'Transplants',
  //   description: "Our Transplants center is a pioneer in organ transplantation, offering kidney, liver, heart, and other organ transplants with exceptional success rates.",
  //   image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop',
  //   procedures: ['ORGAN TRANSPLANT', 'BONE MARROW', 'KIDNEY TRANSPLANT']
  // }
];

const ClinicalExcellenceCenters = () => {
  const [activeTab, setActiveTab] = useState('cardiac');

  const activeSpecialty = specialties.find(s => s.id === activeTab) || specialties[0];

  const handlePrevious = () => {
    const currentIndex = specialties.findIndex(s => s.id === activeTab);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : specialties.length - 1;
    setActiveTab(specialties[previousIndex].id);
  };

  const handleNext = () => {
    const currentIndex = specialties.findIndex(s => s.id === activeTab);
    const nextIndex = currentIndex < specialties.length - 1 ? currentIndex + 1 : 0;
    setActiveTab(specialties[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-100 rounded-full mb-3 sm:mb-4">
            <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">Our Expertise</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 sm:mb-6 px-2">
            Centres Of Clinical Excellence
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            Experience world-class healthcare at our specialized hubs of medical innovation. 
            Our state-of-the-art centres deliver unparalleled expertise in key specialties.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16 px-2">
          {specialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => setActiveTab(specialty.id)}
              className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wide transition-all duration-300 ${
                activeTab === specialty.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl scale-105'
                  : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg'
              }`}
            >
              {specialty.name}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Left Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 sm:mb-6">
                  {activeSpecialty.name}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  {activeSpecialty.description}
                </p>
                <button className="text-blue-600 font-semibold hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm sm:text-base">
                  Read More <ChevronRight size={18} />
                </button>

                <div className="mt-6 sm:mt-8 md:mt-10">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    Top Specialties & Procedures
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {activeSpecialty.procedures.map((procedure, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex-shrink-0"></div>
                        <span className="text-blue-600 font-semibold text-xs sm:text-sm">{procedure}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                  FIND DOCTOR
                  <ChevronRight size={20} />
                </button>
                <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                  EXPLORE MORE
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex items-center justify-center mt-6 md:mt-0">
              <div className="relative group w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl sm:rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <img
                  src={activeSpecialty.image}
                  alt={activeSpecialty.name}
                  className="relative rounded-xl sm:rounded-2xl w-full h-64 sm:h-80 md:h-full object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-2 sm:left-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white flex items-center justify-center hover:from-blue-500 hover:to-cyan-500 transition-all shadow-xl z-10"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center hover:from-blue-600 hover:to-cyan-600 transition-all shadow-xl z-10"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
          <button className="px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all shadow-2xl flex items-center gap-2 mx-auto text-sm sm:text-base">
            VIEW ALL SPECIALTIES
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalExcellenceCenters;