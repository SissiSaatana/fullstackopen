import patients from '../data/patients';
import { Patient, PatientWithoutSnn } from '../types';

const getPatients = (): Patient[] => {
  return patients;
}

const getPatientsWithoutSnn = (): PatientWithoutSnn[] => {
  return patients.map(({ ssn, ...rest }) => rest);
}

const addPatient = () => {
  return null;
}

export default {
  getPatients,
  addPatient,
  getPatientsWithoutSnn
};