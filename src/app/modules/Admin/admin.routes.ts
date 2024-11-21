import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";
import { validateRequest } from "../../middlewares/validationsRequest";
import { adminValidationSchemas, update } from "./admin.validations";

const router = express.Router();

router.get("/", AdminController.getAllAdminFromDB);

router.get("/:id", AdminController.getByIdFromDb);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDb
);
router.delete("/:id", AdminController.deleteIntoDb);
router.delete("/softDelete/:id", AdminController.softDeleteIntoDb);
export const AdminRouter = router;
