import { OpenAI } from "openai";
import dotenv from "dotenv";
// import { encoding_for_model } from "tiktoken";

dotenv.config();

const APIKEY = process.env.OPENAI_KEY;

const client = new OpenAI({ apiKey: APIKEY });

const prompt = "How are you?";
const model = "gpt-4o-mini";

// const response = await client.responses.create({
//   instructions: "Give result in two line",
//   input: "Types of mangos available in India?",
//   model: "gpt-4o-mini",
// });

const response = await client.responses.create({
  input: [
    {
      role: "user",
      content: prompt,
    },
  ],
  model,
  // temperature: 2,
  // max_output_tokens: 20,
  store: true,
});

// console.log(response);

const oldResponse = await client.responses.retrieve(
  "resp_0a2a315ee3372232006914b418e4948190a43f85c5bea0a61f"
);

console.log(oldResponse);

// function calculateToken() {
//   const encoder = encoding_for_model(model);
//   const tokenData = encoder.encode(prompt);
//   console.log(tokenData);
// }
// calculateToken();
