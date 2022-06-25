import { body } from "express-validator";
import { Request } from "express";
import { validationResult, ValidationError } from "express-validator";
import db from "../../models";
const isExistEmail = async (email: string) => {
  const doner = await db.Doner.findOne({ where: { email } });
  return doner ? Promise.reject("user already exists") : Promise.resolve();
};
const isExistNatonalId = async (nationalId: string) => {
  const doner = await db.Doner.findOne({ where: { nationalId } });
  return doner ? Promise.reject("user already exists") : Promise.resolve();
};

const isDoner = async (nationalId: string) => {
  const doner = await db.Doner.findOne({ where: { nationalId } });
  return doner ? Promise.resolve() : Promise.reject("user already exists");
};

export const validateRegister = [
  body("nationalId")
    .matches(/^[0-9]{14}$/)
    .withMessage("please enter valid national id")
    .bail()
    .custom(isExistNatonalId)
    .withMessage("This national id is already exists"),
  body("name")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("please enter a valid name"),
  body("email")
    .isEmail()
    .withMessage("please enter a valid email address")
    .bail()
    .custom(isExistEmail)
    .withMessage("This email already exists"),
  body("city").isAlpha().withMessage("please enter a valid city name"),
];
export const validateDonate = [
  body("nationalId")
    .matches(/^[0-9]{14}$/)
    .withMessage("please enter valid national id")
    .bail()
    .custom(isDoner)
    .withMessage("This national id is Not Found Please Register first"),
  body("bloodType")
    .isIn(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
    .withMessage("enter a valid blood type"),
  body("virusTest")
    .isIn(["positive", "negative"])
    .withMessage("enter a valid virus test result"),
];

export const validateMiddleware = (req: Request) => {
  const errorFormatter = ({
    location,
    msg,
    param,
    value,
    nestedErrors,
  }: ValidationError) => {
    return `{"${param}": "${msg}"}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);

  return result;
};
