import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import SkillTable from '../../components/admin/SkillTable';
import Modal from '../../components/common/Modal';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { SKILL_CATEGORIES } from '../../utils/constants';
import { FiPlus } from 'react-icons/fi';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await api.get('/skills');
      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (skillId) => {
    try {
      await api.put(`/skills/${skillId}`, { isApproved: true });
      toast.success('Skill approved successfully');
      fetchSkills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve skill');
    }
  };

  const handleEdit = (skill) => {
    setFormData(skill);
    setShowModal(true);
  };

  const handleDelete = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/skills/${skillId}`);
        toast.success('Skill deleted successfully');
        fetchSkills();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete skill');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await api.put(`/skills/${formData._id}`, formData);
        toast.success('Skill updated successfully');
      } else {
        await api.post('/skills', formData);
        toast.success('Skill created successfully');
      }
      setShowModal(false);
      setFormData({ name: '', category: '', description: '' });
      fetchSkills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Skills</h1>
            <p className="text-gray-600 mt-2">Add, edit, or approve skills</p>
          </div>
          <button
            onClick={() => {
              setFormData({ name: '', category: '', description: '' });
              setShowModal(true);
            }}
            className="btn-primary flex items-center"
          >
            <FiPlus className="mr-2" />
            Add Skill
          </button>
        </div>

        <div className="card animate-scale-in">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            All Skills ({skills.length})
          </h2>
          <SkillTable
            skills={skills}
            onApprove={handleApprove}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Add/Edit Skill Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={formData._id ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g., React.js"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
            >
              <option value="">Select category</option>
              {SKILL_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              placeholder="Brief description of the skill"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {formData._id ? 'Update Skill' : 'Create Skill'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageSkills;
