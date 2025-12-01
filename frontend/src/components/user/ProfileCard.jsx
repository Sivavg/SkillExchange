import React from 'react';
import { FiEdit, FiMapPin, FiClock } from 'react-icons/fi';
import { getInitials, getTimeAgo } from '../../utils/helpers';

const ProfileCard = ({ user, isOwn = false, onEdit }) => {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitials(user.name)
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.location && (
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <FiMapPin className="mr-1" size={14} />
                {user.location}
              </p>
            )}
          </div>
        </div>
        {isOwn && (
          <button onClick={onEdit} className="btn-secondary flex items-center">
            <FiEdit className="mr-2" />
            Edit
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Bio</h3>
        <p className="text-gray-600">{user.bio || 'No bio added yet'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Can Teach</h3>
          <div className="space-y-2">
            {user.skillsToTeach?.map((skill) => (
              <span key={skill._id} className="inline-block badge bg-green-100 text-green-700 mr-2 mb-2">
                {skill.name}
              </span>
            ))}
            {(!user.skillsToTeach || user.skillsToTeach.length === 0) && (
              <p className="text-gray-400 text-sm">No skills added</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Wants to Learn</h3>
          <div className="space-y-2">
            {user.skillsToLearn?.map((skill) => (
              <span key={skill._id} className="inline-block badge bg-blue-100 text-blue-700 mr-2 mb-2">
                {skill.name}
              </span>
            ))}
            {(!user.skillsToLearn || user.skillsToLearn.length === 0) && (
              <p className="text-gray-400 text-sm">No skills added</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center">
          <FiClock className="mr-1" />
          Joined {getTimeAgo(user.createdAt)}
        </span>
        <span className="badge bg-primary-100 text-primary-700">
          {user.credits} Credits
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
