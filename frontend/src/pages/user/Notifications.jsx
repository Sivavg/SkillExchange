import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FiBell, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Notifications = () => {
  // Mock notifications - replace with API call
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Match Accepted',
      message: 'John Doe accepted your match request',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Match Request',
      message: 'Jane Smith wants to exchange skills with you',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Session Completed',
      message: 'You earned 1 credit from your session with Mike',
      time: '1 day ago',
      read: true
    }
  ];

  const getIcon = (type) => {
    return type === 'success' ? <FiCheckCircle className="text-green-600" /> : <FiAlertCircle className="text-blue-600" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with your skill exchange activities</p>
          </div>

          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`card hover:shadow-xl transition-all animate-slide-up ${
                  !notification.read ? 'border-l-4 border-primary-600' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
