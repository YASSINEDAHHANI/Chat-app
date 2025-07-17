import { useState, useEffect } from "react"
import logoImage from "../shared-theme/logo-test-case.png"
import api from "../api"

const errorMessages = {
  invalidEmail: "Adresse e-mail invalide.",
  invalidPassword: "Mot de passe incorrect.",
  required: "Ce champ est requis.",
  unknown: "Erreur de connexion. Veuillez réessayer.",
  notFound: "Email ou mot de passe incorrect.",
}

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [formError, setFormError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotMsg, setShowForgotMsg] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError("")
    setPasswordError("")
    setFormError("")
    let valid = true
    if (!email) {
      setEmailError(errorMessages.required)
      valid = false
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError(errorMessages.invalidEmail)
      valid = false
    }
    if (!password) {
      setPasswordError(errorMessages.required)
      valid = false
    } else if (password.length < 6) {
      setPasswordError(errorMessages.invalidPassword)
      valid = false
    }
    if (!valid) return
    setIsLoading(true)
    try {
      const response = await api.post("/login", {
        username: email,
        password: password,
      })
      if (response.data.message === "Login successful") {
        // Redirection selon le rôle (à adapter si besoin)
        if (response.data.is_admin) {
          window.location.href = "/admin"
        } else {
          window.location.href = "/dashboard"
        }
      } else if (response.data.error === "Invalid email") {
        setEmailError(errorMessages.invalidEmail)
      } else if (response.data.error === "Invalid password") {
        setPasswordError(errorMessages.invalidPassword)
      } else {
        setFormError(errorMessages.notFound)
      }
    } catch (err) {
      if (err.response?.data?.error === "Invalid email") {
        setEmailError(errorMessages.invalidEmail)
      } else if (err.response?.data?.error === "Invalid password") {
        setPasswordError(errorMessages.invalidPassword)
      } else if (err.response?.data?.error) {
        setFormError(err.response.data.error)
      } else {
        setFormError(errorMessages.unknown)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.type = "text/css"
    styleTag.innerHTML = `
      html, body {
        min-height: 100vh;
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        background: #f4f6fb;
        color: #232946;
        box-sizing: border-box;
      }
      .signin-bg {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #f4f6fb;
        width: 100vw;
        box-sizing: border-box;
      }
      .signin-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2.5rem;
      }
      .signin-logo img {
        height: 60px;
        max-width: 180px;
        object-fit: contain;
      }
      .signin-card {
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 8px 32px rgba(49,46,129,0.10);
        padding: 2.5rem 2.2rem 2rem 2.2rem;
        max-width: 370px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      .signin-title {
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 0.7rem;
        color: #312e81;
      }
      .signin-form {
        display: flex;
        flex-direction: column;
        gap: 1.3rem;
      }
      .signin-group {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      .signin-label {
        font-weight: 500;
        color: #232946;
        font-size: 0.97rem;
        margin-bottom: 0.1rem;
      }
      .signin-input-wrap {
        position: relative;
        display: flex;
        align-items: center;
      }
      .signin-input-icon {
        position: absolute;
        left: 1rem;
        color: #a5b4fc;
        font-size: 1.1rem;
        pointer-events: none;
      }
      .signin-input {
        width: 100%;
        padding: 0.8rem 1rem 0.8rem 2.7rem;
        border: 1.5px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        background: #f8fafc;
        transition: border 0.2s;
        box-sizing: border-box;
      }
      .signin-input:focus {
        outline: none;
        border-color: #6366f1;
        background: #fff;
      }
      .signin-toggle {
        position: absolute;
        right: 1rem;
        background: none;
        border: none;
        color: #a5b4fc;
        cursor: pointer;
        font-size: 1.1rem;
        padding: 0.2rem;
      }
      .signin-toggle:hover {
        color: #6366f1;
      }
      .signin-error {
        color: #dc2626;
        font-size: 0.92rem;
        margin-top: 0.2rem;
        margin-bottom: 0.1rem;
        min-height: 1.1em;
      }
      .signin-form-error {
        background: rgba(239, 68, 68, 0.09);
        color: #dc2626;
        border-radius: 8px;
        border: 1px solid rgba(239, 68, 68, 0.18);
        font-size: 0.98rem;
        padding: 0.7rem 1rem;
        margin-bottom: 1rem;
        text-align: center;
      }
      .signin-btn {
        background: linear-gradient(135deg, #6366f1 0%, #312e81 100%);
        color: #fff;
        border: none;
        padding: 0.85rem 1.5rem;
        border-radius: 8px;
        font-size: 1.08rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, box-shadow 0.2s;
        margin-top: 0.2rem;
        box-shadow: 0 2px 8px rgba(99,102,241,0.08);
      }
      .signin-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #312e81 0%, #6366f1 100%);
        box-shadow: 0 8px 25px rgba(99,102,241,0.13);
      }
      .signin-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .signin-forgot {
        text-align: right;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        font-size: 0.93rem;
      }
      .signin-forgot a {
        color: #312e81;
        text-decoration: none;
        font-weight: 500;
      }
      .signin-forgot a:hover {
        text-decoration: underline;
      }
      .signin-footer {
        margin-top: 2.5rem;
        text-align: center;
        color: #312e81cc;
        font-size: 0.85rem;
        line-height: 1.4;
        width: 100vw;
      }
      @media (max-width: 600px) {
        .signin-card {
          padding: 1.2rem 0.5rem 1rem 0.5rem;
          max-width: 98vw;
        }
        .signin-logo img {
          height: 40px;
        }
        .signin-title {
          font-size: 1.1rem;
        }
        .signin-footer {
          font-size: 0.7rem;
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
    <div className="signin-bg">
      <div className="signin-logo">
        <img src={logoImage} alt="Logo entreprise" />
      </div>
      <form className="signin-card" onSubmit={handleSubmit} autoComplete="off">
        <div className="signin-title">Connexion</div>
        {formError && <div className="signin-form-error">{formError}</div>}
        {showForgotMsg && (
          <div className="signin-form-error" style={{background:'#f1f5ff', color:'#232946', border:'1px solid #6366f1'}}>
            Pour réinitialiser votre mot de passe, veuillez contacter l'administrateur à <b>admin@dxc.com</b>.
          </div>
        )}
        <div className="signin-form">
          <div className="signin-group">
            <label htmlFor="email" className="signin-label">Adresse e-mail</label>
            <div className="signin-input-wrap">
              <span className="signin-input-icon" aria-hidden>📧</span>
              <input
                id="email"
                type="email"
                className="signin-input"
                placeholder="votre.email@entreprise.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
                aria-invalid={!!emailError}
                aria-describedby="email-error"
                required
              />
            </div>
            <div className="signin-error" id="email-error">{emailError}</div>
          </div>
          <div className="signin-group">
            <label htmlFor="password" className="signin-label">Mot de passe</label>
            <div className="signin-input-wrap">
              <span className="signin-input-icon" aria-hidden>🔒</span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="signin-input"
                placeholder="Votre mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
                required
              />
              <button
                type="button"
                className="signin-toggle"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={() => setShowPassword(v => !v)}
                tabIndex={0}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            <div className="signin-error" id="password-error">{passwordError}</div>
            <div className="signin-forgot">
              <a href="#mot-de-passe-oublie" onClick={e => {e.preventDefault(); setShowForgotMsg(true)}}>
                Mot de passe oublié ?
              </a>
          </div>
          </div>
          <button type="submit" className="signin-btn" disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
      <div className="signin-footer">
        © 2025 DXC Technology. Tous droits réservés.<br />
        Accès sécurisé - Environnement professionnel
      </div>
    </div>
  )
}

export default SignIn

