import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalerrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.name || "something went wront",
    error: err,
  });
};
export default globalerrorHandler;