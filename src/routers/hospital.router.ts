import { Request, Response, NextFunction, Application } from "express";
import { validateRequest } from "../middlewares/hospital.middleware";
import {
  makebloodRequest,
  requestType,
  index,
  hospitalType,
} from "../controllers/hospital.controller";
import { validateMiddleware } from "../middlewares/doner.middleware";
import { matchedData } from "express-validator";

const makeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: [validateResult.array()] });
  try {
    const data: requestType = <requestType>matchedData(req);
    await makebloodRequest(data);
    res.status(201).json({ success: "request is appending Successfully" });
  } catch (err) {
    next(err);
  }
};

const getHospitals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hospitals: hospitalType[] = await index();
    res.status(200).json({ hospitals });
  } catch (err) {
    next(err);
  }
};

export const hospitalRouter = (app: Application): void => {
  app.post("/makeRequest", validateRequest, makeRequest);
  app.get("/hospitals", getHospitals);
};
