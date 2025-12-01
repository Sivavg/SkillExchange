import React from 'react';
import { FiCreditCard } from 'react-icons/fi';

const CreditBadge = ({ credits, size = 'md', showLabel = true }) => {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3'
  };

  return (
    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold shadow-lg ${sizeClasses[size]} animate-scale-in`}>
      <FiCreditCard />
      <span>{credits}</span>
      {showLabel && <span className="font-normal">Credits</span>}
    </div>
  );
};

export default CreditBadge;
