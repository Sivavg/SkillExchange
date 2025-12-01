import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../hooks/useAuth';
import ProfileCard from '../../components/user/ProfileCard';
import Loader from '../../components/common/Loader';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your information and skills</p>
          </div>

          <div className="animate-scale-in">
            <ProfileCard
              user={user}
              isOwn={true}
              onEdit={() => navigate('/edit-profile')}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
