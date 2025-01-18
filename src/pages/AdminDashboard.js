import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import profilesData from "../data/profiles.json";
import Header from "../components/Header";

const AdminDashboard = ({ theme, toggleTheme }) => {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    photo: "",
    description: "",
    address: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Load profiles from profiles.json on initial render
  useEffect(() => {
    setProfiles(profilesData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (form.name && form.description && form.photo && form.address) {
      const newProfile = {
        ...form,
        id: Date.now(),
      };
      setProfiles((prev) => [...prev, newProfile]);
      resetForm();
    } else {
      alert("Please fill all required fields.");
    }
  };

  const handleEdit = (id) => {
    const profileToEdit = profiles.find((p) => p.id === id);
    if (profileToEdit) {
      setForm(profileToEdit);
      setEditMode(true);
    }
  };

  const handleSave = () => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === form.id ? { ...profile, ...form } : profile
      )
    );
    resetForm();
    setEditMode(false);
  };

  const handleDelete = (id) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      photo: "",
      description: "",
      address: "",
    });
  };

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} showAdminButton={false} showMenu={false} />
      <Container sx={{ marginTop: "40px" }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h6" gutterBottom>
            {editMode ? "Edit Profile" : "Add Profile"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Photo URL"
                name="photo"
                value={form.photo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={editMode ? handleSave : handleAdd}
          >
            {editMode ? "Save Changes" : "Add Profile"}
          </Button>
        </Paper>

        <Paper sx={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Profile List
          </Typography>
          <List>
            {profiles.map((profile) => (
              <ListItem
                key={profile.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(profile.id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(profile.id)}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={profile.name}
                  secondary={`${profile.description}, ${profile.address}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default AdminDashboard;