import express from 'express';
// import getEntries from '../services/diagnosesService';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSnn());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;