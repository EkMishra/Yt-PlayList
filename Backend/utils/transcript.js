import axios from "axios";
import { Innertube } from "youtubei.js/web";

export const getTranscript = async (videoId) => {
  try {
    // Initialize YouTube instance
    const youtube = await Innertube.create({
      lang: "en",
      location: "US",
      retrieve_player: false,
    });

    // Fetch transcript data
    const fetchTranscript = async () => {
      const info = await youtube.getInfo(videoId);
      const transcriptData = await info.getTranscript();
      return transcriptData.transcript.content.body.initial_segments.map(
        (segment) => segment.snippet.text
      );
    };

    // Clean the transcript data
    const cleanTranscript = (transcript) => {
      return transcript
        .map((line) => line.replace(/\n/g, " ").trim()) // Remove newline characters and trim spaces
        .join(" "); // Combine all lines into a single string with spaces
    };

    const transcript = await fetchTranscript();
    console.log( typeof(cleanTranscript(transcript)));
    return cleanTranscript(transcript) // Return cleaned transcript
  } catch (error) {
    console.error("Error fetching or processing transcript:", error);
    throw error;
  }
};
