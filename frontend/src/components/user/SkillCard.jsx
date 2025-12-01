import React from 'react';
import { FiTag, FiUsers } from 'react-icons/fi';

const SkillCard = ({ skill, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card cursor-pointer hover:scale-105 transform transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{skill.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="badge bg-primary-100 text-primary-700">
          <FiTag className="inline mr-1" size={14} />
          {skill.category}
        </span>
        <span className="text-sm text-gray-500 flex items-center">
          <FiUsers className="mr-1" size={16} />
          {skill.usersCount || 0} users
        </span>
      </div>
    </div>
  );
};

export default SkillCard;
