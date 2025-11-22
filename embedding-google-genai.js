import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();
const APIKEY = process.env.GEMINI_KEY;

const ai = new GoogleGenAI({ apiKey: APIKEY });

async function main() {
  const input_text = "Siddhartha";
  const embedding_model = "gemini-embedding-001";

  try {
    const response = await ai.models.embedContent({
      model: embedding_model,
      contents: input_text,
    });

    const embedding = response.embeddings[0];
    console.log(embedding);
    
    console.log(`Embedding for ${input_text} generated successfully.`);
    console.log(`Vector Dimension: ${embedding.values.length}`);
    console.log("First 10 values:", embedding.values.slice(0, 10));

    writeFileSync(
      "./embedding_output-files/siddhartha_embedding.json",
      JSON.stringify(embedding, null, 2)
    );
  } catch (error) {
    console.error("Error occured during execution.");
    console.error(error);
  }
}

main();
