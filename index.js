import { OpenAI } from "openai";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();

const APIKEY = process.env.OPENAI_KEY;

const client = new OpenAI({ apiKey: APIKEY });

async function main() {
  const response = await client.images.generate({
    model: "dall-e-2",
    prompt: "a cute baby boy in a bus",
    size: "512x512",
    response_format: "b64_json",
    n:1,
  });

  console.log(response);
  const rawImage = response.data[0]?.b64_json;

  const path = "./generatedImages/generatedImg.png";
  const buffer = Buffer.from(rawImage, "base64");

  writeFileSync(path, buffer);
  console.log(`Image is saved and the path is ${path}.`);
}

main();
