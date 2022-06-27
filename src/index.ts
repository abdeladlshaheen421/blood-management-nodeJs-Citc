import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { donerRouter } from "./routers/doner.router";
import db from "../models/"; // not error it's cause of src is the root dir
import { hospitalRouter } from "./routers/hospital.router";

dotenv.config();

const { SERVER_PORT } = process.env;
export const app = express();
app.use(cors({}));
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//==================== routes ============================//
app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ welcome: "welcome to blood bank management system" });
});
donerRouter(app);
hospitalRouter(app);
//=================================================//
db.sequelize
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, (): void => {
      console.log(
        `database connected sucessfully, server is Listenning http://localhost:${SERVER_PORT}/`
      );
    });
  })
  .catch((err: string) => console.log(err));

// Not found Middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ msg: "This Endpoint Not Found" });
});

// error handler middleware
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    res.status(500).json({ err });
    //  res.status(500).json({ msg: "internal server error"})
  }
);
