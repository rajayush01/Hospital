import React from 'react';
import { User, Award, BookOpen, Heart, Briefcase} from 'lucide-react';
import img from '../assets/doc2.png';

const DrKatyayanMishra = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-2">
                Dr. Katyayan Mishra
              </h1>
              <p className="text-lg text-sky-700 font-semibold">
                M.B.B.S., M.D. (AFMC, Pune 92 Batch)
              </p>
            </div>
          </div>
        </div>

        {/* Director Roles */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-sky-600" size={24} />
            <h2 className="text-2xl font-bold text-sky-900">Director</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-lg border-l-4 border-sky-400">
              <p className="text-sky-800 font-medium">Stanford Education Society</p>
            </div>
            <div className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-lg border-l-4 border-sky-400">
              <p className="text-sky-800 font-medium">J.K. Hospital</p>
            </div>
            <div className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-lg border-l-4 border-sky-400">
              <p className="text-sky-800 font-medium">J.K. College of Nursing</p>
            </div>
            <div className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-lg border-l-4 border-sky-400">
              <p className="text-sky-800 font-medium">J.K. Lifecare Centers Pvt. Ltd.</p>
            </div>
          </div>
        </div>

        {/* Professional Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="text-sky-600" size={24} />
            <h2 className="text-2xl font-bold text-sky-900">Professional Overview</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Dr. Katyayan Mishra is a distinguished Dermatologist, Cosmetologist, and Laser Surgeon based in Ujjain, Madhya Pradesh. With a career spanning nearly three decades, he has established himself as a leading authority in his field. His extensive experience and innovative approaches have made him a sought-after expert in dermatological care.
          </p>
        </div>

        {/* Leadership and Impact */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-sky-600" size={24} />
            <h2 className="text-2xl font-bold text-sky-900">Leadership and Impact</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            In addition to his clinical practice, Dr. Mishra holds significant leadership positions in various medical organizations. He currently serves as the President of the Indian Medical Association's Ujjain branch and is also the President of the Ujjain Nursing Home Association.
          </p>
        </div>

        {/* Past Contributions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-sky-600" size={24} />
            <h2 className="text-2xl font-bold text-sky-900">Past Contributions</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            His past roles include serving as the State President of the Dermatology Society of Madhya Pradesh and as the Secretary of the same organization, further solidifying his reputation as a leader in dermatology.
          </p>
        </div>

        {/* Academic and Scientific Contributions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-sky-600" size={24} />
            <h2 className="text-2xl font-bold text-sky-900">Academic and Scientific Contributions</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Dr. Mishra is actively involved in the advancement of medical science. He has participated in numerous scientific programs and has been a contributing author to several scientific papers. His work has been presented at multiple conferences, earning him recognition within the medical community.
          </p>
        </div>

        {/* Personal Interests */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-sky-600" size={24} />
            <h2 className="text-2xl font-bold text-sky-900">Personal Interests</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Outside of his professional life, Dr. Mishra is an avid sports enthusiast with a particular fondness for Badminton, Cricket, Chess, Table Tennis, Hockey, and Squash. His diverse interests reflect his holistic approach to life and wellness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrKatyayanMishra;