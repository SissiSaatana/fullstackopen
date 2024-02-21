import express from 'express';
import { Request } from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { postBody } from './postBody';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const weight: number = +req.query.weight!;
  const height: number = +req.query.height!;

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    res.status(200).json({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    });
  }
});

// exercises 
app.post('/exercises', (req: Request<NonNullable<unknown>, NonNullable<unknown>, postBody>, res) => {

  console.log('isNaN(req.body.target)');
  console.log(isNaN(req.body.target));

  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (req.body.daily_exercises.some(isNaN) || isNaN(req.body.target)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.status(200).json(calculateExercises(req.body.daily_exercises, req.body.target));
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});