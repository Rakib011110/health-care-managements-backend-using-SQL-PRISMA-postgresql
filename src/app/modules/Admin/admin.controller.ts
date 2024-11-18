import { Request, Response } from "express";
import { AdminService } from "./addmin.service";
import pick from "../../../Shared/pick";
import { adminfilterableFilds } from "./admin.constant";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  // console.log(req.query);
  try {
    // const filters = req.query;
    const filters = pick(req.query, adminfilterableFilds);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await AdminService.getAllDBFormDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin retrive success",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "something went wront",
      error: error,
    });
  }
};

export const AdminController = {
  getAllAdminFromDB,
};
