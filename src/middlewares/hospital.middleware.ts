import { body } from "express-validator";
import db from "../../models";

const isHospital = async (hospitalId: Number) => {
  const hospital = await db.Hospital.findOne({ where: { id: hospitalId } });
  return hospital ? Promise.resolve() : Promise.reject();
};
const isValidRequestNumber = async (HospitalId: Number) => {
  const reqNumber: Number = await db.Request.count({ where: { HospitalId } });
  return reqNumber > 9 ? Promise.reject() : Promise.resolve();
};
export const validateRequest = [
  body("bloodType")
    .isIn(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
    .withMessage("please enter a valid blood type"),
  body("city").isAlpha().withMessage("please enter a valid city name"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("please enter a valid quantity"),
  body("patientStatus")
    .isIn(["immediate", "Urgent", "Normal"])
    .withMessage("please enter a valid patient status"),
  body("HospitalId")
    .custom(isHospital)
    .withMessage("please enter an exist hospital")
    .bail()
    .custom(isValidRequestNumber)
    .withMessage(
      "Sorry This Hospital has reached max number of requests (10) requests"
    ),
];
