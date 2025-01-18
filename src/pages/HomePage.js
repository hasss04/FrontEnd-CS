import React, { useState, useEffect } from "react";
import { Grid, Pagination, Container, Box } from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import profilesData from "../data/profiles.json";
import Header from "../components/Header";

const HomePage = ({ theme, toggleTheme }) => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 10;

  useEffect(() => {
    setProfiles(profilesData);
    setFilteredProfiles(profilesData);
  }, []);

  useEffect(() => {
    let filtered = profiles;

    if (roleFilter !== "All Roles") {
      filtered = filtered.filter((profile) => profile.description === roleFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter((profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProfiles(filtered);
  }, [searchTerm, roleFilter, profiles]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const displayedProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );

  return (
    <Box>
      <Header
        setSearchTerm={setSearchTerm}
        toggleTheme={toggleTheme}
        theme={theme}
        setRoleFilter={setRoleFilter}
        roles={["All Roles", ...new Set(profiles.map((profile) => profile.description))]}
        showAdminButton={true}
      />
      <Container>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {displayedProfiles.length > 0 ? (
            displayedProfiles.map((profile) => (
              <Grid item xs={12} sm={6} md={4} key={profile.id}>
                <ProfileCard profile={profile} />
              </Grid>
            ))
          ) : (
            <Box sx={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
              <h2>No Results Found</h2>
            </Box>
          )}
        </Grid>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(filteredProfiles.length / profilesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
