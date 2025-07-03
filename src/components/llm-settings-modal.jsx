// Updated llm-settings-modal.jsx - Now shows appropriate interface based on user role
import React, { useState, useEffect } from 'react';
import { Settings, Key, Cpu, CheckCircle, XCircle, AlertCircle, Loader, Lock } from 'lucide-react';

const LLMSettingsComponent = ({ projectId = null, onSettingsChange = null }) => {
  const [settings, setSettings] = useState({
    llm_service: 'local',
    has_claude_key: false,
    api_key_validated: false,
    local_available: true,
    effective_service: 'local'
  });
  
  const [userRole, setUserRole] = useState('user');
  const [isManager, setIsManager] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Check user session to determine role
  useEffect(() => {
    checkUserSession();
  }, []);

  // Fetch settings when component mounts or projectId changes
  useEffect(() => {
    if (projectId && isManager) {
      fetchProjectSettings();
      fetchProjectInfo();
    }
  }, [projectId, isManager]);

  const checkUserSession = async () => {
    try {
      const response = await fetch('/check_session', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role || 'user');
        setIsManager(data.is_manager || data.is_admin || false);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    }
  };

  const fetchProjectInfo = async () => {
    if (!projectId) return;
    
    try {
      const response = await fetch(`/projects/${projectId}`, { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setProjectName(data.project?.name || 'Unknown Project');
      }
    } catch (error) {
      console.error('Error fetching project info:', error);
    }
  };

  const fetchProjectSettings = async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      const response = await fetch(`/project_llm_settings/${projectId}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        setShowApiKeyInput(data.llm_service === 'claude' && !data.has_claude_key);
      } else if (response.status === 403) {
        setMessage('Access denied. Only project managers can configure LLM settings.');
        setMessageType('error');
      } else if (response.status === 404) {
        // No settings configured yet, use defaults
        setSettings({
          llm_service: 'local',
          has_claude_key: false,
          api_key_validated: false,
          local_available: true,
          effective_service: 'local'
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to load project settings');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error loading project settings');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const validateApiKey = async (keyToValidate) => {
    if (!keyToValidate.trim()) {
      setMessage('Please enter an API key');
      setMessageType('error');
      return false;
    }

    try {
      setValidating(true);
      const response = await fetch('/validate_claude_key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ api_key: keyToValidate })
      });

      const data = await response.json();
      
      if (data.valid) {
        setMessage('API key is valid!');
        setMessageType('success');
        return true;
      } else {
        setMessage(data.message || 'Invalid API key');
        setMessageType('error');
        return false;
      }
    } catch (error) {
      setMessage('Error validating API key');
      setMessageType('error');
      return false;
    } finally {
      setValidating(false);
    }
  };

  const saveProjectSettings = async (llmChoice, apiKeyValue = '') => {
    try {
      setLoading(true);
      
      const requestBody = {
        llm_service: llmChoice
      };
      
      if (llmChoice === 'claude' && apiKeyValue) {
        requestBody.claude_api_key = apiKeyValue;
      }

      const response = await fetch(`/project_llm_settings/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (response.ok) {
        setSettings(data.settings);
        setMessage(data.message);
        setMessageType('success');
        setApiKey('');
        setShowApiKeyInput(false);
        
        // Notify parent component if callback provided
        if (onSettingsChange) {
          onSettingsChange(data.settings);
        }
      } else {
        setMessage(data.error || 'Failed to save project settings');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error saving project settings');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleLLMChange = async (newLLMChoice) => {
    if (newLLMChoice === 'claude') {
      if (settings.has_claude_key && settings.api_key_validated) {
        // Project already has a valid Claude key, just switch to it
        await saveProjectSettings('claude');
      } else {
        // Show API key input
        setShowApiKeyInput(true);
        setMessage('Please enter the Claude API key for this project');
        setMessageType('info');
      }
    } else {
      // Switch to local
      await saveProjectSettings('local');
    }
  };

  const handleApiKeySubmit = async () => {
    if (!apiKey.trim()) {
      setMessage('Please enter an API key');
      setMessageType('error');
      return;
    }

    // Validate first, then save if valid
    const isValid = await validateApiKey(apiKey);
    if (isValid) {
      await saveProjectSettings('claude', apiKey);
    }
  };

  const handleResetClick = () => {
    setShowConfirmReset(true);
  };

  const handleConfirmReset = async () => {
    try {
      setLoading(true);
      setShowConfirmReset(false);
      
      const response = await fetch(`/project_llm_settings/${projectId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        await fetchProjectSettings(); // Reload default settings
        setMessage('Project LLM settings reset to defaults');
        setMessageType('success');
        setShowApiKeyInput(false);
        setApiKey('');
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to reset settings');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error resetting settings');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Styles (keeping the same structure but updating content)
  const styles = {
    container: {
      maxWidth: "42rem",
      margin: "0 auto",
      padding: "1.5rem",
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      color: "#1f2937",
      lineHeight: "1.5",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1.5rem",
    },
    headerIcon: {
      width: "1.5rem",
      height: "1.5rem",
      marginRight: "0.5rem",
      color: "#374151",
    },
    title: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: "700",
      color: "#111827",
      margin: 0,
    },
    projectInfo: {
      backgroundColor: "#f9fafb",
      padding: "1rem",
      borderRadius: "0.5rem",
      marginBottom: "1.5rem",
      border: "1px solid #e5e7eb",
    },
    projectName: {
      fontWeight: "600",
      color: "#374151",
      marginBottom: "0.25rem",
    },
    projectNote: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    accessDenied: {
      textAlign: "center",
      padding: "2rem",
      backgroundColor: "#fef2f2",
      borderRadius: "0.5rem",
      border: "1px solid #fecaca",
    },
    accessDeniedIcon: {
      width: "3rem",
      height: "3rem",
      margin: "0 auto 1rem",
      color: "#dc2626",
    },
    accessDeniedTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#991b1b",
      marginBottom: "0.5rem",
    },
    accessDeniedText: {
      color: "#7f1d1d",
      marginBottom: "1rem",
    },
    statusSection: {
      marginBottom: "1.5rem",
      padding: "1rem",
      backgroundColor: "#f9fafb",
      borderRadius: "0.5rem",
      border: "1px solid #e5e7eb",
    },
    statusTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "0.75rem",
    },
    statusItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    statusIcon: {
      marginRight: "0.5rem",
    },
    statusText: {
      fontSize: "0.875rem",
      color: "#4b5563",
    },
    message: {
      padding: "0.75rem",
      borderRadius: "0.375rem",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
    },
    messageSuccess: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
      border: "1px solid #a7f3d0",
    },
    messageError: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      border: "1px solid #fca5a5",
    },
    messageInfo: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
      border: "1px solid #93c5fd",
    },
    servicesSection: {
      marginBottom: "1.5rem",
    },
    sectionTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "1rem",
    },
    serviceOptions: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    serviceOption: {
      border: "2px solid #e5e7eb",
      borderRadius: "0.5rem",
      padding: "1rem",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    serviceOptionSelected: {
      borderColor: "#3b82f6",
      backgroundColor: "#eff6ff",
    },
    serviceLabel: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      width: "100%",
    },
    radioInput: {
      marginRight: "1rem",
      transform: "scale(1.2)",
    },
    serviceContent: {
      display: "flex",
      alignItems: "center",
      flex: 1,
      gap: "0.75rem",
    },
    serviceIcon: {
      width: "1.5rem",
      height: "1.5rem",
    },
    serviceTitle: {
      fontWeight: "600",
      color: "#374151",
      marginBottom: "0.25rem",
    },
    serviceDescription: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    apiKeySection: {
      backgroundColor: "#f9fafb",
      padding: "1.5rem",
      borderRadius: "0.5rem",
      marginBottom: "1.5rem",
      border: "1px solid #e5e7eb",
    },
    apiKeyTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "1rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      marginBottom: "1rem",
      fontFamily: "monospace",
    },
    buttonGroup: {
      display: "flex",
      gap: "0.75rem",
      marginBottom: "1rem",
    },
    button: {
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButton: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
    },
    secondaryButton: {
      backgroundColor: "#ffffff",
      color: "#374151",
      border: "1px solid #d1d5db",
    },
    dangerButton: {
      backgroundColor: "#dc2626",
      color: "#ffffff",
    },
    helpText: {
      fontSize: "0.75rem",
      color: "#6b7280",
      marginTop: "0.5rem",
    },
    loadingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    },
    loadingText: {
      marginLeft: "0.5rem",
    },
  };

  // Show loading state
  if (loading && !settings.llm_service) {
    return (
      <div style={styles.loadingContainer}>
        <Loader style={{width: "1.5rem", height: "1.5rem", animation: "spin 1s linear infinite"}} />
        <span style={styles.loadingText}>Loading settings...</span>
      </div>
    );
  }

  // Show access denied for non-managers trying to configure project settings
  if (projectId && !isManager) {
    return (
      <div style={styles.container}>
        <div style={styles.accessDenied}>
          <Lock style={styles.accessDeniedIcon} />
          <h3 style={styles.accessDeniedTitle}>Manager Access Required</h3>
          <p style={styles.accessDeniedText}>
            Only project managers can configure LLM settings for projects. 
            Please contact your project manager to configure the AI service for this project.
          </p>
          <div style={styles.statusSection}>
            <div style={styles.statusTitle}>Current Project AI Service</div>
            <div style={styles.statusItem}>
              {settings.effective_service === 'claude' ? (
                <>
                  <Key style={{...styles.statusIcon, color: "#7c3aed"}} />
                  <span style={styles.statusText}>Claude AI (configured by manager)</span>
                </>
              ) : (
                <>
                  <Cpu style={{...styles.statusIcon, color: "#2563eb"}} />
                  <span style={styles.statusText}>Local RAG (default)</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getMessageStyle = () => {
    switch (messageType) {
      case 'success': return {...styles.message, ...styles.messageSuccess};
      case 'error': return {...styles.message, ...styles.messageError};
      case 'info': return {...styles.message, ...styles.messageInfo};
      default: return styles.message;
    }
  };

  const getMessageIcon = () => {
    const iconStyle = {width: "1rem", height: "1rem", marginRight: "0.5rem"};
    switch (messageType) {
      case 'success': return <CheckCircle style={iconStyle} />;
      case 'error': return <XCircle style={iconStyle} />;
      case 'info': return <AlertCircle style={iconStyle} />;
      default: return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Settings style={styles.headerIcon} />
        <h2 style={styles.title}>
          Project AI Settings
        </h2>
      </div>

      {/* Project Information */}
      {projectId && (
        <div style={styles.projectInfo}>
          <div style={styles.projectName}>Project: {projectName}</div>
          <div style={styles.projectNote}>
            Configure which AI service this project uses. All users will use these settings.
          </div>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div style={getMessageStyle()}>
          {getMessageIcon()}
          {message}
        </div>
      )}

      {/* Current Status */}
      <div style={styles.statusSection}>
        <div style={styles.statusTitle}>Current Configuration</div>
        <div style={styles.statusItem}>
          {settings.effective_service === 'claude' ? (
            <>
              <Key style={{...styles.serviceIcon, color: "#7c3aed"}} />
              <div>
                <div style={styles.serviceTitle}>Claude AI</div>
                <div style={styles.serviceDescription}>
                  Using Anthropic's Claude
                  {settings.has_claude_key && settings.api_key_validated && (
                    <span style={{color: "#059669"}}> - API Key Configured ✓</span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <Cpu style={{...styles.serviceIcon, color: "#2563eb"}} />
              <div>
                <div style={styles.serviceTitle}>Local RAG</div>
                <div style={styles.serviceDescription}>
                  Using local language model
                  {!settings.local_available && (
                    <span style={{color: "#dc2626"}}> - Not Available</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Service Selection */}
      <div style={styles.servicesSection}>
        <h3 style={styles.sectionTitle}>Select AI Service</h3>
        <div style={styles.serviceOptions}>
          {/* Local Option */}
          <div style={{
            ...styles.serviceOption,
            ...(settings.llm_service === 'local' && styles.serviceOptionSelected)
          }}>
            <label style={styles.serviceLabel}>
              <input
                type="radio"
                name="llm_service"
                value="local"
                checked={settings.llm_service === 'local'}
                onChange={() => handleLLMChange('local')}
                disabled={loading}
                style={styles.radioInput}
              />
              <div style={styles.serviceContent}>
                <Cpu style={{...styles.serviceIcon, color: "#2563eb"}} />
                <div>
                  <div style={styles.serviceTitle}>Local RAG</div>
                  <div style={styles.serviceDescription}>
                    Use local language model (free, private)
                    {!settings.local_available && <span style={{color: "#dc2626"}}> - Not Available</span>}
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* Claude Option */}
          <div style={{
            ...styles.serviceOption,
            ...(settings.llm_service === 'claude' && styles.serviceOptionSelected)
          }}>
            <label style={styles.serviceLabel}>
              <input
                type="radio"
                name="llm_service"
                value="claude"
                checked={settings.llm_service === 'claude'}
                onChange={() => handleLLMChange('claude')}
                disabled={loading}
                style={styles.radioInput}
              />
              <div style={styles.serviceContent}>
                <Key style={{...styles.serviceIcon, color: "#7c3aed"}} />
                <div>
                  <div style={styles.serviceTitle}>Claude (Anthropic)</div>
                  <div style={styles.serviceDescription}>
                    Use Claude AI (requires API key for project)
                    {settings.has_claude_key && settings.api_key_validated && (
                      <span style={{color: "#059669"}}> - Configured ✓</span>
                    )}
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* API Key Input */}
      {showApiKeyInput && (
        <div style={styles.apiKeySection}>
          <h4 style={styles.apiKeyTitle}>Enter Claude API Key for Project</h4>
          <input
            type="password"
            placeholder="sk-ant-api03-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={styles.input}
            disabled={loading || validating}
          />
          <div style={styles.buttonGroup}>
            <button
              onClick={handleApiKeySubmit}
              disabled={loading || validating || !apiKey.trim()}
              style={{...styles.button, ...styles.primaryButton}}
            >
              {validating && <Loader style={{width: "1rem", height: "1rem", marginRight: "0.5rem", animation: "spin 1s linear infinite"}} />}
              Save & Validate
            </button>
            <button
              onClick={() => {
                setShowApiKeyInput(false);
                setApiKey('');
                setMessage('');
              }}
              disabled={loading || validating}
              style={{...styles.button, ...styles.secondaryButton}}
            >
              Cancel
            </button>
          </div>
          <p style={styles.helpText}>
            The API key will be encrypted and stored securely for this project.
          </p>
        </div>
      )}

      {/* Confirmation Dialog for Reset */}
      {showConfirmReset && (
        <div style={styles.apiKeySection}>
          <h4 style={styles.apiKeyTitle}>Reset Project Settings?</h4>
          <p style={{marginBottom: '1rem', color: '#6b7280'}}>
            This will remove the project's LLM configuration and API key. 
            The project will fall back to default local settings.
          </p>
          <div style={styles.buttonGroup}>
            <button
              onClick={handleConfirmReset}
              disabled={loading}
              style={{...styles.button, ...styles.dangerButton}}
            >
              Yes, Reset Settings
            </button>
            <button
              onClick={() => setShowConfirmReset(false)}
              disabled={loading}
              style={{...styles.button, ...styles.secondaryButton}}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {isManager && (settings.has_claude_key || settings.llm_service !== 'local') && (
        <div style={{marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb'}}>
          <button
            onClick={handleResetClick}
            disabled={loading}
            style={{...styles.button, ...styles.secondaryButton}}
          >
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
};

export default LLMSettingsComponent;