import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true,
        unique: true,
    },
    author: {
        type: String,
        required: [true, 'Author is required.'],
        trim: true,
    },
    image: {
        type: String,
        // : [true, 'image is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [1, 'Price must be a positive number.'],
    },
    category: {
        type: String,
        enum: {
            values: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
            message: 'Category must be one of Fiction, Science, SelfDevelopment, Poetry, or Religious.',
        },
        required: [true, 'Category is required.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
        min: [0, 'Quantity must be at least 0.'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'In-stock status is required.'],
        default: true,
    },
    // isDeleted: {
    //     type: Boolean,
    //     default: false,
    // },
    createdAt: {
        type: String,
        default: () => new Date().toISOString(),
    },
    updatedAt: {
        type: String,
        default: () => new Date().toISOString(),
    },
});


export const BookModel = model<IBook>('Books', bookSchema);