import express from 'express';
// import getEntries from '../services/diagnosesService';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  // console.log(diagnosesService.getEntries())
  res.send(diagnosesService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;