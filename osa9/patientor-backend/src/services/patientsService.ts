import patients from '../data/patients';
import { NewPatient, Patient, PatientWithoutSnn } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id:string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  console.log(patient);
  console.log(patient?.entries[0]);
  return patients.find(p => p.id === id);
};

const getPatientsWithoutSnn = (): PatientWithoutSnn[] => {
  return patients.map(({ssn, ...rest }) => rest);
};

const addPatient = (patient: NewPatient): Patient => {
  const newId = uuid();
  console.log('newiD', newId);
  const newPatient = {
    id: newId,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatientsWithoutSnn,
  getPatient
};