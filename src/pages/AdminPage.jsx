import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import api from "../api"
import {
  AlertTriangle,
  Users,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  FolderOpen,
  UserCheck,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react"

// Styled Components with clean design
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
        const response = await api.get("/admin/projects")
        console.log("Projects response:", response.data)
        setProjects(response.data.projects || [])
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error.response?.data?.error || `Failed to fetch ${activeTab} data`)

      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login")
      }
    } finally {
      setIsLoading(false)
    }
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
      setError(error.response?.data?.error || "Failed to create user")
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
      setError(error.response?.data?.error || "Failed to update user")
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/admin/users/${userId}`)
        setUsers(users.filter((user) => user._id !== userId))
        if (selectedUser && selectedUser._id === userId) {
          setSelectedUser(null)
        }
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
        if (selectedProject && selectedProject.id === projectId) {
          setSelectedProject(null)
        }
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
      navigate("/login")
    }
  }

  // Utility functions
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
    const recentUsers = dashboardData.recent_users || []
    const recentProjects = dashboardData.recent_projects || []

    const statsData = [
      { 
        title: "Total Users", 
        value: usersStats.total || 0, 
        icon: Users, 
        color: "#3b82f6",
        bgColor: "rgba(59, 130, 246, 0.1)"
      },
      { 
        title: "Admin Users", 
        value: usersStats.by_role.admin || 0, 
        icon: UserCheck, 
        color: "#8b5cf6",
        bgColor: "rgba(139, 92, 246, 0.1)"
      },
      { 
        title: "Regular Users", 
        value: usersStats.by_role.user || 0, 
        icon: Users, 
        color: "#10b981",
        bgColor: "rgba(16, 185, 129, 0.1)"
      },
      { 
        title: "Total Projects", 
        value: projectsStats.total || 0, 
        icon: FolderOpen, 
        color: "#f59e0b",
        bgColor: "rgba(245, 158, 11, 0.1)"
      },
    ]

    return (
      <AnimatedDiv>
        <PageTitle>Admin Dashboard</PageTitle>
        <PageSubtitle>System overview and management tools</PageSubtitle>

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
                  Recent Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentUsers.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Username</TableHeaderCell>
                        <TableHeaderCell>Role</TableHeaderCell>
                      </tr>
                    </TableHeader>
                    <tbody>
                      {recentUsers.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell style={{ fontWeight: 500 }}>{user.username}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "admin" : "user"}>
                              {user.role || "user"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <EmptyState>
                    <Users size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                    <p>No recent users</p>
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
                  Recent Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentProjects.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Owner</TableHeaderCell>
                        <TableHeaderCell>Created</TableHeaderCell>
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
                    <p>No recent projects</p>
                  </EmptyState>
                )}
              </CardContent>
            </Card>
          </AnimatedDiv>
        </GridLayout>

        <Card>
          <CardHeader>
            <CardTitle>Top Project Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Username</TableHeaderCell>
                  <TableHeaderCell>Number of Projects</TableHeaderCell>
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
                    <TableCell colSpan={2} style={{ textAlign: "center", color: "#6b7280" }}>
                      No project contributors data available
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </AnimatedDiv>
    )
  }

  const renderUsers = () => {
    if (selectedUser) {
      return (
        <AnimatedDiv>
          <BackButton onClick={() => setSelectedUser(null)}>
            <ArrowLeft size={16} />
            Back to users list
          </BackButton>

          <PageTitle>User Details: {selectedUser.username}</PageTitle>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Username</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedUser.username}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Email</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedUser.email || selectedUser.username}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Role</ProjectInfoLabel>
                    <ProjectInfoValue>
                      <Badge variant={selectedUser.role === "admin" ? "admin" : "user"}>
                        {selectedUser.role || "user"}
                      </Badge>
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                </div>
                <div>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Created</ProjectInfoLabel>
                    <ProjectInfoValue>
                      {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : "N/A"}
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Created By</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedUser.created_by || "N/A"}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Last Updated</ProjectInfoLabel>
                    <ProjectInfoValue>
                      {selectedUser.updated_at ? new Date(selectedUser.updated_at).toLocaleString() : "N/A"}
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
                <Button variant="primary" onClick={() => handleStartEditUser(selectedUser)}>
                  <Edit size={16} />
                  Edit User
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteUser(selectedUser._id)
                    setSelectedUser(null)
                  }}
                >
                  <Trash2 size={16} />
                  Delete User
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
            <PageTitle>User Management</PageTitle>
            <PageSubtitle>Manage system users and their permissions</PageSubtitle>
          </div>
          <Button variant="primary" onClick={() => setShowUserForm(true)}>
            <Plus size={16} />
            Add New User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Username</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                  <TableHeaderCell>Role</TableHeaderCell>
                  <TableHeaderCell>Created</TableHeaderCell>
                  <TableHeaderCell style={{ textAlign: "right" }}>Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <TableCell colSpan={5}>
                      <EmptyState>
                        <Users size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                        <p>No users found. Create your first user to get started.</p>
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
                          {user.role || "user"}
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
            Back to projects list
          </BackButton>

          <PageTitle>Project: {selectedProject.name}</PageTitle>
          <PageSubtitle>
            Created by {selectedProject.user} on {new Date(selectedProject.created_at).toLocaleDateString()}
          </PageSubtitle>

          <ProjectDetailContainer>
            <ProjectSidebar>
              <ProjectInfoCard>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Owner</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.user}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Created</ProjectInfoLabel>
                    <ProjectInfoValue>
                      {new Date(selectedProject.created_at).toLocaleDateString()}
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Last Updated</ProjectInfoLabel>
                    <ProjectInfoValue>
                      {selectedProject.updated_at ? new Date(selectedProject.updated_at).toLocaleDateString() : "N/A"}
                    </ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Requirements</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.requirements?.length || 0}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Collaborators</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.collaborators?.length || 0}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>Language</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.language || "Not specified"}</ProjectInfoValue>
                  </ProjectInfoItem>
                  <ProjectInfoItem>
                    <ProjectInfoLabel>AI Model</ProjectInfoLabel>
                    <ProjectInfoValue>{selectedProject.ai_model || "Default"}</ProjectInfoValue>
                  </ProjectInfoItem>

                  <div style={{ marginTop: "1.25rem" }}>
                    <Button
                      variant="danger"
                      style={{ width: "100%" }}
                      onClick={() => {
                        handleDeleteProject(selectedProject.id)
                        setSelectedProject(null)
                      }}
                    >
                      <Trash2 size={16} />
                      Delete Project
                    </Button>
                  </div>
                </CardContent>
              </ProjectInfoCard>

              {selectedProject.collaborator_details && selectedProject.collaborator_details.length > 0 && (
                <ProjectInfoCard>
                  <CardHeader>
                    <CardTitle>Collaborators ({selectedProject.collaborator_details.length})</CardTitle>
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
                  <CardTitle>Project Context</CardTitle>
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
                    {selectedProject.context || "No context provided for this project."}
                  </div>
                </CardContent>
              </Card>

              {selectedProject.requirements && selectedProject.requirements.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements ({selectedProject.requirements.length})</CardTitle>
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
                                Status: {getReadableStatus(req.status)}
                              </Badge>
                              {req.priority_auto_generated && (
                                <Badge style={{
                                  backgroundColor: "rgba(107, 114, 128, 0.1)",
                                  color: "#6b7280",
                                  border: "none"
                                }}>
                                  Auto-generated priority
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
                        No Requirements Found
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280", maxWidth: "24rem", marginBottom: "1.5rem" }}>
                        This project doesn't have any requirements yet. Requirements are used to define the functionality and features of the project.
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
        <PageTitle>Project Management</PageTitle>
        <PageSubtitle>Manage and monitor all system projects</PageSubtitle>

        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Owner</TableHeaderCell>
                  <TableHeaderCell>Created</TableHeaderCell>
                  <TableHeaderCell>Requirements</TableHeaderCell>
                  <TableHeaderCell>Collaborators</TableHeaderCell>
                  <TableHeaderCell style={{ textAlign: "right" }}>Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <TableCell colSpan={6}>
                      <EmptyState>
                        <FolderOpen size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                        <p>No projects found.</p>
                      </EmptyState>
                    </TableCell>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell style={{ fontWeight: 500 }}>{project.name}</TableCell>
                      <TableCell>{project.user}</TableCell>
                      <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge>{project.requirements?.length || 0}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>{project.collaborators?.length || 0}</Badge>
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        <ButtonGroup>
                          <Button variant="primary" size="sm" onClick={() => handleViewProjectDetails(project.id)}>
                            <Eye size={14} />
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteProject(project.id)}>
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

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <Logo>Admin Panel - AI Test Case Generator</Logo>
          <NavContainer>
            <NavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>
              Dashboard
            </NavButton>
            <NavButton active={activeTab === "users"} onClick={() => setActiveTab("users")}>
              Users
            </NavButton>
            <NavButton active={activeTab === "projects"} onClick={() => setActiveTab("projects")}>
              Projects
            </NavButton>

            <NavButton onClick={handleLogout}>Logout</NavButton>
          </NavContainer>
        </HeaderContainer>
      </Header>

      <MainContent>
        {isLoading ? (
          <LoadingContainer>
            <LoadingSpinner />
            <p style={{ color: "#6b7280", fontWeight: 500 }}>Loading data...</p>
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
          </>
        )}
      </MainContent>

      {/* Create User Modal */}
      {showUserForm && (
        <Modal onClick={() => setShowUserForm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Create New User</ModalTitle>
            <FormGroup>
              <Label htmlFor="username">Username/Email</Label>
              <Input
                id="username"
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Enter username/email"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Select>
            </FormGroup>
            <ModalFooter>
              <Button variant="outline" onClick={() => setShowUserForm(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateUser} disabled={!newUser.username || !newUser.password}>
                Create User
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Edit User Modal */}
      {showEditForm && editUser && (
        <Modal onClick={() => setShowEditForm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Edit User: {editUser.username}</ModalTitle>
            <FormGroup>
              <Label htmlFor="edit-role">Role</Label>
              <Select
                id="edit-role"
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
              <Input
                id="edit-password"
                type="password"
                value={editUser.newPassword || ""}
                onChange={(e) => setEditUser({ ...editUser, newPassword: e.target.value })}
                placeholder="New password (optional)"
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
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditUser}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}
