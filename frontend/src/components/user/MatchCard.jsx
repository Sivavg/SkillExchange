import React from 'react';
import { FiCalendar, FiClock, FiVideo, FiStar } from 'react-icons/fi';
import { formatDate, getStatusColor } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';

const MatchCard = ({ match, onAction }) => {
  const { user } = useAuth();
  const isRequester = match.requester._id === user._id;
  const otherUser = isRequester ? match.receiver : match.requester;

  // Check if current user has already rated
  const hasRated = isRequester 
    ? match.rating?.requesterRating 
    : match.rating?.receiverRating;

  return (
    <div className="card hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
            {otherUser.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{otherUser.name}</h3>
            <p className="text-sm text-gray-500">{otherUser.email}</p>
          </div>
        </div>
        <span className={`badge ${getStatusColor(match.status)}`}>
          {match.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Teaching:</span>
          <span className="badge bg-green-100 text-green-700">{match.skillOffered?.name}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Learning:</span>
          <span className="badge bg-blue-100 text-blue-700">{match.skillRequested?.name}</span>
        </div>
      </div>

      {match.message && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-600 italic">"{match.message}"</p>
        </div>
      )}

      {match.sessionDate && (
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <FiCalendar className="mr-2" />
          {formatDate(match.sessionDate)}
          <FiClock className="ml-4 mr-2" />
          {match.sessionDuration} mins
        </div>
      )}

      {/* Show Rating if exists */}
      {match.status === 'completed' && hasRated && (
        <div className="bg-yellow-50 rounded-lg p-3 mb-4 flex items-center">
          <FiStar className="text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">
            You rated: {hasRated}/5 stars
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {match.status === 'pending' && !isRequester && (
          <>
            <button
              onClick={() => onAction(match._id, 'accepted')}
              className="btn-primary flex-1"
            >
              Accept
            </button>
            <button
              onClick={() => onAction(match._id, 'rejected')}
              className="btn-secondary flex-1"
            >
              Reject
            </button>
          </>
        )}

        {match.status === 'accepted' && (
          <>
            <button
              onClick={() => onAction(match._id, 'join')}
              className="btn-primary flex-1 flex items-center justify-center"
            >
              <FiVideo className="mr-2" />
              Join Session
            </button>
            <button
              onClick={() => onAction(match._id, 'completed')}
              className="btn-secondary flex-1"
            >
              Complete
            </button>
          </>
        )}

        {match.status === 'completed' && !hasRated && (
          <button
            onClick={() => onAction(match._id, 'rate')}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <FiStar className="mr-2" />
            Rate Session
          </button>
        )}

        {match.status === 'completed' && hasRated && (
          <div className="flex-1 text-center py-2 bg-gray-100 rounded-lg text-gray-600 text-sm font-medium">
            Session Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
