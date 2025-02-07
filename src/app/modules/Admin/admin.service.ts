import { BlogModel } from "../Blog/blog.model";
import { UserModel } from "../User/user.model";

// block user 
const blockUserByAdmin = async (id: string) => {
    return await UserModel.findByIdAndUpdate(
        id,
        { isBlocked: true }
    );
};


//delete blog
const deleteBlogByAdmin = async (id: string) => {
    return await BlogModel.findByIdAndDelete(id);
};

export const adminServices = {
    blockUserByAdmin,
    deleteBlogByAdmin,
}