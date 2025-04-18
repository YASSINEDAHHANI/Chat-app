import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

// Requirement categories
const requirementCategories = [
  { value: "functionality", label: "Fonctionnalité" },
  { value: "ui", label: "Interface utilisateur" },
  { value: "security", label: "Sécurité" },
  { value: "performance", label: "Performance" },
  { value: "usability", label: "Utilisabilité" },
  { value: "compatibility", label: "Compatibilité" },
  { value: "accessibility", label: "Accessibilité" },
];

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
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  // Main content
  main: {
    flex: '1',
  },
  mainContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  filterLeftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  filterResultCount: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  // Select styles
  select: {
    display: 'block',
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: '#111827',
    backgroundColor: '#ffffff',
    backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.5rem center',
    backgroundSize: '1.5em 1.5em',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    appearance: 'none',
  },
  selectSmall: {
    width: 'auto',
  },
  // Buttons
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  primaryButtonHover: {
    backgroundColor: '#4338ca',
  },
  dangerButton: {
    backgroundColor: '#dc2626',
    color: 'white',
  },
  dangerButtonHover: {
    backgroundColor: '#b91c1c',
  },
  outlineButton: {
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #d1d5db',
  },
  outlineButtonHover: {
    backgroundColor: '#f9fafb',
  },
  buttonIcon: {
    marginRight: '0.5rem',
    height: '1rem',
    width: '1rem',
  },
  buttonIconEnd: {
    marginLeft: '0.5rem',
    height: '1rem',
    width: '1rem',
  },
  iconButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem',
    borderRadius: '0.375rem',
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  iconButtonHover: {
    color: '#111827',
  },
  // Requirement cards
  requirementContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  requirementCard: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    borderRadius: '0.5rem',
    transition: 'box-shadow 0.2s',
  },
  requirementCardHover: {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1.25rem 1rem',
  },
  cardTitle: {
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    fontWeight: '500',
    color: '#111827',
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  cardContent: {
    borderTop: '1px solid #e5e7eb',
    padding: '1.25rem 1rem',
  },
  cardDescription: {
    color: '#6b7280',
    marginBottom: '1rem',
  },
  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '9999px',
    padding: '0.125rem 0.625rem',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  categoryBadge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  priorityBadgeHigh: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  priorityBadgeMedium: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  priorityBadgeLow: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusBadgeApproved: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusBadgeReview: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  statusBadgeDraft: {
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
  },
  cardFooter: {
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  // Empty state
  emptyState: {
    textAlign: 'center',
    padding: '3rem 0',
  },
  emptyStateIcon: {
    margin: '0 auto',
    height: '3rem',
    width: '3rem',
    color: '#9ca3af',
  },
  emptyStateTitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#111827',
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  emptyStateDescription: {
    color: '#6b7280',
    marginBottom: '1rem',
  },
  // Modal styles
  modal: {
    position: 'fixed',
    inset: '0',
    zIndex: '10',
    overflowY: 'auto',
  },
  modalBackdrop: {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 0.2s',
  },
  modalContainer: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '32rem',
    padding: '1.5rem',
  },
  modalTitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#111827',
  },
  modalDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.5rem',
  },
  modalBody: {
    marginTop: '1.5rem',
  },
  modalFooter: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  },
  // Forms
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  formLabel: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '0.875rem',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '0.875rem',
    resize: 'vertical',
  },
  modalDivider: {
    borderTop: '1px solid #e5e7eb',
    margin: '1rem 0',
    paddingTop: '1rem',
  },
  modalItemPreview: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#111827',
  },
  modalItemDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.25rem',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
};

function Requirements() {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [hoveredItem, setHoveredItem] = useState(null);

  // New requirement form state
  const [newRequirement, setNewRequirement] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "draft",
    category: "functionality",
  });

  // Fetch project and requirements when component mounts
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await axios.get(`/projects/${projectId}`);
        setProject(projectResponse.data.project);

        const requirementsResponse = await axios.get(`/projects/${projectId}/requirements`);
        setRequirements(requirementsResponse.data.requirements || []);
      } catch (error) {
        console.error('Error fetching project data:', error);
        alert('Failed to load project data. Please try again.');
        navigate('/dashboard');
      }
    };

    fetchProjectData();
  }, [projectId, navigate]);

  const handleAddRequirement = async () => {
    try {
      const response = await axios.post(`/projects/${projectId}/requirements`, newRequirement);
      
      setRequirements([...requirements, response.data.requirement]);
      setNewRequirement({
        title: "",
        description: "",
        priority: "medium",
        status: "draft",
        category: "functionality",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding requirement:', error);
      alert('Failed to add requirement. Please try again.');
    }
  };

  const handleEditRequirement = async () => {
    if (!selectedRequirement) return;

    try {
      await axios.put(`/requirements/${selectedRequirement.id}`, {
        title: selectedRequirement.title,
        description: selectedRequirement.description,
        category: selectedRequirement.category,
        priority: selectedRequirement.priority,
        status: selectedRequirement.status,
      });

      const updatedRequirements = requirements.map((req) =>
        req.id === selectedRequirement.id ? selectedRequirement : req
      );

      setRequirements(updatedRequirements);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating requirement:', error);
      alert('Failed to update requirement. Please try again.');
    }
  };

  const handleDeleteRequirement = async () => {
    if (!selectedRequirement) return;

    try {
      await axios.delete(`/requirements/${selectedRequirement.id}`);
      
      const updatedRequirements = requirements.filter((req) => req.id !== selectedRequirement.id);
      setRequirements(updatedRequirements);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting requirement:', error);
      alert('Failed to delete requirement. Please try again.');
    }
  };

  const handleDownloadRequirements = (format) => {
    // In a real app, this would generate and download a file
    alert(`Téléchargement des exigences au format ${format.toUpperCase()}`);
  };

  const filteredRequirements =
    filterCategory === "all" 
      ? requirements 
      : requirements.filter((req) => req.category === filterCategory);

  const getCategoryLabel = (categoryValue) => {
    const category = requirementCategories.find((cat) => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'in-review': return 'En revue';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'high': return styles.priorityBadgeHigh;
      case 'medium': return styles.priorityBadgeMedium;
      case 'low': return styles.priorityBadgeLow;
      default: return {};
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'approved': return styles.statusBadgeApproved;
      case 'in-review': return styles.statusBadgeReview;
      case 'draft': return styles.statusBadgeDraft;
      default: return {};
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              style={hoveredItem === 'back-btn' 
                ? { ...styles.backButton, ...styles.backButtonHover }
                : styles.backButton
              }
              onClick={() => navigate('/dashboard')}
              onMouseEnter={() => setHoveredItem('back-btn')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={styles.backIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Retour au tableau de bord
            </button>
            <h1 style={styles.pageTitle}>
              {project ? `Exigences: ${project.name}` : 'Chargement...'}
            </h1>
          </div>
          <div style={styles.headerActions}>
            <select 
              style={styles.select}
              onChange={(e) => handleDownloadRequirements(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Télécharger...</option>
              <option value="pdf">Télécharger en PDF</option>
              <option value="docx">Télécharger en DOCX</option>
              <option value="xlsx">Télécharger en Excel</option>
            </select>

            <button
              style={hoveredItem === 'add-btn' 
                ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                : { ...styles.button, ...styles.primaryButton }
              }
              onClick={() => setIsAddDialogOpen(true)}
              onMouseEnter={() => setHoveredItem('add-btn')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Ajouter une exigence
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.mainContainer}>
          <div style={styles.filterBar}>
            <div style={styles.filterLeftSection}>
              <select
                style={{ ...styles.select, ...styles.selectSmall }}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">Toutes les catégories</option>
                {requirementCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <span style={styles.filterResultCount}>{filteredRequirements.length} exigence(s) trouvée(s)</span>
            </div>
            <button
              style={hoveredItem === 'generate-btn' 
                ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                : { ...styles.button, ...styles.primaryButton }
              }
              onClick={() => navigate(`/project/${projectId}/generate`)}
              onMouseEnter={() => setHoveredItem('generate-btn')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Générer des cas de test
              <svg xmlns="http://www.w3.org/2000/svg" style={styles.buttonIconEnd} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div style={styles.requirementContainer}>
            {filteredRequirements.length === 0 ? (
              <div style={styles.emptyState}>
                <svg xmlns="http://www.w3.org/2000/svg" style={styles.emptyStateIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 style={styles.emptyStateTitle}>Aucune exigence trouvée</h3>
                <p style={styles.emptyStateDescription}>
                  {filterCategory === "all"
                    ? "Commencez par ajouter une exigence à votre projet."
                    : "Aucune exigence ne correspond à cette catégorie."}
                </p>
                <button
                  style={hoveredItem === 'empty-add-btn' 
                    ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                    : { ...styles.button, ...styles.primaryButton }
                  }
                  onClick={() => setIsAddDialogOpen(true)}
                  onMouseEnter={() => setHoveredItem('empty-add-btn')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" style={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Ajouter une exigence
                </button>
              </div>
            ) : (
              filteredRequirements.map((requirement) => (
                <div 
                  key={requirement.id} 
                  style={hoveredItem === `req-${requirement.id}` 
                    ? { ...styles.requirementCard, ...styles.requirementCardHover }
                    : styles.requirementCard
                  }
                  onMouseEnter={() => setHoveredItem(`req-${requirement.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{requirement.title}</h3>
                    <div style={styles.cardActions}>
                      <button
                        style={hoveredItem === `edit-btn-${requirement.id}` 
                          ? { ...styles.iconButton, ...styles.iconButtonHover }
                          : styles.iconButton
                        }
                        onClick={() => {
                          setSelectedRequirement(requirement);
                          setIsEditDialogOpen(true);
                        }}
                        onMouseEnter={() => setHoveredItem(`edit-btn-${requirement.id}`)}
                        onMouseLeave={() => setHoveredItem(`req-${requirement.id}`)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        style={hoveredItem === `delete-btn-${requirement.id}` 
                          ? { ...styles.iconButton, ...styles.iconButtonHover }
                          : styles.iconButton
                        }
                        onClick={() => {
                          setSelectedRequirement(requirement);
                          setIsDeleteDialogOpen(true);
                        }}
                        onMouseEnter={() => setHoveredItem(`delete-btn-${requirement.id}`)}
                        onMouseLeave={() => setHoveredItem(`req-${requirement.id}`)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div style={styles.cardContent}>
                    <p style={styles.cardDescription}>{requirement.description}</p>
                    <div style={styles.badgeContainer}>
                      <span style={{ ...styles.badge, ...styles.categoryBadge }}>
                        {getCategoryLabel(requirement.category)}
                      </span>
                      <span style={{ ...styles.badge, ...getPriorityBadgeStyle(requirement.priority) }}>
                        Priorité: {getPriorityLabel(requirement.priority)}
                      </span>
                      <span style={{ ...styles.badge, ...getStatusBadgeStyle(requirement.status) }}>
                        Statut: {getStatusLabel(requirement.status)}
                      </span>
                    </div>
                  </div>
                  <div style={styles.cardFooter}>
                    <button
                      style={hoveredItem === `gen-btn-${requirement.id}` 
                        ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                        : { ...styles.button, ...styles.primaryButton }
                      }
                      onClick={() => navigate(`/project/${projectId}/generate?requirement=${requirement.id}`)}
                      onMouseEnter={() => setHoveredItem(`gen-btn-${requirement.id}`)}
                      onMouseLeave={() => setHoveredItem(`req-${requirement.id}`)}
                    >
                      Générer des cas de test
                      <svg xmlns="http://www.w3.org/2000/svg" style={styles.buttonIconEnd} viewBox="0 0 20 20" fill="currentColor">
<path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Add Requirement Dialog */}
      {isAddDialogOpen && (
        <div style={styles.modal}>
          <div style={styles.modalBackdrop} onClick={() => setIsAddDialogOpen(false)}></div>
          <div style={styles.modalContainer}>
            <div style={styles.modalContent}>
              <h3 style={styles.modalTitle}>Ajouter une nouvelle exigence</h3>
              <p style={styles.modalDescription}>
                Créez une nouvelle exigence pour votre projet.
              </p>

              <div style={styles.modalBody}>
                <div style={styles.formGroup}>
                  <label htmlFor="title" style={styles.formLabel}>
                    Titre
                  </label>
                  <input
                    id="title"
                    type="text"
                    style={styles.input}
                    placeholder="Titre de l'exigence"
                    value={newRequirement.title}
                    onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="description" style={styles.formLabel}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    style={styles.textarea}
                    placeholder="Description détaillée de l'exigence"
                    value={newRequirement.description}
                    onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                  ></textarea>
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="category" style={styles.formLabel}>
                    Catégorie
                  </label>
                  <select
                    id="category"
                    style={styles.select}
                    value={newRequirement.category}
                    onChange={(e) => setNewRequirement({ ...newRequirement, category: e.target.value })}
                  >
                    {requirementCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label htmlFor="priority" style={styles.formLabel}>
                      Priorité
                    </label>
                    <select
                      id="priority"
                      style={styles.select}
                      value={newRequirement.priority}
                      onChange={(e) => setNewRequirement({ ...newRequirement, priority: e.target.value })}
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="status" style={styles.formLabel}>
                      Statut
                    </label>
                    <select
                      id="status"
                      style={styles.select}
                      value={newRequirement.status}
                      onChange={(e) => setNewRequirement({ ...newRequirement, status: e.target.value })}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="in-review">En revue</option>
                      <option value="approved">Approuvé</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={hoveredItem === 'cancel-add-btn' 
                    ? { ...styles.button, ...styles.outlineButton, ...styles.outlineButtonHover }
                    : { ...styles.button, ...styles.outlineButton }
                  }
                  onClick={() => setIsAddDialogOpen(false)}
                  onMouseEnter={() => setHoveredItem('cancel-add-btn')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  style={hoveredItem === 'confirm-add-btn' 
                    ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                    : { ...styles.button, ...styles.primaryButton }
                  }
                  onClick={handleAddRequirement}
                  onMouseEnter={() => setHoveredItem('confirm-add-btn')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && selectedRequirement && (
        <div style={styles.modal}>
          <div style={styles.modalBackdrop} onClick={() => setIsEditDialogOpen(false)}></div>
          <div style={styles.modalContainer}>
            <div style={styles.modalContent}>
              <h3 style={styles.modalTitle}>Modifier l'exigence</h3>
              <p style={styles.modalDescription}>
                Modifiez les détails de cette exigence.
              </p>

              <div style={styles.modalBody}>
                <div style={styles.formGroup}>
                  <label htmlFor="edit-title" style={styles.formLabel}>
                    Titre
                  </label>
                  <input
                    id="edit-title"
                    type="text"
                    style={styles.input}
                    value={selectedRequirement.title}
                    onChange={(e) => setSelectedRequirement({ ...selectedRequirement, title: e.target.value })}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="edit-description" style={styles.formLabel}>
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    rows={4}
                    style={styles.textarea}
                    value={selectedRequirement.description}
                    onChange={(e) => setSelectedRequirement({ ...selectedRequirement, description: e.target.value })}
                  ></textarea>
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="edit-category" style={styles.formLabel}>
                    Catégorie
                  </label>
                  <select
                    id="edit-category"
                    style={styles.select}
                    value={selectedRequirement.category}
                    onChange={(e) => setSelectedRequirement({ ...selectedRequirement, category: e.target.value })}
                  >
                    {requirementCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label htmlFor="edit-priority" style={styles.formLabel}>
                      Priorité
                    </label>
                    <select
                      id="edit-priority"
                      style={styles.select}
                      value={selectedRequirement.priority}
                      onChange={(e) => setSelectedRequirement({ ...selectedRequirement, priority: e.target.value })}
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="edit-status" style={styles.formLabel}>
                      Statut
                    </label>
                    <select
                      id="edit-status"
                      style={styles.select}
                      value={selectedRequirement.status}
                      onChange={(e) => setSelectedRequirement({ ...selectedRequirement, status: e.target.value })}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="in-review">En revue</option>
                      <option value="approved">Approuvé</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={hoveredItem === 'cancel-edit-btn' 
                    ? { ...styles.button, ...styles.outlineButton, ...styles.outlineButtonHover }
                    : { ...styles.button, ...styles.outlineButton }
                  }
                  onClick={() => setIsEditDialogOpen(false)}
                  onMouseEnter={() => setHoveredItem('cancel-edit-btn')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  style={hoveredItem === 'confirm-edit-btn' 
                    ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                    : { ...styles.button, ...styles.primaryButton }
                  }
                  onClick={handleEditRequirement}
                  onMouseEnter={() => setHoveredItem('confirm-edit-btn')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {isDeleteDialogOpen && selectedRequirement && (
        <div style={styles.modal}>
          <div style={styles.modalBackdrop} onClick={() => setIsDeleteDialogOpen(false)}></div>
          <div style={styles.modalContainer}>
            <div style={styles.modalContent}>
              <h3 style={styles.modalTitle}>Supprimer l'exigence</h3>
              <p style={styles.modalDescription}>
                Êtes-vous sûr de vouloir supprimer cette exigence ? Cette action est irréversible.
              </p>

              <div style={styles.modalDivider}>
                <div style={styles.modalItemPreview}>{selectedRequirement.title}</div>
                <p style={styles.modalItemDescription}>{selectedRequirement.description}</p>
              </div>

              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={hoveredItem === 'cancel-delete-btn' 
                    ? { ...styles.button, ...styles.outlineButton, ...styles.outlineButtonHover }
                    : { ...styles.button, ...styles.outlineButton }
                  }
                  onClick={() => setIsDeleteDialogOpen(false)}
                  onMouseEnter={() => setHoveredItem('cancel-delete-btn')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  style={hoveredItem === 'confirm-delete-btn' 
                    ? { ...styles.button, ...styles.dangerButton, ...styles.dangerButtonHover }
                    : { ...styles.button, ...styles.dangerButton }
                  }
                  onClick={handleDeleteRequirement}
                  onMouseEnter={() => setHoveredItem('confirm-delete-btn')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Requirements;