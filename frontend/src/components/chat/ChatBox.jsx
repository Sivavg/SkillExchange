import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { FiX } from 'react-icons/fi';

const ChatBox = ({ match, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket && match) {
      socket.emit('join_room', match.roomId);

      socket.on('receive_message', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on('user_typing', (data) => {
        if (data.userId !== user._id) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 3000);
        }
      });

      return () => {
        socket.emit('leave_room', match.roomId);
        socket.off('receive_message');
        socket.off('user_typing');
      };
    }
  }, [socket, match, user._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content) => {
    if (socket && content.trim()) {
      const messageData = {
        matchId: match._id,
        sender: user._id,
        receiver: match.requester._id === user._id ? match.receiver._id : match.requester._id,
        content,
        roomId: match.roomId
      };
      socket.emit('send_message', messageData);
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', { roomId: match.roomId, userId: user._id });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col animate-slide-up z-50">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 rounded-t-xl flex items-center justify-between">
        <div>
          <h3 className="font-semibold">
            {match.requester._id === user._id ? match.receiver.name : match.requester.name}
          </h3>
          <p className="text-xs text-primary-100">
            {match.skillOffered?.name} ↔ {match.skillRequested?.name}
          </p>
        </div>
        <button onClick={onClose} className="hover:bg-primary-700 p-1 rounded">
          <FiX size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} currentUserId={user._id} />
        {isTyping && (
          <div className="text-sm text-gray-500 italic animate-pulse">Typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatBox;
