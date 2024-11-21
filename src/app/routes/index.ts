import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AdminRouter } from "../modules/Admin/admin.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";

const routers = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
  {
    path: "/auth",
    router: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.router));

export default routers;
