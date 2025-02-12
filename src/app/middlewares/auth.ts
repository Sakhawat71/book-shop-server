import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import config from "../config";
import { UserModel } from "../modules/User/user.model";
import { StatusCodes } from "http-status-codes";


const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // checking if the token is missing
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
        }

        // checking if the given token is valid
        const decoded = jwt.verify(
            token,
            config.accessTokenSecret as string
        ) as JwtPayload;

        const { role, userEmail : email, iat } = decoded;

        // checking if the user is exist
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, "This user is not found !");
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "You are not authorized !"
            );
        }

        req.user = user;
        next();
    });
};

export default auth;
