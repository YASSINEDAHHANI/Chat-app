import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"

// Enhanced CSS styles with light theme aesthetics
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
    color: "#3b82f6",
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
    color: "#3b82f6",
    backgroundColor: "rgba(59, 130, 246, 0.08)",
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
  tabsContainer: {
    display: "flex",
    marginBottom: "1.5rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    gap: "0.5rem",
  },
  tab: {
    padding: "0.75rem 1rem",
    fontWeight: "500",
    color: "#6b7280",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s",
  },
  tabActive: {
    color: "#3b82f6",
    borderBottomColor: "#3b82f6",
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
    color: "#3b82f6",
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
    backgroundColor: "#3b82f6",
    color: "white",
  },
  primaryButtonHover: {
    backgroundColor: "#2563eb",
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
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
  },
  select: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "0.875rem",
    color: "#1f2937",
    backgroundColor: "#ffffff",
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1.5em 1.5em",
    appearance: "none",
    paddingRight: "2.5rem",
    transition: "all 0.2s",
  },
  selectFocus: {
    outline: "none",
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
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
  adminBadge: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    color: "#3b82f6",
  },
  userBadge: {
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    color: "#4f46e5",
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
    borderTopColor: "#3b82f6",
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
  // Details section
  detailsSection: {
    marginTop: "1.5rem",
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    paddingTop: "1.5rem",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#4b5563",
    marginBottom: "1.5rem",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  backLinkHover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    color: "#1f2937",
  },
  backIcon: {
    height: "1rem",
    width: "1rem",
    marginRight: "0.5rem",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1f2937",
  },
  gridLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  infoGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  infoItem: {
    marginBottom: "0.75rem",
  },
  infoLabel: {
    fontWeight: "600",
    color: "#4b5563",
    marginRight: "0.5rem",
  },
  infoValue: {
    color: "#1f2937",
  },
  contextContent: {
    whiteSpace: "pre-wrap",
    padding: "1rem",
    backgroundColor: "#f9fafb",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    color: "#4b5563",
    maxHeight: "200px",
    overflow: "auto",
  },
  // Enhanced project view styles
  projectHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    padding: "1rem 1.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
  },
  projectTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0,
  },
  projectSubtitle: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginTop: "0.25rem",
  },
  projectStats: {
    display: "flex",
    gap: "1.5rem",
  },
  projectStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  projectStatValue: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#3b82f6",
  },
  projectStatLabel: {
    fontSize: "0.75rem",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "1.5rem",
  },
  projectSidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  projectInfoCard: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: "1.25rem",
    transition: "box-shadow 0.2s",
  },
  projectInfoTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.75rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  },
  projectInfoItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  },
  projectInfoLabel: {
    fontSize: "0.875rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  projectInfoValue: {
    fontSize: "0.875rem",
    color: "#1f2937",
    fontWeight: "500",
  },
  projectContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  projectContentCard: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    transition: "box-shadow 0.2s",
  },
  projectContentTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  projectContentText: {
    fontSize: "0.875rem",
    color: "#4b5563",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
  },
  requirementsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  requirementCard: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    transition: "all 0.2s",
  },
  requirementCardHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  requirementHeader: {
    padding: "1rem 1.25rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  requirementTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: 0,
  },
  requirementBadges: {
    display: "flex",
    gap: "0.5rem",
  },
  requirementBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  requirementContent: {
    padding: "1rem 1.25rem",
    backgroundColor: "#f9fafb",
    fontSize: "0.875rem",
    color: "#4b5563",
    lineHeight: "1.5",
  },
  collaboratorsList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  collaboratorItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem",
    backgroundColor: "#f9fafb",
    borderRadius: "0.375rem",
    border: "1px solid rgba(0, 0, 0, 0.05)",
  },
  collaboratorAvatar: {
    width: "2rem",
    height: "2rem",
    borderRadius: "9999px",
    backgroundColor: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "0.75rem",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#4b5563",
  },
  collaboratorInfo: {
    flex: 1,
  },
  collaboratorName: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#1f2937",
  },
  collaboratorEmail: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  collaboratorDate: {
    fontSize: "0.75rem",
    color: "#9ca3af",
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
  },
  tabHover: {
    color: "#1f2937",
  },
  searchInput: {
    width: "100%",
    padding: "0.625rem 1rem 0.625rem 2.5rem",
    borderRadius: "0.375rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "0.875rem",
    backgroundColor: "#f9fafb",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0.75rem center",
    backgroundSize: "1rem",
    marginBottom: "1rem",
  },
  filterBar: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  filterSelect: {
    padding: "0.5rem 2rem 0.5rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "0.75rem",
    backgroundColor: "#ffffff",
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1em",
    appearance: "none",
  },
  actionButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#6b7280",
    transition: "all 0.2s",
  },
  actionButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    color: "#1f2937",
  },
  actionIcon: {
    width: "1.25rem",
    height: "1.25rem",
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

const AdminPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [dashboardData, setDashboardData] = useState(null)
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedRequirement, setExpandedRequirement] = useState(null)

  // Add states for user form
  const [showUserForm, setShowUserForm] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "user",
  })

  // Add state for edit user form
  const [showEditForm, setShowEditForm] = useState(false)
  const [editUser, setEditUser] = useState(null)

  // State for project details
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  // Add state for hovered button
  const [hoveredButton, setHoveredButton] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)

  // Utility functions for displaying requirement properties
  const getReadableCategory = (category) => {
    const categoryMap = {
      functionality: "Functionality",
      ui: "UI/UX",
      security: "Security",
      performance: "Performance",
      usability: "Usability",
      compatibility: "Compatibility",
      accessibility: "Accessibility",
    }
    return categoryMap[category] || category
  }

  const getReadablePriority = (priority) => {
    const priorityMap = {
      high: "High",
      medium: "Medium",
      low: "Low",
    }
    return priorityMap[priority] || priority
  }

  const getReadableStatus = (status) => {
    const statusMap = {
      approved: "Approved",
      "in-review": "In Review",
      draft: "Draft",
    }
    return statusMap[status] || status
  }

  const getCategoryColor = (category) => {
    const colorMap = {
      functionality: "rgba(59, 130, 246, 0.1)", // blue
      ui: "rgba(239, 68, 68, 0.1)", // red
      security: "rgba(245, 158, 11, 0.1)", // amber
      performance: "rgba(16, 185, 129, 0.1)", // green
      usability: "rgba(139, 92, 246, 0.1)", // purple
      compatibility: "rgba(14, 165, 233, 0.1)", // light blue
      accessibility: "rgba(249, 115, 22, 0.1)", // orange
    }
    return colorMap[category] || "rgba(107, 114, 128, 0.1)"
  }

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: "rgba(239, 68, 68, 0.1)", // red
      medium: "rgba(245, 158, 11, 0.1)", // amber
      low: "rgba(16, 185, 129, 0.1)", // green
    }
    return colorMap[priority] || "rgba(107, 114, 128, 0.1)"
  }

  const getStatusColor = (status) => {
    const colorMap = {
      approved: "rgba(16, 185, 129, 0.1)", // green
      "in-review": "rgba(59, 130, 246, 0.1)", // blue
      draft: "rgba(107, 114, 128, 0.1)", // gray
    }
    return colorMap[status] || "rgba(107, 114, 128, 0.1)"
  }

  const getPriorityTextColor = (priority) => {
    const colorMap = {
      high: "#dc2626", // red
      medium: "#d97706", // amber
      low: "#059669", // green
    }
    return colorMap[priority] || "#6b7280"
  }

  const getStatusTextColor = (status) => {
    const colorMap = {
      approved: "#059669", // green
      "in-review": "#2563eb", // blue
      draft: "#6b7280", // gray
    }
    return colorMap[status] || "#6b7280"
  }

  const getCategoryTextColor = (category) => {
    const colorMap = {
      functionality: "#2563eb", // blue
      ui: "#dc2626", // red
      security: "#d97706", // amber
      performance: "#059669", // green
      usability: "#7c3aed", // purple
      compatibility: "#0ea5e9", // light blue
      accessibility: "#ea580c", // orange
    }
    return colorMap[category] || "#6b7280"
  }

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
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }
      
      /* Font smoothing */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Body styles */
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
        const response = await api.get("/admin/dashboard")
        setDashboardData(response.data)
      } else if (activeTab === "users") {
        const response = await api.get("/admin/users")
        setUsers(response.data.users)
      } else if (activeTab === "projects") {
        const response = await api.get("/admin/projects")
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
      // Set the email to be the same as username
      const userData = {
        ...newUser,
        email: newUser.username,
      }

      const response = await api.post("/admin/users", userData)
      setUsers([...users, response.data.user])
      setShowUserForm(false)
      setNewUser({
        username: "",
        password: "",
        role: "user",
      })
    } catch (error) {
      console.error("Error creating user:", error)
      setError(error.response?.data?.error || "Failed to create user")
    }
  }

  const handleEditUser = async () => {
    if (!editUser) return

    try {
      // Prepare the update data
      const updateData = {
        role: editUser.role,
      }

      // Only include password if it was changed
      if (editUser.newPassword) {
        updateData.password = editUser.newPassword
      }

      const response = await api.put(`/admin/users/${editUser._id}`, updateData)

      // Update the users list
      setUsers(users.map((user) => (user._id === editUser._id ? response.data.user : user)))

      // If we're editing the currently selected user, update that too
      if (selectedUser && selectedUser._id === editUser._id) {
        setSelectedUser(response.data.user)
      }

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
        await api.delete(`/admin/users/${userId}`)
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
        await api.delete(`/admin/projects/${projectId}`)
        setProjects(projects.filter((project) => project.id !== projectId))
      } catch (error) {
        console.error("Error deleting project:", error)
        setError(error.response?.data?.error || "Failed to delete project")
      }
    }
  }

  const handleViewProjectDetails = async (projectId) => {
    try {
      const response = await api.get(`/admin/projects/${projectId}`)
      setSelectedProject(response.data.project)
    } catch (error) {
      console.error("Error fetching project details:", error)
      setError(error.response?.data?.error || "Failed to fetch project details")
    }
  }

  const handleViewUserDetails = async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}`)
      setSelectedUser(response.data.user)
    } catch (error) {
      console.error("Error fetching user details:", error)
      setError(error.response?.data?.error || "Failed to fetch user details")
    }
  }

  const handleStartEditUser = (user) => {
    setEditUser({
      _id: user._id,
      username: user.username,
      role: user.role || "user",
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

  // SVG Icons as React components for better integration
  const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.backIcon} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  const ExclamationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.errorIcon} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )

  const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.actionIcon} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  const ChevronUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.actionIcon} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.emptyStateIcon} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
        clipRule="evenodd"
      />
    </svg>
  )

  const renderUsers = () => {
    if (selectedUser) {
      return (
        <div>
          <div
            style={
              hoveredButton === "back-to-users" ? { ...styles.backLink, ...styles.backLinkHover } : styles.backLink
            }
            onClick={() => setSelectedUser(null)}
            onMouseEnter={() => setHoveredButton("back-to-users")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <ArrowLeftIcon />
            Back to users list
          </div>

          <h2 style={styles.pageTitle}>User Details: {selectedUser.username}</h2>

          <div
            style={hoveredButton === "user-card" ? { ...styles.card, ...styles.cardHover } : styles.card}
            onMouseEnter={() => setHoveredButton("user-card")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <h3 style={styles.cardTitle}>User Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <p>
                  <strong>Username:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email || selectedUser.username}
                </p>
                <p>
                  <strong>Role:</strong>
                  <span
                    style={{
                      ...styles.badge,
                      ...(selectedUser.role === "admin" ? styles.adminBadge : styles.userBadge),
                      marginLeft: "0.5rem",
                    }}
                  >
                    {selectedUser.role || "user"}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <strong>Created:</strong>{" "}
                  {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : "N/A"}
                </p>
                <p>
                  <strong>Created By:</strong> {selectedUser.created_by || "N/A"}
                </p>
                <p>
                  <strong>Last Updated:</strong>{" "}
                  {selectedUser.updated_at ? new Date(selectedUser.updated_at).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
              <button
                style={
                  hoveredButton === "edit-user"
                    ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                    : { ...styles.button, ...styles.primaryButton }
                }
                onClick={() => handleStartEditUser(selectedUser)}
                onMouseEnter={() => setHoveredButton("edit-user")}
                onMouseLeave={() => setHoveredButton("user-card")}
              >
                Edit User
              </button>
              <button
                style={
                  hoveredButton === "delete-user"
                    ? { ...styles.button, ...styles.dangerButton, ...styles.dangerButtonHover }
                    : { ...styles.button, ...styles.dangerButton }
                }
                onClick={() => {
                  handleDeleteUser(selectedUser._id)
                  setSelectedUser(null)
                }}
                onMouseEnter={() => setHoveredButton("delete-user")}
                onMouseLeave={() => setHoveredButton("user-card")}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )
    }

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
          <h3 style={styles.cardTitle}>All Users</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeaderCell}>Username</th>
                  <th style={styles.tableHeaderCell}>Email</th>
                  <th style={styles.tableHeaderCell}>Role</th>
                  <th style={styles.tableHeaderCell}>Created</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
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
                      <span
                        style={{
                          ...styles.badge,
                          ...(user.role === "admin" ? styles.adminBadge : styles.userBadge),
                        }}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      {user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.buttonContainer}>
                        <button
                          style={
                            hoveredButton === `view-user-${user._id}`
                              ? {
                                  ...styles.button,
                                  ...styles.smallButton,
                                  ...styles.secondaryButton,
                                  ...styles.secondaryButtonHover,
                                }
                              : { ...styles.button, ...styles.smallButton, ...styles.secondaryButton }
                          }
                          onClick={() => handleViewUserDetails(user._id)}
                          onMouseEnter={() => setHoveredButton(`view-user-${user._id}`)}
                          onMouseLeave={() => setHoveredButton(`user-row-${user._id}`)}
                        >
                          View
                        </button>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderProjects = () => {
    if (selectedProject) {
      // Enhanced project details view
      return (
        <div>
          <div
            style={
              hoveredButton === "back-to-projects" ? { ...styles.backLink, ...styles.backLinkHover } : styles.backLink
            }
            onClick={() => setSelectedProject(null)}
            onMouseEnter={() => setHoveredButton("back-to-projects")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <ArrowLeftIcon />
            Back to projects list
          </div>

          <div style={styles.projectHeader}>
            <div>
              <h2 style={styles.projectTitle}>{selectedProject.name}</h2>
              <p style={styles.projectSubtitle}>
                Created by {selectedProject.user} on {new Date(selectedProject.created_at).toLocaleDateString()}
              </p>
            </div>
            <div style={styles.projectStats}>
              <div style={styles.projectStat}>
                <span style={styles.projectStatValue}>{selectedProject.requirements?.length || 0}</span>
                <span style={styles.projectStatLabel}>Requirements</span>
              </div>
              <div style={styles.projectStat}>
                <span style={styles.projectStatValue}>{selectedProject.collaborators?.length || 0}</span>
                <span style={styles.projectStatLabel}>Collaborators</span>
              </div>
              <div style={styles.projectStat}>
                <span style={styles.projectStatValue}>{selectedProject.test_cases?.length || 0}</span>
                <span style={styles.projectStatLabel}>Test Cases</span>
              </div>
            </div>
          </div>

          <div style={styles.projectGrid}>
            <div style={styles.projectSidebar}>
              <div
                style={
                  hoveredButton === "project-info-card"
                    ? {
                        ...styles.projectInfoCard,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }
                    : styles.projectInfoCard
                }
                onMouseEnter={() => setHoveredButton("project-info-card")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <h3 style={styles.projectInfoTitle}>Project Information</h3>
                <div style={styles.projectInfoItem}>
                  <span style={styles.projectInfoLabel}>Owner</span>
                  <span style={styles.projectInfoValue}>{selectedProject.user}</span>
                </div>
                <div style={styles.projectInfoItem}>
                  <span style={styles.projectInfoLabel}>Created</span>
                  <span style={styles.projectInfoValue}>
                    {new Date(selectedProject.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.projectInfoItem}>
                  <span style={styles.projectInfoLabel}>Last Updated</span>
                  <span style={styles.projectInfoValue}>
                    {selectedProject.updated_at ? new Date(selectedProject.updated_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div style={styles.projectInfoItem}>
                  <span style={styles.projectInfoLabel}>Language</span>
                  <span style={styles.projectInfoValue}>{selectedProject.language || "Not specified"}</span>
                </div>
                <div style={styles.projectInfoItem}>
                  <span style={styles.projectInfoLabel}>AI Model</span>
                  <span style={styles.projectInfoValue}>{selectedProject.ai_model || "Default"}</span>
                </div>
                <div style={{ marginTop: "1.25rem" }}>
                  <button
                    style={
                      hoveredButton === "delete-project"
                        ? { ...styles.button, ...styles.dangerButton, ...styles.dangerButtonHover, width: "100%" }
                        : { ...styles.button, ...styles.dangerButton, width: "100%" }
                    }
                    onClick={() => {
                      handleDeleteProject(selectedProject.id)
                      setSelectedProject(null)
                    }}
                    onMouseEnter={() => setHoveredButton("delete-project")}
                    onMouseLeave={() => setHoveredButton("project-info-card")}
                  >
                    Delete Project
                  </button>
                </div>
              </div>

              {selectedProject.collaborator_details && selectedProject.collaborator_details.length > 0 && (
                <div
                  style={
                    hoveredButton === "collaborators-card"
                      ? {
                          ...styles.projectInfoCard,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }
                      : styles.projectInfoCard
                  }
                  onMouseEnter={() => setHoveredButton("collaborators-card")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <h3 style={styles.projectInfoTitle}>Collaborators ({selectedProject.collaborator_details.length})</h3>
                  <div style={styles.collaboratorsList}>
                    {selectedProject.collaborator_details.map((collab) => (
                      <div key={collab._id} style={styles.collaboratorItem}>
                        <div style={styles.collaboratorAvatar}>{collab.username.charAt(0).toUpperCase()}</div>
                        <div style={styles.collaboratorInfo}>
                          <div style={styles.collaboratorName}>{collab.username}</div>
                          <div style={styles.collaboratorEmail}>{collab.email}</div>
                        </div>
                        <div style={styles.collaboratorDate}>
                          {collab.added_at ? new Date(collab.added_at).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={styles.projectContent}>
              <div
                style={
                  hoveredButton === "context-card"
                    ? {
                        ...styles.projectContentCard,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }
                    : styles.projectContentCard
                }
                onMouseEnter={() => setHoveredButton("context-card")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <h3 style={styles.projectContentTitle}>Project Context</h3>
                <div style={styles.projectContentText}>
                  {selectedProject.context || "No context provided for this project."}
                </div>
              </div>

              {selectedProject.requirements && selectedProject.requirements.length > 0 ? (
                <div
                  style={
                    hoveredButton === "requirements-card"
                      ? {
                          ...styles.projectContentCard,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }
                      : styles.projectContentCard
                  }
                  onMouseEnter={() => setHoveredButton("requirements-card")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <h3 style={styles.projectContentTitle}>
                    Requirements ({selectedProject.requirements.length})
                    <input
                      type="text"
                      placeholder="Search requirements..."
                      style={styles.searchInput}
                      onFocus={() => setFocusedInput("search-requirements")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </h3>

                  <div style={styles.filterBar}>
                    <select
                      style={styles.filterSelect}
                      onFocus={() => setFocusedInput("filter-category")}
                      onBlur={() => setFocusedInput(null)}
                    >
                      <option value="all">All Categories</option>
                      <option value="functionality">Functionality</option>
                      <option value="ui">UI/UX</option>
                      <option value="security">Security</option>
                      <option value="performance">Performance</option>
                      <option value="usability">Usability</option>
                      <option value="compatibility">Compatibility</option>
                      <option value="accessibility">Accessibility</option>
                    </select>

                    <select
                      style={styles.filterSelect}
                      onFocus={() => setFocusedInput("filter-priority")}
                      onBlur={() => setFocusedInput(null)}
                    >
                      <option value="all">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>

                    <select
                      style={styles.filterSelect}
                      onFocus={() => setFocusedInput("filter-status")}
                      onBlur={() => setFocusedInput(null)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="approved">Approved</option>
                      <option value="in-review">In Review</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  <div style={styles.requirementsList}>
                    {selectedProject.requirements.map((req) => (
                      <div
                        key={req.id}
                        style={
                          hoveredButton === `req-${req.id}`
                            ? { ...styles.requirementCard, ...styles.requirementCardHover }
                            : styles.requirementCard
                        }
                        onMouseEnter={() => setHoveredButton(`req-${req.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <div
                          style={styles.requirementHeader}
                          onClick={() => setExpandedRequirement(expandedRequirement === req.id ? null : req.id)}
                        >
                          <h4 style={styles.requirementTitle}>{req.title}</h4>
                          <div style={styles.requirementBadges}>
                            <span
                              style={{
                                ...styles.requirementBadge,
                                backgroundColor: getCategoryColor(req.category),
                                color: getCategoryTextColor(req.category),
                              }}
                            >
                              {getReadableCategory(req.category)}
                            </span>
                            <span
                              style={{
                                ...styles.requirementBadge,
                                backgroundColor: getPriorityColor(req.priority),
                                color: getPriorityTextColor(req.priority),
                              }}
                            >
                              {getReadablePriority(req.priority)}
                            </span>
                            <button
                              style={
                                hoveredButton === `req-toggle-${req.id}`
                                  ? { ...styles.actionButton, ...styles.actionButtonHover }
                                  : styles.actionButton
                              }
                              onMouseEnter={() => setHoveredButton(`req-toggle-${req.id}`)}
                              onMouseLeave={() => setHoveredButton(`req-${req.id}`)}
                            >
                              {expandedRequirement === req.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </button>
                          </div>
                        </div>
                        {expandedRequirement === req.id && (
                          <div style={styles.requirementContent}>
                            <p>{req.description}</p>
                            <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                              <span
                                style={{
                                  ...styles.requirementBadge,
                                  backgroundColor: getStatusColor(req.status),
                                  color: getStatusTextColor(req.status),
                                }}
                              >
                                Status: {getReadableStatus(req.status)}
                              </span>
                              {req.priority_auto_generated && (
                                <span
                                  style={{
                                    ...styles.requirementBadge,
                                    backgroundColor: "rgba(107, 114, 128, 0.1)",
                                    color: "#6b7280",
                                  }}
                                >
                                  Auto-generated priority
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={
                    hoveredButton === "requirements-empty"
                      ? {
                          ...styles.projectContentCard,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }
                      : styles.projectContentCard
                  }
                  onMouseEnter={() => setHoveredButton("requirements-empty")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <div style={styles.emptyState}>
                    <DocumentIcon />
                    <h3 style={styles.emptyStateTitle}>No Requirements Found</h3>
                    <p style={styles.emptyStateText}>
                      This project doesn't have any requirements yet. Requirements are used to define the functionality
                      and features of the project.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <h2 style={styles.pageTitle}>Project Management</h2>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>All Projects</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeaderCell}>Name</th>
                  <th style={styles.tableHeaderCell}>Owner</th>
                  <th style={styles.tableHeaderCell}>Created</th>
                  <th style={styles.tableHeaderCell}>Requirements</th>
                  <th style={styles.tableHeaderCell}>Collaborators</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
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
                    <td style={styles.tableCell}>{project.user}</td>
                    <td style={styles.tableCell}>{new Date(project.created_at).toLocaleDateString()}</td>
                    <td style={styles.tableCell}>{project.requirements?.length || 0}</td>
                    <td style={styles.tableCell}>{project.collaborators?.length || 0}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderDashboard = () => {
    if (!dashboardData) return null

    // Add defensive checks for dashboard data structure
    const usersStats = dashboardData.users_stats || { total: 0, by_role: {} }
    const projectsStats = dashboardData.projects_stats || { total: 0, by_user: [] }
    const recentUsers = dashboardData.recent_users || []
    const recentProjects = dashboardData.recent_projects || []

    return (
      <div>
        <h2 style={styles.pageTitle}>Admin Dashboard</h2>

        <div style={styles.statsGrid}>
          <div
            style={
              hoveredButton === "stat-total-users" ? { ...styles.statCard, ...styles.statCardHover } : styles.statCard
            }
            onMouseEnter={() => setHoveredButton("stat-total-users")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span style={styles.statValue}>{usersStats.total}</span>
            <span style={styles.statLabel}>Total Users</span>
          </div>
          <div
            style={
              hoveredButton === "stat-admin-users" ? { ...styles.statCard, ...styles.statCardHover } : styles.statCard
            }
            onMouseEnter={() => setHoveredButton("stat-admin-users")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span style={styles.statValue}>{usersStats.by_role.admin || 0}</span>
            <span style={styles.statLabel}>Admin Users</span>
          </div>
          <div
            style={
              hoveredButton === "stat-regular-users" ? { ...styles.statCard, ...styles.statCardHover } : styles.statCard
            }
            onMouseEnter={() => setHoveredButton("stat-regular-users")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span style={styles.statValue}>{usersStats.by_role.user || 0}</span>
            <span style={styles.statLabel}>Regular Users</span>
          </div>
          <div
            style={
              hoveredButton === "stat-total-projects"
                ? { ...styles.statCard, ...styles.statCardHover }
                : styles.statCard
            }
            onMouseEnter={() => setHoveredButton("stat-total-projects")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span style={styles.statValue}>{projectsStats.total}</span>
            <span style={styles.statLabel}>Total Projects</span>
          </div>
        </div>

        <div style={styles.gridLayout}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Users</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Username</th>
                    <th style={styles.tableHeaderCell}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.length > 0 ? (
                    recentUsers.map((user) => (
                      <tr
                        key={user._id}
                        style={
                          hoveredButton === `recent-user-row-${user._id}`
                            ? { ...styles.tableRow, ...styles.tableRowHover }
                            : styles.tableRow
                        }
                        onMouseEnter={() => setHoveredButton(`recent-user-row-${user._id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <td style={styles.tableCell}>{user.username}</td>
                        <td style={styles.tableCell}>
                          <span
                            style={{
                              ...styles.badge,
                              ...(user.role === "admin" ? styles.adminBadge : styles.userBadge),
                            }}
                          >
                            {user.role || "user"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                        No recent users
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Projects</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Name</th>
                    <th style={styles.tableHeaderCell}>Owner</th>
                    <th style={styles.tableHeaderCell}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.length > 0 ? (
                    recentProjects.map((project) => (
                      <tr
                        key={project._id}
                        style={
                          hoveredButton === `recent-project-row-${project.id || project._id}`
                            ? { ...styles.tableRow, ...styles.tableRowHover }
                            : styles.tableRow
                        }
                        onMouseEnter={() => setHoveredButton(`recent-project-row-${project.id || project._id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <td style={styles.tableCell}>{project.name}</td>
                        <td style={styles.tableCell}>{project.user}</td>
                        <td style={styles.tableCell}>{new Date(project.created_at).toLocaleDateString()}</td>
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
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Top Project Contributors</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeaderCell}>Username</th>
                  <th style={styles.tableHeaderCell}>Number of Projects</th>
                </tr>
              </thead>
              <tbody>
                {projectsStats.by_user && projectsStats.by_user.length > 0 ? (
                  projectsStats.by_user.map((item) => (
                    <tr
                      key={item._id}
                      style={
                        hoveredButton === `contributor-row-${item._id}`
                          ? { ...styles.tableRow, ...styles.tableRowHover }
                          : styles.tableRow
                      }
                      onMouseEnter={() => setHoveredButton(`contributor-row-${item._id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <td style={styles.tableCell}>{item._id}</td>
                      <td style={styles.tableCell}>{item.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                      No project contributors data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="role">
              Role
            </label>
            <select
              id="role"
              style={{
                ...styles.select,
                ...(focusedInput === "role" ? styles.selectFocus : {}),
              }}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              onFocus={() => setFocusedInput("role")}
              onBlur={() => setFocusedInput(null)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
            <label style={styles.label} htmlFor="edit-role">
              Role
            </label>
            <select
              id="edit-role"
              style={{
                ...styles.select,
                ...(focusedInput === "edit-role" ? styles.selectFocus : {}),
              }}
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              onFocus={() => setFocusedInput("edit-role")}
              onBlur={() => setFocusedInput(null)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

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
          <h1 style={styles.logo}>Admin Panel - AI Test Case Generator</h1>
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

export default AdminPage