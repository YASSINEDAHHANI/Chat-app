import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import api from "../api"
import { AlertTriangle, Users, ArrowLeft, Plus, Edit, Trash2, Eye, BarChart3, FolderOpen, UserCheck, ChevronDown, ChevronUp, FileText, Upload, File, Download, X } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`

const Logo = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
  letter-spacing: -0.025em;
`

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background-color: ${props => 
    props.active 
      ? "#3b82f6" 
      : "transparent"
  };
  color: ${props => 
    props.active 
      ? "white" 
      : "#6b7280"
  };

  &:hover {
    background-color: ${props => 
      props.active 
        ? "#2563eb" 
        : "#f3f4f6"
    };
    color: ${props => 
      props.active 
        ? "white" 
        : "#1f2937"
    };
  }
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
`

const PageSubtitle = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1rem;
`

// ✅ File upload specific styles
const UploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
  background-color: ${props => props.isDragOver ? "#f0f9ff" : "#fafbff"};
  border-color: ${props => props.isDragOver ? "#3b82f6" : "#d1d5db"};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #3b82f6;
    background-color: #f0f9ff;
  }
`

const FileInput = styled.input`
  display: none;
`

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`

const FileCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  padding: 1.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

const FileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`

const FileIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: ${props => props.color || "rgba(59, 130, 246, 0.1)"};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FileName = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  word-break: break-all;
  line-height: 1.4;
`

const FileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 1rem;
`

const FileActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  overflow: hidden;
  margin: 1rem 0;
`

const ProgressFill = styled.div`
  height: 100%;
  background-color: #3b82f6;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

const StatCardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StatInfo = styled.div``

const StatLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
`

const StatValue = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.color || "#1f2937"};
  margin: 0;
  line-height: 1;
`

const StatIcon = styled.div`
  height: 3rem;
  width: 3rem;
  background: ${props => props.bgColor || "rgba(107, 114, 128, 0.1)"};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CardContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => (props.size === "sm" ? "0.375rem 0.75rem" : "0.625rem 1.25rem")};
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: ${props => (props.size === "sm" ? "0.75rem" : "0.875rem")};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.variant) {
      case "primary":
        return css`
          background: #3b82f6;
          color: white;
          &:hover { 
            background: #2563eb;
            transform: translateY(-1px);
          }
          &:disabled { opacity: 0.5; cursor: not-allowed; }
        `
      case "danger":
        return css`
          background: #ef4444;
          color: white;
          &:hover { 
            background: #dc2626;
            transform: translateY(-1px);
          }
        `
      case "outline":
        return css`
          background: transparent;
          color: #6b7280;
          border: 1px solid #d1d5db;
          &:hover { 
            background: #f9fafb;
            color: #1f2937;
            border-color: #9ca3af;
          }
        `
      default:
        return css`
          background: #f3f4f6;
          color: #4b5563;
          &:hover { 
            background: #e5e7eb;
            transform: translateY(-1px);
          }
        `
    }
  }}
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`

const TableHeader = styled.thead`
  background: #f8fafc;
`

const TableRow = styled.tr`
  transition: all 0.2s ease;
  
  &:hover {
    background: #f9fafb;
  }
`

const TableHeaderCell = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  background: transparent;
`

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  vertical-align: middle;
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.variant) {
      case "admin":
        return css`
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `
      case "user":
        return css`
          background: rgba(79, 70, 229, 0.1);
          color: #4f46e5;
          border: 1px solid rgba(79, 70, 229, 0.3);
        `
      case "outline":
        return css`
          background: transparent;
          color: #6b7280;
          border: 1px solid #d1d5db;
        `
      default:
        return css`
          background: #f3f4f6;
          color: #6b7280;
          border: 1px solid rgba(0, 0, 0, 0.1);
        `
    }
  }}
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  width: 100%;
  max-width: 32rem;
  border: 1px solid #e5e7eb;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
`

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #f3f4f6;
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  flex-direction: column;
  gap: 1rem;
`

const LoadingSpinner = styled.div`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  border: 3px solid #f3f4f6;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const ErrorAlert = styled.div`
  background: rgba(239, 68, 68, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  color: #ef4444;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  color: #6b7280;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`

const ProjectDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  margin-top: 1rem;
`

const ProjectSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ProjectInfoCard = styled(Card)`
  margin-bottom: 0;
`

const ProjectInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`

const ProjectInfoLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`

const ProjectInfoValue = styled.span`
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
`

const RequirementCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`

const RequirementHeader = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const RequirementTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`

const RequirementBadges = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const RequirementContent = styled.div`
  padding: 1rem 1.25rem;
  background: #f9fafb;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #1f2937;
  }
`

const AnimatedDiv = styled.div`
  animation: fadeInUp 0.6s ease-out;
  animation-delay: ${props => props.delay || 0}ms;
  animation-fill-mode: both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export default function AdminPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [dashboardData, setDashboardData] = useState(null)
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [expandedRequirement, setExpandedRequirement] = useState(null)

  // User form states
  const [showUserForm, setShowUserForm] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "user",
  })

  // Edit user form states
  const [showEditForm, setShowEditForm] = useState(false)
  const [editUser, setEditUser] = useState(null)

  // ✅ NEW: File management states
  const [files, setFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState({})
  const [isDragOver, setIsDragOver] = useState(false)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
  setIsLoading(true)
  setError(null)

  try {
    if (activeTab === "dashboard") {
      console.log("Fetching admin dashboard data...")
      const response = await api.get("/admin/dashboard")
      console.log("Dashboard response:", response.data)
      setDashboardData(response.data)
    } else if (activeTab === "users") {
      console.log("Fetching admin users data...")
      const response = await api.get("/admin/users")
      console.log("Users response:", response.data)
      setUsers(response.data.users || [])
    } else if (activeTab === "projects") {
      console.log("Fetching admin projects data...")
      
      // Add a small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const response = await api.get("/admin/projects")
      console.log("Projects response:", response.data)
      
      if (response.data && response.data.projects) {
        setProjects(response.data.projects)
      } else {
        console.warn("No projects data in response")
        setProjects([])
      }
    } else if (activeTab === "files") {
      // ✅ NEW: Fetch files from MinIO
      console.log("Fetching files data...")
      await fetchFiles()
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    
    // Handle different types of errors
    if (error.response?.status === 429) {
      setError("Too many requests. Please wait a moment and try again.")
    } else if (error.response?.status === 401) {
      setError("Session expired. Please log in again.")
      navigate("/login")
    } else if (error.response?.status === 403) {
      setError("Admin access required. Please check your permissions.")
    } else if (error.response?.status === 404) {
      setError("Admin endpoint not found. Please check server configuration.")
    } else if (error.response?.status === 500) {
      const serverError = error.response?.data?.error || "Internal server error"
      setError(`Server error: ${serverError}`)
    } else if (error.code === 'ERR_NETWORK') {
      setError("Network error. Please check if the server is running.")
    } else {
      setError(error.response?.data?.error || error.message || `Failed to load ${activeTab} data`)
    }
  } finally {
    setIsLoading(false)
  }
}

  // ✅ NEW: File management functions
  const fetchFiles = async () => {
    try {
      const response = await api.get("/admin/list_documents")
      setFiles(response.data.files || [])
    } catch (error) {
      console.error("Error fetching files:", error)
      setError("Failed to fetch files from MinIO")
    }
  }

  const handleFileUpload = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return

    for (const file of selectedFiles) {
      const fileId = Date.now() + Math.random()
      
      // Initialize progress
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: { name: file.name, progress: 0, status: 'uploading' }
      }))

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await api.post("/admin/upload_document", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadProgress(prev => ({
              ...prev,
              [fileId]: { 
                ...prev[fileId], 
                progress: percentCompleted 
              }
            }))
          }
        })

        // Mark as completed
        setUploadProgress(prev => ({
          ...prev,
          [fileId]: { 
            ...prev[fileId], 
            progress: 100, 
            status: 'completed' 
          }
        }))

        // Refresh files list
        await fetchFiles()

        // Remove from progress after a delay
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[fileId]
            return newProgress
          })
        }, 2000)

      } catch (error) {
        console.error("Error uploading file:", error)
        setUploadProgress(prev => ({
          ...prev,
          [fileId]: { 
            ...prev[fileId], 
            status: 'error',
            error: error.response?.data?.error || 'Upload failed'
          }
        }))
      }
    }
  }

  const handleFileDelete = async (fileName) => {
    if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      try {
        await api.delete("/admin/delete_document", {
          data: { filename: fileName }
        })
        await fetchFiles()
      } catch (error) {
        console.error("Error deleting file:", error)
        setError("Failed to delete file")
      }
    }
  }

const handleFileDownload = async (fileName) => {
  try {
    console.log(`Starting download for file: ${fileName}`)
    
    const response = await api.get(`/admin/download_document/${encodeURIComponent(fileName)}`, {
      responseType: 'blob',
      timeout: 30000, // 30 second timeout
    })
    
    // Check if response is valid
    if (!response.data || response.data.size === 0) {
      throw new Error('Received empty file from server')
    }
    
    console.log(`Received file, size: ${response.data.size} bytes`)
    
    // Create blob with proper content type
    const blob = new Blob([response.data], {
      type: response.headers['content-type'] || 'application/octet-stream'
    })
    
    // Sanitize filename
    const sanitizedFileName = fileName.replace(/[<>:"/\\|?*]/g, '_')
    
    // Create temporary URL
    const url = window.URL.createObjectURL(blob)
    
    // Create temporary link element
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', sanitizedFileName)
    link.style.display = 'none'
    
    // Append to body, click and clean up
    document.body.appendChild(link)
    link.click()
    
    // Clean up with slight delay to ensure download starts
    setTimeout(() => {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }, 100)
    
    console.log(`File download initiated successfully: ${fileName}`)
    
  } catch (error) {
    console.error("Error downloading file:", error)
    
    // Show user-friendly error message
    let errorMessage = `Failed to download file: ${fileName}`
    
    if (error.response?.status === 403) {
      errorMessage = "Access denied. Please check your permissions."
    } else if (error.response?.status === 404) {
      errorMessage = "File not found on server."
    } else if (error.response?.status === 500) {
      errorMessage = "Server error occurred while downloading the file."
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = "Download timeout. Please try again."
    } else if (error.message.includes('empty file')) {
      errorMessage = "Downloaded file is empty. Please try again."
    }
    
    setError(errorMessage)
  }
}

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    const iconProps = { size: 20 }

    switch (extension) {
      case 'pdf':
        return <File {...iconProps} color="#dc2626" />
      case 'doc':
      case 'docx':
        return <File {...iconProps} color="#2563eb" />
      case 'txt':
        return <FileText {...iconProps} color="#6b7280" />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <File {...iconProps} color="#059669" />
      default:
        return <File {...iconProps} color="#6b7280" />
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // ✅ NEW: Render files management tab
  const renderFiles = () => {
    return (
      <AnimatedDiv>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <PageTitle>Gestion des Fichiers MinIO</PageTitle>
            <PageSubtitle>Gérer les fichiers stockés dans le système de stockage MinIO</PageSubtitle>
          </div>
          <Button 
            variant="outline" 
            onClick={() => fetchFiles()}
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : "Actualiser"}
          </Button>
        </div>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Upload size={20} />
              Télécharger des Fichiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UploadArea
              isDragOver={isDragOver}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('file-input').click()}
            >
              <Upload size={48} color="#6b7280" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                Glissez-déposez vos fichiers ici
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
                ou cliquez pour sélectionner des fichiers
              </p>
              <Button variant="primary" size="sm">
                Choisir des Fichiers
              </Button>
            </UploadArea>
            <FileInput
              id="file-input"
              type="file"
              multiple
              onChange={(e) => handleFileUpload(Array.from(e.target.files))}
            />
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {Object.keys(uploadProgress).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Progression du Téléchargement</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(uploadProgress).map(([fileId, fileProgress]) => (
                <div key={fileId} style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>{fileProgress.name}</span>
                    <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {fileProgress.status === 'completed' ? '✅ Terminé' : 
                       fileProgress.status === 'error' ? '❌ Erreur' : 
                       `${fileProgress.progress}%`}
                    </span>
                  </div>
                  <ProgressBar>
                    <ProgressFill progress={fileProgress.progress} />
                  </ProgressBar>
                  {fileProgress.error && (
                    <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>
                      {fileProgress.error}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Files List */}
        <Card>
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <CardTitle>Fichiers Stockés</CardTitle>
              {files.length > 0 && (
                <Badge variant="outline">
                  {files.length} fichier{files.length > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingContainer>
                <LoadingSpinner />
                <p style={{ color: "#6b7280", fontWeight: 500 }}>Chargement des fichiers...</p>
              </LoadingContainer>
            ) : files.length === 0 ? (
              <EmptyState>
                <FolderOpen size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                  Aucun Fichier Trouvé
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", maxWidth: "24rem", marginBottom: "1.5rem" }}>
                  Aucun fichier n'est actuellement stocké dans MinIO. Téléchargez vos premiers fichiers pour commencer.
                </p>
              </EmptyState>
            ) : (
              <FileGrid>
                {files.map((file) => (
                  <FileCard key={file.filename}>
                    <FileHeader>
                      <FileIcon color="rgba(59, 130, 246, 0.1)">
                        {getFileIcon(file.filename)}
                      </FileIcon>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <FileName>{file.filename}</FileName>
                      </div>
                    </FileHeader>
                    <FileInfo>
                      <span>{formatFileSize(file.size)}</span>
                      <span>{new Date(file.last_modified).toLocaleDateString()}</span>
                    </FileInfo>
                    <FileActions>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleFileDownload(file.filename)}
                        title="Télécharger le fichier"
                      >
                        <Download size={14} />
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleFileDelete(file.filename)}
                        title="Supprimer le fichier"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </FileActions>
                  </FileCard>
                ))}
              </FileGrid>
            )}
          </CardContent>
        </Card>

        {/* Storage Statistics */}
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de Stockage</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#3b82f6" }}>
                    {files.length}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Fichiers Total
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#059669" }}>
                    {formatFileSize(files.reduce((total, file) => total + file.size, 0))}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Espace Utilisé
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#f59e0b" }}>
                    {formatFileSize(files.reduce((total, file) => total + file.size, 0) / files.length || 0)}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Taille Moyenne
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </AnimatedDiv>
    )
  }

  const handleCreateUser = async () => {
    try {
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
      setError(error.response?.data?.error || "Échec de la création de l'utilisateur")
    }
  }

  const handleEditUser = async () => {
    if (!editUser) return

    try {
      const updateData = {
        role: editUser.role,
      }

      if (editUser.newPassword) {
        updateData.password = editUser.newPassword
      }

      const response = await api.put(`/admin/users/${editUser._id}`, updateData)
      setUsers(users.map((user) => (user._id === editUser._id ? response.data.user : user)))

      if (selectedUser && selectedUser._id === editUser._id) {
        setSelectedUser(response.data.user)
      }

      setShowEditForm(false)
      setEditUser(null)
    } catch (error) {
      console.error("Error updating user:", error)
      setError(error.response?.data?.error || "Échec de la mise à jour de l'utilisateur")
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await api.delete(`/admin/users/${userId}`)
        setUsers(users.filter((user) => user._id !== userId))
        if (selectedUser && selectedUser._id === userId) {
          setSelectedUser(null)
        }
      } catch (error) {
        console.error("Error deleting user:", error)
        setError(error.response?.data?.error || "Échec de la suppression de l'utilisateur")
      }
    }
  }

  const handleDeleteProject = async (projectId) => {
  if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
    try {
      setIsLoading(true)
      setError(null)
      
      // Add a small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
      
      await api.delete(`/admin/projects/${projectId}`)
      
      // Update the projects list
      setProjects(projects.filter((project) => project.id !== projectId))
      
      // Clear selected project if it was deleted
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(null)
      }
      
      // Show success message
      console.log("Project deleted successfully")
      
    } catch (error) {
      console.error("Error deleting project:", error)
      
      if (error.response?.status === 429) {
        setError("Rate limit exceeded. Please wait before deleting projects.")
      } else if (error.response?.status === 404) {
        setError("Project not found or already deleted.")
      } else if (error.response?.status === 500) {
        setError("Server error while deleting project.")
      } else {
        setError(error.response?.data?.error || "Failed to delete project")
      }
    } finally {
      setIsLoading(false)
    }
  }
}

  const handleViewProjectDetails = async (projectId) => {
  try {
    console.log("handleViewProjectDetails called with projectId:", projectId)
    
    // Add loading state for this specific action
    setIsLoading(true)
    setError(null)
    
    // Add a small delay to prevent rate limiting
    await new Promise(resolve => setTimeout(resolve, 200))
    
    console.log("Making request to: /admin/projects/" + projectId)
    
    const response = await api.get(`/admin/projects/${projectId}`)
    console.log("Project details response:", response.data)
    
    setSelectedProject(response.data.project)
  } catch (error) {
    console.error("Error fetching project details:", error)
    console.error("Error response:", error.response)
    console.error("Error status:", error.response?.status)
    console.error("Error data:", error.response?.data)
    
    // Handle specific error types
    if (error.response?.status === 429) {
      setError("Rate limit exceeded. Please wait before viewing project details.")
    } else if (error.response?.status === 404) {
      setError("Project not found.")
    } else if (error.response?.status === 500) {
      setError("Server error while loading project details.")
    } else {
      setError(error.response?.data?.error || "Failed to load project details")
    }
  } finally {
    setIsLoading(false)
  }
}

  const handleViewUserDetails = async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}`)
      setSelectedUser(response.data.user)
    } catch (error) {
      console.error("Error fetching user details:", error)
      setError(error.response?.data?.error || "Échec du chargement des détails de l'utilisateur")
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
      navigate("/login")
    }
  }

  // Utility functions
  const getReadableCategory = (category) => {
    const categoryMap = {
      functionality: "Fonctionnalité",
      ui: "Interface utilisateur", 
      security: "Sécurité",
      performance: "Performance",
      usability: "Utilisabilité",
      compatibility: "Compatibilité",
      accessibility: "Accessibilité",
    }
    return categoryMap[category] || category
  }

  const getReadablePriority = (priority) => {
    const priorityMap = {
      high: "Haute",
      medium: "Moyenne", 
      low: "Basse",
    }
    return priorityMap[priority] || priority
  }

  const getReadableStatus = (status) => {
    const statusMap = {
      approved: "Approuvé",
      "in-review": "En révision",
      draft: "Brouillon",
    }
    return statusMap[status] || status
  }

  const getCategoryColor = (category) => {
    const colorMap = {
      functionality: "rgba(59, 130, 246, 0.1)",
      ui: "rgba(239, 68, 68, 0.1)",
      security: "rgba(245, 158, 11, 0.1)",
      performance: "rgba(16, 185, 129, 0.1)",
      usability: "rgba(139, 92, 246, 0.1)",
      compatibility: "rgba(14, 165, 233, 0.1)",
      accessibility: "rgba(249, 115, 22, 0.1)",
    }
    return colorMap[category] || "rgba(107, 114, 128, 0.1)"
  }

  const getCategoryTextColor = (category) => {
    const colorMap = {
      functionality: "#2563eb",
      ui: "#dc2626",
      security: "#d97706",
      performance: "#059669",
      usability: "#7c3aed",
      compatibility: "#0ea5e9",
      accessibility: "#ea580c",
    }
    return colorMap[category] || "#6b7280"
  }

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: "rgba(239, 68, 68, 0.1)",
      medium: "rgba(245, 158, 11, 0.1)",
      low: "rgba(16, 185, 129, 0.1)",
    }
    return colorMap[priority] || "rgba(107, 114, 128, 0.1)"
  }

  const getPriorityTextColor = (priority) => {
    const colorMap = {
      high: "#dc2626",
      medium: "#d97706",
      low: "#059669",
    }
    return colorMap[priority] || "#6b7280"
  }

const renderDashboard = () => {
    if (!dashboardData) return null

    const usersStats = dashboardData.users_stats || { total: 0, by_role: {} }
    const projectsStats = dashboardData.projects_stats || { total: 0, by_user: [] }
    const documentStats = dashboardData.document_stats || { total_documents: 0, total_size_mb: 0, minio_available: false }
    const ragStats = dashboardData.rag_stats || { rag_available: false }
    
    // Create mock recent data if not available from backend
    const recentUsers = dashboardData.recent_users || []
    const recentProjects = dashboardData.recent_projects || []

    const statsData = [
      { 
        title: "Total Utilisateurs", 
        value: usersStats.total || 0, 
        icon: Users, 
        color: "#3b82f6",
        bgColor: "rgba(59, 130, 246, 0.1)"
      },
      { 
        title: "Utilisateurs Admin", 
        value: usersStats.by_role?.admin || 0, 
        icon: UserCheck, 
        color: "#8b5cf6",
        bgColor: "rgba(139, 92, 246, 0.1)"
      },
      { 
        title: "Utilisateurs Managers", 
        value: usersStats.by_role?.manager || 0, 
        icon: Users, 
        color: "#10b981",
        bgColor: "rgba(16, 185, 129, 0.1)"
      },
      { 
        title: "Total Projets", 
        value: projectsStats.total || 0, 
        icon: FolderOpen, 
        color: "#f59e0b",
        bgColor: "rgba(245, 158, 11, 0.1)"
      },
    ]

    return (
      <AnimatedDiv>
        <PageTitle>Tableau de Bord Admin</PageTitle>
        <PageSubtitle>Vue d'ensemble du système et outils de gestion</PageSubtitle>

        <StatsGrid>
          {statsData.map((stat, index) => (
            <AnimatedDiv key={stat.title} delay={index * 100}>
              <StatCard>
                <StatCardContent>
                  <StatInfo>
                    <StatLabel>{stat.title}</StatLabel>
                    <StatValue color={stat.color}>{stat.value}</StatValue>
                  </StatInfo>
                  <StatIcon bgColor={stat.bgColor}>
                    <stat.icon size={24} color={stat.color} />
                  </StatIcon>
                </StatCardContent>
              </StatCard>
            </AnimatedDiv>
          ))}
        </StatsGrid>

        <GridLayout>
          <AnimatedDiv delay={400}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Users size={20} />
                  Utilisateurs Récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentUsers.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Nom d'utilisateur</TableHeaderCell>
                        <TableHeaderCell>Rôle</TableHeaderCell>
                      </tr>
                    </TableHeader>
                    <tbody>
                      {recentUsers.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell style={{ fontWeight: 500 }}>{user.username}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "admin" : "user"}>
                              {user.role === "admin" ? "Admin" : user.role === "manager" ? "Manager" : "Utilisateur"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <EmptyState>
                    <Users size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Aucun utilisateur récent disponible
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                      Les utilisateurs récents s'afficheront ici
                    </p>
                  </EmptyState>
                )}
              </CardContent>
            </Card>
          </AnimatedDiv>

          <AnimatedDiv delay={500}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <FolderOpen size={20} />
                  Projets Récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentProjects.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Nom</TableHeaderCell>
                        <TableHeaderCell>Propriétaire</TableHeaderCell>
                        <TableHeaderCell>Créé</TableHeaderCell>
                      </tr>
                    </TableHeader>
                    <tbody>
                      {recentProjects.map((project) => (
                        <TableRow key={project._id}>
                          <TableCell style={{ fontWeight: 500 }}>{project.name}</TableCell>
                          <TableCell>{project.user}</TableCell>
                          <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <EmptyState>
                    <FolderOpen size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Aucun projet récent disponible
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                      Les projets récents s'afficheront ici
                    </p>
                  </EmptyState>
                )}
              </CardContent>
            </Card>
          </AnimatedDiv>
        </GridLayout>

        {/* System Stats Card */}
        <AnimatedDiv delay={600}>
          <Card>
            <CardHeader>
              <CardTitle>
                <BarChart3 size={20} />
                Statistiques Système
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#3b82f6" }}>
                    {documentStats.total_documents || 0}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Documents MinIO
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#059669" }}>
                    {documentStats.total_size_mb || 0} MB
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Espace Utilisé
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: documentStats.minio_available ? "#10b981" : "#ef4444" }}>
                    {documentStats.minio_available ? "✅" : "❌"}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    MinIO Status
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: ragStats.rag_available ? "#10b981" : "#6b7280" }}>
                    {ragStats.rag_available ? "Actif" : "Inactif"}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Système RAG
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>

        {/* Project Contributors Table */}
        <AnimatedDiv delay={700}>
          <Card>
            <CardHeader>
              <CardTitle>Principaux Contributeurs de Projets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Nom d'utilisateur</TableHeaderCell>
                    <TableHeaderCell>Nombre de Projets</TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {projectsStats.by_user && projectsStats.by_user.length > 0 ? (
                    projectsStats.by_user.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell style={{ fontWeight: 500 }}>{item._id}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} style={{ textAlign: "center", color: "#6b7280", padding: "2rem" }}>
                        <EmptyState>
                          <BarChart3 size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            Aucune donnée de contributeurs disponible
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                            Les statistiques des contributeurs s'afficheront ici
                          </p>
                        </EmptyState>
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </AnimatedDiv>
      </AnimatedDiv>
    )
  }
  // Add these missing functions after renderDashboard():

  const renderUsers = () => {
    if (selectedUser) {
      return (
        <AnimatedDiv>
          <BackButton onClick={() => setSelectedUser(null)}>
            <ArrowLeft size={16} />
            Retour à la liste des utilisateurs
          </BackButton>

          <PageTitle>Détails de l'Utilisateur: {selectedUser.username}</PageTitle>

          <Card>
            <CardHeader>
              <CardTitle>Informations de l'Utilisateur</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Nom d'utilisateur</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedUser.username}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Email</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedUser.email || selectedUser.username}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Rôle</ProjectInfoLabel>
                    <ProjectInfoValue>
                      <Badge variant={selectedUser.role === "admin" ? "admin" : "user"}>
                        {selectedUser.role === "admin" ? "Admin" : selectedUser.role === "manager" ? "Manager" : "Utilisateur"}
                      </Badge>
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                </div>
                <div>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Créé</ProjectInfoLabel>
                    <ProjectInfoValue>
                      {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : "N/A"}
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Créé par</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedUser.created_by || "N/A"}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Dernière mise à jour</ProjectInfoLabel>
                    <ProjectInfoValue>
                      {selectedUser.updated_at ? new Date(selectedUser.updated_at).toLocaleString() : "N/A"}
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
                <Button variant="primary" onClick={() => handleStartEditUser(selectedUser)}>
                  <Edit size={16} />
                  Modifier l'Utilisateur
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteUser(selectedUser._id)
                    setSelectedUser(null)
                  }}
                >
                  <Trash2 size={16} />
                  Supprimer l'Utilisateur
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>
      )
    }

    return (
      <AnimatedDiv>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <PageTitle>Gestion des Utilisateurs</PageTitle>
            <PageSubtitle>Gérer les utilisateurs du système et leurs permissions</PageSubtitle>
          </div>
          <Button variant="primary" onClick={() => setShowUserForm(true)}>
            <Plus size={16} />
            Ajouter un Nouvel Utilisateur
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tous les Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Nom d'utilisateur</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                  <TableHeaderCell>Rôle</TableHeaderCell>
                  <TableHeaderCell>Créé</TableHeaderCell>
                  <TableHeaderCell style={{ textAlign: "right" }}>Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <TableCell colSpan={5}>
                      <EmptyState>
                        <Users size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                        <p>Aucun utilisateur trouvé. Créez votre premier utilisateur pour commencer.</p>
                      </EmptyState>
                    </TableCell>
                  </tr>
                ) : (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell style={{ fontWeight: 500 }}>{user.username}</TableCell>
                      <TableCell>{user.email || user.username}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "admin" : "user"}>
                          {user.role === "admin" ? "Admin" : user.role === "manager" ? "Manager" : "Utilisateur"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        <ButtonGroup>
                          <Button variant="outline" size="sm" onClick={() => handleViewUserDetails(user._id)}>
                            <Eye size={14} />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleStartEditUser(user)}>
                            <Edit size={14} />
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                            <Trash2 size={14} />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </AnimatedDiv>
    )
  }

  const renderProjects = () => {
    if (selectedProject) {
      return (
        <AnimatedDiv>
          <BackButton onClick={() => setSelectedProject(null)}>
            <ArrowLeft size={16} />
            Retour à la liste des projets
          </BackButton>

          <PageTitle>Projet: {selectedProject.name}</PageTitle>
          <PageSubtitle>
            Créé par {selectedProject.user} le {new Date(selectedProject.created_at).toLocaleDateString()}
          </PageSubtitle>

          <ProjectDetailContainer>
            <ProjectSidebar>
              <ProjectInfoCard>
                <CardHeader>
                  <CardTitle>Informations du Projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Propriétaire</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.user}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Créé</ProjectInfoLabel>
                    <ProjectInfoValue>
                      {new Date(selectedProject.created_at).toLocaleDateString()}
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Dernière mise à jour</ProjectInfoLabel>
                    <ProjectInfoValue>
                      {selectedProject.updated_at ? new Date(selectedProject.updated_at).toLocaleDateString() : "N/A"}
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Exigences</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.requirements?.length || 0}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Collaborateurs</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.collaborator_details?.length || 0}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Langue</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.language === "fr" ? "Français" : selectedProject.language === "en" ? "Anglais" : "Non spécifiée"}</ProjectInfoValue>
                  </ProjectInfoItem>

                  <div style={{ marginTop: "1.25rem" }}>
                    <Button
                      variant="danger"
                      style={{ width: "100%" }}
                      onClick={() => {
                        handleDeleteProject(selectedProject.id)
                        setSelectedProject(null)
                      }}
                      disabled={isLoading}
                    >
                      <Trash2 size={16} />
                      {isLoading ? "Suppression..." : "Supprimer le Projet"}
                    </Button>
                  </div>
                </CardContent>
              </ProjectInfoCard>

              {selectedProject.collaborator_details && selectedProject.collaborator_details.length > 0 && (
                <ProjectInfoCard>
                  <CardHeader>
                    <CardTitle>Collaborateurs ({selectedProject.collaborator_details.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedProject.collaborator_details.map((collab) => (
                      <div key={collab._id} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        padding: "0.75rem 0", 
                        borderBottom: "1px solid #f3f4f6" 
                      }}>
                        <div style={{
                          width: "2rem",
                          height: "2rem", 
                          borderRadius: "50%",
                          backgroundColor: "#e5e7eb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "0.75rem",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: "#4b5563"
                        }}>
                          {collab.username.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937" }}>
                            {collab.username}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                            {collab.email}
                          </div>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                          {collab.added_at ? new Date(collab.added_at).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </ProjectInfoCard>
              )}
            </ProjectSidebar>

            <ProjectContent>
              <Card>
                <CardHeader>
                  <CardTitle>Contexte du Projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{
                    whiteSpace: "pre-wrap",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                    color: "#4b5563",
                  }}>
                    {selectedProject.context || "Aucun contexte fourni pour ce projet."}
                  </div>
                </CardContent>
              </Card>

              {selectedProject.requirements && selectedProject.requirements.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Exigences ({selectedProject.requirements.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedProject.requirements.map((req) => (
                      <RequirementCard key={req.id}>
                        <RequirementHeader
                          onClick={() => setExpandedRequirement(expandedRequirement === req.id ? null : req.id)}
                        >
                          <RequirementTitle>{req.title}</RequirementTitle>
                          <RequirementBadges>
                            <Badge 
                              style={{
                                backgroundColor: getCategoryColor(req.category),
                                color: getCategoryTextColor(req.category),
                                border: "none"
                              }}
                            >
                              {getReadableCategory(req.category)}
                            </Badge>
                            <Badge 
                              style={{
                                backgroundColor: getPriorityColor(req.priority),
                                color: getPriorityTextColor(req.priority),
                                border: "none"
                              }}
                            >
                              {getReadablePriority(req.priority)}
                            </Badge>
                            <Button variant="outline" size="sm">
                              {expandedRequirement === req.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </RequirementBadges>
                        </RequirementHeader>
                        {expandedRequirement === req.id && (
                          <RequirementContent>
                            <p>{req.description}</p>
                            <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                              <Badge style={{
                                backgroundColor: "rgba(107, 114, 128, 0.1)",
                                color: "#6b7280",
                                border: "none"
                              }}>
                                Statut: {getReadableStatus(req.status)}
                              </Badge>
                              {req.priority_auto_generated && (
                                <Badge style={{
                                  backgroundColor: "rgba(107, 114, 128, 0.1)",
                                  color: "#6b7280",
                                  border: "none"
                                }}>
                                  Priorité auto-générée
                                </Badge>
                              )}
                            </div>
                          </RequirementContent>
                        )}
                      </RequirementCard>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <EmptyState>
                      <FileText size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                      <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                        Aucune Exigence Trouvée
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280", maxWidth: "24rem", marginBottom: "1.5rem" }}>
                        Ce projet n'a pas encore d'exigences. Les exigences sont utilisées pour définir les fonctionnalités et caractéristiques du projet.
                      </p>
                    </EmptyState>
                  </CardContent>
                </Card>
              )}
            </ProjectContent>
          </ProjectDetailContainer>
        </AnimatedDiv>
      )
    }

    return (
      <AnimatedDiv>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <PageTitle>Gestion des Projets</PageTitle>
            <PageSubtitle>Gérer et surveiller tous les projets du système</PageSubtitle>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => fetchData()}
            disabled={isLoading}
            style={{ minWidth: "120px" }}
          >
            {isLoading ? (
              <>
                <LoadingSpinner style={{ 
                  height: "1rem", 
                  width: "1rem", 
                  borderWidth: "2px",
                  marginRight: "0.5rem" 
                }} />
                Chargement...
              </>
            ) : (
              "Actualiser"
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <CardTitle>Tous les Projets</CardTitle>
              {projects.length > 0 && (
                <Badge variant="outline" style={{ fontSize: "0.875rem" }}>
                  {projects.length} projet{projects.length > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingContainer>
                <LoadingSpinner />
                <p style={{ color: "#6b7280", fontWeight: 500 }}>Chargement des projets...</p>
              </LoadingContainer>
            ) : (
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Nom</TableHeaderCell>
                    <TableHeaderCell>Propriétaire</TableHeaderCell>
                    <TableHeaderCell>Créé</TableHeaderCell>
                    <TableHeaderCell>Exigences</TableHeaderCell>
                    <TableHeaderCell>Collaborateurs</TableHeaderCell>
                    <TableHeaderCell style={{ textAlign: "right" }}>Actions</TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {projects.length === 0 ? (
                    <tr>
                      <TableCell colSpan={6}>
                        <EmptyState>
                          <FolderOpen size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                            Aucun Projet Trouvé
                          </h3>
                          <p style={{ fontSize: "0.875rem", color: "#6b7280", maxWidth: "24rem", marginBottom: "1.5rem" }}>
                            Il n'y a actuellement aucun projet dans le système. Les projets apparaîtront ici une fois créés.
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => fetchData()}
                            disabled={isLoading}
                          >
                            Actualiser la liste
                          </Button>
                        </EmptyState>
                      </TableCell>
                    </tr>
                  ) : (
                    projects.map((project) => {
                      console.log("Rendering project:", project)
                      return (
                        <TableRow key={project._id || project.id}>
                          <TableCell style={{ fontWeight: 500 }}>
                            {project.name}
                            {project.language && (
                              <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                                {project.language === "fr" ? "🇫🇷 Français" : project.language === "en" ? "🇬🇧 Anglais" : project.language}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{project.user}</TableCell>
                          <TableCell>
                            <div style={{ fontSize: "0.875rem" }}>
                              {new Date(project.created_at).toLocaleDateString()}
                            </div>
                            {project.updated_at && (
                              <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                                Modifié: {new Date(project.updated_at).toLocaleDateString()}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={project.requirements?.length > 0 || project.requirements_count > 0 ? "admin" : "outline"}>
                              {project.requirements?.length || project.requirements_count || 0}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={project.collaborator_details?.length > 0 || project.collaborator_count > 0 ? "user" : "outline"}>
                              {project.collaborator_details?.length || project.collaborator_count || 0}
                            </Badge>
                          </TableCell>
                          <TableCell style={{ textAlign: "right" }}>
                            <ButtonGroup>
                              <Button 
                                variant="primary" 
                                size="sm" 
                                onClick={() => {
                                  console.log("Eye button clicked for project:", project)
                                  handleViewProjectDetails(project.id)
                                }}
                                disabled={isLoading}
                                title="Voir les détails du projet"
                              >
                                <Eye size={14} />
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm" 
                                onClick={() => handleDeleteProject(project.id)}
                                disabled={isLoading}
                                title="Supprimer le projet"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </tbody>
              </Table>
            )}
          </CardContent>
        </Card>

        {projects.length > 0 && (
          <Card style={{ marginTop: "1rem" }}>
            <CardContent style={{ padding: "1rem 1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.875rem", color: "#6b7280" }}>
                <span>Total des projets: <strong style={{ color: "#1f2937" }}>{projects.length}</strong></span>
                <span>
                  Total des exigences: <strong style={{ color: "#1f2937" }}>
                    {projects.reduce((sum, p) => sum + (p.requirements?.length || p.requirements_count || 0), 0)}
                  </strong>
                </span>
                <span>
                  Total des collaborateurs: <strong style={{ color: "#1f2937" }}>
                    {projects.reduce((sum, p) => sum + (p.collaborator_details?.length || p.collaborator_count || 0), 0)}
                  </strong>
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </AnimatedDiv>
    )
  }


  // Main component return statement
  return (
    <Container>
      <Header>
        <HeaderContainer>
          <Logo>Panneau Admin - Générateur de Cas de Test IA</Logo>
          <NavContainer>
            <NavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>
              Tableau de Bord
            </NavButton>
            <NavButton active={activeTab === "users"} onClick={() => setActiveTab("users")}>
              Utilisateurs
            </NavButton>
            <NavButton active={activeTab === "projects"} onClick={() => setActiveTab("projects")}>
              Projets
            </NavButton>
            <NavButton active={activeTab === "files"} onClick={() => setActiveTab("files")}>
              Fichiers
            </NavButton>

            <NavButton onClick={handleLogout}>Déconnexion</NavButton>
          </NavContainer>
        </HeaderContainer>
      </Header>

      <MainContent>
        {isLoading ? (
          <LoadingContainer>
            <LoadingSpinner />
            <p style={{ color: "#6b7280", fontWeight: 500 }}>Chargement des données...</p>
          </LoadingContainer>
        ) : error ? (
          <ErrorAlert>
            <AlertTriangle size={20} />
            <p style={{ margin: 0 }}>{error}</p>
          </ErrorAlert>
        ) : (
          <>
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "users" && renderUsers()}
            {activeTab === "projects" && renderProjects()}
            {activeTab === "files" && renderFiles()}
          </>
        )}
      </MainContent>

      {/* Create User Modal */}
      {showUserForm && (
        <Modal onClick={() => setShowUserForm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Créer un Nouvel Utilisateur</ModalTitle>
            <FormGroup>
              <Label htmlFor="username">Nom d'utilisateur/Email</Label>
              <Input
                id="username"
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Entrez le nom d'utilisateur/email"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Mot de passe"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="role">Rôle</Label>
              <Select
                id="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">Utilisateur</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Select>
            </FormGroup>
            <ModalFooter>
              <Button variant="outline" onClick={() => setShowUserForm(false)}>
                Annuler
              </Button>
              <Button variant="primary" onClick={handleCreateUser} disabled={!newUser.username || !newUser.password}>
                Créer l'Utilisateur
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Edit User Modal */}
      {showEditForm && editUser && (
        <Modal onClick={() => setShowEditForm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Modifier l'Utilisateur: {editUser.username}</ModalTitle>
            <FormGroup>
              <Label htmlFor="edit-role">Rôle</Label>
              <Select
                id="edit-role"
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              >
                <option value="user">Utilisateur</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="edit-password">Nouveau Mot de passe (laisser vide pour conserver l'actuel)</Label>
              <Input
                id="edit-password"
                type="password"
                value={editUser.newPassword || ""}
                onChange={(e) => setEditUser({ ...editUser, newPassword: e.target.value })}
                placeholder="Nouveau mot de passe (optionnel)"
              />
            </FormGroup>
            <ModalFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditForm(false)
                  setEditUser(null)
                }}
              >
                Annuler
              </Button>
              <Button variant="primary" onClick={handleEditUser}>
                Enregistrer les Modifications
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}