import { error } from "console";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./addmin.service";
import pick from "../../../Shared/pick";
import { adminfilterableFilds } from "./admin.constant";
import sendResponse from "../../../Shared/sendResponse";
import { catchAsynce } from "../../../Shared/catchAsynce";

const getAllAdminFromDB = catchAsynce(async (req, res) => {
  // console.log(req.query);
  // const filters = req.query;
  const filters = pick(req.query, adminfilterableFilds);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log(options);
  const result = await AdminService.getAllDBFormDB(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin retrive success",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const result = await AdminService.getByIdFromDb(id);

    sendResponse(res, {
      statusCode: 200,

      success: true,
      message: "Admin retrieved successfully by ID",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const result = await AdminService.updateIntoDb(id, req.body);

    res.status(200).json({
      success: true,
      message: "Admin update successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const deleteIntoDb = catchAsynce(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.deleteIntoDb(id);

  res.status(200).json({
    success: true,
    message: "Admin delete successfully",
    data: result,
  });
});
const softDeleteIntoDb = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.softDeleteIntoDb(id);

    res.status(200).json({
      success: true,
      message: "Admin delete successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const AdminController = {
  getAllAdminFromDB,
  getByIdFromDb,
  updateIntoDb,
  deleteIntoDb,
  softDeleteIntoDb,
};
