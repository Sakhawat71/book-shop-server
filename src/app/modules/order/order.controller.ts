import { BookModel } from './../book/book.model';
import { NextFunction, Request, Response } from "express";
import { orderValidationSchema } from "./order.zod-validation";
import { orderService } from './order.service';
import { IUserAddress } from './order.interface';


// create order
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user,...orderData} = req.body;
        const client_ip = req.ip;
        const validOrderData = orderValidationSchema.parse(orderData);

        // Check in database : is book available or not
        const foundBook = await BookModel.findById(validOrderData.product);
        if (!foundBook) {
            res.status(404).json({
                message: "Product not found",
                success: false,
                error: { name: "Resource not found", path: validOrderData.product }
            })
            return;
        }

        // Check quantity of book : Is store book quantity greaterthan order quantity or not
        if (foundBook.quantity < validOrderData.quantity) {
            res.status(400).json({
                message: "Insufficient stock",
                success: false,
                error: { name: "StockError", availableStock: foundBook.quantity },
            });
            return;
        }

        // Update inventory and save 
        foundBook.quantity -= validOrderData.quantity;
        if (foundBook.quantity === 0) {
            foundBook.inStock = false;
        }
        await foundBook.save();

        // create the order
        const newOrder = await orderService.createAnOrder(
            user as IUserAddress,
            validOrderData as any,
            client_ip!
        );

        // const newOrder = await orderService.createAnOrder(validOrderData as any);
        res.status(201).json({
            message: "Order created successfully",
            success: true,
            data: newOrder,
        });

    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            next(error)
        }
        else {
            res.status(400).json({
                success: false,
                message: "Failed to create order",
                error,
            });
        }
    }
}

// Calculate Revenue from Orders
const getRevenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const totalRevenue = await orderService.calculateRevenueFromOrders();
        res.status(200).json({
            message: "Revenue calculated successfully",
            success: true,
            data: { totalRevenue },
        });

    } catch (error) {
        next({
            message: "Failed to calculate revenue",
            success: false,
            error,
        });
    }
}


export const orderContrller = {
    createOrder,
    getRevenue,
}