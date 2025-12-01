export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const SKILL_CATEGORIES = [
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Language',
  'Music',
  'Other'
];

export const MATCH_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};
