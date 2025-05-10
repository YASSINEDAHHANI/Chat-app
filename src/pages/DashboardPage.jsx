import { useState, useEffect } from "react"
import api from "../api"

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
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
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
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#111827",
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
    backgroundColor: "#f3f4f6",
    color: "#111827",
  },
  adminLink: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4f46e5",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  adminLinkHover: {
    backgroundColor: "#ede9fe",
    color: "#4338ca",
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
    marginBottom: "2rem",
  },
  pageTitle: {
    fontSize: "1.875rem",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "0.375rem",
    fontWeight: "500",
    fontSize: "0.875rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  buttonHover: {
    backgroundColor: "#4338ca",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  buttonIcon: {
    marginRight: "0.5rem",
    height: "1rem",
    width: "1rem",
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
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 2rem",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    border: "2px dashed #e5e7eb",
  },
  emptyIcon: {
    height: "4rem",
    width: "4rem",
    color: "#9ca3af",
    backgroundColor: "#f3f4f6",
    padding: "1rem",
    borderRadius: "50%",
    marginBottom: "1rem",
  },
  emptyTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#111827",
    margin: "0.5rem 0",
  },
  emptyText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  card: {
    backgroundColor: "white",
    overflow: "hidden",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardHover: {
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transform: "translateY(-2px)",
  },
  cardHeader: {
    padding: "1.25rem",
    borderBottom: "1px solid #f3f4f6",
  },
  cardTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#111827",
    margin: 0,
    marginBottom: "0.25rem",
  },
  cardDate: {
    fontSize: "0.875rem",
    color: "#6b7280",
    margin: 0,
  },
  cardContent: {
    padding: "1.25rem",
    flex: "1",
  },
  cardStats: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1rem",
  },
  cardIcon: {
    marginRight: "0.5rem",
    height: "1rem",
    width: "1rem",
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    borderRadius: "9999px",
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },
  collaboratorText: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  collaboratorIcon: {
    marginRight: "0.25rem",
    height: "0.875rem",
    width: "0.875rem",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1.25rem",
    backgroundColor: "#f9fafb",
    borderTop: "1px solid #e5e7eb",
  },
  cardLink: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4f46e5",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.375rem 0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  cardLinkHover: {
    backgroundColor: "#ede9fe",
    color: "#4338ca",
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
    zIndex: -1,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: "32rem",
    padding: "1.5rem",
    position: "relative",
    zIndex: 10,
    maxHeight: "90vh",
    overflow: "auto",
  },
  modalHeader: {
    marginBottom: "1.5rem",
  },
  modalTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#111827",
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
    color: "#374151",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    fontSize: "0.875rem",
    transition: "border-color 0.2s",
    outline: "none",
  },
  inputFocus: {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 1px #4f46e5",
  },
  select: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    fontSize: "0.875rem",
    backgroundColor: "white",
    outline: "none",
    transition: "border-color 0.2s",
  },
  selectFocus: {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 1px #4f46e5",
  },
  textarea: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
    minHeight: "6rem",
    resize: "vertical",
  },
  textareaFocus: {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 1px #4f46e5",
  },
  inputGroup: {
    display: "flex",
    gap: "0.5rem",
  },
  addButton: {
    padding: "0.625rem",
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "0.375rem",
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
    backgroundColor: "#4338ca",
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
    backgroundColor: "#f3f4f6",
    borderRadius: "9999px",
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  removeBtn: {
    marginLeft: "0.375rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1rem",
    height: "1rem",
    color: "#6b7280",
    background: "none",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  removeBtnHover: {
    backgroundColor: "#e5e7eb",
    color: "#111827",
  },
  modalFooter: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    gap: "0.75rem",
  },
  modalFooterButtons: {
    display: "flex",
    gap: "0.75rem",
  },
  outlineButton: {
    padding: "0.625rem 1rem",
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  outlineButtonHover: {
    backgroundColor: "#f9fafb",
    borderColor: "#9ca3af",
  },
  primaryButton: {
    padding: "0.625rem 1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "0.375rem",
    border: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  primaryButtonHover: {
    backgroundColor: "#4338ca",
  },
  fileInput: {
    width: "100%",
    padding: "0.5rem 0",
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
}

const PlusCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.buttonIcon}>
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
      clipRule="evenodd"
    />
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.cardIcon}>
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
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

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.collaboratorIcon}>
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
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
    window.location.href = "/signin"
  } catch (error) {
    console.error("Logout failed:", error)
  }
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

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.logo}>AI Test Case Generator</h1>
          <div style={styles.navLinks}>
            <button
              style={{
                ...styles.navLink,
                ...(hoveredButton === "docs" ? styles.navLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("docs")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Documentation
            </button>
            <button
              style={{
                ...styles.navLink,
                ...(hoveredButton === "settings" ? styles.navLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("settings")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Paramètres
            </button>
            {/* Display admin link if user is admin */}
            {isAdmin && (
              <button
                style={{
                  ...styles.adminLink,
                  ...(hoveredButton === "admin" ? styles.adminLinkHover : {}),
                }}
                onClick={() => navigate("/admin")}
                onMouseEnter={() => setHoveredButton("admin")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Admin Panel
              </button>
            )}
            <button
              style={{
                ...styles.navLink,
                ...(hoveredButton === "logout" ? styles.navLinkHover : {}),
              }}
              onClick={handleLogout}
              onMouseEnter={() => setHoveredButton("logout")}
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
              ...(hoveredButton === "newProject" ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton("newProject")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <PlusCircleIcon />
            Nouveau Projet
          </button>
        </div>

        {/* New Project Dialog */}
        {isDialogOpen && (
          <div style={styles.modal}>
            <div style={styles.modalOverlay} onClick={() => setIsDialogOpen(false)}></div>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
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
              </div>

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
                    Retour
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
                    Annuler
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
                    {step < 3 ? "Suivant" : "Créer le projet"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={getGridStyle()}>
          {projects.length === 0 ? (
            <div style={styles.emptyState}>
              <FolderOpenIcon />
              <h3 style={styles.emptyTitle}>Aucun projet</h3>
              <p style={styles.emptyText}>Commencez par créer un nouveau projet.</p>
              <button
                type="button"
                onClick={() => setIsDialogOpen(true)}
                style={{
                  ...styles.button,
                  ...(hoveredButton === "emptyCreate" ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setHoveredButton("emptyCreate")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <PlusCircleIcon />
                Nouveau Projet
              </button>
            </div>
          ) : (
            projects.map((project) => (
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
                  <p style={styles.cardDate}>Créé le {new Date(project.created_at).toLocaleDateString()}</p>
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.cardStats}>
                    <FolderIcon />0 cas de test
                  </div>
                  <div style={styles.tagContainer}>
                    <span style={styles.badge}>
                      {project.language === "french"
                        ? "Français"
                        : project.language === "english"
                          ? "Anglais"
                          : "Non défini"}
                    </span>
                    <span style={styles.badge}>Claude</span>
                  </div>
                  {project.collaborators && project.collaborators.length > 0 && (
                    <div style={styles.collaboratorText}>
                      <UsersIcon />
                      <span>Collaborateurs: {project.collaborators.length}</span>
                    </div>
                  )}
                </div>
                <div style={styles.cardFooter}>
                  <button
                    style={{
                      ...styles.cardLink,
                      ...(hoveredCard === project.id ? styles.cardLinkHover : {}),
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
  )
}

export default Dashboard
