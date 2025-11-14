import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

const APIKEY = process.env.GEMINI_KEY;

const client = new GoogleGenAI({ apiKey: APIKEY });

async function main() {
  const base64Img = readFileSync("sample-img.webp", {
    encoding: "base64",
  });

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/webp",
          data: base64Img,
        },
      },
      {
        text: "read text from this image, also mention the colours used in the image",
      },
    ],
  });

  console.log(response.text);
}

main();
