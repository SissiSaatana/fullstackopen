import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight: number = +req.query.weight!;
  const height: number = +req.query.height!;

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  res.status(200).json({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight)
  })
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});