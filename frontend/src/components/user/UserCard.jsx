import React from 'react';
import { FiMapPin, FiStar } from 'react-icons/fi';
import { getInitials } from '../../utils/helpers';

const UserCard = ({ user, onConnect }) => {
  return (
    <div className="card hover:scale-105 transform transition-all duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          {user.location && (
            <p className="text-sm text-gray-500 flex items-center">
              <FiMapPin className="mr-1" size={14} />
              {user.location}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.bio || 'No bio available'}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Can Teach:</p>
        <div className="flex flex-wrap gap-2">
          {user.skillsToTeach?.slice(0, 3).map((skill) => (
            <span key={skill._id} className="badge bg-green-100 text-green-700">
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Wants to Learn:</p>
        <div className="flex flex-wrap gap-2">
          {user.skillsToLearn?.slice(0, 3).map((skill) => (
            <span key={skill._id} className="badge bg-blue-100 text-blue-700">
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onConnect(user)}
        className="btn-primary w-full"
      >
        Connect
      </button>
    </div>
  );
};

export default UserCard;
