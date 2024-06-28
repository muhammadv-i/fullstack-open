import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { NewPatient, Patient, SecurePatient } from "../types";

const getPatients = (): Patient[] => patients;

const getSecurePatients = (): SecurePatient[] => {
    const securePatients: SecurePatient[] = patients.map(patient => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation
        };
    });

    return securePatients;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient: Patient = patient as Patient;
    newPatient.id = uuid();
    patients.push(newPatient);

    return newPatient;
};

export default {
    getPatients,
    getSecurePatients,
    addPatient,
};