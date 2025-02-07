import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";
import { UserModel } from "../User/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { adminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponce";
// import { BlogModel } from "../Blog/blog.model";


// Block a user
const blockUser = catchAsync(async (req, res) => {

    const { userId } = req.params;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'Unauthorized Access',
        );
    }

    const token = authHeader?.split(' ')[1];
    const decoded = jwt.verify(token as string, config.accessTokenSecret as string) as JwtPayload;
    const { id, role } = decoded;

    const adminUser = await UserModel.findById(id);
    if (!adminUser || role !== 'admin') {
        throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'Only admins are allowed to perform this action',
        );
    }

    const userToBlock = await UserModel.findById(userId);
    if (!userToBlock) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'User not found',
        );
    };

    if (userToBlock.isBlocked === true) {
        throw new AppError(
            StatusCodes.NOT_IMPLEMENTED,
            'User already blocked'
        )
    }

    await adminServices.blockUserByAdmin(userId);
    sendResponse(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: StatusCodes.OK,
        data: null
    });
});


// delete any bloge
// const deleteBlog = catchAsync(async (req, res) => {
//     const { id: blogId } = req.params;
//     // console.log(blogId);

//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         throw new AppError(
//             StatusCodes.UNAUTHORIZED,
//             'Unauthorized Access',
//         );
//     }

//     const token = authHeader?.split(' ')[1];
//     const decoded = jwt.verify(token as string, config.accessTokenSecret as string) as JwtPayload;
//     const { id, role } = decoded;

//     const adminUser = await UserModel.findById(id);
//     if (!adminUser || role !== 'admin') {
//         throw new AppError(
//             StatusCodes.UNAUTHORIZED,
//             'Only admins are allowed to perform this action',
//         );
//     }

//     const blogToDelete = await BlogModel.findById(blogId);
//     if (!blogToDelete) {
//         throw new AppError(
//             StatusCodes.NOT_FOUND,
//             'Blog not found',
//         );
//     }

//     await adminServices.deleteBlogByAdmin(blogId);
//     sendResponse(res, {
//         success: true,
//         message: "Blog deleted successfully",
//         statusCode: StatusCodes.OK,
//         data: null,
//     });
// })

export const adminContrller = {
    blockUser,
    // deleteBlog,
};