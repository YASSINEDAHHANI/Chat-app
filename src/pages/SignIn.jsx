"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import api from "../api"
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  Alert,
} from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import AppTheme from "../shared-theme/AppTheme"
import { useNavigate } from "react-router-dom"
import logoImage from "../shared-theme/byad.png"

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true

// 3D Animation keyframes
const float3D = keyframes`
  0%, 100% {
    transform: translateY(0px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  25% {
    transform: translateY(-30px) rotateX(15deg) rotateY(90deg) translateZ(50px);
  }
  50% {
    transform: translateY(-20px) rotateX(-10deg) rotateY(180deg) translateZ(-30px);
  }
  75% {
    transform: translateY(-40px) rotateX(20deg) rotateY(270deg) translateZ(40px);
  }
`

const spin3D = keyframes`
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
  }
  33% {
    transform: rotateX(120deg) rotateY(120deg) rotateZ(120deg) scale(1.1);
  }
  66% {
    transform: rotateX(240deg) rotateY(240deg) rotateZ(240deg) scale(0.9);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg) scale(1);
  }
`

const orbit3D = keyframes`
  0% {
    transform: rotateY(0deg) translateX(100px) rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg) translateX(100px) rotateY(-360deg);
  }
`

const pulse3D = keyframes`
  0%, 100% {
    transform: scale(1) rotateZ(0deg);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.2) rotateZ(180deg);
    opacity: 0.3;
  }
`

// 3D Background Container
const Background3D = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 0,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.15) 0%, transparent 50%)",
  },
}))

// 3D Logo Background Elements
const Logo3DBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  perspective: "1200px",
  transformStyle: "preserve-3d",
  zIndex: 1,
}))

// Main Logo Element
const MainLogoElement = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "200px",
  height: "200px",
  backgroundImage: `url(${logoImage})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  opacity: 0.15,
  animation: `${float3D} 12s ease-in-out infinite`,
  transformStyle: "preserve-3d",
  filter: "blur(1px)",
}))

// Geometric Logo Elements
const GeometricElement = styled("div")(({ theme, shape = "circle", color = "#3b82f6" }) => ({
  position: "absolute",
  opacity: 0.1,
  transformStyle: "preserve-3d",
  ...(shape === "circle" && {
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${color}, ${color}88)`,
  }),
  ...(shape === "square" && {
    background: `linear-gradient(45deg, ${color}, ${color}88)`,
    borderRadius: "8px",
  }),
  ...(shape === "triangle" && {
    width: 0,
    height: 0,
    background: "transparent",
    borderLeft: "50px solid transparent",
    borderRight: "50px solid transparent",
    borderBottom: `100px solid ${color}88`,
  }),
  ...(shape === "hexagon" && {
    background: color,
    width: "100px",
    height: "55px",
    position: "relative",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      width: 0,
      borderLeft: "50px solid transparent",
      borderRight: "50px solid transparent",
    },
    "&::before": {
      bottom: "100%",
      borderBottom: `28px solid ${color}`,
    },
    "&::after": {
      top: "100%",
      borderTop: `28px solid ${color}`,
    },
  }),
}))

// Tech Icon Elements (using CSS to create tech-like shapes)
const TechIconElement = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "80px",
  height: "80px",
  opacity: 0.12,
  transformStyle: "preserve-3d",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "40px",
  fontWeight: "bold",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
}))

// Individual Tech Icon Components
const CodeIcon = styled(TechIconElement)(({ theme, color = "#3b82f6" }) => ({
  color: color,
  "&::before": {
    content: '"</>"',
    textShadow: `0 0 20px ${color}`,
  },
}))

const GearIcon = styled(TechIconElement)(({ theme, color = "#8b5cf6" }) => ({
  color: color,
  "&::before": {
    content: '"⚙"',
    textShadow: `0 0 20px ${color}`,
  },
}))

const ChipIcon = styled(TechIconElement)(({ theme, color = "#06b6d4" }) => ({
  color: color,
  "&::before": {
    content: '"▣"',
    textShadow: `0 0 20px ${color}`,
  },
}))

const WifiIcon = styled(TechIconElement)(({ theme, color = "#10b981" }) => ({
  color: color,
  "&::before": {
    content: '"📶"',
    textShadow: `0 0 20px ${color}`,
  },
}))

const LaptopIcon = styled(TechIconElement)(({ theme, color = "#f59e0b" }) => ({
  color: color,
  "&::before": {
    content: '"💻"',
    textShadow: `0 0 20px ${color}`,
  },
}))

// Floating particles
const FloatingParticle = styled("div")(({ theme, delay = 0, duration = 10 }) => ({
  position: "absolute",
  width: "6px",
  height: "6px",
  background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)",
  borderRadius: "50%",
  animation: `${float3D} ${duration}s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
}))

// Enhanced Card with glassmorphism
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  color: "#1f2937",
  border: "2px solid transparent",
  borderRadius: "20px",
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 35px 0px, rgba(0, 0, 0, 0.1) 0px 25px 50px -15px",
  background:
    "linear-gradient(rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95)) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4) border-box",
  position: "relative",
  zIndex: 10,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "20px",
    padding: "2px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "xor",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    zIndex: -1,
  },
}))

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  position: "relative",
  zIndex: 5,
}))

// Enhanced TextField
const LightTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    color: "#1f2937",
    borderRadius: "12px",
    "& fieldset": {
      borderColor: "rgba(59, 130, 246, 0.2)",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "rgba(59, 130, 246, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#4b5563",
    fontWeight: 500,
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#9ca3af",
    opacity: 1,
  },
}))

const LightFormLabel = styled(FormLabel)(({ theme }) => ({
  color: "#374151",
  marginBottom: theme.spacing(0.5),
  fontWeight: 600,
  fontSize: "0.875rem",
}))

const LightCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#6b7280",
  "&.Mui-checked": {
    color: "#3b82f6",
  },
}))

const LightButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
  color: "#ffffff",
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
  "&:hover": {
    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.6)",
    transform: "translateY(-1px)",
  },
  "&.Mui-disabled": {
    background: "rgba(156, 163, 175, 0.5)",
    color: "rgba(255, 255, 255, 0.7)",
    boxShadow: "none",
  },
  transition: "all 0.3s ease",
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(3),
  left: theme.spacing(3),
  zIndex: 20,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: theme.spacing(1.5),
  border: "1px solid rgba(255, 255, 255, 0.2)",
  [theme.breakpoints.up("sm")]: {
    top: theme.spacing(4),
    left: theme.spacing(4),
  },
}))

const Logo = styled("img")(({ theme }) => ({
  height: "50px",
  width: "auto",
  maxWidth: "180px",
  objectFit: "contain",
  filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))",
  [theme.breakpoints.down("sm")]: {
    height: "40px",
  },
}))

const SignIn = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateInputs = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.")
      return false
    }
    if (!password || password.length < 6) {
      setError("Password incorrect")
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
        setError("Invalid credentials")
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Generate multiple diverse 3D elements
  const generate3DElements = () => {
    const elements = []

    // Main logos (multiple copies of your logo)
    const logoPositions = [
      { top: "10%", left: "15%", size: 1.2, animation: `${float3D} 10s ease-in-out infinite` },
      { top: "70%", right: "20%", size: 0.8, animation: `${spin3D} 15s linear infinite` },
      { top: "40%", left: "5%", size: 1.0, animation: `${orbit3D} 20s linear infinite` },
      { bottom: "20%", left: "10%", size: 0.9, animation: `${pulse3D} 8s ease-in-out infinite` },
      { top: "20%", right: "10%", size: 1.1, animation: `${float3D} 12s ease-in-out infinite reverse` },
    ]

    logoPositions.forEach((pos, index) => {
      elements.push(
        <MainLogoElement
          key={`logo-${index}`}
          style={{
            ...pos,
            width: `${150 * pos.size}px`,
            height: `${150 * pos.size}px`,
            animation: pos.animation,
            animationDelay: `${index * 0.5}s`,
          }}
        />,
      )
    })

    // Geometric shapes
    const geometricElements = [
      {
        shape: "circle",
        color: "#3b82f6",
        top: "25%",
        left: "80%",
        size: "120px",
        animation: `${spin3D} 18s linear infinite`,
      },
      {
        shape: "square",
        color: "#8b5cf6",
        bottom: "30%",
        right: "15%",
        size: "100px",
        animation: `${float3D} 14s ease-in-out infinite`,
      },
      {
        shape: "triangle",
        color: "#06b6d4",
        top: "60%",
        left: "20%",
        size: "80px",
        animation: `${pulse3D} 10s ease-in-out infinite`,
      },
      {
        shape: "hexagon",
        color: "#10b981",
        top: "15%",
        left: "60%",
        size: "90px",
        animation: `${orbit3D} 25s linear infinite`,
      },
      {
        shape: "circle",
        color: "#f59e0b",
        bottom: "15%",
        left: "70%",
        size: "110px",
        animation: `${spin3D} 12s linear infinite reverse`,
      },
    ]

    geometricElements.forEach((elem, index) => {
      elements.push(
        <GeometricElement
          key={`geo-${index}`}
          shape={elem.shape}
          color={elem.color}
          style={{
            ...elem,
            width: elem.size,
            height: elem.size,
            animation: elem.animation,
            animationDelay: `${index * 0.8}s`,
          }}
        />,
      )
    })

    // Tech icons with fixed components
    const techIconsData = [
      {
        component: CodeIcon,
        color: "#3b82f6",
        top: "35%",
        right: "5%",
        animation: `${float3D} 16s ease-in-out infinite`,
      },
      { component: GearIcon, color: "#8b5cf6", bottom: "40%", left: "25%", animation: `${spin3D} 20s linear infinite` },
      {
        component: ChipIcon,
        color: "#06b6d4",
        top: "50%",
        right: "25%",
        animation: `${pulse3D} 12s ease-in-out infinite`,
      },
      {
        component: WifiIcon,
        color: "#10b981",
        bottom: "10%",
        right: "40%",
        animation: `${orbit3D} 22s linear infinite`,
      },
      {
        component: LaptopIcon,
        color: "#f59e0b",
        top: "80%",
        left: "40%",
        animation: `${float3D} 18s ease-in-out infinite reverse`,
      },
    ]

    techIconsData.forEach((iconData, index) => {
      const IconComponent = iconData.component
      elements.push(
        <IconComponent
          key={`tech-${index}`}
          color={iconData.color}
          style={{
            top: iconData.top,
            left: iconData.left,
            right: iconData.right,
            bottom: iconData.bottom,
            animation: iconData.animation,
            animationDelay: `${index * 1.2}s`,
          }}
        />,
      )
    })

    return elements
  }

  // Generate floating particles
  const generateParticles = () => {
    const particles = []
    for (let i = 0; i < 30; i++) {
      particles.push(
        <FloatingParticle
          key={i}
          delay={Math.random() * 15}
          duration={8 + Math.random() * 10}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />,
      )
    }
    return particles
  }

  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.type = "text/css"
    styleTag.innerHTML = `
      body {
        margin: 0;
        padding: 0;
        color: #1f2937;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        overflow-x: hidden;
      }
      
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
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
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      {/* 3D Background with Multiple Elements */}
      <Background3D>
        <Logo3DBackground>{generate3DElements()}</Logo3DBackground>
        {generateParticles()}
      </Background3D>

      <SignInContainer direction="column" justifyContent="center">
        <LogoContainer>
          <Logo src={logoImage || "/placeholder.svg?height=50&width=180"} alt="TestGen Logo" />
        </LogoContainer>

        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              color: "#1f2937",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 3,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sign in
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "12px",
                "& .MuiAlert-icon": {
                  color: "#ef4444",
                },
              }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2.5,
            }}
          >
            <FormControl>
              <LightFormLabel htmlFor="email">Email</LightFormLabel>
              <LightTextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <LightFormLabel htmlFor="password">Password</LightFormLabel>
              <LightTextField
                id="password"
                type="password"
                name="password"
                placeholder="••••••"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControlLabel
              control={<LightCheckbox value="remember" />}
              label="Remember me"
              sx={{
                color: "#4b5563",
                "& .MuiFormControlLabel-label": {
                  fontWeight: 500,
                },
              }}
            />

            <LightButton type="submit" fullWidth variant="contained" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign in"}
            </LightButton>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  )
}

export default SignIn
