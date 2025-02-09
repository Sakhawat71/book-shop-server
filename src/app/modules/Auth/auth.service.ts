import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { IUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
import jwt, { SignOptions } from 'jsonwebtoken';


// register
const registerUser = async (payLoad: IUser) => {

    const { email } = payLoad;

    const existingUser = await UserModel.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
        throw new AppError(
            StatusCodes.CONFLICT,
            "User already exists with this email"
        );
    };

    const newUser = await UserModel.create(payLoad);

    // Generate JWT token for the new user
    const JwtPayload = {
        userEmail: newUser.email,
        role: newUser.role,
        id: newUser._id,
    };

    const accessToken = jwt.sign(
        JwtPayload,
        config.accessTokenSecret as string,
        <SignOptions>{ expiresIn: config.accessTokenExpiry }
    );

    return {
        token: accessToken,
        newUser
    };
};


// login
const loginUser = async (payLoad: ILoginUser) => {

    const { email, password } = payLoad;
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "User not found"
        );
    };

    // Check -> if user is Blocked
    if (user.isBlocked) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "User is Blocked"
        );
    };

    // Check if password match
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError(
            StatusCodes.UNAUTHORIZED,
            "Password is incorrect"
        );
    };

    const JwtPayload = {
        userEmail: user.email,
        role: user.role,
        id: user._id,
    };

    // Create jwt access token
    const accessToken = jwt.sign(
        JwtPayload,
        config.accessTokenSecret as string,
        <SignOptions>{
            expiresIn: config.accessTokenExpiry,
        }
    );

    return {
        token: accessToken
    }
};

export const authService = {
    registerUser,
    loginUser
};