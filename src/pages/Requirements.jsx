  import { useParams, useNavigate } from "react-router-dom"
  import { useState, useEffect } from "react"
  import api from "../api"
  import { Settings as SettingsIcon } from 'lucide-react';
  import LLMSettingsModal from '../components/LLMSettingsModal';
  const styles = {
    // Layout
    container: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      backgroundColor: "#ffffff", // Light background
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      color: "#1f2937", // Dark text for light mode
    },
    header: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
    },
    secondaryButton: {
      backgroundColor: "#f3f4f6",
      color: "#374151",
      border: "1px solid #d1d5db",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
    },
    secondaryButtonHover: {
      backgroundColor: "#e5e7eb",
      borderColor: "#9ca3af",
    },
    headerActions: {
      display: "flex",
      gap: "0.75rem",
      alignItems: "center",
      flexWrap: "wrap",
    },
    headerContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1.5rem",
      display: "flex",
      height: "4rem",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#1f2937",
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "0.5rem 0.75rem",
      borderRadius: "0.375rem",
      transition: "all 0.2s",
    },
    backButtonHover: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    backIcon: {
      height: "1rem",
      width: "1rem",
      marginRight: "0.5rem",
    },
    pageTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1f2937",
      margin: 0,
    },
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    // Main content
    main: {
      flex: "1",
    },
    mainContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem 1.5rem",
    },
    filterBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    filterLeftSection: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap",
    },
    filterResultCount: {
      fontSize: "0.875rem",
      color: "#6b7280",
      fontWeight: "500",
    },
    // Select styles
    select: {
      display: "block",
      width: "100%",
      padding: "0.625rem 2.5rem 0.625rem 0.75rem",
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      color: "#1f2937",
      backgroundColor: "#f3f4f6", // Light gray background
      backgroundImage:
        'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 strokeLinecap=%27round%27 strokeLinejoin=%27round%27 strokeWidth=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 0.5rem center",
      backgroundSize: "1.5em 1.5em",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "0.375rem",
      appearance: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    selectFocus: {
      outline: "none",
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 1px #3b82f6",
    },
    selectSmall: {
      width: "auto",
      minWidth: "180px",
    },
    // Buttons
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.625rem 1.25rem",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    primaryButton: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
    primaryButtonHover: {
      backgroundColor: "#2563eb",
    },
    dangerButton: {
      backgroundColor: "#dc2626",
      color: "white",
    },
    dangerButtonHover: {
      backgroundColor: "#b91c1c",
    },
    outlineButton: {
      backgroundColor: "transparent",
      color: "#4b5563",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
    outlineButtonHover: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    buttonIcon: {
      marginRight: "0.5rem",
      height: "1rem",
      width: "1rem",
    },
    buttonIconEnd: {
      marginLeft: "0.5rem",
      height: "1rem",
      width: "1rem",
    },
    iconButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      color: "#6b7280",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    iconButtonHover: {
      color: "#1f2937",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    // Requirement cards
    requirementContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    requirementCard: {
      backgroundColor: "#ffffff", // White background
      overflow: "hidden",
      borderRadius: "0.5rem",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    requirementCardHover: {
      borderColor: "rgba(0, 0, 0, 0.2)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "1.25rem",
      borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    },
    cardTitle: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
      fontWeight: "600",
      color: "#1f2937",
      margin: 0,
    },
    cardActions: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    cardContent: {
      padding: "1.25rem",
    },
    cardDescription: {
      color: "#6b7280",
      marginBottom: "1.25rem",
      fontSize: "0.875rem",
      lineHeight: "1.5rem",
    },
    badgeContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "9999px",
      padding: "0.25rem 0.75rem",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    categoryBadge: {
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      color: "#3b82f6",
    },
    priorityBadgeHigh: {
      backgroundColor: "rgba(220, 38, 38, 0.1)",
      color: "#dc2626",
    },
    priorityBadgeMedium: {
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      color: "#f59e0b",
    },
    priorityBadgeLow: {
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      color: "#10b981",
    },
    statusBadgeApproved: {
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      color: "#10b981",
    },
    statusBadgeReview: {
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      color: "#3b82f6",
    },
    statusBadgeDraft: {
      backgroundColor: "rgba(156, 163, 175, 0.1)",
      color: "#6b7280",
    },
    cardFooter: {
      backgroundColor: "#f9fafb", // Light gray background
      borderTop: "1px solid rgba(0, 0, 0, 0.05)",
      padding: "1.25rem",
      display: "flex",
      justifyContent: "flex-end",
    },
    // Empty state
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      backgroundColor: "#f9fafb", // Light gray background
      borderRadius: "0.5rem",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    emptyStateIcon: {
      margin: "0 auto",
      height: "4rem",
      width: "4rem",
      color: "#9ca3af",
      marginBottom: "1rem",
    },
    emptyStateTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
      marginTop: "1rem",
      marginBottom: "0.5rem",
    },
    emptyStateDescription: {
      color: "#6b7280",
      marginBottom: "1.5rem",
      fontSize: "0.875rem",
    },
    // Modal styles
    modal: {
      position: "fixed",
      inset: "0",
      zIndex: "50",
      overflowY: "auto",
    },
    modalBackdrop: {
      position: "fixed",
      inset: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
      transition: "opacity 0.2s",
    },
    modalContainer: {
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    modalContent: {
      position: "relative",
      backgroundColor: "#ffffff", // White background
      borderRadius: "0.75rem",
      overflow: "hidden",
      width: "100%",
      maxWidth: "32rem",
      padding: "1.5rem",
      maxHeight: "90vh",
      overflowY: "auto",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    modalTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
      marginTop: 0,
      marginBottom: "0.5rem",
    },
    modalDescription: {
      fontSize: "0.875rem",
      color: "#6b7280",
      marginTop: "0.5rem",
      marginBottom: "1.5rem",
    },
    modalBody: {
      marginTop: "1.5rem",
    },
    modalFooter: {
      marginTop: "1.5rem",
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.75rem",
    },
    // Forms
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
    },
    formGroup: {
      marginBottom: "1.25rem",
    },
    formLabel: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#4b5563",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.625rem 0.75rem",
      borderRadius: "0.375rem",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      fontSize: "0.875rem",
      transition: "border-color 0.2s, box-shadow 0.2s",
      backgroundColor: "#ffffff",
      color: "#1f2937",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 1px #3b82f6",
    },
    textarea: {
      width: "100%",
      padding: "0.625rem 0.75rem",
      borderRadius: "0.375rem",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      fontSize: "0.875rem",
      resize: "vertical",
      minHeight: "6rem",
      transition: "border-color 0.2s, box-shadow 0.2s",
      backgroundColor: "#ffffff",
      color: "#1f2937",
    },
    textareaFocus: {
      outline: "none",
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 1px #3b82f6",
    },
    modalDivider: {
      borderTop: "1px solid rgba(0, 0, 0, 0.05)",
      margin: "1rem 0",
      paddingTop: "1rem",
    },
    modalItemPreview: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#1f2937",
    },
    modalItemDescription: {
      fontSize: "0.875rem",
      color: "#6b7280",
      marginTop: "0.25rem",
      display: "-webkit-box",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "0.375rem",
      overflow: "hidden",
      backgroundColor: "#f3f4f6", // Light gray background
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    searchContainerFocus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 1px #3b82f6",
    },
    searchIcon: {
      height: "1rem",
      width: "1rem",
      margin: "0 0.5rem",
      color: "#6b7280",
    },
    searchInput: {
      border: "none",
      padding: "0.625rem 0.75rem",
      outline: "none",
      width: "12rem",
      fontSize: "0.875rem",
      backgroundColor: "transparent",
      color: "#1f2937",
    },
    searchClearButton: {
      background: "none",
      border: "none",
      padding: "0 0.5rem",
      cursor: "pointer",
      color: "#6b7280",
      transition: "color 0.2s",
    },
    searchClearButtonHover: {
      color: "#1f2937",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginTop: "0.5rem",
    },
    checkbox: {
      width: "1rem",
      height: "1rem",
      borderRadius: "0.25rem",
      accentColor: "#3b82f6",
    },
    checkboxLabel: {
      fontSize: "0.875rem",
      color: "#4b5563",
    },
  }

  const requirementCategories = [
    { value: "functionality", label: "Fonctionnalité" },
    { value: "ui", label: "Interface utilisateur" },
    { value: "security", label: "Sécurité" },
    { value: "performance", label: "Performance" },
    { value: "usability", label: "Utilisabilité" },
    { value: "compatibility", label: "Compatibilité" },
    { value: "accessibility", label: "Accessibilité" },
  ]


  function Requirements() {
    const navigate = useNavigate()
    const { id: projectId } = useParams()

    const [project, setProject] = useState(null)
    const [requirements, setRequirements] = useState([])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedRequirement, setSelectedRequirement] = useState(null)
    const [filterCategory, setFilterCategory] = useState("all")
    const [filterPriority, setFilterPriority] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [hoveredItem, setHoveredItem] = useState(null)
    const [focusedInput, setFocusedInput] = useState(null)
    const [filterStatus, setFilterStatus] = useState("all")
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    // New requirement form state
    const [newRequirement, setNewRequirement] = useState({
      title: "",
      description: "",
      status: "draft",
      category: "functionality",
    })

    useEffect(() => {
      // Add custom styling to ensure no dark borders
      const styleTag = document.createElement("style")
      styleTag.type = "text/css"
      styleTag.innerHTML = `
      body {
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      
      html {
        background-color: #ffffff;
      }
      
      /* Remove any potential dark borders */
      #root, div[data-reactroot] {
        background-color: #ffffff;
        min-height: 100vh;
      }
    `
      document.head.appendChild(styleTag)

      return () => {
        if (document.head.contains(styleTag)) {
          document.head.removeChild(styleTag)
        }
      }
    }, [])

    useEffect(() => {
      const fetchProjectData = async () => {
        try {
          const projectResponse = await api.get(`/projects/${projectId}`)
          setProject(projectResponse.data.project)

          const requirementsResponse = await api.get(`/projects/${projectId}/requirements`)
          setRequirements(requirementsResponse.data.requirements || [])
        } catch (error) {
          console.error("Error fetching project data:", error)
          alert("Failed to load project data. Please try again.")
          navigate("/dashboard")
        }
      }

      fetchProjectData()
    }, [projectId, navigate])

    const handleAddRequirement = async () => {
      try {
        const response = await api.post(`/projects/${projectId}/requirements`, newRequirement)

        setRequirements([...requirements, response.data.requirement])
        setNewRequirement({
          title: "",
          description: "",
          status: "draft",
          category: "functionality",
        })
        setIsAddDialogOpen(false)
      } catch (error) {
        console.error("Error adding requirement:", error)
        alert("Failed to add requirement. Please try again.")
      }
    }

    const handleEditRequirement = async () => {
      if (!selectedRequirement) return

      try {
        // Prepare the update data
        const updateData = {
          title: selectedRequirement.title,
          description: selectedRequirement.description,
          category: selectedRequirement.category,
          status: selectedRequirement.status,
          // Only include priority if manually set
          ...(selectedRequirement.priority_auto_generated ? {} : { priority: selectedRequirement.priority }),
        }

        const response = await api.put(`/requirements/${selectedRequirement.id}`, updateData)

        // Update the requirements list with the response data
        const updatedRequirements = requirements.map((req) =>
          req.id === selectedRequirement.id ? response.data.requirement || selectedRequirement : req,
        )

        setRequirements(updatedRequirements)
        setIsEditDialogOpen(false)
      } catch (error) {
        console.error("Error updating requirement:", error)
        alert("Failed to update requirement. Please try again.")
      }
    }

    const handleDeleteRequirement = async () => {
      if (!selectedRequirement) return

      try {
        await api.delete(`/requirements/${selectedRequirement.id}`)

        const updatedRequirements = requirements.filter((req) => req.id !== selectedRequirement.id)
        setRequirements(updatedRequirements)
        setIsDeleteDialogOpen(false)
      } catch (error) {
        console.error("Error deleting requirement:", error)
        alert("Failed to delete requirement. Please try again.")
      }
    }


  // Fixed handleDownloadRequirements using api.js module

  const handleDownloadRequirements = (format) => {
    if (filteredRequirements.length === 0) {
      alert(`Aucune exigence à télécharger. Veuillez modifier vos filtres.`);
      return;
    }

    const loadingMessage = `Préparation du téléchargement en format ${format.toUpperCase()}...`;
    console.log(loadingMessage);
    
    if (format === 'xlsx') {
      try {
        const formatDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const fileName = `exigences_${project?.name?.replace(/\s+/g, '_') || 'projet'}_${formatDate}`;
        
        let csvContent = "Titre,Description,Catégorie,Priorité,Statut\n";
        
        filteredRequirements.forEach(req => {
          // Properly escape text for CSV
          const escapeForCSV = (text) => {
            if (text === null || text === undefined) return '';
            return `"${String(text).replace(/"/g, '""')}"`;
          };
          
          const row = [
            escapeForCSV(req.title),
            escapeForCSV(req.description),
            escapeForCSV(getCategoryLabel(req.category)),
            escapeForCSV(getPriorityLabel(req.priority)),
            escapeForCSV(getStatusLabel(req.status))
          ].join(',');
          
          csvContent += row + '\n';
        });
        
        // Create a download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 100);
      } catch (error) {
        console.error("Error creating CSV file:", error);
        alert("Une erreur est survenue lors de la création du fichier Excel.");
      }
    } else {
      try {
        const requestData = {
          requirements: filteredRequirements,
          project_name: project?.name || 'Projet'
        };
        
        const formatDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const fileName = `exigences_${project?.name?.replace(/\s+/g, '_') || 'projet'}_${formatDate}.${format}`;
        
        // Use api.js with specific configuration for binary data
        api({
          method: 'post',
          url: `/download_requirements/${format}`,
          data: requestData,
          responseType: 'blob', // Important: tells axios to handle as binary
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          // Create blob from response data
          const contentType = format === 'pdf' 
            ? 'application/pdf' 
            : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            
          const blob = new Blob([response.data], { type: contentType });
          
          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 100);
        })
        .catch(error => {
          console.error(`Error downloading ${format.toUpperCase()} file:`, error);
          

          if (error.request && error.request.response instanceof Blob && error.request.response.size > 0) {
            console.log("Download may have succeeded despite the error");
            try {
              const contentType = format === 'pdf' 
                ? 'application/pdf' 
                : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                
              const blob = new Blob([error.request.response], { type: contentType });
              
              // Create download link
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', fileName);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              // Clean up
              setTimeout(() => {
                URL.revokeObjectURL(url);
              }, 100);
            } catch (e) {
              console.log(`Une erreur est survenue lors de la création du fichier ${format.toUpperCase()}.`);
            }
          } else {
            console.log(`Une erreur est survenue lors de la création du fichier ${format.toUpperCase()}.`);
          }
        });
      } catch (error) {
        console.error(`Error in ${format.toUpperCase()} download:`, error);
      }
    }
  };
  const filteredRequirements = requirements
    .filter((req) => filterCategory === "all" || req.category === filterCategory)
    .filter((req) => filterPriority === "all" || req.priority === filterPriority)
    .filter((req) => filterStatus === "all" || req.status === filterStatus)
    .filter((req) => searchQuery === "" || req.title.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const getCategoryLabel = (categoryValue) => {
      const category = requirementCategories.find((cat) => cat.value === categoryValue)
      return category ? category.label : categoryValue
    }

    const getPriorityLabel = (priority) => {
      switch (priority) {
        case "high":
          return "Haute"
        case "medium":
          return "Moyenne"
        case "low":
          return "Basse"
        default:
          return priority
      }
    }

    const getStatusLabel = (status) => {
      switch (status) {
        case "approved":
          return "Approuvé"
        case "in-review":
          return "En revue"
        case "draft":
          return "Brouillon"
        default:
          return status
      }
    }

    const getPriorityBadgeStyle = (priority) => {
      switch (priority) {
        case "high":
          return styles.priorityBadgeHigh
        case "medium":
          return styles.priorityBadgeMedium
        case "low":
          return styles.priorityBadgeLow
        default:
          return {}
      }
    }

    const getStatusBadgeStyle = (status) => {
      switch (status) {
        case "approved":
          return styles.statusBadgeApproved
        case "in-review":
          return styles.statusBadgeReview
        case "draft":
          return styles.statusBadgeDraft
        default:
          return {}
      }
    }

    const PlusIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" style={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    )

    const ArrowLeftIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" style={styles.backIcon} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    )

    const ArrowRightIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" style={styles.buttonIconEnd} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    )

    const EditIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "1.25rem", width: "1.25rem" }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    )

    const DeleteIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "1.25rem", width: "1.25rem" }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    )

    const SearchIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" style={styles.searchIcon} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    )

    const CloseIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "1rem", width: "1rem" }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    )

    const DocumentIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={styles.emptyStateIcon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    )

    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContainer}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                style={
                  hoveredItem === "back-btn" ? { ...styles.backButton, ...styles.backButtonHover } : styles.backButton
                }
                onClick={() => navigate("/dashboard")}
                onMouseEnter={() => setHoveredItem("back-btn")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <ArrowLeftIcon />
                Retour au tableau de bord
              </button>
              <h1 style={styles.pageTitle}>{project ? `Exigences: ${project.name}` : "Chargement..."}</h1>
            </div>
            <div style={styles.headerActions}>
              {/* LLM Settings Button */}
              <button
                style={{
                  ...styles.secondaryButton,
                  ...(hoveredItem === "settings-btn" ? styles.secondaryButtonHover : {}),
                }}
                onClick={() => setIsSettingsModalOpen(true)}
                onMouseEnter={() => setHoveredItem("settings-btn")}
                onMouseLeave={() => setHoveredItem(null)}
                title="Configurer les paramètres du modèle LLM"
              >
                <SettingsIcon size={16} />
                Paramètres LLM
              </button>

              {/* Download dropdown */}
              <select
                style={{
                  ...styles.select,
                  ...styles.selectSmall,
                  ...(focusedInput === "download" ? styles.selectFocus : {}),
                }}
                onChange={(e) => {
                  if (e.target.value) {
                    handleDownloadRequirements(e.target.value);
                    e.target.value = ""; // Reset after download
                  }
                }}
                value=""
                onFocus={() => setFocusedInput("download")}
                onBlur={() => setFocusedInput(null)}
              >
                <option value="" disabled>
                  Télécharger...
                </option>
                <option value="pdf">Télécharger en PDF ({filteredRequirements.length})</option>
                <option value="docx">Télécharger en DOCX ({filteredRequirements.length})</option>
                <option value="xlsx">Télécharger en Excel ({filteredRequirements.length})</option>
              </select>

              {/* Add Requirement button */}
              <button
                style={
                  hoveredItem === "add-btn"
                    ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                    : { ...styles.button, ...styles.primaryButton }
                }
                onClick={() => setIsAddDialogOpen(true)}
                onMouseEnter={() => setHoveredItem("add-btn")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <PlusIcon />
                Ajouter une exigence
              </button>
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.mainContainer}>
            <div style={styles.filterBar}>
              <div style={styles.filterLeftSection}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                  <select
                    style={{
                      ...styles.select,
                      ...styles.selectSmall,
                      ...(focusedInput === "category" ? styles.selectFocus : {}),
                    }}
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    onFocus={() => setFocusedInput("category")}
                    onBlur={() => setFocusedInput(null)}
                  >
                    <option value="all">Toutes les catégories</option>
                    {requirementCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>

                  <select
                    style={{
                      ...styles.select,
                      ...styles.selectSmall,
                      ...(focusedInput === "priority" ? styles.selectFocus : {}),
                    }}
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    onFocus={() => setFocusedInput("priority")}
                    onBlur={() => setFocusedInput(null)}
                  >
                    <option value="all">Toutes les priorités</option>
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                  </select>
                  <select
                    style={{
                      ...styles.select,
                      ...styles.selectSmall,
                      ...(focusedInput === "status" ? styles.selectFocus : {}),
                    }}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    onFocus={() => setFocusedInput("status")}
                    onBlur={() => setFocusedInput(null)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="approved">Approuvé</option>
                    <option value="in-review">En revue</option>
                    <option value="draft">Brouillon</option>
                  </select>   
                  <div
                    style={{
                      ...styles.searchContainer,
                      ...(focusedInput === "search" ? styles.searchContainerFocus : {}),
                    }}
                  >
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Rechercher par titre..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={styles.searchInput}
                      onFocus={() => setFocusedInput("search")}
                      onBlur={() => setFocusedInput(null)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        style={
                          hoveredItem === "clear-search"
                            ? { ...styles.searchClearButton, ...styles.searchClearButtonHover }
                            : styles.searchClearButton
                        }
                        onMouseEnter={() => setHoveredItem("clear-search")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </div>
                </div>

                <span style={styles.filterResultCount}>
                  {filteredRequirements.length} exigence{filteredRequirements.length !== 1 ? "s" : ""} trouvée
                  {filteredRequirements.length !== 1 ? "s" : ""}
                </span>
              </div>
              <button
                style={
                  hoveredItem === "generate-btn"
                    ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                    : { ...styles.button, ...styles.primaryButton }
                }
                onClick={() => navigate(`/project/${projectId}/generate`)}
                onMouseEnter={() => setHoveredItem("generate-btn")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                Générer des cas de test
                <ArrowRightIcon />
              </button>
            </div>

            <div style={styles.requirementContainer}>
              {filteredRequirements.length === 0 ? (
                <div style={styles.emptyState}>
                  <DocumentIcon />
                  <h3 style={styles.emptyStateTitle}>Aucune exigence trouvée</h3>
                  <p style={styles.emptyStateDescription}>
                    {filterCategory === "all" && filterPriority === "all" && searchQuery === ""
                      ? "Commencez par ajouter une exigence à votre projet."
                      : "Aucune exigence ne correspond à vos critères de recherche."}
                  </p>
                  <button
                    style={
                      hoveredItem === "empty-add-btn"
                        ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                        : { ...styles.button, ...styles.primaryButton }
                    }
                    onClick={() => setIsAddDialogOpen(true)}
                    onMouseEnter={() => setHoveredItem("empty-add-btn")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <PlusIcon />
                    Ajouter une exigence
                  </button>
                </div>
              ) : (
                filteredRequirements.map((requirement) => (
                  <div
                    key={requirement.id}
                    style={
                      hoveredItem === `req-${requirement.id}`
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
                          style={
                            hoveredItem === `edit-btn-${requirement.id}`
                              ? { ...styles.iconButton, ...styles.iconButtonHover }
                              : styles.iconButton
                          }
                          onClick={() => {
                            setSelectedRequirement(requirement)
                            setIsEditDialogOpen(true)
                          }}
                          onMouseEnter={() => setHoveredItem(`edit-btn-${requirement.id}`)}
                          onMouseLeave={() => setHoveredItem(`req-${requirement.id}`)}
                          aria-label="Modifier"
                          title="Modifier"
                        >
                          <EditIcon />
                        </button>
                        <button
                          style={
                            hoveredItem === `delete-btn-${requirement.id}`
                              ? { ...styles.iconButton, ...styles.iconButtonHover }
                              : styles.iconButton
                          }
                          onClick={() => {
                            setSelectedRequirement(requirement)
                            setIsDeleteDialogOpen(true)
                          }}
                          onMouseEnter={() => setHoveredItem(`delete-btn-${requirement.id}`)}
                          onMouseLeave={() => setHoveredItem(`req-${requirement.id}`)}
                          aria-label="Supprimer"
                          title="Supprimer"
                        >
                          <DeleteIcon />
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
                          {requirement.priority_auto_generated && (
                            <span style={{ fontSize: "0.7rem", marginLeft: "0.25rem" }}> (Auto)</span>
                          )}
                        </span>
                        <span style={{ ...styles.badge, ...getStatusBadgeStyle(requirement.status) }}>
                          Statut: {getStatusLabel(requirement.status)}
                        </span>
                      </div>
                    </div>
                    <div style={styles.cardFooter}>
                      <button
                        style={
                          hoveredItem === `gen-btn-${requirement.id}`
                            ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                            : { ...styles.button, ...styles.primaryButton }
                        }
                        onClick={() => navigate(`/project/${projectId}/generate?requirement=${requirement.id}`)}
                        onMouseEnter={() => setHoveredItem(`gen-btn-${requirement.id}`)}
                        onMouseLeave={() => setHoveredItem(`req-${requirement.id}`)}
                      >
                        Générer des cas de test
                        <ArrowRightIcon />
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
                  Créez une nouvelle exigence pour votre projet. La priorité sera déterminée automatiquement en fonction
                  de la description.
                </p>

                <div style={styles.modalBody}>
                  <div style={styles.formGroup}>
                    <label htmlFor="title" style={styles.formLabel}>
                      Titre
                    </label>
                    <input
                      id="title"
                      type="text"
                      style={{
                        ...styles.input,
                        ...(focusedInput === "title" ? styles.inputFocus : {}),
                      }}
                      placeholder="Titre de l'exigence"
                      value={newRequirement.title}
                      onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
                      onFocus={() => setFocusedInput("title")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="description" style={styles.formLabel}>
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      style={{
                        ...styles.textarea,
                        ...(focusedInput === "description" ? styles.textareaFocus : {}),
                      }}
                      placeholder="Description détaillée de l'exigence"
                      value={newRequirement.description}
                      onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                      onFocus={() => setFocusedInput("description")}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                      Utilisez des mots comme "crucial", "impératif" pour indiquer une haute priorité, ou "optionnel",
                      "souhaitable" pour une priorité basse.
                    </p>
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="category" style={styles.formLabel}>
                      Catégorie
                    </label>
                    <select
                      id="category"
                      style={{
                        ...styles.select,
                        ...(focusedInput === "category-select" ? styles.selectFocus : {}),
                      }}
                      value={newRequirement.category}
                      onChange={(e) => setNewRequirement({ ...newRequirement, category: e.target.value })}
                      onFocus={() => setFocusedInput("category-select")}
                      onBlur={() => setFocusedInput(null)}
                    >
                      {requirementCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="status" style={styles.formLabel}>
                      Statut
                    </label>
                    <select
                      id="status"
                      style={{
                        ...styles.select,
                        ...(focusedInput === "status-select" ? styles.selectFocus : {}),
                      }}
                      value={newRequirement.status}
                      onChange={(e) => setNewRequirement({ ...newRequirement, status: e.target.value })}
                      onFocus={() => setFocusedInput("status-select")}
                      onBlur={() => setFocusedInput(null)}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="in-review">En revue</option>
                      <option value="approved">Approuvé</option>
                    </select>
                  </div>
                </div>

                <div style={styles.modalFooter}>
                  <button
                    type="button"
                    style={
                      hoveredItem === "cancel-add-btn"
                        ? { ...styles.button, ...styles.outlineButton, ...styles.outlineButtonHover }
                        : { ...styles.button, ...styles.outlineButton }
                    }
                    onClick={() => setIsAddDialogOpen(false)}
                    onMouseEnter={() => setHoveredItem("cancel-add-btn")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    style={
                      hoveredItem === "confirm-add-btn"
                        ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                        : { ...styles.button, ...styles.primaryButton }
                    }
                    onClick={handleAddRequirement}
                    onMouseEnter={() => setHoveredItem("confirm-add-btn")}
                    onMouseLeave={() => setHoveredItem(null)}
                    disabled={!newRequirement.title.trim()}
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
                <p style={styles.modalDescription}>Modifiez les détails de cette exigence.</p>

                <div style={styles.modalBody}>
                  <div style={styles.formGroup}>
                    <label htmlFor="edit-title" style={styles.formLabel}>
                      Titre
                    </label>
                    <input
                      id="edit-title"
                      type="text"
                      style={{
                        ...styles.input,
                        ...(focusedInput === "edit-title" ? styles.inputFocus : {}),
                      }}
                      value={selectedRequirement.title}
                      onChange={(e) => setSelectedRequirement({ ...selectedRequirement, title: e.target.value })}
                      onFocus={() => setFocusedInput("edit-title")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="edit-description" style={styles.formLabel}>
                      Description
                    </label>
                    <textarea
                      id="edit-description"
                      rows={4}
                      style={{
                        ...styles.textarea,
                        ...(focusedInput === "edit-description" ? styles.textareaFocus : {}),
                      }}
                      value={selectedRequirement.description}
                      onChange={(e) => setSelectedRequirement({ ...selectedRequirement, description: e.target.value })}
                      onFocus={() => setFocusedInput("edit-description")}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                      Utilisez des mots comme "crucial", "impératif" pour indiquer une haute priorité, ou "optionnel",
                      "souhaitable" pour une priorité basse.
                    </p>
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="edit-category" style={styles.formLabel}>
                      Catégorie
                    </label>
                    <select
                      id="edit-category"
                      style={{
                        ...styles.select,
                        ...(focusedInput === "edit-category" ? styles.selectFocus : {}),
                      }}
                      value={selectedRequirement.category}
                      onChange={(e) => setSelectedRequirement({ ...selectedRequirement, category: e.target.value })}
                      onFocus={() => setFocusedInput("edit-category")}
                      onBlur={() => setFocusedInput(null)}
                    >
                      {requirementCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Priorité actuelle: {getPriorityLabel(selectedRequirement.priority)}
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.03)",
                        padding: "0.75rem",
                        borderRadius: "0.375rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      <span
                        style={{
                          ...styles.badge,
                          ...getPriorityBadgeStyle(selectedRequirement.priority),
                          fontSize: "0.875rem",
                          padding: "0.25rem 0.75rem",
                        }}
                      >
                        {getPriorityLabel(selectedRequirement.priority)}
                      </span>
                      <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        {selectedRequirement.priority_auto_generated
                          ? "Générée automatiquement à partir de la description"
                          : "Définie manuellement"}
                      </span>
                    </div>

                    <div style={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        id="manual-priority"
                        style={styles.checkbox}
                        checked={!selectedRequirement.priority_auto_generated}
                        onChange={() => {
                          setSelectedRequirement({
                            ...selectedRequirement,
                            priority_auto_generated: !selectedRequirement.priority_auto_generated,
                          })
                        }}
                      />
                      <label htmlFor="manual-priority" style={styles.checkboxLabel}>
                        Spécifier manuellement la priorité
                      </label>
                    </div>

                    {!selectedRequirement.priority_auto_generated && (
                      <select
                        id="edit-priority"
                        style={{
                          ...styles.select,
                          marginTop: "0.5rem",
                          ...(focusedInput === "edit-priority" ? styles.selectFocus : {}),
                        }}
                        value={selectedRequirement.priority}
                        onChange={(e) => setSelectedRequirement({ ...selectedRequirement, priority: e.target.value })}
                        onFocus={() => setFocusedInput("edit-priority")}
                        onBlur={() => setFocusedInput(null)}
                      >
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                      </select>
                    )}
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="edit-status" style={styles.formLabel}>
                      Statut
                    </label>
                    <select
                      id="edit-status"
                      style={{
                        ...styles.select,
                        ...(focusedInput === "edit-status" ? styles.selectFocus : {}),
                      }}
                      value={selectedRequirement.status}
                      onChange={(e) => setSelectedRequirement({ ...selectedRequirement, status: e.target.value })}
                      onFocus={() => setFocusedInput("edit-status")}
                      onBlur={() => setFocusedInput(null)}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="in-review">En revue</option>
                      <option value="approved">Approuvé</option>
                    </select>
                  </div>
                </div>

                <div style={styles.modalFooter}>
                  <button
                    type="button"
                    style={
                      hoveredItem === "cancel-edit-btn"
                        ? { ...styles.button, ...styles.outlineButton, ...styles.outlineButtonHover }
                        : { ...styles.button, ...styles.outlineButton }
                    }
                    onClick={() => setIsEditDialogOpen(false)}
                    onMouseEnter={() => setHoveredItem("cancel-edit-btn")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    style={
                      hoveredItem === "confirm-edit-btn"
                        ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                        : { ...styles.button, ...styles.primaryButton }
                    }
                    onClick={handleEditRequirement}
                    onMouseEnter={() => setHoveredItem("confirm-edit-btn")}
                    onMouseLeave={() => setHoveredItem(null)}
                    disabled={!selectedRequirement.title.trim()}
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {isDeleteDialogOpen && selectedRequirement && (
          <div style={styles.modal}>
            <div style={styles.modalBackdrop} onClick={() => setIsDeleteDialogOpen(false)}></div>
            <div style={styles.modalContainer}>
              <div style={styles.modalContent}>
                <h3 style={styles.modalTitle}>Confirmer la suppression</h3>
                <p style={styles.modalDescription}>
                  Êtes-vous sûr de vouloir supprimer cette exigence ? Cette action est irréversible.
                </p>

                <div style={styles.modalDivider}></div>

                <div>
                  <h4 style={styles.modalItemPreview}>{selectedRequirement.title}</h4>
                  <p style={styles.modalItemDescription}>{selectedRequirement.description}</p>
                </div>

                <div style={styles.modalFooter}>
                  <button
                    type="button"
                    style={
                      hoveredItem === "cancel-delete-btn"
                        ? { ...styles.button, ...styles.outlineButton, ...styles.outlineButtonHover }
                        : { ...styles.button, ...styles.outlineButton }
                    }
                    onClick={() => setIsDeleteDialogOpen(false)}
                    onMouseEnter={() => setHoveredItem("cancel-delete-btn")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    style={
                      hoveredItem === "confirm-delete-btn"
                        ? { ...styles.button, ...styles.dangerButton, ...styles.dangerButtonHover }
                        : { ...styles.button, ...styles.dangerButton }
                    }
                    onClick={handleDeleteRequirement}
                    onMouseEnter={() => setHoveredItem("confirm-delete-btn")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LLM Settings Modal */}
            <LLMSettingsModal
        isOpen={isSettingsModalOpen}    // ← These props don't exist
        onClose={() => setIsSettingsModalOpen(false)}  // ← in your component
        projectId={projectId}
      />
      </div>
    )
  }

  export default Requirements