import React, { useState } from "react"
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
import { styled } from "@mui/material/styles"
import AppTheme from "../shared-theme/AppTheme"
import { useNavigate } from "react-router-dom"

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true

// Updated Card with light theme styling
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
  backgroundColor: "#ffffff", // White background for the card
  color: "#1f2937", // Dark text color
  border: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px, rgba(0, 0, 0, 0.05) 0px 15px 35px -5px",
}))

// Updated container with light theme styling
const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundColor: "#f9fafb", // Light gray background
  backgroundImage: "none", // Remove the radial gradient
  backgroundRepeat: "no-repeat",
}))

// Custom styled TextField for light theme
const LightTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff", // White input background
    color: "#1f2937", // Dark text color
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.1)", // Subtle border
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)", // Slightly darker on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6", // Blue accent color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "#4b5563", // Dark gray label
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#9ca3af", // Medium gray for placeholder
    opacity: 1,
  },
}))

// Custom styled FormLabel for light theme
const LightFormLabel = styled(FormLabel)(({ theme }) => ({
  color: "#4b5563", // Dark gray label
  marginBottom: theme.spacing(0.5),
}))

// Custom styled Checkbox for light theme
const LightCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#6b7280", // Medium gray when unchecked
  "&.Mui-checked": {
    color: "#3b82f6", // Blue accent color when checked
  },
}))

// Custom styled Button for light theme
const LightButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#3b82f6", // Blue accent color
  color: "#ffffff", // White text
  "&:hover": {
    backgroundColor: "#2563eb", // Darker blue on hover
  },
  "&.Mui-disabled": {
    backgroundColor: "rgba(59, 130, 246, 0.5)", // Faded blue when disabled
    color: "rgba(255, 255, 255, 0.7)", // Slightly faded text
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
      setError("Password must be at least 6 characters long.")
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
      // Use api instead of axios
      const response = await api.post("/login", {
        username: email,
        password: password,
      })

      if (response.data.message === "Login successful") {
        // Check if the user is an admin and redirect accordingly
        if (response.data.is_admin) {
          navigate("/admin")
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

  // Add global styles for light theme
  React.useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.type = "text/css"
    styleTag.innerHTML = `
      body {
        background-color: #f9fafb;
        margin: 0;
        padding: 0;
        color: #1f2937;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      
      /* Custom scrollbar for light theme */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
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
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              color: "#1f2937", // Dark text for light theme
              fontWeight: 600, // Make it slightly bolder
            }}
          >
            Sign in
          </Typography>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                backgroundColor: "rgba(239, 68, 68, 0.1)", // Subtle red background
                color: "#ef4444", // Red text
                border: "1px solid rgba(239, 68, 68, 0.2)", // Subtle red border
                "& .MuiAlert-icon": {
                  color: "#ef4444", // Red icon
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
              gap: 2,
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
              sx={{ color: "#4b5563" }} // Dark gray text for the label
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
