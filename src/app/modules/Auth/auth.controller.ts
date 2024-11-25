import { catchAsynce } from "../../../Shared/catchAsynce";
import sendResponse from "../../../Shared/sendResponse";
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { StatusCodes } from "http-status-codes";

const loginUser = catchAsynce(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "LOGIN SUCCESSFULL",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});
const refreshToken = catchAsynce(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Refresh Token Genarated SUCCESSFULL",
    data: result,

    // data: {
    //   accessToken: result.accessToken,
    //   needPasswordChange: result.needPasswordChange,
    // },
  });
});
const changePassword = catchAsynce(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Password Change Success",
      data: result,
    });
  }
);
const forgotPassword = catchAsynce(async (req: Request, res: Response) => {
  const result = await AuthServices.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "forgot passowrd Success",
    data: result,
  });
});

const resetPassword = catchAsynce(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";

  await AuthServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password Reset!",
    data: null,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
