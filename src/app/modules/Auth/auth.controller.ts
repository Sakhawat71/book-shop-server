import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { authService } from "./auth.service";
import { StatusCodes } from 'http-status-codes';

// REGISTER CONTROLLER
const register = catchAsync(async (req, res) => {
    const result = await authService.registerUser(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result
    })
});

// LOGIN CONTROLLER
const login = catchAsync(async (req, res) => {
    const result = await authService.loginUser(req.body);
    // throw new Error('Error while login');

    // final response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Login successful',
        data: result
    })
});

export const userController = {
    register,
    login
};
