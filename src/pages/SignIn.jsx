import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"

import logoImage from"../shared-theme/logo-test-case.png"
const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const validateInputs = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide.")
      return false
    }
    if (!password || password.length < 6) {
      setError("Mot de passe incorrect")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateInputs()) return

    try {
      setIsLoading(true)
      const response = await api.post("/login", {
        username: email,
        password: password,
      })

      if (response.data.message === "Login successful") {
        if (response.data.is_admin) {
          navigate("/admin")
        } else if (response.data.is_manager) {
          navigate("/dashboard")
        } else {
          navigate("/dashboard")
        }
      } else {
        setError("Identifiants invalides")
      }
    } catch (err) {
      setError(err.response?.data?.error || "Échec de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.type = "text/css"
    styleTag.innerHTML = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        background: #f8f9fa;
        color: #333;
        line-height: 1.6;
      }
      
      .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        position: relative;
      }
      
      .logo-container {
        position: absolute;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .logo {
        height: 60px;
        width: auto;
        max-width: 200px;
        object-fit: contain;
      }
      
      .security-badge {
        text-align: center;
        margin-bottom: 2rem;
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.875rem;
        font-weight: 500;
      }
      
      .card {
        background: rgba(255, 255, 255, 0.98);
        border-radius: 16px;
        padding: 3rem 2.5rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        width: 100%;
        max-width: 420px;
        margin-top: 6rem;
      }
      
      .title {
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 0.5rem;
        color: #1a1a1a;
      }
      
      .subtitle {
        text-align: center;
        color: #666;
        margin-bottom: 2.5rem;
        font-size: 0.95rem;
      }
      
      .form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .label {
        font-weight: 500;
        color: #374151;
        font-size: 0.875rem;
      }
      
      .input-container {
        position: relative;
      }
      
      .input-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: 1.125rem;
      }
      
      .input {
        width: 100%;
        padding: 0.875rem 1rem;
        padding-left: 3rem;
        border: 1.5px solid #e5e7eb;
        border-radius: 8px;
        font-size: 0.95rem;
        transition: all 0.2s ease;
        background: #fff;
      }
      
      .input:focus {
        outline: none;
        border-color: #8b5cf6;
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
      }
      
      .input::placeholder {
        color: #9ca3af;
      }
      
      .password-toggle {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        font-size: 1.125rem;
        padding: 0.25rem;
      }
      
      .password-toggle:hover {
        color: #6b7280;
      }
      
      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 0.5rem 0;
      }
      
      .checkbox {
        width: 1.125rem;
        height: 1.125rem;
        accent-color: #8b5cf6;
      }
      
      .checkbox-label {
        font-size: 0.875rem;
        color: #4b5563;
        cursor: pointer;
      }
      
      .button {
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        color: white;
        border: none;
        padding: 0.875rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 0.5rem;
      }
      
      .button:hover:not(:disabled) {
        background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
        transform: translateY(-1px);
        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
      }
      
      .button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }
      
      .error {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
        padding: 0.875rem 1rem;
        border-radius: 8px;
        border: 1px solid rgba(239, 68, 68, 0.2);
        font-size: 0.875rem;
        margin-bottom: 1rem;
      }
      
      .help-link {
        text-align: center;
        margin-top: 1.5rem;
        font-size: 0.875rem;
        color: #6b7280;
      }
      
      .help-link a {
        color: #8b5cf6;
        text-decoration: none;
        font-weight: 500;
      }
      
      .help-link a:hover {
        text-decoration: underline;
      }
      
      .footer {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.75rem;
        line-height: 1.4;
      }
      
      @media (max-width: 640px) {
        .container {
          padding: 1rem;
        }
        
        .logo-container {
          top: 1rem;
          padding: 0.75rem 1.5rem;
        }
        
        .logo {
          height: 50px;
        }
        
        .card {
          padding: 2rem 1.5rem;
          margin-top: 5rem;
        }
        
        .title {
          font-size: 1.75rem;
        }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      if (document.head.contains(styleTag)) {
        document.head.removeChild(styleTag)
      }
    }
  }, [])

  return (
    <div className="container">
      {/* Logo at the top */}
      <div className="logo-container">
        <img
          src={logoImage}
          alt="DXC Technology"
          className="logo"
        />
      </div>

      {/* Security badge */}
      <div className="security-badge">Connexion sécurisée</div>

      {/* Main login card */}
      <div className="card">
        <h1 className="title">Connexion</h1>
        <p className="subtitle">Connectez-vous à votre compte professionnel</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email" className="label">
              Adresse e-mail
            </label>
            <div className="input-container">
              <span className="input-icon">📧</span>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="votre.email@dxc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              Mot de passe
            </label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => {
                  const input = document.getElementById("password")
                  input.type = input.type === "password" ? "text" : "password"
                }}
              >
                👁
              </button>
            </div>
          </div>

          <div className="checkbox-container">
            <input
              id="remember"
              type="checkbox"
              className="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="checkbox-label">
              Se souvenir de moi
            </label>
          </div>

          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="help-link">
          Besoin d'aide ? <a href="#support">Contacter le support IT</a>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        © 2025 DXC Technology. Tous droits réservés.
        <br />
        Accès sécurisé - Environnement professionnel
      </div>
    </div>
  )
}

export default SignIn
