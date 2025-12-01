import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FiTarget, FiHeart, FiUsers } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About SkillExchange
            </h1>
            <p className="text-xl text-gray-600">
              Democratizing education through peer-to-peer learning
            </p>
          </div>

          <div className="space-y-12">
            <div className="card animate-slide-up">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiTarget size={24} className="text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We believe everyone has something valuable to teach and something new to learn. 
                    SkillExchange connects people who want to share their knowledge without the barrier 
                    of money. Our platform makes learning accessible to everyone, everywhere.
                  </p>
                </div>
              </div>
            </div>

            <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiHeart size={24} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Values</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free and accessible education for all</li>
                    <li>• Community-driven learning</li>
                    <li>• Mutual respect and growth</li>
                    <li>• Quality over quantity</li>
                    <li>• Continuous improvement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiUsers size={24} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Community</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Join a global community of learners and teachers from diverse backgrounds. 
                    Whether you're a student, professional, or hobbyist, you'll find someone who 
                    shares your passion for learning and teaching.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
