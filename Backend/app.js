import express from "express";
import morgan from "morgan";
import googleapis from "googleapis";
import dotenv from "dotenv/config";
import { youtubeData } from "./utils/googleApi.js";
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const app = express();
const regex = /[\?&]list=([^&]+)/;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("ok");
  res.send("<h1>OK</h1>");
  // res.status(200).json({
  //     status: " success"
  //     // data:{

  //     // }
  // })
});

app.post("/submit", async (req, res) => {
  const url = req.body.playlist;
  console.log(url);
  const match = url.match(regex);

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

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
