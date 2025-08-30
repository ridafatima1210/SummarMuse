import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import summarizeRoutes from './src/api/routes/summarize.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/summarize', summarizeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});