import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.GEMINI_KEY;

const googleAI = new GoogleGenAI({ apiKey: APIKEY });

async function main() {
  const response = await googleAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "How can I be an AI engineer?",
    config: {
      // systemInstruction: "give the answer in 20 to 25 words only"
      // thinkingConfig: {
      //   includeThoughts: true,
      //   thinkingBudget: 100
      // },
      temperature: 2.0
    },
  });

  console.log(response.text);
  // console.log(response.candidates[0].content);
}

main();
