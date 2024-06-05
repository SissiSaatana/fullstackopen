import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, Patient } from "../../types";

const PatientPage = () => { 
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const { id }  = useParams();

  useEffect(() => {
    // void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const getDiagnosisName = (dCode:string) => {
    const diagnose = diagnoses?.find(d => d.code === dCode);
    return diagnose ? diagnose.name : "not found";
  };


  return (
    <div>
      <h1>{patient && patient.name}</h1>
      <p>ssh: {patient && patient.ssn}</p>
      <p>occupation: {patient && patient.occupation}</p>
      <h2>entries</h2>
      {patient?.entries.map((e) => (
        <div key={e.id}>
          <p>
            {e.date} {e.description}
          </p>
          <ul>
            {e.diagnosisCodes?.map((diagnoseCode) => (
              <li key={diagnoseCode}>{diagnoseCode} {getDiagnosisName(diagnoseCode)} </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;