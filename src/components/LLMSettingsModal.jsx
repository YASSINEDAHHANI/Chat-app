// llm-settings-modal.jsx - Claude and Local RAG Only (NO GEMINI)

import React, { useState, useEffect } from 'react';
import { Key, Cpu, Check, X, AlertCircle, Settings, MessageSquare } from 'lucide-react';

const LLMSettingsModal = ({ isOpen, onClose, projectId, onSettingsChange }) => {
  const [settings, setSettings] = useState({
    llm_service: 'local',
    has_claude_key: false,
    api_key_validated: false,
    local_available: true,
    effective_service: 'local',
    can_modify_settings: false,
    user_role: 'user'
  });
  
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  useEffect(() => {
    if (isOpen && projectId) {
      loadProjectSettings();
    }
  }, [isOpen, projectId]);

  const loadProjectSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/project_llm_settings/${projectId}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        setMessage('');
      } else if (response.status === 403) {
        setMessage('Seuls les managers de projet peuvent configurer les paramètres LLM.');
        setMessageType('error');
      } else if (response.status === 404) {
        // No settings configured yet, use defaults
        setSettings({
          llm_service: 'local',
          has_claude_key: false,
          api_key_validated: false,
          local_available: true,
          effective_service: 'local',
          can_modify_settings: false,
          user_role: 'user'
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Échec du chargement des paramètres du projet');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Erreur lors du chargement des paramètres du projet');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const validateApiKey = async (keyToValidate) => {
    if (!keyToValidate.trim()) {
      setMessage('Veuillez saisir une clé API');
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
        setMessage('Clé API valide !');
        setMessageType('success');
        return true;
      } else {
        setMessage(data.message || 'Clé API invalide');
        setMessageType('error');
        return false;
      }
    } catch (error) {
      setMessage('Erreur lors de la validation de la clé API');
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
        setMessage(data.error || 'Échec de la sauvegarde des paramètres du projet');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Erreur lors de la sauvegarde des paramètres du projet');
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
        setMessage('Veuillez saisir votre clé API Claude');
        setMessageType('');
      }
    } else if (newLLMChoice === 'local') {
      if (settings.local_available) {
        await saveProjectSettings('local');
      } else {
        setMessage('Le système RAG local n\'est pas disponible');
        setMessageType('error');
      }
    }
  };

  const handleApiKeySubmit = async () => {
    if (await validateApiKey(apiKey)) {
      await saveProjectSettings('claude', apiKey);
    }
  };

  const getMessageStyle = () => ({
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    backgroundColor: messageType === 'error' ? '#FEF2F2' : '#F0FDF4',
    color: messageType === 'error' ? '#DC2626' : '#059669',
    border: `1px solid ${messageType === 'error' ? '#FECACA' : '#BBF7D0'}`,
  });

  const getMessageIcon = () => {
    return messageType === 'error' ? 
      <AlertCircle style={{ width: '1rem', height: '1rem' }} /> :
      <Check style={{ width: '1rem', height: '1rem' }} />;
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto',
    },
    header: {
      padding: '1.5rem 1.5rem 0',
      borderBottom: '1px solid #E5E7EB',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    body: {
      padding: '1.5rem',
    },
    footer: {
      padding: '1rem 1.5rem',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    primaryButton: {
      backgroundColor: '#3B82F6',
      color: 'white',
    },
    secondaryButton: {
      backgroundColor: '#F3F4F6',
      color: '#374151',
    },
    warningSection: {
      backgroundColor: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1rem',
    },
    warningTitle: {
      fontWeight: '600',
      color: '#92400E',
      marginBottom: '0.5rem',
    },
    warningText: {
      fontSize: '0.875rem',
      color: '#92400E',
    },
    statusSection: {
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1.5rem',
    },
    statusTitle: {
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.75rem',
      fontSize: '0.875rem',
    },
    statusItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    serviceIcon: {
      width: '1.5rem',
      height: '1.5rem',
    },
    serviceTitle: {
      fontWeight: '500',
      color: '#111827',
    },
    serviceDescription: {
      fontSize: '0.75rem',
      color: '#6B7280',
    },
    servicesSection: {
      marginBottom: '1rem',
    },
    sectionTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '1rem',
    },
    serviceOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    serviceOption: {
      border: '2px solid #E5E7EB',
      borderRadius: '0.5rem',
      padding: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    serviceOptionSelected: {
      borderColor: '#3B82F6',
      backgroundColor: '#EFF6FF',
    },
    serviceLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: 'pointer',
      width: '100%',
    },
    apiKeySection: {
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#F3F4F6',
      borderRadius: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      marginBottom: '0.75rem',
    },
    validationButtons: {
      display: 'flex',
      gap: '0.5rem',
    },
    chatIntegrationInfo: {
      backgroundColor: '#EFF6FF',
      border: '1px solid #3B82F6',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginTop: '1rem',
    },
    chatIntegrationTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      color: '#1D4ED8',
      marginBottom: '0.5rem',
    },
    chatIntegrationText: {
      fontSize: '0.875rem',
      color: '#1E40AF',
    },
    noServiceWarning: {
      backgroundColor: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1rem',
    },
    noServiceTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      color: '#DC2626',
      marginBottom: '0.5rem',
    },
    noServiceText: {
      fontSize: '0.875rem',
      color: '#7F1D1D',
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            <Settings style={{ width: '1.25rem', height: '1.25rem' }} />
            Configuration IA du Projet
          </h2>
        </div>

        <div style={styles.body}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                Chargement...
              </div>
            </div>
          )}

          {!settings.can_modify_settings && !loading && (
            <div style={styles.warningSection}>
              <div style={styles.warningTitle}>Accès en lecture seule</div>
              <div style={styles.warningText}>
                Seuls les managers de projet peuvent modifier ces paramètres.
                Tous les utilisateurs utiliseront ces configurations.
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

          {/* No Service Warning */}
          {!loading && settings.effective_service !== 'claude' && settings.effective_service !== 'local' && (
            <div style={styles.noServiceWarning}>
              <div style={styles.noServiceTitle}>
                <AlertCircle style={{ width: '1rem', height: '1rem' }} />
                Aucun service IA configuré
              </div>
              <div style={styles.noServiceText}>
                Ce projet n'a pas de service IA configuré. L'assistant de chat et la génération de cas de test ne fonctionneront pas jusqu'à ce qu'un service soit configuré.
              </div>
            </div>
          )}

          {/* Current Status */}
          <div style={styles.statusSection}>
            <div style={styles.statusTitle}>Configuration Actuelle</div>
            <div style={styles.statusItem}>
              {settings.effective_service === 'claude' ? (
                <>
                  <Key style={{...styles.serviceIcon, color: "#7c3aed"}} />
                  <div>
                    <div style={styles.serviceTitle}>Claude AI</div>
                    <div style={styles.serviceDescription}>
                      Utilise l'IA Claude d'Anthropic
                      {settings.has_claude_key && settings.api_key_validated && (
                        <span style={{color: "#059669"}}> - Clé API Configurée ✓</span>
                      )}
                    </div>
                  </div>
                </>
              ) : settings.effective_service === 'local' ? (
                <>
                  <Cpu style={{...styles.serviceIcon, color: "#2563eb"}} />
                  <div>
                    <div style={styles.serviceTitle}>RAG Local</div>
                    <div style={styles.serviceDescription}>
                      Utilise le système RAG local
                      {!settings.local_available && (
                        <span style={{color: "#dc2626"}}> - Non Disponible</span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle style={{...styles.serviceIcon, color: "#f59e0b"}} />
                  <div>
                    <div style={styles.serviceTitle}>Aucun Service Configuré</div>
                    <div style={styles.serviceDescription}>
                      Veuillez sélectionner Claude AI ou RAG Local ci-dessous
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chat Assistant Integration Info */}
          <div style={styles.chatIntegrationInfo}>
            <div style={styles.chatIntegrationTitle}>
              <MessageSquare style={{ width: '1rem', height: '1rem' }} />
              Intégration Assistant de Chat
            </div>
            <div style={styles.chatIntegrationText}>
              L'assistant de chat et la génération de cas de test utiliseront automatiquement 
              le service sélectionné ci-dessous. Seuls Claude AI et RAG Local sont supportés.
            </div>
          </div>

          {/* Service Selection */}
          {settings.can_modify_settings && (
            <div style={styles.servicesSection}>
              <h3 style={styles.sectionTitle}>Sélectionner le Service IA</h3>
              <div style={styles.serviceOptions}>
                {/* Local RAG Option */}
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
                    />
                    <Cpu style={{...styles.serviceIcon, color: "#2563eb"}} />
                    <div style={{ flex: 1 }}>
                      <div style={styles.serviceTitle}>RAG Local</div>
                      <div style={styles.serviceDescription}>
                        Utilise le système RAG local hébergé sur votre infrastructure.
                        Aucune clé API requise.
                        {!settings.local_available && (
                          <span style={{color: "#dc2626"}}> (Non disponible actuellement)</span>
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                {/* Claude AI Option */}
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
                    />
                    <Key style={{...styles.serviceIcon, color: "#7c3aed"}} />
                    <div style={{ flex: 1 }}>
                      <div style={styles.serviceTitle}>Claude AI</div>
                      <div style={styles.serviceDescription}>
                        Utilise l'API Claude d'Anthropic. Nécessite une clé API valide.
                        Haute qualité de réponse.
                        {settings.has_claude_key && settings.api_key_validated && (
                          <span style={{color: "#059669"}}> ✓ Configuré</span>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* API Key Input Section */}
              {showApiKeyInput && (
                <div style={styles.apiKeySection}>
                  <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                    Clé API Claude
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                    Votre clé API commence par "sk-ant-" et peut être obtenue sur console.anthropic.com
                  </div>
                  <input
                    type="password"
                    style={styles.input}
                    placeholder="sk-ant-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    disabled={loading || validating}
                  />
                  <div style={styles.validationButtons}>
                    <button
                      style={{...styles.button, ...styles.primaryButton}}
                      onClick={handleApiKeySubmit}
                      disabled={!apiKey.trim() || loading || validating}
                    >
                      {validating ? 'Validation...' : 'Valider et Sauvegarder'}
                    </button>
                    <button
                      style={{...styles.button, ...styles.secondaryButton}}
                      onClick={() => {
                        setShowApiKeyInput(false);
                        setApiKey('');
                        setMessage('');
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <button
            style={{...styles.button, ...styles.secondaryButton}}
            onClick={onClose}
            disabled={loading}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LLMSettingsModal;