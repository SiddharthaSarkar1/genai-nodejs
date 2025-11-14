import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const PORT = 8080;

const APIKEY = process.env.GEMINI_KEY;

const googleAI = new GoogleGenAI({ apiKey: APIKEY });

app.get("/", async (req, res) => {

  const response = await googleAI.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: "How can I be an AI engineer in 1 - 2 year?",
    config: {
      // systemInstruction: "give the answer in 20 to 25 words only"
      // thinkingConfig: {
      //   includeThoughts: true,
      //   thinkingBudget: 100
      // },
      // temperature: 2.0
    },
  });

  // console.log(response.text);
  // console.log(response.candidates[0].content);

  //for stream we need to use for loop for response
  for await (let chunk of response){
    const responseText = chunk.text;
    if(responseText){
      res.write(responseText);
    }
  }
  res.end("_____Content Completed______");
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  
})
