import logoImage from "../shared-theme/logo-test-case.png"
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
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
    height: "2rem",
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
  titleSection: {
    display: "flex",
    alignItems: "center",
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
  newProjectButtonDisabled: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#9ca3af",
    color: "white",
    borderRadius: "0.5rem",
    fontWeight: "500",
    fontSize: "0.875rem",
    border: "none",
    cursor: "not-allowed",
    opacity: 0.6,
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
    boxSizing: "border-box",
  },
  searchInputFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "1.5rem",
  },
  projectCard: {
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
  ownerBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
  },
  collaboratorBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    color: "#f59e0b",
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
    gridColumn: "1 / -1",
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

  // AI Model Badge Styles - NEW
  aiModelBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.25rem 0.5rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    borderRadius: "0.375rem",
    border: "1px solid",
  },
  claudeBadge: {
    backgroundColor: "#f3f4ff",
    color: "#7c3aed",
    borderColor: "#c4b5fd",
  },
  localBadge: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    borderColor: "#93c5fd",
  },
  aiModelIcon: {
    width: "0.875rem",
    height: "0.875rem",
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
    boxSizing: "border-box",
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
    transition: "all 0.2s",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    boxSizing: "border-box",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
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
    boxSizing: "border-box",
  },
  textareaFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 1px #3b82f6",
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
  primaryButtonDisabled: {
    padding: "0.625rem 1.25rem",
    backgroundColor: "#9ca3af",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "not-allowed",
    opacity: 0.6,
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
  // Role indicator styles
  roleIndicator: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    color: "#3b82f6",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginRight: "1rem",
  },
  managerRoleIndicator: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginRight: "1rem",
  },
  adminRoleIndicator: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginRight: "1rem",
  },
  infoAlert: {
    backgroundColor: "#eff6ff",
    borderLeft: "4px solid #3b82f6",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
    color: "#1e40af",
    fontSize: "0.875rem",
  },
  userSelectionContainer: {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
    padding: "1rem",
    backgroundColor: "#f9fafb",
    maxHeight: "200px",
    overflowY: "auto",
  },
  userCheckbox: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    transition: "background-color 0.2s",
    cursor: "pointer",
  },
  userCheckboxHover: {
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
  checkbox: {
    marginRight: "0.5rem",
  },
  userLabel: {
    fontSize: "0.875rem",
    color: "#1f2937",
  },
  selectedUsersDisplay: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.75rem",
  },
  userTag: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: "9999px",
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#3b82f6",
  },
  removeUserButton: {
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
  emptyUsersText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    textAlign: "center",
    padding: "1rem",
  },

  // Settings popup styles
  settingsPopup: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  settingsContent: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "2rem",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  settingsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #e5e7eb",
  },
  settingsTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  closeButtonHover: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },
  settingsSection: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "1rem",
  },
  collaboratorsList: {
    maxHeight: "200px",
    overflowY: "auto",
    border: "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    padding: "0.5rem",
  },
  collaboratorItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem",
    backgroundColor: "#f9fafb",
    borderRadius: "0.375rem",
    marginBottom: "0.5rem",
  },
  collaboratorInfo: {
    display: "flex",
    alignItems: "center",
  },
  collaboratorAvatar: {
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
    color: "#4b5563",
  },
  collaboratorDetails: {
    display: "flex",
    flexDirection: "column",
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
  removeButton: {
    background: "none",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    padding: "0.25rem",
    borderRadius: "0.25rem",
    transition: "all 0.2s",
  },
  removeButtonHover: {
    backgroundColor: "#fee2e2",
  },
  addCollaboratorRow: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  addCollaboratorInput: {
    flex: 1,
    padding: "0.625rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    fontSize: "0.875rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  addButton: {
    padding: "0.625rem 1rem",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  addButtonHover: {
    backgroundColor: "#059669",
  },
  saveButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    marginRight: "0.5rem",
  },
  saveButtonHover: {
    backgroundColor: "#2563eb",
  },
  cancelButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  cancelButtonHover: {
    backgroundColor: "#4b5563",
  },
  readOnlyMessage: {
    backgroundColor: "#fef3c7",
    border: "1px solid #f59e0b",
    borderRadius: "0.5rem",
    padding: "0.75rem",
    fontSize: "0.875rem",
    color: "#92400e",
    marginBottom: "1rem",
  },
}

// Icon components
const PlusIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
)

const SearchIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
)

const CalendarIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
)

const DocumentIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
)

const UsersIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
)

const ClockIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
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

const FolderOpenIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
      clipRule="evenodd"
    />
    <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
  </svg>
)

const LoadingSpinner = ({ style }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      style={{ opacity: 0.75 }}
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

const KeyIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path
      fillRule="evenodd"
      d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
      clipRule="evenodd"
    />
  </svg>
)

const CpuIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={style}>
    <path d="M13 7H7v6h6V7z" />
    <path
      fillRule="evenodd"
      d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
      clipRule="evenodd"
    />
  </svg>
)

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ width: "1rem", height: "1rem" }}
  >
    <path
      fillRule="evenodd"
      d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM10 13a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
)

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ width: "1.25rem", height: "1.25rem" }}
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ width: "1rem", height: "1rem" }}
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
)

// Subcomponents
const Header = ({ userRole, isAdmin, isManager, handleLogout, navigate }) => (
  <header style={styles.header}>
    <div style={styles.headerContainer}>
      <img src={logoImage || "/placeholder.svg"} alt="Logo TestGen" style={styles.logo} />
      <div style={styles.navLinks}>
        {isAdmin && (
          <button style={styles.navLink} onClick={() => navigate("/admin")} aria-label="Panneau d'administration">
            Panneau Admin
          </button>
        )}

        {isManager && !isAdmin && (
          <button style={styles.navLink} onClick={() => navigate("/manager")} aria-label="Panneau manager">
            Panneau Manager
          </button>
        )}
        <button style={styles.navLink} onClick={handleLogout} aria-label="Déconnexion">
          Déconnexion
        </button>
      </div>
    </div>
  </header>
)

const ProjectCard = ({
  project,
  modelInfo,
  hoveredCard,
  setHoveredCard,
  hoveredButton,
  setHoveredButton,
  handleOpenSettings,
}) => {
  const navigate = useNavigate()

  // Helper functions for AI model display
  const getAIModelIcon = (effectiveService) => {
    return effectiveService === "claude" ? (
      <KeyIcon style={styles.aiModelIcon} />
    ) : (
      <CpuIcon style={styles.aiModelIcon} />
    )
  }

  const getAIModelBadgeStyle = (effectiveService) => {
    return effectiveService === "claude"
      ? { ...styles.aiModelBadge, ...styles.claudeBadge }
      : { ...styles.aiModelBadge, ...styles.localBadge }
  }

  const getAIModelDisplayName = (effectiveService) => {
    return effectiveService === "claude" ? "Claude IA" : "RAG Local"
  }

  return (
    <div
      key={project.id}
      style={hoveredCard === project.id ? { ...styles.projectCard, ...styles.cardHover } : styles.projectCard}
      onClick={() => navigate(`/project/${project.id}`)}
      onMouseEnter={() => setHoveredCard(project.id)}
      onMouseLeave={() => setHoveredCard(null)}
      aria-label={`Ouvrir le projet: ${project.name}`}
    >
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>{project.name}</h3>
        <button
          style={
            hoveredButton === `menu-${project.id}`
              ? { ...styles.cardMenuButton, ...styles.cardMenuButtonHover }
              : styles.cardMenuButton
          }
          onClick={(e) => handleOpenSettings(project, e)}
          onMouseEnter={() => setHoveredButton(`menu-${project.id}`)}
          onMouseLeave={() => setHoveredButton(null)}
          aria-label="Paramètres du projet"
        >
          <DotsIcon />
        </button>
      </div>

      <div style={styles.cardContent}>
        <div style={styles.cardRow}>
          <div style={styles.cardItem}>
            <CalendarIcon style={styles.cardIcon} />
            {new Date(project.created_at).toISOString().split("T")[0]}
          </div>
          <div style={styles.cardItem}>
            <DocumentIcon style={styles.cardIcon} />
            {project.test_count || 0} tests
          </div>
        </div>
        <div style={styles.cardRow}>
          <div style={styles.cardItem}>
            <UsersIcon style={styles.cardIcon} />
            {project.collaborators?.length || 0} collaborateurs
          </div>
          {modelInfo ? (
            <div style={getAIModelBadgeStyle(modelInfo.effective_service)}>
              {getAIModelIcon(modelInfo.effective_service)}
              {getAIModelDisplayName(modelInfo.effective_service)}
            </div>
          ) : (
            <div style={getAIModelBadgeStyle("local")}>
              {getAIModelIcon("local")}
              {getAIModelDisplayName("local")}
            </div>
          )}
        </div>
      </div>

      <div style={styles.cardFooter}>
        <div
          style={
            project.is_owner
              ? { ...styles.statusBadge, ...styles.ownerBadge }
              : { ...styles.statusBadge, ...styles.collaboratorBadge }
          }
        >
          {project.is_owner ? "Propriétaire" : "Collaborateur"}
        </div>
      </div>
    </div>
  )
}

const CreateProjectModal = ({
  isDialogOpen,
  setIsDialogOpen,
  newProjectName,
  setNewProjectName,
  projectContext,
  setProjectContext,
  projectLanguage,
  setProjectLanguage,
  userSearchQuery,
  setUserSearchQuery,
  selectedUsers,
  setSelectedUsers,
  isManager,
  isAdmin,
  canCreateProjects,
  focusedInput,
  setFocusedInput,
  hoveredButton,
  setHoveredButton,
  handleCreateProject,
  availableUsers,
  isLoadingUsers,
  fetchAvailableUsers,
}) => {
  if (!isDialogOpen) return null

  // User selection handlers
  const handleUserSelection = (username, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, username])
    } else {
      setSelectedUsers(selectedUsers.filter((user) => user !== username))
    }
  }

  const removeSelectedUser = (username) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== username))
  }

  return (
    <div style={styles.modal}>
      <div style={styles.modalOverlay} onClick={() => setIsDialogOpen(false)}></div>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Créer un Nouveau Projet</h3>
          <p style={styles.modalDesc}>
            {isManager || isAdmin
              ? "Créez un projet et assignez des utilisateurs pour collaborer dessus."
              : "Créez un nouveau projet pour la génération de cas de test."}
          </p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="project-name">
            Nom du Projet*
          </label>
          <input
            id="project-name"
            required
            style={focusedInput === "projectName" ? { ...styles.input, ...styles.inputFocus } : styles.input}
            placeholder="Entrez le nom du projet"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onFocus={() => setFocusedInput("projectName")}
            onBlur={() => setFocusedInput(null)}
            aria-required="true"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="project-context">
            Context du Projet*
          </label>
          <textarea
            id="project-context"
            rows={4}
            required
            style={
              focusedInput === "projectContext" ? { ...styles.textarea, ...styles.textareaFocus } : styles.textarea
            }
            placeholder="Décrivez les exigences fonctionnelles du projet..."
            value={projectContext}
            onChange={(e) => setProjectContext(e.target.value)}
            onFocus={() => setFocusedInput("projectContext")}
            onBlur={() => setFocusedInput(null)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="project-language">
            Langue du Projet
          </label>
          <select
            id="project-language"
            style={focusedInput === "projectLanguage" ? { ...styles.select, ...styles.selectFocus } : styles.select}
            value={projectLanguage}
            onChange={(e) => setProjectLanguage(e.target.value)}
            onFocus={() => setFocusedInput("projectLanguage")}
            onBlur={() => setFocusedInput(null)}
          >
            <option value="en">Anglais</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {(isManager || isAdmin) && (
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Assigner des Utilisateurs</label>
            <p style={styles.helperText}>
              Sélectionnez les utilisateurs à assigner comme collaborateurs sur ce projet.
            </p>

            {isLoadingUsers ? (
              <div style={styles.loadingContainer}>
                <LoadingSpinner style={styles.loadingSpinner} />
                <span style={styles.loadingText}>Chargement des utilisateurs...</span>
              </div>
            ) : (
              <>
                <div style={{ ...styles.searchContainer, marginBottom: "0.75rem" }}>
                  <SearchIcon style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Rechercher des utilisateurs..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    style={
                      focusedInput === "userSearch"
                        ? { ...styles.searchInput, ...styles.searchInputFocus }
                        : styles.searchInput
                    }
                    onFocus={() => setFocusedInput("userSearch")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>

                <div style={styles.userSelectionContainer}>
                  {availableUsers.length === 0 ? (
                    <p style={styles.emptyUsersText}>Aucun utilisateur disponible pour l'assignation</p>
                  ) : (
                    (() => {
                      const filteredUsers = availableUsers.filter(
                        (user) =>
                          !userSearchQuery ||
                          (user.email && user.email.toLowerCase().includes(userSearchQuery.toLowerCase())) ||
                          (user.username && user.username.toLowerCase().includes(userSearchQuery.toLowerCase())),
                      )

                      return filteredUsers.length === 0 ? (
                        <p style={styles.emptyUsersText}>
                          Aucun utilisateur trouvé correspondant à "{userSearchQuery}"
                        </p>
                      ) : (
                        filteredUsers.map((user) => (
                          <div
                            key={user.username}
                            style={styles.userCheckbox}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                          >
                            <input
                              type="checkbox"
                              style={styles.checkbox}
                              checked={selectedUsers.includes(user.username)}
                              onChange={(e) => handleUserSelection(user.username, e.target.checked)}
                              aria-label={`Sélectionner l'utilisateur ${user.username}`}
                            />
                            <span style={styles.userLabel}>{user.email || user.username}</span>
                          </div>
                        ))
                      )
                    })()
                  )}
                </div>
              </>
            )}

            {selectedUsers.length > 0 && (
              <div style={styles.selectedUsersDisplay}>
                {selectedUsers.map((username) => (
                  <span key={username} style={styles.userTag}>
                    {username}
                    <button
                      type="button"
                      style={styles.removeUserButton}
                      onClick={() => removeSelectedUser(username)}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(59, 130, 246, 0.2)")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                      aria-label={`Retirer l'utilisateur ${username}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={styles.modalFooter}>
          <div></div>
          <div style={styles.modalFooterButtons}>
            <button
              type="button"
              style={
                hoveredButton === "cancel"
                  ? { ...styles.outlineButton, ...styles.outlineButtonHover }
                  : styles.outlineButton
              }
              onClick={() => {
                setIsDialogOpen(false)
                setNewProjectName("")
                setProjectContext("")
                setSelectedUsers([])
                setUserSearchQuery("")
                setProjectLanguage("en")
              }}
              onMouseEnter={() => setHoveredButton("cancel")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Annuler la création du projet"
            >
              Annuler
            </button>
            <button
              type="button"
              style={
                !newProjectName.trim()
                  ? styles.primaryButtonDisabled
                  : hoveredButton === "create"
                    ? { ...styles.primaryButton, ...styles.primaryButtonHover }
                    : styles.primaryButton
              }
              onClick={handleCreateProject}
              disabled={!newProjectName.trim()}
              onMouseEnter={() => setHoveredButton("create")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Créer le projet"
            >
              Créer le Projet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectSettingsModal = ({
  selectedSettingsProject,
  setSelectedSettingsProject,
  isSettingsPopupOpen,
  setIsSettingsPopupOpen,
  editedProjectName,
  setEditedProjectName,
  editedProjectContext,
  setEditedProjectContext,
  editedProjectLanguage,
  setEditedProjectLanguage,
  projectCollaborators,
  setProjectCollaborators,
  newCollaboratorEmail,
  setNewCollaboratorEmail,
  isLoadingSettings,
  setIsLoadingSettings,
  userRole,
  hoveredButton,
  setHoveredButton,
  focusedInput,
  setFocusedInput,
  fetchProjects,
  fetchProjectCollaborators,
  fetchAvailableUsers,
  isManager,
  isAdmin,
}) => {
  const navigate = useNavigate()

  if (!isSettingsPopupOpen || !selectedSettingsProject) return null

  // Project settings handlers
  const handleSaveSettings = async () => {
    if (!selectedSettingsProject) return

    setIsLoadingSettings(true)

    try {
      await api.put(`/projects/${selectedSettingsProject.id}`, {
        name: editedProjectName,
        context: editedProjectContext,
        language: editedProjectLanguage,
      })

      await fetchProjects()
      setIsSettingsPopupOpen(false)
      setSelectedSettingsProject(null)
    } catch (error) {
      console.error("Error saving project settings:", error)
      alert("Échec de l'enregistrement des paramètres du projet")
    } finally {
      setIsLoadingSettings(false)
    }
  }

  const handleAddCollaborator = async () => {
    if (!newCollaboratorEmail.trim() || !selectedSettingsProject) return

    try {
      await api.post(`/projects/${selectedSettingsProject.id}/collaborators`, {
        email: newCollaboratorEmail.trim(),
      })

      await fetchProjectCollaborators(selectedSettingsProject.id)
      setNewCollaboratorEmail("")
      await fetchProjects()
    } catch (error) {
      console.error("Error adding collaborator:", error)
      alert(error.response?.data?.error || "Échec de l'ajout du collaborateur")
    }
  }

  const handleRemoveCollaborator = async (collaboratorId) => {
    if (!selectedSettingsProject) return

    try {
      await api.delete(`/collaborators/${collaboratorId}`)
      await fetchProjectCollaborators(selectedSettingsProject.id)
      await fetchProjects()
    } catch (error) {
      console.error("Error removing collaborator:", error)
      alert("Échec de la suppression du collaborateur")
    }
  }

  const handleCloseSettings = () => {
    setIsSettingsPopupOpen(false)
    setSelectedSettingsProject(null)
    setEditedProjectName("")
    setEditedProjectContext("")
    setEditedProjectLanguage("en")
    setProjectCollaborators([])
    setNewCollaboratorEmail("")
  }

  return (
    <div style={styles.settingsPopup}>
      <div style={styles.settingsContent}>
        <div style={styles.settingsHeader}>
          <h2 style={styles.settingsTitle}>Paramètres du Projet</h2>
          <button
            style={
              hoveredButton === "close-settings"
                ? { ...styles.closeButton, ...styles.closeButtonHover }
                : styles.closeButton
            }
            onClick={handleCloseSettings}
            onMouseEnter={() => setHoveredButton("close-settings")}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Fermer les paramètres"
          >
            <XIcon />
          </button>
        </div>

        {isLoadingSettings ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <LoadingSpinner style={{ width: "2rem", height: "2rem", margin: "0 auto" }} />
            <p style={{ marginTop: "1rem", color: "#6b7280" }}>Chargement des paramètres...</p>
          </div>
        ) : (
          <>
            <div style={styles.settingsSection}>
              <h3 style={styles.sectionTitle}>
                <SettingsIcon style={{ marginRight: "0.5rem", display: "inline-block" }} />
                Détails du Projet
              </h3>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Nom du Projet</label>
                <input
                  type="text"
                  value={editedProjectName}
                  onChange={(e) => setEditedProjectName(e.target.value)}
                  style={focusedInput === "editName" ? { ...styles.input, ...styles.inputFocus } : styles.input}
                  onFocus={() => setFocusedInput("editName")}
                  onBlur={() => setFocusedInput(null)}
                  disabled={!selectedSettingsProject.is_owner && userRole !== "admin"}
                  aria-disabled={!selectedSettingsProject.is_owner && userRole !== "admin"}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Langue</label>
                  <select
                    value={editedProjectLanguage}
                    onChange={(e) => setEditedProjectLanguage(e.target.value)}
                    style={
                      focusedInput === "editLanguage" ? { ...styles.select, ...styles.selectFocus } : styles.select
                    }
                    onFocus={() => setFocusedInput("editLanguage")}
                    onBlur={() => setFocusedInput(null)}
                    disabled={!selectedSettingsProject.is_owner && userRole !== "admin"}
                    aria-disabled={!selectedSettingsProject.is_owner && userRole !== "admin"}
                  >
                    <option value="en">Anglais</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Propriétaire</label>
                  <div
                    style={{
                      padding: "0.625rem 0.75rem",
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      color: "#6b7280",
                    }}
                  >
                    {selectedSettingsProject.user}
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Description</label>
                <textarea
                  value={editedProjectContext}
                  onChange={(e) => setEditedProjectContext(e.target.value)}
                  rows={4}
                  style={
                    focusedInput === "editContext" ? { ...styles.textarea, ...styles.textareaFocus } : styles.textarea
                  }
                  onFocus={() => setFocusedInput("editContext")}
                  onBlur={() => setFocusedInput(null)}
                  disabled={!selectedSettingsProject.is_owner && userRole !== "admin"}
                  aria-disabled={!selectedSettingsProject.is_owner && userRole !== "admin"}
                  placeholder="Ajoutez une description pour votre projet..."
                />
              </div>
            </div>

            <div style={styles.settingsSection}>
              <h3 style={styles.sectionTitle}>
                <UsersIcon style={{ width: "1rem", height: "1rem", marginRight: "0.5rem", display: "inline-block" }} />
                Collaborateurs ({projectCollaborators.length})
              </h3>

              {!selectedSettingsProject.is_owner && userRole !== "admin" && (
                <div style={styles.readOnlyMessage}>
                  <strong>Lecture seule :</strong> Seuls les propriétaires de projet et les managers peuvent ajouter ou
                  supprimer des collaborateurs.
                </div>
              )}

              <div style={styles.collaboratorsList}>
                {projectCollaborators.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    Aucun collaborateur pour le moment
                  </div>
                ) : (
                  projectCollaborators.map((collaborator) => (
                    <div key={collaborator._id || collaborator.email} style={styles.collaboratorItem}>
                      <div style={styles.collaboratorInfo}>
                        <div style={styles.collaboratorAvatar}>
                          {collaborator.username ? collaborator.username.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div style={styles.collaboratorDetails}>
                          <div style={styles.collaboratorName}>{collaborator.username || "Utilisateur Inconnu"}</div>
                          <div style={styles.collaboratorEmail}>{collaborator.email}</div>
                        </div>
                      </div>

                      {(selectedSettingsProject.is_owner || userRole === "admin") && (
                        <button
                          style={
                            hoveredButton === `remove-${collaborator._id}`
                              ? { ...styles.removeButton, ...styles.removeButtonHover }
                              : styles.removeButton
                          }
                          onClick={() => handleRemoveCollaborator(collaborator._id)}
                          onMouseEnter={() => setHoveredButton(`remove-${collaborator._id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                          title="Supprimer le collaborateur"
                          aria-label={`Supprimer le collaborateur ${collaborator.username}`}
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {(selectedSettingsProject.is_owner || userRole === "admin") && (
                <div style={styles.addCollaboratorRow}>
                  <input
                    type="email"
                    placeholder="Entrez l'adresse email"
                    value={newCollaboratorEmail}
                    onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                    style={
                      focusedInput === "newCollab"
                        ? { ...styles.addCollaboratorInput, borderColor: "#3b82f6", boxShadow: "0 0 0 1px #3b82f6" }
                        : styles.addCollaboratorInput
                    }
                    onFocus={() => setFocusedInput("newCollab")}
                    onBlur={() => setFocusedInput(null)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddCollaborator()
                      }
                    }}
                    aria-label="Ajouter l'email du collaborateur"
                  />
                  <button
                    style={
                      hoveredButton === "add-collab"
                        ? { ...styles.addButton, ...styles.addButtonHover }
                        : styles.addButton
                    }
                    onClick={handleAddCollaborator}
                    onMouseEnter={() => setHoveredButton("add-collab")}
                    onMouseLeave={() => setHoveredButton(null)}
                    disabled={!newCollaboratorEmail.trim()}
                    aria-label="Ajouter le collaborateur"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "1rem",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                style={
                  hoveredButton === "cancel-settings"
                    ? { ...styles.cancelButton, ...styles.cancelButtonHover }
                    : styles.cancelButton
                }
                onClick={handleCloseSettings}
                onMouseEnter={() => setHoveredButton("cancel-settings")}
                onMouseLeave={() => setHoveredButton(null)}
                aria-label="Annuler les paramètres"
              >
                Annuler
              </button>

              {(selectedSettingsProject.is_owner || userRole === "admin") && (
                <button
                  style={
                    hoveredButton === "save-settings"
                      ? { ...styles.saveButton, ...styles.saveButtonHover }
                      : styles.saveButton
                  }
                  onClick={handleSaveSettings}
                  onMouseEnter={() => setHoveredButton("save-settings")}
                  onMouseLeave={() => setHoveredButton(null)}
                  disabled={isLoadingSettings || !editedProjectName.trim()}
                  aria-label="Enregistrer les paramètres"
                >
                  {isLoadingSettings ? "Enregistrement..." : "Enregistrer les Modifications"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Main Dashboard Component
function Dashboard({ user }) {
  const navigate = useNavigate()

  // State variables
  const [projects, setProjects] = useState([])
  const [newProjectName, setNewProjectName] = useState("")
  const [projectContext, setProjectContext] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [projectLanguage, setProjectLanguage] = useState("en")

  const [selectedSettingsProject, setSelectedSettingsProject] = useState(null)
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false)
  const [editedProjectName, setEditedProjectName] = useState("")
  const [editedProjectContext, setEditedProjectContext] = useState("")
  const [editedProjectLanguage, setEditedProjectLanguage] = useState("en")
  const [projectCollaborators, setProjectCollaborators] = useState([])
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("")
  const [isLoadingSettings, setIsLoadingSettings] = useState(false)

  const [projectModels, setProjectModels] = useState({})
  const [userRole, setUserRole] = useState("user")
  const [canCreateProjects, setCanCreateProjects] = useState(false)
  const [isManager, setIsManager] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [availableUsers, setAvailableUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Check user role and permissions
useEffect(() => {
  const checkUserRole = async () => {
    try {
      const response = await api.get("/check_session")
      const userData = response.data
      
      console.log("Check session response:", userData) // Debug log
      
      if (userData.logged_in) {
        setUserRole(userData.role || "user")
        setCanCreateProjects(userData.can_create_projects || false)
        setIsManager(userData.is_manager || false)
        setIsAdmin(userData.is_admin || false)
      } else {
        // User not logged in, redirect to login
        navigate("/login")
      }
    } catch (error) {
      console.error("Failed to check user role:", error)
      navigate("/login")
    }
  }

  checkUserRole()
}, [navigate])

  // Fetch projects
  useEffect(() => {
    fetchProjects()
  }, [])

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fetch project model info
  const fetchProjectModelInfo = async (projectId) => {
    try {
      // Try LLM settings endpoint first
      try {
        const llmResponse = await api.get(`/project_llm_settings/${projectId}`)
        if (llmResponse.data?.effective_service) {
          setProjectModels((prev) => ({
            ...prev,
            [projectId]: {
              effective_service: llmResponse.data.effective_service,
              service_display_name: llmResponse.data.effective_service === "claude" ? "Claude IA" : "RAG Local",
            },
          }))
          return
        }
      } catch (llmError) {
        console.log("LLM settings endpoint failed:", llmError)
      }

      // Fallback to project endpoint
      const response = await api.get(`/projects/${projectId}`)
      const projectData = response.data.project || response.data

      if (projectData?.effective_service) {
        setProjectModels((prev) => ({
          ...prev,
          [projectId]: {
            effective_service: projectData.effective_service,
            service_display_name:
              projectData.service_display_name ||
              (projectData.effective_service === "claude" ? "Claude IA" : "RAG Local"),
          },
        }))
      } else {
        // Default to local
        setProjectModels((prev) => ({
          ...prev,
          [projectId]: {
            effective_service: "local",
            service_display_name: "RAG Local",
          },
        }))
      }
    } catch (error) {
      console.error("Error fetching model info:", error)
      // Set default on error
      setProjectModels((prev) => ({
        ...prev,
        [projectId]: {
          effective_service: "local",
          service_display_name: "RAG Local",
        },
      }))
    }
  }

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects")
      const fetchedProjects = response.data.projects || []
      setProjects(fetchedProjects)
      fetchedProjects.forEach((project) => {
        fetchProjectModelInfo(project.id)
      })
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  // Fetch available users
  const fetchAvailableUsers = async () => {
    if (!isManager && !isAdmin) return

    setIsLoadingUsers(true)
    try {
      const response = await api.get("/manager/users")
      setAvailableUsers(response.data.users || [])
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  // Fetch project collaborators
  const fetchProjectCollaborators = async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/collaborators`)
      setProjectCollaborators(response.data.collaborators || [])
    } catch (error) {
      console.error("Error fetching collaborators:", error)
      setProjectCollaborators([])
    }
  }

  // Handle opening settings
  const handleOpenSettings = async (project, event) => {
    event.stopPropagation()

    setIsLoadingSettings(true)
    setSelectedSettingsProject(project)
    setEditedProjectName(project.name)
    setEditedProjectContext(project.context || "")
    setEditedProjectLanguage(project.language || "en")
    setIsSettingsPopupOpen(true)

    await fetchProjectCollaborators(project.id)

    if (isManager || isAdmin) {
      await fetchAvailableUsers()
    }

    setIsLoadingSettings(false)
  }

  // Handle project creation
  const handleCreateProject = async () => {
    if (!canCreateProjects) {
      alert("Vous n'avez pas la permission de créer des projets")
      return
    }

    try {
      const projectData = {
        name: newProjectName,
        context: projectContext,
        language: projectLanguage,
        assigned_users: selectedUsers,
      }

      const endpoint = isManager || isAdmin ? "/manager/projects" : "/projects"
      const response = await api.post(endpoint, projectData)
      const newProject = response.data.project

      await fetchProjects()
      setNewProjectName("")
      setProjectContext("")
      setProjectLanguage("en")
      setSelectedUsers([])
      setIsDialogOpen(false)

      if (newProject?.id) {
        navigate(`/project/${newProject.id}`)
      }
    } catch (error) {
      console.error("Error creating project:", error)
      alert("Échec de la création du projet. " + (error.response?.data?.error || error.message || ""))
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await api.post("/logout")
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      navigate("/login")
    }
  }

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => !searchQuery || project.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [projects, searchQuery])

  return (
    <div style={styles.container}>
      <Header
        userRole={userRole}
        isAdmin={isAdmin}
        isManager={isManager}
        handleLogout={handleLogout}
        navigate={navigate}
      />

      <main style={styles.mainContent}>
        <div style={styles.titleRow}>
          <div style={styles.titleSection}>
            <h1 style={styles.pageTitle}>Projets</h1>
          </div>

          {canCreateProjects ? (
            <button
              onClick={() => {
                setIsDialogOpen(true)
                if (isManager || isAdmin) fetchAvailableUsers()
              }}
              style={
                hoveredButton === "newProject"
                  ? { ...styles.newProjectButton, ...styles.newProjectButtonHover }
                  : styles.newProjectButton
              }
              onMouseEnter={() => setHoveredButton("newProject")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Créer un nouveau projet"
            >
              <PlusIcon style={styles.buttonIcon} />
              Nouveau Projet
            </button>
          ) : (
            <div style={styles.newProjectButtonDisabled} aria-label="Création de projet désactivée">
              <PlusIcon style={styles.buttonIcon} />
              Nouveau Projet
            </div>
          )}
        </div>

        {!canCreateProjects && userRole === "user" && (
          <div style={styles.infoAlert} role="alert">
            <strong>Info :</strong> Seuls les managers peuvent créer des projets. Vous avez accès aux projets où vous
            êtes assigné comme collaborateur.
          </div>
        )}

        <div style={styles.searchRow}>
          <div style={styles.searchContainer}>
            <SearchIcon style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher des projets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={
                focusedInput === "search" ? { ...styles.searchInput, ...styles.searchInputFocus } : styles.searchInput
              }
              onFocus={() => setFocusedInput("search")}
              onBlur={() => setFocusedInput(null)}
              aria-label="Rechercher des projets"
            />
          </div>
        </div>

        <div style={styles.projectGrid}>
          {filteredProjects.length === 0 ? (
            <div style={styles.emptyState}>
              <FolderOpenIcon style={styles.emptyIcon} />
              <h2 style={styles.emptyTitle}>Aucun projet trouvé</h2>
              <p style={styles.emptyText}>
                {searchQuery
                  ? "Essayez un terme de recherche différent."
                  : userRole === "user"
                    ? "Vous n'avez encore été assigné à aucun projet."
                    : "Commencez par créer un nouveau projet."}
              </p>
              {!searchQuery && canCreateProjects && (
                <button
                  onClick={() => {
                    setIsDialogOpen(true)
                    if (isManager || isAdmin) fetchAvailableUsers()
                  }}
                  style={
                    hoveredButton === "emptyNew"
                      ? { ...styles.newProjectButton, ...styles.newProjectButtonHover }
                      : styles.newProjectButton
                  }
                  onMouseEnter={() => setHoveredButton("emptyNew")}
                  onMouseLeave={() => setHoveredButton(null)}
                  aria-label="Créer un nouveau projet"
                >
                  <PlusIcon style={styles.buttonIcon} />
                  Nouveau Projet
                </button>
              )}
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                modelInfo={projectModels[project.id]}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                hoveredButton={hoveredButton}
                setHoveredButton={setHoveredButton}
                handleOpenSettings={handleOpenSettings}
              />
            ))
          )}
        </div>

        <CreateProjectModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          newProjectName={newProjectName}
          setNewProjectName={setNewProjectName}
          projectContext={projectContext}
          setProjectContext={setProjectContext}
          projectLanguage={projectLanguage}
          setProjectLanguage={setProjectLanguage}
          userSearchQuery={userSearchQuery}
          setUserSearchQuery={setUserSearchQuery}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          isManager={isManager}
          isAdmin={isAdmin}
          canCreateProjects={canCreateProjects}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
          hoveredButton={hoveredButton}
          setHoveredButton={setHoveredButton}
          handleCreateProject={handleCreateProject}
          availableUsers={availableUsers}
          isLoadingUsers={isLoadingUsers}
          fetchAvailableUsers={fetchAvailableUsers}
        />

        <ProjectSettingsModal
          selectedSettingsProject={selectedSettingsProject}
          setSelectedSettingsProject={setSelectedSettingsProject}
          isSettingsPopupOpen={isSettingsPopupOpen}
          setIsSettingsPopupOpen={setIsSettingsPopupOpen}
          editedProjectName={editedProjectName}
          setEditedProjectName={setEditedProjectName}
          editedProjectContext={editedProjectContext}
          setEditedProjectContext={setEditedProjectContext}
          editedProjectLanguage={editedProjectLanguage}
          setEditedProjectLanguage={setEditedProjectLanguage}
          projectCollaborators={projectCollaborators}
          setProjectCollaborators={setProjectCollaborators}
          newCollaboratorEmail={newCollaboratorEmail}
          setNewCollaboratorEmail={setNewCollaboratorEmail}
          isLoadingSettings={isLoadingSettings}
          setIsLoadingSettings={setIsLoadingSettings}
          userRole={userRole}
          hoveredButton={hoveredButton}
          setHoveredButton={setHoveredButton}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
          fetchProjects={fetchProjects}
          fetchProjectCollaborators={fetchProjectCollaborators}
          fetchAvailableUsers={fetchAvailableUsers}
          isManager={isManager}
          isAdmin={isAdmin}
        />
      </main>
    </div>
  )
}

export default Dashboard
