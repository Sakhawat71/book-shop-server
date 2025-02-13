import { IUser } from "./user.interface";
import { UserModel } from "./user.model";


// get all
const getAllUsersFromDB = async () => {
    return await UserModel.find();
};

// get by id
const getUserByIdFromDB = async (id: string) => {
    return await UserModel.findById(id);
};

// by email
const getUserByEmailFromDB = async (email: string) => {
    return await UserModel.findOne({email});
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
    getUserByIdFromDB,
    getUserByEmailFromDB,
    updateUserInDB,
    deleteUserFromDB
};