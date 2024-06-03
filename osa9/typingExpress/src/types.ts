export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}


export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}



export type PatientWithoutSnn = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;




export interface Entry {
}


export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}


export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;