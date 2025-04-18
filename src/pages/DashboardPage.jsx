import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Add this line to enable credentials with cross-origin requests
axios.defaults.withCredentials = true;

// Internal CSS styles
const styles = {
  // Layout
  flexContainer: {
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
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  navLinkHover: {
    color: '#111827',
  },
  mainContent: {
    flex: '1',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    borderRadius: '0.375rem',
    fontWeight: '500',
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#4338ca',
  },
  buttonIcon: {
    marginRight: '0.5rem',
    height: '1rem',
    width: '1rem',
  },
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1.5rem',
  },
  projectGridSm: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  projectGridLg: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '3rem 0',
  },
  emptyIcon: {
    margin: '0 auto',
    height: '3rem',
    width: '3rem',
    color: '#9ca3af',
  },
  emptyTitle: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#111827',
  },
  emptyText: {
    marginTop: '0.25rem',
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: 'white',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
  },
  cardHover: {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  cardHeader: {
    padding: '1rem',
  },
  cardTitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#111827',
  },
  cardDate: {
    marginTop: '0.25rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  cardContent: {
    borderTop: '1px solid #e5e7eb',
    padding: '1rem',
  },
  cardStats: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.5rem',
  },
  cardIcon: {
    marginRight: '0.5rem',
    height: '1rem',
    width: '1rem',
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.125rem 0.625rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    borderRadius: '9999px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
  },
  collaboratorText: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.5rem',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
  },
  cardLink: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4f46e5',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  cardLinkHover: {
    color: '#4338ca',
  },
  
  // Modal
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxWidth: '32rem',
    padding: '1.5rem',
    position: 'relative',
    zIndex: 10,
  },
  modalTitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  modalDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  formLabel: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  select: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    backgroundColor: 'white',
    marginTop: '0.25rem',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  inputGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  addButton: {
    padding: '0.5rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    borderRadius: '0.375rem',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
  },
  tagGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: '9999px',
    padding: '0.125rem 0.625rem',
    fontSize: '0.75rem',
  },
  removeBtn: {
    marginLeft: '0.25rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '1rem',
    color: '#6b7280',
    background: 'none',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
  },
  modalFooter: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  },
  outlineButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  primaryButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    borderRadius: '0.375rem',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  fileInput: {
    width: '100%',
    padding: '0.5rem 0',
  },
  helperText: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.25rem',
  },
  loadingText: {
    fontSize: '0.875rem',
    marginLeft: '0.5rem',
  },
};

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [projectContext, setProjectContext] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Project settings
  const [aiModel, setAiModel] = useState('Claude');
  const [apiKey, setApiKey] = useState('');
  const [projectLanguage, setProjectLanguage] = useState('french');
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState('');

  // Media query handling
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      console.log('Fetched projects:', response.data);
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCreateProject = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
  
    try {
      // Create the project
      const projectData = {
        name: newProjectName,
        context: projectContext
      };
  
      console.log('Creating project with data:', projectData);
      
      const response = await axios.post('/projects', projectData);
      console.log('Project created successfully:', response.data);
      const newProject = response.data.project;
  
      // If API key is provided, save it for this project
      if (apiKey) {
        try {
          await axios.post('/api_keys', {
            api_key: apiKey,
            project_id: newProject.id
          });
          console.log('API key saved successfully');
        } catch (apiKeyError) {
          console.error('Failed to save API key:', apiKeyError);
          // Continue anyway
        }
      }
  
      // Add collaborators if any
      if (collaborators.length > 0) {
        console.log(`Adding ${collaborators.length} collaborators to project ${newProject.id}`);
        
        // Process collaborators sequentially
        for (const collaboratorEmail of collaborators) {
          try {
            console.log(`Adding collaborator with email: ${collaboratorEmail}`);
            
            // Send the email as the username parameter since that's what the backend expects
            const collaboratorResponse = await axios.post(`/projects/${newProject.id}/collaborators`, {
              username: collaboratorEmail  // Send the email as username
            });
            
            console.log(`Collaborator added:`, collaboratorResponse.data);
          } catch (error) {
            console.error(`Failed to add collaborator ${collaboratorEmail}:`, error.response?.data?.error || error.message);
            // Continue with other collaborators even if one fails
          }
        }
      }
  
      // Refresh project list
      await fetchProjects();
  
      // Reset form fields
      setNewProjectName('');
      setProjectContext('');
      setAiModel('Claude');
      setApiKey('');
      setProjectLanguage('french');
      setCollaborators([]);
      setNewCollaborator('');
      setStep(1);
      setIsDialogOpen(false);
  
      // Navigate to the new project
      if (newProject && newProject.id) {
        console.log('Navigating to project:', newProject.id);
        navigate(`/project/${newProject.id}`);
      } else {
        console.error('Project ID not available for navigation');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again. ' + (error.response?.data?.error || error.message || ''));
    }
  };

  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append('file', file);

        // In a real implementation, you'd have an endpoint to upload and extract text
        // For now, we'll just set mock content after a delay
        setTimeout(() => {
          setIsUploading(false);
          setProjectContext(`Contenu extrait du fichier: ${file.name}`);
        }, 1500);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file. Please try again.');
        setIsUploading(false);
      }
    }
  };

  const addCollaborator = () => {
    if (newCollaborator && !collaborators.includes(newCollaborator)) {
      // Simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(newCollaborator)) {
        setCollaborators([...collaborators, newCollaborator]);
        setNewCollaborator('');
      } else {
        alert('Please enter a valid email address');
      }
    } else if (collaborators.includes(newCollaborator)) {
      alert('This email has already been added');
    }
  };

  const removeCollaborator = (email) => {
    setCollaborators(collaborators.filter((c) => c !== email));
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      window.location.href = '/signin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="project-name">
              Nom du projet
            </label>
            <input
              id="project-name"
              style={styles.input}
              placeholder="Entrez le nom du projet"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
          </div>
        );
        case 2:
          return (
            <div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="api-key">
                  Clé API Claude (optionnelle)
                </label>
                <input
                  id="api-key"
                  type="password"
                  style={styles.input}
                  placeholder="Entrez votre clé API Claude pour ce projet"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p style={styles.helperText}>
                  Si vous ne fournissez pas de clé API, le système utilisera la clé par défaut.
                  La clé API sera utilisée uniquement pour ce projet.
                </p>
              </div>
        
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="project-language">
                  Langue du projet
                </label>
                <select
                  id="project-language"
                  style={styles.select}
                  value={projectLanguage}
                  onChange={(e) => setProjectLanguage(e.target.value)}
                >
                  <option value="french">Français</option>
                  <option value="english">Anglais</option>
                </select>
              </div>
        
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Collaborateurs</label>
                <div style={styles.inputGroup}>
                  <input
                    style={styles.input}
                    placeholder="Email du collaborateur"
                    value={newCollaborator}
                    onChange={(e) => setNewCollaborator(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={addCollaborator}
                    style={styles.addButton}
                  >
                    +
                  </button>
                </div>
                {collaborators.length > 0 && (
                  <div style={styles.tagGroup}>
                    {collaborators.map((email, index) => (
                      <span key={index} style={styles.tag}>
                        {email}
                        <button
                          type="button"
                          style={styles.removeBtn}
                          onClick={() => removeCollaborator(email)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
      case 3:
        return (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="project-context">
                Contexte fonctionnel
              </label>
              <textarea
                id="project-context"
                rows={4}
                style={styles.textarea}
                placeholder="Décrivez les exigences fonctionnelles de votre projet..."
                value={projectContext}
                onChange={(e) => setProjectContext(e.target.value)}
              ></textarea>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Ou téléchargez un fichier</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="file"
                  accept=".pdf,.txt,.docx"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  style={styles.fileInput}
                />
                {isUploading && <span style={styles.loadingText}>Téléchargement en cours...</span>}
              </div>
              <p style={styles.helperText}>Formats supportés: PDF, TXT, DOCX</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Determine the grid style based on window width
  const getGridStyle = () => {
    const baseStyle = { ...styles.projectGrid };
    if (windowWidth >= 1024) {
      return { ...baseStyle, ...styles.projectGridLg };
    } else if (windowWidth >= 640) {
      return { ...baseStyle, ...styles.projectGridSm };
    }
    return baseStyle;
  };

  return (
    <div style={styles.flexContainer}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.logo}>AI Test Case Generator</h1>
          <div style={styles.navLinks}>
            <button style={styles.navLink}>
              Documentation
            </button>
            <button style={styles.navLink}>
              Paramètres
            </button>
            <button 
              style={{
                ...styles.navLink,
                ...(hoveredButton === 'logout' ? styles.navLinkHover : {})
              }}
              onClick={handleLogout}
              onMouseEnter={() => setHoveredButton('logout')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main style={styles.mainContent}>
        <div style={styles.titleRow}>
          <h2 style={styles.pageTitle}>Mes Projets</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            style={{
              ...styles.button,
              ...(hoveredButton === 'newProject' ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('newProject')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Nouveau Projet
          </button>
        </div>

        {/* New Project Dialog */}
        {isDialogOpen && (
          <div style={styles.modal}>
            <div style={styles.modalOverlay} onClick={() => setIsDialogOpen(false)}></div>
            <div style={styles.modalContent}>
              <h3 style={styles.modalTitle}>
                {step === 1 && "Créer un nouveau projet"}
                {step === 2 && "Configuration du projet"}
                {step === 3 && "Contexte fonctionnel"}
              </h3>
              <p style={styles.modalDesc}>
                {step === 1 && "Donnez un nom à votre projet pour commencer."}
                {step === 2 && "Configurez les paramètres de votre projet."}
                {step === 3 && "Fournissez le contexte fonctionnel pour aider à générer de meilleurs cas de test."}
              </p>

              {renderStepContent()}

              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={styles.outlineButton}
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </button>
                {step > 1 && (
                  <button
                    type="button"
                    style={styles.outlineButton}
                    onClick={() => setStep(step - 1)}
                  >
                    Retour
                  </button>
                )}
                <button
                  type="button"
                  style={styles.primaryButton}
                  onClick={handleCreateProject}
                >
                  {step < 3 ? "Suivant" : "Créer le projet"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={getGridStyle()}>
          {projects.length === 0 ? (
            <div style={styles.emptyState}>
              <svg xmlns="http://www.w3.org/2000/svg" style={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 style={styles.emptyTitle}>Aucun projet</h3>
              <p style={styles.emptyText}>Commencez par créer un nouveau projet.</p>
              <button
                type="button"
                onClick={() => setIsDialogOpen(true)}
                style={styles.button}
              >
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Nouveau Projet
              </button>
            </div>
          ) : (
            projects.map((project) => (
              <div 
                key={project.id} 
                style={{
                  ...styles.card,
                  ...(hoveredCard === project.id ? styles.cardHover : {})
                }}
                onClick={() => navigate(`/project/${project.id}`)}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{project.name}</h3>
                  <p style={styles.cardDate}>
                    Créé le {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.cardStats}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={styles.cardIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    0 cas de test
                  </div>
                  <div style={styles.tagContainer}>
                    <span style={styles.badge}>
                      {project.language === "french" ? "Français" : project.language === "english" ? "Anglais" : "Non défini"}
                    </span>
                    <span style={styles.badge}>
                      Claude
                    </span>
                  </div>
                  {project.collaborators && project.collaborators.length > 0 && (
                    <div style={styles.collaboratorText}>
                      <span>Collaborateurs: {project.collaborators.length}</span>
                    </div>
                  )}
                </div>
                <div style={styles.cardFooter}>
                  <button 
                    style={{
                      ...styles.cardLink,
                      ...(hoveredCard === project.id ? styles.cardLinkHover : {})
                    }}
                  >
                    Ouvrir le projet
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;