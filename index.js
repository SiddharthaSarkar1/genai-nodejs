import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_KEY;

const client = new OpenAI({ apiKey: APIKEY });

async function aiAnswer(promptByUser) {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: promptByUser,
  });
  console.log(response.output_text);
}
// aiAnswer();

process.stdout.write("Ask your question?");
process.stdin.on("data", (data) => {
  //   console.log(data.toString().trim());
  const question = data.toString().trim();
  if (question.toLowerCase() == "exit") {
    process.exit();
  } else {
    aiAnswer(question);
  }
});
