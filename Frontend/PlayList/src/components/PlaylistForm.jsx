import React, { useContext, useState } from "react";
import { DataContext } from "../pages/FrontPage";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function PlaylistForm() {
  const [formData, setFormData] = useState({
    playlist: "",
  });
  const [error, setError] = useState("");

  const { setFetchedData, setLoading } = useContext(DataContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/submit-playlist-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setFetchedData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <Box sx={{ padding: 2 }}>
      <form className="playlist-form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Enter Playlist URL
        </Typography>
        <TextField
          label="Playlist URL"
          type="text"
          name="playlist"
          value={formData.playlist}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
}
