import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    email: string;
    product: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;
    // user?: {
    //     address: string;
    //     city: string;
    //     phone: string;
    //     name: string;
    // };
    createdAt?: string;
    updatedAt?: string;
}