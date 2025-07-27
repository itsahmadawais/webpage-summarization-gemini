import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';

import { getGeminiSummary } from './gemini';

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend app is running!');
});

app.post('/api/summarize', async (req, res) => {
  const { url } = req.body;
  try {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const text = $('body').text();

    const summary = await getGeminiSummary(text);
    console.log(summary);
    res.json({ summary });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to summarize' });
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});