import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const MessageInput = ({ onSend, onTyping }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    onTyping();
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="btn-primary flex items-center justify-center px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
