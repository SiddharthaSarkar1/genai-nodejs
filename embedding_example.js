import { OpenAI } from "openai";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();

const APIKEY = process.env.OPENAI_KEY;

const client = new OpenAI({ apiKey: APIKEY });

async function main() {
  try {
    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: "Dog",
    });

    console.log(response.data);
    writeFileSync("dog.json", response.data[0].embedding);
  } catch (error) {
    console.log("Error occured during execution.");
    console.log(error);
  }
}

main();
