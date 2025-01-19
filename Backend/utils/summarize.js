const splitText = (text) => {
  const maxLength = 3000;
  const words = text.split(" ");
  let chunks = [];
  let currentChunk = "";

  for (let word of words) {
    if ((currentChunk + " " + word).length <= maxLength) {
      currentChunk += " " + word;
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = word;
    }
  }
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
};

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: data,
      }),
    }
  );
  const result = await response.json();
  return result;
}

export const getSummarizedResult = async (transcript) => {
  console.log("here");
  console.log(transcript);
  const chunks = splitText(transcript);
  // const summarizedChunks = [];

  const summarizedChunks = await Promise.all(chunks.map((chunk) => query(chunk)));
   const finalSummary = summarizedChunks.map(chunk=>chunk[0].summary_text).join(' ');
  return finalSummary;
  
};

