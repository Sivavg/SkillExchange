import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import About from '../pages/public/About';
import HowItWorks from '../pages/public/HowItWorks';

// User Pages
import Dashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import EditProfile from '../pages/user/EditProfile';
import FindSkills from '../pages/user/FindSkills';
import MyMatches from '../pages/user/MyMatches';
import MyCredits from '../pages/user/MyCredits';
import SessionRoom from '../pages/user/SessionRoom';
import Notifications from '../pages/user/Notifications';
import Settings from '../pages/user/Settings';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageSkills from '../pages/admin/ManageSkills';
import ManageMatches from '../pages/admin/ManageMatches';
import Reports from '../pages/admin/Reports';
import Analytics from '../pages/admin/Analytics';
import AdminSettings from '../pages/admin/AdminSettings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/find-skills"
        element={
          <ProtectedRoute>
            <FindSkills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/matches"
        element={
          <ProtectedRoute>
            <MyMatches />
          </ProtectedRoute>
        }
      />
      <Route
        path="/credits"
        element={
          <ProtectedRoute>
            <MyCredits />
          </ProtectedRoute>
        }
      />
      <Route
        path="/session/:roomId"
        element={
          <ProtectedRoute>
            <SessionRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <AdminRoute>
            <ManageSkills />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/matches"
        element={
          <AdminRoute>
            <ManageMatches />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <AdminRoute>
            <Reports />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <AdminSettings />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">404 - Page Not Found</h1></div>} />
    </Routes>
  );
};

export default AppRoutes;
