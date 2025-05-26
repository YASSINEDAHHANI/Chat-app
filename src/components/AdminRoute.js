import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import api from "../api";

const AdminRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await api.get('/check_session');
        
        if (response.data.logged_in) {
          // Allow access for both admins and managers
          const hasAccess = response.data.is_admin || response.data.is_manager;
          setIsAuthorized(hasAccess);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Admin access check failed:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminAccess();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthorized ? children : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;