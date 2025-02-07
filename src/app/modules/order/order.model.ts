import mongoose, { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
    {
        email: { type: String, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        totalPrice: { type: Number, required: true },
        createdAt: {
            type: String,
            default: () => new Date().toISOString(),
        },
        updatedAt: {
            type: String,
            default: () => new Date().toISOString(),
        },
    }
)

export const OrderModel = model<IOrder>("Order", orderSchema);