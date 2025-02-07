import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { UserModel } from "./user.model";

const getAllUser = catchAsync(async (req, res) => {
    const users = await UserModel.find();
    sendResponse(res,{
        statusCode: StatusCodes.OK,
        success: true,
        message: 'All users fetched successfully',
        data: users
    })
});

export const userController ={
    getAllUser,
}