import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FiDownload, FiFileText, FiCalendar } from 'react-icons/fi';

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: 'User Activity Report',
      description: 'Monthly report of user registrations and activities',
      date: '2025-11-01',
      type: 'PDF'
    },
    {
      id: 2,
      title: 'Skill Exchange Summary',
      description: 'Overview of completed skill exchanges',
      date: '2025-11-01',
      type: 'Excel'
    },
    {
      id: 3,
      title: 'Revenue Report',
      description: 'Financial summary and credit transactions',
      date: '2025-10-01',
      type: 'PDF'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Generate and download platform reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="card hover:scale-105 transform transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FiFileText size={24} className="text-primary-600" />
                </div>
                <span className="badge bg-gray-100 text-gray-700">{report.type}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="mr-2" size={16} />
                  {report.date}
                </div>
                <button className="text-primary-600 hover:text-primary-700 flex items-center font-medium">
                  <FiDownload className="mr-1" size={16} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 card animate-scale-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate New Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select className="input-field">
                <option>User Activity</option>
                <option>Skill Exchange</option>
                <option>Financial Summary</option>
                <option>Custom Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select className="input-field">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>

          <button className="btn-primary mt-6">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
