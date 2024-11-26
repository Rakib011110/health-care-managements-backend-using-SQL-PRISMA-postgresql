import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

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

export const userController = { createAdmin };
