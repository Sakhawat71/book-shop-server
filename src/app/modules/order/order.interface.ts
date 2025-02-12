import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    email: string;
    product: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;
    createdAt?: string;
    updatedAt?: string;
};

export interface IUserAddress {
    address: string;
    city: string;
    phone: string;
    name: string;
};