import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import { FiUsers, FiBook, FiMessageSquare, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import CreditBadge from '../../components/user/CreditBadge';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMatches: 0,
    pendingMatches: 0,
    completedSessions: 0,
    activeSkills: 0
  });
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get('/matches/my-matches');
      setRecentMatches(data.slice(0, 5));
      setStats({
        totalMatches: data.length,
        pendingMatches: data.filter(m => m.status === 'pending').length,
        completedSessions: data.filter(m => m.status === 'completed').length,
        activeSkills: (user.skillsToTeach?.length || 0) + (user.skillsToLearn?.length || 0)
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 mt-2">Here's what's happening with your skill exchange</p>
              </div>
              <div className="mt-4 md:mt-0">
                <CreditBadge credits={user?.credits || 0} size="lg" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card hover:scale-105 transform transition-all duration-300 animate-slide-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Matches</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalMatches}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiUsers size={24} className="text-primary-600" />
                </div>
              </div>
            </div>

            <div className="card hover:scale-105 transform transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingMatches}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FiMessageSquare size={24} className="text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="card hover:scale-105 transform transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedSessions}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FiTrendingUp size={24} className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="card hover:scale-105 transform transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Skills</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeSkills}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiBook size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              to="/find-skills"
              className="card hover:shadow-2xl hover:scale-105 transform transition-all duration-300 text-center animate-slide-up"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Skills</h3>
              <p className="text-gray-600 mb-4">Discover users to learn from</p>
              <span className="text-primary-600 font-semibold flex items-center justify-center">
                Explore Now <FiArrowRight className="ml-2" />
              </span>
            </Link>

            <Link
              to="/matches"
              className="card hover:shadow-2xl hover:scale-105 transform transition-all duration-300 text-center animate-slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">My Matches</h3>
              <p className="text-gray-600 mb-4">View your connections</p>
              <span className="text-green-600 font-semibold flex items-center justify-center">
                View All <FiArrowRight className="ml-2" />
              </span>
            </Link>

            <Link
              to="/profile"
              className="card hover:shadow-2xl hover:scale-105 transform transition-all duration-300 text-center animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBook size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">My Profile</h3>
              <p className="text-gray-600 mb-4">Update your skills</p>
              <span className="text-purple-600 font-semibold flex items-center justify-center">
                Edit Profile <FiArrowRight className="ml-2" />
              </span>
            </Link>
          </div>

          {/* Recent Matches */}
          <div className="card animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              <Link to="/matches" className="text-primary-600 hover:text-primary-700 font-semibold">
                View All
              </Link>
            </div>

            {recentMatches.length > 0 ? (
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div
                    key={match._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                        {match.requester._id === user._id
                          ? match.receiver.name?.charAt(0)
                          : match.requester.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {match.requester._id === user._id
                            ? match.receiver.name
                            : match.requester.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {match.skillOffered?.name} ↔ {match.skillRequested?.name}
                        </p>
                      </div>
                    </div>
                    <span className={`badge ${match.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {match.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No matches yet. Start by finding skills to learn!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
