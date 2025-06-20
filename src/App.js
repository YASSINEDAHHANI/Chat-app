import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/DashboardPage';
import ProjectPage from './pages/Project';
import Requirements from './pages/Requirements';
import Generate from './pages/Generate';
import AdminPage from './pages/AdminPage'; 
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute'; 
import ManagerPage from './pages/ManagerPage';  
import ManagerRoute from './components/ManagerRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/project/:id" 
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/project/:id/requirements" 
          element={
            <ProtectedRoute>
              <Requirements />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/project/:id/generate" 
          element={
            <ProtectedRoute>
              <Generate />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } 
        />
        
        <Route 
          path="/manager" 
          element={
            <ManagerRoute>
              <ManagerPage />
            </ManagerRoute>
          } 
        />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;