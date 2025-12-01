import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CreditBadge from '../../components/user/CreditBadge';
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import { getTimeAgo } from '../../utils/helpers';
import { FiArrowUp, FiArrowDown, FiGift, FiRotateCcw } from 'react-icons/fi';

const MyCredits = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreditHistory();
  }, []);

  const fetchCreditHistory = async () => {
    try {
      const { data } = await api.get('/credits/history');
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'earned':
        return <FiArrowUp className="text-green-600" />;
      case 'spent':
        return <FiArrowDown className="text-red-600" />;
      case 'bonus':
        return <FiGift className="text-purple-600" />;
      case 'refund':
        return <FiRotateCcw className="text-blue-600" />;
      default:
        return null;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'earned':
        return 'text-green-600';
      case 'spent':
        return 'text-red-600';
      case 'bonus':
        return 'text-purple-600';
      case 'refund':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Credits</h1>
            <CreditBadge credits={user?.credits || 0} size="lg" />
            <p className="text-gray-600 mt-4">
              Earn credits by teaching and spend them to learn new skills
            </p>
          </div>

          <div className="card animate-scale-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>

            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
                        {getIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{getTimeAgo(transaction.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getColor(transaction.type)}`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount}
                      </p>
                      <p className="text-sm text-gray-500">Balance: {transaction.balanceAfter}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No transaction history yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyCredits;
