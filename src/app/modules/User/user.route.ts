import { Router } from "express";
import { userController } from "./user.controller";

const route = Router();

route.get(
    "/",
    userController.getAllUser
);

route.get(
    '/:email',
    userController.getUserByEmail
)

export const userRoute = route;