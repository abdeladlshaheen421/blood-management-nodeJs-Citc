import { Request, Response, NextFunction, Application } from "express";
import {
  register,
  doner,
  donate,
  donation,
  Doner,
  VirusTestMsg,
  periodTestMsg,
  sendEmail,
  option,
  checkLastDonateDate,
} from "../controllers/doner.controller";
import {
  validateRegister,
  validateDonate,
  validateMiddleware,
} from "../middlewares/doner.middleware";
import { matchedData } from "express-validator";
const donerRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() }); //.map((err) => JSON.parse(err)) }
  try {
    const don: doner = <doner>matchedData(req);
    await register(don);
    return res.status(201).json({ success: "Create Doner Successfully" });
  } catch (err) {
    next(err);
  }
};

const donerDonate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });
  try {
    const virusTest: string = req.body.virusTest;
    const doner: doner = await Doner(req.body.nationalId);
    if (virusTest == "positive") {
      sendEmail(<option>{
        from: "Blood Bank",
        to: doner.email,
        html: `${VirusTestMsg}`,
        subject: "Donate Rejection",
      });
      return res.status(200).json({
        message:
          "sorry you Can't donate now, for more details check your email",
      });
    } else if (await checkLastDonateDate(doner.id as Number)) {
      sendEmail(<option>{
        from: "Blood Bank",
        to: doner.email,
        html: `${periodTestMsg}`,
        subject: "Donate Rejection",
      });
      return res.status(200).json({
        message:
          "sorry you Can't donate now, for more details check your email",
      });
    }
    const data: donation = <donation>matchedData(req);
    data.DonerId = doner.id;
    await donate(data);
    return res.status(201).json({
      success: "you Donation is accepted",
    });
  } catch (err) {
    next(err);
  }
};
export const donerRouter = (app: Application): void => {
  app.post("/register", validateRegister, donerRegister);
  app.post("/donate", validateDonate, donerDonate);
};
