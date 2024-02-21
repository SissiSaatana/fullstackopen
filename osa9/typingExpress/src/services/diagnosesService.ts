import diagnoses from '../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  console.log('diagnoses');
  console.log('diagnoses');
  return diagnoses;
}

const addDiagnose = () => {
  return null;
}

export default {
  getEntries,
  addDiagnose
};