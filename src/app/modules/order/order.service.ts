import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// Create an order
const createAnOrder = async (orderData: IOrder) => {
    const result = await OrderModel.create(orderData);
    return result;
}

// Calculate Revenue from Orders
const calculateRevenueFromOrders = async () => {
    try {
        const result = await OrderModel.aggregate([
            // stap 1 : multiplying quantity and totalPrice
            {
                $project: {
                    revenue: { $multiply: ["$quantity", "$totalPrice"] }
                }
            },
            // stap 2 : sum all revenue values
            {
                $group : {
                    _id : null,
                    totalRevenue : {$sum : "$revenue"}
                }
            },
            // stap 3 : total revenue as the result
            { 
                $project : {
                    _id : 0,
                    totalRevenue : 1
                }
            }
        ]);

        return result.length > 0 ? result[0].totalRevenue : 0;

    } catch (error) {
        console.log(error);
    }
}


export const orderService = {
    createAnOrder,
    calculateRevenueFromOrders,
}