import React from 'react';

const SupportServices = () => {
  const services = [
    {
      id: 1,
      title: 'SPECT CT',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop',
      alt: 'SPECT CT Scanner'
    },
    {
      id: 2,
      title: 'RADIATION THERAPY',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop',
      alt: 'Radiation Therapy Equipment'
    },
    {
      id: 3,
      title: '3 TESLA MRI SCANNER',
      image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=600&h=400&fit=crop',
      alt: '3 Tesla MRI Scanner'
    },
    {
      id: 4,
      title: 'Biplane Cath',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=400&fit=crop',
      alt: 'Biplane Catheterization Lab'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-cyan-50 via-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-2">
            SERVICES
          </p>
          <h1 className="text-5xl font-serif font-bold text-gray-800">
            Our Support Services
          </h1>
        </div>

        {/* Services Grid */}
        <div className="relative">
          {/* Vertical Text */}
          <div className="absolute left-0 top-0 bottom-0 flex items-center">
            <div className="transform -rotate-90 origin-left translate-x-8">
              <p className="text-xs font-semibold tracking-widest text-gray-400 whitespace-nowrap uppercase">
                Explore Services
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="ml-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/4]">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Title and Explore Link */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {service.title}
                  </h3>
                  <button className="text-gray-400 text-sm hover:text-blue-500 transition-colors duration-300">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportServices;