import { useContext } from "react";
import { DataContext } from "../pages/FrontPage";
import {
  Typography,
  Box,
  Grid2,
} from "@mui/material";

export default function TimeBlock() {
  const {
    fetchedData: { data },
    loading,
    setLoading,
  } = useContext(DataContext);

  const totalTime = data?.totalTime || null;
  const totalVideos = data?.totalVideos || null;
  const formatTime = (time) => {
    const hours = time.duration.hours;
    const minutes = time.duration.minutes;
    const seconds = time.duration.seconds;
    return `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${minutes !== 1 ? "s" : ""}, ${seconds} second${seconds !== 1 ? "s" : ""}`;
  };


  if (loading) return <div>Loading...</div>;

  if (!data) return <></>;
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Playlist Overview
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Videos: {totalVideos}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Video Duration Breakdown
      </Typography>

      {/* Total length */}
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Total length: {formatTime(totalTime[0])} {/* Assuming totalTime[0] is the total length */}
      </Typography>

      {/* Duration at different scales */}
      {totalTime.map((time, index) => (
        index !== 0 && ( // Skip total length for the scaled times
          <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>
            At {time.scale}x: {formatTime(time)}
          </Typography>
        )
      ))}
    </Box>
  );
}
