import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatsCard from '../../components/admin/StatsCard';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import { FiUsers, FiBook, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSkills: 0,
    totalMatches: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [users, skills, matches] = await Promise.all([
        api.get('/users'),
        api.get('/skills'),
        api.get('/matches/my-matches') // Replace with admin endpoint
      ]);

      setStats({
        totalUsers: users.data.length,
        totalSkills: skills.data.length,
        totalMatches: matches.data.length,
        activeUsers: users.data.filter(u => u.isActive).length
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={FiUsers}
              color="primary"
              trend={{ value: 12, isPositive: true }}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <StatsCard
              title="Active Users"
              value={stats.activeUsers}
              icon={FiTrendingUp}
              color="green"
              trend={{ value: 8, isPositive: true }}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <StatsCard
              title="Total Skills"
              value={stats.totalSkills}
              icon={FiBook}
              color="purple"
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <StatsCard
              title="Total Matches"
              value={stats.totalMatches}
              icon={FiMessageSquare}
              color="yellow"
              trend={{ value: 15, isPositive: true }}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card animate-scale-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">New user registered</p>
                <p className="text-sm text-gray-500">John Doe joined the platform</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">New skill added</p>
                <p className="text-sm text-gray-500">React Native added to Programming</p>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Match completed</p>
                <p className="text-sm text-gray-500">Session between Alice and Bob</p>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
