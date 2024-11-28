import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsynce } from "../../../Shared/catchAsynce";
import sendResponse from "../../../Shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import pick from "../../../Shared/pick";
import { userFilterableFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createAdmin(req);
    res.status(200).json({
      success: "admin create success",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err?.name || "something went wrong",
      error: err,
    });
  }
};
const createDoctor = catchAsynce(async (req: Request, res: Response) => {
  // console.log(req.body.data);
  const result = await userService.createDoctor(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor Created successfuly!",
    data: result,
  });
});

const createPatient = catchAsynce(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient Created successfuly!",
    data: result,
  });
});

const getAllAdminFromDB = catchAsynce(async (req, res) => {
  // console.log(req.query);
  // const filters = req.query;
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log(options);
  const result = await userService.getAllDBFormDB(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin retrive success",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsynce(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await userService.getMyProfile(user as any);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);
const updateMyProfie = catchAsynce(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await userService.updateMyProfie(user as IAuthUser, req);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "My profile updated!",
      data: result,
    });
  }
);
export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllAdminFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfie,
};
