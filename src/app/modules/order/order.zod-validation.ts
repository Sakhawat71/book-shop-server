import { z } from "zod";

export const orderValidationSchema = z.object(
    {
        email: z.string().email("Invalid email format"),
        product: z.string().length(24, "Invalid product ID format"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        totalPrice: z.number().min(0, "Total price must be a positive number"),
    }
)