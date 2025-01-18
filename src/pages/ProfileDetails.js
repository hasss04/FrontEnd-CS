import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Chip } from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import profilesData from "../data/profiles.json";
import Header from "../components/Header";

const ProfileDetails = ({ theme, toggleTheme }) => {
  const { id } = useParams();
  const profile = profilesData.find((p) => p.id === parseInt(id));

  if (!profile) {
    return (
      <Container>
        <Typography variant="h4">Profile not found</Typography>
      </Container>
    );
  }

  const customMarker = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} showAdminButton={false} />
      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 2,
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            padding: 3,
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <img
              src={profile.photo}
              alt={profile.name}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Typography variant="h4" sx={{ mt: 2 }}>
              {profile.name}
            </Typography>
            <Typography variant="h6" sx={{ color: theme === "dark" ? "#bbb" : "#333" }}>
              {profile.description}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <b>Address:</b> {profile.address}
            </Typography>
            <Typography variant="body1">
              <b>Contact:</b> {profile.contact}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <b>Interests:</b>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {profile.interests.map((interest, index) => (
                <Chip key={index} label={interest} variant="outlined" />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "300px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <MapContainer
              center={[profile.latitude, profile.longitude]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[profile.latitude, profile.longitude]}
                icon={customMarker}
              />
            </MapContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProfileDetails;
