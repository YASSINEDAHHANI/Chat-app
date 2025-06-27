import React, { useState, useEffect } from 'react';
import { Settings, Key, Cpu, CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';

const LLMSettingsComponent = ({ projectId = null, onSettingsChange = null }) => {
  const [settings, setSettings] = useState({
    llm_service: 'local',
    has_claude_key: false,
    api_key_validated: false,
    local_available: true,
    effective_service: 'local'
  });
  
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Inline styles to ensure proper rendering
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
    statusSection: {
      marginBottom: "1.5rem",
      padding: "1rem",
      backgroundColor: "#f9fafb",
      borderRadius: "0.5rem",
    },
    statusHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statusIndicator: {
      display: "flex",
      alignItems: "center",
    },
    statusText: {
      marginLeft: "0.5rem",
      fontWeight: "500",
      color: "#374151",
    },
    resetButton: {
      fontSize: "0.875rem",
      color: "#dc2626",
      textDecoration: "underline",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      transition: "color 0.2s",
    },
    confirmReset: {
      marginBottom: "1rem",
      padding: "1rem",
      border: "1px solid #fca5a5",
      borderRadius: "0.5rem",
      backgroundColor: "#fef2f2",
    },
    confirmHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "0.75rem",
    },
    confirmTitle: {
      fontWeight: "500",
      color: "#991b1b",
      marginLeft: "0.5rem",
    },
    confirmText: {
      color: "#b91c1c",
      marginBottom: "1rem",
      fontSize: "0.875rem",
    },
    confirmButtons: {
      display: "flex",
      gap: "0.5rem",
    },
    message: {
      marginBottom: "1rem",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      fontSize: "0.875rem",
    },
    messageSuccess: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
    },
    messageError: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
    },
    messageInfo: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
    },
    serviceSection: {
      marginBottom: "1.5rem",
    },
    sectionTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "0.75rem",
    },
    serviceOptions: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    serviceOption: {
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      padding: "1rem",
    },
    serviceLabel: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    radioInput: {
      marginRight: "0.75rem",
      width: "1rem",
      height: "1rem",
    },
    serviceContent: {
      display: "flex",
      alignItems: "center",
      flex: "1",
    },
    serviceIcon: {
      width: "1.25rem",
      height: "1.25rem",
      marginRight: "0.5rem",
    },
    serviceTitle: {
      fontWeight: "500",
      color: "#111827",
      marginBottom: "0.25rem",
    },
    serviceDescription: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    apiKeySection: {
      marginTop: "1.5rem",
      padding: "1rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      backgroundColor: "#f9fafb",
    },
    apiKeyTitle: {
      fontWeight: "500",
      color: "#111827",
      marginBottom: "0.75rem",
    },
    input: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      marginBottom: "0.75rem",
      boxSizing: "border-box",
    },
    buttonGroup: {
      display: "flex",
      gap: "0.5rem",
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
    },
    primaryButton: {
      backgroundColor: "#2563eb",
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
    helpSection: {
      marginTop: "1.5rem",
      padding: "1rem",
      backgroundColor: "#eff6ff",
      borderRadius: "0.5rem",
    },
    helpTitle: {
      fontWeight: "500",
      color: "#1e40af",
      marginBottom: "0.5rem",
    },
    helpList: {
      fontSize: "0.875rem",
      color: "#1e3a8a",
      margin: 0,
      paddingLeft: "1rem",
    },
    helpItem: {
      marginBottom: "0.25rem",
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
    link: {
      color: "#2563eb",
      textDecoration: "underline",
    },
    helpText: {
      fontSize: "0.75rem",
      color: "#6b7280",
      marginTop: "0.5rem",
    }
  };

  // Fetch current settings on component mount
  useEffect(() => {
    fetchSettings();
  }, [projectId]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const params = projectId ? `?project_id=${projectId}` : '';
      const response = await fetch(`/user_llm_settings${params}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        setShowApiKeyInput(data.llm_service === 'claude' && !data.has_claude_key);
      } else {
        setMessage('Failed to load settings');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error loading settings');
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

  const saveSettings = async (llmChoice, apiKeyValue = '') => {
    try {
      setLoading(true);
      
      const requestBody = {
        llm_service: llmChoice,
        project_id: projectId
      };
      
      if (llmChoice === 'claude' && apiKeyValue) {
        requestBody.claude_api_key = apiKeyValue;
      }

      const response = await fetch('/user_llm_settings', {
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
        setApiKey(''); // Clear the input
        setShowApiKeyInput(false);
        
        // Notify parent component if callback provided
        if (onSettingsChange) {
          onSettingsChange(data.settings);
        }
      } else {
        setMessage(data.error || 'Failed to save settings');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error saving settings');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleLLMChange = async (newLLMChoice) => {
    if (newLLMChoice === 'claude') {
      if (settings.has_claude_key && settings.api_key_validated) {
        // User already has a valid Claude key, just switch to it
        await saveSettings('claude');
      } else {
        // Show API key input
        setShowApiKeyInput(true);
        setMessage('Please enter your Claude API key');
        setMessageType('info');
      }
    } else {
      // Switch to local
      await saveSettings('local');
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
      await saveSettings('claude', apiKey);
    }
  };

  const handleResetClick = () => {
    setShowConfirmReset(true);
  };

  const handleConfirmReset = async () => {
    try {
      setLoading(true);
      setShowConfirmReset(false);
      
      const params = projectId ? `?project_id=${projectId}` : '';
      const response = await fetch(`/user_llm_settings${params}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        await fetchSettings(); // Reload settings
        setMessage('Settings reset to default');
        setMessageType('success');
        setShowApiKeyInput(false);
        setApiKey('');
      } else {
        setMessage('Failed to reset settings');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error resetting settings');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReset = () => {
    setShowConfirmReset(false);
  };

  const getStatusIcon = () => {
    if (settings.effective_service === 'claude' && settings.api_key_validated) {
      return <CheckCircle style={{width: "1.25rem", height: "1.25rem", color: "#059669"}} />;
    }
    if (settings.effective_service === 'local' && settings.local_available) {
      return <CheckCircle style={{width: "1.25rem", height: "1.25rem", color: "#2563eb"}} />;
    }
    return <XCircle style={{width: "1.25rem", height: "1.25rem", color: "#dc2626"}} />;
  };

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

  if (loading && !settings.llm_service) {
    return (
      <div style={styles.loadingContainer}>
        <Loader style={{width: "1.5rem", height: "1.5rem", animation: "spin 1s linear infinite"}} />
        <span style={styles.loadingText}>Loading settings...</span>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Settings style={styles.headerIcon} />
        <h2 style={styles.title}>
          LLM Settings {projectId ? `(Project Specific)` : `(Global)`}
        </h2>
      </div>

      {/* Current Status */}
      <div style={styles.statusSection}>
        <div style={styles.statusHeader}>
          <div style={styles.statusIndicator}>
            {getStatusIcon()}
            <span style={styles.statusText}>
              Current Service: <span style={{textTransform: "capitalize"}}>{settings.effective_service || 'None'}</span>
            </span>
          </div>
          <button
            onClick={handleResetClick}
            style={styles.resetButton}
            disabled={loading}
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Reset */}
      {showConfirmReset && (
        <div style={styles.confirmReset}>
          <div style={styles.confirmHeader}>
            <AlertCircle style={{width: "1.25rem", height: "1.25rem", color: "#dc2626"}} />
            <h4 style={styles.confirmTitle}>Confirm Reset</h4>
          </div>
          <p style={styles.confirmText}>
            Are you sure you want to reset your LLM settings to default? This will remove your current configuration{projectId ? ' for this project' : ' globally'}.
          </p>
          <div style={styles.confirmButtons}>
            <button
              onClick={handleConfirmReset}
              disabled={loading}
              style={{...styles.button, ...styles.dangerButton}}
            >
              Yes, Reset
            </button>
            <button
              onClick={handleCancelReset}
              disabled={loading}
              style={{...styles.button, ...styles.secondaryButton}}
            >
              Cancel
            </button>
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

      {/* LLM Service Selection */}
      <div style={styles.serviceSection}>
        <h3 style={styles.sectionTitle}>Choose Your LLM Service</h3>
        
        <div style={styles.serviceOptions}>
          {/* Local RAG Option */}
          <div style={styles.serviceOption}>
            <label style={styles.serviceLabel}>
              <input
                type="radio"
                name="llm_service"
                value="local"
                checked={settings.llm_service === 'local'}
                onChange={() => handleLLMChange('local')}
                disabled={loading || !settings.local_available}
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
          <div style={styles.serviceOption}>
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
                    Use Claude AI (requires API key)
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
          <h4 style={styles.apiKeyTitle}>Enter Claude API Key</h4>
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
            Your API key will be encrypted and stored securely. Get your API key from{' '}
            <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" style={styles.link}>
              Anthropic Console
            </a>
          </p>
        </div>
      )}

      {/* Help Text */}
      <div style={styles.helpSection}>
        <h4 style={styles.helpTitle}>How it works:</h4>
        <ul style={styles.helpList}>
          <li style={styles.helpItem}><strong>Local RAG:</strong> Uses your local language model (free, but limited)</li>
          <li style={styles.helpItem}><strong>Claude:</strong> Uses Anthropic's Claude AI (requires API key, more powerful)</li>
          <li style={styles.helpItem}>Settings are saved {projectId ? 'per project' : 'globally'}</li>
          <li style={styles.helpItem}>Your API key is encrypted and validated before saving</li>
        </ul>
      </div>
    </div>
  );
};

export default LLMSettingsComponent;