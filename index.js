import { OpenAI } from "openai";
import dotenv from "dotenv";
import { encoding_for_model } from "tiktoken";

dotenv.config();

const APIKEY = process.env.OPENAI_KEY;

const client = new OpenAI({ apiKey: APIKEY });

const prompt = "What is coding answer with example?";
const model = "gpt-4o-mini";

// const response = await client.responses.create({
//   instructions: "Give result in two line",
//   input: "Types of mangos available in India?",
//   model: "gpt-4o-mini",
// });

const response = await client.responses.create({
  input: [
    // {
    //   role: "system",
    //   content: "answer in 20 words",
    // },
    // {
    //   role: "developer",
    //   content: "Give a basic code example in Javascript",
    // },
    {
      role: "user",
      content: prompt,
    },
  ],
  model,
});

console.log(response);

function calculateToken() {
  const encoder = encoding_for_model(model);
  const tokenData = encoder.encode(prompt);
  console.log(tokenData);
}
calculateToken();
