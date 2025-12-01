import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FiUsers, FiBook, FiAward, FiZap, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              Exchange Skills, Grow Together
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Learn from peers and teach what you know. No money, just knowledge exchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                Get Started Free
              </Link>
              <Link to="/how-it-works" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all transform hover:scale-105">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, free, and effective peer-to-peer learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300 animate-slide-up">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Profile</h3>
              <p className="text-gray-600">List skills you can teach and want to learn</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBook size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Match</h3>
              <p className="text-gray-600">Connect with users who have complementary skills</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiZap size={32} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exchange</h3>
              <p className="text-gray-600">Video call sessions with integrated chat</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn Credits</h3>
              <p className="text-gray-600">Build reputation and unlock more opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <p className="text-5xl font-bold text-primary-600 mb-2">10,000+</p>
              <p className="text-xl text-gray-600">Active Users</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-5xl font-bold text-primary-600 mb-2">500+</p>
              <p className="text-xl text-gray-600">Skills Available</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-5xl font-bold text-primary-600 mb-2">50,000+</p>
              <p className="text-xl text-gray-600">Sessions Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of learners exchanging skills for free
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Started Now
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
