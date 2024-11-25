import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";
import { validateRequest } from "../../middlewares/validationsRequest";
import { adminValidationSchemas, update } from "./admin.validations";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.getAllAdminFromDB
);

router.get("/:id", AdminController.getByIdFromDb);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),

  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDb
);
router.delete("/:id", AdminController.deleteIntoDb);
router.delete("/softDelete/:id", AdminController.softDeleteIntoDb);
export const AdminRouter = router;
