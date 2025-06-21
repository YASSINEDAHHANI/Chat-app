import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"

// Enhanced CSS styles with light theme aesthetics for Manager Panel
const styles = {
  // Layout
  container: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    color: "#1f2937",
  },
  header: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
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
  logo: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#10b981",
    letterSpacing: "-0.025em",
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  navLink: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  navLinkHover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    color: "#1f2937",
  },
  navLinkActive: {
    color: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.08)",
  },
  mainContent: {
    flex: "1",
    backgroundColor: "#f9fafb",
  },
  mainContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
  },
  pageTitle: {
    fontSize: "1.875rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    color: "#1f2937",
    letterSpacing: "-0.025em",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    transition: "box-shadow 0.2s",
  },
  cardHover: {
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1f2937",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  statCardHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  statValue: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#10b981",
    letterSpacing: "-0.025em",
    lineHeight: "1",
    marginBottom: "0.5rem",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  // Table styles
  tableContainer: {
    overflow: "auto",
    maxWidth: "100%",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    backgroundColor: "#f3f4f6",
  },
  tableHeaderCell: {
    padding: "0.75rem 1rem",
    textAlign: "left",
    fontWeight: "600",
    color: "#4b5563",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    whiteSpace: "nowrap",
  },
  tableRow: {
    transition: "background-color 0.2s",
  },
  tableRowHover: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  tableCell: {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    verticalAlign: "middle",
  },
  // Button styles
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.625rem 1.25rem",
    borderRadius: "0.375rem",
    fontWeight: "500",
    fontSize: "0.875rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  primaryButton: {
    backgroundColor: "#10b981",
    color: "white",
  },
  primaryButtonHover: {
    backgroundColor: "#059669",
  },
  dangerButton: {
    backgroundColor: "#ef4444",
    color: "white",
  },
  dangerButtonHover: {
    backgroundColor: "#dc2626",
  },
  secondaryButton: {
    backgroundColor: "#f9fafb",
    color: "#4b5563",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },
  secondaryButtonHover: {
    backgroundColor: "#f3f4f6",
    color: "#1f2937",
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  smallButton: {
    padding: "0.375rem 0.75rem",
    fontSize: "0.75rem",
    borderRadius: "0.25rem",
  },
  buttonContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    animation: "fadeIn 0.3s ease-out",
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: "0.75rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    padding: "1.75rem",
    width: "100%",
    maxWidth: "32rem",
    position: "relative",
    animation: "slideUp 0.3s ease-out",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1f2937",
  },
  // Form styles
  formGroup: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
  },
  input: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "0.875rem",
    color: "#1f2937",
    backgroundColor: "#ffffff",
    transition: "all 0.2s",
  },
  inputFocus: {
    outline: "none",
    borderColor: "#10b981",
    boxShadow: "0 0 0 1px #10b981",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
    marginTop: "1.5rem",
    paddingTop: "1.25rem",
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
  },
  // Badge styles
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  userBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
  },
  managerBadge: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    color: "#3b82f6",
  },
  // Loading and error states
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
    flexDirection: "column",
    gap: "1rem",
  },
  loadingSpinner: {
    height: "2.5rem",
    width: "2.5rem",
    borderRadius: "50%",
    border: "3px solid rgba(0, 0, 0, 0.1)",
    borderTopColor: "#10b981",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  errorContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    color: "#ef4444",
    marginBottom: "1.5rem",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  errorIcon: {
    flexShrink: 0,
    height: "1.25rem",
    width: "1.25rem",
  },
  gridLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1.5rem",
    textAlign: "center",
  },
  emptyStateIcon: {
    width: "3rem",
    height: "3rem",
    color: "#9ca3af",
    marginBottom: "1rem",
  },
  emptyStateTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  emptyStateText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    maxWidth: "24rem",
    marginBottom: "1.5rem",
  },
}

const ManagerPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [dashboardData, setDashboardData] = useState(null)
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  // Add states for user form
  const [showUserForm, setShowUserForm] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  })

  // Add state for edit user form
  const [showEditForm, setShowEditForm] = useState(false)
  const [editUser, setEditUser] = useState(null)

  // Add state for hovered button
  const [hoveredButton, setHoveredButton] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)

  useEffect(() => {
    // Add custom styles for animations
    const styleTag = document.createElement("style")
    styleTag.type = "text/css"
    styleTag.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      body {
        background-color: #ffffff;
        margin: 0;
        padding: 0;
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
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch data based on active tab
      if (activeTab === "dashboard") {
        const response = await api.get("/manager/dashboard")
        setDashboardData(response.data)
      } else if (activeTab === "users") {
        const response = await api.get("/manager/users")
        setUsers(response.data.users)
      } else if (activeTab === "projects") {
        const response = await api.get("/manager/projects")
        setProjects(response.data.projects)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error.response?.data?.error || "An error occurred")

      // If unauthorized, redirect to login
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateUser = async () => {
    try {
      const response = await api.post("/manager/users", newUser)
      setUsers([...users, response.data.user])
      setShowUserForm(false)
      setNewUser({
        username: "",
        password: "",
      })
    } catch (error) {
      console.error("Error creating user:", error)
      setError(error.response?.data?.error || "Failed to create user")
    }
  }

  const handleEditUser = async () => {
    if (!editUser) return

    try {
      const updateData = {}

      // Only include password if it was changed
      if (editUser.newPassword) {
        updateData.password = editUser.newPassword
      }

      const response = await api.put(`/manager/users/${editUser._id}`, updateData)

      // Update the users list
      setUsers(users.map((user) => (user._id === editUser._id ? response.data.user : user)))

      setShowEditForm(false)
      setEditUser(null)
    } catch (error) {
      console.error("Error updating user:", error)
      setError(error.response?.data?.error || "Failed to update user")
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/manager/users/${userId}`)
        setUsers(users.filter((user) => user._id !== userId))
      } catch (error) {
        console.error("Error deleting user:", error)
        setError(error.response?.data?.error || "Failed to delete user")
      }
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/manager/projects/${projectId}`)
        setProjects(projects.filter((project) => project.id !== projectId))
      } catch (error) {
        console.error("Error deleting project:", error)
        setError(error.response?.data?.error || "Failed to delete project")
      }
    }
  }

  const handleViewProjectDetails = async (projectId) => {
    try {
      const response = await api.get(`/manager/projects/${projectId}`)
      setSelectedProject(response.data.project)
    } catch (error) {
      console.error("Error fetching project details:", error)
      setError(error.response?.data?.error || "Failed to fetch project details")
    }
  }

  const handleStartEditUser = (user) => {
    setEditUser({
      _id: user._id,
      username: user.username,
      newPassword: "",
    })
    setShowEditForm(true)
  }

  const handleLogout = async () => {
    try {
      await api.post("/logout")
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // SVG Icons
  const ExclamationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.errorIcon} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )

  const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.emptyStateIcon} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  )

  const renderUsers = () => {
    return (
      <div>
        <h2 style={styles.pageTitle}>User Management</h2>

        <div style={{ marginBottom: "1rem" }}>
          <button
            style={
              hoveredButton === "add-user"
                ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                : { ...styles.button, ...styles.primaryButton }
            }
            onClick={() => setShowUserForm(true)}
            onMouseEnter={() => setHoveredButton("add-user")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Add New User
          </button>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Managed Users</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeaderCell}>Username</th>
                  <th style={styles.tableHeaderCell}>Email</th>
                  <th style={styles.tableHeaderCell}>Projects Assigned</th>
                  <th style={styles.tableHeaderCell}>Created By Me</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                      No users found. Create your first user to get started.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      style={
                        hoveredButton === `user-row-${user._id}`
                          ? { ...styles.tableRow, ...styles.tableRowHover }
                          : styles.tableRow
                      }
                      onMouseEnter={() => setHoveredButton(`user-row-${user._id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <td style={styles.tableCell}>{user.username}</td>
                      <td style={styles.tableCell}>{user.email || user.username}</td>
                      <td style={styles.tableCell}>
                        <span style={{ ...styles.badge, ...styles.userBadge }}>
                          {user.projects_assigned || 0} projects
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        {user.created_by_me ? (
                          <span style={{ ...styles.badge, ...styles.managerBadge }}>Yes</span>
                        ) : (
                          <span style={{ ...styles.badge, backgroundColor: "#f3f4f6", color: "#6b7280" }}>No</span>
                        )}
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.buttonContainer}>
                          <button
                            style={
                              hoveredButton === `edit-user-${user._id}`
                                ? {
                                    ...styles.button,
                                    ...styles.smallButton,
                                    ...styles.secondaryButton,
                                    ...styles.secondaryButtonHover,
                                  }
                                : { ...styles.button, ...styles.smallButton, ...styles.secondaryButton }
                            }
                            onClick={() => handleStartEditUser(user)}
                            onMouseEnter={() => setHoveredButton(`edit-user-${user._id}`)}
                            onMouseLeave={() => setHoveredButton(`user-row-${user._id}`)}
                          >
                            Edit
                          </button>
                          {user.created_by_me && (
                            <button
                              style={
                                hoveredButton === `delete-user-${user._id}`
                                  ? {
                                      ...styles.button,
                                      ...styles.smallButton,
                                      ...styles.dangerButton,
                                      ...styles.dangerButtonHover,
                                    }
                                  : { ...styles.button, ...styles.smallButton, ...styles.dangerButton }
                              }
                              onClick={() => handleDeleteUser(user._id)}
                              onMouseEnter={() => setHoveredButton(`delete-user-${user._id}`)}
                              onMouseLeave={() => setHoveredButton(`user-row-${user._id}`)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderProjects = () => {
    if (selectedProject) {
      // Project details view - simplified version
      return (
        <div>
          <button
            style={
              hoveredButton === "back-to-projects"
                ? { ...styles.button, ...styles.secondaryButton, ...styles.secondaryButtonHover }
                : { ...styles.button, ...styles.secondaryButton }
            }
            onClick={() => setSelectedProject(null)}
            onMouseEnter={() => setHoveredButton("back-to-projects")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            ← Back to Projects
          </button>

          <h2 style={styles.pageTitle}>Project: {selectedProject.name}</h2>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Project Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <p>
                  <strong>Name:</strong> {selectedProject.name}
                </p>
                <p>
                  <strong>Owner:</strong> {selectedProject.user}
                </p>
                <p>
                  <strong>Created:</strong> {new Date(selectedProject.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p>
                  <strong>Requirements:</strong> {selectedProject.requirements?.length || 0}
                </p>
                <p>
                  <strong>Collaborators:</strong> {selectedProject.collaborator_details?.length || 0}
                </p>
              </div>
            </div>

            {selectedProject.context && (
              <div style={{ marginTop: "1rem" }}>
                <strong>Context:</strong>
                <div
                  style={{
                    marginTop: "0.5rem",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.375rem",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {selectedProject.context}
                </div>
              </div>
            )}

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
              <button
                style={
                  hoveredButton === "delete-project"
                    ? { ...styles.button, ...styles.dangerButton, ...styles.dangerButtonHover }
                    : { ...styles.button, ...styles.dangerButton }
                }
                onClick={() => {
                  handleDeleteProject(selectedProject.id)
                  setSelectedProject(null)
                }}
                onMouseEnter={() => setHoveredButton("delete-project")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Delete Project
              </button>
            </div>
          </div>

          {selectedProject.collaborator_details && selectedProject.collaborator_details.length > 0 && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Collaborators ({selectedProject.collaborator_details.length})</h3>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead style={styles.tableHead}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Username</th>
                      <th style={styles.tableHeaderCell}>Email</th>
                      <th style={styles.tableHeaderCell}>Added Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProject.collaborator_details.map((collab) => (
                      <tr key={collab._id}>
                        <td style={styles.tableCell}>{collab.username}</td>
                        <td style={styles.tableCell}>{collab.email}</td>
                        <td style={styles.tableCell}>
                          {collab.added_at ? new Date(collab.added_at).toLocaleDateString() : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div>
        <h2 style={styles.pageTitle}>Project Management</h2>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>My Projects</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeaderCell}>Name</th>
                  <th style={styles.tableHeaderCell}>Created</th>
                  <th style={styles.tableHeaderCell}>Requirements</th>
                  <th style={styles.tableHeaderCell}>Collaborators</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                      No projects found. Create projects from the main dashboard.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr
                      key={project._id}
                      style={
                        hoveredButton === `project-row-${project.id}`
                          ? { ...styles.tableRow, ...styles.tableRowHover }
                          : styles.tableRow
                      }
                      onMouseEnter={() => setHoveredButton(`project-row-${project.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <td style={styles.tableCell}>{project.name}</td>
                      <td style={styles.tableCell}>{new Date(project.created_at).toLocaleDateString()}</td>
                      <td style={styles.tableCell}>{project.requirements_count || 0}</td>
                      <td style={styles.tableCell}>{project.collaborator_count || 0}</td>
                      <td style={styles.tableCell}>
                        <div style={styles.buttonContainer}>
                          <button
                            style={
                              hoveredButton === `view-project-${project.id}`
                                ? {
                                    ...styles.button,
                                    ...styles.smallButton,
                                    ...styles.primaryButton,
                                    ...styles.primaryButtonHover,
                                  }
                                : { ...styles.button, ...styles.smallButton, ...styles.primaryButton }
                            }
                            onClick={() => handleViewProjectDetails(project.id)}
                            onMouseEnter={() => setHoveredButton(`view-project-${project.id}`)}
                            onMouseLeave={() => setHoveredButton(`project-row-${project.id}`)}
                          >
                            View Details
                          </button>
                          <button
                            style={
                              hoveredButton === `delete-project-${project.id}`
                                ? {
                                    ...styles.button,
                                    ...styles.smallButton,
                                    ...styles.dangerButton,
                                    ...styles.dangerButtonHover,
                                  }
                                : { ...styles.button, ...styles.smallButton, ...styles.dangerButton }
                            }
                            onClick={() => handleDeleteProject(project.id)}
                            onMouseEnter={() => setHoveredButton(`delete-project-${project.id}`)}
                            onMouseLeave={() => setHoveredButton(`project-row-${project.id}`)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderDashboard = () => {
    if (!dashboardData) return null

    const stats = dashboardData.stats || {}
    const recentProjects = dashboardData.managed_projects?.recent || []
    const recentUsers = dashboardData.assigned_users?.recent || []

    return (
      <div>
        <h2 style={styles.pageTitle}>Manager Dashboard</h2>

        <div style={styles.statsGrid}>
          <div
            style={
              hoveredButton === "stat-projects" ? { ...styles.statCard, ...styles.statCardHover } : styles.statCard
            }
            onMouseEnter={() => setHoveredButton("stat-projects")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span style={styles.statValue}>{stats.total_projects || 0}</span>
            <span style={styles.statLabel}>Total Projects</span>
          </div>
          <div
            style={
              hoveredButton === "stat-users" ? { ...styles.statCard, ...styles.statCardHover } : styles.statCard
            }
            onMouseEnter={() => setHoveredButton("stat-users")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span style={styles.statValue}>{stats.total_assigned_users || 0}</span>
            <span style={styles.statLabel}>Assigned Users</span>
          </div>
          <div
            style={
              hoveredButton === "stat-requirements" ? { ...styles.statCard, ...styles.statCardHover } : styles.statCard
            }
            onMouseEnter={() => setHoveredButton("stat-requirements")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span style={styles.statValue}>{stats.total_requirements || 0}</span>
            <span style={styles.statLabel}>Total Requirements</span>
          </div>
          <div
            style={
              hoveredButton === "stat-collaborations"
                ? { ...styles.statCard, ...styles.statCardHover }
                : styles.statCard
            }
            onMouseEnter={() => setHoveredButton("stat-collaborations")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span style={styles.statValue}>{stats.total_collaborations || 0}</span>
            <span style={styles.statLabel}>Total Collaborations</span>
          </div>
        </div>

        <div style={styles.gridLayout}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Projects</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Name</th>
                    <th style={styles.tableHeaderCell}>Created</th>
                    <th style={styles.tableHeaderCell}>Collaborators</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.length > 0 ? (
                    recentProjects.map((project) => (
                      <tr key={project._id || project.id}>
                        <td style={styles.tableCell}>{project.name}</td>
                        <td style={styles.tableCell}>{new Date(project.created_at).toLocaleDateString()}</td>
                        <td style={styles.tableCell}>{project.collaborators?.length || 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                        No recent projects
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recent User Activity</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Username</th>
                    <th style={styles.tableHeaderCell}>Project</th>
                    <th style={styles.tableHeaderCell}>Added</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.length > 0 ? (
                    recentUsers.map((user) => (
                      <tr key={user._id}>
                        <td style={styles.tableCell}>{user.username}</td>
                        <td style={styles.tableCell}>{user.project_id}</td>
                        <td style={styles.tableCell}>
                          {user.added_at ? new Date(user.added_at).toLocaleDateString() : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                        No recent user activity
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the user creation form modal
  const renderUserForm = () => {
    if (!showUserForm) return null

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3 style={styles.modalTitle}>Create New User</h3>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">
              Username/Email
            </label>
            <input
              id="username"
              type="text"
              style={{
                ...styles.input,
                ...(focusedInput === "username" ? styles.inputFocus : {}),
              }}
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              placeholder="Enter username/email"
              onFocus={() => setFocusedInput("username")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              style={{
                ...styles.input,
                ...(focusedInput === "password" ? styles.inputFocus : {}),
              }}
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Password"
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <div style={styles.modalFooter}>
            <button
              style={
                hoveredButton === "cancel-user"
                  ? { ...styles.button, ...styles.secondaryButton, ...styles.secondaryButtonHover }
                  : { ...styles.button, ...styles.secondaryButton }
              }
              onClick={() => setShowUserForm(false)}
              onMouseEnter={() => setHoveredButton("cancel-user")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Cancel
            </button>
            <button
              style={
                hoveredButton === "create-user"
                  ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                  : { ...styles.button, ...styles.primaryButton }
              }
              onClick={handleCreateUser}
              disabled={!newUser.username || !newUser.password}
              onMouseEnter={() => setHoveredButton("create-user")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render the edit user form modal
  const renderEditUserForm = () => {
    if (!showEditForm || !editUser) return null

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3 style={styles.modalTitle}>Edit User: {editUser.username}</h3>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="edit-password">
              New Password (leave blank to keep current)
            </label>
            <input
              id="edit-password"
              type="password"
              style={{
                ...styles.input,
                ...(focusedInput === "edit-password" ? styles.inputFocus : {}),
              }}
              value={editUser.newPassword}
              onChange={(e) => setEditUser({ ...editUser, newPassword: e.target.value })}
              placeholder="New password (optional)"
              onFocus={() => setFocusedInput("edit-password")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <div style={styles.modalFooter}>
            <button
              style={
                hoveredButton === "cancel-edit"
                  ? { ...styles.button, ...styles.secondaryButton, ...styles.secondaryButtonHover }
                  : { ...styles.button, ...styles.secondaryButton }
              }
              onClick={() => {
                setShowEditForm(false)
                setEditUser(null)
              }}
              onMouseEnter={() => setHoveredButton("cancel-edit")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Cancel
            </button>
            <button
              style={
                hoveredButton === "save-edit"
                  ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                  : { ...styles.button, ...styles.primaryButton }
              }
              onClick={handleEditUser}
              onMouseEnter={() => setHoveredButton("save-edit")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.logo}>Manager Panel - AI Test Case Generator</h1>
          <div style={styles.navLinks}>
            <button
              style={{
                ...styles.navLink,
                ...(activeTab === "dashboard" ? styles.navLinkActive : {}),
                ...(hoveredButton === "dashboard-tab" && activeTab !== "dashboard" ? styles.navLinkHover : {}),
              }}
              onClick={() => setActiveTab("dashboard")}
              onMouseEnter={() => setHoveredButton("dashboard-tab")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Dashboard
            </button>
            <button
              style={{
                ...styles.navLink,
                ...(activeTab === "users" ? styles.navLinkActive : {}),
                ...(hoveredButton === "users-tab" && activeTab !== "users" ? styles.navLinkHover : {}),
              }}
              onClick={() => setActiveTab("users")}
              onMouseEnter={() => setHoveredButton("users-tab")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Users
            </button>
            <button
              style={{
                ...styles.navLink,
                ...(activeTab === "projects" ? styles.navLinkActive : {}),
                ...(hoveredButton === "projects-tab" && activeTab !== "projects" ? styles.navLinkHover : {}),
              }}
              onClick={() => setActiveTab("projects")}
              onMouseEnter={() => setHoveredButton("projects-tab")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Projects
            </button>
            <button
              style={{
                ...styles.navLink,
                ...(hoveredButton === "dashboard-link" ? styles.navLinkHover : {}),
              }}
              onClick={() => navigate("/dashboard")}
              onMouseEnter={() => setHoveredButton("dashboard-link")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Main Dashboard
            </button>
            <button
              style={{
                ...styles.navLink,
                ...(hoveredButton === "logout" ? styles.navLinkHover : {}),
              }}
              onClick={handleLogout}
              onMouseEnter={() => setHoveredButton("logout")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.mainContainer}>
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <div style={styles.loadingText}>Loading data...</div>
            </div>
          ) : error ? (
            <div style={styles.errorContainer}>
              <ExclamationIcon />
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && renderDashboard()}
              {activeTab === "users" && renderUsers()}
              {activeTab === "projects" && renderProjects()}
            </>
          )}
        </div>
      </main>

      {/* Modal for creating a new user */}
      {renderUserForm()}

      {/* Modal for editing a user */}
      {renderEditUserForm()}
    </div>
  )
}

export default ManagerPage
