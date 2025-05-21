import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import express from "express";
import cors from "cors";

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ai", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).send({ error: "Prompt must be a non-empty string." });
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt.trim(),
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    res.send({ image: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    if (error.response) {
      console.error("OpenAI API response error data:", error.response.data);
    }
    res.status(500).send({ error: "Image generation failed." });
  }
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080/ai");
});


