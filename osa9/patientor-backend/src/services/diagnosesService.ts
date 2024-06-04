import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  console.log('diagnoses');
  console.log('diagnoses');
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};