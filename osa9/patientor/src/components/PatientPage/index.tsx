// import { useState } from "react";
// import { Patient } from "../../types";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => { 
   const [patient, setPatient] = useState<Patient>();
  const { id }  = useParams();
  console.log(id);

    useEffect(() => {
      // void axios.get<void>(`${apiBaseUrl}/ping`);

      const fetchPatient = async () => {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      };
      void fetchPatient();
    }, []);
  return (
    <div>
      <h1>{patient && patient.name}</h1>
      <p>ssh: {patient && patient.ssn}</p>
      <p>occupation: {patient && patient.occupation}</p>
    </div>
    );
};

export default PatientPage;