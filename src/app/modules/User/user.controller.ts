import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { userServices } from "./user.service";

const getAllUser = catchAsync(async (req, res) => {
    const users = await userServices.getAllUsersFromDB();
    sendResponse(res,{
        statusCode: StatusCodes.OK,
        success: true,
        message: 'All users fetched successfully',
        data: users
    })
});

const getUserByEmail = catchAsync(async (req,res) => {
    const  {email}  = req.params;
    const user = await userServices.getUserByEmailFromDB(email);
    
    if (!user) {
        return sendResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: 'User not found',
            data : null,
        });
    }

    sendResponse(res,{
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User fetched successfully',
        data: user
    })
})

export const userController ={
    getAllUser,
    getUserByEmail
}