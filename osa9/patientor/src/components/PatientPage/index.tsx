import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import {
  Diagnosis,
  Patient,
  Entry,
  Gender,
  HealthCheckRating,
} from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import FavoriteIcon from "@mui/icons-material/Favorite";

const genderIcon = (gender: Gender | undefined) => {
  switch (gender) {
    case "female":
      return <FemaleIcon />;
    case "male":
      return <MaleIcon />;
    default:
      return null;
  }
};


const healthRating = (health: HealthCheckRating) => {
  switch (health) {
    case 0:
      return <FavoriteIcon sx={{ color: "green" }} />;
    case 1:
      return <FavoriteIcon sx={{ color: "yellow" }} />;
    case 2:
      return <FavoriteIcon sx={{ color: "blue" }} />;
    case 3:
      return <FavoriteIcon sx={{ color: "red" }} />;
    default:
      return null;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
  // console.log(entry);
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>Discharge date: {entry.discharge.date}</p>
          <ul>
            <li>
              criteria: <i>{entry.discharge.criteria}</i>
            </li>
          </ul>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          {entry.sickLeave ? (
            <p>
              sick leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </p>
          ) : null}
        </div>
      );
    case "HealthCheck":
      return <div>{healthRating(entry.healthCheckRating)}</div>;
    default:
      return assertNever(entry);
  }
};


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
      <h1>{patient && patient.name} {genderIcon(patient?.gender)}</h1>
      <p>ssh: {patient && patient.ssn}</p>
      <p>occupation: {patient && patient.occupation}</p>

      {(patient?.entries.length) ? <h2>entries</h2> : null}
      {patient?.entries.map((e) => (
        <div key={e.id} style={{border: "1px solid black", margin: "1em", padding: ".1em .5em"}}>
          <p>
            {e.date} {e.description} 
            {e.type === "OccupationalHealthcare" ? 
              <WorkIcon />
              : <MedicalServicesIcon />
            }
          </p>
          <ul>
            {e.diagnosisCodes?.map((diagnoseCode) => (
              <li key={diagnoseCode}>
                {diagnoseCode} {getDiagnosisName(diagnoseCode)}
              </li>
            ))}
          </ul>
          <EntryDetails entry={e} />
          <p>diagnose by {e.specialist}</p>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;