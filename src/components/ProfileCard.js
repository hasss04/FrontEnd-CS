import React from "react";
import { Card, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${profile.id}`, { state: { profile } });
  };

  return (
    <div className="profile-box">
      <Card
        sx={{
          maxWidth: { xs: "100%", sm: 345 },
          margin: "auto",
          backgroundColor: "inherit",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          "&:hover": { transform: "scale(1.05)" },
          transition: "transform 0.2s",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={profile.photo || "https://via.placeholder.com/150"}
          alt={profile.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {profile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.description}
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: "15px",
              backgroundColor: "#1976d2",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
