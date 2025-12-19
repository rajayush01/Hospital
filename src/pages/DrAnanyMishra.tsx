import React from 'react';
import { User, Award, BookOpen, Heart } from 'lucide-react';
import img from '../assets/doc3.png';

const DrAnanyMishra = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-50  p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 mt-20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-8xl">
              <img src={img} alt="Dr. Jaya"  className='h-40 w-40 rounded-full'/>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-cyan-900 mb-2">
                Dr. Anany Mishra
              </h1>
              <p className="text-lg text-cyan-700 font-semibold mb-1">
                M.B.B.S., Masters in International Business
              </p>
              <p className="text-md text-cyan-600 mb-4">
                (Hult International Business School, Boston - 2019 Joining Batch)
              </p>
              <div className="space-y-2">
                <div className="inline-block bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium mr-2 mb-2">
                  Managing Director, J.K. Lifecare Centers Pvt. Ltd.
                </div>
                <div className="inline-block bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">
                  Treasurer, Stanford International School (since 2018)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="text-cyan-600" size={24} />
            <h2 className="text-2xl font-bold text-cyan-900">Professional Overview</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Welcome, I am Dr. Anany Mishra, the Managing Director of J.K. Lifecare Centers Pvt. Ltd., a burgeoning pharmaceutical manufacturing company. I also serve as the Treasurer for Stanford International School in Ujjain since 2018 and am part of the management team for J.K. Hospital, Ujjain. My educational background includes an M.B.B.S. degree and a Masters in International Business from Hult International Business School, Boston.
          </p>
        </div>

        {/* Vision and Mission */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-cyan-600" size={24} />
            <h2 className="text-2xl font-bold text-cyan-900">Vision and Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            The decision to establish J.K. Lifecare Centers Pvt. Ltd. was influenced by my firsthand experience with the challenges in the global pharmaceutical supply chain, particularly during times of crisis. With a prior interest in manufacturing, I decided to set up a facility focused on APIs, bulk drugs, intermediates, and fine chemicals.
          </p>
        </div>

        {/* Strategic Location - Ujjain */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-cyan-600" size={24} />
            <h2 className="text-2xl font-bold text-cyan-900">Strategic Location - Ujjain</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Ujjain, Madhya Pradesh, is the chosen location for our manufacturing unit for several strategic reasons. Its central placement in India offers logistical advantages, while the affordable land and electricity rates make it economically viable. The availability of a skilled workforce and the ease of doing business in Ujjain further add to its appeal. Additionally, our reputation in the city, owing to our other established businesses, provides a strong foundation for this new venture.
          </p>
        </div>

        {/* Join Our Journey */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-cyan-600" size={24} />
            <h2 className="text-2xl font-bold text-cyan-900">Join Our Journey</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            As we lay the groundwork for J.K. Lifecare Centers Pvt. Ltd., we invite you to join us on this exciting journey towards creating a healthier future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrAnanyMishra;