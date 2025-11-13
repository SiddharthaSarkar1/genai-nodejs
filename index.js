import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.GEMINI_KEY;

const googleAI = new GoogleGenAI({ apiKey: APIKEY });

async function main() {
  const response = await googleAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Tell table of 54",
  });

  console.log(response.text);
}

main();
