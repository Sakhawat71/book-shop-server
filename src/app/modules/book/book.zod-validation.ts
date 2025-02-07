import { z } from 'zod';

export const bookValidateSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    price: z.number().positive('Price must be a positive number'),
    category: z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        required_error: 'Category must be one of the specified options'
    }),
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
    inStock: z.boolean(),
    // isDeleted: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

