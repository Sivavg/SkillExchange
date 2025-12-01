import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SE</span>
              </div>
              <span className="text-xl font-bold text-white">SkillExchange</span>
            </div>
            <p className="text-sm text-gray-400">
              Learn and teach skills for free. Connect with peers and grow together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-primary-400 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/find-skills" className="hover:text-primary-400 transition-colors">Find Skills</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Community</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SkillExchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
