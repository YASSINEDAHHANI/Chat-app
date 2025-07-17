import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import api from "../api"
import logoImage from "../shared-theme/logo-test-case.png"
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background: rgba(90, 32, 155, 0.05);
    transform: translateY(-1px);
  }

  img {
    height: 2rem;
    width: auto;
  }
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
  background-color: ${(props) => (props.active ? "#5a209b" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#6b7280")};

  &:hover {
    background-color: ${(props) => (props.active ? "#4c1d87" : "#f3f4f6")};
    color: ${(props) => (props.active ? "white" : "#5a209b")};
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
  color: ${(props) => props.color || "#1f2937"};
  margin: 0;
  line-height: 1;
`

const StatIcon = styled.div`
  height: 3rem;
  width: 3rem;
  background: ${(props) => props.bgColor || "rgba(107, 114, 128, 0.1)"};
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
  padding: ${(props) => (props.size === "sm" ? "0.375rem 0.75rem" : "0.625rem 1.25rem")};
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: ${(props) => (props.size === "sm" ? "0.75rem" : "0.875rem")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  /* Variant styles using JavaScript function */
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return css`
          background: linear-gradient(135deg, #5a209b 0%, #7c3aed 100%);
          color: white;
          &:hover { 
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(90, 32, 155, 0.4);
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
            color: #5a209b;
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

  ${(props) =>
    props.glow &&
    css`
    &:hover {
      box-shadow: 0 0 20px rgba(90, 32, 155, 0.6);
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
    background: linear-gradient(135deg, rgba(90, 32, 155, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
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
  
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return css`
          background: linear-gradient(135deg, rgba(90, 32, 155, 0.2) 0%, rgba(90, 32, 155, 0.1) 100%);
          color: #5a209b;
          border: 1px solid rgba(90, 32, 155, 0.3);
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
  background: linear-gradient(135deg, #5a209b 0%, #7c3aed 100%);
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
    border-color: #5a209b;
    box-shadow: 0 0 0 3px rgba(90, 32, 155, 0.1);
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
  border-top-color: #5a209b;
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
  animation-delay: ${(props) => props.delay || 0}ms;
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
  const [userFormError, setUserFormError] = useState("")

  // Edit user form states
  const [showEditForm, setShowEditForm] = useState(false)
  const [editUser, setEditUser] = useState(null)

  // Confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState("")

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (activeTab === "dashboard") {
        console.log("Récupération des données du tableau de bord...")
        const response = await api.get("/manager/dashboard")
        console.log("Réponse du tableau de bord:", response.data)
        setDashboardData(response.data)
      } else if (activeTab === "users") {
        console.log("Récupération des données utilisateurs...")
        const response = await api.get("/manager/users")
        console.log("Réponse utilisateurs:", response.data)
        setUsers(response.data.users || [])
      } else if (activeTab === "projects") {
        console.log("Récupération des données projets...")
        const response = await api.get("/manager/projects")
        console.log("Réponse projets:", response.data)
        setProjects(response.data.projects || [])
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error)
      setError(error.response?.data?.error || `Échec de la récupération des données ${activeTab}`)

      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Email validation regex
  // Regex stricte pour email (lettres, chiffres, points, tirets, etc. et domaine correct)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleCreateUser = async () => {
    setUserFormError("")
    if (!emailRegex.test(newUser.username)) {
      setUserFormError("Veuillez saisir un email valide.")
      return
    }
    try {
      const response = await api.post("/manager/users", newUser)
      setUsers([...users, response.data.user])
      setShowUserForm(false)
      setNewUser({ username: "", password: "" })
    } catch (error) {
      setError(error.response?.data?.error || "Échec de la création de l'utilisateur")
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
      setError(error.response?.data?.error || "Échec de la mise à jour de l'utilisateur")
    }
  }

  // Confirmation modale pour suppression utilisateur
  const handleDeleteUser = (userId) => {
    setConfirmMessage("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    setShowConfirmModal(true)
    setConfirmAction(() => async () => {
      try {
        await api.delete(`/manager/users/${userId}`)
        setUsers(users.filter((user) => user._id !== userId))
      } catch (error) {
        setError(error.response?.data?.error || "Échec de la suppression de l'utilisateur")
      } finally {
        setShowConfirmModal(false)
        setConfirmAction(null)
      }
    })
  }

  // Confirmation modale pour suppression projet
  const handleDeleteProject = (projectId) => {
    setConfirmMessage("Êtes-vous sûr de vouloir supprimer ce projet ?")
    setShowConfirmModal(true)
    setConfirmAction(() => async () => {
      try {
        await api.delete(`/projects/${projectId}`)
        setProjects(projects.filter((project) => project.id !== projectId))
        if (selectedProject && selectedProject.id === projectId) {
          setSelectedProject(null)
        }
      } catch (error) {
        setError(error.response?.data?.error || "Échec de la suppression du projet")
      } finally {
        setShowConfirmModal(false)
        setConfirmAction(null)
      }
    })
  }

  const handleViewProjectDetails = async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`)
      setSelectedProject(response.data.project)
    } catch (error) {
      setError(error.response?.data?.error || "Échec de la récupération des détails du projet")
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
      console.error("Échec de la déconnexion:", error)
      // Even if logout fails, redirect to login
      navigate("/login")
    }
  }

  const handleLogoClick = () => {
    navigate("/dashboard")
  }

  const renderDashboard = () => {
    if (!dashboardData) return null

    const stats = dashboardData.stats || {}
    const recentProjects = dashboardData.managed_projects?.recent || []
    const recentUsers = dashboardData.assigned_users?.recent || []

    const statsData = [
      {
        title: "Total des projets",
        value: stats.total_projects || 0,
        icon: FolderOpen,
        color: "#5a209b",
        bgColor: "linear-gradient(135deg, rgba(90, 32, 155, 0.2), rgba(90, 32, 155, 0.1))",
      },
      {
        title: "Utilisateurs assignés",
        value: stats.total_assigned_users || 0,
        icon: UserCheck,
        color: "#7c3aed",
        bgColor: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(124, 58, 237, 0.1))",
      },
      {
        title: "Total des exigences",
        value: stats.total_requirements || 0,
        icon: BarChart3,
        color: "#a855f7",
        bgColor: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.1))",
      },
      {
        title: "Collaborations",
        value: stats.total_collaborations || 0,
        icon: Users,
        color: "#c084fc",
        bgColor: "linear-gradient(135deg, rgba(192, 132, 252, 0.2), rgba(192, 132, 252, 0.1))",
      },
    ]

    return (
      <AnimatedDiv>
        <PageTitle>Tableau de bord Manager</PageTitle>
        <PageSubtitle>Vue d'ensemble de vos ressources gérées et de l'activité récente</PageSubtitle>

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
                  Projets récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentProjects.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Nom</TableHeaderCell>
                        <TableHeaderCell>Créé</TableHeaderCell>
                        <TableHeaderCell>Collaborateurs</TableHeaderCell>
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
                    <p>Aucun projet récent</p>
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
                  Activité utilisateur récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentUsers.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Nom d'utilisateur</TableHeaderCell>
                        <TableHeaderCell>Ajouté</TableHeaderCell>
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
                    <p>Aucune activité utilisateur récente</p>
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
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}
        >
          <div>
            <PageTitle>Gestion des utilisateurs</PageTitle>
            <PageSubtitle>Gérez et surveillez vos utilisateurs assignés</PageSubtitle>
          </div>
          <Button variant="primary" glow onClick={() => setShowUserForm(true)}>
            <Plus size={16} />
            Ajouter un nouvel utilisateur
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs gérés</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Nom d'utilisateur</TableHeaderCell>
                  <TableHeaderCell>Projets assignés</TableHeaderCell>
                  <TableHeaderCell>Créé par moi</TableHeaderCell>
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
                      <TableCell>
                        <Badge variant="secondary">{user.projects_assigned || 0} projets</Badge>
                      </TableCell>
                      <TableCell>
                        {user.created_by_me ? (
                          <Badge variant="primary">Oui</Badge>
                        ) : (
                          <Badge variant="outline">Non</Badge>
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
              Retour aux projets
            </Button>
            <PageTitle>Projet : {selectedProject.name}</PageTitle>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1.5rem" }}>
                <div>
                  <Label>Nom</Label>
                  <p style={{ fontSize: "1.125rem", fontWeight: 600, margin: "0.5rem 0 1rem 0" }}>
                    {selectedProject.name}
                  </p>
                  <Label>Propriétaire</Label>
                  <p style={{ margin: "0.5rem 0 1rem 0" }}>{selectedProject.user}</p>
                  <Label>Créé</Label>
                  <p style={{ margin: "0.5rem 0" }}>{new Date(selectedProject.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Exigences</Label>
                  <p style={{ margin: "0.5rem 0 1rem 0" }}>{selectedProject.requirements?.length || 0}</p>
                  <Label>Collaborateurs</Label>
                  <p style={{ margin: "0.5rem 0" }}>{selectedProject.collaborator_details?.length || 0}</p>
                </div>
              </div>

              {selectedProject.context && (
                <div>
                  <Label>Contexte</Label>
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
                  Supprimer le projet
                </Button>
              </div>
            </CardContent>
          </Card>

          {selectedProject.collaborator_details && selectedProject.collaborator_details.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Collaborateurs ({selectedProject.collaborator_details.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHeaderCell>Nom d'utilisateur</TableHeaderCell>
                      <TableHeaderCell>Email</TableHeaderCell>
                      <TableHeaderCell>Date d'ajout</TableHeaderCell>
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
        <PageTitle>Gestion des projets</PageTitle>
        <PageSubtitle>Gérez et surveillez vos projets</PageSubtitle>

        <Card>
          <CardHeader>
            <CardTitle>Mes projets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Nom</TableHeaderCell>
                  <TableHeaderCell>Créé</TableHeaderCell>
                  <TableHeaderCell>Exigences</TableHeaderCell>
                  <TableHeaderCell>Collaborateurs</TableHeaderCell>
                  <TableHeaderCell style={{ textAlign: "right" }}>Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <TableCell colSpan={5}>
                      <EmptyState>
                        <FolderOpen size={48} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                        <p>Aucun projet trouvé. Créez des projets depuis le tableau de bord principal.</p>
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
          <Logo onClick={handleLogoClick}>
            <img src={logoImage} alt="Logo DXC" />
          </Logo>
          <NavContainer>
            <NavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>Tableau de bord</NavButton>
            <NavButton active={activeTab === "users"} onClick={() => setActiveTab("users")}>Utilisateurs</NavButton>
            <NavButton active={activeTab === "projects"} onClick={() => setActiveTab("projects")}>Projets</NavButton>
            <NavButton onClick={() => navigate("/dashboard")}>Gestion projet</NavButton>
            <NavButton onClick={handleLogout}>Déconnexion</NavButton>
          </NavContainer>
        </HeaderContainer>
      </Header>

      <MainContent>
        {isLoading ? (
          <LoadingContainer>
            <LoadingSpinner />
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}>Chargement des données...</p>
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
            <ModalTitle>Créer un nouvel utilisateur</ModalTitle>
            <FormGroup>
              <Label htmlFor="username">Nom d'utilisateur/Email</Label>
              <Input
                id="username"
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Entrez le nom d'utilisateur/email"
              />
              {userFormError && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: 4 }}>{userFormError}</div>}
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
            <ModalFooter>
              <Button variant="outline" onClick={() => setShowUserForm(false)}>
                Annuler
              </Button>
              <Button variant="primary" onClick={handleCreateUser} disabled={!newUser.username || !newUser.password}>
                Créer l'utilisateur
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <Modal onClick={() => setShowConfirmModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>Confirmation</ModalTitle>
            <p style={{ marginBottom: 24 }}>{confirmMessage}</p>
            <ModalFooter>
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>Annuler</Button>
              <Button variant="danger" onClick={() => { if (confirmAction) confirmAction() }}>Confirmer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Edit User Modal */}
      {showEditForm && editUser && (
        <Modal onClick={() => setShowEditForm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Modifier l'utilisateur : {editUser.username}</ModalTitle>
            <FormGroup>
              <Label htmlFor="edit-password">Nouveau mot de passe (laisser vide pour conserver l'actuel)</Label>
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
                Enregistrer les modifications
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}
