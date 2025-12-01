import React from 'react';
import { getTimeAgo } from '../../utils/helpers';

const MessageList = ({ messages, currentUserId }) => {
  if (messages.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message, index) => {
        const isOwn = message.sender._id === currentUserId || message.sender === currentUserId;
        return (
          <div
            key={index}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                isOwn
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${isOwn ? 'text-primary-100' : 'text-gray-500'}`}>
                {getTimeAgo(message.createdAt)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
