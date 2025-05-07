import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Ensure credentials are sent with requests
axios.defaults.withCredentials = true;

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add states for user form
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    role: 'user'
  });
  
  // State for project details
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Add state for hovered button
  const [hoveredButton, setHoveredButton] = useState(null);

  // CSS styles
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    header: {
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#1e40af',
      color: 'white',
    },
    headerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      height: '4rem',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    navLinks: {
      display: 'flex',
      gap: '1rem',
    },
    navLink: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: 'white',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    navLinkHover: {
      textDecoration: 'underline',
    },
    mainContent: {
      flex: '1',
      backgroundColor: '#f9fafb',
    },
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1.5rem 1rem',
    },
    pageTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#111827',
    },
    tabsContainer: {
      display: 'flex',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '1.5rem',
    },
    tab: {
      padding: '0.75rem 1rem',
      fontWeight: '500',
      color: '#6b7280',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
    },
    tabActive: {
      color: '#1e40af',
      borderBottom: '2px solid #1e40af',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      marginBottom: '1rem',
      color: '#111827',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1e40af',
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginTop: '0.5rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHead: {
      backgroundColor: '#f9fafb',
    },
    tableHeaderCell: {
      padding: '0.75rem 1rem',
      textAlign: 'left',
      fontWeight: '500',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb',
    },
    tableCell: {
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #e5e7eb',
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      fontSize: '0.875rem',
      border: 'none',
      cursor: 'pointer',
    },
    primaryButton: {
      backgroundColor: '#1e40af',
      color: 'white',
    },
    dangerButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      marginLeft: '0.5rem',
    },
    secondaryButton: {
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #d1d5db',
    },
    buttonContainer: {
      display: 'flex',
      gap: '0.5rem',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '1.5rem',
      width: '100%',
      maxWidth: '32rem',
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: '500',
      marginBottom: '1rem',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
    },
    select: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      backgroundColor: 'white',
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      marginTop: '1.5rem',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.125rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
    },
    adminBadge: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
    },
    userBadge: {
      backgroundColor: '#e0e7ff',
      color: '#4f46e5',
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
    },
    errorContainer: {
      backgroundColor: '#fee2e2',
      padding: '1rem',
      borderRadius: '0.375rem',
      color: '#b91c1c',
      marginBottom: '1.5rem',
    },
    detailsSection: {
      marginTop: '1.5rem',
      borderTop: '1px solid #e5e7eb',
      paddingTop: '1.5rem',
    },
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#4b5563',
      marginBottom: '1rem',
      cursor: 'pointer',
    },
    sectionTitle: {
      fontSize: '1rem',
      fontWeight: '500',
      marginBottom: '0.75rem',
      color: '#111827',
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch data based on active tab
      if (activeTab === 'dashboard') {
        const response = await axios.get('/admin/dashboard');
        setDashboardData(response.data);
      } else if (activeTab === 'users') {
        const response = await axios.get('/admin/users');
        setUsers(response.data.users);
      } else if (activeTab === 'projects') {
        const response = await axios.get('/admin/projects');
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.error || 'An error occurred');
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('/admin/users', newUser);
      setUsers([...users, response.data.user]);
      setShowUserForm(false);
      setNewUser({
        username: '',
        password: '',
        email: '',
        role: 'user'
      });
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.response?.data?.error || 'Failed to create user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/admin/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        setError(error.response?.data?.error || 'Failed to delete user');
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/admin/projects/${projectId}`);
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
        setError(error.response?.data?.error || 'Failed to delete project');
      }
    }
  };

  const handleViewProjectDetails = async (projectId) => {
    try {
      const response = await axios.get(`/admin/projects/${projectId}`);
      setSelectedProject(response.data.project);
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError(error.response?.data?.error || 'Failed to fetch project details');
    }
  };

  const handleViewUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/admin/users/${userId}`);
      setSelectedUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError(error.response?.data?.error || 'Failed to fetch user details');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderUsers = () => {
    if (selectedUser) {
      return (
        <div>
          <div style={styles.backLink} onClick={() => setSelectedUser(null)}>
            ← Back to users list
          </div>
          
          <h2 style={styles.pageTitle}>User Details: {selectedUser.username}</h2>
          
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>User Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Email:</strong> {selectedUser.email || selectedUser.username}</p>
                <p><strong>Role:</strong> 
                  <span style={{
                    ...styles.badge,
                    ...(selectedUser.role === 'admin' ? styles.adminBadge : styles.userBadge),
                    marginLeft: '0.5rem'
                  }}>
                    {selectedUser.role || 'user'}
                  </span>
                </p>
              </div>
              <div>
                <p><strong>Created:</strong> {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : 'N/A'}</p>
                <p><strong>Created By:</strong> {selectedUser.created_by || 'N/A'}</p>
                <p><strong>Last Updated:</strong> {selectedUser.updated_at ? new Date(selectedUser.updated_at).toLocaleString() : 'N/A'}</p>
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                style={{ ...styles.button, ...styles.primaryButton }}
                // Edit user functionality would go here
              >
                Edit User
              </button>
              <button 
                style={{ ...styles.button, ...styles.dangerButton }}
                onClick={() => {
                  handleDeleteUser(selectedUser._id);
                  setSelectedUser(null);
                }}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <h2 style={styles.pageTitle}>User Management</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={() => setShowUserForm(true)}
          >
            Add New User
          </button>
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>All Users</h3>
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
                <tr key={user._id}>
                  <td style={styles.tableCell}>{user.username}</td>
                  <td style={styles.tableCell}>{user.email || user.username}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.badge,
                      ...(user.role === 'admin' ? styles.adminBadge : styles.userBadge)
                    }}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    {user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.buttonContainer}>
                      <button 
                        style={{ ...styles.button, ...styles.secondaryButton, padding: '0.25rem 0.5rem' }}
                        onClick={() => handleViewUserDetails(user._id)}
                      >
                        View
                      </button>
                      <button 
                        style={{ ...styles.button, ...styles.dangerButton, padding: '0.25rem 0.5rem' }}
                        onClick={() => handleDeleteUser(user._id)}
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
    );
  };
  
  const renderProjects = () => {
    if (selectedProject) {
      return (
        <div>
          <div style={styles.backLink} onClick={() => setSelectedProject(null)}>
            ← Back to projects list
          </div>
          
          <h2 style={styles.pageTitle}>Project Details: {selectedProject.name}</h2>
          
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Project Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p><strong>Name:</strong> {selectedProject.name}</p>
                <p><strong>Owner:</strong> {selectedProject.user}</p>
                <p><strong>ID:</strong> {selectedProject.id}</p>
              </div>
              <div>
                <p><strong>Created:</strong> {new Date(selectedProject.created_at).toLocaleString()}</p>
                <p><strong>Last Updated:</strong> {selectedProject.updated_at ? new Date(selectedProject.updated_at).toLocaleString() : 'N/A'}</p>
                <p><strong>Collaborators:</strong> {
                  selectedProject.collaborators?.length || 0
                }</p>
              </div>
            </div>
            
            <div style={styles.detailsSection}>
              <h4 style={styles.sectionTitle}>Project Context</h4>
              <p style={{ whiteSpace: 'pre-wrap' }}>{selectedProject.context || 'No context provided'}</p>
            </div>
            
            {selectedProject.collaborator_details && selectedProject.collaborator_details.length > 0 && (
              <div style={styles.detailsSection}>
                <h4 style={styles.sectionTitle}>Collaborators</h4>
                <table style={styles.table}>
                  <thead style={styles.tableHead}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Username</th>
                      <th style={styles.tableHeaderCell}>Email</th>
                      <th style={styles.tableHeaderCell}>Added By</th>
                      <th style={styles.tableHeaderCell}>Added At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProject.collaborator_details.map((collab) => (
                      <tr key={collab._id}>
                        <td style={styles.tableCell}>{collab.username}</td>
                        <td style={styles.tableCell}>{collab.email}</td>
                        <td style={styles.tableCell}>{collab.added_by}</td>
                        <td style={styles.tableCell}>
                          {collab.added_at ? new Date(collab.added_at).toLocaleString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                style={{ ...styles.button, ...styles.dangerButton }}
                onClick={() => {
                  handleDeleteProject(selectedProject.id);
                  setSelectedProject(null);
                }}
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <h2 style={styles.pageTitle}>Project Management</h2>
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>All Projects</h3>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeaderCell}>Name</th>
                <th style={styles.tableHeaderCell}>Owner</th>
                <th style={styles.tableHeaderCell}>Created</th>
                <th style={styles.tableHeaderCell}>Collaborators</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td style={styles.tableCell}>{project.name}</td>
                  <td style={styles.tableCell}>{project.user}</td>
                  <td style={styles.tableCell}>
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td style={styles.tableCell}>
                    {project.collaborators?.length || 0}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.buttonContainer}>
                      <button 
                        style={{ ...styles.button, ...styles.secondaryButton, padding: '0.25rem 0.5rem' }}
                        onClick={() => handleViewProjectDetails(project.id)}
                      >
                        View
                      </button>
                      <button 
                        style={{ ...styles.button, ...styles.dangerButton, padding: '0.25rem 0.5rem' }}
                        onClick={() => handleDeleteProject(project.id)}
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
    );
  };
  
  const renderDashboard = () => {
    if (!dashboardData) return null;

    return (
      <div>
        <h2 style={styles.pageTitle}>Admin Dashboard</h2>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statValue}>{dashboardData.users_stats.total}</span>
            <span style={styles.statLabel}>Total Users</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statValue}>{dashboardData.users_stats.by_role.admin || 0}</span>
            <span style={styles.statLabel}>Admin Users</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statValue}>{dashboardData.users_stats.by_role.user || 0}</span>
            <span style={styles.statLabel}>Regular Users</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statValue}>{dashboardData.projects_stats.total}</span>
            <span style={styles.statLabel}>Total Projects</span>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Users</h3>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeaderCell}>Username</th>
                  <th style={styles.tableHeaderCell}>Email</th>
                  <th style={styles.tableHeaderCell}>Role</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recent_users.map((user) => (
                  <tr key={user._id}>
                    <td style={styles.tableCell}>{user.username}</td>
                    <td style={styles.tableCell}>{user.email || user.username}</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.badge,
                        ...(user.role === 'admin' ? styles.adminBadge : styles.userBadge)
                      }}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={{ ...styles.button, ...styles.secondaryButton, padding: '0.25rem 0.5rem' }}
                        onClick={() => handleViewUserDetails(user._id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Projects</h3>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeaderCell}>Name</th>
                  <th style={styles.tableHeaderCell}>Owner</th>
                  <th style={styles.tableHeaderCell}>Created At</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recent_projects.map((project) => (
                  <tr key={project._id}>
                    <td style={styles.tableCell}>{project.name}</td>
                    <td style={styles.tableCell}>{project.user}</td>
                    <td style={styles.tableCell}>
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={{ ...styles.button, ...styles.secondaryButton, padding: '0.25rem 0.5rem' }}
                        onClick={() => handleViewProjectDetails(project.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Top Project Contributors</h3>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeaderCell}>Username</th>
                <th style={styles.tableHeaderCell}>Number of Projects</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.projects_stats.by_user.map((item) => (
                <tr key={item._id}>
                  <td style={styles.tableCell}>{item._id}</td>
                  <td style={styles.tableCell}>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render the user creation form modal
  const renderUserForm = () => {
    if (!showUserForm) return null;

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3 style={styles.modalTitle}>Create New User</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              style={styles.input}
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              placeholder="Username"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              style={styles.input}
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Email address"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              style={styles.input}
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Password"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="role">Role</label>
            <select
              id="role"
              style={styles.select}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div style={styles.modalFooter}>
            <button 
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={() => setShowUserForm(false)}
            >
              Cancel
            </button>
            <button 
              style={{ ...styles.button, ...styles.primaryButton }}
              onClick={handleCreateUser}
              disabled={!newUser.username || !newUser.password}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.logo}>Admin Panel - AI Test Case Generator</h1>
          <div style={styles.navLinks}>
            <button 
              style={{
                ...styles.navLink,
                ...(activeTab === 'dashboard' ? styles.navLinkHover : {})
              }}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              style={{
                ...styles.navLink,
                ...(activeTab === 'users' ? styles.navLinkHover : {})
              }}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button 
              style={{
                ...styles.navLink,
                ...(activeTab === 'projects' ? styles.navLinkHover : {})
              }}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button 
              style={{
                ...styles.navLink,
                ...(hoveredButton === 'logout' ? styles.navLinkHover : {})
              }}
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
        <div style={styles.mainContainer}>
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div>Loading...</div>
            </div>
          ) : error ? (
            <div style={styles.errorContainer}>
              <p>{error}</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'users' && renderUsers()}
              {activeTab === 'projects' && renderProjects()}
            </>
          )}
        </div>
      </main>

      {/* Modal for creating a new user */}
      {renderUserForm()}
    </div>
  );
};

export default AdminPage;