import { Router } from "express";
import { userController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../User/user.validation";

const route = Router();

route.post(
    '/register',
    validateRequest(userValidation.createUserValidation),
    userController.register
);

route.post(
    '/login',
    userController.login
);

export const authRoute = route;