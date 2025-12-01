import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import UserCard from '../../components/user/UserCard';
import SearchBar from '../../components/common/SearchBar';
import Modal from '../../components/common/Modal';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

const FindSkills = () => {
  const { user } = useAuth(); // ✅ Get current user
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [matchData, setMatchData] = useState({
    skillOffered: '',
    skillRequested: '',
    message: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (query = '') => {
    try {
      setLoading(true);
      // ✅ Changed endpoint to /users/search
      const { data } = await api.get(`/users/search?search=${query}`);
      
      // ✅ Extra filter - remove own profile (double check)
      const filteredUsers = data.filter(u => u._id !== user?._id);
      
      console.log('Total users:', data.length);
      console.log('After filtering self:', filteredUsers.length);
      
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Fetch users error:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (selectedUser) => {
    setSelectedUser(selectedUser);
    setShowModal(true);
  };

  const handleSubmitMatch = async (e) => {
    e.preventDefault();
    try {
      await api.post('/matches', {
        receiver: selectedUser._id,
        ...matchData
      });
      toast.success('Match request sent!');
      setShowModal(false);
      setMatchData({ skillOffered: '', skillRequested: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send request');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Skills</h1>
            <p className="text-gray-600 mb-4">Discover users to exchange skills with</p>
            <SearchBar
              placeholder="Search by skill, name, or location..."
              onSearch={fetchUsers}
            />
          </div>

          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((userItem, index) => (
                <div
                  key={userItem._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <UserCard user={userItem} onConnect={handleConnect} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">
                {loading ? 'Loading...' : 'No other users found. Try a different search or add more skills to your profile!'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Connect Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Send Match Request"
      >
        <form onSubmit={handleSubmitMatch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill You'll Teach
            </label>
            <select
              required
              value={matchData.skillOffered}
              onChange={(e) => setMatchData({ ...matchData, skillOffered: e.target.value })}
              className="input-field"
            >
              <option value="">Select a skill</option>
              {selectedUser?.skillsToLearn?.map((skill) => (
                <option key={skill._id} value={skill._id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill You Want to Learn
            </label>
            <select
              required
              value={matchData.skillRequested}
              onChange={(e) => setMatchData({ ...matchData, skillRequested: e.target.value })}
              className="input-field"
            >
              <option value="">Select a skill</option>
              {selectedUser?.skillsToTeach?.map((skill) => (
                <option key={skill._id} value={skill._id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              rows="3"
              value={matchData.message}
              onChange={(e) => setMatchData({ ...matchData, message: e.target.value })}
              className="input-field"
              placeholder="Introduce yourself..."
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Send Request
          </button>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};

export default FindSkills;
