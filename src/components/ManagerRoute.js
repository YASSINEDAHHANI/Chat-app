import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import api from "../api";

const ManagerRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkManagerAccess = async () => {
      try {
        const response = await api.get('/check_session');
        
        if (response.data.logged_in) {
          const hasAccess = response.data.is_manager || response.data.is_admin;
          setIsAuthorized(hasAccess);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Manager access check failed:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkManagerAccess();
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

export default ManagerRoute;