import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import MatchCard from '../../components/user/MatchCard';
import ChatBox from '../../components/chat/ChatBox';
import Modal from '../../components/common/Modal';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { FiStar } from 'react-icons/fi';

const MyMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [ratingData, setRatingData] = useState({
    rating: 5,
    feedback: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const { data } = await api.get('/matches/my-matches');
      setMatches(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (matchId, action) => {
    try {
      if (action === 'join') {
        const match = matches.find(m => m._id === matchId);
        navigate(`/session/${match.roomId}`);
        return;
      }

      if (action === 'rate') {
        const match = matches.find(m => m._id === matchId);
        setSelectedMatch(match);
        setShowRatingModal(true);
        return;
      }

      await api.put(`/matches/${matchId}/status`, { status: action });
      toast.success(`Match ${action} successfully!`);
      fetchMatches();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/matches/${selectedMatch._id}/rating`, ratingData);
      toast.success('Rating submitted successfully!');
      setShowRatingModal(false);
      setRatingData({ rating: 5, feedback: '' });
      fetchMatches();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    }
  };

  const filteredMatches = matches.filter((match) => {
    if (filter === 'all') return true;
    return match.status === filter;
  });

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Matches</h1>

            {/* Filter Tabs */}
            <div className="flex space-x-2 overflow-x-auto">
              {['all', 'pending', 'accepted', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match, index) => (
                <div
                  key={match._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MatchCard match={match} onAction={handleAction} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">No matches found for this filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Box */}
      {activeChat && (
        <ChatBox match={activeChat} onClose={() => setActiveChat(null)} />
      )}

      {/* Rating Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Rate Your Session"
        size="md"
      >
        <form onSubmit={handleSubmitRating} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How was your experience?
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingData({ ...ratingData, rating: star })}
                  className="focus:outline-none transform hover:scale-110 transition-transform"
                >
                  <FiStar
                    size={40}
                    className={`${
                      star <= ratingData.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center mt-2 text-gray-600 font-medium">
              {ratingData.rating} Star{ratingData.rating !== 1 ? 's' : ''}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback (Optional)
            </label>
            <textarea
              rows="4"
              value={ratingData.feedback}
              onChange={(e) => setRatingData({ ...ratingData, feedback: e.target.value })}
              className="input-field"
              placeholder="Share your experience..."
            />
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="btn-primary flex-1">
              Submit Rating
            </button>
            <button
              type="button"
              onClick={() => setShowRatingModal(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};

export default MyMatches;
