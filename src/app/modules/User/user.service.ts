import { IUser } from "./user.interface";
import { UserModel } from "./user.model";


// get all
const getAllUsersFromDB = async () => {
    return await UserModel.find();
};

// get by id
const getSingleUserFromDB = async (id: string) => {
    return await UserModel.findById(id);
};

// update
const updateUserInDB = async (id: string, payLoad: Partial<IUser>) => {
    return await UserModel.findByIdAndUpdate(id, payLoad, { new: true });
};

// delete
const deleteUserFromDB = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
};

export const userServices = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserInDB,
    deleteUserFromDB
};