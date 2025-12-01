import React, { useState } from 'react';
import JitsiMeet from './JitsiMeet';
import { FiVideo, FiX } from 'react-icons/fi';

const VideoCall = ({ roomId, userName, onClose }) => {
  const [inCall, setInCall] = useState(false);

  if (!inCall) {
    return (
      <div className="card text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiVideo size={40} className="text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Session</h2>
          <p className="text-gray-600">Ready to start your video call?</p>
        </div>
        <div className="flex space-x-4 justify-center">
          <button onClick={() => setInCall(true)} className="btn-primary">
            Join Call
          </button>
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return <JitsiMeet roomId={roomId} userName={userName} onClose={onClose} />;
};

export default VideoCall;
