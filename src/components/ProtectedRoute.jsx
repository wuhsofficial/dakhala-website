import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuthStore();

  // If still loading auth state, show a generic loading spinner
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If this route is for admins only, check the email
  if (adminOnly && user.email !== 'wuhs.official@gmail.com') {
    return <Navigate to="/student-portal" replace />;
  }

  // Otherwise, render the protected component
  return children;
}
