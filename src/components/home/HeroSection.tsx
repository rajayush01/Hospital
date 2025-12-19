import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import video from '../../assets/hosp.mp4';
import BookingModal from '../ui/BookingModal';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const actionButtons = [
    { label: 'Book Appointment', icon: ArrowRight, action: () => setIsModalOpen(true) },
    { label: 'Find Hospital', icon: ArrowRight, action: () => console.log('Find Hospital') },
    { label: 'Book Health Check', icon: ArrowRight, action: () => console.log('Book Health Check') },
    { label: 'Get Expert Opinion', icon: ArrowRight, action: () => console.log('Get Expert Opinion') }
  ];

  return (
    <>
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        </div>
        
        {/* Themed Overlay - Light Blue to White gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/55 via-black/50 to-blue-500/55"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-5 sm:top-20 sm:right-20 w-40 h-40 sm:w-72 sm:h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-5 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-5xl w-full text-center">
            {/* Heading - Responsive text sizes */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-cyan-500 leading-tight">
              Your Health, Our Priority
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
              Experience world-class healthcare with cutting-edge technology and compassionate care
            </p>

            {/* Search Bar - Responsive sizing */}
            <div className="relative max-w-3xl mx-auto mb-8 sm:mb-12">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search For Doctors & Specialities..."
                className="w-full px-6 sm:px-8 py-4 sm:py-6 rounded-full bg-white/90 backdrop-blur-md text-gray-800 placeholder-gray-500 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-2xl border border-blue-100"
              />
              <button className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition rounded-full p-3 sm:p-4 shadow-lg">
                <Search size={20} className="text-white sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Action Buttons - Responsive grid layout */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              {actionButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.action}
                  className="group bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 rounded-full px-4 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 flex items-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border border-blue-100 text-sm sm:text-base"
                >
                  <span className="font-semibold text-gray-800 group-hover:text-white transition whitespace-nowrap">
                    {button.label}
                  </span>
                  <button.icon 
                    size={16} 
                    className="text-gray-800 group-hover:text-white transition transform group-hover:translate-x-1 sm:w-5 sm:h-5" 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Chat Button - Responsive sizing and positioning */}
        <button className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition rounded-full shadow-2xl flex items-center justify-center z-50 animate-pulse">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-xl sm:text-2xl">💬</span>
          </div>
        </button>
      </div>
      
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default HeroSection;