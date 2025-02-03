import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GM_API_KEY);

export async function main(transcript) {
  const chatCompletion = await getGeminiChatCompletion(transcript);
  return chatCompletion || "";
}

export async function getGeminiChatCompletion(transcript) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Summarize the following text in 5 lines and provide key points. Format the response like this:
            [5-line summary]
            **Key Points:**
            * [Point 1]
            * [Point 2]
            * [Point 3]
            * [Point 4]
            * [Point 5]

            Here is the text: ${transcript}`;

    const result = await model.generateContent(prompt);
    const responseText =
      result.response.candidates[0]?.content?.parts[0]?.text || "";

    if (!responseText) {
      throw new Error("Empty response received from Gemini.");
    }

    // Splitting into summary and key points
    const [summaryPart, keyPointsPart] = responseText.split("**Key Points:**");

    const summary = summaryPart.trim();
    const keyPoints = keyPointsPart
      ? keyPointsPart
          .trim()
          .split("\n") // Split by new line to properly handle points
          .filter((point) => point.trim().startsWith("*")) // Ensure valid points
          .map((point) => {
            const cleanPoint = point.replace(/^\*\s*/, "").trim(); // Remove leading "*"
            const [topic, ...contentParts] = cleanPoint.split(":"); // Split topic and content
            const content = contentParts.join(":").trim(); // Rejoin in case of multiple colons
            return `**${topic.trim()}**: ${content}`.replace(/\*/g, ""); // Remove all * symbols
          })
      : [];

    console.log(keyPoints);

    return { summary, keyPoints };
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return { summary: "Error generating summary.", keyPoints: [] };
  }
}

// import Groq from "groq-sdk/index.mjs";

// const groq = new Groq({ apiKey: process.env.GQ_API_KEY });

// export async function main(transcript) {
//   const chatCompletion = await getGroqChatCompletion(transcript);
//   // Print the completion returned by the LLM.
//   return chatCompletion.choices[0]?.message?.content || "";
// }

// export async function getGroqChatCompletion(transcript) {

//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `Return Result in English Summarize the following text in 5 lines and provide key points : ${transcript}`,
//       },
//     ],
//     model: "llama3-8b-8192",
//   });
// }

// const splitText = (text) => {
//   const maxLength = 3000;
//   const words = text.split(" ");
//   let chunks = [];
//   let currentChunk = "";

//   for (let word of words) {
//     if ((currentChunk + " " + word).length <= maxLength) {
//       currentChunk += " " + word;
//     } else {
//       chunks.push(currentChunk.trim());
//       currentChunk = word;
//     }
//   }
//   if (currentChunk.length > 0) {
//     chunks.push(currentChunk.trim());
//   }

//   return chunks;
// };

// async function query(data) {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.HF_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         inputs: data,
//       }),
//     }
//   );
//   const result = await response.json();
//   return result;
// }

// export const getSummarizedResult = async (transcript) => {
//   console.log("here");
//   console.log(transcript);
//   const chunks = splitText(transcript);
//   // const summarizedChunks = [];

//   const summarizedChunks = await Promise.all(chunks.map((chunk) => query(chunk)));
//    const finalSummary = summarizedChunks.map(chunk=>chunk[0].summary_text).join(' ');
//   return finalSummary;

// };
