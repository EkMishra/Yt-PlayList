import { google } from "googleapis";
import { timeBuilderJson } from "./TimeSum.js";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.API_KEY,
});
const getPlaylistData = async (playlistId) => {
  try {
    let nextPageToken = null;
    let videoIdList = [];
    let totalVideos = 0;
    do {
      const params = {
        part: "contentDetails",
        maxResults: 50,
        playlistId,
        pageToken: nextPageToken,
      };
      // console.log(youtube.playlistItems.list(params));
      const res = await youtube.playlistItems.list(params);
        // console.log(`Response from playlistItems.list:`, res.data.items[0].contentDetails);
      const playlistItems = [...res.data.items];
      // console.log(playlistItems);
      playlistItems.forEach((object) => {
        videoIdList.push(object.contentDetails.videoId);
      });
      console.log(nextPageToken)
      nextPageToken = res.data.nextPageToken || null;
      totalVideos = res.data.pageInfo.totalResults;
    } while (nextPageToken);
    console.log("ok")

    return { videoIdList, totalVideos };
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
const getVideoData = async (videoIdList) => {
  try {
    let videoDetails = [];
    for (let i = 0; i < videoIdList.length; i += 50) {
      const batchIds = videoIdList.slice(i, i + 50).join(",");
      const res = await youtube.videos.list({
        part: " contentDetails",
        id: batchIds,
      });
      res.data;
      videoDetails.push(...(res.data.items || []));
    }
    // for (const id of videoIdList) {
    //   const res = await youtube.videos.list({
    //     part: "contentDetails",
    //     id,
    //   });
    // }
    // videoDetails = videoDetails.flat();
    //Por calc durations in a list
    let videoDurations = [];
    videoDetails.forEach((video) => {
      videoDurations.push(video.contentDetails.duration);
    });
    return videoDurations;
  } catch (err) {
    console.log(err.message);
  }
};

export const youtubeData = async (playlistId) => {
  try {
    const { videoIdList, totalVideos } = await getPlaylistData(playlistId);
    const videoDurations = await getVideoData(videoIdList);
    // console.log(totalVideos + "ok");
    const totalTime = timeBuilderJson(videoDurations);
    return { totalTime, totalVideos };
  } catch (error) {
    console.log(error.message);
  }
};
