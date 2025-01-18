import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const SignIn = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    if (username === "admin" && password === "admin@123") {
      localStorage.setItem("authenticated", "true");
      navigate("/admin");
    } else {
      setError("Incorrect username or password. Please try again.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "inherit",
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Welcome Message */}
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Welcome
      </Typography>
      
      {/* Sign-In Box */}
      <Paper sx={{ p: 4, maxWidth: 400, width: "100%", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Admin Sign In
        </Typography>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} // Trigger sign-in on Enter
          sx={{ mb: 2 }}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </Paper>
    </Container>
  );
};

export default SignIn;
