import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const VideoTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const testimonials = [
    {
      name: "SARAH",
      fullName: "SARAH MITCHELL",
      role: "CARDIAC PATIENT",
      time: "3 weeks ago",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop"
    },
    {
      name: "JAMES",
      fullName: "JAMES THOMPSON",
      role: "ORTHOPEDIC PATIENT",
      time: "1 month ago",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
    },
    {
      name: "MARIA",
      fullName: "MARIA GARCIA",
      role: "MATERNITY PATIENT",
      time: "2 weeks ago",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop"
    },
    {
      name: "DAVID",
      fullName: "DAVID CHEN",
      role: "SURGERY PATIENT",
      time: "5 days ago",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop"
    },
    {
      name: "LAUREN",
      fullName: "LAUREN WILLIAMS",
      role: "PEDIATRIC PATIENT",
      time: "1 week ago",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], offset: i });
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-cyan-100 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-blue-100 rounded-full mb-4">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Patient Stories</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
            Over 1000+ People Trust Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear directly from our patients about their exceptional healthcare experiences and successful treatment journeys
          </p>
        </div>

        <div className="relative flex items-center justify-center min-h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Side Cards */}
            <div className="absolute left-0 md:left-28 flex items-center gap-3 z-10">
              {/* Far Left */}
              <div className="hidden lg:block w-20 h-[380px] bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.2) 10px, rgba(255,255,255,.2) 20px)'
                }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-bold tracking-[0.3em] whitespace-nowrap" style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                  }}>
                    {visibleTestimonials[0].name}
                  </span>
                </div>
              </div>

              {/* Second from Left */}
              <div className="hidden md:block w-24 h-[440px] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.2) 10px, rgba(255,255,255,.2) 20px)'
                }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-bold tracking-[0.3em] whitespace-nowrap" style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                  }}>
                    {visibleTestimonials[1].name}
                  </span>
                </div>
                <button
                  onClick={prevTestimonial}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <ChevronLeft className="text-blue-600" size={20} />
                </button>
              </div>
            </div>

            {/* Center Main Video Card */}
            <div className="relative w-full max-w-[600px] h-[400px] md:h-[480px] bg-white rounded-2xl overflow-hidden shadow-2xl mx-4 z-20 border-4 border-blue-200">
              <img
                src={visibleTestimonials[2].image}
                alt={visibleTestimonials[2].fullName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"></div>
              
              {/* Play Button */}
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border-4 border-blue-200">
                <Play className="text-blue-600 ml-1" size={28} fill="currentColor" />
              </button>

              {/* Patient Info */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1">{visibleTestimonials[2].fullName}</h3>
                <p className="text-sm text-blue-100">{visibleTestimonials[2].role}</p>
                <p className="text-xs text-blue-200 mt-1">{visibleTestimonials[2].time}</p>
              </div>
            </div>

            {/* Right Side Cards */}
            <div className="absolute right-0 md:right-28 flex items-center gap-3 z-10">
              {/* Second from Right */}
              <div className="hidden md:block w-24 h-[440px] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.2) 10px, rgba(255,255,255,.2) 20px)'
                }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-bold tracking-[0.3em] whitespace-nowrap" style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                  }}>
                    {visibleTestimonials[3].name}
                  </span>
                </div>
                <button
                  onClick={nextTestimonial}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <ChevronRight className="text-blue-600" size={20} />
                </button>
              </div>

              {/* Far Right */}
              <div className="hidden lg:block w-20 h-[380px] bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.2) 10px, rgba(255,255,255,.2) 20px)'
                }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-bold tracking-[0.3em] whitespace-nowrap" style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                  }}>
                    {visibleTestimonials[4].name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-30">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg border-2 border-blue-200"
            >
              <ChevronLeft className="text-blue-600" size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg border-2 border-blue-200"
            >
              <ChevronRight className="text-blue-600" size={24} />
            </button>
          </div>
        </div>

        {/* See all reviews link */}
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-blue-600 hover:text-cyan-600 font-semibold text-lg transition-colors">
            See all reviews by our customers
            <ChevronRight className="ml-1" size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonials;