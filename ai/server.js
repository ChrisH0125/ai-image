// server.js
import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai'; 
import express from 'express';
import cors from 'cors';

const openai = new OpenAI({
  apiKey: process.env.OPENAI, 
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ai', async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).send("Prompt must be a non-empty string.");
  }

  try {
    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt.trim(),
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data[0].url;
    res.send({ image });
  } catch (error) {
    console.error("Error generating image:", error);
    if (error.response) {
      console.error("OpenAI API error response:", error.response.data);
    }
    res.status(500).send("Image generation failed.");
  }
});


app.listen(8080, () => console.log('Server listening on http://localhost:8080/ai'));
