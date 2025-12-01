import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiSearch, FiMessageSquare, FiVideo, FiStar, FiArrowRight } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: FiUserPlus,
      title: 'Create Your Profile',
      description: 'Sign up for free and list the skills you can teach and want to learn. Add a bio and location to help others find you.',
      color: 'primary'
    },
    {
      icon: FiSearch,
      title: 'Find Your Match',
      description: 'Search for users who have skills you want to learn and who want to learn your skills. Our smart matching helps you find the perfect exchange partner.',
      color: 'green'
    },
    {
      icon: FiMessageSquare,
      title: 'Connect & Schedule',
      description: 'Send a connection request with a message. Once accepted, chat in real-time and schedule your video session at a convenient time.',
      color: 'blue'
    },
    {
      icon: FiVideo,
      title: 'Exchange Knowledge',
      description: 'Join the video call at your scheduled time. Use integrated video and chat to teach and learn. Each session is typically 1 hour.',
      color: 'yellow'
    },
    {
      icon: FiStar,
      title: 'Rate & Earn Credits',
      description: 'After the session, rate your experience. Teaching earns you credits, which you can use to learn from others. Build your reputation!',
      color: 'purple'
    }
  ];

  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h1>
            <p className="text-xl text-gray-600">
              Get started with skill exchange in 5 simple steps
            </p>
          </div>

          <div className="space-y-12 mb-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="card hover:scale-105 transform transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 rounded-full ${colorClasses[step.color]} flex items-center justify-center flex-shrink-0`}>
                    <step.icon size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl font-bold text-gray-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white text-center animate-scale-in">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-xl text-primary-100 mb-6">
              Join thousands of learners exchanging skills for free
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Create Free Account
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
