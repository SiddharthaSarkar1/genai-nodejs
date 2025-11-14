import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();

const APIKEY = process.env.GEMINI_KEY;

const client = new GoogleGenAI({ apiKey: APIKEY });

async function main() {
  const response = await client.models.generateImages({
    model: "imagen-4.0-generate-001",
    prompt: "Cute baby on a bus",
    config: {
      numberOfImages: 1,
    },
  });
  console.log(response.generatedImages[0].image.imageBytes);

  const imgBase64 = response.generatedImages[0].image.imageBytes;
  const buffer = Buffer(imgBase64, "base64");
  writeFileSync("generatedImage.png", buffer);
}

main();
