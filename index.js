import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_KEY;

const client = new OpenAI({ apiKey: APIKEY });

// const response = await client.responses.create({
//   instructions: "Give result in two line",
//   input: "Types of mangos available in India?",
//   model: "gpt-4o-mini",
// });

const response = await client.responses.create({
  input: [
    {
      role: "system",
      content: "Provide answer in English and Spanish language",
    },
    {
      role: "developer",
      content: "Give a basic code example in Javascript",
    },
    {
      role: "user",
      content: "What is coding?",
    },
  ],
  model: "gpt-4o-mini",
});

console.log(response.output_text);
