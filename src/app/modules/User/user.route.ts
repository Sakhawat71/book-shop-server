import { Router } from "express";
import { userController } from "./user.controller";

const route = Router();

route.get(
    "/",
    userController.getAllUser
);

export const userRoute = route;