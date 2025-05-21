import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

import express from 'express';
import cors from 'cors';

const app = express(); 

app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    const prompt = req.body.prompt;

    try {
      const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
      });

      const image = aiResponse.data[0].url;
      res.send({ image });
    } catch (error) {
      console.error(error);
      res.status(500).send('Image generation failed.');
    }
});

app.listen(8080, () => console.log('Server listening on http://localhost:8080'));
