import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoCall from '../../components/video/VideoCall';
import ChatBox from '../../components/chat/ChatBox';
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';

const SessionRoom = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    fetchMatch();
  }, [roomId]);

  const fetchMatch = async () => {
    try {
      const { data } = await api.get('/matches/my-matches');
      const currentMatch = data.find((m) => m.roomId === roomId);
      if (currentMatch) {
        setMatch(currentMatch);
      } else {
        navigate('/matches');
      }
    } catch (error) {
      console.error(error);
      navigate('/matches');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/matches');
  };

  if (loading) return <Loader fullScreen />;
  if (!match) return null;

  return (
    <div className="relative h-screen">
      <VideoCall roomId={roomId} userName={user?.name} onClose={handleClose} />
      {showChat && <ChatBox match={match} onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default SessionRoom;
