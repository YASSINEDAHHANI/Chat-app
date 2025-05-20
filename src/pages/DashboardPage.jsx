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
  },
  searchInputFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "1.5rem",
  },
  projectGridSm: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  projectGridLg: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  card: {
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
  },
  inputFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
  },
  select: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "0.875rem",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    outline: "none",
    transition: "all 0.2s",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: "right 0.5rem center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "1.5em 1.5em",
    paddingRight: "2.5rem",
  },
  selectFocus: {
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
  },
  textareaFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
  },
  inputGroup: {
    display: "flex",
    gap: "0.5rem",
  },
  addButton: {
    padding: "0.625rem",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    flexShrink: 0,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  addButtonHover: {
    backgroundColor: "#2563eb",
  },
  tagGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.75rem",
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: "9999px",
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#3b82f6",
  },
  removeBtn: {
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
  removeBtnHover: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
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
  fileInput: {
    width: "100%",
    padding: "0.5rem 0",
    color: "#4b5563",
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
  progressContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
    position: "relative",
  },
  progressLine: {
    position: "absolute",
    top: "50%",
    left: "10%",
    right: "10%",
    height: "2px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    transform: "translateY(-50%)",
    zIndex: 0,
  },
  progressLineActive: {
    position: "absolute",
    top: "50%",
    left: "10%",
    height: "2px",
    backgroundColor: "#3b82f6",
    transform: "translateY(-50%)",
    zIndex: 1,
    transition: "width 0.3s ease",
  },
  progressStep: {
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#6b7280",
    position: "relative",
    zIndex: 2,
  },
  progressStepActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
    color: "white",
  },
  progressStepComplete: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
    color: "white",
  },
}

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.searchIcon}>
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
)

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ width: "1rem", height: "1rem" }}
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.cardIcon}>
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
)

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.cardIcon}>
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
)

const TranslateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.cardIcon}>
    <path
      fillRule="evenodd"
      d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
      clipRule="evenodd"
    />
  </svg>
)

const ChipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.cardIcon}>
    <path d="M13 7H7v6h6V7z" />
    <path
      fillRule="evenodd"
      d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
      clipRule="evenodd"
    />
  </svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.cardIcon}>
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.lastUpdatedIcon}>
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
)

const DotsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ width: "1rem", height: "1rem" }}
  >
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ width: "1rem", height: "1rem" }}
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

const FolderOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.emptyIcon}>
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
      clipRule="evenodd"
    />
    <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
  </svg>
)

const LoadingSpinner = () => (
  <svg style={styles.loadingSpinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      style={{ opacity: 0.75 }}
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

function Dashboard({ user }) {
  const navigate = (path) => {
    window.location.href = path
  }

  const [projects, setProjects] = useState([])
  const [newProjectName, setNewProjectName] = useState("")
  const [projectContext, setProjectContext] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [step, setStep] = useState(1)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Add isAdmin state
  const [isAdmin, setIsAdmin] = useState(false)

  // Project settings
  const [aiModel, setAiModel] = useState("Claude")
  const [apiKey, setApiKey] = useState("")
  const [projectLanguage, setProjectLanguage] = useState("french")
  const [collaborators, setCollaborators] = useState([])
  const [newCollaborator, setNewCollaborator] = useState("")

  // Media query handling
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await api.get("/check_session")
        setIsAdmin(response.data.is_admin)
      } catch (error) {
        console.error("Failed to check admin status:", error)
      }
    }

    checkAdminStatus()
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.type = "text/css"
    styleTag.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .fade-in {
        animation: fadeIn 0.3s ease-in-out;
      }
      
      .slide-up {
        animation: slideUp 0.4s ease-out;
      }
      
      /* Add custom scrollbar */
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
      
      /* Add font smoothing */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Set body background */
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

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects")
      console.log("Fetched projects:", response.data)
      setProjects(response.data.projects || [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const handleCreateProject = async () => {
    if (step < 3) {
      setStep(step + 1)
      return
    }

    try {
      // Create the project
      const projectData = {
        name: newProjectName,
        context: projectContext,
      }

      console.log("Creating project with data:", projectData)

      const response = await api.post("/projects", projectData)
      console.log("Project created successfully:", response.data)
      const newProject = response.data.project

      // If API key is provided, save it for this project
      if (apiKey) {
        try {
          await api.post("/api_keys", {
            api_key: apiKey,
            project_id: newProject.id,
          })
          console.log("API key saved successfully")
        } catch (apiKeyError) {
          console.error("Failed to save API key:", apiKeyError)
          // Continue anyway
        }
      }

      // Add collaborators if any
      if (collaborators.length > 0) {
        console.log(`Adding ${collaborators.length} collaborators to project ${newProject.id}`)

        // Process collaborators sequentially
        for (const collaboratorEmail of collaborators) {
          try {
            console.log(`Adding collaborator with email: ${collaboratorEmail}`)

            // Send the email as the username parameter since that's what the backend expects
            const collaboratorResponse = await api.post(`/projects/${newProject.id}/collaborators`, {
              username: collaboratorEmail, // Send the email as username
            })

            console.log(`Collaborator added:`, collaboratorResponse.data)
          } catch (error) {
            console.error(
              `Failed to add collaborator ${collaboratorEmail}:`,
              error.response?.data?.error || error.message,
            )
            // Continue with other collaborators even if one fails
          }
        }
      }

      // Refresh project list
      await fetchProjects()

      // Reset form fields
      setNewProjectName("")
      setProjectContext("")
      setAiModel("Claude")
      setApiKey("")
      setProjectLanguage("french")
      setCollaborators([])
      setNewCollaborator("")
      setStep(1)
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

  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        alert(`Le fichier est trop volumineux. La taille maximale est de 10MB.`)
        return
      }

      setIsUploading(true)

      try {
        const formData = new FormData()
        formData.append("file", file)

        const response = await api.post("/extract_text", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        setProjectContext(response.data.text)
      } catch (error) {
        console.error("Error uploading file:", error)
        const errorMessage = error.response?.data?.error || "Échec de l'extraction du texte. Veuillez réessayer."
        alert(errorMessage)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const addCollaborator = () => {
    if (newCollaborator && !collaborators.includes(newCollaborator)) {
      // Simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailPattern.test(newCollaborator)) {
        setCollaborators([...collaborators, newCollaborator])
        setNewCollaborator("")
      } else {
        alert("Please enter a valid email address")
      }
    } else if (collaborators.includes(newCollaborator)) {
      alert("This email has already been added")
    }
  }

  const removeCollaborator = (email) => {
    setCollaborators(collaborators.filter((c) => c !== email))
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

  // Progress indicator for multi-step form
  const renderProgressIndicator = () => {
    const progressWidth = ((step - 1) / 2) * 100 + "%"

    return (
      <div style={styles.progressContainer}>
        <div style={styles.progressLine}></div>
        <div style={{ ...styles.progressLineActive, width: progressWidth }}></div>

        <div
          style={{
            ...styles.progressStep,
            ...(step >= 1 ? styles.progressStepActive : {}),
          }}
        >
          {step > 1 ? <CheckIcon /> : 1}
        </div>

        <div
          style={{
            ...styles.progressStep,
            ...(step >= 2 ? styles.progressStepActive : {}),
          }}
        >
          {step > 2 ? <CheckIcon /> : 2}
        </div>

        <div
          style={{
            ...styles.progressStep,
            ...(step >= 3 ? styles.progressStepActive : {}),
          }}
        >
          3
        </div>
      </div>
    )
  }

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
              style={{
                ...styles.input,
                ...(focusedInput === "projectName" ? styles.inputFocus : {}),
              }}
              placeholder="Entrez le nom du projet"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onFocus={() => setFocusedInput("projectName")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
        )
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
                style={{
                  ...styles.input,
                  ...(focusedInput === "apiKey" ? styles.inputFocus : {}),
                }}
                placeholder="Entrez votre clé API Claude pour ce projet"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onFocus={() => setFocusedInput("apiKey")}
                onBlur={() => setFocusedInput(null)}
              />
              <p style={styles.helperText}>
                Si vous ne fournissez pas de clé API, le système utilisera la clé par défaut. La clé API sera utilisée
                uniquement pour ce projet.
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="project-language">
                Langue du projet
              </label>
              <select
                id="project-language"
                style={{
                  ...styles.select,
                  ...(focusedInput === "language" ? styles.selectFocus : {}),
                }}
                value={projectLanguage}
                onChange={(e) => setProjectLanguage(e.target.value)}
                onFocus={() => setFocusedInput("language")}
                onBlur={() => setFocusedInput(null)}
              >
                <option value="french">Français</option>
                <option value="english">Anglais</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Collaborateurs</label>
              <div style={styles.inputGroup}>
                <input
                  style={{
                    ...styles.input,
                    ...(focusedInput === "collaborator" ? styles.inputFocus : {}),
                  }}
                  placeholder="Email du collaborateur"
                  value={newCollaborator}
                  onChange={(e) => setNewCollaborator(e.target.value)}
                  onFocus={() => setFocusedInput("collaborator")}
                  onBlur={() => setFocusedInput(null)}
                />
                <button
                  type="button"
                  onClick={addCollaborator}
                  style={{
                    ...styles.addButton,
                    ...(hoveredButton === "addCollaborator" ? styles.addButtonHover : {}),
                  }}
                  onMouseEnter={() => setHoveredButton("addCollaborator")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <PlusIcon />
                </button>
              </div>
              {collaborators.length > 0 && (
                <div style={styles.tagGroup}>
                  {collaborators.map((email, index) => (
                    <span key={index} style={styles.tag}>
                      {email}
                      <button
                        type="button"
                        style={{
                          ...styles.removeBtn,
                          ...(hoveredButton === `remove-${email}` ? styles.removeBtnHover : {}),
                        }}
                        onClick={() => removeCollaborator(email)}
                        onMouseEnter={() => setHoveredButton(`remove-${email}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
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
                style={{
                  ...styles.textarea,
                  ...(focusedInput === "context" ? styles.textareaFocus : {}),
                }}
                placeholder="Décrivez les exigences fonctionnelles de votre projet..."
                value={projectContext}
                onChange={(e) => setProjectContext(e.target.value)}
                onFocus={() => setFocusedInput("context")}
                onBlur={() => setFocusedInput(null)}
              ></textarea>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Ou téléchargez un fichier</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="file"
                    accept=".pdf,.txt,.docx"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    style={styles.fileInput}
                  />
                  {isUploading && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <LoadingSpinner />
                      <span style={styles.loadingText}>Extraction du texte en cours...</span>
                    </div>
                  )}
                </div>
                <p style={styles.helperText}>Formats supportés: PDF, TXT, DOCX (max 10MB)</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Determine the grid style based on window width
  const getGridStyle = () => {
    const baseStyle = { ...styles.projectGrid }
    if (windowWidth >= 1024) {
      return { ...baseStyle, ...styles.projectGridLg }
    } else if (windowWidth >= 640) {
      return { ...baseStyle, ...styles.projectGridSm }
    }
    return baseStyle
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
          <img
            src={logoImage || "/placeholder.svg"}
            alt="TestGen Logo"
            style={{
              height: "40px",
            }}
          />
          <div style={styles.navLinks}>
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
        <div style={styles.titleRow}>
          <h2 style={styles.pageTitle}>Projects</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            style={{
              ...styles.newProjectButton,
              ...(hoveredButton === "newProject" ? styles.newProjectButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton("newProject")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <PlusIcon />
            New Project
          </button>
        </div>

        <div style={styles.searchRow}>
          <div style={styles.searchContainer}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                ...styles.searchInput,
                ...(focusedInput === "search" ? styles.searchInputFocus : {}),
              }}
              onFocus={() => setFocusedInput("search")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
        </div>

        {/* New Project Dialog */}
        {isDialogOpen && (
          <div style={styles.modal} className="fade-in">
            <div style={styles.modalOverlay} onClick={() => setIsDialogOpen(false)}></div>
            <div style={styles.modalContent} className="slide-up">
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>
                  {step === 1 && "Create New Project"}
                  {step === 2 && "Project Configuration"}
                  {step === 3 && "Functional Context"}
                </h3>
                <p style={styles.modalDesc}>
                  {step === 1 && "Give your project a name to get started."}
                  {step === 2 && "Configure your project settings."}
                  {step === 3 && "Provide functional context to help generate better test cases."}
                </p>
              </div>

              {renderProgressIndicator()}
              {renderStepContent()}

              <div style={styles.modalFooter}>
                {step > 1 ? (
                  <button
                    type="button"
                    style={{
                      ...styles.outlineButton,
                      ...(hoveredButton === "back" ? styles.outlineButtonHover : {}),
                    }}
                    onClick={() => setStep(step - 1)}
                    onMouseEnter={() => setHoveredButton("back")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Back
                  </button>
                ) : (
                  <div></div> // Empty div for spacing when back button is not shown
                )}
                <div style={styles.modalFooterButtons}>
                  <button
                    type="button"
                    style={{
                      ...styles.outlineButton,
                      ...(hoveredButton === "cancel" ? styles.outlineButtonHover : {}),
                    }}
                    onClick={() => {
                      setIsDialogOpen(false)
                      setStep(1)
                    }}
                    onMouseEnter={() => setHoveredButton("cancel")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{
                      ...styles.primaryButton,
                      ...(hoveredButton === "next" ? styles.primaryButtonHover : {}),
                    }}
                    onClick={handleCreateProject}
                    onMouseEnter={() => setHoveredButton("next")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {step < 3 ? "Next" : "Create Project"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={getGridStyle()}>
          {filteredProjects.length === 0 ? (
            <div style={styles.emptyState}>
              <FolderOpenIcon />
              <h3 style={styles.emptyTitle}>No projects found</h3>
              <p style={styles.emptyText}>
                {searchQuery ? "Try a different search term." : "Start by creating a new project."}
              </p>
              {!searchQuery && (
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(true)}
                  style={{
                    ...styles.newProjectButton,
                    ...(hoveredButton === "emptyCreate" ? styles.newProjectButtonHover : {}),
                  }}
                  onMouseEnter={() => setHoveredButton("emptyCreate")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <PlusIcon />
                  New Project
                </button>
              )}
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  ...styles.card,
                  ...(hoveredCard === project.id ? styles.cardHover : {}),
                }}
                onClick={() => navigate(`/project/${project.id}`)}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{project.name}</h3>
                  <button
                    style={{
                      ...styles.cardMenuButton,
                      ...(hoveredButton === `menu-${project.id}` ? styles.cardMenuButtonHover : {}),
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Menu functionality would go here
                    }}
                    onMouseEnter={() => setHoveredButton(`menu-${project.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <DotsIcon />
                  </button>
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.cardRow}>
                    <div style={styles.cardItem}>
                      <CalendarIcon />
                      {new Date(project.created_at).toISOString().split("T")[0]}
                    </div>
                    <div style={styles.cardItem}>
                      <DocumentIcon />
                      {project.test_count || 0} tests
                    </div>
                  </div>
                  <div style={styles.cardRow}>
                    <div style={styles.cardItem}>
                      <TranslateIcon />
                      {project.language === "french" ? "French" : "English"}
                    </div>
                    <div style={styles.cardItem}>
                      <ChipIcon />
                      {project.ai_model || "Claude"}
                    </div>
                  </div>
                  <div style={styles.cardRow}>
                    <div style={styles.cardItem}>
                      <UsersIcon />
                      {project.collaborators?.length || 0} collaborators
                    </div>
                  </div>
                </div>
                <div style={styles.cardFooter}>
                  <div style={styles.statusBadge}>Active</div>
                  <div style={styles.lastUpdated}>
                    <ClockIcon />
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

export default Dashboard
