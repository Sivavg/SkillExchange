import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatsCard from '../../components/admin/StatsCard';
import { FiTrendingUp, FiUsers, FiActivity, FiDollarSign } from 'react-icons/fi';

const Analytics = () => {
  const metrics = [
    { title: 'Daily Active Users', value: '1,234', icon: FiUsers, color: 'primary', trend: { value: 12, isPositive: true } },
    { title: 'Session Completion Rate', value: '87%', icon: FiActivity, color: 'green', trend: { value: 5, isPositive: true } },
    { title: 'User Growth', value: '+245', icon: FiTrendingUp, color: 'purple', trend: { value: 18, isPositive: true } },
    { title: 'Avg. Session Duration', value: '45m', icon: FiDollarSign, color: 'yellow', trend: { value: 3, isPositive: false } }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Detailed insights and metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <StatsCard {...metric} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card animate-scale-in">
            <h2 className="text-xl font-bold text-gray-900 mb-4">User Growth</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart Placeholder - Use Chart.js or Recharts</p>
            </div>
          </div>

          <div className="card animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skill Categories</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart Placeholder - Pie Chart</p>
            </div>
          </div>

          <div className="card animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Session Statistics</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart Placeholder - Bar Chart</p>
            </div>
          </div>

          <div className="card animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Skills</h2>
            <div className="space-y-3">
              {['React.js', 'Python', 'UI/UX Design', 'Digital Marketing', 'Spanish'].map((skill, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-700">{skill}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${100 - i * 15}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{100 - i * 15}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
