import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AdminService } from "./addmin.service";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  // console.log(req.query);
  try {
    const result = await AdminService.getAllDBFormDB(req.query);

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
