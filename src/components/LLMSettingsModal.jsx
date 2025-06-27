import React from 'react';
import LLMSettingsComponent from './llm-settings-modal';

const LLMSettingsModal = ({ isOpen, onClose, projectId }) => {
  // React hooks must be called before any conditional returns
  const [hoveredClose, setHoveredClose] = React.useState(false);

  const handleBackdropClick = React.useCallback((e) => {
    // Only close if clicking the backdrop itself, not the content
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleEscapeKey = React.useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add escape key listener
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [handleEscapeKey, isOpen]);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  const modalStyles = {
    modal: {
      position: "fixed",
      inset: "0",
      zIndex: "50",
      overflowY: "auto",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    modalBackdrop: {
      position: "fixed",
      inset: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
      transition: "opacity 0.2s",
    },
    modalContainer: {
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    modalContent: {
      position: "relative",
      backgroundColor: "#ffffff",
      borderRadius: "0.75rem",
      overflow: "hidden",
      width: "100%",
      maxWidth: "48rem", // Larger for settings
      maxHeight: "90vh",
      overflowY: "auto",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      margin: "0",
      padding: "0",
    },
    closeButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      color: "#6b7280",
      transition: "all 0.2s",
      zIndex: 10,
      width: "2rem",
      height: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    closeButtonHover: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      color: "#1f2937",
    },
    // Override Tailwind styles for the content
    settingsWrapper: {
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      color: "#1f2937",
      lineHeight: "1.5",
    }
  };

  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div style={modalStyles.modal}>
      <div style={modalStyles.modalBackdrop} onClick={handleBackdropClick}>
        <div style={modalStyles.modalContainer} onClick={handleBackdropClick}>
          <div style={modalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              style={{
                ...modalStyles.closeButton,
                ...(hoveredClose ? modalStyles.closeButtonHover : {})
              }}
              onClick={onClose}
              onMouseEnter={() => setHoveredClose(true)}
              onMouseLeave={() => setHoveredClose(false)}
              aria-label="Close settings"
              title="Close settings"
            >
              <CloseIcon />
            </button>
            
            {/* Settings component with proper styling wrapper */}
            <div style={modalStyles.settingsWrapper}>
              <LLMSettingsComponent 
                projectId={projectId}
                onSettingsChange={(newSettings) => {
                  console.log('Settings updated for project:', projectId, newSettings);
                  // Modal stays open after settings change
                  // User can manually close it when done
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMSettingsModal;