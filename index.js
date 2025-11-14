import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import express from "express";
import multer from "multer";

const app = express();

const PORT = 8080;

dotenv.config();

const APIKEY = process.env.GEMINI_KEY;

const client = new GoogleGenAI({ apiKey: APIKEY });

const upload = multer({ dest: "uploads" });

app.get("/", (req, res) => {
  res.send(`
        <form method="post" action="/upload" enctype="multipart/form-data">
        <input type="file" name="image" />
        <button>Read Image</button>
        </form>
        `);
});

app.post("/upload", upload.single("image"), async (req, res) => {
  const path = req.file.path;
  res.send(await main(path));
});

async function main(path) {
  const base64Img = readFileSync(path, {
    encoding: "base64",
  });

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/webp",
          data: base64Img,
        },
      },
      {
        text: "read text from this image",
      },
    ],
  });

  return response.text;
}

// main();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
