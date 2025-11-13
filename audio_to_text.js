import { File } from 'node:buffer';
if (!globalThis.File) globalThis.File = File;

import OpenAI from "openai";
import dotenv from "dotenv";
import { createReadStream, writeFileSync } from "fs";

dotenv.config();

const APIKEY = process.env.OPENAI_KEY;

const client = new OpenAI({ apiKey: APIKEY });

async function main() {
  const textResponse = await client.audio.transcriptions.create({
    model: "whisper-1",
    file: createReadStream('sample-audio.mp3'),
    language: "en",
  });

  console.log(textResponse.text);
  const rawText = textResponse.text;
  writeFileSync("audioToText.txt", rawText, "utf-8");
}

main();
