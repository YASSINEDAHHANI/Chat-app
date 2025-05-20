import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import api from "../api";

/**
 * AdminRoute component - Protects routes that require admin privileges
 * Checks if the user is both authenticated and has admin role
 */
const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await api.get('/check_session');
        
        // Check both authentication and admin role
        const isUserAdmin = response.data.logged_in && response.data.is_admin;
        setIsAdmin(isUserAdmin);
      } catch (error) {
        console.error('Authentication/admin check failed:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminStatus();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to login if not authenticated or not admin
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;