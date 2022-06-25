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
