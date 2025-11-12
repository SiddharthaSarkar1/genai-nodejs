import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_KEY;

const client = new OpenAI({ apiKey: APIKEY });

const context = [
  {
    role: "system",
    content: "keep answer short and simple",
  },
];

async function aiAnswer(promptByUser) {
  context.push({ role: "user", content: promptByUser });
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: context,
  });
  //adding output to the context
  context.push({ role: "assistant", content: response.output_text });
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
