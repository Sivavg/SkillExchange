import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillSearchTeach, setSkillSearchTeach] = useState('');
  const [skillSearchLearn, setSkillSearchLearn] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    skillsToTeach: [],
    skillsToLearn: []
  });

  useEffect(() => {
    fetchSkills();
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        skillsToTeach: user.skillsToTeach?.map(s => s._id) || [],
        skillsToLearn: user.skillsToLearn?.map(s => s._id) || []
      });
    }
  }, [user]);

  const fetchSkills = async () => {
    try {
      const { data } = await api.get('/skills');
      setSkills(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/users/profile', formData);
      updateUser(data);
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const addSkillToTeach = (skillId) => {
    if (!formData.skillsToTeach.includes(skillId)) {
      setFormData({
        ...formData,
        skillsToTeach: [...formData.skillsToTeach, skillId]
      });
    }
    setSkillSearchTeach('');
  };

  const removeSkillToTeach = (skillId) => {
    setFormData({
      ...formData,
      skillsToTeach: formData.skillsToTeach.filter(id => id !== skillId)
    });
  };

  const addSkillToLearn = (skillId) => {
    if (!formData.skillsToLearn.includes(skillId)) {
      setFormData({
        ...formData,
        skillsToLearn: [...formData.skillsToLearn, skillId]
      });
    }
    setSkillSearchLearn('');
  };

  const removeSkillToLearn = (skillId) => {
    setFormData({
      ...formData,
      skillsToLearn: formData.skillsToLearn.filter(id => id !== skillId)
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-600 mt-2">Update your information and skills</p>
          </div>

          <form onSubmit={handleSubmit} className="card animate-scale-in">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows="4"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="input-field"
                  placeholder="Tell others about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-field"
                  placeholder="City, Country"
                />
              </div>

              {/* Skills I Can Teach */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills I Can Teach
                </label>
                
                {/* Search Input */}
                <input
                  type="text"
                  value={skillSearchTeach}
                  onChange={(e) => setSkillSearchTeach(e.target.value)}
                  placeholder="Search and select skills..."
                  className="input-field mb-2"
                />
                
                {/* Selected Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 border border-gray-300 rounded-lg bg-gray-50">
                  {formData.skillsToTeach.length === 0 ? (
                    <span className="text-gray-400 text-sm">No skills selected</span>
                  ) : (
                    formData.skillsToTeach.map((skillId) => {
                      const skill = skills.find(s => s._id === skillId);
                      return (
                        <span
                          key={skillId}
                          className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                        >
                          <span>{skill?.name}</span>
                          <button
                            type="button"
                            onClick={() => removeSkillToTeach(skillId)}
                            className="hover:text-red-600 font-bold"
                          >
                            <FiX size={16} />
                          </button>
                        </span>
                      );
                    })
                  )}
                </div>
                
                {/* Available Skills Dropdown */}
                {skillSearchTeach && (
                  <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto bg-white shadow-lg">
                    {skills
                      .filter(skill => 
                        skill.name.toLowerCase().includes(skillSearchTeach.toLowerCase()) &&
                        !formData.skillsToTeach.includes(skill._id)
                      )
                      .map((skill) => (
                        <div
                          key={skill._id}
                          onClick={() => addSkillToTeach(skill._id)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <p className="font-medium text-gray-900">{skill.name}</p>
                          <p className="text-xs text-gray-500">{skill.category}</p>
                        </div>
                      ))}
                    {skills.filter(skill => 
                      skill.name.toLowerCase().includes(skillSearchTeach.toLowerCase()) &&
                      !formData.skillsToTeach.includes(skill._id)
                    ).length === 0 && (
                      <div className="px-4 py-3 text-center text-gray-500 text-sm">
                        No skills found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Skills I Want to Learn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills I Want to Learn
                </label>
                
                {/* Search Input */}
                <input
                  type="text"
                  value={skillSearchLearn}
                  onChange={(e) => setSkillSearchLearn(e.target.value)}
                  placeholder="Search and select skills..."
                  className="input-field mb-2"
                />
                
                {/* Selected Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 border border-gray-300 rounded-lg bg-gray-50">
                  {formData.skillsToLearn.length === 0 ? (
                    <span className="text-gray-400 text-sm">No skills selected</span>
                  ) : (
                    formData.skillsToLearn.map((skillId) => {
                      const skill = skills.find(s => s._id === skillId);
                      return (
                        <span
                          key={skillId}
                          className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          <span>{skill?.name}</span>
                          <button
                            type="button"
                            onClick={() => removeSkillToLearn(skillId)}
                            className="hover:text-red-600 font-bold"
                          >
                            <FiX size={16} />
                          </button>
                        </span>
                      );
                    })
                  )}
                </div>
                
                {/* Available Skills Dropdown */}
                {skillSearchLearn && (
                  <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto bg-white shadow-lg">
                    {skills
                      .filter(skill => 
                        skill.name.toLowerCase().includes(skillSearchLearn.toLowerCase()) &&
                        !formData.skillsToLearn.includes(skill._id)
                      )
                      .map((skill) => (
                        <div
                          key={skill._id}
                          onClick={() => addSkillToLearn(skill._id)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <p className="font-medium text-gray-900">{skill.name}</p>
                          <p className="text-xs text-gray-500">{skill.category}</p>
                        </div>
                      ))}
                    {skills.filter(skill => 
                      skill.name.toLowerCase().includes(skillSearchLearn.toLowerCase()) &&
                      !formData.skillsToLearn.includes(skill._id)
                    ).length === 0 && (
                      <div className="px-4 py-3 text-center text-gray-500 text-sm">
                        No skills found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
