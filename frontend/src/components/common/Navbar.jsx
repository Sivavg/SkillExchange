import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiCreditCard } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">SE</span>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">SkillExchange</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/find-skills" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  Find Skills
                </Link>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium">{user?.name}</span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 animate-scale-in">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FiUser className="mr-2" /> Profile
                      </Link>
                      <Link
                        to="/credits"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FiCreditCard className="mr-2" /> Credits: {user?.credits}
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FiSettings className="mr-2" /> Settings
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center px-4 py-2 text-primary-600 hover:bg-gray-100 font-semibold"
                          onClick={() => setShowDropdown(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        <FiLogOut className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/how-it-works" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              How It Works
            </Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              About
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/find-skills" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                  Find Skills
                </Link>
                <Link to="/profile" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
                <Link to="/credits" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                  Credits: {user?.credits}
                </Link>
                {isAdmin && (
                  <Link to="/admin/dashboard" className="block py-2 text-primary-600 font-semibold" onClick={() => setIsOpen(false)}>
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-primary-600 font-semibold" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
