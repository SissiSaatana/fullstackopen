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
  res.json({
    weight: +req.query.weight!,
    height: +req.query.height!,
    bmi: calculateBmi(+req.query.height!, +req.query.weight!)
  })
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});