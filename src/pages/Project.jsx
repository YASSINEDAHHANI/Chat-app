import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

// Inline CSS styles
const styles = {
  // Layout
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  header: {
    borderBottom: '1px solid #e5e7eb',
  },
  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    height: '4rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  backButtonHover: {
    color: '#111827',
  },
  backIcon: {
    height: '1rem',
    width: '1rem',
    marginRight: '0.25rem',
  },
  pageTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  navLink: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  navLinkHover: {
    color: '#111827',
  },
  mainContent: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirectContainer: {
    textAlign: 'center',
    padding: '2rem',
  },
  redirectTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  redirectText: {
    marginBottom: '1.5rem',
    color: '#4b5563',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    border: 'none',
    cursor: 'pointer',
  },
  primaryButtonHover: {
    backgroundColor: '#4338ca',
  },
};

function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hoveredElement, setHoveredElement] = useState(null);

  // Automatically redirect to requirements page when project is accessed
  useEffect(() => {
    // Optionally fetch project data here if needed
    const fetchProject = async () => {
      try {
        await axios.get(`/projects/${id}`);
        // After confirming the project exists, redirect to requirements
        navigate(`/project/${id}/requirements`);
      } catch (error) {
        console.error('Error fetching project:', error);
        alert('Project not found or you do not have access to it.');
        navigate('/dashboard');
      }
    };

    fetchProject();
  }, [id, navigate]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              style={
                hoveredElement === 'back-btn' 
                  ? { ...styles.backButton, ...styles.backButtonHover } 
                  : styles.backButton
              }
              onClick={() => navigate('/dashboard')}
              onMouseEnter={() => setHoveredElement('back-btn')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={styles.backIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Retour au tableau de bord
            </button>
            <h1 style={styles.pageTitle}>Chargement du projet...</h1>
          </div>
          <div style={styles.navLinks}>
            <button 
              style={
                hoveredElement === 'settings-btn'
                  ? { ...styles.navLink, ...styles.navLinkHover }
                  : styles.navLink
              }
              onMouseEnter={() => setHoveredElement('settings-btn')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              Paramètres
            </button>
            <button 
              style={
                hoveredElement === 'logout-btn'
                  ? { ...styles.navLink, ...styles.navLinkHover }
                  : styles.navLink
              }
              onClick={async () => {
                try {
                  await axios.post('/logout');
                  window.location.href = '/signin';
                } catch (error) {
                  console.error('Logout failed:', error);
                }
              }}
              onMouseEnter={() => setHoveredElement('logout-btn')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        <div style={styles.redirectContainer}>
          <h2 style={styles.redirectTitle}>Redirection en cours...</h2>
          <p style={styles.redirectText}>Vous allez être redirigé vers la page des exigences du projet.</p>
          <button
            style={
              hoveredElement === 'requirements-btn'
                ? { ...styles.primaryButton, ...styles.primaryButtonHover }
                : styles.primaryButton
            }
            onClick={() => navigate(`/project/${id}/requirements`)}
            onMouseEnter={() => setHoveredElement('requirements-btn')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            Accéder aux exigences
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project;