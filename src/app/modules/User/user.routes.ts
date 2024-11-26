import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { v2 as cloudinary } from "cloudinary";

import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validations";

const router = express.Router();

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: "dqp2vi7h1",
    api_key: "492939945165266",
    api_secret: "VG2cTAH6T98FWCa9Nk8MtAxnju8",
  });
})();

router.post(
  "/",

  auth("ADMIN", "SUPER_ADMIN", "DOCTOR"),
  fileUploader.upload.single("file"),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);

export const userRoutes = router;
