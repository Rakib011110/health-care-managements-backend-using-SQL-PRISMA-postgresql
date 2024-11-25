import express, { NextFunction, Request, Response } from "express";

import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../Error/ApiError";
export const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }

      const verifytoken = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      req.user = verifytoken; // for password

      if (roles.length && !roles.includes(verifytoken.role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, "FORBIDDEN");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
