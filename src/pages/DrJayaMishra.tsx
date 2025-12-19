
import React from 'react';
import { User, Award, BookOpen, Heart, Briefcase } from 'lucide-react';
import img from '../assets/doc1.png';

// Dr. Jaya Mishra Component
const DrJayaMishra = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 mt-20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-8xl">
              <img src={img} alt="Dr. Jaya"  className='h-40 w-40 rounded-full'/>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                Dr. Jaya Mishra
              </h1>
              <p className="text-lg text-blue-700 font-semibold mb-4">
                M.B.B.S., D.G.O. (AFMC, PUNE 93 BATCH)
              </p>
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Founder, Mahakaleshwar IVF Centre
              </div>
            </div>
          </div>
        </div>

        {/* Director Roles */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-blue-900">Director</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium">Stanford Education Society</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium">J.K. Hospital</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium">J.K. College of Nursing</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium">J.K. Lifecare Centers Pvt. Ltd.</p>
            </div>
          </div>
        </div>

        {/* Professional Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-blue-900">Professional Overview</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Dr. Jaya Mishra is a preeminent Ob-Gyn practitioner, infertility specialist, and laparoscopic surgeon based in Ujjain, Madhya Pradesh. With an illustrious career spanning nearly three decades, she has performed an astounding 20,000-25,000 surgeries and overseen more than 25,000 deliveries. Her expertise has made her a leading authority in her field, as evidenced by her numerous scientific papers and presentations.
          </p>
        </div>

        {/* Leadership and Impact */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-blue-900">Leadership and Impact</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Under Dr. Mishra's stewardship, J.K. Hospital has become a regional hub for high-risk obstetric cases, serving patients from Ujjain and surrounding areas. Her guidance has positioned the hospital as the preferred choice for referring serious obstetric patients.
          </p>
        </div>

        {/* Educational Contributions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-blue-900">Educational Contributions</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Dr. Mishra's influence extends beyond healthcare; she also guides the Stanford Education Society and J.K. College of Nursing. Under her leadership, these institutions focus on holistic health, encompassing Physical, Emotional, Social, Spiritual, and Intellectual well-being, thereby nurturing well-rounded individuals from a young age.
          </p>
        </div>

        {/* Social and Environmental Advocacy */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-blue-900">Social and Environmental Advocacy</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            A committed advocate for social and environmental causes, Dr. Mishra regularly organizes free medical check-ups and camps. An ardent animal and environmental lover, she takes the time to feed and care for birds, reflecting her holistic approach to life.
          </p>
        </div>

        {/* Literary and Artistic Achievements */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-blue-900">Literary and Artistic Achievements</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Dr. Jaya Mishra is also an accomplished author and artist. She has penned three books, including two collections of original poetry—'Purani Diary se' and 'Me Jaya hu'—and a collection of short stories titled 'I'm Special'. Additionally, she has composed numerous Shiv Bhajans and released two musical albums featuring her original work, performed by herself and other renowned singers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrJayaMishra;