import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { extractTextFromFile } from '../services/textExtractor.js';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const getAiSummary = async (text, length) => {
  const prompt = `Summarize the following text in a ${length} format. Identify the key points and main ideas, and wrap the most important phrases or sentences in asterisks (*like this*). Do not use any other markdown. Text: "${text}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate summary from AI service.');
  }
};

export const processDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const extractedText = await extractTextFromFile(req.file);
    const { summaryLength } = req.body;
    const summary = await getAiSummary(extractedText, summaryLength);
    res.json({ summary });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Failed to process document.' });
  } finally {
    fs.unlinkSync(req.file.path);
  }
};