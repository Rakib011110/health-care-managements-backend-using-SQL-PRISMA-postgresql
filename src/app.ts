import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import routers from "./app/routes";
import globalerrorHandler from "./app/middlewares/globalErrorHandler";
import { StatusCodes } from "http-status-codes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "PH HEALTCARES SERVER",
  });
});
app.use("/api/v1/", routers);
// app.use("/api/v1/admin", AdminRouter);
app.use(globalerrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND",
    error: {
      path: req.originalUrl,
      message: "your requested path is not found",
    },
  });
});

export default app;
