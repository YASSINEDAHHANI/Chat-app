import { useState, useEffect } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import api from "../api"

const requirementCategories = [
  { value: "functionality", label: "Fonctionnalité" },
  { value: "ui", label: "Interface utilisateur" },
  { value: "security", label: "Sécurité" },
  { value: "performance", label: "Performance" },
  { value: "usability", label: "Utilisabilité" },
  { value: "compatibility", label: "Compatibilité" },
  { value: "accessibility", label: "Accessibilité" },
]
const getCategoryLabel = (value) => {
  const category = requirementCategories.find(cat => cat.value === value);
  return category ? category.label : value;
}
const styles = {
  // Layout
  container: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: "#f9fafb",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "white",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
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
  mainContent: {
    display: "flex",
    flex: "1",
  },
  sidebar: {
    width: "18rem",
    borderRight: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    display: "none",
    transition: "all 0.3s",
    overflowY: "auto",
  },
  sidebarMd: {
    display: "block",
  },
  sidebarContent: {
    padding: "1.5rem",
  },
  sidebarTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "1.25rem",
    display: "flex",
    alignItems: "center",
    color: "#111827",
  },
  sidebarIcon: {
    marginRight: "0.5rem",
    height: "1.25rem",
    width: "1.25rem",
    color: "#6b7280",
  },
  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "auto",
    maxHeight: "calc(100vh - 8rem)",
  },
  emptyHistory: {
    textAlign: "center",
    padding: "2rem 0",
  },
  emptyHistoryIcon: {
    margin: "0 auto",
    height: "2.5rem",
    width: "2.5rem",
    color: "#9ca3af",
    marginBottom: "0.75rem",
  },
  historyItem: {
    backgroundColor: "white",
    overflow: "hidden",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  historyItemHover: {
    backgroundColor: "#f9fafb",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  historyItemActive: {
    borderLeft: "3px solid #4f46e5",
  },
  historyItemContent: {
    padding: "1rem",
  },
  historyItemTitle: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#111827",
    marginBottom: "0.25rem",
  },
  historyItemMeta: {
    fontSize: "0.75rem",
    color: "#6b7280",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  historyButton: {
    marginTop: "0.5rem",
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#374151",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  historyButtonHover: {
    backgroundColor: "#f9fafb",
    borderColor: "#9ca3af",
  },
  main: {
    flex: "1",
    overflowY: "auto",
  },
  mainContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
  },
  requirementForm: {
    marginBottom: "2rem",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  formTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "1.25rem",
    color: "#111827",
  },
  formGroup: {
    marginBottom: "1.25rem",
  },
  formLabel: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  inputFocus: {
    outline: "none",
    borderColor: "#6366f1",
    boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.2)",
  },
  select: {
    width: "100%",
    padding: "0.625rem 2.5rem 0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    fontSize: "0.875rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    backgroundImage:
      'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 strokeLinecap=%27round%27 strokeLinejoin=%27round%27 strokeWidth=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1.5em 1.5em",
    appearance: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  selectFocus: {
    outline: "none",
    borderColor: "#6366f1",
    boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.2)",
  },
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
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  primaryButton: {
    backgroundColor: "#4f46e5",
    color: "white",
  },
  primaryButtonHover: {
    backgroundColor: "#4338ca",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  disabledButton: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
  requirementAlert: {
    marginBottom: "2rem",
    backgroundColor: "#eff6ff",
    borderLeftWidth: "4px",
    borderLeftColor: "#3b82f6",
    padding: "1.25rem",
    borderRadius: "0.375rem",
  },
  alertContent: {
    display: "flex",
  },
  alertIcon: {
    flexShrink: "0",
    height: "1.25rem",
    width: "1.25rem",
    color: "#3b82f6",
  },
  alertBody: {
    marginLeft: "0.75rem",
  },
  alertTitle: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#1e40af",
  },
  alertText: {
    marginTop: "0.5rem",
    fontSize: "0.875rem",
    color: "#1e3a8a",
  },
  badge: {
    marginTop: "0.25rem",
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
    backgroundColor: "#dbeafe",
    color: "#1e3a8a",
  },
  formSection: {
    marginBottom: "1.5rem",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  radioOption: {
    display: "flex",
    alignItems: "center",
  },
  radio: {
    height: "1rem",
    width: "1rem",
    color: "#4f46e5",
    borderColor: "#d1d5db",
    accentColor: "#4f46e5",
  },
  radioLabel: {
    marginLeft: "0.75rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
  },
  textarea: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    resize: "vertical",
    minHeight: "6rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  textareaFocus: {
    outline: "none",
    borderColor: "#6366f1",
    boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.2)",
  },
  divider: {
    borderTop: "1px solid #e5e7eb",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  resultsTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#111827",
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  outlineButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.625rem 1rem",
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    fontWeight: "500",
    lineHeight: "1.25rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  outlineButtonHover: {
    backgroundColor: "#f9fafb",
    borderColor: "#9ca3af",
  },
  actionIcon: {
    marginRight: "0.5rem",
    height: "1rem",
    width: "1rem",
  },
  resultsPreview: {
    backgroundColor: "white",
    padding: "1.25rem",
    borderRadius: "0.5rem",
    overflow: "auto",
    height: "28rem",
    whiteSpace: "pre-wrap",
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "0.875rem",
    border: "1px solid #e5e7eb",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
    lineHeight: "1.5",
  },
  resultsEditor: {
    width: "100%",
    height: "28rem",
    padding: "1.25rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "0.875rem",
    lineHeight: "1.5",
    resize: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  resultsEditorFocus: {
    outline: "none",
    borderColor: "#6366f1",
    boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.2)",
  },
  chatButton: {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    borderRadius: "9999px",
    width: "3.5rem",
    height: "3.5rem",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4f46e5",
    color: "white",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    zIndex: "40",
  },
  chatButtonHover: {
    backgroundColor: "#4338ca",
    transform: "translateY(-1px)",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  chatIcon: {
    height: "1.5rem",
    width: "1.5rem",
  },
  chatModal: {
    position: "fixed",
    bottom: "5.5rem",
    right: "1.5rem",
    width: "20rem",
    height: "28rem",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    zIndex: "30",
  },
  chatModalMd: {
    width: "24rem",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  chatTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#111827",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    padding: "0.25rem",
    borderRadius: "0.375rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  closeButtonHover: {
    color: "#6b7280",
    backgroundColor: "#f3f4f6",
  },
  closeIcon: {
    height: "1.25rem",
    width: "1.25rem",
  },
  chatMessages: {
    flex: "1",
    overflowY: "auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  emptyChatState: {
    textAlign: "center",
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  emptyChatIcon: {
    height: "3.5rem",
    width: "3.5rem",
    color: "#9ca3af",
    marginBottom: "1rem",
  },
  emptyChatText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    maxWidth: "80%",
    lineHeight: "1.5",
  },
  messageContainer: {
    display: "flex",
  },
  messageContainerUser: {
    justifyContent: "flex-end",
  },
  messageContainerAssistant: {
    justifyContent: "flex-start",
  },
  message: {
    maxWidth: "80%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  userMessage: {
    backgroundColor: "#e0e7ff",
    color: "#1e1b4b",
    borderBottomRightRadius: "0.25rem",
  },
  assistantMessage: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
    borderBottomLeftRadius: "0.25rem",
  },
  chatForm: {
    display: "flex",
    padding: "1rem",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  chatInput: {
    flex: "1",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem 0 0 0.375rem",
    border: "1px solid #d1d5db",
    borderRight: "none",
    fontSize: "0.875rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  chatInputFocus: {
    outline: "none",
    borderColor: "#6366f1",
    boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.2)",
  },
  chatSubmitButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.625rem 1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "0 0.375rem 0.375rem 0",
    border: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  chatSubmitButtonHover: {
    backgroundColor: "#4338ca",
  },
  submitIcon: {
    height: "1rem",
    width: "1rem",
  },
  directModeToggle: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  directModeActive: {
    color: "#10B981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
  },
  directModeInactive: {
    color: "#9CA3AF",
    backgroundColor: "transparent",
  },
  directModeIndicator: {
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "50%",
    marginRight: "0.25rem",
    transition: "all 0.2s",
  },
  directModeIndicatorActive: {
    backgroundColor: "#10B981",
  },
  directModeIndicatorInactive: {
    backgroundColor: "transparent",
    border: "1px solid #9CA3AF",
  },
  // Special states
  hidden: {
    display: "none",
  },
  loadingIcon: {
    animation: "spin 1s linear infinite",
    marginRight: "0.75rem",
    height: "1.25rem",
    width: "1.25rem",
  },
  typingIndicator: {
    display: "flex",
    gap: "0.25rem",
    justifyContent: "flex-end",
    marginTop: "0.5rem",
  },
  typingDot: {
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
    backgroundColor: "#6b7280",
  },
  backButton: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
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
    backgroundColor: "#f3f4f6",
    color: "#111827",
  },
  backIcon: {
    height: "1rem",
    width: "1rem",
    marginRight: "0.5rem",
  },
  pageTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
  },
  navLink: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  navLinkHover: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
  },
}
function Generate() {
  const { id: projectId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const requirementId = searchParams.get("requirement")

  // State variables
  const [requirements, setRequirements] = useState([])
  const [selectedRequirement, setSelectedRequirement] = useState(null)
  const [newRequirementTitle, setNewRequirementTitle] = useState("")
  const [newRequirementCategory, setNewRequirementCategory] = useState("functionality")
  const [requirementsDescription, setRequirementsDescription] = useState("")
  const [outputFormat, setOutputFormat] = useState("default")
  const [customFormat, setCustomFormat] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTests, setGeneratedTests] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedTests, setEditedTests] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [historyItems, setHistoryItems] = useState([])
  const [showRequirementForm, setShowRequirementForm] = useState(true)
  const [chatMessages, setChatMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [directChatMode, setDirectChatMode] = useState(true)
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)

  // Media query handling
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fetch requirements when component mounts
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/requirements`)
        setRequirements(response.data.requirements || [])

        // If a requirement ID was provided in the URL, select that requirement
        if (requirementId) {
          const requirement = response.data.requirements.find((r) => r.id === requirementId)
          if (requirement) {
            setSelectedRequirement(requirement)
            setShowRequirementForm(false)
            setRequirementsDescription(requirement.description)
          }
        }
      } catch (error) {
        console.error("Error fetching requirements:", error)
        alert("Failed to load requirements. Please try again.")
      }
    }

    fetchRequirements()
  }, [projectId, requirementId])

  // Add animation keyframes for the spinner and typing indicator
  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.type = "text/css"
    styleTag.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      if (document.head.contains(styleTag)) {
        document.head.removeChild(styleTag)
      }
    }
  }, [])

  const handleCreateRequirement = () => {
    if (!newRequirementTitle.trim()) return

    const newRequirement = {
      id: `temp-${Date.now()}`, // Temporary ID until saved to backend
      title: newRequirementTitle,
      description: requirementsDescription,
      priority: "medium",
      status: "draft",
      category: newRequirementCategory,
    }

    setSelectedRequirement(newRequirement)
    setShowRequirementForm(false)
  }

  const handleGenerate = async () => {
    if (!selectedRequirement && !newRequirementTitle) return

    setIsGenerating(true)
    setGeneratedTests("") // Clear previous tests

    const data = {
      requirements: requirementsDescription,
      format_type: outputFormat,
      example_case: outputFormat === "custom" ? customFormat : "",
      project_id: projectId,
    }

    // Add requirement information
    if (selectedRequirement) {
      data.requirement_id = selectedRequirement.id
      data.requirement_title = selectedRequirement.title
    } else if (newRequirementTitle) {
      data.requirement_title = newRequirementTitle
    }

    try {
      console.log("Sending test generation request with data:", data)

      // Use axios consistently with the rest of the app
      const response = await api.post("/generate_test_cases", data)

      const testCases = response.data.test_cases || ""
      setGeneratedTests(testCases)
      setEditedTests(testCases)

      // Refresh history
      fetchHistory()
    } catch (error) {
      console.error("Error generating test cases:", error)
      const errorMessage = error.response?.data?.error || error.message || "Unknown error"
      alert(`Error generating test cases: ${errorMessage}`)
    } finally {
      setIsGenerating(false)
    }
  }

  // Modify fetchHistory to preserve active item
  const fetchHistory = async () => {
    try {
      const params = new URLSearchParams()
      params.append("project_id", projectId)

      const reqId = selectedRequirement?.id || requirementId
      if (reqId) params.append("requirement_id", reqId)

      const response = await api.get(`/history?${params.toString()}`)

      const formattedHistory = response.data.history
        .filter((item) => item.test_cases)
        .map((item) => ({
          ...item,
          id: item._id,
          isActive: item._id === activeHistoryId, // Preserve active state
        }))

      setHistoryItems(formattedHistory)
    } catch (error) {
      console.error("Error fetching history:", error)
      setHistoryItems([])
    }
  }
  
  const fetchAndUpdateHistory = async (updatedTests = null, newActiveHistoryId = null) => {
    try {
      const params = new URLSearchParams();
      params.append("project_id", projectId);

      const reqId = selectedRequirement?.id || requirementId;
      if (reqId) params.append("requirement_id", reqId);

      const response = await api.get(`/history?${params.toString()}`);

      // Process history items with active state preserved
      const formattedHistory = response.data.history
        .filter((item) => item.test_cases)
        .map((item) => {
          const isActive = newActiveHistoryId 
            ? item._id === newActiveHistoryId 
            : activeHistoryId === item._id;
          
          // Override testCases if this is the active item and we have updated tests
          const testCases = (isActive && updatedTests) ? updatedTests : item.test_cases;
          
          return {
            id: item._id,
            requirementId: item.requirement_id || "",
            requirementTitle: item.requirement_title || "Unnamed Requirement",
            version: item.version_number || 1,
            testCases: testCases,
            date: new Date(item.timestamp).toLocaleString(),
            updateSource: item.update_type === "ai_assistant" 
              ? "AI Assistant" 
              : item.update_type === "manual_edit" 
                ? "Manual Edit" 
                : "Generated",
            isActive: isActive,
          };
        });

      // Apply our updated history to state
      setHistoryItems(formattedHistory);
      
      // If we got a new active history ID, update that state
      if (newActiveHistoryId) {
        setActiveHistoryId(newActiveHistoryId);
      }
      
      console.log("History refreshed successfully", {
        itemCount: formattedHistory.length,
        activeId: newActiveHistoryId || activeHistoryId
      });
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };
  
  // Also add this useEffect to fetch history items when component mounts
  useEffect(() => {
    // Fetch history for this specific requirement when component mounts or when selected requirement changes
    const fetchHistory = async () => {
      try {
        if (!projectId || (!selectedRequirement && !requirementId)) {
          // If no requirement is selected, clear history
          setHistoryItems([])
          return
        }

        const params = new URLSearchParams()
        params.append("project_id", projectId)

        // Only fetch history for the specific requirement
        const reqId = selectedRequirement?.id || requirementId
        if (reqId) {
          params.append("requirement_id", reqId)
        }

        const response = await api.get(`/history?${params.toString()}`)

        if (response.data.history && response.data.history.length > 0) {
          const formattedHistory = response.data.history
            .filter((item) => item.test_cases) // Only include items with test cases
            .map((item, index) => ({
              id: item._id || index + 1,
              requirementId: item.requirement_id || "",
              requirementTitle: item.requirement_title || "Unnamed Requirement",
              version: response.data.history.length - index, // Reverse index for version number
              testCases: item.test_cases,
              date: new Date(item.timestamp).toLocaleString(),
              updateSource:
                item.update_type === "ai_assistant"
                  ? "AI Assistant"
                  : item.update_type === "manual_edit"
                    ? "Manual Edit"
                    : "Generated",
              versionNumber: item.version_number,
            }))

          setHistoryItems(formattedHistory)
        } else {
          setHistoryItems([])
        }
      } catch (error) {
        console.error("Error fetching history:", error)
        setHistoryItems([])
      }
    }

    fetchHistory()
  }, [projectId, selectedRequirement, requirementId])

  // Call this function from a button click or useEffect
  const handleDownload = (format) => {
    // In a real app, this would trigger a download
    alert(`Téléchargement des cas de test au format ${format.toUpperCase()}`)
  }

  const saveEditedTestCases = async () => {
    try {
      // Get the current active history item
      const activeHistoryItem = historyItems.find((item) => item.isActive);

      const requestData = {
        test_cases: editedTests,
        requirements: requirementsDescription,
        project_id: projectId,
        requirement_id: selectedRequirement?.id || null,
        requirement_title: selectedRequirement?.title || newRequirementTitle,
        update_type: "manual_edit",
      };

      let newHistoryId = null;

      // If we have an active history item, update that item instead of creating a new one
      if (activeHistoryItem && activeHistoryItem.id) {
        requestData.history_id = activeHistoryItem.id;

        await api.put(`/update_test_cases/${activeHistoryItem.id}`, requestData);
        console.log("Updated existing test case history item:", activeHistoryItem.id);
        newHistoryId = activeHistoryItem.id;
      } else {
        // Otherwise create a new history entry
        const response = await api.post("/save_test_cases", requestData);
        console.log("Created new test case history item");
        // If your backend returns the ID of the newly created history item, capture it here
        if (response.data && response.data._id) {
          newHistoryId = response.data._id;
        }
      }

      // Update current displayed tests
      setGeneratedTests(editedTests);
      setIsEditing(false);

      // Refresh history with our updated tests and active history ID
      await fetchAndUpdateHistory(editedTests, newHistoryId || activeHistoryId);
    } catch (error) {
      console.error("Error saving test case edits:", error);
      alert("Failed to save your changes. Please try again.");
    }
  };

  const handleSaveEdits = () => {
    saveEditedTestCases();
  };

  const loadHistoryVersion = (historyItem) => {
    setGeneratedTests(historyItem.testCases);
    setEditedTests(historyItem.testCases);
    setIsEditing(false);
    
    // Update active history ID
    setActiveHistoryId(historyItem.id);

    const updatedHistoryItems = historyItems.map((item) => ({
      ...item,
      isActive: item.id === historyItem.id,
    }));
    setHistoryItems(updatedHistoryItems);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    if (!currentMessage.trim()) return;

    console.log("Starting chat request with message:", currentMessage);
    
    // Add user message to chat immediately
    const userMessage = { role: "user", content: currentMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");

    // Add a temporary "Thinking..." message
    const tempId = Date.now().toString();
    setChatMessages(prev => [...prev, { 
      id: tempId, 
      role: "assistant", 
      content: "Thinking...", 
      isPartial: true 
    }]);

    try {
      // Prepare request data
      const requestData = {
        message: userMessage.content,
        project_id: projectId,
        test_cases: generatedTests || "",
        requirement_id: selectedRequirement?.id || null,
        requirement_title: selectedRequirement?.title || newRequirementTitle,
        requirements: requirementsDescription,
        chat_history: chatMessages.filter(msg => !msg.isPartial),
        direct_mode: directChatMode,
        active_history_id: activeHistoryId,
      };

      console.log("Sending chat request with data:", {
        message: requestData.message,
        projectId: requestData.project_id,
        directMode: requestData.direct_mode
      });

      // Use the fetch API instead of axios for better streaming support
      const response = await fetch("/chat_with_assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Process the text stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let responseText = "";
      let updatedTestsFound = false;

      // Remove the temporary thinking message
      setChatMessages(prev => prev.filter(msg => msg.id !== tempId));

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          // Process any remaining data in the buffer
          if (buffer.trim() && !updatedTestsFound) {
            console.log("Stream complete, processing final buffer:", buffer);
            // If there's leftover content but no test update was found, show it
            setChatMessages(prev => [...prev, { 
              role: "assistant", 
              content: responseText || buffer
            }]);
          }
          break;
        }

        // Decode this chunk and add to our buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Process complete SSE messages (delimited by double newlines)
        let lines = buffer.split("\n\n");
        
        // Keep the last potentially incomplete chunk in the buffer
        buffer = lines.pop() || "";
        
        for (const line of lines) {
          if (!line.trim()) continue;
          
          if (line.startsWith("data: ")) {
            const data = line.replace("data: ", "");
            
            if (data === "[DONE]") {
              console.log("Received DONE marker");
              continue;
            }
            
            try {
              const parsed = JSON.parse(data);
              
              // Handle updated test cases
              if (parsed.updated_test_cases) {
                updatedTestsFound = true;
                const updatedTests = parsed.updated_test_cases;
                
                console.log("Received updated test cases");
                
                setGeneratedTests(updatedTests);
                setEditedTests(updatedTests);
                
                if (isEditing) setIsEditing(false);
                
                setChatMessages(prev => [...prev, { 
                  role: "assistant", 
                  content: parsed.confirmation || "✅ Modifications appliquées avec succès." 
                }]);
                
                fetchAndUpdateHistory(updatedTests, activeHistoryId);
              }
              else if (parsed.chunk) {
                responseText += parsed.chunk;
                
                setChatMessages(prev => {
                  const assistantMsg = prev.find(msg => 
                    msg.role === "assistant" && msg.isPartial
                  );
                  
                  if (assistantMsg) {
                    return prev.map(msg => 
                      (msg.role === "assistant" && msg.isPartial) 
                        ? { ...msg, content: responseText } 
                        : msg
                    );
                  } else {
                    return [...prev, { 
                      role: "assistant", 
                      content: responseText, 
                      isPartial: true 
                    }];
                  }
                });
              }
              else if (parsed.error) {
                console.error("Server error:", parsed.error);
                setChatMessages(prev => [...prev, { 
                  role: "assistant", 
                  content: `Error: ${parsed.error}` 
                }]);
              }
            } catch (error) {
              console.warn("Error parsing SSE message:", error, "Raw data:", data);
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      setChatMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== tempId);
        
        return [...filtered, {
          role: "assistant",
          content: `Erreur de communication avec le serveur. ${error.message || ""}`
        }];
      });
    }
  };

  const getSidebarStyle = () => {
    if (windowWidth >= 768) {
      return { ...styles.sidebar, ...styles.sidebarMd }
    }
    return styles.sidebar
  }

  const getChatModalStyle = () => {
    if (windowWidth >= 768) {
      return { ...styles.chatModal, ...styles.chatModalMd }
    }
    return styles.chatModal
  }

  const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.backIcon} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  const LoadingSpinner = () => (
    <svg style={styles.loadingIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        style={{ opacity: 0.75 }}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
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
              onClick={() => navigate(`/project/${projectId}/requirements`)}
              onMouseEnter={() => setHoveredItem("back-btn")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ArrowLeftIcon />
              Retour aux exigences
            </button>
            <h1 style={styles.pageTitle}>Génération de cas de test</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              style={hoveredItem === "dashboard-btn" ? { ...styles.navLink, ...styles.navLinkHover } : styles.navLink}
              onClick={() => navigate("/dashboard")}
              onMouseEnter={() => setHoveredItem("dashboard-btn")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Tableau de bord
            </button>
            <button
              style={hoveredItem === "logout-btn" ? { ...styles.navLink, ...styles.navLinkHover } : styles.navLink}
              onClick={async () => {
                try {
                    await api.post("/logout")
                  navigate("/signin")
                } catch (error) {
                  console.error("Logout failed:", error)
                }
              }}
              onMouseEnter={() => setHoveredItem("logout-btn")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        {/* Sidebar */}
        <aside style={getSidebarStyle()}>
          <div style={styles.sidebarContent}>
            <h2 style={styles.sidebarTitle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={styles.sidebarIcon}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Historique
            </h2>
            <div style={styles.historyList}>
              {historyItems.length === 0 ? (
                <div style={styles.emptyHistory}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={styles.emptyHistoryIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Aucun historique disponible</p>
                </div>
              ) : (
                historyItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      ...styles.historyItem,
                      ...(hoveredItem === `history-${item.id}` ? styles.historyItemHover : {}),
                      ...(item.isActive ? { borderLeft: "3px solid #4f46e5" } : {}),
                    }}
                    onClick={() => loadHistoryVersion(item)}
                    onMouseEnter={() => setHoveredItem(`history-${item.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div style={styles.historyItemContent}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={styles.historyItemTitle}>{item.requirementTitle}</div>
                        {item.updateSource && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "0.75rem",
                              color: "#6b7280",
                            }}
                          >
                            {item.updateSource === "AI Assistant" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ height: "1rem", width: "1rem", marginRight: "0.25rem" }}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : item.updateSource === "Manual Edit" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ height: "1rem", width: "1rem", marginRight: "0.25rem" }}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ height: "1rem", width: "1rem", marginRight: "0.25rem" }}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            {item.updateSource}
                          </div>
                        )}
                      </div>
                      <div style={styles.historyItemMeta}>
                        Version {item.version || item.versionNumber} • {item.date}
                      </div>
                      <button
                        style={
                          hoveredItem === `history-${item.id}`
                            ? { ...styles.historyButton, ...styles.historyButtonHover }
                            : styles.historyButton
                        }
                      >
                        Charger cette version
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={styles.main}>
          <div style={styles.mainContainer}>
            {showRequirementForm ? (
              <div style={styles.requirementForm}>
                <h2 style={styles.formTitle}>Nouvelle exigence</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel} htmlFor="requirement-title">
                      Titre de l'exigence
                    </label>
                    <input
                      id="requirement-title"
                      type="text"
                      style={{
                        ...styles.input,
                        ...(focusedInput === "title" ? styles.inputFocus : {}),
                      }}
                      placeholder="Entrez le titre de l'exigence"
                      value={newRequirementTitle}
                      onChange={(e) => setNewRequirementTitle(e.target.value)}
                      onFocus={() => setFocusedInput("title")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel} htmlFor="requirement-category">
                      Catégorie
                    </label>
                    <select
                      id="requirement-category"
                      style={{
                        ...styles.select,
                        ...(focusedInput === "category" ? styles.selectFocus : {}),
                      }}
                      value={newRequirementCategory}
                      onChange={(e) => setNewRequirementCategory(e.target.value)}
                      onFocus={() => setFocusedInput("category")}
                      onBlur={() => setFocusedInput(null)}
                    >
                      {requirementCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleCreateRequirement}
                    disabled={!newRequirementTitle.trim()}
                    style={
                      !newRequirementTitle.trim()
                        ? { ...styles.button, ...styles.primaryButton, ...styles.disabledButton }
                        : hoveredItem === "continue-btn"
                          ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                          : { ...styles.button, ...styles.primaryButton }
                    }
                    onMouseEnter={() => setHoveredItem("continue-btn")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: "2rem" }}>
                <div style={styles.requirementAlert}>
                  <div style={styles.alertContent}>
                    <div style={{ flexShrink: 0 }}>
                      <svg
                        style={styles.alertIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div style={styles.alertBody}>
                      <h3 style={styles.alertTitle}>Exigence sélectionnée</h3>
                      <div style={styles.alertText}>
                        <div style={{ fontWeight: "500" }}>{selectedRequirement?.title || newRequirementTitle}</div>
                        {selectedRequirement?.category && (
                          <span style={styles.badge}>{getCategoryLabel(selectedRequirement.category)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={styles.formSection}>
                <label style={styles.formLabel} htmlFor="requirements">
                  Description détaillée
                </label>
                <textarea
                  id="requirements"
                  rows={8}
                  style={{
                    ...styles.textarea,
                    ...(focusedInput === "description" ? styles.textareaFocus : {}),
                  }}
                  placeholder="Décrivez en détail l'exigence ou la user story..."
                  value={requirementsDescription}
                  onChange={(e) => setRequirementsDescription(e.target.value)}
                  onFocus={() => setFocusedInput("description")}
                  onBlur={() => setFocusedInput(null)}
                ></textarea>
              </div>

              <div style={styles.formSection}>
                <label style={styles.formLabel}>Format de sortie</label>
                <div style={styles.radioGroup}>
                  <div style={styles.radioOption}>
                    <input
                      id="default"
                      name="output-format"
                      type="radio"
                      checked={outputFormat === "default"}
                      onChange={() => setOutputFormat("default")}
                      style={styles.radio}
                    />
                    <label htmlFor="default" style={styles.radioLabel}>
                      Par défaut
                    </label>
                  </div>
                  <div style={styles.radioOption}>
                    <input
                      id="gherkin"
                      name="output-format"
                      type="radio"
                      checked={outputFormat === "gherkin"}
                      onChange={() => setOutputFormat("gherkin")}
                      style={styles.radio}
                    />
                    <label htmlFor="gherkin" style={styles.radioLabel}>
                      Gherkin
                    </label>
                  </div>
                  <div style={styles.radioOption}>
                    <input
                      id="custom"
                      name="output-format"
                      type="radio"
                      checked={outputFormat === "custom"}
                      onChange={() => setOutputFormat("custom")}
                      style={styles.radio}
                    />
                    <label htmlFor="custom" style={styles.radioLabel}>
                      Personnalisé
                    </label>
                  </div>
                </div>

                {outputFormat === "custom" && (
                  <div style={{ marginTop: "1rem" }}>
                    <label htmlFor="custom-format" style={styles.formLabel}>
                      Exemple de format personnalisé
                    </label>
                    <textarea
                      id="custom-format"
                      rows={4}
                      style={{
                        ...styles.textarea,
                        ...(focusedInput === "custom-format" ? styles.textareaFocus : {}),
                      }}
                      placeholder="Fournissez un exemple de votre format personnalisé..."
                      value={customFormat}
                      onChange={(e) => setCustomFormat(e.target.value)}
                      onFocus={() => setFocusedInput("custom-format")}
                      onBlur={() => setFocusedInput(null)}
                    ></textarea>
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || (!selectedRequirement && !newRequirementTitle) || !requirementsDescription}
                style={
                  isGenerating || (!selectedRequirement && !newRequirementTitle) || !requirementsDescription
                    ? { ...styles.button, ...styles.primaryButton, ...styles.disabledButton }
                    : hoveredItem === "generate-btn"
                      ? { ...styles.button, ...styles.primaryButton, ...styles.primaryButtonHover }
                      : { ...styles.button, ...styles.primaryButton }
                }
                onMouseEnter={() => setHoveredItem("generate-btn")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {isGenerating ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LoadingSpinner />
                    Génération en cours...
                  </div>
                ) : (
                  "Générer les cas de test"
                )}
              </button>

              {generatedTests && (
                <>
                  <div style={styles.divider}></div>

                  <div style={styles.resultsHeader}>
                    <h3 style={styles.resultsTitle}>Cas de test générés</h3>
                    <div style={styles.actionButtons}>
                      {isEditing ? (
                        <button
                          onClick={handleSaveEdits}
                          style={
                            hoveredItem === "save-btn"
                              ? { ...styles.outlineButton, ...styles.primaryButton, ...styles.primaryButtonHover }
                              : { ...styles.outlineButton, ...styles.primaryButton }
                          }
                          onMouseEnter={() => setHoveredItem("save-btn")}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={styles.actionIcon}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                            />
                          </svg>
                          Enregistrer
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          style={
                            hoveredItem === "edit-btn"
                              ? { ...styles.outlineButton, ...styles.outlineButtonHover }
                              : styles.outlineButton
                          }
                          onMouseEnter={() => setHoveredItem("edit-btn")}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={styles.actionIcon}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Modifier
                        </button>
                      )}
                      <select
                        style={{
                          ...styles.select,
                          width: "12rem",
                          ...(focusedInput === "download" ? styles.selectFocus : {}),
                        }}
                        onChange={(e) => handleDownload(e.target.value)}
                        defaultValue=""
                        onFocus={() => setFocusedInput("download")}
                        onBlur={() => setFocusedInput(null)}
                      >
                        <option value="" disabled>
                          Télécharger...
                        </option>
                        <option value="pdf">Télécharger en PDF</option>
                        <option value="docx">Télécharger en DOCX</option>
                      </select>
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      style={{
                        ...styles.resultsEditor,
                        ...(focusedInput === "editor" ? styles.resultsEditorFocus : {}),
                      }}
                      value={editedTests}
                      onChange={(e) => setEditedTests(e.target.value)}
                      onFocus={() => setFocusedInput("editor")}
                      onBlur={() => setFocusedInput(null)}
                    ></textarea>
                  ) : (
                    <pre id="test-case-container" style={styles.resultsPreview}>
                      {generatedTests}
                    </pre>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Chat button */}
      <button
        style={hoveredItem === "chat-btn" ? { ...styles.chatButton, ...styles.chatButtonHover } : styles.chatButton}
        onClick={() => setIsChatOpen(!isChatOpen)}
        onMouseEnter={() => setHoveredItem("chat-btn")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div style={{ position: "relative" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={styles.chatIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {directChatMode && (
            <div
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "8px",
                height: "8px",
                backgroundColor: "#10B981",
                borderRadius: "50%",
                border: "1px solid white",
              }}
            ></div>
          )}
        </div>
      </button>

      {isChatOpen && (
        <div style={getChatModalStyle()}>
          <div style={styles.chatHeader}>
            <h3 style={styles.chatTitle}>Assistant IA</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                onClick={() => setDirectChatMode(!directChatMode)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.75rem",
                  color: directChatMode ? "#10B981" : "#9CA3AF",
                  cursor: "pointer",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                  backgroundColor: directChatMode ? "rgba(16, 185, 129, 0.1)" : "transparent",
                }}
              >
                <div
                  style={{
                    width: "0.75rem",
                    height: "0.75rem",
                    backgroundColor: directChatMode ? "#10B981" : "transparent",
                    border: directChatMode ? "none" : "1px solid #9CA3AF",
                    borderRadius: "50%",
                    marginRight: "0.25rem",
                  }}
                ></div>
                Mode direct
              </div>
              <button
                style={
                  hoveredItem === "close-btn"
                    ? { ...styles.closeButton, ...styles.closeButtonHover }
                    : styles.closeButton
                }
                onClick={() => setIsChatOpen(false)}
                onMouseEnter={() => setHoveredItem("close-btn")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={styles.closeIcon}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div style={styles.chatMessages}>
            {chatMessages.length === 0 ? (
              <div style={styles.emptyChatState}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={styles.emptyChatIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p style={styles.emptyChatText}>
                  {directChatMode
                    ? "Demandez des modifications directes à vos cas de test."
                    : "Posez des questions sur vos cas de test générés pour obtenir de l'aide ou des suggestions d'amélioration."}
                </p>
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={
                    msg.role === "user"
                      ? { ...styles.messageContainer, ...styles.messageContainerUser }
                      : { ...styles.messageContainer, ...styles.messageContainerAssistant }
                  }
                >
                  <div
                    style={
                      msg.role === "user"
                        ? { ...styles.message, ...styles.userMessage }
                        : { ...styles.message, ...styles.assistantMessage }
                    }
                  >
                    <p>{msg.content}</p>
                    {msg.isPartial && (
                      <div style={{ display: "flex", marginTop: "0.5rem", justifyContent: "flex-end" }}>
                        <div style={{ display: "flex", gap: "0.25rem" }}>
                          <div
                            style={{
                              width: "0.5rem",
                              height: "0.5rem",
                              borderRadius: "50%",
                              backgroundColor: "#6b7280",
                              animation: "pulse 1s infinite",
                              animationDelay: "0ms",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "0.5rem",
                              height: "0.5rem",
                              borderRadius: "50%",
                              backgroundColor: "#6b7280",
                              animation: "pulse 1s infinite",
                              animationDelay: "300ms",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "0.5rem",
                              height: "0.5rem",
                              borderRadius: "50%",
                              backgroundColor: "#6b7280",
                              animation: "pulse 1s infinite",
                              animationDelay: "600ms",
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleChatSubmit} style={styles.chatForm}>
            <input
              type="text"
              style={{
                ...styles.chatInput,
                ...(focusedInput === "chat" ? styles.chatInputFocus : {}),
              }}
              placeholder={directChatMode ? "Modifiez directement les cas de test..." : "Tapez votre message..."}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onFocus={() => setFocusedInput("chat")}
              onBlur={() => setFocusedInput(null)}
            />
            <button
              type="submit"
              style={
                hoveredItem === "submit-btn"
                  ? { ...styles.chatSubmitButton, ...styles.chatSubmitButtonHover }
                  : styles.chatSubmitButton
              }
              onMouseEnter={() => setHoveredItem("submit-btn")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={styles.submitIcon} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Generate