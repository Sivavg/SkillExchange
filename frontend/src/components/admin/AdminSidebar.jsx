import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBookOpen, FiMessageSquare, FiBarChart2, FiPieChart, FiSettings } from 'react-icons/fi';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/skills', icon: FiBookOpen, label: 'Skills' },
    { path: '/admin/matches', icon: FiMessageSquare, label: 'Matches' },
    { path: '/admin/reports', icon: FiBarChart2, label: 'Reports' },
    { path: '/admin/analytics', icon: FiPieChart, label: 'Analytics' },
    { path: '/admin/settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-2xl font-bold gradient-text">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white transition-colors"
        >
          <FiHome size={20} />
          <span>Back to User View</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
