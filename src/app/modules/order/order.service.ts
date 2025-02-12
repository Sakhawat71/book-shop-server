import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// Create an order
const createAnOrder = async (user: any, orderData: IOrder, client_ip: string) => {
    const order = await OrderModel.create(user, orderData);
    // return order;

    // payment integration
    const shurjopayPayload = {
        amount: orderData.totalPrice,
        order_id: order[0]._id,
        currency: "BDT",
        customer_name: user.name,
        customer_address: user.address,
        customer_email: orderData.email,
        customer_phone: user.phone,
        customer_city: user.city,
        client_ip,
    };

    // const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    // if (payment?.transactionStatus) {
    //     order = await order.updateOne({
    //         transaction: {
    //             id: payment.sp_order_id,
    //             transactionStatus: payment.transactionStatus,
    //         },
    //     });
    // }

    // return payment.checkout_url;
};

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
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$revenue" }
                }
            },
            // stap 3 : total revenue as the result
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1
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