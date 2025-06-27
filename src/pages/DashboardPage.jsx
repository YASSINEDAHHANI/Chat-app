import logoImage from "../shared-theme/logo-test-case.png"
import { useState, useEffect } from "react"
import api from "../api"

// Light theme styles based on the TestGen interface
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
    padding: "1rem 0",
  },
  headerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#3b82f6", // Keep blue logo color
    letterSpacing: "-0.025em",
    height: "2rem",
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  navLink: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#1f2937",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  navLinkHover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  mainContent: {
    flex: "1",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    width: "100%",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: "1.875rem",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0,
  },
  newProjectButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6", // Keep blue button
    color: "white",
    borderRadius: "0.5rem",
    fontWeight: "500",
    fontSize: "0.875rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  newProjectButtonDisabled: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#9ca3af",
    color: "white",
    borderRadius: "0.5rem",
    fontWeight: "500",
    fontSize: "0.875rem",
    border: "none",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  newProjectButtonHover: {
    backgroundColor: "#2563eb", // Darker blue on hover
  },
  buttonIcon: {
    marginRight: "0.5rem",
    height: "1rem",
    width: "1rem",
  },
  searchRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  searchContainer: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b7280",
    width: "1rem",
    height: "1rem",
  },
  searchInput: {
    width: "100%",
    padding: "0.625rem 1rem 0.625rem 2.5rem",
    backgroundColor: "#f3f4f6", // Light gray background
    color: "#1f2937",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "0.875rem",
    transition: "all 0.2s",
    outline: "none",
    boxSizing: "border-box",
  },
  searchInputFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "1.5rem",
  },
  projectCard: {
    backgroundColor: "#ffffff", // White background
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  cardHover: {
    borderColor: "rgba(0, 0, 0, 0.2)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.25rem",
  },
  cardTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: 0,
  },
  cardMenuButton: {
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    padding: "0.25rem",
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardMenuButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    color: "#1f2937",
  },
  cardContent: {
    padding: "0 1.25rem 1.25rem",
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
  },
  cardItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  cardIcon: {
    marginRight: "0.5rem",
    height: "1rem",
    width: "1rem",
    color: "#6b7280",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1.25rem",
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    backgroundColor: "#f9fafb",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    borderRadius: "9999px",
    backgroundColor: "rgba(59, 130, 246, 0.1)", // Blue with opacity
    color: "#3b82f6",
  },
  ownerBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
  },
  collaboratorBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    color: "#f59e0b",
  },
  lastUpdated: {
    fontSize: "0.75rem",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
  },
  lastUpdatedIcon: {
    marginRight: "0.25rem",
    height: "0.875rem",
    width: "0.875rem",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 2rem",
    textAlign: "center",
    backgroundColor: "#f9fafb",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    gridColumn: "1 / -1",
  },
  emptyIcon: {
    height: "4rem",
    width: "4rem",
    color: "#6b7280",
    marginBottom: "1rem",
  },
  emptyTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0.5rem 0",
  },
  emptyText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1.5rem",
  },

  // Modal
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: -1,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: "0.75rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: "32rem",
    padding: "1.75rem",
    position: "relative",
    zIndex: 10,
    maxHeight: "90vh",
    overflow: "auto",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },
  modalHeader: {
    marginBottom: "1.5rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    paddingBottom: "1rem",
  },
  modalTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 0,
    marginBottom: "0.5rem",
  },
  modalDesc: {
    fontSize: "0.875rem",
    color: "#6b7280",
    margin: 0,
  },
  formGroup: {
    marginBottom: "1.5rem",
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
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "0.875rem",
    transition: "all 0.2s",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
  },
  textarea: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "0.875rem",
    outline: "none",
    transition: "all 0.2s",
    minHeight: "6rem",
    resize: "vertical",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    boxSizing: "border-box",
  },
  textareaFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
  },
  modalFooter: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    gap: "0.75rem",
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    paddingTop: "1.25rem",
  },
  modalFooterButtons: {
    display: "flex",
    gap: "0.75rem",
  },
  outlineButton: {
    padding: "0.625rem 1.25rem",
    backgroundColor: "transparent",
    color: "#4b5563",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  outlineButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  primaryButton: {
    padding: "0.625rem 1.25rem",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  primaryButtonHover: {
    backgroundColor: "#2563eb",
  },
  primaryButtonDisabled: {
    padding: "0.625rem 1.25rem",
    backgroundColor: "#9ca3af",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  helperText: {
    fontSize: "0.75rem",
    color: "#6b7280",
    marginTop: "0.5rem",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  loadingSpinner: {
    height: "1.25rem",
    width: "1.25rem",
    marginRight: "0.5rem",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  // Role indicator styles
  roleIndicator: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    color: "#3b82f6",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginRight: "1rem",
  },
  managerRoleIndicator: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginRight: "1rem",
  },
  adminRoleIndicator: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginRight: "1rem",
  },
  infoAlert: {
    backgroundColor: "#eff6ff",
    borderLeft: "4px solid #3b82f6",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
    color: "#1e40af",
    fontSize: "0.875rem",
  },
  userSelectionContainer: {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
    padding: "1rem",
    backgroundColor: "#f9fafb",
    maxHeight: "200px",
    overflowY: "auto",
  },
  userCheckbox: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    transition: "background-color 0.2s",
    cursor: "pointer",
  },
  userCheckboxHover: {
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
  checkbox: {
    marginRight: "0.5rem",
  },
  userLabel: {
    fontSize: "0.875rem",
    color: "#1f2937",
  },
  selectedUsersDisplay: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.75rem",
  },
  userTag: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: "9999px",
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#3b82f6",
  },
  removeUserButton: {
    marginLeft: "0.375rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1rem",
    height: "1rem",
    color: "#3b82f6",
    background: "none",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  emptyUsersText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    textAlign: "center",
    padding: "1rem",
  },
}

function Dashboard({ user }) {
  const navigate = (path) => {
    window.location.href = path
  }

  // State variables
  const [projects, setProjects] = useState([])
  const [newProjectName, setNewProjectName] = useState("")
  const [projectContext, setProjectContext] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // User role and permissions
  const [userRole, setUserRole] = useState("user")
  const [canCreateProjects, setCanCreateProjects] = useState(false)
  const [isManager, setIsManager] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // Manager-specific states
  const [availableUsers, setAvailableUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)

  // Media query handling
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Check user role and permissions on component mount
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await api.get("/check_session")
        const userData = response.data
        setUserRole(userData.role || "user")
        setCanCreateProjects(userData.can_create_projects || false)
        setIsManager(userData.is_manager || false)
        setIsAdmin(userData.is_admin || false)
      } catch (error) {
        console.error("Failed to check user role:", error)
      }
    }

    checkUserRole()
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [])

  // Fetch projects based on user role
  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects")
      console.log("Fetched projects:", response.data)
      setProjects(response.data.projects || [])
      setCanCreateProjects(response.data.can_create_projects || false)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  // Fetch available users for project assignment (managers only)
  const fetchAvailableUsers = async () => {
    if (!isManager && !isAdmin) return
    
    setIsLoadingUsers(true)
    try {
const response = await api.get("/manager/users")
      setAvailableUsers(response.data.users || [])
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  // Handle project creation with user assignment for managers
  const handleCreateProject = async () => {
    if (!canCreateProjects) {
      alert("You don't have permission to create projects. Please contact your manager.")
      return
    }

    try {
      const projectData = {
        name: newProjectName,
        context: projectContext,
        assigned_users: selectedUsers // Only for managers
      }

      console.log("Creating project with data:", projectData)

      // Use different endpoint for managers who can assign users
      const endpoint = (isManager || isAdmin) ? "/manager/projects" : "/projects"
      const response = await api.post(endpoint, projectData)
      
      console.log("Project created successfully:", response.data)
      const newProject = response.data.project

      // Refresh project list
      await fetchProjects()

      // Reset form fields
      setNewProjectName("")
      setProjectContext("")
      setSelectedUsers([])
      setIsDialogOpen(false)

      // Navigate to the new project
      if (newProject && newProject.id) {
        console.log("Navigating to project:", newProject.id)
        navigate(`/project/${newProject.id}`)
      } else {
        console.error("Project ID not available for navigation")
      }
    } catch (error) {
      console.error("Error creating project:", error)
      alert("Failed to create project. Please try again. " + (error.response?.data?.error || error.message || ""))
    }
  }

  // Handle user selection for project assignment
  const handleUserSelection = (username, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, username])
    } else {
      setSelectedUsers(selectedUsers.filter(user => user !== username))
    }
  }

  // Remove selected user
  const removeSelectedUser = (username) => {
    setSelectedUsers(selectedUsers.filter(user => user !== username))
  }

  const handleLogout = async () => {
    try {
      await api.post("/logout")
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout failed:", error)
      window.location.href = "/login"
    }
  }

  // Get role display information
  const getRoleDisplay = () => {
    switch (userRole) {
      case "admin":
        return { text: "Administrator", style: styles.adminRoleIndicator }
      case "manager":
        return { text: "Manager", style: styles.managerRoleIndicator }
      default:
        return { text: "User", style: styles.roleIndicator }
    }
  }

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) => {
    if (!searchQuery) return true
    return project.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <img src={logoImage} alt="TestGen Logo" style={styles.logo} />
          <div style={styles.navLinks}>
            {isAdmin && (
                    <button
                      style={styles.navLink}
                      onClick={() => navigate("/admin")}
                      onMouseEnter={() => setHoveredButton('admin')}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      Admin Panel
                    </button>
                  )}

                  {isManager && !isAdmin && (
                    <button
                      style={styles.navLink}
                      onClick={() => navigate("/manager")}
                      onMouseEnter={() => setHoveredButton('manager')}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      Manager Panel
                    </button>
                  )}
            <button
              style={styles.navLink}
              onClick={handleLogout}
              onMouseEnter={() => setHoveredButton('logout')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.titleRow}>
          <div style={styles.titleSection}>
            <h2 style={styles.pageTitle}>Projects</h2>
          </div>
          
          {canCreateProjects ? (
            <button
              onClick={() => {
                setIsDialogOpen(true)
                if (isManager || isAdmin) {
                  fetchAvailableUsers()
                }
              }}
              style={hoveredButton === 'newProject' ? {...styles.newProjectButton, ...styles.newProjectButtonHover} : styles.newProjectButton}
              onMouseEnter={() => setHoveredButton('newProject')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <PlusIcon style={styles.buttonIcon} />
              New Project
            </button>
          ) : (
            <div style={styles.newProjectButtonDisabled}>
              <PlusIcon style={styles.buttonIcon} />
              New Project
            </div>
          )}
        </div>

        {/* Info alert for regular users */}
        {!canCreateProjects && userRole === "user" && (
          <div style={styles.infoAlert}>
            <strong>Info:</strong> Only managers can create projects. You have access to projects where you are assigned as a collaborator.
          </div>
        )}

        <div style={styles.searchRow}>
          <div style={styles.searchContainer}>
            <SearchIcon style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={focusedInput === 'search' ? {...styles.searchInput, ...styles.searchInputFocus} : styles.searchInput}
              onFocus={() => setFocusedInput('search')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
        </div>

        {/* Enhanced Project Creation Dialog for Managers */}
        {isDialogOpen && (
          <div style={styles.modal}>
            <div style={styles.modalOverlay} onClick={() => setIsDialogOpen(false)}></div>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>Create New Project</h3>
                <p style={styles.modalDesc}>
                  {isManager || isAdmin 
                    ? "Create a project and assign users to collaborate on it." 
                    : "Create a new project for test case generation."}
                </p>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="project-name">
                  Project Name
                </label>
                <input
                  id="project-name"
                  style={focusedInput === 'projectName' ? {...styles.input, ...styles.inputFocus} : styles.input}
                  placeholder="Enter project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onFocus={() => setFocusedInput('projectName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="project-context">
                  Project Description
                </label>
                <textarea
                  id="project-context"
                  rows={4}
                  style={focusedInput === 'projectContext' ? {...styles.textarea, ...styles.textareaFocus} : styles.textarea}
                  placeholder="Describe the project's functional requirements..."
                  value={projectContext}
                  onChange={(e) => setProjectContext(e.target.value)}
                  onFocus={() => setFocusedInput('projectContext')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
                      
              {/* User Assignment Section for Managers */}
              {(isManager || isAdmin) && (
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Assign Users</label>
                  <p style={styles.helperText}>
                    Select users to assign as collaborators on this project.
                  </p>
                  
                  {isLoadingUsers ? (
                    <div style={styles.loadingContainer}>
                      <LoadingSpinner style={styles.loadingSpinner} />
                      <span style={styles.loadingText}>Loading users...</span>
                    </div>
                  ) : (
                    <div style={styles.userSelectionContainer}>
                      {availableUsers.length === 0 ? (
                        <p style={styles.emptyUsersText}>
                          No users available for assignment
                        </p>
                      ) : (
                        availableUsers.map((user) => (
                          <div 
                            key={user.username} 
                            style={styles.userCheckbox}
                            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)"}
                            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                          >
                            <input
                              type="checkbox"
                              style={styles.checkbox}
                              checked={selectedUsers.includes(user.username)}
                              onChange={(e) => handleUserSelection(user.username, e.target.checked)}
                            />
                            <span style={styles.userLabel}>
                              {user.email || user.username}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Display selected users */}
                  {selectedUsers.length > 0 && (
                    <div style={styles.selectedUsersDisplay}>
                      {selectedUsers.map((username) => (
                        <span key={username} style={styles.userTag}>
                          {username}
                          <button
                            type="button"
                            style={styles.removeUserButton}
                            onClick={() => removeSelectedUser(username)}
                            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(59, 130, 246, 0.2)"}
                            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div style={styles.modalFooter}>
                <div></div>
                <div style={styles.modalFooterButtons}>
                  <button
                    type="button"
                    style={hoveredButton === 'cancel' ? {...styles.outlineButton, ...styles.outlineButtonHover} : styles.outlineButton}
                    onClick={() => {
                      setIsDialogOpen(false)
                      setNewProjectName("")
                      setProjectContext("")
                      setSelectedUsers([])
                    }}
                    onMouseEnter={() => setHoveredButton('cancel')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={!newProjectName.trim() ? styles.primaryButtonDisabled : (hoveredButton === 'create' ? {...styles.primaryButton, ...styles.primaryButtonHover} : styles.primaryButton)}
                    onClick={handleCreateProject}
                    disabled={!newProjectName.trim()}
                    onMouseEnter={() => setHoveredButton('create')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div style={styles.projectGrid}>
          {filteredProjects.length === 0 ? (
            <div style={styles.emptyState}>
              <FolderOpenIcon style={styles.emptyIcon} />
              <h3 style={styles.emptyTitle}>No projects found</h3>
              <p style={styles.emptyText}>
                {searchQuery 
                  ? "Try a different search term." 
                  : userRole === "user" 
                    ? "You haven't been assigned to any projects yet. Contact your manager if you need access to projects."
                    : "Start by creating a new project."}
              </p>
              {!searchQuery && canCreateProjects && (
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(true)
                    if (isManager || isAdmin) {
                      fetchAvailableUsers()
                    }
                  }}
                  style={hoveredButton === 'emptyNew' ? {...styles.newProjectButton, ...styles.newProjectButtonHover} : styles.newProjectButton}
                  onMouseEnter={() => setHoveredButton('emptyNew')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <PlusIcon style={styles.buttonIcon} />
                  New Project
                </button>
              )}
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                style={hoveredCard === project.id ? {...styles.projectCard, ...styles.cardHover} : styles.projectCard}
                onClick={() => navigate(`/project/${project.id}`)}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{project.name}</h3>
                  <button 
                    style={hoveredButton === `menu-${project.id}` ? {...styles.cardMenuButton, ...styles.cardMenuButtonHover} : styles.cardMenuButton}
                    onMouseEnter={() => setHoveredButton(`menu-${project.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <DotsIcon />
                  </button>
                </div>
                
                <div style={styles.cardContent}>
                  <div style={styles.cardRow}>
                    <div style={styles.cardItem}>
                      <CalendarIcon style={styles.cardIcon} />
                      {new Date(project.created_at).toISOString().split("T")[0]}
                    </div>
                    <div style={styles.cardItem}>
                      <DocumentIcon style={styles.cardIcon} />
                      {project.test_count || 0} tests
                    </div>
                  </div>
                  <div style={styles.cardRow}>
                    <div style={styles.cardItem}>
                      <UsersIcon style={styles.cardIcon} />
                      {project.collaborators?.length || 0} collaborators
                    </div>
                  </div>
                </div>
                
                <div style={styles.cardFooter}>
                  <div style={project.is_owner ? {...styles.statusBadge, ...styles.ownerBadge} : {...styles.statusBadge, ...styles.collaboratorBadge}}>
                    {project.is_owner ? "Owner" : "Collaborator"}
                  </div>
                  <div style={styles.lastUpdated}>
                    <ClockIcon style={styles.lastUpdatedIcon} />
                    Last updated 2 days ago
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

// Icon components (simplified for brevity)
const PlusIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
)

const SearchIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
)

const CalendarIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
)

const DocumentIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
)

const UsersIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
)

const ClockIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
)

const DotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{width: "1rem", height: "1rem"}}>
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
)

const FolderOpenIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
    <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
  </svg>
)

const LoadingSpinner = ({ style }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
)

export default Dashboard