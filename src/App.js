import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import ProfileDetails from "./pages/ProfileDetails";
import AdminDashboard from "./pages/AdminDashboard";
import SignIn from "./pages/SignIn";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/signin" />;
};

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/profile/:id" element={<ProfileDetails theme={theme} toggleTheme={toggleTheme} />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute element={<AdminDashboard theme={theme} toggleTheme={toggleTheme} />} />
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
