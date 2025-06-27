"use client"

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
} from "lucide-react"

// Styled Components with JavaScript-compatible syntax
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
  color: #10b981;
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
  
  /* Dynamic styling based on props */
  background-color: ${props => 
    props.active 
      ? "#10b981" 
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
        ? "#059669" 
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
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  /* Variant styles using JavaScript function */
  ${props => {
    switch (props.variant) {
      case "primary":
        return css`
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover { 
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          }
          &:disabled { opacity: 0.5; cursor: not-allowed; }
        `
      case "danger":
        return css`
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          &:hover { 
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
          }
        `
      case "outline":
        return css`
          background: rgba(255, 255, 255, 0.1);
          color: #6b7280;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          &:hover { 
            background: rgba(255, 255, 255, 0.2);
            color: #1f2937;
            transform: translateY(-2px);
          }
        `
      default:
        return css`
          background: rgba(255, 255, 255, 0.9);
          color: #4b5563;
          &:hover { 
            background: rgba(255, 255, 255, 1);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
        `
    }
  }}

  ${props => props.glow && css`
    &:hover {
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
    }
  `}
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
`

const TableRow = styled.tr`
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    transform: scale(1.01);
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
      case "primary":
        return css`
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        `
      case "outline":
        return css`
          background: transparent;
          color: #6b7280;
          border: 1px solid #d1d5db;
        `
      default:
        return css`
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.25rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  width: 100%;
  max-width: 32rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  color: #1f2937;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
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
  border-top-color: #10b981;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const ErrorAlert = styled.div`
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(10px);
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

// Replace Mock API with real API calls
// const api = {
//   get: async (url) => ({ data: {} }),
//   post: async (url, data) => ({ data: {} }),
//   put: async (url, data) => ({ data: {} }),
//   delete: async (url) => ({ data: {} }),
// }

export default function ManagerPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [dashboardData, setDashboardData] = useState(null)
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  // User form states
  const [showUserForm, setShowUserForm] = useState(false)
  const [newUser, setNewUser] = useState({ username: "", password: "" })

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
        console.log("Fetching dashboard data...")
        const response = await api.get("/manager/dashboard")
        console.log("Dashboard response:", response.data)
        setDashboardData(response.data)
      } else if (activeTab === "users") {
        console.log("Fetching users data...")
        const response = await api.get("/manager/users")
        console.log("Users response:", response.data)
        setUsers(response.data.users || [])
      } else if (activeTab === "projects") {
        console.log("Fetching projects data...")
        const response = await api.get("/manager/projects")
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
      const response = await api.post("/manager/users", newUser)
      setUsers([...users, response.data.user])
      setShowUserForm(false)
      setNewUser({ username: "", password: "" })
    } catch (error) {
      setError(error.response?.data?.error || "Failed to create user")
    }
  }

  const handleEditUser = async () => {
    if (!editUser) return
    try {
      const updateData = {}
      if (editUser.newPassword) updateData.password = editUser.newPassword
      const response = await api.put(`/manager/users/${editUser._id}`, updateData)
      setUsers(users.map((user) => (user._id === editUser._id ? response.data.user : user)))
      setShowEditForm(false)
      setEditUser(null)
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update user")
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/manager/users/${userId}`)
        setUsers(users.filter((user) => user._id !== userId))
      } catch (error) {
        setError(error.response?.data?.error || "Failed to delete user")
      }
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${projectId}`)
        setProjects(projects.filter((project) => project.id !== projectId))
        // If we're viewing this project, go back to projects list
        if (selectedProject && selectedProject.id === projectId) {
          setSelectedProject(null)
        }
      } catch (error) {
        setError(error.response?.data?.error || "Failed to delete project")
      }
    }
  }

  const handleViewProjectDetails = async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`)
      setSelectedProject(response.data.project)
    } catch (error) {
      setError(error.response?.data?.error || "Failed to fetch project details")
    }
  }

  const handleStartEditUser = (user) => {
    setEditUser({ _id: user._id, username: user.username, newPassword: "" })
    setShowEditForm(true)
  }

  const handleLogout = async () => {
    try {
      await api.post("/logout")
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      // Even if logout fails, redirect to login
      navigate("/login")
    }
  }

  const renderDashboard = () => {
    if (!dashboardData) return null

    const stats = dashboardData.stats || {}
    const recentProjects = dashboardData.managed_projects?.recent || []
    const recentUsers = dashboardData.assigned_users?.recent || []

    const statsData = [
      { 
        title: "Total Projects", 
        value: stats.total_projects || 0, 
        icon: FolderOpen, 
        color: "#10b981",
        bgColor: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))"
      },
      { 
        title: "Assigned Users", 
        value: stats.total_assigned_users || 0, 
        icon: UserCheck, 
        color: "#3b82f6",
        bgColor: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))"
      },
      { 
        title: "Total Requirements", 
        value: stats.total_requirements || 0, 
        icon: BarChart3, 
        color: "#8b5cf6",
        bgColor: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1))"
      },
      { 
        title: "Collaborations", 
        value: stats.total_collaborations || 0, 
        icon: Users, 
        color: "#f59e0b",
        bgColor: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))"
      },
    ]

    return (
      <AnimatedDiv>
        <PageTitle>Manager Dashboard</PageTitle>
        <PageSubtitle>Overview of your managed resources and recent activity</PageSubtitle>

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
                        <TableHeaderCell>Created</TableHeaderCell>
                        <TableHeaderCell>Collaborators</TableHeaderCell>
                      </tr>
                    </TableHeader>
                    <tbody>
                      {recentProjects.map((project) => (
                        <TableRow key={project._id || project.id}>
                          <TableCell style={{ fontWeight: 500 }}>{project.name}</TableCell>
                          <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{project.collaborator_details?.length || 0}</Badge>
                          </TableCell>
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

          <AnimatedDiv delay={500}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Users size={20} />
                  Recent User Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentUsers.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Username</TableHeaderCell>
                        <TableHeaderCell>Added</TableHeaderCell>
                      </tr>
                    </TableHeader>
                    <tbody>
                      {recentUsers.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell style={{ fontWeight: 500 }}>{user.username}</TableCell>
                          <TableCell>{user.added_at ? new Date(user.added_at).toLocaleDateString() : "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <EmptyState>
                    <Users size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                    <p>No recent user activity</p>
                  </EmptyState>
                )}
              </CardContent>
            </Card>
          </AnimatedDiv>
        </GridLayout>
      </AnimatedDiv>
    )
  }

  const renderUsers = () => {
    return (
      <AnimatedDiv>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <PageTitle>User Management</PageTitle>
            <PageSubtitle>Manage and monitor your assigned users</PageSubtitle>
          </div>
          <Button variant="primary" glow onClick={() => setShowUserForm(true)}>
            <Plus size={16} />
            Add New User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Managed Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Username</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                  <TableHeaderCell>Projects Assigned</TableHeaderCell>
                  <TableHeaderCell>Created By Me</TableHeaderCell>
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
                        <Badge variant="secondary">{user.projects_assigned || 0} projects</Badge>
                      </TableCell>
                      <TableCell>
                        {user.created_by_me ? (
                          <Badge variant="primary">Yes</Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        <ButtonGroup>
                          <Button variant="outline" size="sm" onClick={() => handleStartEditUser(user)}>
                            <Edit size={14} />
                          </Button>
                          {user.created_by_me && (
                            <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                              <Trash2 size={14} />
                            </Button>
                          )}
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
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <Button variant="outline" onClick={() => setSelectedProject(null)}>
              <ArrowLeft size={16} />
              Back to Projects
            </Button>
            <PageTitle>Project: {selectedProject.name}</PageTitle>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1.5rem" }}>
                <div>
                  <Label>Name</Label>
                  <p style={{ fontSize: "1.125rem", fontWeight: 600, margin: "0.5rem 0 1rem 0" }}>
                    {selectedProject.name}
                  </p>
                  <Label>Owner</Label>
                  <p style={{ margin: "0.5rem 0 1rem 0" }}>{selectedProject.user}</p>
                  <Label>Created</Label>
                  <p style={{ margin: "0.5rem 0" }}>{new Date(selectedProject.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Requirements</Label>
                  <p style={{ margin: "0.5rem 0 1rem 0" }}>{selectedProject.requirements?.length || 0}</p>
                  <Label>Collaborators</Label>
                  <p style={{ margin: "0.5rem 0" }}>{selectedProject.collaborator_details?.length || 0}</p>
                </div>
              </div>

              {selectedProject.context && (
                <div>
                  <Label>Context</Label>
                  <div
                    style={{
                      marginTop: "0.5rem",
                      padding: "1rem",
                      background: "rgba(255, 255, 255, 0.5)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {selectedProject.context}
                  </div>
                </div>
              )}

              <div style={{ marginTop: "1.5rem" }}>
                <Button
                  variant="danger"
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
          </Card>

          {selectedProject.collaborator_details && selectedProject.collaborator_details.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Collaborators ({selectedProject.collaborator_details.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHeaderCell>Username</TableHeaderCell>
                      <TableHeaderCell>Email</TableHeaderCell>
                      <TableHeaderCell>Added Date</TableHeaderCell>
                    </tr>
                  </TableHeader>
                  <tbody>
                    {selectedProject.collaborator_details.map((collab) => (
                      <TableRow key={collab._id}>
                        <TableCell>{collab.username}</TableCell>
                        <TableCell>{collab.email}</TableCell>
                        <TableCell>
                          {collab.added_at ? new Date(collab.added_at).toLocaleDateString() : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </CardContent>
            </Card>
          )}
        </AnimatedDiv>
      )
    }

    return (
      <AnimatedDiv>
        <PageTitle>Project Management</PageTitle>
        <PageSubtitle>Manage and monitor your projects</PageSubtitle>

        <Card>
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Created</TableHeaderCell>
                  <TableHeaderCell>Requirements</TableHeaderCell>
                  <TableHeaderCell>Collaborators</TableHeaderCell>
                  <TableHeaderCell style={{ textAlign: "right" }}>Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <TableCell colSpan={5}>
                      <EmptyState>
                        <FolderOpen size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                        <p>No projects found. Create projects from the main dashboard.</p>
                      </EmptyState>
                    </TableCell>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell style={{ fontWeight: 500 }}>{project.name}</TableCell>
                      <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{project.requirements_count || 0}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{project.collaborator_count || 0}</Badge>
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
          <Logo>Manager Panel - AI Test Case Generator</Logo>
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
            <NavButton onClick={() => navigate("/dashboard")}>Main Dashboard</NavButton>
            <NavButton onClick={handleLogout}>Logout</NavButton>
          </NavContainer>
        </HeaderContainer>
      </Header>

      <MainContent>
        {isLoading ? (
          <LoadingContainer>
            <LoadingSpinner />
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}>Loading data...</p>
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