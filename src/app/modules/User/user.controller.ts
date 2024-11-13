import { Request, Response } from "express";
import { userService } from "./user.service";
import { error } from "console";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userService.createAdmin(req.body);
    res.status(200).json({
      success: "admin create success",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(5000).json({
      success: false,
      message: err?.name || "something went wrong",
      error: err,
    });
  }
};

export const userController = { createAdmin };
