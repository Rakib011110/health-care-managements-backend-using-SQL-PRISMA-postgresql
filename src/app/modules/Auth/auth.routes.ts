import express from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.get("/refresh-token", AuthController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.ADMIN, UserRole.PATIENT, UserRole.DOCTOR),
  AuthController.changePassword
);
router.post(
  "/forgot-password",
  auth(UserRole.ADMIN, UserRole.ADMIN, UserRole.PATIENT, UserRole.DOCTOR),
  AuthController.forgotPassword
);

router.post("/reset-password", AuthController.resetPassword);
export const AuthRoutes = router;
