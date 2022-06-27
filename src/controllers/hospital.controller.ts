import db from "../../models/index";
export type requestType = {
  id?: Number;
  bloodType: string;
  city: string;
  quantity: Number;
  patientStatus: string;
  HospitalId?: number;
};
export const makebloodRequest = async (request: requestType): Promise<void> => {
  try {
    await db.Request.create(request);
  } catch (err) {
    throw new Error(err as string);
  }
};
export type hospitalType = {
  id: Number;
  name: string;
};
export const index = async (): Promise<hospitalType[]> => {
  try {
    const hospitals: hospitalType[] = await db.Hospital.findAll({});
    return hospitals;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const migrateHospitals = async (): Promise<void> => {
  const hospitals = [
    { name: "zifta El-ama" },
    { name: "mansoura El-ama" },
    { name: "meetGhamr El-ama" },
    { name: "El-mahla" },
    { name: "benha" },
    { name: "ciro-elama" },
    { name: "tanta-specialist" },
    { name: "Giza" },
    { name: "menouf" },
    { name: "zagazig" },
    { name: "benisiuf" },
  ];
  try {
    hospitals.map(
      async (hospital) => await db.Hospital.create({ name: hospital.name })
    );
  } catch (err) {
    throw new Error(err as string);
  }
};
// migrateHospitals(); uncomment it for first time to add all hospitals to database
