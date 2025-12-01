import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { toast } from 'react-toastify';
import { FiSettings, FiShield, FiMail, FiDatabase } from 'react-icons/fi';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'SkillExchange',
    siteDescription: 'Peer-to-peer skill exchange platform',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    autoApproveSkills: false,
    maxCreditsPerUser: 100,
    sessionDuration: 60
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
          <p className="text-gray-600">Configure platform settings</p>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="card animate-slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <FiSettings size={24} className="text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Description
                </label>
                <textarea
                  rows="3"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Maintenance Mode</p>
                  <p className="text-sm text-gray-600">Temporarily disable user access</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Registration Enabled</p>
                  <p className="text-sm text-gray-600">Allow new user registrations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.registrationEnabled}
                    onChange={(e) => setSettings({ ...settings, registrationEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Platform Settings */}
          <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-6">
              <FiDatabase size={24} className="text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Platform Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Credits Per User
                </label>
                <input
                  type="number"
                  value={settings.maxCreditsPerUser}
                  onChange={(e) => setSettings({ ...settings, maxCreditsPerUser: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Duration (minutes)
                </label>
                <input
                  type="number"
                  value={settings.sessionDuration}
                  onChange={(e) => setSettings({ ...settings, sessionDuration: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-Approve Skills</p>
                <p className="text-sm text-gray-600">Automatically approve new skills</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoApproveSkills}
                  onChange={(e) => setSettings({ ...settings, autoApproveSkills: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button onClick={handleSave} className="btn-primary">
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
