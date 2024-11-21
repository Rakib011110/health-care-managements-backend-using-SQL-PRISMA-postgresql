import { StatusCodes } from "http-status-codes";
import { catchAsynce } from "../../../Shared/catchAsynce";
import sendResponse from "../../../Shared/sendResponse";
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const loginUser = catchAsynce(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "LOGIN SUCCESSFULL",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
