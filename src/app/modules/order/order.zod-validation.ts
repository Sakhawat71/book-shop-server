import { z } from "zod";

// export const orderValidationSchema = z.object({
//     email: z.string().email("Invalid email format"),
//     product: z.string().length(24, "Invalid product ID format"),
//     quantity: z.number().min(1, "Quantity must be at least 1"),
//     totalPrice: z.number().min(0, "Total price must be a positive number"),
//     user: z.object({
//         address: z.string().min(5, "Address must be at least 5 characters long"),
//         city: z.string().min(2, "City must be at least 2 characters long"),
//         phone: z.string().regex(/^\d{10,15}$/, "Invalid phone number format"),
//         name: z.string().min(3, "Name must be at least 3 characters long"),
//     }),
// });

export const orderValidationSchema = z.object(
    {
        email: z.string().email("Invalid email format"),
        product: z.string().length(24, "Invalid product ID format"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        totalPrice: z.number().min(0, "Total price must be a positive number"),
    }
)