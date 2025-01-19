import express from "express";
import cors from "cors";
import morgan from "morgan";
import googleapis from "googleapis";
import dotenv from "dotenv/config";
import { youtubeData } from "./utils/googleApi.js";
import { getTranscript } from "./utils/transcript.js";
import { getSummarizedResult } from "./utils/summarize.js";

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const app = express();
const regexPlaylist = /[\?&]list=([^&]+)/;
const regexVideo = /[\?&]v=([^&]+)/;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("ok");
  res.send("<h1>OK</h1>");
});

app.post("/submit-playlist-url", async (req, res) => {
  const url = req.body.playlist;
  console.log(url);
  const match = url.match(regexPlaylist);

  if (match) {
    const playlistId = match[1];
    const { totalTime, totalVideos } = await youtubeData(playlistId);
    console.log(totalVideos);
    res.status(200).json({
      status: "success",
      data: {
        playlistId,
        totalVideos,
        totalTime,
      },
    });
  } else {
    res.status(400).json({
      status: "fail",
      data: {
        message: "Does not contain playlist link",
      },
    });
  }
  // else {
  //   res.status(200).json({
  //     status: "success",
  //     data: {
  //       playlistId,
  //     },
  //   });
  // }
});

app.post("/submit-video-url", async (req, res) => {
  const url = req.body.video;

  const match = url.match(regexVideo);
  if (match) {
    console.log("Video ID:", match[1]); // Output: VIDEO_ID
    const videoId = match[1];
    const ytTranscript = await getTranscript(videoId);
    console.log(ytTranscript);
    const summarizedResult = await getSummarizedResult(ytTranscript);
    res.status(200).json({
      status: "success",
      data: {
        summarizedResult,
      },
    });
  }
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
