import React from 'react';
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const SkillTable = ({ skills, onApprove, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Skill Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Users
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {skills.map((skill) => (
            <tr key={skill._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="font-medium text-gray-900">{skill.name}</p>
                <p className="text-sm text-gray-500">{skill.description}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="badge bg-primary-100 text-primary-700">
                  {skill.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {skill.usersCount || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {skill.isApproved ? (
                  <span className="badge bg-green-100 text-green-700">
                    <FiCheck className="inline mr-1" /> Approved
                  </span>
                ) : (
                  <span className="badge bg-yellow-100 text-yellow-700">
                    <FiX className="inline mr-1" /> Pending
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                {!skill.isApproved && (
                  <button
                    onClick={() => onApprove(skill._id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => onEdit(skill)}
                  className="text-primary-600 hover:text-primary-800"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => onDelete(skill._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillTable;
