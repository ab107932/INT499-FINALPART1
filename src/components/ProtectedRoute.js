// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user'); // Check if the user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // If not logged in, redirect to login page
  }

  return children; // Otherwise, render the child component
};

export default ProtectedRoute;
